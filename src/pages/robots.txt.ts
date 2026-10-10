import type { APIRoute } from "astro";
import { PREVIEW } from "../lib/mode";

/** Preview builds (branch links for client review) must never be indexed. */
export const GET: APIRoute = ({ site }) =>
  new Response(PREVIEW ? "User-agent: *\nDisallow: /\n" : `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap-index.xml", site)}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
