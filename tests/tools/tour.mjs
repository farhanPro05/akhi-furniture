// Dev helper: screenshot tour of key screens and states into tests/screenshots/tour/.
import { chromium } from "@playwright/test";
const base = process.env.BASE_URL ?? "http://localhost:4321";
const out = "tests/screenshots/tour";
const browser = await chromium.launch({ channel: "chrome" });
const phone = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true };
const desktop = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 };

async function shot(name, opts, path, act) {
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  await page.goto(base + path, { waitUntil: "networkidle", timeout: 120000 });
  if (act) await act(page);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}/${name}.png` });
  console.log(name);
  await ctx.close();
}

await shot("01-home-desktop", desktop, "/en/");
await shot("02-home-phone", phone, "/en/");
await shot("03-designs-dropdown-desktop", desktop, "/en/", (p) => p.click("[data-dropdown-toggle]"));
await shot("04-menu-phone", phone, "/en/", (p) => p.tap("[data-menu-open]"));
await shot("05-design-detail-desktop", desktop, "/en/designs/marble-look-dining-set/");
await shot("06-contact-chooser-phone", phone, "/en/designs/marble-look-dining-set/", (p) => p.tap("[data-sticky-bar] [data-sheet-open]"));
await shot("07-design-brief-desktop", desktop, "/en/custom-furniture/", async (p) => {
  const b = p.locator("[data-brief]");
  await b.scrollIntoViewIfNeeded();
  await b.getByRole("button", { name: "Bed", exact: true }).click();
  await b.getByRole("button", { name: "Wardrobe", exact: true }).click();
  await b.locator("[data-next]").click();
  await b.getByRole("button", { name: "Home", exact: true }).click();
  await b.getByRole("button", { name: "Bedroom", exact: true }).click();
  await p.evaluate(() => window.scrollBy(0, -90));
});
await shot("08-catalog-phone", phone, "/en/designs/", (p) => p.evaluate(() => window.scrollTo(0, 420)));
await shot("09-bengali-home-phone", phone, "/bn/");
await browser.close();
