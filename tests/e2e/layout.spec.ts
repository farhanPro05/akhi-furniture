import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { builtPages, WIDTHS } from "./pages";

const pages = builtPages();

for (const path of pages) {
  test.describe(path, () => {
    test("no horizontal scrolling at any test width", async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(path);
      for (const [width, height] of WIDTHS) {
        await page.setViewportSize({ width, height });
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, `${path} overflows by ${overflow}px at ${width}px`).toBeLessThanOrEqual(0);
      }
    });

    test("language switch goes to the same page in the other language", async ({ page }) => {
      await page.goto(path);
      const lang = path.startsWith("/bn/") ? "bn" : "en";
      const other = lang === "en" ? "bn" : "en";
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      const href = await page.locator(`header .lang-switch a[lang="${other}"]`).getAttribute("href");
      expect(href).toBe(path.replace(`/${lang}/`, `/${other}/`));
      const res = await page.request.get(href!);
      expect(res.status()).toBe(200);
    });

    test("no console errors, contact links are real, axe finds no serious issues", async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      page.on("pageerror", (e) => errors.push(String(e)));
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(path, { waitUntil: "networkidle" });
      expect(errors).toEqual([]);

      const hrefs = await page.locator("a[href]").evaluateAll((as) => as.map((a) => a.getAttribute("href") ?? ""));
      expect(hrefs.filter((h) => h === "" || h === "#")).toEqual([]);
      for (const h of hrefs.filter((x) => x.startsWith("https://wa.me/"))) expect(h).toMatch(/^https:\/\/wa\.me\/8801\d{9}(\?text=.+)?$/);

      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${v.id}: ${v.nodes.length} × ${v.nodes[0]?.target.join(" ")}`)).toEqual([]);
    });
  });
}
