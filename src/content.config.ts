import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";
import { photoIds, type PhotoId } from "./data/photos";

/* Shared field types ----------------------------------------------------- */

const localized = z.object({ en: z.string().min(1), bn: z.string().min(1) });

const photo = z.enum(photoIds as [PhotoId, ...PhotoId[]], { error: "Unknown photo id. Add the photo to src/data/photos.ts." });

/** CSS object-position, e.g. "50% 60%". */
const focal = z
  .string()
  .regex(/^\d{1,3}% \d{1,3}%$/)
  .optional();

export const ROOMS = ["bedroom", "living", "dining", "office"] as const;
export const TYPES = ["beds", "sofas", "dining-sets", "wardrobes", "dressing-tables", "showcases", "tables", "chairs", "office"] as const;
export const ICONS = ["ruler", "wood", "finish", "fabric", "storage", "sparkle"] as const;

/**
 * Publish guard (Master Plan §9). An item reaches a production build only when
 * status is "published", rights are "approved" and the client approved it.
 * "sample" items (placeholder copy, e.g. reviews) show in preview builds only, with a visible tag.
 * "draft" items never show.
 */
const publishing = {
  status: z.enum(["draft", "sample", "published"]),
  source: z.url().optional(),
  rights: z.enum(["approved", "pending"]),
  clientApproved: z.boolean(),
};

/* Collections ------------------------------------------------------------ */

const designs = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/designs" }),
  schema: z.object({
    code: z.string().regex(/^AF-(BED|SOF|DIN|WRD|DRS|SHW|TBL|CHR|OFC|CNF)-\d{3}$/, "Design codes look like AF-BED-014"),
    title: localized,
    room: z.enum(ROOMS),
    type: z.enum(TYPES),
    kind: z.enum(["completed-work", "design-reference"]),
    summary: localized,
    /** Short material line on cards. Verified facts only before launch. */
    material: localized.optional(),
    customize: z.array(z.object({ icon: z.enum(ICONS), title: localized, text: localized })).optional(),
    swatches: z.array(z.object({ name: localized, part: localized, color: z.string() })).optional(),
    size: localized.optional(),
    images: z.array(z.object({ photo, caption: localized, pos: focal })).min(1),
    /** Second photo shown when a mouse hovers the card. */
    hoverPhoto: photo.optional(),
    youtubeId: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    ...publishing,
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/projects" }),
  schema: z.object({
    title: localized,
    /** Short form for breadcrumbs on phones. */
    shortTitle: localized,
    type: z.enum(["home", "office", "renewal"]),
    /** Only with the customer's permission. */
    area: localized.optional(),
    year: z.number().int().optional(),
    pieces: z.number().int().optional(),
    scope: localized,
    need: localized.optional(),
    made: localized,
    cover: z.object({ photo, pos: focal }),
    hero: z.object({ photo, pos: focal }),
    gallery: z.array(z.object({ photo, pos: focal })).default([]),
    before: photo.optional(),
    after: photo.optional(),
    /** Design codes used in the project. */
    designs: z.array(z.string()).default([]),
    testimonial: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    ...publishing,
  }),
});

const rooms = defineCollection({
  loader: file("./src/content/rooms.yaml"),
  schema: z.object({
    order: z.number(),
    cover: z.object({ photo, pos: focal }).optional(),
  }),
});

const testimonials = defineCollection({
  loader: file("./src/content/testimonials.yaml"),
  schema: z.object({
    /** The review as written, in its original language. */
    quote: z.string().min(1),
    quoteLang: z.enum(["en", "bn"]),
    /** Translation into the other language. */
    translation: z.string().min(1),
    name: localized,
    initials: z.string().max(3),
    context: localized,
    sourceUrl: z.url().optional(),
    date: z.string().optional(),
    /** Written permission to quote the reviewer. */
    permission: z.boolean(),
    order: z.number().default(100),
    status: z.enum(["draft", "sample", "published"]),
  }),
});

const faqs = defineCollection({
  loader: file("./src/content/faqs.yaml"),
  schema: z.object({
    group: z.enum(["custom", "materials", "delivery", "showroom", "business"]),
    order: z.number(),
    question: localized,
    answer: localized,
    /** Also shown as a short FAQ on these pages. */
    showOn: z.array(z.enum(["design", "custom"])).default([]),
    status: z.enum(["draft", "published"]),
  }),
});

export const collections = { designs, projects, rooms, testimonials, faqs };
