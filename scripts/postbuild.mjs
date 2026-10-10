/**
 * Runs after `astro build`:
 * 1. Writes dist/_headers for Cloudflare: security headers, a Content Security Policy that allows
 *    only our own scripts (inline ones by SHA-256 hash), and long caching for hashed assets (Build Plan M11).
 * 2. Checks every page (Build Plan M12, Master Plan §5.3): no empty or "#" links, every internal link
 *    resolves to a built file, every WhatsApp link carries the right number, and (production only)
 *    no TODO-VERIFY text ships.
 */
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const DIST = path.resolve("dist");
const PRODUCTION = process.env.AKHI_MODE === "production";
const WHATSAPP = "8801600297923"; // keep in sync with src/content/settings.ts (checked below)

const settingsSource = fs.readFileSync("src/content/settings.ts", "utf8");
const waNumber = settingsSource.match(/whatsappNumber:\s*"(\d+)"/)?.[1] ?? WHATSAPP;

function walk(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
}
const htmlFiles = walk(DIST).filter((f) => f.endsWith(".html"));

/* 1. Headers ------------------------------------------------------------- */
const hashes = new Set();
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g)) {
    if (m[1].trim()) hashes.add(`'sha256-${createHash("sha256").update(m[1]).digest("base64")}'`);
  }
}
const csp = [
  "default-src 'self'",
  `script-src 'self' ${[...hashes].join(" ")} https://cloud.umami.is`.replace(/\s+/g, " "),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https://cloud.umami.is https://api-gateway.umami.dev",
  "frame-src https://www.youtube-nocookie.com",
  "base-uri 'self'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const headers = `/*
  Content-Security-Policy: ${csp}
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Cross-Origin-Opener-Policy: same-origin${PRODUCTION ? "" : "\n  X-Robots-Tag: noindex, nofollow"}

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable
`;
fs.writeFileSync(path.join(DIST, "_headers"), headers);

/* 2. Link and content checks --------------------------------------------- */
const problems = [];
const exists = (url) => {
  const clean = decodeURIComponent(url.split(/[?#]/)[0]);
  const target = path.join(DIST, clean);
  if (clean.endsWith("/")) return fs.existsSync(path.join(target, "index.html"));
  return fs.existsSync(target) || fs.existsSync(path.join(target, "index.html"));
};
let checked = 0;
for (const file of htmlFiles) {
  const page = "/" + path.relative(DIST, file).replace(/index\.html$/, "");
  const html = fs.readFileSync(file, "utf8");
  for (const m of html.matchAll(/\s(href|src|srcset)="([^"]*)"/g)) {
    const [, attr, value] = m;
    if (attr === "href" && (value === "" || value === "#")) problems.push(`${page}: empty or "#" link`);
    const urls = attr === "srcset" ? value.split(",").map((s) => s.trim().split(/\s+/)[0]) : [value];
    for (const url of urls) {
      if (!url || !url.startsWith("/") || url.startsWith("//")) continue;
      checked++;
      if (!exists(url)) problems.push(`${page}: broken internal ${attr} → ${url}`);
    }
    if (attr === "href" && value.startsWith("https://wa.me/") && !value.startsWith(`https://wa.me/${waNumber}`))
      problems.push(`${page}: WhatsApp link with the wrong number → ${value.slice(0, 40)}`);
  }
  if (PRODUCTION && /TODO-VERIFY/.test(html)) problems.push(`${page}: contains TODO-VERIFY text`);
}

console.log(
  `postbuild: ${htmlFiles.length} pages, ${checked} internal URLs checked, CSP with ${hashes.size} inline script hash(es), mode ${PRODUCTION ? "production" : "preview"}`,
);
if (problems.length) {
  console.error(`postbuild: ${problems.length} problem(s):\n  ${[...new Set(problems)].join("\n  ")}`);
  process.exit(1);
}
