import { describe, expect, it } from "vitest";
import en from "../../src/i18n/en.json";
import bn from "../../src/i18n/bn.json";
import { fmt, missingKeys } from "../../src/i18n";
import { localDigits, stepNumber } from "../../src/lib/digits";
import { localUrl, pagePath, switchLang } from "../../src/lib/urls";

describe("dictionaries", () => {
  it("English and Bengali have exactly the same keys", () => {
    expect(missingKeys(en, bn)).toEqual({ onlyInFirst: [], onlyInSecond: [] });
  });
  it("detects a missing translation", () => {
    const broken = structuredClone(bn) as Record<string, Record<string, unknown>>;
    delete broken.home!.heroTitle;
    expect(missingKeys(en, broken).onlyInFirst).toContain("home.heroTitle");
  });
  it("Bengali strings are not uppercase-styled English copies", () => {
    expect(bn.home.heroTitle).toMatch(/[ঀ-৿]/);
    expect(bn.contact.whatsappUs).toMatch(/[ঀ-৿]/);
  });
  it("interpolates placeholders", () => {
    expect(fmt("Ask about {code}", { code: "AF-BED-014" })).toBe("Ask about AF-BED-014");
    expect(fmt("{a} and {b}", { a: 1 })).toBe("1 and {b}");
  });
});

describe("Bengali digits", () => {
  it("converts digits for display on Bengali pages only", () => {
    expect(localDigits("01600-297923", "bn")).toBe("০১৬০০-২৯৭৯২৩");
    expect(localDigits("01600-297923", "en")).toBe("01600-297923");
    expect(stepNumber(0, "bn")).toBe("০১");
    expect(stepNumber(4, "en")).toBe("05");
  });
});

describe("URLs", () => {
  it("builds prefixed URLs with a trailing slash", () => {
    expect(localUrl("en")).toBe("/en/");
    expect(localUrl("bn", "designs/bedroom")).toBe("/bn/designs/bedroom/");
    expect(localUrl("en", "/faq/")).toBe("/en/faq/");
  });
  it("the language switch keeps the same page", () => {
    expect(switchLang("/en/designs/marble-top-dining-set/", "bn")).toBe("/bn/designs/marble-top-dining-set/");
    expect(switchLang("/bn/", "en")).toBe("/en/");
    expect(pagePath("/bn/our-work/x/")).toBe("our-work/x");
  });
});
