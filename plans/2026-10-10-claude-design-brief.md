# Claude Design Brief

| | |
|---|---|
| **Status** | Approved. Ready to use in Claude Design. |
| **Date** | 2026-10-10 |
| **Related plans** | [Website Master Plan](2026-10-10-website-master-plan.md) (source of truth for scope, content, and tech) · [Website Build Plan](2026-10-10-website-build-plan.md) (how the mockups get built) |
| **Use** | Attach this file in Claude Design. Upload 6–10 real AKHI Furniture photos with it. |

---

## How to use this brief

1. **Before opening Claude Design:** save 6–10 of the best real photos from AKHI's Facebook Page or YouTube (a bed, a sofa, a dining set, a wardrobe or showcase, an office piece, one showroom shot). Mockups must be judged against the *real* photo quality, not stock imagery.
2. Open Claude Design, attach this file and the photos, and paste the starter prompt below.
3. Work through the rounds in order (§9). Approve Round 1 before moving on.
4. When a round is approved, export the tokens, screenshots, and specs into this project's `design/` folder and add a link to the Claude Design project in `plans/README.md`.

### Starter prompt (paste into Claude Design)

> Design a bilingual (English + Bengali) website for **AKHI Furniture**, a custom-furniture maker and showroom in Dhaka, Bangladesh. It's a premium **digital showroom for displaying their furniture**, not an online shop: no prices, no cart, no checkout, no login. Visitors browse real work and contact AKHI on WhatsApp, Messenger, Instagram, or by phone. Every page exists in English and Bengali, with an `EN | বাং` switcher always visible.
> Follow the attached brief exactly. Every page and component must be designed at **three sizes: phone (390px), tablet (834px), and desktop (1440px)**. Use only the attached real AKHI photos for furniture imagery. Where a photo is missing, use a plain labelled placeholder, never stock furniture photos.
> Start with **Round 0**: show visual directions A and B side by side (home hero + one design card + one button set) at phone and desktop sizes so I can pick one.

---

## 1. Brand in brief

- **Who:** AKHI Furniture. Showroom in the Bashundhara area of Dhaka. Makes beds, sofas, dining sets, wardrobes, dressing tables, showcases, and office/conference furniture, much of it **custom-made to the customer's size and taste**. About 36K followers on Facebook. Active YouTube channel with making-of and showroom videos.
- **Customers:** families furnishing homes (mostly on phones, often arriving from Facebook) and businesses furnishing offices (more on desktop).
- **What the website must make people feel:** *"These people understand furniture design. They can make something beautiful and unique for my home or office. I want to contact them."*
- **Personality:** warm, confident, crafted, honest. Premium without being cold or foreign-looking. Local pride, real workmanship.
- **Voice:** short, clear, friendly. Talks about *your space, your size, your style*. No hype ("best in Bangladesh!!"), no discount language.
- **Logo:** not confirmed yet. Use a text wordmark **AKHI FURNITURE** in the display serif as a placeholder.

---

## 2. Visual direction

### Direction A: Warm Editorial Luxury (recommended starting point)
Warm ivory backgrounds, walnut and charcoal, oversized photos, quiet serif headlines, lots of breathing room. Feels like a design magazine about the furniture. Forgiving of average photos because the layout and typography carry the premium feel.

### Direction B: Contemporary Showroom (alternative)
Charcoal or near-black sections, dramatic contrast, an architectural grid, light text on dark. Very striking with excellent photos, harsh with mediocre ones.

**Round 0 compares both using the real photos.** Mixing is allowed: A for most pages, with B-style dark bands for the workshop, business, and closing call-to-action sections.

### Do
- Let photos dominate. Large, edge-to-edge on phones.
- Generous whitespace; one idea per section.
- Thin hairline dividers and small radii.
- Subtle motion: fades, gentle rises, a slow zoom on image hover.
- Show craft details: joinery, carving, fabric texture close-ups.

### Don't
- Look like an online store (no price tags, star ratings, "Add to cart", "SALE" badges).
- Use stock furniture photography or AI-generated furniture anywhere it could be mistaken for AKHI's work.
- Stack floating chat bubbles. Use one calm sticky contact bar on phones.
- Use heavy 3D, parallax, autoplaying video on phones, pop-ups, or cluttered layouts.
- Use bright WhatsApp green (#25D366) behind white text (fails contrast).

---

## 3. Design tokens (starting values; refine in Round 0/1)

### 3.1 Color

| Token | Hex | Use |
|---|---|---|
| `bg` | `#F6F2EB` | Warm ivory page background |
| `surface` | `#FBF8F3` | Cards, sheets, the lighter panel |
| `surface-alt` | `#EDE6DB` | Alternating sections, image placeholders |
| `ink` | `#24211F` | Main text; dark sections background |
| `ink-muted` | `#5E5750` | Secondary text (6.4:1 on ivory ✓) |
| `line` | `#D9D0C3` | Hairlines, borders, dividers |
| `primary` | `#79583E` | Walnut: primary buttons, links (5.7:1 on ivory ✓; white text on walnut 6.4:1 ✓) |
| `primary-hover` | `#5F4430` | Hover/pressed state |
| `accent` | `#B39A77` | Bronze: **decorative only on light backgrounds** (2.4:1 ✗ for text). Fine as text on `ink` dark sections (5.9:1 ✓). |
| `on-dark` | `#F6F2EB` | Text on dark sections |
| `success` | `#3F6B4E` | Toasts ("Copied"), form confirmations |
| `error` | `#A23B2A` | Form errors |

All text must meet WCAG AA (4.5:1 normal text, 3:1 large text).

### 3.2 Typography

| Role | English (candidates) | Bengali (candidates) |
|---|---|---|
| Display / headings | **Fraunces** (warm variable serif). Alternatives: Newsreader, Cormorant Garamond for large sizes only. | **Tiro Bangla** (serif, pairs with Fraunces). Alternative: Noto Serif Bengali. |
| Body / UI | **Manrope**. Alternative: DM Sans. | **Hind Siliguri**. Alternatives: Noto Sans Bengali, Anek Bangla. |

All are free, open-license (Google Fonts / Fontsource) fonts. Please show the EN and BN pairs side by side in the design system so we can confirm they feel like one family.

**Type scale (fluid, phone → desktop)**

| Style | Phone | Desktop | Line height (EN / BN) |
|---|---|---|---|
| Display (home hero) | 40px | 80px | 1.05 / 1.3 |
| H1 | 32px | 56px | 1.1 / 1.35 |
| H2 | 26px | 40px | 1.15 / 1.4 |
| H3 | 20px | 26px | 1.25 / 1.45 |
| Body large | 18px | 20px | 1.6 / 1.8 |
| Body | 16px | 17px | 1.6 / 1.75 |
| Small / caption | 14px | 14px | 1.5 / 1.7 |
| Eyebrow (EN only) | 12px, uppercase, +0.12em tracking | same | n/a |

**Bengali rules:** set Bengali ~10–15% larger than English at the same level, with more line height (it has stacked conjuncts and vowel signs above and below). Never use uppercase or letter-spacing on Bengali. Bengali eyebrows are 14px with normal case. Check that the matra (top line) and conjuncts render cleanly at every size.

### 3.3 Spacing, layout, shape

- **Spacing scale (4px base):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128
- **Section vertical padding:** phone 56–64px · tablet 80px · desktop 112–128px
- **Container:** max-width 1440px, centered. Hero images may go full-bleed.
- **Side gutters:** phone 16px · tablet 24–32px · laptop 40px · large desktop 64px
- **Columns:** phone 4 · tablet 8 · desktop 12 (gutter 16 / 20 / 24px)
- **Radius:** 2–4px for images and buttons, 8px for cards and sheets, full pill for chips and tags. Keep it crisp, not bubbly.
- **Elevation:** almost flat. Hairline borders instead of shadows. Only sheets, menus, and lightboxes get a soft shadow.
- **Motion:** 200–300ms ease-out. Content fades in with an 8–16px rise. Image hover zoom 1.03 over ~600ms (desktop only). Everything off when the user prefers reduced motion.

### 3.4 Image ratios

| Use | Ratio |
|---|---|
| Home hero | Desktop 16:9 (or wider) · phone 4:5 (different crop, not squeezed) |
| Design card | 4:5 |
| Category tile | Phone 1:1 · desktop 4:5 |
| Project card | 3:2 |
| Detail gallery | Main 4:5 or 1:1; thumbnails square |
| Share preview (OG) | 1200 × 630 template with photo + design name + code |

### 3.5 Icons
Lucide-style 1.5px line icons for the interface. Official brand glyphs for WhatsApp, Messenger, Instagram, Facebook, YouTube. Icons always come with a text label on contact buttons.

---

## 4. Required sizes (hard rule)

Design **every page and every component** at:

| Frame | Size | Notes |
|---|---|---|
| **Phone** | 390 × 844 | Must also hold up at 360px wide (check the tightest layouts) |
| **Tablet** | 834 × 1194 portrait | Show one key page in landscape (1194 × 834) too |
| **Desktop** | 1440 × 900 | Note how it behaves on a 1920px screen (container caps at 1440) |

Rules: design phone-first · no horizontal scrolling · tap targets ≥ 44px · body text ≥ 16px on phones · every hover effect needs a touch alternative · navigation collapses to a menu button below 1200px.

---

## 5. Components (design all states and all three sizes)

| # | Component | Variants / states to show |
|---|---|---|
| 1 | **Header** | Desktop full nav · tablet/phone with menu button · transparent over the home hero and solid when scrolled · Bengali version |
| 2 | **Designs dropdown** (desktop) | Rooms list + "View all" + small featured image |
| 3 | **Mobile menu** | Full-screen overlay: large links, language switcher, WhatsApp/Call buttons, showroom address |
| 4 | **Language switcher** | `EN \| বাং`, current language highlighted |
| 5 | **Buttons** | Primary (walnut) · secondary (outline) · text link · **WhatsApp button** (walnut + WhatsApp glyph) · icon button · small/medium/large · default/hover/focus/pressed/disabled |
| 6 | **Sticky contact bar** (phone + tablet portrait) | General: `Call · WhatsApp us · ⋯` · design page: `Ask about AF-BED-014` · hides while the footer is in view |
| 7 | **Channel chooser** | Phone: bottom sheet · desktop: popover/modal. Options: WhatsApp (recommended), Messenger, Instagram, Call, Directions. Each with icon + label + one-line hint. |
| 8 | **Toast** | "Design code AF-BED-014 copied, paste it in your message" (EN + BN) |
| 9 | **Hero** | Home (full-bleed photo, headline, 2 buttons) · inner page hero (title + image) · compact page header (title + intro only) |
| 10 | **Trust strip** | 3–4 short facts with small icons. Wraps into 2 × 2 on phones. |
| 11 | **Category tile** | Image + room name + arrow; hover and pressed states |
| 12 | **Design card** | Image 4:5, name, code, category, "Customizable" tag · desktop hover: second image + material label · loading skeleton |
| 13 | **Filter chips** | Selected / unselected; scrolls sideways on phones; "Clear" action |
| 14 | **Gallery** | Desktop: main image + thumbnail rail · phone: swipe with dots and counter "3 / 8" · tablet: either |
| 15 | **Lightbox** | Full-screen, swipe/arrow navigation, pinch-zoom hint, close, counter, caption |
| 16 | **Design code chip** | `AF-BED-014` + copy icon · copied state |
| 17 | **Customization list** | Icon + label + one-line description (size, wood, finish, fabric, storage, details) |
| 18 | **Material / finish swatches** | Circular or square swatches cropped from real photos + name |
| 19 | **Process steps** | 4–5 steps · horizontal on desktop · vertical timeline on phone |
| 20 | **Project card** | Image 3:2, title, type tag (Home / Office / Renewal), area |
| 21 | **Before/after slider** | Draggable handle, labels, touch-friendly |
| 22 | **Testimonial card** | Quote in original language (often Bengali) + "Show translation" toggle, name/initials, "View on Facebook" link |
| 23 | **Video block** | YouTube thumbnail with play button (click-to-load), title, duration |
| 24 | **Section header** | Eyebrow (EN) + title + intro + optional "View all" link |
| 25 | **CTA band** | Light and dark versions: headline + WhatsApp / Messenger / Call |
| 26 | **Showroom card** | Map preview image, address (EN/BN), hours, "Get directions" + "Call" |
| 27 | **FAQ accordion** | Closed / open, grouped with headings |
| 28 | **Breadcrumbs** | Truncate gracefully on phones |
| 29 | **Design Brief helper** | 4 steps + progress indicator · chip selections · optional text fields · message preview (styled like a WhatsApp chat bubble) · "Send on WhatsApp" · "Just message us" escape link |
| 30 | **Footer** | Desktop multi-column · phone with accordion link groups |
| 31 | **404 / empty state** | Friendly message + links to Designs and WhatsApp |
| 32 | *(v1.1)* **Shortlist** | Heart on design card · shortlist drawer · "Send my shortlist on WhatsApp" (design it, mark as later) |

---

## 6. Pages

For every page: phone, tablet, and desktop frames. English first; Bengali where noted in §9.

### 6.1 Home
| Section | Phone | Tablet | Desktop |
|---|---|---|---|
| Header | Logo, `EN\|বাং`, menu | Same | Full nav + WhatsApp button, transparent over hero |
| Hero | 4:5 photo with headline below or on a soft gradient; 2 stacked full-width buttons | Taller photo, buttons side by side | Full-bleed 16:9 photo, headline bottom-left, 2 buttons |
| Trust strip | 2 × 2 grid | 4 in a row | 4 in a row, hairline dividers |
| Shop by room | 2 × 2 tiles | 4 tiles in a row | 4 tall tiles in a row |
| Featured designs | Swipeable row of cards (peek of next card) | 3-column grid | 4-column grid, "View all designs" link |
| Made to your measure | Stacked: image, then list | Image and list side by side | Large image left, customization list right |
| How it works | Vertical timeline | 2 × 2 | 4 steps in a row |
| Selected projects | Stacked cards | 2 columns | 1 large + 2 small (editorial layout) |
| From the workshop | Video full width + short text | Same | Dark band: video left, text right |
| Testimonials | Swipeable cards | 2 visible | 3 in a row |
| For business band | Image + text + button stacked | Side by side | Dark or full-bleed band |
| Visit the showroom | Map image, address, 2 buttons | Side by side | Showroom card + map side by side |
| Closing CTA | "Have something different in mind?" + WhatsApp / Messenger / Call | Same | Same, centered |
| Footer + sticky bar | Sticky contact bar visible | Sticky bar visible (portrait) | No sticky bar |

### 6.2 Designs (catalog)
Compact header (title + short intro) → filter chips (room, type) → grid (phone 2 columns, tablet 3, desktop 4) → closing CTA band. Show a filtered state and a "no designs in this filter" empty state.

### 6.3 Design detail ★ (most important)
| Section | Phone | Tablet | Desktop |
|---|---|---|---|
| Gallery | Full-width swipe, dots, counter; tap → lightbox | Full width with thumbnails below | Left ~60%: main image + thumbnail rail |
| Info | Name, code chip, description, customization list, materials, size note | Below gallery, 2 columns where helpful | Right ~40%, **stays in view while scrolling** |
| Contact block | Large "Ask about this design on WhatsApp" + row of Messenger / Instagram / Call | Same | Inside the info panel |
| Video (if any) | Full width | Full width | Below the two-column area |
| Seen in project | Card | Card | Card |
| Related designs | Swipe row | 3-column grid | 4-column grid |
| FAQ snippet | 2–3 questions | Same | Same |
| Sticky bar | `Ask about AF-BED-014` | Same (portrait) | None (the info panel stays visible) |

Also show: lightbox open (phone + desktop), channel chooser open (phone bottom sheet + desktop popover), and the "code copied" toast.

### 6.4 Custom Furniture
Hero "Made to your measure" → what AKHI makes (category icons) → what you can customize → materials & finishes swatches → process (4–5 steps) → **Design Brief helper** (show each step + the message preview, phone and desktop) → FAQ → closing CTA.

### 6.5 Our Work + project page
- **List:** compact header → filter (All / Home / Office / Renewal) → project cards (1 / 2 / 3 columns).
- **Project page:** hero photo → fact row (type, area, year, pieces) → story (need → solution) → gallery → designs used → testimonial → "Want something similar?" CTA.

### 6.6 For Business
Hero (office project photo) → what we make for businesses → process for business clients → selected office projects → client logos row (placeholder, only with permission) → CTA with WhatsApp, Call, **Email**.

### 6.7 Sofa Renewal (design now, published only once the service is confirmed)
Hero → before/after slider → what's included → process → CTA.

### 6.8 About
Story intro with a large image → values / craftsmanship (3–4 points) → workshop and showroom photo mosaic → YouTube channel link → CTA.

### 6.9 Visit & Contact
Showroom card(s) with map preview, hours, directions, call → all contact channels as large tappable rows (WhatsApp, Messenger, Instagram, Call, Email, Facebook, YouTube) → "Before you visit" tips → FAQ link.

### 6.10 FAQ, 404, Privacy
Simple, readable text layouts. FAQ uses grouped accordions. 404 is friendly, with links back.

---

## 7. Copy deck (draft, final text needs client approval and a native Bengali review)

| Key | English | Bengali |
|---|---|---|
| Nav: Designs | Designs | ডিজাইন |
| Nav: Custom | Custom Furniture | কাস্টম ফার্নিচার |
| Nav: Work | Our Work | আমাদের কাজ |
| Nav: Business | For Business | অফিস ও ব্যবসা |
| Nav: About | About | আমাদের সম্পর্কে |
| Nav: Visit | Visit Us | শোরুম ও যোগাযোগ |
| Hero headline | Furniture made for your space. | আপনার ঘরের মাপে, আপনার রুচিতে তৈরি আসবাব। |
| Hero subline | Beds, sofas, dining sets and office furniture, made to your size and style. | খাট, সোফা, ডাইনিং সেট ও অফিস ফার্নিচার — আপনার মাপ ও পছন্দমতো তৈরি। |
| Button: explore | Explore designs | ডিজাইন দেখুন |
| Button: discuss | Discuss your idea on WhatsApp | হোয়াটসঅ্যাপে আপনার আইডিয়া জানান |
| Button: ask design | Ask about this design | এই ডিজাইন নিয়ে জানতে চাই |
| Button: call | Call | কল করুন |
| Button: directions | Get directions | লোকেশন দেখুন |
| Sticky: WhatsApp | WhatsApp us | হোয়াটসঅ্যাপ করুন |
| Section: measure | Made to your measure | আপনার মাপে তৈরি |
| Section: process | How custom ordering works | কাস্টম অর্ডার যেভাবে হয় |
| Step 1 | Share your idea | আপনার আইডিয়া জানান |
| Step 2 | Consult & measure | পরামর্শ ও মাপ নেওয়া |
| Step 3 | Design & quote | ডিজাইন ও মূল্য নির্ধারণ |
| Step 4 | Craft & deliver | তৈরি ও ডেলিভারি |
| Section: projects | Selected projects | আমাদের কিছু কাজ |
| Section: workshop | From the workshop | আমাদের কারখানা থেকে |
| Section: reviews | What customers say | গ্রাহকদের কথা |
| Section: showroom | Visit the showroom | শোরুমে আসুন |
| Closing CTA | Have something different in mind? | অন্যরকম কিছু ভাবছেন? |
| Tag | Customizable | কাস্টমাইজযোগ্য |
| Toast | Design code copied, paste it in your message | ডিজাইন কোড কপি হয়েছে — মেসেজে পেস্ট করুন |
| FAQ | Why don't you show prices online? | অনলাইনে দাম কেন দেওয়া নেই? |
| Link | View on Facebook | ফেসবুকে দেখুন |
| Rooms | Bedroom · Living · Dining · Office | বেডরুম · লিভিং রুম · ডাইনিং · অফিস |
| Types | Beds · Sofas · Dining sets · Wardrobes · Dressing tables · Showcases · Tables · Chairs · Conference tables | খাট · সোফা · ডাইনিং সেট · আলমারি ও ওয়ার্ডরোব · ড্রেসিং টেবিল · শোকেস · টেবিল · চেয়ার · কনফারেন্স টেবিল |

Placeholder facts for mockups (all to be verified): phone `01600-297923` / `০১৬০০-২৯৭৯২৩`, showroom "Bashundhara, Dhaka", hours "to be confirmed". Mark these visibly as placeholders, and do not invent opening hours.

---

## 8. Imagery rules for the mockups

- Use **only** the real AKHI photos attached to the session.
- Where a photo is missing, use a flat `surface-alt` block labelled e.g. "AKHI photo: dining set, 4:5". No stock furniture, no AI-generated furniture.
- Mood/texture imagery that clearly isn't a product (a wood grain texture, an empty room corner) is fine for backgrounds and must be marked "mood only".
- Show at least one design card and one hero using a *weaker* real photo, so the layout's robustness can be judged.

---

## 9. Deliverables, in rounds

| Round | Deliver (phone 390 · tablet 834 · desktop 1440 for each) |
|---|---|
| **0: Direction** | Direction A vs B: home hero + 1 design card + buttons, at phone and desktop. **Pick one.** |
| **1: Foundations + core** | Design system page (colors, EN + BN type pairs, buttons, chips, cards, icons, spacing) · **Home** · **Designs catalog** · **Design detail** (+ lightbox, channel chooser, toast, sticky bar) · **Home in Bengali** (phone + desktop) |
| **2: Conversion pages** | Custom Furniture with all Design Brief helper steps · Our Work list + project page · Visit & Contact · mobile menu open · desktop Designs dropdown |
| **3: Remaining** | About · For Business · Sofa Renewal · FAQ · 404 · footer variants · **Design detail in Bengali** · tablet landscape check of Home |

### Handoff to Claude Code
For each approved round, export into the project's `design/` folder:
- Screenshots of every frame (phone / tablet / desktop), named `round-1-home-phone.png` etc.
- Final tokens (colors, type scale, spacing, radii, motion) as CSS variables or JSON
- Final font choices (EN + BN) and weights used
- Notes on any interaction that isn't obvious from a static frame (sticky behavior, transitions, gestures)
- The Claude Design project link, added to `plans/README.md`

---

## Changelog
- **2026-10-10:** First draft, based on the Website Master Plan.
- **2026-10-10:** Approved for use. Starter prompt now says outright that the site is display-only and bilingual on every page. Sofa Renewal gets designed now and published later.
- **2026-10-10:** Mockups for Rounds 1 to 3 made in `design/` (responsive HTML + screenshots). The client's Akhi Furniture design system replaces the starting tokens in section 3: crimson `#c3061d` instead of walnut, Space Grotesk + Inter instead of Fraunces + Manrope, Anek Bangla + Hind Siliguri for Bengali. Round 0 was skipped because the design system already sets the direction (A, with dark bands). Details in `design/README.md`.
- **2026-10-10:** Mockups updated: Bengali versions of every page, the v1.1 shortlist drawer, a room category page state and the share-preview (OG) template. Placeholders replaced with 44 edited photos from AKHI's public Facebook page (office, conference and sofa-renewal slots stay as placeholders because no such photos were found). Details in `design/README.md` section 8.
