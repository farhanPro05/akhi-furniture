// One-off: favicons and the default 1200 × 630 share image from the logo files in src/assets/brand/.
// Re-run after AKHI supplies a vector logo: node scripts/make-brand-assets.mjs
import sharp from "sharp";

const SURFACE = { r: 250, g: 246, b: 240, alpha: 1 }; // --surface #faf6f0
const mark = "src/assets/brand/akhi-mark.png";
const logo = "src/assets/brand/akhi-logo-full.png";

async function squareIcon(size, file, background) {
  const inner = Math.round(size * 0.8);
  const art = await sharp(mark)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: art, gravity: "center" }])
    .png()
    .toFile(`public/${file}`);
}

await squareIcon(32, "favicon-32.png", { r: 0, g: 0, b: 0, alpha: 0 });
await squareIcon(180, "apple-touch-icon.png", SURFACE);
await squareIcon(192, "icon-192.png", SURFACE);
await squareIcon(512, "icon-512.png", SURFACE);

const logoArt = await sharp(logo).resize({ height: 300 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: SURFACE } })
  .composite([{ input: logoArt, gravity: "center" }])
  .jpeg({ quality: 88 })
  .toFile("public/og-default.jpg");
console.log("brand assets written to public/");
