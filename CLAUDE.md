# AKHI Furniture Website — Project Instructions

These rules apply to every session in this folder. They are mandatory.

## 1. Plans live in this project (absolute rule)

- Every plan is saved inside this project, in [`plans/`](plans/). Never save a plan to `~/.claude/plans/`, the scratchpad, `/tmp`, or anywhere outside this folder.
- `.claude/settings.json` sets `"plansDirectory": "plans"`, so plan-mode drafts also land in `plans/`.
- **File name = the plan's title**, prefixed with its date: `plans/YYYY-MM-DD-<title-in-kebab-case>.md`
  - Example: title "Website Master Plan" → `plans/2026-10-10-website-master-plan.md`
  - The first line of the file is `# <Title>`, matching the file name.
  - Plan mode gives drafts random names (e.g. `jolly-dancing-turtle.md`). Once a plan is approved, rename it to the title format right away.
- Every plan starts with a header block: **Status** (Draft / Approved / In progress / Done / Superseded), **Date**, **Related plans**.
- After creating or renaming a plan, add or update its row in [`plans/README.md`](plans/README.md), the plan index.
- To change an existing plan, edit it in place and add a dated line to its `## Changelog`. If the direction changes completely, write a new plan, mark the old one **Superseded**, and link the two.
- At the start of a session, read `plans/README.md` and the plans relevant to the task before doing anything else.

## 2. Every screen size, always (absolute rule)

Every design plan, mockup brief, and line of code must work on **desktop, laptop, tablet, and mobile phone**. No page or component is finished until it has been designed and checked at all of these widths:

| Device | Test widths |
|---|---|
| Small phone | 360px |
| Large phone | 390–430px |
| Tablet portrait / landscape | 768px / 1024px |
| Laptop | 1280–1440px |
| Large desktop | 1920px+ (content stays in a max-width container, nothing stretches awkwardly) |

- Design mobile-first, then enhance for larger screens. Do not shrink a desktop layout down to fit a phone.
- No horizontal scrolling at any width. Tap targets are at least 44×44px. Text stays readable without zooming.
- Images use responsive sizes and crops: a hero photo gets separate crops for mobile (portrait) and desktop (landscape).
- Every design brief for Claude Design asks for desktop, tablet, and mobile frames of each page.

## 3. Workflow

1. **Plan** (Claude Code) → saved in `plans/`
2. **Design mockups** (Claude Design), made from the plan's design brief
3. **Build** (Claude Code), from the approved mockups

Do not write website code until the user explicitly says to start building.

## 4. Project context

- Client: **AKHI Furniture**, a furniture showroom and custom-furniture maker in Dhaka, Bangladesh.
- The website is a **digital showroom / portfolio**. Nothing is sold on the site: no cart, checkout, payments, prices, or customer accounts. Visitors are sent to WhatsApp, Messenger, Instagram, or a phone call.
- Bilingual: English + Bengali (বাংলা).
- Discovery source: [`ChatGPT-Website discovery questions-20261010-0149.md`](ChatGPT-Website%20discovery%20questions-20261010-0149.md)
- Plans: [Website Master Plan](plans/2026-10-10-website-master-plan.md) (what and why) · [Claude Design Brief](plans/2026-10-10-claude-design-brief.md) (look and feel) · [Website Build Plan](plans/2026-10-10-website-build-plan.md) (build order)
- The planning decisions are settled (Master Plan §23). Follow the plans and the discovery file without re-asking the user about scope, languages, or features. Unconfirmed business facts use `TODO-VERIFY` placeholders.

## 5. Content integrity

- Only real AKHI Furniture work appears as AKHI's work. Never present stock photos or AI-generated furniture as their products or projects.
- Photo editing may improve light, color, crop, and cleanup. It must never change the furniture itself (materials, details, features).
- Never publish a price, warranty, delivery promise, or other business claim unless the client has verified it.

## Plan index

@plans/README.md
