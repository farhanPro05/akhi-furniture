/**
 * Build mode.
 * - preview (default, `pnpm dev` / `pnpm build`): shows content whose photos or facts still wait for
 *   AKHI's approval, so the client can review it. Pages are marked noindex.
 * - production (`pnpm build:production`): only approved content is published, and the build fails
 *   while any TODO-VERIFY fact remains in src/content/settings.ts.
 */
export type Mode = "preview" | "production";

export const MODE: Mode = process.env.AKHI_MODE === "production" ? "production" : "preview";
export const PREVIEW = MODE === "preview";
