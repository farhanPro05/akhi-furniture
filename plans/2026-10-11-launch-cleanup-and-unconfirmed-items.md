# Launch Cleanup and Unconfirmed Items

| | |
|---|---|
| **Status** | Done (the cleanup). The register in §3 stays open: tick items off as AKHI confirms them. |
| **Date** | 2026-10-11 |
| **Related plans** | [Website Master Plan](2026-10-10-website-master-plan.md) (§23 facts to collect) · [Website Build Plan](2026-10-10-website-build-plan.md) (M13, M14) |

---

## Purpose

On 2026-10-11 the user decided to put the site live before AKHI Furniture can be reached. Everything on the site that was a placeholder, or that AKHI hasn't confirmed, was taken off or rewritten to what AKHI's own public pages support. This file is the record of what was removed and what is still unconfirmed, so any of it can be brought back once AKHI confirms it.

**When asked "what isn't confirmed yet?", answer from §3.**

## 1. What was found online

| Fact | Result | Source |
|---|---|---|
| Showroom address | **417 Apollo Hospital Road, Dhalibari Kancha Bazar, Bashundhara, Dhaka 1212**. Now on the site in English and Bengali. | AKHI's own Facebook video posts ("Address: 417, Apollo hospital road, Dhalibari kancha Bazar, Bashundhara, Dhaka"); "Dhaka-1212" from a public listing of the same business |
| Phone / WhatsApp | 01600-297923, "WhatsApp and Imo". Unchanged. | AKHI's Facebook posts |
| What AKHI makes | Home and office furniture, mostly wood and board, customization available | Public listing (Facebook intro) |
| Opening hours | **Every day, 10 AM – 10 PM.** Now on the site. (Web search only found other "Akhi" shops in Badda; the user then sent a screenshot of AKHI's own listing.) | AKHI's Google Maps listing, screenshot from the user, 2026-10-11. The same listing shows "dhalibari kancha bazar, 417 apollo hospital road, Dhaka 1212", phone 01600-297923 and **youtube.com** as its website |
| Email | **Not confirmed.** A search summary of AKHI's Facebook intro mentions `akhifurniture2019@gmail.com`, but no page showing it could be loaded. Not used. | Web search |
| Instagram | **Not confirmed.** `@akhifurniture` exists but has 10 followers and no link to AKHI. Not linked. | instagram.com/akhifurniture |
| YouTube | **Removed from the site** at the user's request (they believe AKHI has no channel). Note: the discovery research found "Akhi Furniture Official" (`youtube.com/@akhifurnitureofficial`) using the same phone number, and AKHI's Google Maps listing gives youtube.com as its website. Ask AKHI before adding it back. | Discovery file; Google Maps listing; user, 2026-10-11 |

## 2. What changed on the site

| Item | Before | Now | To bring it back |
|---|---|---|---|
| Address | "Showroom address, Bashundhara R/A" | Real address, both languages; structured data has street, city and postcode | When AKHI shares its Google Maps place, put that link in `showrooms[0].mapUrl` |
| Map link | Google Maps search for "Akhi Furniture Bashundhara" | Google Maps search for the name and the real address | Same as above |
| Opening hours | "To be confirmed" | "Open every day, 10 AM – 10 PM" on the showroom card, footer and phone menu, plus `openingHoursSpecification` in structured data. The FAQ "Do I need an appointment?" says to come during opening hours | Change `showrooms[0].hours` in `src/content/settings.ts` (display text and the structured days/times together) |
| Email | `hello@akhifurniture.com` (made up) | Not shown anywhere (footer, Visit, privacy, structured data) | Set `settings.email` |
| Instagram | Linked in the footer, Visit page, contact chooser and design pages | Not shown anywhere | Set `settings.instagramUsername` |
| YouTube | Footer icon, Visit page row, video blocks on Home, About and every design page | Removed. Home's workshop band shows a workshop photo and links to Facebook; design pages show the project the design appears in, or the showroom | Restore `src/components/VideoBlock.astro` from git (commit `4c509e9`), add video IDs to settings, restore the CSP `frame-src` |
| Reviews | 4 made-up sample reviews | Removed. `testimonials.yaml` is empty and the review sections hide | Add real reviews with written permission (format in the file) |
| Photo placeholder boxes | Office photo (Home section, For Business hero, Office room tile), sofa before/after | None. The Office room has no tile, link or page while it has no designs. For Business and Sofa Renewal are off in every build. `Placeholder.astro` now fails the build, so an empty photo box can never ship | Add real photos, then set `settings.pages.forBusiness` / `sofaRenewal` |
| Material swatches | 8 stand-in colours (Custom Furniture), 3 on the dining design | Removed. Design pages say material options are discussed during consultation | Swatches cropped from real photos, with names AKHI confirms |
| Design names and materials | "Leather", "Mahogany", "Marble-top", "hand-carved" | Visual descriptions only: Chesterfield sofa, Wardrobe with mirror doors, Marble-look dining set. URLs renamed to match (`chesterfield-sofa`, `mirror-door-wardrobe`, `marble-look-dining-set`). Codes unchanged | Use AKHI's real names and materials |
| Copy | Founding story, "we deliver it to your door", home measuring visits, "exact price", timelines, "36K+ on Facebook", finish lists (natural/walnut/dark/painted), "solid wood, veneer", "talk to a designer", "any time during opening hours" | Rewritten to what AKHI's public pages support: location, what they make, wood and board, made to order, a generic 4-step process with no timelines or delivery promise | Replace with AKHI's confirmed process, story and claims |
| FAQ | Office-order and email-quote answers published | Both are drafts (hidden), so the FAQ has no "Business orders" group | Publish once office work and email are confirmed |
| Privacy notice | Said "we use cookie-free analytics" (not switched on) and "write to us at {email}" | Says the site uses no tracking while Umami is off (switches automatically once the ID is set); questions go to the phone number; dated 2026-10-11 | Nothing to do: it follows the settings |
| Photo rights in the live build | `pnpm build:production` hid all 12 designs and 5 projects and replaced all 44 photos with placeholders (none have written permission) | `settings.publishPendingRights: true` publishes them. `media/asset-register.csv` still records every photo as pending | Set it to `false` to go back to approved-only |
| Launch gate | 18 `todoVerify` entries stopped the production build | `todoVerify` is empty and the production build passes. It is only for placeholder values that are visible on the site | Add an entry whenever a guessed value is shown |

## 3. Register: still unconfirmed (ask AKHI)

What the site shows in the meantime is in brackets.

**Rights and identity**
- [ ] Written permission to use and edit the 44 Facebook photos, and confirmation they are AKHI's own work *(published; asset register says pending)*
- [ ] Brand name in Bengali (আখি ফার্নিচার) and the logo files *(shown as written)*
- [ ] Messenger goes to the right Page (`akhifurniturebangladesh`, where the photos came from) *(shown)*
- [ ] Who answers 01600-297923 and WhatsApp *(shown; AKHI publishes this number)*

**Contact details**
- [x] Opening hours: every day, 10 AM – 10 PM (Google Maps listing, 2026-10-11)
- [ ] Exact Google Maps place *(map search by name and address)*
- [ ] Email address *(hidden; lead: `akhifurniture2019@gmail.com`)*
- [ ] Instagram account *(hidden; lead: `@akhifurniture`, probably not theirs)*
- [ ] YouTube channel *(removed; leads: `@akhifurnitureofficial`, and the Google Maps listing links to youtube.com)*
- [ ] Second branch (a 2024 YouTube description mentioned Banani) *(only Bashundhara shown)*

**Services and content**
- [ ] Office furniture: what AKHI makes, plus photos *(For Business page, Office room and office project filter are all off)*
- [ ] Sofa renewal: still offered? Before/after photos *(page off)*
- [ ] Real customer reviews with permission *(sections hidden)*
- [ ] Woods, finishes and fabrics AKHI uses; real swatches *(generic "wood and board", no swatches)*
- [ ] Ordering steps and typical timelines *(generic 4 steps, no timelines)*
- [ ] Delivery coverage and installation *("outside Dhaka" FAQ says ask on WhatsApp; "Do you set up the furniture?" is a draft)*
- [ ] Warranty terms, including the reported 20-year woodworm guarantee *(never shown; FAQ draft)*
- [ ] Founding story and year *(About shows only location and what they make)*
- [ ] Design names and descriptions *(describe what the photos show; codes are the website's own reference system)*
- [ ] Project details *(describe only what the photos show; no customer names, areas or years)*
- [ ] Facebook follower count for the trust strip *(removed; strip says "Follow us on Facebook")*

**Accounts**
- [ ] Umami Cloud website ID *(analytics off; privacy notice says so)*
- [ ] Domain registrar access, and whether email runs on the domain
- [ ] Native Bengali review of all copy

## 4. Deliberately unchanged

- General mentions of office furniture ("beds, sofas, dining sets and office furniture"): AKHI's own Facebook intro says it makes home and office furniture.
- The Design Brief still offers "Office desk" and "Conference table": that is the visitor's choice in their own WhatsApp message, not a claim.
- The map on the showroom card is the mockups' drawn map tile linking to Google Maps, not a missing photo.
- `pnpm build` prints `The collection "testimonials" does not exist or is empty` while there are no reviews. Expected; it disappears with the first review.

---

## Changelog
- **2026-10-11:** Written after the cleanup. Address found on AKHI's Facebook posts; hours, email, Instagram not confirmed; YouTube removed at the user's request.
- **2026-10-11:** Opening hours confirmed from AKHI's Google Maps listing (every day, 10 AM – 10 PM) and added to the site and structured data. The listing also matches the address and phone, and links to youtube.com.
