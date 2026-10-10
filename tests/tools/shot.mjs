// Dev helper: screenshot pages at given widths. Usage: node tests/tools/shot.mjs /en/ 390,1440 [full]
import { chromium } from "@playwright/test";
const [, , path = "/en/", widths = "390,1440", mode = "fold"] = process.argv;
const base = process.env.BASE_URL ?? "http://localhost:4321";
const browser = await chromium.launch({ channel: "chrome" });
for (const w of widths.split(",").map(Number)) {
  const page = await browser.newPage({ viewport: { width: w, height: w < 768 ? 844 : w < 1200 ? 1194 : 900 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("response", (r) => r.status() >= 400 && errors.push(`${r.status()} ${r.url()}`));
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(base + path, { waitUntil: "networkidle" });
  if (mode === "full") {
    // Scroll through the page so lazy images load before the capture
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState("networkidle");
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  const file = `tests/screenshots/${path.replace(/\//g, "_")}-${w}${mode === "full" ? "-full" : ""}.png`;
  await page.screenshot({ path: file, fullPage: mode === "full" });
  console.log(file, "overflow:", overflow, errors.length ? "errors: " + errors.join(" | ") : "");
  await page.close();
}
await browser.close();
