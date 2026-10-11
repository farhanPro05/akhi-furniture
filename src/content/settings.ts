/**
 * Site settings: the single source of truth for AKHI's business facts (Master Plan §9, §23).
 *
 * Only facts found on AKHI's own public pages are filled in. A fact left empty (or null) is simply not
 * shown on the site; fill it in once AKHI confirms it and it appears everywhere it belongs.
 * What is still unconfirmed, and what was taken off the site for now, is listed in
 * plans/2026-10-11-launch-cleanup-and-unconfirmed-items.md.
 *
 * `todoVerify` is for placeholder values that are visible on the site. `pnpm build:production` fails
 * while it has entries, so never show a guessed value without listing it there.
 */
import type { Localized } from "../i18n";

type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export type Showroom = {
  id: string;
  name: Localized;
  address: Localized;
  /**
   * Opening hours: `text` is what visitors read, the rest feeds structured data (keep them in step).
   * null hides the hours line everywhere.
   */
  hours: { text: Localized; days: Day[]; opens: string; closes: string } | null;
  /** Google Maps link (opens the app on phones). */
  mapUrl: string;
  streetAddress: string;
  locality: string;
  postalCode: string;
  country: string;
};

export const settings = {
  siteUrl: "https://akhifurniture.com",
  brand: { en: "Akhi Furniture", bn: "আখি ফার্নিচার" } satisfies Localized,

  /** Display format plus E.164 for tel: links. Published by AKHI on its Facebook posts ("WhatsApp and Imo"). */
  phone: { e164: "+8801600297923", display: "01600-297923" },
  /** International format, digits only, no "+" (wa.me requirement). */
  whatsappNumber: "8801600297923",
  /** Facebook Page username, used for https://m.me/<username>. From the page URL in media/originals/facebook/manifest.json. */
  messengerUsername: "akhifurniturebangladesh",
  /** Used for https://ig.me/m/<username>. Empty: no Instagram links (the account isn't confirmed as AKHI's). */
  instagramUsername: "",
  /** Empty: no email links. */
  email: "",

  social: {
    facebook: "https://www.facebook.com/akhifurniturebangladesh",
  },

  showrooms: [
    {
      id: "bashundhara",
      name: { en: "Bashundhara, Dhaka", bn: "বসুন্ধরা, ঢাকা" },
      /** As AKHI writes it on its Facebook posts. */
      address: {
        en: "417 Apollo Hospital Road, Dhalibari Kancha Bazar, Bashundhara, Dhaka 1212",
        bn: "৪১৭ অ্যাপোলো হাসপাতাল রোড, ঢালীবাড়ি কাঁচাবাজার, বসুন্ধরা, ঢাকা ১২১২",
      },
      /** From AKHI's Google Maps listing (screenshot from the user, 2026-10-11). */
      hours: {
        // No-break spaces and a word joiner (\u2060) after the dash keep the time range on one line
        text: {
          en: "Open every day, 10\u00a0AM\u00a0–\u2060\u00a010\u00a0PM",
          bn: "প্রতিদিন খোলা, সকাল\u00a0১০টা\u00a0–\u2060\u00a0রাত\u00a0১০টা",
        },
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "10:00",
        closes: "22:00",
      },
      /** AKHI's Google Maps listing (share link from the user, 2026-10-11): opens the exact place. */
      mapUrl: "https://maps.app.goo.gl/f2KSxvE2fxHBt3ni8",
      streetAddress: "417 Apollo Hospital Road, Dhalibari Kancha Bazar, Bashundhara",
      locality: "Dhaka",
      postalCode: "1212",
      country: "BD",
    },
  ] satisfies Showroom[],

  /**
   * Publish photos and entries whose rights are still "pending" (AKHI's written permission).
   * true since 2026-10-11: the site goes live before AKHI can be reached. Every such photo is AKHI's own,
   * from its public Facebook Page; media/asset-register.csv still records each one as pending.
   * Set to false to publish only items with approved rights.
   */
  publishPendingRights: true,

  analytics: {
    /** Umami Cloud website ID. Empty: no analytics script is loaded. */
    umamiWebsiteId: "",
    /** Only count visits on the live domain, never on preview links. */
    domains: "akhifurniture.com",
  },

  /** Optional pages (Master Plan §23): built only once real photos and the service are confirmed. */
  pages: { forBusiness: false, sofaRenewal: false },

  /** Shown on the privacy notice (YYYY-MM-DD). */
  privacyUpdated: "2026-10-11",

  /** Placeholder values visible on the site. The production build lists these and stops. */
  todoVerify: {} as Record<string, string>,
};

export type Settings = typeof settings;
