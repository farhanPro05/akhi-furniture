/**
 * Photo registry: every photo the site can show, with alt text in both languages.
 *
 * Masters live in src/assets/images/ (copies of media/edited/). Rights come from
 * media/asset-register.csv, the project's single record of where each photo came from
 * and whether AKHI approved it. A photo is approved only when, in its register row:
 *   media_status starts with "authorized" or "approved",
 *   client_approval is "approved", and
 *   ownership_confirmed is "yes" or "confirmed".
 * Production builds show a plain placeholder instead of any photo that is not approved.
 */
import fs from "node:fs";
import path from "node:path";
import type { ImageMetadata } from "astro";
import type { Localized } from "../i18n";
import { PREVIEW } from "../lib/mode";

const files = import.meta.glob<{ default: ImageMetadata }>("../assets/images/*.jpg", { eager: true });

export const photoAlt = {
  "hero-living": {
    en: "Living room with a carved sofa set, armchairs and a marble-top center table",
    bn: "খোদাই করা সোফা সেট, আর্মচেয়ার ও মার্বেল টপ সেন্টার টেবিলসহ লিভিং রুম",
  },
  "hero-living-m": { en: "Carved sofa and armchair in a living room", bn: "লিভিং রুমে খোদাই করা সোফা ও আর্মচেয়ার" },
  "room-bedroom": { en: "Carved bed in the showroom", bn: "শোরুমে খোদাই করা খাট" },
  "room-living": { en: "Pink velvet sofa set in the showroom", bn: "শোরুমে গোলাপি ভেলভেটের সোফা সেট" },
  "room-dining": { en: "Glass-top dining set in the showroom", bn: "শোরুমে কাচের টপের ডাইনিং সেট" },
  "d-din-021": {
    en: "Marble-top dining table with carved champagne legs and damask chairs",
    bn: "খোদাই করা শ্যাম্পেন পায়া ও ড্যামাস্ক চেয়ারসহ মার্বেল টপ ডাইনিং টেবিল",
  },
  "d-din-021-b": { en: "Marble-top dining set, wide view in the showroom", bn: "শোরুমে মার্বেল টপ ডাইনিং সেট, প্রশস্ত ছবি" },
  "d-din-021-c": { en: "Marble-top dining set seen from the end of the table", bn: "টেবিলের মাথা থেকে মার্বেল টপ ডাইনিং সেট" },
  "d-din-021-d": {
    en: "Side view of the dining set showing the carved champagne legs",
    bn: "পাশ থেকে ডাইনিং সেট, খোদাই করা শ্যাম্পেন পায়া",
  },
  "d-din-021-e": { en: "The marble-top dining table on its own", bn: "শুধু মার্বেল টপ ডাইনিং টেবিলটি" },
  "d-din-021-f": { en: "Damask-upholstered dining chairs", bn: "ড্যামাস্ক কাপড়ের ডাইনিং চেয়ার" },
  "c-sof-007": { en: "Carved sofa upholstered in velvet", bn: "ভেলভেট কাপড়ের খোদাই করা সোফা" },
  "d-sof-007-b": { en: "Carved velvet sofa in a room setting", bn: "ঘরে সাজানো খোদাই করা ভেলভেট সোফা" },
  "d-bed-014": { en: "Bed with a velvet upholstered headboard and base", bn: "ভেলভেট কুশনের হেডবোর্ড ও বেসসহ খাট" },
  "d-bed-014-b": { en: "Velvet upholstered bed, another angle", bn: "ভেলভেট কুশন খাট, অন্য দিক থেকে" },
  "c-wrd-005": { en: "Wardrobe with mirror doors in a mahogany finish", bn: "মেহগনি ফিনিশের আয়না দরজার ওয়ার্ডরোব" },
  "d-wrd-005-b": { en: "Mirror-door wardrobe, detail", bn: "আয়না দরজার ওয়ার্ডরোব, খুঁটিনাটি" },
  "c-chr-004": { en: "Carved armchair upholstered in velvet", bn: "ভেলভেট কাপড়ের খোদাই করা আর্মচেয়ার" },
  "d-sof-012": { en: "Button-tufted Chesterfield sofa", bn: "বাটন টাফটেড চেস্টারফিল্ড সোফা" },
  "d-sof-012-b": { en: "Chesterfield sofa, another angle", bn: "চেস্টারফিল্ড সোফা, অন্য দিক থেকে" },
  "c-shw-009": { en: "Champagne showcase with a carved frame and glass shelves", bn: "খোদাই ফ্রেম ও কাচের তাকসহ শ্যাম্পেন রঙের শোকেস" },
  "d-drs-003": { en: "Carved dressing table with a mirror and stool", bn: "আয়না ও টুলসহ খোদাই করা ড্রেসিং টেবিল" },
  "d-drs-003-b": { en: "Carved dressing table, another angle", bn: "খোদাই করা ড্রেসিং টেবিল, অন্য দিক থেকে" },
  "d-bed-019": { en: "Bed with a tufted pearl-coloured headboard and carved frame", bn: "টাফটেড পার্ল রঙের হেডবোর্ড ও খোদাই ফ্রেমের খাট" },
  "d-sof-015": { en: "Painted loveseat and armchairs with damask upholstery", bn: "ড্যামাস্ক কাপড়ের রঙিন লাভসিট ও আর্মচেয়ার" },
  "d-sof-015-b": { en: "Loveseat set with armchairs, another view", bn: "আর্মচেয়ারসহ লাভসিট সেট, অন্য দিক থেকে" },
  "d-tbl-006": { en: "Coffee table with mirror panels", bn: "আয়নার প্যানেল বসানো কফি টেবিল" },
  "d-tbl-006-b": {
    en: "Sitting room with a loveseat, armchairs and a mirrored coffee table",
    bn: "লাভসিট, আর্মচেয়ার ও আয়না বসানো কফি টেবিলসহ বসার ঘর",
  },
  "d-drs-008": { en: "Dressing table with three mirrors in a champagne finish", bn: "শ্যাম্পেন ফিনিশের তিন আয়নার ড্রেসিং টেবিল" },
  "p-bedroom-suite": { en: "Champagne bedroom suite in a family home", bn: "একটি পারিবারিক বাসায় শ্যাম্পেন রঙের বেডরুম সেট" },
  "p-bedroom-suite-b": { en: "Champagne bedroom suite, another view", bn: "শ্যাম্পেন রঙের বেডরুম সেট, অন্য দিক থেকে" },
  "p-kitchen": { en: "Kitchen cabinets with a lit glass-front cabinet", bn: "আলো জ্বলা কাচের কেবিনেটসহ কিচেন কেবিনেট" },
  "p-kitchen-b": { en: "Kitchen with a lit glass cabinet", bn: "আলো জ্বলা কাচের কেবিনেটসহ রান্নাঘর" },
  "p-wardrobes": { en: "White floor-to-ceiling wardrobes with mirror doors", bn: "মেঝে থেকে ছাদ পর্যন্ত আয়না দরজার সাদা ওয়ার্ডরোব" },
  "p-sitting-detail": { en: "Mirrored coffee table, detail", bn: "আয়না বসানো কফি টেবিল, খুঁটিনাটি" },
  "p-sitting-chair": { en: "Oval-back armchair, detail", bn: "ডিম্বাকৃতি পিঠের আর্মচেয়ার, খুঁটিনাটি" },
  "ws-sofa": { en: "Gold carved sofa in the workshop", bn: "কারখানায় সোনালি খোদাই করা সোফা" },
  "ws-sofa-b": { en: "Gold carved sofa in the workshop, another view", bn: "কারখানায় সোনালি খোদাই করা সোফা, অন্য দিক থেকে" },
  "ws-wardrobe": { en: "Mahogany wardrobes being finished in the workshop", bn: "কারখানায় ফিনিশিং চলছে মেহগনি ওয়ার্ডরোবের" },
  "ws-wardrobe-b": { en: "Mahogany wardrobe in the workshop", bn: "কারখানায় মেহগনি ওয়ার্ডরোব" },
  "showroom-1": { en: "Sideboard on display in the showroom", bn: "শোরুমে সাজানো সাইডবোর্ড" },
  "showroom-2": { en: "Dining set and armchair in the showroom", bn: "শোরুমে ডাইনিং সেট ও আর্মচেয়ার" },
  "showroom-3": { en: "Console table and mirror in the showroom", bn: "শোরুমে কনসোল টেবিল ও আয়না" },
  "craft-carving": { en: "Close-up of hand carving on a wooden box", bn: "কাঠের বাক্সে হাতের খোদাইয়ের ক্লোজ-আপ" },
} satisfies Record<string, Localized>;

export type PhotoId = keyof typeof photoAlt;
export const photoIds = Object.keys(photoAlt) as PhotoId[];

export type Photo = {
  id: PhotoId;
  src: ImageMetadata;
  alt: Localized;
  source: string;
  approved: boolean;
  /** True when this build may show the photo (always in preview, approved only in production). */
  publishable: boolean;
};

/* ---------- Asset register (rights) ---------- */

function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      if (row.some((f) => f !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.some((f) => f !== "")) rows.push(row);
  const [header = [], ...body] = rows;
  return body.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])));
}

const positive = (value: string | undefined, words: string[]) => words.some((w) => (value ?? "").trim().toLowerCase().startsWith(w));

const register = parseCsv(fs.readFileSync(path.resolve("media/asset-register.csv"), "utf8"));
const registerById = new Map(register.map((r) => [path.basename(r.web_file ?? "", ".jpg"), r]));

/* ---------- Build-time integrity checks ---------- */

for (const id of photoIds) {
  if (!files[`../assets/images/${id}.jpg`]) throw new Error(`photos: src/assets/images/${id}.jpg is missing`);
  if (!registerById.has(id)) throw new Error(`photos: "${id}" has no row in media/asset-register.csv`);
}
for (const file of Object.keys(files)) {
  const id = path.basename(file, ".jpg");
  if (!(id in photoAlt)) throw new Error(`photos: ${file} has no entry (alt text) in src/data/photos.ts`);
}

const cache = new Map<PhotoId, Photo>();

export function isPhotoId(id: string): id is PhotoId {
  return id in photoAlt;
}

export function getPhoto(id: PhotoId): Photo {
  const hit = cache.get(id);
  if (hit) return hit;
  const row = registerById.get(id)!;
  const approved =
    positive(row.media_status, ["authorized", "approved"]) &&
    positive(row.client_approval, ["approved"]) &&
    positive(row.ownership_confirmed, ["yes", "confirmed"]);
  const photo: Photo = {
    id,
    src: files[`../assets/images/${id}.jpg`]!.default,
    alt: photoAlt[id],
    source: row.source_url ?? "",
    approved,
    publishable: PREVIEW || approved,
  };
  cache.set(id, photo);
  return photo;
}
