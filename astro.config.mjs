// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Static showroom site. English and Bengali, both prefixed (/en/, /bn/); "/" redirects to /en/.
// Build modes: `pnpm build` makes a preview build (pending photos and placeholder facts visible, noindex);
// `pnpm build:production` hides anything not approved and fails while TODO-VERIFY facts remain.
export default defineConfig({
  site: "https://akhifurniture.com",
  trailingSlash: "always",
  i18n: {
    locales: ["en", "bn"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
      i18n: { defaultLocale: "en", locales: { en: "en", bn: "bn" } },
    }),
  ],
  image: {
    // Responsive images are built per component (see src/lib/images.ts).
    responsiveStyles: false,
  },
  build: { format: "directory" },
  vite: {
    plugins: [tailwindcss()],
  },
});
