# Akhi Furniture Website Design Mockups

| | |
|---|---|
| **Status** | Round 1 to 3 mockups, now with real AKHI photos and every page in English and Bengali. Ready for review, not approved yet. |
| **Date** | 2026-10-10 |
| **Made from** | The Akhi Furniture design system (claude.ai Design System artifact) + [Claude Design Brief](../plans/2026-10-10-claude-design-brief.md) + [Website Master Plan](../plans/2026-10-10-website-master-plan.md) |
| **Next** | Review, approve, then Claude Code builds from these files ([Website Build Plan](../plans/2026-10-10-website-build-plan.md)) |

These are **responsive HTML mockups**, not static pictures. Every page is one HTML file that reflows from a 360px phone to a 1920px desktop, so each page *is* its phone, tablet and desktop design. Screenshots of every page at phone, tablet and desktop sizes are in `screenshots/` for side-by-side comparison during the build.

---

## 1. How to view

1. Open `design/index.html` in Chrome or Safari. Pick a page on the left and a device size on top (small phone 360, phone 390, tablet 834, tablet landscape 1194, laptop 1280, desktop 1440, large desktop 1920). States such as "menu open" or "lightbox" are buttons above the preview.
2. Or open any file in `pages/` directly and resize the window.
3. Add `?state=` to a page URL to open a state: `menu`, `dropdown`, `sheet` (channel chooser), `toast`, `copied`, `lightbox`, `brief1` to `brief4`, `filtered`, `category`, `empty`, `shortlist`, `hover`.

## 2. Folder

```
design/
  index.html              mockup viewer (pages x device sizes x states)
  README.md               this handoff
  assets/
    tokens.css            design tokens as CSS variables (source of truth for the build)
    tokens.json           the design system's tokens + a "web" block with the website additions
    styles.css            all component and layout styles, mobile-first
    app.js                mockup behaviour + shared shell (header, menu, footer, sticky bar, chooser, toast, lightbox)
    fonts/                self-hosted woff2 (Inter, Space Grotesk, Anek Bangla, Hind Siliguri)
    akhi-logo-full.png    full logo, trimmed, from the design system
    akhi-mark.png         AF monogram, from the design system
    photos/               44 edited AKHI photos used by the mockups (web size, see section 8)
  pages/                  27 pages: every page in English and Bengali (*-bn.html), plus the
                          design system page, the bilingual 404 and the share-preview template
  screenshots/            <page>-phone|tablet|desktop.jpg (390 / 834 / 1440, full page)
                          <page>-<state>-<device>.jpg (one screen, overlays open)
```

## 3. Design decisions (and where they differ from the brief)

The brief's tokens were "starting values"; the client's design system, built from the real logo, replaces them.

1. **Colour.** Warm paper surfaces (`surface #faf6f0`, `surface-sunken #f2eadf`), charcoal ink, and **crimson `#c3061d`** from the wordmark as the one loud colour. The brief's walnut primary is replaced by crimson. Crimson is used only for primary buttons (including every WhatsApp button), links, selected filters and the recommended channel. Swoosh orange `#a83c09` is a small accent: the 32px rule under eyebrows, the active nav underline, icons in callouts. No full-bleed crimson sections.
2. **Dark bands.** Direction A with B-style dark bands, as the brief allows. The dark bands (From the workshop, For business hero, closing CTA on some pages) use the design system's own dark theme via `.theme-dark`. On dark, crimson lightens to `#ff6b74` with dark text.
3. **Type.** Space Grotesk (headlines, names, codes) and Inter (everything you read), from the design system, instead of Fraunces and Manrope. Bengali pair added for the web: **Anek Bangla** (display, matches Space Grotesk's open geometry) and **Hind Siliguri** (text). Bengali is about 12% larger with taller line heights, never uppercase or letter-spaced. Compare the pairs on `pages/design-system.html`.
4. **Type scale.** The design system's sizes are the desktop values; phone sizes scale down fluidly (`clamp`). Section titles use `heading-1` (32px) rather than the system's `heading-2`, because on a 1440px page a 24px section title is too quiet. Card titles use `heading-3`.
5. **Header.** Solid `surface` header, not transparent over the hero. The logo's charcoal disappears on dark photos, and the design system says the logo must sit on light. The header gets a hairline once you scroll.
6. **Logo lockup (proposed).** The stacked full logo becomes unreadable at header height (about 40px). The header uses the AF mark plus "Akhi Furniture" set in Space Grotesk 600 and a small "Dhaka" label. The full logo is used in the footer. Needs client sign-off, and a vector logo before launch.
7. **No WhatsApp green.** WhatsApp buttons are crimson with a WhatsApp glyph and a text label, as the brief asked (green behind white text fails contrast).
8. **Spacing.** Design system rhythm: sections are 56px apart on phones and 80px (`space-20`) from 768px. Gutters 16 / 24 / 32 / 48px. Container caps at 1440px.
9. **Depth.** Borders, not shadows. `shadow-card` only on desktop card hover, the dropdown and sheets.
10. **Not a shop.** No prices, no cart, no ratings, no sale badges anywhere. The design system's `price` style is unused.

## 4. Layout and breakpoints

| Width | What changes |
|---|---|
| **< 600** (phones, 360 to 430) | One column. Hero photo full-bleed 4:5 with copy below. 2-column design grid. Featured designs and reviews swipe sideways with a peek of the next card. Chips scroll sideways. Footer groups are accordions. Sticky contact bar. Buttons stack full-width. |
| **600 to 767** | Gutter 24. Buttons sit side by side. Swipe rows show about two cards. |
| **768 to 1023** (tablet portrait) | 3-column design grid. Hero photo 4:3 with rounded corners, copy below. Steps in a 2 x 2 grid. Footer columns open. Gallery shows thumbnails under the main photo. Sticky bar still visible in portrait. |
| **1024 to 1199** (tablet landscape, small laptop) | Hero becomes 16:9 with copy on a soft dark scrim. Design detail goes two columns (gallery about 60%, info about 40%). Steps in one row. Sticky bar hidden. Menu button still used. |
| **1200+** | Full navigation with the Designs dropdown and a WhatsApp button in the header. 4-column design grid. |
| **1440+** | Gutter 48, content capped at 1440. On 1920 the page simply gains side margins; nothing stretches. |

Checked with a script at 360, 390, 430, 768, 834, 1024, 1194, 1280, 1440 and 1920: no horizontal scrolling on any page. Interactive controls are at least 44px tall (inline text links inside sentences are the only exception).

## 5. Pages

| Round | File | Notes |
|---|---|---|
| 1 | `design-system.html` | Colours, EN + BN type pairs, spacing, radii, buttons and all states, chips, tags, code chip, cards (default, hover, shortlist v1.1, skeleton), contact UI, forms, icons, logo |
| 1 | `home.html` | All 12 sections from the brief, in order |
| 1 | `home-bn.html` | Full Bengali home |
| 1 | `designs.html` | Room + type filters, grid, filtered state (`?state=filtered`), empty state (`?state=empty`) |
| 1 | `design-detail.html` | Gallery, info panel, contact block, customization, materials, size, video, seen-in-project, related, FAQ snippet. States: lightbox, channel chooser, copied toast |
| 2 | `custom-furniture.html` | Hero, what we make, customization, swatches, 5-step process, **Design Brief helper** (4 steps + live message preview), FAQ, dark CTA |
| 2 | `our-work.html`, `project.html` | Project list with type filter; project page with fact row, story, mosaic gallery, designs used, testimonial, CTA |
| 2 | `visit.html` | Showroom card, all 7 channels as large rows, "before you visit" tips |
| 2 | Mobile menu, Designs dropdown | Any page with `?state=menu` / `?state=dropdown` |
| 3 | `about.html`, `for-business.html`, `sofa-renewal.html` (publish only when confirmed), `faq.html`, `404.html`, `privacy.html` | |
| 3 | `design-detail-bn.html` | Full Bengali design detail |
| All | `*-bn.html` | Bengali versions of every page. The language switch on any page goes to the same page in the other language |
| v1.1 | `designs.html?state=shortlist` | Shortlist: heart on each card, count in the header, drawer with "Send my shortlist on WhatsApp" (designed now, built later) |
| 1 | `designs.html?state=category` | Room category page (`/designs/bedroom/`): own title and intro, room chip selected |
| 3 | `og-template.html` | 1200 × 630 share-preview images: design (EN and BN) and the site-wide default |
| 3 | Tablet landscape | `screenshots/home-fold-tablet-landscape.jpg`, and every page in the viewer at 1194 |

## 6. Components (class names in `styles.css`)

Header `.site-header` · Designs dropdown `.dropdown` · Mobile menu `.mobile-menu` · Language switcher `.lang-switch` · Buttons `.btn--primary / --secondary / --ghost`, sizes `--sm / default / --lg`, `.btn-icon` · Sticky contact bar `.sticky-bar` · Channel chooser `.sheet` + `.channel` · Toast `.toast` · Home hero `.hero` · Inner hero `.inner-hero` · Compact header `.page-head` · Breadcrumbs `.crumbs` · Trust strip `.trust` · Category tile `.cat-tile` · Design card `.d-card` · Filter chips `.chip` · Gallery `.gallery` · Lightbox `.lightbox` · Code chip `.code-chip` · Customization list `.custom-list` · Swatches `.swatch` · Process `.steps` · Project card `.p-card` · Before/after `.ba` · Testimonial `.quote-card` · Video `.video` · Section header `.section-head` · CTA band `.cta-band` (light, or with `.theme-dark`) · Showroom card `.showroom` · FAQ `.faq` · Design Brief `.brief` · Footer `.site-footer` · Empty state `.empty` · Placeholder photo `.ph`.

## 7. Behaviour that a static frame can't show

1. **Header.** Sticky. Gets a bottom hairline after 8px of scroll. Below 1200px the nav collapses to a menu button.
2. **Mobile menu.** Full-screen, large links, room chips under Designs, WhatsApp + Call buttons, address and hours at the bottom. Locks page scroll. Escape closes it.
3. **Designs dropdown.** Opens on click (not hover) so it works with touch laptops and keyboards. Closes on outside click or Escape.
4. **Sticky contact bar.** Phones and tablet portrait only. General pages: `Call · WhatsApp us · ⋯`. Design pages: `Ask about AF-BED-014 · ⋯`. Slides away while the footer is on screen (IntersectionObserver), so it never covers the footer's own contact links. The page reserves 72px at the bottom for it.
5. **Channel chooser.** `⋯` opens a bottom sheet on phones and a centred dialog from 768px. WhatsApp is first and marked Recommended. Messenger and Instagram **copy the design code first**, show the toast, then open the chat (they can't take pre-filled text).
6. **Toast.** Dark pill above the sticky bar: "Design code AF-BED-014 copied, paste it in your message". Auto-hides after about 3 seconds. `role="status"`.
7. **Design code chip.** Tap copies the code; the icon becomes a green check.
8. **Gallery.** Phones: swipe with scroll-snap, dots and a "1 / 6" counter. Tablet: thumbnails below. Desktop: thumbnail rail on the left. Tap any photo (or the expand button) for the lightbox.
9. **Lightbox.** Full-screen near-black, counter, caption, close, arrows on desktop, "Pinch to zoom" hint on touch. Use PhotoSwipe 5 in the build.
10. **Design detail on desktop.** Both columns are sticky, so whichever is shorter (usually the gallery) stays in view while the other scrolls. The contact block sits near the top of the info panel so it is visible on first load.
11. **Design card hover (desktop with a mouse only).** Cross-fades to a second photo and shows a material label; the card gains `shadow-card`; image zoom 1.03 over 600ms. On touch screens the material is always shown as a text line instead.
12. **Design Brief helper.** 4 steps, all optional, Skip on every step, "Just message us" always visible. Step 1 multi-select chips, step 2 single-select, step 3 size text + material chips, step 4 area + when. The preview bubble updates live and becomes the WhatsApp text, in the page's language, ending with "Sent from akhifurniture.com". Nothing is stored. On phones the preview sits under the form.
13. **Testimonials.** Shown in the original language with a "Show translation" toggle.
14. **Before/after.** A full-size invisible range input sits on top, so drag, tap and arrow keys all work.
15. **Footer.** Accordion groups on phones, open columns from 768px.
16. **Motion.** 200 to 300ms ease-out, no parallax, no autoplay video. Everything is switched off under `prefers-reduced-motion`.
17. **Language switch.** Always visible, goes to the same page in the other language. On Bengali pages every internal link goes to the Bengali version.
18. **Shortlist (v1.1).** Heart toggles on cards, a crimson count badge on a heart button in the header, and a drawer (bottom sheet on phones, right-hand panel from 768px) that sends the whole list in one WhatsApp message. Stored in the browser only. In the build the heart must be a sibling button over the card link, not nested inside it.

## 8. Photos

The mockups now use **real AKHI Furniture photos** from the brand's public Facebook page (collected on 2026-10-10, logged out, public posts only).

1. **Where they live.** All 100 originals, untouched, are in `../media/originals/facebook/` with `manifest.json` (Facebook photo ID and source link for each). Edited full-size masters are in `../media/edited/`, transparent cutouts in `../media/edited/cutouts/`, and web-size copies in `assets/photos/`. `../media/asset-register.csv` lists every photo used: where it appears, its source post, the edits made, and its approval status.
2. **Edits made.** Only global corrections: levels, a white-balance nudge of at most 6%, mild contrast and saturation, light sharpening, and crops (one crop removes a corner logo and a phone timestamp). Nothing was generated or repainted, and the furniture itself is unchanged.
3. **Background removal.** Four pieces have clean studio cutouts on a warm ground that matches `surface-sunken`: the carved velvet sofa, the velvet armchair, the mahogany wardrobe and the champagne showcase (`c-*.jpg`). Stray bits of neighbouring furniture were erased by hand. Automatic removal was tried on the others and rejected: it cut off bed headboards that touch the wall and made mirror glass transparent, which would misrepresent the furniture. Those stay as graded in-room photos (`d-*.jpg`). Doing more cutouts properly needs manual masking in a photo editor.
4. **Still placeholders.** There are no office, conference, reception or sofa-renewal photos on the page, so the Office room tile, the For Business page, the business band on Home and the renewal before/after keep labelled placeholders ("no photo yet"). Swatch colours are still stand-ins.
5. **Design names and codes** now describe the furniture in the photos (for example AF-DIN-021 Marble-top dining set, the design shown on the detail page). Codes, materials, sizes and project stories are still samples to confirm with AKHI.
6. **Before launch.** Every photo needs AKHI's written permission and confirmation that it shows their own work (see the asset register's `media_status`, `client_approval` and `ownership_confirmed` columns). A few wardrobe mirrors show the photographer's reflection at a small size; check those for people before publishing.

## 9. Placeholders and content integrity

1. **Photos** are covered in section 8. Where no real photo exists yet, a labelled placeholder shows the subject and crop ratio. Never fill those gaps with stock or AI-generated furniture.
2. **Sample content.** Design names, codes, materials, project stories and the three reviews are samples so the layout can be judged. Reviews carry a visible `SAMPLE REVIEW` tag and must be replaced with verified Facebook reviews used with permission.
3. **Unverified facts** are marked with a dotted orange underline (`.verify`) or a `TODO-VERIFY` tag: phone 01600-297923, address, hours, email, Messenger/Instagram usernames, follower count, materials, process steps, delivery coverage, warranty. Remove these markers in the build; the facts come from the verified site settings file.
4. **Brand icons.** WhatsApp, Messenger, Instagram, Facebook and YouTube icons in the mockups are generic stand-ins. Use each brand's official glyph in the build.
5. **Swatch colours** are stand-ins. In the build, swatches are crops from real photos.

## 10. Notes for the build (Claude Code)

1. `assets/tokens.css` maps 1:1 to the Tailwind v4 `@theme`. Keep the `.theme-dark` and `:lang(bn)` overrides.
2. `assets/app.js` is mockup scaffolding. Rebuild the shell as Astro components and keep only the small behaviours (menu, dropdown, sheet, copy + toast, sticky bar observer, gallery, brief helper) as tiny scripts or the one Preact island.
3. Fonts are already self-hosted woff2 subsets here (Fontsource, SIL OFL). Load only the weights listed in `tokens.json`.
4. Use the class names as component names where helpful (`DesignCard`, `CodeChip`, `ChannelChooser`, `StickyContactBar`, ...).
5. Art-direct hero images: separate phone (4:5) and desktop (16:9) crops via `<picture>`.
6. Compare each built page with `screenshots/<page>-phone|tablet|desktop.jpg`.

## 11. Open items for the client

1. Approve crimson + Space Grotesk/Inter direction (replaces walnut + Fraunces/Manrope in the brief).
2. Approve the header lockup (mark + typed name), and supply a vector logo and a light version for dark backgrounds.
3. Brand name in Bengali (the mockups keep "Akhi Furniture" in Latin letters in the logo and use আখি ফার্নিচার in text).
4. All `TODO-VERIFY` facts listed in Master Plan section 23.
5. Written permission to use the Facebook photos on the website, and confirmation that each one is AKHI's own work.
6. Photos of office and conference work, and of sofa renewal (if the service is offered), to replace the remaining placeholders.
7. Higher-resolution originals where possible: Facebook serves at most 2048 px, and some posts only 720 to 1280 px.
