# Website Build Plan

| | |
|---|---|
| **Status** | In progress. The user said to start building from the `design/` mockups on 2026-10-10. |
| **Date** | 2026-10-10 |
| **Related plans** | [Website Master Plan](2026-10-10-website-master-plan.md) (what to build and why) · [Claude Design Brief](2026-10-10-claude-design-brief.md) (how it should look) |

---

## Purpose

The step-by-step order in which Claude Code builds the AKHI Furniture website from the approved mockups. Each milestone ends with checks that must pass before moving on.

**Ground rules for every milestone**
- Build mobile-first, and check every page and component at **360, 390, 430, 768, 834, 1024, 1280, 1440 and 1920px** before calling it done (CLAUDE.md §2).
- Every visible text exists in **English and Bengali**. Nothing is hard-coded in one language.
- Nothing commerce-related: no prices, cart, checkout, accounts, or payment code.
- Placeholders for unconfirmed business facts (phone, hours, address, usernames) live in **one settings file only** and are flagged `TODO-VERIFY`, so they can't be missed before launch.
- Only real AKHI photos with `rights: approved` are published. Until those exist, use plain labelled placeholder blocks, never stock images.

## Inputs needed before starting

| Input | Where it comes from | Needed by |
|---|---|---|
| Approved mockups (phone / tablet / desktop) | Claude Design → `design/` | M1 |
| Design tokens (colors, type, spacing, radii, motion) | Claude Design export → `design/` | M1 |
| First edited photos (6–10) | Media sprint → `media/` | M8 |
| Asset register | Media sprint → `media/` | M13 |
| Verified business facts | Collected from AKHI (Master Plan §23) | M14 (placeholders until then) |

Milestones M0, M2, M3 and the logic of M4 don't depend on the visual design. They can start as soon as building is approved, even while later design rounds continue.

---

## Milestones

### M0: Project setup
- `git init`; private GitHub repository; `.gitignore` (node_modules, build output, `media/originals/`, `.env*`)
- Astro 6 (latest stable), TypeScript strict, Tailwind CSS v4, pnpm, Node LTS
- ESLint + Prettier (with the Astro and Tailwind plugins)
- Cloudflare project connected to GitHub: every push deploys, and every branch gets a preview URL
- Folder structure per Master Plan §18

**Done when:** an empty bilingual "hello" page deploys to a Cloudflare preview URL in both `/en/` and `/bn/`.

### M1: Design tokens and base styles
- Turn the Claude Design tokens into CSS variables plus the Tailwind theme (colors, type scale, spacing, radii, motion)
- Self-host the chosen fonts with Fontsource (Latin + Bengali subsets, `font-display: swap`, preload the display font)
- Base typography including the Bengali rules (larger size, more line height, no uppercase or letter-spacing on Bengali)
- Container (max 1440px), gutters, 4/8/12-column grid, breakpoints, `prefers-reduced-motion` handling

**Done when:** a token/type specimen page matches the Claude Design system page at phone, tablet, and desktop, in both languages.

### M2: Bilingual foundation
- Astro i18n config: locales `en` and `bn`, both prefixed (`/en/`, `/bn/`); `/` → permanent redirect to `/en/`
- `src/i18n/en.json` + `bn.json` for UI strings; a typed `t()` helper. The build fails if a key is missing in either language.
- Helpers: localized URL builder, "same page in the other language" mapping for the switcher, Bengali-digit formatter for display numbers
- `hreflang` + canonical tags component (en, bn, x-default → `/en/`)

**Done when:** switching language on any test page lands on the same page in the other language, and a missing translation key breaks the build.

### M3: Content layer
- Astro Content Collections with schemas for `designs`, `projects`, `categories`, `testimonials`, `faqs`, and the single `settings` file (fields per Master Plan §9, including `kind`, `source`, `rights`, `clientApproved`)
- Publish guard: only `status: published` + `rights: approved` + `clientApproved: true` items appear on the site
- Every `{en, bn}` field is required for published items
- 2–3 sample entries with placeholder images, marked `status: draft` so they never ship

**Done when:** the build validates all content and a deliberately broken entry (missing Bengali title, unapproved rights) is rejected or hidden.

### M4: Contact system (core feature)
- Link builders driven by the `settings` file:
  - WhatsApp `https://wa.me/<number>?text=<encodeURIComponent(message)>`
  - Messenger `https://m.me/<page>`
  - Instagram `https://ig.me/m/<username>`
  - Phone `tel:+880…`
  - Google Maps place URL
- Message templates in English and Bengali (Master Plan §8.3): design-specific and general versions, each ending with the "sent from akhifurniture.com" line
- Copy-to-clipboard of the design code + link before opening Messenger or Instagram, with a toast
- Components: contact button, **channel chooser** (bottom sheet on phones, popover/modal on desktop; accessible dialog with focus trap and Esc to close), **sticky contact bar** for phones and tablet portrait (general and design-specific variants; hides when the footer is visible)
- Unit tests for every link builder (correct number format, encoding of Bengali text, design code present)

**Done when:** tests pass, and on a real phone each channel opens the right app or account with the right message.

### M5: Layout shell
- Header (desktop full nav; menu button below 1200px; transparent over the home hero, solid when scrolled), Designs dropdown, full-screen mobile menu, language switcher, footer (accordions on phones), breadcrumbs, skip link, bilingual 404
- SEO head component (title, description, Open Graph, canonical, hreflang)

**Done when:** the shell matches the mockups at all test widths, is fully keyboard-usable, and shows no horizontal scrolling anywhere.

### M6: Component library
Built from the Claude Design Brief §5, each one checked at phone/tablet/desktop and in both languages:
buttons · trust strip · category tile · design card (hover + touch variants, skeleton) · filter chips · gallery (thumbnail rail on desktop, swipe on phones, CSS scroll-snap) · **PhotoSwipe** lightbox · design code chip · customization list · material swatches · process steps (horizontal / vertical) · project card · before/after slider · testimonial card with translation toggle · **lite-youtube** video block · section header · CTA bands (light/dark) · showroom card (map preview image linking out, no embedded map on load) · FAQ accordion (`<details>`) · toast

**Done when:** a components page shows every component and state, matching the mockups at all test widths.

### M7: Pages
Built in this order (highest value first). Each page is finished in English and Bengali before moving on:
1. **Home**
2. **Designs** catalog + room category pages (filter chips, 2/3/4-column grid)
3. **Design detail** (gallery, info panel that stays in view on desktop, contact block, related designs, sticky bar on phones)
4. **Custom Furniture** + the **Design Brief helper** (one small Preact island: 4 steps → WhatsApp message preview → send; nothing stored)
5. **Our Work** list + project page
6. **Visit & Contact**
7. **About**
8. **For Business** (built now; hidden from navigation until real office projects are approved)
9. **FAQ**, **Privacy**
10. **Sofa Renewal** (built now; published only once the client confirms the service)

**Done when:** each page matches its mockups at all test widths in both languages and passes the M12 automated checks.

### M8: Images and media
- Astro `<Picture>` everywhere: AVIF + WebP, responsive widths 400–2560px, correct `sizes`, lazy-loading below the fold, eager + high priority for the hero
- Art direction: separate phone (4:5) and desktop (16:9) crops for heroes
- Dominant-color or blurred placeholders to avoid layout shift
- **Open Graph images** generated at build time for every design and project (1200 × 630: photo + name + code, with the Bengali font embedded for `/bn/` pages)
- No autoplaying video on phones; respect the browser's data-saver setting

**Done when:** the hero is under 200 KB on phones, CLS is under 0.1, and share previews look right in the Facebook Sharing Debugger and in WhatsApp.

### M9: SEO
- Per-page, per-language titles and descriptions; canonical; hreflang
- `@astrojs/sitemap` with i18n alternates; `robots.txt`
- JSON-LD: `FurnitureStore` (from the settings file), `BreadcrumbList`, `WebSite`, `VideoObject`, `FAQPage`. No `Product` markup.
- Bilingual alt text required on every image (the schema enforces it)

**Done when:** Google's Rich Results Test validates the structured data and the sitemap lists every page in both languages.

### M10: Analytics
- Umami Cloud script (cookieless), loaded with `defer`
- Events from Master Plan §16 via `data-umami-event` attributes on contact buttons, with only the listed properties
- Privacy page describing the analytics
- Google Search Console verification (DNS record)

**Done when:** test clicks show up in the Umami dashboard with the right channel, placement, and design code.

### M11: Security and caching
- Cloudflare `_headers`: Content Security Policy (via Astro 6's CSP support), HSTS, Referrer-Policy, Permissions-Policy, X-Content-Type-Options
- Long cache lifetimes for hashed assets, short ones for HTML
- `www` → apex redirect (or the reverse, matching the domain setup)

**Done when:** securityheaders.com grades A or better, and nothing is blocked by the CSP (no console errors).

### M12: Automated testing and QA
- **Playwright** at 360×780, 390×844, 430×932, 768×1024, 834×1194, 1024×768, 1280×800, 1440×900, 1920×1080:
  - no horizontal overflow on any page
  - every contact link is valid (no empty or `#` links; WhatsApp links contain the right number and, on design pages, the design code)
  - the language switcher maps every page to its counterpart
  - menu, dropdown, channel chooser, lightbox, and Design Brief helper all work by touch and keyboard
  - screenshots per page per width, for side-by-side comparison with the mockups
- **axe** accessibility scan on every page
- **Lighthouse CI** budgets: mobile Performance / Accessibility / Best Practices / SEO ≥ 90; JavaScript < 50 KB per page
- Broken-link check across the whole site
- Manual pass on real devices, including the **Facebook, Messenger, and Instagram in-app browsers** (Master Plan §20)

**Done when:** everything passes in CI on every push.

### M13: Content entry
- Enter the approved designs (12–18) and projects (4–8) from the asset register, plus testimonials and FAQs, in both languages
- Native Bengali review of all copy
- Client approval recorded per item (`clientApproved: true`)

**Done when:** every launch item is published with approved rights, and no draft or placeholder content is visible.

### M14: Launch
- Replace every `TODO-VERIFY` placeholder with confirmed facts; the build fails if any remain
- Move `akhifurniture.com` DNS to Cloudflare, **keeping any existing email (MX) records**; attach the custom domain; HTTPS on the bare domain and `www`
- Submit the sitemap in Search Console
- Update the website link on the Facebook Page, Instagram bio, YouTube channel, and Google Business Profile (with matching address, phone, and hours)
- Hand over the one-page staff playbook (Master Plan §21)

**Done when:** the site is live on `akhifurniture.com`, every launch checklist item in Master Plan §20 is ticked, and the first real WhatsApp inquiry from the site has been received.

---

## Definition of done (every page)

- [ ] Matches the approved mockups at phone, tablet, and desktop
- [ ] Checked at 360 / 390 / 430 / 768 / 834 / 1024 / 1280 / 1440 / 1920px with no horizontal scrolling
- [ ] Complete in English and Bengali; the language switcher works
- [ ] All contact buttons tested
- [ ] Lighthouse mobile ≥ 90; no console errors
- [ ] Keyboard and screen-reader basics pass (axe clean)
- [ ] No prices, commerce elements, stock photos, or unverified claims

---

## Build progress

Built from the `design/` mockups (Rounds 1–3). How to run, build modes and common content tasks are in the project [`README.md`](../README.md).

| Milestone | State | Notes |
|---|---|---|
| M0 Setup | Done locally | `git init` done, nothing committed yet. Astro 6.4 (Astro 7 is out; the plan says 6), TypeScript strictest, Tailwind v4, pnpm 10, ESLint + Prettier. **Still to do:** private GitHub repository and the Cloudflare project (need the owner's accounts). |
| M1 Tokens & base styles | Done | `design/assets/tokens.css` and `styles.css` ported as-is (class names match the mockups); Tailwind theme mapped to the tokens; self-hosted fonts with `unicode-range`, so English pages never download the Bengali fonts. The token specimen page was not rebuilt; `design/pages/design-system.html` remains the reference. |
| M2 Bilingual foundation | Done | `/en/` + `/bn/`, `/` → `/en/` (301 via `public/_redirects`). `en.json`/`bn.json` with 500+ keys; the build fails on a missing key. hreflang + canonical; Bengali digits for display. |
| M3 Content layer | Done | Collections: designs (12), projects (5), rooms, testimonials (4 samples), FAQs (13, 3 drafts). Publish guard + build modes (see README). Photo rights are read from `media/asset-register.csv`. |
| M4 Contact system | Done | Link builders with unit tests (Bengali encoding, number format, design code). WhatsApp messages per context (general, design, project, business, renewal, brief), each ending "sent from akhifurniture.com". Messenger/Instagram copy the code first, then open. Sticky bar, channel chooser (sheet / dialog, focus trap, Esc), toast. **Still to do:** real-phone test of every channel. |
| M5 Layout shell | Done | Header, Designs dropdown (click), full-screen menu, language switch, footer accordions, breadcrumbs, skip link, bilingual 404, SEO head. |
| M6 Components | Done | Everything in Design Brief §5 except the v1.1 shortlist. No separate components showcase page. |
| M7 Pages | Done (all 10) | For Business and Sofa Renewal are built in preview and switched off for production until `settings.pages` says otherwise. |
| M8 Images | Mostly done | AVIF + WebP srcsets, art-directed hero, dominant-colour placeholders, hover photo only downloads on mouse desktops. Share images use the design/project photo cropped to 1200 × 630, or `public/og-default.jpg`. **Still to do:** the OG template with name + code text (design/pages/og-template.html). |
| M9 SEO | Done | Per-page titles/descriptions in both languages, sitemap with alternates, robots.txt (blocks preview builds), JSON-LD FurnitureStore, BreadcrumbList, WebSite, FAQPage. VideoObject is ready for when video IDs exist. |
| M10 Analytics | Wired | Umami event attributes on every contact button; design_view, brief_start/brief_send, code_copy, video_play, language_switch. The script loads once `settings.analytics.umamiWebsiteId` is set. Privacy page done. |
| M11 Security & caching | Done (untested on Cloudflare) | `scripts/postbuild.mjs` writes `_headers`: CSP (inline scripts by hash), HSTS, Referrer-Policy, Permissions-Policy, nosniff, long cache for hashed assets. |
| M12 QA | Automated part done | 196 Playwright tests (all pages × 9 widths, language switch, axe, console errors, interactions) + 18 unit tests, all passing. Post-build link checker. JS is 2–4 KB gzip per page; phone hero ≤ 84 KB. **Still to do:** Lighthouse CI, CI on push, real devices and in-app browsers. |
| M13 Content entry | Waiting on AKHI | Entries are samples made from the mockups and real photos (`rights: pending`, `clientApproved: false`). Reviews are samples and never ship. No customer stories were invented: projects only describe what the photos show. |
| M14 Launch | Blocked by design | `pnpm build:production` lists the 18 facts in `settings.todoVerify` and stops until each is confirmed. |

**Deliberate changes from this plan**
- Design Brief helper is a small vanilla script, not a Preact island (`design/README` §10.2 allows either); it keeps page JavaScript at about 3 KB.
- YouTube blocks use a 15-line click-to-load script with our own poster photo instead of lite-youtube-embed. No real video IDs are confirmed yet, so they link to the channel.
- The CSP is written to `_headers` with script hashes after the build, instead of Astro's built-in CSP, because inline `style` attributes (photo focal points) would be blocked by a hashed `style-src`.

---

## Changelog
- **2026-10-10:** First version, written after the user approved the Master Plan.
- **2026-10-10:** Build started from the `design/` mockups. Added the Build progress section: M1–M11 built, M12 automated tests passing, M0 still needs GitHub and Cloudflare, M13–M14 wait on AKHI's facts and approvals.
