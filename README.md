# AKHI Furniture website

Bilingual (English + বাংলা) digital showroom for AKHI Furniture, Dhaka. Nothing is sold on the site: every button leads to WhatsApp, Messenger or a phone call (Instagram too, once its account is confirmed). Plans and decisions live in [`plans/`](plans/README.md); the approved mockups are in [`design/`](design/README.md).

Static site: Astro 6, TypeScript, Tailwind CSS v4 (theme + utilities on top of the mockups' component CSS), a few small vanilla scripts, PhotoSwipe for the lightbox. Hosting target: Cloudflare (free tier).

## Run it

Node 22.12+ and pnpm 10. If `pnpm` isn't installed, prefix commands with `npx pnpm@10`.

```sh
pnpm install
pnpm dev                 # http://localhost:4321 (redirects to /en/)
pnpm build               # preview build into dist/ (see "Build modes")
pnpm preview             # serve dist/
```

| Command | What it does |
|---|---|
| `pnpm check` | TypeScript and Astro type check |
| `pnpm lint` | ESLint + Prettier check (`pnpm format` fixes formatting) |
| `pnpm test` | Unit tests: contact links, i18n parity, Bengali digits, URLs |
| `pnpm test:e2e` | Playwright on the built site: every page at 360–1920px (no horizontal scroll), language switch, axe accessibility, console errors, menu/dropdown/chooser/lightbox/brief interactions. Run `pnpm build` first. Uses installed Google Chrome; set `PW_CHANNEL=""` to use Playwright's Chromium. |

## Build modes

| | `pnpm build` (preview) | `pnpm build:production` |
|---|---|---|
| For | Branch previews and client review | `akhifurniture.com` |
| Photos | All edited photos | Photos approved in `media/asset-register.csv`, plus pending ones while `settings.publishPendingRights` is `true` (it is, since 2026-10-11) |
| Designs, projects | `published` and `sample` items | `published` items with approved rights, plus pending ones under the same setting |
| Sample items | Shown with a "Sample" tag | Never |
| For Business, Sofa Renewal | Built only when `settings.pages.*` is `true` | Same |
| Indexing | `noindex`, robots.txt disallows all | Indexed, sitemap in robots.txt |
| Placeholder facts | Shown | **Build fails** while `settings.todoVerify` has entries (empty now) |

No build ever shows an empty photo box: if a page needs a photo it may not publish (or a room has no cover), `Placeholder.astro` stops the build with the page and photo name.

After every build, `scripts/postbuild.mjs` writes `dist/_headers` (security headers and a CSP that hashes any inline script) and fails the build on empty or `#` links, broken internal links or images, WhatsApp links with the wrong number, or (production) any `TODO-VERIFY` text.

## Where things live

```
src/content/settings.ts      Business facts (phone, WhatsApp, Messenger, address; Instagram, email, hours once confirmed) + todoVerify list
src/content/designs/*.yaml   One file per design (code, names EN/BN, room, type, photos, rights)
src/content/projects/*.yaml  Our Work case studies
src/content/faqs.yaml        FAQ (draft answers stay hidden)
src/content/testimonials.yaml  Reviews (empty until real reviews with permission)
src/content/rooms.yaml       Room categories and their cover photos
src/data/photos.ts           Photo registry: bilingual alt text; rights come from media/asset-register.csv
src/assets/images/           Photo masters (copies of media/edited/); the build makes AVIF/WebP sizes
src/i18n/en.json, bn.json    Every UI string. The build fails if a key is missing in either file.
src/components/, src/views/  UI components (class names match design/assets/styles.css)
src/pages/[lang]/            Routes for /en/ and /bn/
src/styles/                  tokens.css + components.css (from the mockups) and global.css (Tailwind)
```

## Common tasks

- **What is still unconfirmed:** [`plans/2026-10-11-launch-cleanup-and-unconfirmed-items.md`](plans/2026-10-11-launch-cleanup-and-unconfirmed-items.md) §3, with what the site shows meanwhile.
- **Confirm a business fact:** update the value in `src/content/settings.ts`. Instagram, email and opening hours are empty, so they're hidden; filling one in shows it everywhere it belongs (footer, Visit page, contact chooser, design pages, structured data). Never show a guessed value without listing it in `todoVerify`.
- **Approve a photo:** in `media/asset-register.csv` set `media_status` to `authorized…`, `client_approval` to `approved` and `ownership_confirmed` to `yes`.
- **Publish a design:** add `src/content/designs/<slug>.yaml` (copy an existing one), add its photos to `src/assets/images/` + `src/data/photos.ts` + the asset register, then set `rights: approved` and `clientApproved: true` once AKHI signs off. Codes (`AF-BED-014`) are permanent and never reused.
- **Reviews:** add real ones to `src/content/testimonials.yaml` (format in the file). While it is empty, the build prints `The collection "testimonials" does not exist or is empty`; that is expected.
- **Turn on analytics:** set `settings.analytics.umamiWebsiteId`. Contact buttons already carry the Umami event attributes.

## Deploying (not connected yet)

Create a private GitHub repository, then a Cloudflare project connected to it. Build command `pnpm build` for preview branches and `pnpm build:production` for the production branch; output directory `dist`. `public/_redirects` sends `/` to `/en/` with a 301. See Build Plan M0, M11 and M14.
