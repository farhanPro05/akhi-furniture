/**
 * Responsive image helpers (Build Plan M8): AVIF + WebP srcsets from the photo masters,
 * with a JPEG fallback, plus a dominant colour to paint the box while the photo loads.
 */
import path from "node:path";
import type { ImageMetadata } from "astro";
import { getImage } from "astro:assets";
import sharp from "sharp";

export const WIDTHS = [320, 480, 640, 800, 1024, 1280, 1600] as const;

const QUALITY = { avif: 55, webp: 72, jpg: 78 } as const;
type Format = keyof typeof QUALITY;

/** Widths no larger than the master (never upscale), plus the master's own width when it falls inside the range. */
export function usableWidths(src: ImageMetadata, widths: readonly number[] = WIDTHS): number[] {
  const ws = widths.filter((w) => w <= src.width);
  if (src.width < Math.max(...widths) && !ws.includes(src.width)) ws.push(src.width);
  return ws.sort((a, b) => a - b);
}

export async function buildSrcset(src: ImageMetadata, format: Format, widths: readonly number[] = WIDTHS): Promise<string> {
  const ws = usableWidths(src, widths);
  const images = await Promise.all(ws.map((width) => getImage({ src, width, format, quality: QUALITY[format] })));
  return images.map((img, i) => `${img.src} ${ws[i]}w`).join(", ");
}

export async function fallbackImage(src: ImageMetadata, width = 800) {
  return getImage({ src, width: Math.min(width, src.width), format: "jpg", quality: QUALITY.jpg });
}

/** A fixed-size crop, e.g. 1200 × 630 share images. */
export async function croppedImage(src: ImageMetadata, width: number, height: number, format: Format = "jpg") {
  return getImage({ src, width, height, fit: "cover", format, quality: QUALITY[format] });
}

const colors = new Map<string, string>();

/** Dominant colour of a master in src/assets/images/, as a CSS hex value. */
export async function dominantColor(id: string): Promise<string> {
  const hit = colors.get(id);
  if (hit) return hit;
  const { dominant } = await sharp(path.resolve("src/assets/images", `${id}.jpg`)).stats();
  const hex = `#${[dominant.r, dominant.g, dominant.b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
  colors.set(id, hex);
  return hex;
}
