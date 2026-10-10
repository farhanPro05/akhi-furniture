/**
 * Site settings: the single source of truth for AKHI's business facts (Master Plan §9, §23).
 *
 * Unconfirmed facts are placeholders and are listed in `todoVerify`. Remove an entry only after
 * AKHI confirms the fact (and update the value). `pnpm build:production` fails while any remain.
 */
import type { PhotoId } from "../data/photos";
import type { Localized } from "../i18n";

export type Showroom = {
  id: string;
  name: Localized;
  address: Localized;
  /** null until AKHI confirms the hours; shown as "To be confirmed". */
  hours: Localized | null;
  /** Google Maps place URL (opens the app on phones). */
  mapUrl: string;
  locality: string;
  country: string;
};

export type Swatch = { name: Localized; kind: Localized; color: string };

export type Video = {
  /** YouTube video ID. Empty: the block links to the channel instead of playing inline. */
  youtubeId: string;
  title: Localized;
  poster: PhotoId;
};

export const settings = {
  siteUrl: "https://akhifurniture.com",
  brand: { en: "Akhi Furniture", bn: "আখি ফার্নিচার" } satisfies Localized,

  /** Display format plus E.164 for tel: links. */
  phone: { e164: "+8801600297923", display: "01600-297923" },
  /** International format, digits only, no "+" (wa.me requirement). */
  whatsappNumber: "8801600297923",
  /** Facebook Page username, used for https://m.me/<username>. From the page URL in media/originals/facebook/manifest.json. */
  messengerUsername: "akhifurniturebangladesh",
  /** Used for https://ig.me/m/<username>. */
  instagramUsername: "akhifurniture",
  email: "hello@akhifurniture.com",

  social: {
    facebook: "https://www.facebook.com/akhifurniturebangladesh",
    instagram: "https://www.instagram.com/akhifurniture/",
    youtube: "https://www.youtube.com/@akhifurnitureofficial",
  },

  showrooms: [
    {
      id: "bashundhara",
      name: { en: "Bashundhara, Dhaka", bn: "বসুন্ধরা, ঢাকা" },
      address: { en: "Showroom address, Bashundhara R/A, Dhaka", bn: "শোরুমের ঠিকানা, বসুন্ধরা আ/এ, ঢাকা" },
      hours: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Akhi%20Furniture%20Bashundhara%20Dhaka",
      locality: "Dhaka",
      country: "BD",
    },
  ] satisfies Showroom[],

  /** Woods, finishes and fabrics on the Custom Furniture page. Colours are stand-ins until swatches are cropped from real photos. */
  materials: [
    { name: { en: "Teak (segun)", bn: "সেগুন" }, kind: { en: "Solid wood", bn: "সলিড কাঠ" }, color: "#9a6a43" },
    { name: { en: "Mahogany", bn: "মেহগনি" }, kind: { en: "Solid wood", bn: "সলিড কাঠ" }, color: "#6e3b26" },
    { name: { en: "Oak veneer", bn: "ওক ভিনিয়ার" }, kind: { en: "Veneer", bn: "ভিনিয়ার" }, color: "#b88b5e" },
    { name: { en: "Natural", bn: "ন্যাচারাল" }, kind: { en: "Finish", bn: "ফিনিশ" }, color: "#c49a6c" },
    { name: { en: "Walnut polish", bn: "ওয়ালনাট পলিশ" }, kind: { en: "Finish", bn: "ফিনিশ" }, color: "#8a5a3b" },
    { name: { en: "Dark polish", bn: "গাঢ় পলিশ" }, kind: { en: "Finish", bn: "ফিনিশ" }, color: "#3b2a22" },
    { name: { en: "Linen", bn: "লিনেন" }, kind: { en: "Fabric", bn: "ফ্যাব্রিক" }, color: "#d9cfc2" },
    { name: { en: "Slate velvet", bn: "স্লেট ভেলভেট" }, kind: { en: "Fabric", bn: "ফ্যাব্রিক" }, color: "#56606a" },
  ] satisfies Swatch[],

  videos: {
    workshop: { youtubeId: "", title: { en: "From the workshop", bn: "আমাদের কারখানা থেকে" }, poster: "ws-sofa" },
    tour: { youtubeId: "", title: { en: "Showroom tour", bn: "শোরুম ট্যুর" }, poster: "ws-sofa-b" },
    making: { youtubeId: "", title: { en: "How we build furniture", bn: "আমরা যেভাবে আসবাব বানাই" }, poster: "ws-wardrobe" },
  } satisfies Record<string, Video>,

  analytics: {
    /** Umami Cloud website ID. Empty: no analytics script is loaded. */
    umamiWebsiteId: "",
    /** Only count visits on the live domain, never on preview links. */
    domains: "akhifurniture.com",
  },

  /** Optional pages (Master Plan §23): published only once the content or the service is confirmed. */
  pages: { forBusiness: false, sofaRenewal: false },

  /** Shown on the privacy notice. Set at launch (YYYY-MM-DD). */
  privacyUpdated: "",

  /** Placeholders still to confirm with AKHI. The production build lists these and stops. */
  todoVerify: {
    phone: "Phone number 01600-297923 and who answers it",
    whatsappNumber: "WhatsApp number 8801600297923 and who monitors it",
    messengerUsername: "Facebook Page username for Messenger links (akhifurniturebangladesh?)",
    instagramUsername: "Instagram username",
    email: "Email address (hello@akhifurniture.com is a placeholder)",
    showroom: "Showroom address in English and Bengali, the Google Maps place, and any second branch (Banani?)",
    hours: "Showroom opening hours",
    brandBn: "Brand name in Bengali (আখি ফার্নিচার?) and the logo files",
    trustStrip: "Home trust strip facts: 'Showroom in Bashundhara' and '36K+ on Facebook'",
    process: "Ordering steps and timelines (Home, Custom Furniture, For Business, Sofa Renewal pages)",
    customization: "What customers can customize, and the woods, finishes and fabrics AKHI uses",
    materials: "Swatches on the Custom Furniture page: real names and crops from real photos",
    delivery: "Delivery coverage and installation (FAQ answers are drafts until then)",
    aboutStory: "Founding story and year (About page)",
    videos: "Which YouTube videos to play for 'From the workshop', 'Showroom tour' and 'Making of'",
    analytics: "Umami Cloud website ID",
    pages: "Publish For Business (needs approved office projects) and Sofa Renewal (is the service offered?)",
    privacyUpdated: "Privacy notice date",
  } as Record<string, string>,
};

export type Settings = typeof settings;
