import { describe, expect, it } from "vitest";
import {
  buildMessage,
  clipboardText,
  instagramLink,
  mailtoLink,
  messengerLink,
  normalizeWhatsappNumber,
  telLink,
  whatsappLink,
} from "../../src/lib/contact";
import { settings } from "../../src/content/settings";
import { contactLinks } from "../../src/lib/links";

const design = {
  kind: "design" as const,
  code: "AF-BED-014",
  name: "Velvet upholstered bed",
  url: "https://akhifurniture.com/en/designs/velvet-upholstered-bed/",
};

describe("WhatsApp number format", () => {
  it("accepts international, local and formatted Bangladeshi mobile numbers", () => {
    expect(normalizeWhatsappNumber("8801600297923")).toBe("8801600297923");
    expect(normalizeWhatsappNumber("01600-297923")).toBe("8801600297923");
    expect(normalizeWhatsappNumber("+880 1600 297923")).toBe("8801600297923");
  });
  it("rejects numbers that are not Bangladeshi mobiles", () => {
    expect(() => normalizeWhatsappNumber("12345")).toThrow();
    expect(() => normalizeWhatsappNumber("880160029792")).toThrow();
  });
  it("the settings number is valid", () => {
    expect(normalizeWhatsappNumber(settings.whatsappNumber)).toBe(settings.whatsappNumber);
  });
});

describe("whatsappLink", () => {
  it("uses wa.me with digits only and no '+'", () => {
    expect(whatsappLink("+8801600297923")).toBe("https://wa.me/8801600297923");
  });
  it("puts the design code, page link and website signature in the message", () => {
    const link = whatsappLink(settings.whatsappNumber, buildMessage("en", design));
    const text = decodeURIComponent(new URL(link).searchParams.get("text") ?? "");
    expect(link.startsWith("https://wa.me/8801600297923?text=")).toBe(true);
    expect(text).toContain("AF-BED-014");
    expect(text).toContain("Velvet upholstered bed");
    expect(text).toContain(design.url);
    expect(text.trim().endsWith("— sent from akhifurniture.com")).toBe(true);
  });
  it("encodes Bengali text so it survives the round trip", () => {
    const message = buildMessage("bn", { ...design, name: "ভেলভেট কুশন খাট", url: design.url.replace("/en/", "/bn/") });
    const link = whatsappLink(settings.whatsappNumber, message);
    expect(link).not.toMatch(/[ঀ-৿\s]/); // no raw Bengali or spaces in the URL
    expect(new URL(link).searchParams.get("text")).toBe(message);
    expect(message).toContain("ভেলভেট কুশন খাট");
    expect(message).toContain("AF-BED-014");
    expect(message).toContain("akhifurniture.com থেকে পাঠানো");
  });
  it("general messages have no code but keep the signature", () => {
    const text = buildMessage("en", { kind: "general" });
    expect(text).not.toMatch(/AF-[A-Z]{3}-\d{3}/);
    expect(text).toContain("sent from akhifurniture.com");
  });
});

describe("other channels", () => {
  it("builds Messenger, Instagram, phone and email links", () => {
    expect(messengerLink("akhifurniturebangladesh")).toBe("https://m.me/akhifurniturebangladesh");
    expect(instagramLink("akhifurniture")).toBe("https://ig.me/m/akhifurniture");
    expect(telLink("+8801600297923")).toBe("tel:+8801600297923");
    expect(mailtoLink("hello@akhifurniture.com")).toBe("mailto:hello@akhifurniture.com");
  });
  it("rejects malformed values instead of building dead links", () => {
    expect(() => messengerLink("")).toThrow();
    expect(() => instagramLink("has space")).toThrow();
    expect(() => telLink("01600297923")).toThrow();
    expect(() => mailtoLink("not-an-email")).toThrow();
  });
  it("copies the code and link for Messenger/Instagram", () => {
    expect(clipboardText("AF-BED-014", design.url)).toBe(`AF-BED-014 ${design.url}`);
  });
  it("settings values produce valid links", () => {
    expect(() => messengerLink(settings.messengerUsername)).not.toThrow();
    expect(() => telLink(settings.phone.e164)).not.toThrow();
    if (settings.instagramUsername) expect(() => instagramLink(settings.instagramUsername)).not.toThrow();
    if (settings.email) expect(() => mailtoLink(settings.email)).not.toThrow();
  });
  it("leaves out Instagram and email while their settings are empty", () => {
    const links = contactLinks("en");
    expect(links.instagram === undefined).toBe(!settings.instagramUsername);
    expect(links.email === undefined).toBe(!settings.email);
  });
});
