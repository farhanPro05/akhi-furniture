import { expect, test } from "@playwright/test";

const DESIGN = "/en/designs/marble-look-dining-set/";

test.describe("phone", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

  test("menu opens, traps focus and closes with Escape", async ({ page }) => {
    await page.goto("/en/");
    const button = page.locator("[data-menu-open]");
    await button.click();
    const menu = page.locator("[data-menu]");
    await expect(menu).toBeVisible();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    for (let i = 0; i < 30; i++) await page.keyboard.press("Tab");
    expect(await page.evaluate(() => document.activeElement?.closest("[data-menu]") !== null)).toBe(true);
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(button).toBeFocused();
  });

  test("sticky bar on design pages asks about the design and opens the chooser", async ({ page }) => {
    await page.goto(DESIGN);
    const bar = page.locator("[data-sticky-bar]");
    await expect(bar).toBeVisible();
    const wa = bar.locator('a[href^="https://wa.me/"]');
    await expect(wa).toContainText("AF-DIN-021");
    expect(decodeURIComponent((await wa.getAttribute("href"))!)).toContain("AF-DIN-021");
    await bar.locator("[data-sheet-open]").tap();
    const sheet = page.locator("[data-sheet]");
    await expect(sheet).toBeVisible();
    await expect(sheet.locator(".channel").first()).toContainText("WhatsApp");
    await page.keyboard.press("Escape");
    await expect(sheet).toBeHidden();
  });

  test("gallery swipes and opens the lightbox", async ({ page }) => {
    await page.goto(DESIGN);
    await page.locator("[data-zoom]").tap();
    await expect(page.locator(".pswp")).toBeVisible();
    await expect(page.locator(".pswp__caption")).toContainText("showroom");
    // PhotoSwipe takes focus once its opening animation ends
    await expect(page.locator(".pswp")).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.locator(".pswp")).toBeHidden();
  });

  test("design brief builds the WhatsApp message", async ({ page }) => {
    await page.goto("/en/custom-furniture/");
    const brief = page.locator("[data-brief]");
    await brief.getByRole("button", { name: "Bed", exact: true }).tap();
    await brief.locator("[data-next]").tap();
    await brief.getByRole("button", { name: "Home", exact: true }).tap();
    await brief.locator("[data-skip]").tap();
    await brief.locator("#b-size").fill("6 × 7 ft");
    await brief.locator("[data-next]").tap();
    await brief.locator("#b-area").fill("Bashundhara");
    await expect(brief.locator("[data-bubble]")).toContainText("Furniture: Bed");
    const href = await brief.locator("[data-send]").getAttribute("href");
    const text = new URL(href!).searchParams.get("text")!;
    expect(text).toContain("*Furniture:* Bed");
    expect(text).toContain("*For:* Home");
    expect(text).toContain("*Size:* 6 × 7 ft");
    expect(text).toContain("*Area:* Bashundhara");
    expect(text).toContain("sent from akhifurniture.com");
  });

  test("Bengali brief writes a Bengali message", async ({ page }) => {
    await page.goto("/bn/custom-furniture/");
    const brief = page.locator("[data-brief]");
    await brief.getByRole("button", { name: "খাট", exact: true }).tap();
    const href = await brief.locator("[data-send]").getAttribute("href");
    const text = new URL(href!).searchParams.get("text")!;
    expect(text).toContain("হ্যালো আখি ফার্নিচার");
    expect(text).toContain("*আসবাব:* খাট");
  });

  test("type filter narrows the catalog and shows the empty state", async ({ page }) => {
    await page.goto("/en/designs/");
    const cards = page.locator("[data-grid] .d-card:visible");
    const all = await cards.count();
    await page.locator('[data-type-filter] [data-type="beds"]').tap();
    await expect(page).toHaveURL(/type=beds/);
    expect(await cards.count()).toBeLessThan(all);
    // Only types with designs get a chip; an old link to an empty type shows the empty state
    await expect(page.locator('[data-type-filter] [data-type="office"]')).toHaveCount(0);
    await page.goto("/en/designs/?type=office");
    await expect(page.locator("[data-empty]")).toBeVisible();
  });
});

test.describe("desktop", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("Designs dropdown opens on click and closes with Escape", async ({ page }) => {
    await page.goto("/en/");
    const toggle = page.locator("[data-dropdown-toggle]");
    await toggle.click();
    await expect(page.locator("[data-dropdown]")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("[data-dropdown]")).toBeHidden();
    await expect(toggle).toBeFocused();
  });

  test("code chip copies and shows the toast", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto(DESIGN);
    await page.locator("[data-copy-code]").click();
    await expect(page.locator("[data-toast-el]")).toContainText("AF-DIN-021");
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("AF-DIN-021");
  });

  test("no sticky bar on desktop; the info panel holds the contact block", async ({ page }) => {
    await page.goto(DESIGN);
    await expect(page.locator("[data-sticky-bar]")).toBeHidden();
    await expect(page.locator(".contact-block a").first()).toBeInViewport();
  });

  test("root redirects to English", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/en\/$/);
  });
});
