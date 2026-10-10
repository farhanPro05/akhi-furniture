# Website Master Plan

| | |
|---|---|
| **Status** | Approved. Next step: mockups in Claude Design, then build. |
| **Date** | 2026-10-10 |
| **Related plans** | [Claude Design Brief](2026-10-10-claude-design-brief.md) · [Website Build Plan](2026-10-10-website-build-plan.md) |
| **Inputs** | [`ChatGPT-Website discovery questions-20261010-0149.md`](../ChatGPT-Website%20discovery%20questions-20261010-0149.md) (discovery, September 2026 Facebook audit findings), web research on furniture websites (§5) |

---

## 0. Summary

AKHI Furniture gets a **bilingual (English + বাংলা) digital showroom**: a fast, premium-looking website that shows their best real work and turns visitors into conversations on **WhatsApp, Messenger, Instagram, or a phone call**. Nothing is sold on the site. There is no cart, no checkout, no prices, and no customer login.

- **The core idea:** every design has a reference code (e.g. `AF-BED-014`). Every "Ask about this design" button opens WhatsApp with a message that already names that design and links to it, so AKHI's sales staff know exactly what the customer saw.
- **Frontend:** Astro (static site) + Tailwind CSS, mobile-first, built for desktop, tablet, and phone. JavaScript is kept to a minimum so the site stays fast on Bangladeshi mobile data.
- **Backend:** none in version 1. Content lives as typed files in the project, and images are optimized at build time. Hosting is Cloudflare's free tier, on the client's own domain `akhifurniture.com`. A visual content editor (Keystatic) can be added later without changing anything else.
- **Biggest risk:** photos. The client won't supply any, so the content comes from their public Facebook and YouTube posts. A media audit and editing sprint has to happen before or alongside design (§10).
- **Languages:** English and Bengali side by side. Every page exists in both (`/en/…` and `/bn/…`), with a language switcher on every page.
- **Workflow:** this plan → [Claude Design Brief](2026-10-10-claude-design-brief.md) → mockups in Claude Design → [Website Build Plan](2026-10-10-website-build-plan.md) in Claude Code.
- **All planning decisions are settled (§23).** Business facts still to be confirmed with AKHI use clearly marked placeholders until then, so they don't block design or build.

---

## 1. Goals and how we measure them

| Goal | What success looks like | How it's measured |
|---|---|---|
| **Prestige** ("flex" for AKHI) | The site looks as polished as HATIL or OTOBI, with more personality and focus on custom work | Client approval; visitor feedback |
| **Show the work** | 12–18 strong designs and 4–8 real projects at launch, all genuine AKHI work | Content count; zero borrowed or stock photos |
| **Build confidence** | A visitor understands what AKHI makes, what can be customized, how ordering works, and where the showroom is, without asking | Fewer "price? size? location?" questions in the inbox (staff report) |
| **Qualified inquiries** | Visitors contact AKHI about a *specific* design | Contact-button clicks per visit; share of WhatsApp messages that contain a design code |
| **Speed** | Fast on a mid-range Android phone over 4G | LCP < 2.5s, Lighthouse mobile ≥ 90 |

Important: analytics can count **clicks** on WhatsApp/Messenger buttons. They cannot see whether a conversation happened or a sale closed. If AKHI wants sales numbers from the website, staff need to tag those conversations (§21).

---

## 2. Scope

### Building (v1)
- Bilingual showroom website (English + Bengali) with its own pages per language
- Curated design catalog with category filters and one page per design
- Custom furniture page with a **Design Brief helper** that writes a WhatsApp message for the visitor
- Our Work: completed projects / case studies
- About, Visit & Contact, FAQ, and For Business (office/corporate) pages
- Sofa Renewal page, **only if** the client confirms they still offer it
- Contact system: WhatsApp (pre-filled message), Messenger, Instagram, phone, and Google Maps directions
- SEO, social share previews, analytics, and launch on `akhifurniture.com`

### Not building
- Cart, checkout, payments, billing, prices, discounts
- Customer accounts, login, order tracking
- Chatbots or AI auto-replies (the audit found an earlier bot sending a BDT 199,000 dining-table quote to unrelated questions)
- A huge catalog of every Facebook post
- Pop-ups, newsletter walls, discount banners

### Later, only if needed (v1.1+)
- **Shortlist:** save several designs, then send the whole list in one WhatsApp message (browser storage only, no account)
- Visual content editor for non-developers (Keystatic, §12)
- Call-back request form (would need a small backend, §12.4)
- Downloadable PDF catalog (OTOBI offers one, and corporate buyers like them)

---

## 3. Audience and how they arrive

| Audience | Needs | Notes |
|---|---|---|
| **Home buyers, Dhaka** | Ideas, proof of quality, showroom location, custom sizes | Biggest group. Mostly on phones. Many arrive from Facebook posts. |
| **Home buyers, rest of Bangladesh** | Trust from a distance, delivery coverage (must be verified), a WhatsApp consultation | Nationwide delivery must not be promised until the client confirms it |
| **Business / office buyers** | Conference tables, executive desks, office fit-outs, a professional impression | More likely on desktop. May prefer phone or email. |
| **People comparing brands** | How AKHI differs from HATIL, OTOBI, and the Panthapath market | The answer is customization plus real project proof |

**How they arrive:** mostly from Facebook, Instagram, YouTube, WhatsApp shares, and Google search. That means:
- A large share of visits will open **inside the Facebook or Messenger in-app browser**. Every page and button must be tested there (§20).
- Link previews matter. When a design link is shared on WhatsApp or Facebook, the preview card (image + title) must look excellent (§14).
- Mobile data costs money and speeds vary, so the site has to stay light (§13).

Bangladesh context: BTRC reported 135.94 million internet subscriptions at the end of June 2026, and about 89% of them are mobile. About 75% of households own a smartphone (BBS, 2026).

---

## 4. Every screen size (hard rule)

> This rule also lives in `CLAUDE.md` §2. Every mockup and every piece of code must cover all of these sizes.

| Device | Design frame for mockups | Test widths for code | Layout behavior |
|---|---|---|---|
| **Phone** | 390 × 844 | 360, 390, 430 | One column. Full-bleed images. Sticky bottom contact bar. Hamburger menu. Swipe galleries. 2-column design grid. |
| **Tablet** | 834 × 1194 (portrait) and 1194 × 834 (landscape) | 768, 834, 1024 | 2–3 columns. Hamburger menu below 1200px. Sticky contact bar in portrait. Gallery with thumbnails in landscape. |
| **Laptop / desktop** | 1440 × 900 | 1280, 1366, 1440 | Full navigation. Multi-column layouts. Sticky info panel on design pages. Hover states. |
| **Large desktop** | 1920 × 1080 | 1920, 2560 | Content capped at a 1440px container. Hero images may go full-bleed. Text never stretches into long lines. |

**Rules that apply everywhere**
- Mobile-first: design the phone layout first, then add to it for bigger screens.
- No horizontal page scrolling at any width. Carousels scroll inside themselves only.
- Tap targets are at least 44 × 44px, and contact buttons are larger.
- Body text is at least 16px on phones. Bengali text gets more line height (§11).
- Images get **art-directed crops**: a portrait or 4:5 crop for phones and a landscape crop for desktop heroes, not one image squeezed to fit.
- Hover-only features need a tap or always-visible alternative on touch screens.
- Both orientations work on phones and tablets.
- Each page is checked at every test width above before it counts as done (§20).

---

## 5. Research: what good furniture websites do

### 5.1 Bangladeshi competitors

| Site | What they do well | What doesn't fit AKHI |
|---|---|---|
| **OTOBI** (otobi.com) | "Solutions" tiles for Home / Office / Hospital / Interior. Popular categories split into home and office. A "Why OTOBI" service-promise block. A floating WhatsApp button (wa.me). Downloadable e-catalogs. A custom-work gallery. | Built around e-commerce (cart, login, discounted products). Menus nest 2–3 levels deep. English only. |
| **HATIL** (hatil.com) | Premium positioning ("Modern Furniture Crafted with Elegance"). Products organized by room with specifications. | Large mass-market catalog. The page is heavy and JavaScript-rendered, and nothing loaded until scripts ran during the research check. |

**AKHI's angle:** neither competitor leads with *made-to-your-size* custom work backed by real project stories, and neither offers a proper Bengali version. Both are gaps AKHI can own.

### 5.2 International custom / bespoke furniture makers

| Pattern | Seen on | Use for AKHI |
|---|---|---|
| Craftspeople and the workshop on the homepage, as video or large photos | Bespoke Furniture, Sentient | "From the workshop" section using their YouTube making-of videos |
| Separate paths for **browse designs / commission custom / see projects** | Philip Morley, Benchmark, Taylor & Baines | Main navigation: Designs · Custom Furniture · Our Work |
| Visual, low-text explanation of how custom ordering works | Pinit, Couch Seattle ("custom-sized to the inch") | 4-step process with icons, plus a "made to your measure" block |
| Consultation-first call to action | Couch Seattle | "Discuss your idea" on WhatsApp as the second hero button |
| Projects as named case studies (client type, scope, photos) | Benchmark, Sakura Joinery | Project pages: brief → what we made → photos → testimonial |
| Reviews near the top | Austin Joinery | Verified Facebook reviews on the homepage, in the original language |
| Hover reveals material or wood type | Culver Furniture | Desktop card hover shows a second photo and the material. On touch screens the material appears as a label. |
| Materials and guarantee block, showroom block at the end | Couch Seattle | Materials & finishes section; showroom card with map, hours, and call button |
| Work-in-progress journal ("Shop Notes") | Kellogg Furniture | Later: "Now in the workshop" posts from Facebook Reels |
| Minimal spaces / projects / about structure with large authentic images | Tischlerei Cambium | Overall tone: calm, generous spacing, trustworthy |
| Organized custom-project gallery; editorial project storytelling | DIT Studio, Make Bespoke Studio (references from the discovery file) | Our Work list and project pages |

### 5.3 What to avoid (also learned from the research)
- **Dead buttons:** Couch Seattle's "Book a Consult" buttons pointed to `#`. Every contact button gets an automated test (§20).
- **Text-free lookbooks** (Kyle Cook, Croft House) look beautiful but don't answer buyers' questions. AKHI's customers need sizes, materials, and process.
- **Entry pop-ups** (Clad Home's newsletter pop-up) interrupt the first impression on mobile.
- **Statements that contradict each other** (Couch Seattle: "Crafted in Los Angeles" next to a Seattle showroom; OTOBI: 24/7 support next to 9 AM–6 PM customer care). The September audit found AKHI already has conflicting addresses and hours online. The website must be the single verified source.

---

## 6. Site map and URLs

Following the discovery file, each language has its own URL prefix: **`/en/`** for English and **`/bn/`** for Bengali. The bare domain `/` redirects permanently to `/en/`, and the language switcher on every page goes to the same page in the other language.

```
/                                  → 301 redirect to /en/
/en/                               Home
/en/designs/                       All designs (filterable)
/en/designs/bedroom/               Category pages (room-based)
/en/designs/living/
/en/designs/dining/
/en/designs/office/
/en/designs/<design-slug>/         Design detail (e.g. /en/designs/contemporary-wooden-bed/)
/en/custom-furniture/              How custom works + Design Brief helper
/en/our-work/                      Projects (filter: Home / Office / Renewal)
/en/our-work/<project-slug>/       Project case study
/en/for-business/                  Office & corporate furniture
/en/sofa-renewal/                  Only if the client confirms the service
/en/about/                         Story, workshop, craftsmanship
/en/visit/                         Showroom, map, hours, all contact channels
/en/faq/                           Questions (including "Why no prices online?")
/en/privacy/                       Short privacy notice (analytics)
/404                               Bilingual "page not found"

/bn/...                            Same structure, Bengali content
```

- Slugs stay in English on both languages (`/bn/designs/contemporary-wooden-bed/`). That keeps URLs readable and shareable and avoids encoded Bengali characters in links.
- The language switcher always goes to the **same page** in the other language.

### Navigation
- **Desktop (≥1200px):** Logo · Designs ▾ · Custom Furniture · Our Work · For Business · About · Visit Us · `EN | বাং` · **[WhatsApp]** button
- **Tablet and phone (<1200px):** Logo · `EN | বাং` · menu button → full-screen menu with large tap targets, all contact channels, and the showroom address
- **Designs ▾ dropdown:** rooms (Bedroom, Living, Dining, Office), plus a "View all designs" link and a small featured image
- **Footer:** sitemap links, showroom address and hours, all contact channels, social links (Facebook, Instagram, YouTube), language switcher, © line. On phones the footer link groups collapse into accordions.

---

## 7. Page-by-page plan

Detailed layouts for each device are in the [Claude Design Brief](2026-10-10-claude-design-brief.md). This section covers each page's job and content.

### 7.1 Home
**Job:** impress in 3 seconds, then route the visitor to designs, custom work, or a chat.

1. **Hero:** one outstanding real AKHI photo, a headline, one line about custom work, and two buttons: *Explore designs* and *Discuss your idea on WhatsApp*.
2. **Trust strip:** 3–4 short verified facts, e.g. "Made to your size" · "Home & office" · "Showroom in Bashundhara, Dhaka" · "36K+ Facebook followers". Only facts the client has confirmed.
3. **Shop by room:** Bedroom, Living, Dining, Office tiles.
4. **Featured designs:** 6–8 design cards (swipeable row on phones, grid on desktop).
5. **Made to your measure:** what can be customized (size, wood, finish, fabric, storage), with a link to Custom Furniture.
6. **How it works:** 4 steps (Share your idea → Consult & measure → Design & quote → Craft & deliver). The client must confirm the real process.
7. **Selected projects:** 2–3 real projects (home and office).
8. **From the workshop:** a YouTube making-of video (click-to-load) and short craft copy.
9. **What customers say:** 3 verified Facebook reviews, shown in their original language with a translation.
10. **For business:** a band linking to For Business.
11. **Visit the showroom:** map preview, address, hours, Directions and Call buttons.
12. **Closing call to action:** "Have something different in mind?" with WhatsApp / Messenger / Call.

### 7.2 Designs (catalog + category pages)
**Job:** let people browse the best work quickly.
- Title, short intro, filter chips by **room** and **type** (Beds, Sofas, Dining sets, Wardrobes & storage, Dressing tables, Showcases & cabinets, Tables, Chairs, Office). Chips scroll sideways on phones.
- Grid: 2 columns on phones, 3 on tablets, 4 on desktop.
- **Design card:** 4:5 photo, name, design code, category, "Customizable" tag. On desktop, hover shows a second photo and the material.
- No prices and no sort-by-price. Order is featured first, then newest.
- Built for growth: "Load more" appears once there are more than 24 designs.

### 7.3 Design detail (the most important page)
**Job:** show the piece beautifully and make contacting AKHI about *this exact design* effortless.
- Breadcrumbs → **gallery** (desktop: large image with thumbnails; phone: full-width swipe with dots; tap for full-screen zoom).
- Name, **design code chip** (tap to copy), short description.
- **What you can customize** (only options the client confirms): size, wood/material, finish/color, fabric, storage, details.
- **Materials & finish:** verified facts only, otherwise "Material options discussed during consultation".
- **Size:** "Standard size: …" if known, plus "Can be made to your measurements".
- **Contact block:** a large *Ask about this design on WhatsApp* button, plus Messenger, Instagram, and Call (§8).
- Making-of video if one exists. "Seen in project …" link if the design appears in a project.
- Related designs (same category). Short FAQ snippet ("Why no prices?", "Can I change the size?").
- **Phones:** a sticky bottom bar reads *Ask about AF-BED-014*.
- **Desktop:** two columns, with the gallery on the left (~60%) and the info panel on the right (~40%) staying in view while scrolling.

### 7.4 Custom Furniture
**Job:** explain custom ordering and help visitors send a clear request.
- Hero ("Made to your measure") → what AKHI makes → **what you can customize** (icon list) → **materials & finishes** (swatches from real photos, verified only) → **process** (4–5 steps, realistic timelines once confirmed) → **Design Brief helper** → FAQ → closing call to action.
- **Design Brief helper:** a short 4-step form that runs entirely in the browser.
  1. What furniture? (category chips)
  2. For home or office? Which room?
  3. Size and material preferences (optional, free text or chips)
  4. Your area or city, and when you need it (optional)

  The result is a preview of a neatly formatted WhatsApp message (in the visitor's language), then *Send on WhatsApp*. Nothing is stored on any server. Every step can be skipped, and a plain *Just message us* option is always visible.

### 7.5 Our Work (projects)
**Job:** proof. Real homes and offices AKHI has furnished.
- Filter: All / Home / Office / Renewal. Project cards show a photo, title, type, and area (only if the customer agrees).
- **Project page:** hero photo → key facts (type, area, year, pieces) → story (what the customer needed → what AKHI made) → gallery → designs used (links) → testimonial (if available) → *Want something similar?* call to action.
- If there aren't enough genuine projects at launch, this becomes a "Recent work" gallery and full case studies come later.

### 7.6 For Business
**Job:** win office and corporate orders.
- What AKHI makes for businesses (conference tables, executive desks, workstations, reception, storage). Only categories with real photos, e.g. the mahogany conference furniture from YouTube.
- Process for business clients: site visit, drawings, bulk orders, timeline.
- Selected office projects. Client logos only with written permission.
- Contact: WhatsApp, Call, and **email**. Corporate buyers often want email, so we need the client's address.

### 7.7 Sofa Renewal (conditional)
- Before/after slider, what's included (re-upholstery, foam, frame repair, as confirmed), process, call to action.
- Only built if the client confirms the service is active.

### 7.8 About
- Story (founding year, people, values, all verified), showroom and workshop photos, the craftsmanship approach, link to the YouTube channel.
- Honest wording: no "best in Bangladesh" claims and no unverified guarantees. The audit flagged a "20-year woodworm guarantee" claim that needs confirming before it's used anywhere.

### 7.9 Visit & Contact
- **Showroom card(s):** verified address in English and Bengali, hours, a map preview image that opens Google Maps (no heavy embedded map loading on page open), *Get directions* button.
- **All channels:** WhatsApp, Messenger, Instagram, Call (tap-to-call), email, Facebook, YouTube.
- "Before you visit": bring room measurements and photos of your space.
- If there is more than one branch (a 2024 YouTube description mentioned Banani and Bashundhara), each branch gets its own card.

### 7.10 FAQ
- Groups: Custom orders · Materials & quality · Delivery & installation · Showroom visits · Business orders.
- Includes **"Why don't you show prices online?"**: *"Every piece is made to your size, material and finish, so we give you an exact quote once we understand what you need. Message us on WhatsApp for a quick estimate."*
- Answers must be verified with the client before launch.

### 7.11 Global elements
Header · mobile menu · language switcher · footer · **sticky contact bar (phones and tablets)** · contact channel chooser · toast messages ("Design code copied") · bilingual 404 page.

---

## 8. Contact and inquiry system (core feature)

### 8.1 Channels and link formats

| Channel | Link | Pre-filled message? | Notes |
|---|---|---|---|
| **WhatsApp** (primary) | `https://wa.me/8801XXXXXXXXX?text=<url-encoded message>` | ✅ Yes | Number in international format with no `+`, spaces, or dashes. Works in Facebook in-app browsers. |
| **Messenger** | `https://m.me/<page-username>` | ❌ No | Pre-filled text isn't supported. A `?ref=` value only shows up with Messenger API webhooks, which we aren't using. |
| **Instagram** | `https://ig.me/m/<username>` | ❌ No | Same limitation. |
| **Phone** | `tel:+8801XXXXXXXXX` | n/a | Shown as a button on phones and as a visible number on desktop |
| **Directions** | Google Maps place URL | n/a | Uses the verified Google Business Profile place |

### 8.2 Making Messenger and Instagram work for specific designs
Since those apps can't receive pre-filled text, the button **copies the design code and link to the clipboard first**, shows a toast reading *"Design code AF-BED-014 copied, paste it in your message"*, and then opens the chat. Staff get the reference either way.

### 8.3 Message templates (draft, for review)

**English, design page:**
> Hello AKHI Furniture! I saw design **AF-BED-014 (Contemporary Wooden Bed)** on your website and would like to know more.
> https://akhifurniture.com/en/designs/contemporary-wooden-bed/
> — sent from akhifurniture.com

**Bengali, design page:**
> হ্যালো AKHI Furniture! আপনাদের ওয়েবসাইটে **AF-BED-014 (কনটেম্পোরারি কাঠের খাট)** ডিজাইনটি দেখেছি, বিস্তারিত জানতে চাই।
> https://akhifurniture.com/bn/designs/contemporary-wooden-bed/
> — akhifurniture.com থেকে পাঠানো

**General (any other page):**
> Hello AKHI Furniture! I found you through your website and would like to discuss a furniture idea.

The *"sent from akhifurniture.com"* line tells staff the lead came from the website, so they can count website inquiries without any software.

### 8.4 Design reference codes
Format `AF-<TYPE>-<NNN>`, e.g. `AF-BED-014`. Type codes: `BED` beds · `SOF` sofas & seating · `DIN` dining · `WRD` wardrobes & storage · `DRS` dressing tables · `SHW` showcases & cabinets · `TBL` center & side tables · `CHR` chairs · `OFC` office desks & workstations · `CNF` conference. Codes are permanent and never reused.

### 8.5 Where the contact buttons appear
- **Header:** WhatsApp button (desktop); inside the menu (tablet and phone)
- **Sticky bottom bar (phones and tablet portrait):** `[ Call ]  [ WhatsApp us ]  [ ⋯ ]`. On design pages it becomes `[ Ask about AF-BED-014 ]`. The ⋯ button opens the channel chooser (Messenger, Instagram, Directions).
- **Design pages:** contact block in the info panel
- **Closing call-to-action band** on most pages, and the footer
- **No** floating chat bubbles stacked on top of each other

---

## 9. Content model

All content lives as typed files in the project (Astro Content Collections with schema validation). Every field a visitor reads has an English and a Bengali version.

| Collection | Key fields |
|---|---|
| **designs** | `code` (AF-BED-014), `slug`, `title{en,bn}`, `category`, `room`, `kind` (completed work / design reference), `summary{en,bn}`, `description{en,bn}`, `customizable[]`, `materials[]` *(verified only)*, `finishes[]`, `dimensions?`, `images[]` (file, `alt{en,bn}`, role: hero/gallery/detail, focal point), `youtubeId?`, `relatedProjects[]`, `featured`, `order`, `status` (draft/published), **`source`** (original Facebook/YouTube URL), **`rights`** (approved/pending), **`clientApproved`** |
| **projects** | `slug`, `title{en,bn}`, `type` (home/office/renewal), `area?` (only with permission), `year?`, `scope{en,bn}`, `story{en,bn}`, `designs[]`, `images[]`, `beforeAfter?`, `testimonial?`, `source`, `rights`, `clientApproved` |
| **categories** | `slug`, `name{en,bn}`, `room`, `intro{en,bn}`, `cover`, `order` |
| **testimonials** | `quote` (original language), `translation`, `name` (first name or initials), `location?`, `sourceUrl` (Facebook review), `date`, `permission` |
| **faqs** | `group`, `question{en,bn}`, `answer{en,bn}`, `order` |
| **site settings** (single file) | phone, WhatsApp number, Messenger username, Instagram username, email, address{en,bn}, map URL, opening hours, social links, message templates{en,bn} |
| **UI strings** | `en.json` / `bn.json` for buttons, labels, and navigation |

Pages only show items where `status = published` **and** `rights = approved` **and** `clientApproved = true`. The build refuses to publish anything else.

---

## 10. Media pipeline (photos and videos from Facebook and YouTube)

The highest-risk part of the project. It gets its own sprint before or alongside design.

### 10.1 Steps
1. **Inventory (no downloads yet):** list 40–60 candidate posts, Reels, and YouTube videos from the official AKHI Facebook Page and the "Akhi Furniture Official" YouTube channel (verified by phone number 01600-297923). Record each one in an **asset register** (spreadsheet, kept in `media/`) with the columns from the discovery file: reference ID (e.g. AF-BED-014) · category · design title · source URL · media status (authorized / pending) · project status (completed work / design reference) · material (verified only) · customization (confirmed options) · quality (hero-ready / gallery-only / reject) · client approval (approved / pending). The register later becomes the source for the website's design entries.
2. **Permission:** get written approval from the AKHI owner to reuse and edit the selected media on the website. A WhatsApp message is enough, but keep it. Confirm every photo shows AKHI's own work. The audit found an old case where another maker's photo was used.
3. **Score and pick:** score each candidate out of 100 (visual quality 25, authenticity/approval 25, design appeal 20, crop flexibility 15, info completeness 15). Grade A = hero/featured, B = gallery, C = reject. **Unverified ownership blocks publication regardless of score.**
4. **Collect the best version:** the highest resolution available. For videos, extract still frames from the highest-quality YouTube stream, with permission. Keep originals untouched in a separate folder.
5. **Edit:** exposure, white balance, color consistency (a shared warm grade), perspective straightening, noise reduction, cropping to standard ratios, and **removing text overlays, phone numbers, watermarks, and price stickers** that Facebook posts often carry. Clutter in the room around the furniture can be cleaned up.
6. **Never:** change the furniture itself, generate missing details with AI, swap materials or colors, or present AI-generated furniture as AKHI's. Mild upscaling is allowed only after a side-by-side check that no details were invented.
7. **Export masters:** high-quality JPEG with the long edge at 2400–3000px where the source allows. The website generates the small, fast versions automatically.
8. **People:** blur or get consent for identifiable customers or staff.
9. **Client sign-off** on the final set.

### 10.2 Standard crops

| Use | Ratio |
|---|---|
| Home hero, desktop | 16:9 (or 21:9 ultra-wide) |
| Home hero, phone | 4:5 |
| Design card | 4:5 |
| Category tile | 1:1 (phone) / 4:5 (desktop) |
| Project card | 3:2 |
| Gallery | Mixed, but within a 4:5–3:2 range |
| Social share image (OG) | 1.91:1 (1200 × 630) |

### 10.3 If the photos turn out weak
Use smaller image sizes, uniform color grading, clean ivory backgrounds, stronger typography, and more video. **Optional extra, not a dependency:** if a showroom visit ever becomes possible, a half-day shoot (even with a good phone and natural light) would lift the site's quality more than anything else. The plan doesn't rely on it. Facebook and YouTube media are the confirmed source.

### 10.4 Launch target
12–18 featured designs · 30–45 usable photos · 2–3 videos · 1 outstanding hero photo · 4–8 projects (if available).

---

## 11. Bilingual approach (English + বাংলা)

- Separate URLs per language (`/en/` and `/bn/`, with `/` redirecting to `/en/`), each with `<html lang="en">` or `<html lang="bn">`, plus `hreflang` tags (en, bn, and x-default → `/en/`). This follows Google's guidance for multilingual sites.
- Every page and every design is translated. If a Bengali text is missing, the build warns. It doesn't silently show English.
- **Fonts:** an English display serif and sans-serif, plus a matching Bengali pair. Candidates are in the design brief. Bengali needs ~10–15% larger text and more line height (≈1.7–1.8). No uppercase transforms or letter-spacing on Bengali text.
- **Numbers:** Bengali pages show Bengali digits (০১৬০০-২৯৭৯২৩) for display, and links always use standard digits.
- All copy is written natively in each language, not machine-translated word for word. A native Bengali speaker reviews everything before launch.
- The client must confirm how the brand name is written in Bengali (e.g. আখি ফার্নিচার) and whether "AKHI" stays in Latin letters in the logo.

---

## 12. Technology

### 12.1 Frontend

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro 6.x** (static output) | Built for content-heavy, image-rich sites. Ships near-zero JavaScript by default. Built-in i18n routing, image optimization, and content collections. Cloudflare acquired the Astro company in January 2026, and Astro stays open source (MIT). |
| Language | TypeScript | Catches content and schema mistakes at build time |
| Styling | **Tailwind CSS v4** + CSS variables for design tokens | Tokens come straight from Claude Design. Mobile-first breakpoints are built in. |
| Interactivity | Small vanilla TypeScript scripts, including the Design Brief helper (built without Preact, about 1 KB). | Keeps JavaScript tiny (2–4 KB per page) |
| Images | Astro `<Picture>`: AVIF + WebP, responsive widths (400–2560px), lazy-loading below the fold, art-directed sources for phone vs desktop | Most of the speed depends on images |
| Gallery lightbox | **PhotoSwipe 5** | Pinch-zoom and swipe on phones, keyboard on desktop, lightweight |
| Carousels | CSS scroll-snap + a few lines of TypeScript | No heavy carousel library |
| YouTube | Click-to-load block with our own poster photo (youtube-nocookie embed) | The real YouTube player (~1 MB) only loads when tapped |
| Fonts | Self-hosted via Fontsource, subset to Latin + Bengali, `font-display: swap` | No Google Fonts request, fast first render |
| Icons | Lucide (line icons) + official brand icons for WhatsApp, Messenger, Instagram, Facebook, YouTube | Consistent and light |
| Page transitions | Astro View Transitions (subtle), off when the user prefers reduced motion | Feels premium without heavy animation |

### 12.2 Backend (and why there isn't a traditional one in v1)

The site sells nothing, stores no customer data, and sends every inquiry to messaging apps. A server, database, or admin login would add cost, maintenance, and security risk without benefit. The "backend" in v1 is:

| Piece | Choice |
|---|---|
| Content store | Typed Markdown/YAML files + images in the project repository (Astro Content Collections, schema-validated) |
| Media processing | Done at build time (sharp, via Astro) |
| Hosting / CDN | **Cloudflare** (Workers static assets or Pages), free tier, with edge caching close to Bangladeshi visitors |
| DNS | Move `akhifurniture.com` DNS to Cloudflare (keep any existing email/MX records, §20) |
| Code hosting | GitHub (private repository). Every push rebuilds and deploys automatically, and each branch gets a preview link for client review. |
| Forms / data | None in v1 |

### 12.3 Content editing
- **v1 (decided):** the developer (you) manages all content in the files, with Claude Code's help. This matches the discovery file ("developer-managed initially; optional CMS later").
- **Optional later:** add **Keystatic**, a visual editor at `/keystatic` that writes the same files. Nothing gets migrated. It can run locally only (developer) or through GitHub so AKHI staff can edit online.
- Why not Sanity or another hosted CMS: more setup, another account and service to maintain, and the developer manages content anyway. Revisit if AKHI staff start updating the site weekly.

### 12.4 Possible future backend features (not in v1)
- **Call-back request form:** a Cloudflare Worker sends the details to WhatsApp, email, or Telegram, with optional storage in Cloudflare D1.
- **Lead dashboard:** only if AKHI wants online lead tracking beyond WhatsApp labels.

### 12.5 Analytics & search tools (decided)
The discovery file asks for *privacy-conscious* page and click tracking, so:
- **Umami Cloud** (free Hobby plan, about 100K events/month; no cookies, so no cookie banner): page views plus the contact-click events in §16. If traffic ever exceeds the free plan, upgrade to the paid tier or self-host Umami.
- **Cloudflare's built-in traffic analytics** comes free with hosting as a backup view.
- **Google Search Console** for search performance and the sitemap.
- **Not in v1:** Google Analytics 4 and Meta Pixel. The Pixel can be added later if AKHI starts running Facebook/Instagram ads that send people to the site.

### 12.6 Running costs
| Item | Cost |
|---|---|
| Domain renewal | Client already owns it (~US$10–15/year) |
| Hosting, CDN, SSL, analytics | US$0 on free tiers |
| Fonts, icons, libraries | US$0 (open-source licenses) |
| Ongoing | Developer time for content updates and maintenance (agree separately) |

---

## 13. Performance budget

Tested on a mid-range Android phone over throttled 4G.

| Metric | Target |
|---|---|
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Interaction to Next Paint | < 200ms |
| JavaScript per page | < 50 KB compressed (excluding lazy-loaded lightbox and video) |
| Hero image | < 200 KB (AVIF) |
| Home page initial download | < 1.2 MB |
| Lighthouse (mobile) | ≥ 90 for Performance, Accessibility, Best Practices, SEO |

Also: no autoplaying video on phones. Respect the browser's data-saver setting. Fonts are preloaded and subset.

---

## 14. SEO and social sharing

- Unique title and description per page **in each language**, canonical URLs, `hreflang`, XML sitemap, robots.txt
- **Structured data:** `FurnitureStore` (name, verified address, geo, opening hours, phone, `sameAs` → Facebook/Instagram/YouTube), `BreadcrumbList`, `WebSite`, `VideoObject` for embedded videos, `FAQPage`. No `Product` markup, since there are no prices.
- **Share previews:** every design and project page gets its own Open Graph image (1200 × 630) from its best photo, with title and code, so shares on WhatsApp and Facebook look premium
- Alt text in both languages for every image
- Keyword themes (English + Bengali): custom furniture Dhaka · bed design · খাটের ডিজাইন · সোফা ডিজাইন · ডাইনিং টেবিল · office furniture Dhaka · conference table · Bashundhara furniture showroom
- **Google Business Profile:** the website becomes the single source of truth for name, address, and phone. Update the profile to match, which fixes the conflicts found in the audit.

---

## 15. Accessibility (WCAG 2.2 AA)

- Color contrast ≥ 4.5:1 for text (the proposed walnut on ivory is about 5.7:1, which passes; the bronze accent is decorative only, see Claude Design Brief §3.1)
- Visible focus outlines, full keyboard navigation, skip-to-content link
- Correct `lang` on each page and on mixed-language snippets
- The lightbox, menu, and channel chooser trap focus and close with Esc
- `prefers-reduced-motion` respected
- 44px minimum tap targets
- Form fields in the Design Brief helper have real labels

---

## 16. Analytics events

| Event | Sent when | Details sent |
|---|---|---|
| `contact_click` | Any WhatsApp / Messenger / Instagram / Call / Email button is tapped | `channel`, `placement` (header, sticky bar, design page, footer, CTA band), `design_code?`, `lang` |
| `directions_click` | Get-directions tapped | `placement` |
| `design_view` | Design page viewed | `design_code`, `category` |
| `brief_start` / `brief_send` | Design Brief helper started / sent to WhatsApp | `category`, `steps_completed` |
| `code_copy` | Design code copied | `design_code` |
| `video_play` | Workshop video played | `video_id` |
| `language_switch` | Language changed | `from`, `to` |

No personal data is ever sent. Each stored event property counts toward Umami's free monthly allowance, so only send the properties listed here.

---

## 17. Security and privacy

- HTTPS everywhere (Cloudflare). Security headers, including a Content Security Policy, which Astro 6 supports natively.
- No visitor data collected or stored by the site. The Design Brief helper runs entirely in the browser.
- A short privacy notice describing the analytics used (Umami is cookieless, so no cookie banner is needed)
- Domain and DNS access stays in the **client's own account**, with the developer as a delegated member. Not the other way round.

---

## 18. Project structure (for the build phase)

```
akhi_furnitures_website/
├── CLAUDE.md                  Project rules (plans, screen sizes, workflow)
├── plans/                     All plans + index (README.md)
├── design/                    Claude Design exports, tokens, screenshots
├── media/                     Asset register; originals and edited masters (large files kept out of Git)
├── src/
│   ├── content/               designs/, projects/, categories/, testimonials/, faqs/, settings
│   ├── assets/images/         Web-ready masters used by the site
│   ├── components/            Header, DesignCard, Gallery, ContactBar, BriefHelper, …
│   ├── layouts/
│   ├── pages/                 [lang]/… routes generating /en/ and /bn/ pages
│   ├── i18n/                  en.json, bn.json, helpers
│   └── styles/                Tokens and global CSS
├── public/                    favicons, robots.txt
└── tests/                     Playwright checks at phone / tablet / desktop sizes
```

---

## 19. Phases and approval gates

| Phase | What happens | Output | Rough effort |
|---|---|---|---|
| **0. Verify** | Collect business facts and links (§23), get written media permission. Runs alongside design; placeholders are used until facts arrive. | Verified facts sheet | 1–2 days (depends on client) |
| **1. Media sprint** | Inventory → score → collect → edit a first set of 6–10 photos | Asset register; first edited photos | 5–7 working days |
| **2. Design** (Claude Design) | Design system + key pages at phone, tablet, and desktop, tested with *real* AKHI photos | Approved mockups + tokens | 1–2 weeks of iteration |
| **3. Build** (Claude Code) | Follow the [Website Build Plan](2026-10-10-website-build-plan.md), milestones M0–M14 | Working site on a preview link | 2–3 weeks |
| **4. QA & launch** | Device, browser, and in-app browser tests, content approval, DNS, go-live | Live site on akhifurniture.com | 3–5 days |
| **5. After launch** | Update Facebook, Instagram, YouTube, and Google Business Profile links; monitor; add content monthly | Launch report | Ongoing |

**Gate before building (from discovery):** official social sources confirmed · media permission received · at least one hero-quality photo · a credible core set of designs shortlisted · English + Bengali layouts tested with real photos · homepage direction approved by the client.

Phases 1 and 2 can overlap. Design can start with the first 6–10 real photos while the rest are edited.

---

## 20. QA and launch checklist

**Devices & browsers**
- [ ] Every page at 360 / 390 / 430 / 768 / 834 / 1024 / 1280 / 1440 / 1920px, portrait and landscape
- [ ] Real devices: a mid-range Android phone (Chrome), an iPhone (Safari), an iPad or Android tablet, a Windows laptop (Chrome/Edge), a Mac (Safari)
- [ ] **Facebook and Messenger in-app browsers**, plus Instagram's in-app browser
- [ ] Slow-network test (throttled 4G and 3G)

**Contact system**
- [ ] Every WhatsApp button opens the right number with the right pre-filled message (both languages, every design)
- [ ] Messenger and Instagram buttons copy the code and open the correct account
- [ ] Tap-to-call works; the directions link opens the correct Google Maps place
- [ ] Automated test: no contact link is empty or `#`

**Content**
- [ ] Every design, project, and claim approved by the client; no stock or AI imagery presented as AKHI's work
- [ ] Bengali reviewed by a native speaker
- [ ] Address, hours, phone identical on the site, Google Business Profile, and Facebook

**Technical**
- [ ] Lighthouse mobile ≥ 90 on Home, Designs, Design detail
- [ ] Accessibility checks (axe) pass; keyboard-only run-through
- [ ] Share previews checked (Facebook Sharing Debugger, WhatsApp)
- [ ] Sitemap submitted to Search Console; structured data validated
- [ ] DNS moved to Cloudflare **with existing email (MX) records preserved**; HTTPS on `akhifurniture.com` and `www`
- [ ] Analytics events fire correctly

---

## 21. After launch

- **Staff playbook** (a one-page, non-code deliverable for AKHI): use WhatsApp Business labels ("Website lead"), set up quick replies for common questions, aim to respond within an hour during opening hours, and ask for the design code if it's missing. This addresses the audit finding that inquiries weren't consistently turned into orders.
- **Monthly:** add 2–4 new designs or projects from recent Facebook posts, with the same permission and editing rules.
- **Quarterly:** check Search Console, analytics, page speed, and broken links.

---

## 22. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Public photos are low quality | Site looks less premium | Media sprint first; design adapts to real photo quality (§10.3); an optional showroom shoot if one ever becomes possible |
| Using someone else's work by mistake | Reputation and legal risk | Written permission; verify every photo; `rights` field blocks publishing |
| Wrong or conflicting business facts | Lost customers, lost trust | Verify everything in Phase 0; one source of truth |
| Inquiries not answered quickly | Wasted website traffic | Staff playbook; a monitored WhatsApp number |
| Domain/DNS access unclear | Launch delay | Get registrar access early (Phase 0) |
| Bengali typography looks off | Unprofessional | Test Bengali in mockups from day one |
| Scope creep toward e-commerce | Cost and delay | This plan's "Not building" list |

---

## 23. Decisions and information still to collect

### Decisions (settled, no further input needed)

| Topic | Decision |
|---|---|
| Website type | Showroom / portfolio only. Nothing is sold. No cart, checkout, prices, accounts, or billing. Visitors are sent to WhatsApp, Messenger, Instagram, or a call. |
| Languages | English **and** Bengali on every page, as `/en/…` and `/bn/…`. `/` redirects to `/en/`. A language switcher on every page. |
| Photos | Collected from AKHI's public Facebook and YouTube and edited by the developer (the client won't supply photos). A showroom shoot is an optional extra, not a dependency. |
| Catalog size | Curated: 12–18 featured designs at launch ("Featured designs", not "Best sellers") |
| Analytics | Umami Cloud (cookieless) + Cloudflare traffic analytics + Google Search Console. No GA4 or Meta Pixel in v1. |
| Content editing | Developer-managed files in v1. Keystatic only if AKHI staff later need to edit. |
| Backend | None in v1 (§12.2) |
| Hosting / domain | Cloudflare free tier on the client-owned `akhifurniture.com` |
| Optional sections | For Business and Sofa Renewal are designed now and published only once real content / the service is confirmed |

### Facts to collect from AKHI (developer task, Phase 0)
These are **not questions for planning**. Design and build use clearly marked placeholders, and every placeholder must be replaced with the confirmed fact before launch.
- [ ] WhatsApp number (is it 01600-297923?) and who monitors it
- [ ] Facebook Page username (for Messenger), Instagram username, email address
- [ ] Showroom address(es), branches (Bashundhara? Banani?), opening hours, Google Maps place
- [ ] Brand name in Bengali; logo files (or should a refreshed logo be designed?)
- [ ] Founding year and other facts allowed on the trust strip
- [ ] What customers can really customize, and which woods/materials/finishes AKHI uses
- [ ] Real ordering process and typical timelines
- [ ] Delivery coverage (Dhaka only? nationwide?) and installation
- [ ] Warranty or guarantee terms (including the reported 20-year woodworm guarantee)
- [ ] Is sofa renewal still offered? Office/corporate work: which projects can be shown?
- [ ] Written permission to reuse and edit Facebook/YouTube media
- [ ] Domain registrar access (and whether email runs on the domain)

---

## 24. Sources

- Discovery conversation and September 2026 Facebook audit findings: [`ChatGPT-Website discovery questions-20261010-0149.md`](../ChatGPT-Website%20discovery%20questions-20261010-0149.md)
- [25 custom furniture websites to follow in 2026, FreshySites](https://freshysites.com/web-design-development/top-custom-furniture-websites/)
- [OTOBI](https://www.otobi.com/) · [HATIL](https://www.hatil.com/) · [Couch Seattle](https://www.couchseattle.com/) · [Benchmark Furniture](https://www.benchmarkfurniture.com/) · [Philip Morley Furniture](https://philipmorleyfurniture.com/) · [Tischlerei Cambium (Webflow showcase)](https://webflow.com/made-in-webflow/website/tischlerei-cambium)
- [Cloudflare press release: Cloudflare acquires Astro (16 Jan 2026)](https://www.cloudflare.com/press/press-releases/2026/cloudflare-acquires-astro-to-accelerate-the-future-of-high-performance-web-development/)
- [WhatsApp click-to-chat (wa.me) format, Dotdigital help](https://support.dotdigital.com/en/articles/11331301-click-to-chat-for-whatsapp)
- [Meta developer docs: ig.me links](https://developers.facebook.com/docs/messenger-platform/instagram/features/ig-me-links)
- [Digital 2026: Bangladesh, DataReportal](https://datareportal.com/reports/digital-2026-bangladesh) · [BBS: internet and smartphone survey, The Daily Star](https://www.thedailystar.net/business/news/internet-use-bangladesh-climbs-steadily-q3-4215671) · [BTRC subscriber data, Financial Express](https://thefinancialexpress.com.bd/trade/internet-subscriber-growth-outpaces-mobile-connections-in-h1)
- [Best headless CMS for Astro in 2026, Lucky Media](https://www.luckymedia.dev/guides/best-headless-cms-for-astro)
- [Umami Cloud FAQ (free Hobby plan, event counting)](https://umami.is/docs/cloud/faq) · [Umami free-tier summary, freetier.co](https://freetier.co/directory/products/umami)

---

## Changelog
- **2026-10-10:** First draft, based on the discovery file and web research.
- **2026-10-10:** Approved by the user ("follow the plan, no more questions"). Settled all open decisions (§23), switched URLs to `/en/` + `/bn/` as in the discovery file, chose Umami for privacy-conscious analytics, added the discovery file's asset-register columns and the design `kind` field, linked the new [Website Build Plan](2026-10-10-website-build-plan.md).
- **2026-10-10:** Media pipeline started (section 10): 100 public photos collected from the Facebook Page into `media/originals/facebook/` with a manifest; 44 edited for the mockups (`media/edited/`, `design/assets/photos/`) and logged in `media/asset-register.csv`. All are `pending` until AKHI gives written permission and confirms ownership.
- **2026-10-10:** Build started (see the [Website Build Plan](2026-10-10-website-build-plan.md) progress table). §12.1 updated to match: the Design Brief helper and the YouTube click-to-load block are small vanilla scripts instead of Preact and lite-youtube-embed.
