/**
 * Content queries with the publish guard applied (Master Plan §9).
 * Pages only ever read content through these helpers.
 */
import { getCollection, type CollectionEntry } from "astro:content";
import { ROOMS } from "../content.config";
import { PREVIEW } from "./mode";

export type Design = CollectionEntry<"designs">;
export type Project = CollectionEntry<"projects">;
export type Testimonial = CollectionEntry<"testimonials">;
export type Faq = CollectionEntry<"faqs">;
export type Room = (typeof ROOMS)[number];

type Guarded = { status: "draft" | "sample" | "published"; rights: "approved" | "pending"; clientApproved: boolean };

/** Preview builds show published and sample items; production shows only fully approved ones. */
export function isPublishable(item: Guarded): boolean {
  if (item.status === "draft") return false;
  if (PREVIEW) return true;
  return item.status === "published" && item.rights === "approved" && item.clientApproved;
}

const byFeaturedThenOrder = (a: { data: { featured: boolean; order: number } }, b: { data: { featured: boolean; order: number } }) =>
  Number(b.data.featured) - Number(a.data.featured) || a.data.order - b.data.order;

let designsCache: Design[] | undefined;

export async function getDesigns(): Promise<Design[]> {
  if (designsCache) return designsCache;
  const all = await getCollection("designs");
  const codes = new Map<string, string>();
  for (const d of all) {
    const other = codes.get(d.data.code);
    if (other) throw new Error(`designs: code ${d.data.code} is used by both "${other}" and "${d.id}". Codes are never reused.`);
    codes.set(d.data.code, d.id);
    if ((ROOMS as readonly string[]).includes(d.id)) throw new Error(`designs: slug "${d.id}" clashes with a room page URL`);
  }
  designsCache = all.filter((d) => isPublishable(d.data)).sort(byFeaturedThenOrder);
  return designsCache;
}

export async function getDesignByCode(code: string): Promise<Design | undefined> {
  return (await getDesigns()).find((d) => d.data.code === code);
}

export async function getProjects(): Promise<Project[]> {
  const all = await getCollection("projects");
  return all.filter((p) => isPublishable(p.data)).sort(byFeaturedThenOrder);
}

export async function getRooms() {
  return (await getCollection("rooms")).sort((a, b) => a.data.order - b.data.order);
}

/** Sample reviews show in preview builds only; production needs a published review with permission. */
export function isTestimonialPublishable(t: Testimonial["data"]): boolean {
  if (t.status === "draft") return false;
  if (PREVIEW) return true;
  return t.status === "published" && t.permission;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const all = await getCollection("testimonials");
  return all.filter((t) => isTestimonialPublishable(t.data)).sort((a, b) => a.data.order - b.data.order);
}

export async function getTestimonial(id: string | undefined): Promise<Testimonial | undefined> {
  if (!id) return undefined;
  return (await getTestimonials()).find((t) => t.id === id);
}

const FAQ_GROUPS = ["custom", "materials", "delivery", "showroom", "business"] as const;

export async function getFaqs(showOn?: "design" | "custom"): Promise<Faq[]> {
  const all = (await getCollection("faqs")).filter((f) => f.data.status === "published");
  const groupRank = (f: Faq) => FAQ_GROUPS.indexOf(f.data.group);
  return (showOn ? all.filter((f) => f.data.showOn.includes(showOn)) : all).sort(
    (a, b) => groupRank(a) - groupRank(b) || a.data.order - b.data.order,
  );
}
