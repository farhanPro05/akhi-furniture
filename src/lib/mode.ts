/**
 * Build mode.
 * - preview (default, `pnpm dev` / `pnpm build`): also shows "sample" items and every photo, for review.
 *   Pages are marked noindex.
 * - production (`pnpm build:production`): published content only (pending rights included while
 *   `settings.publishPendingRights` is true), indexed, and the build fails while any TODO-VERIFY fact
 *   remains in src/content/settings.ts.
 */
export type Mode = "preview" | "production";

export const MODE: Mode = process.env.AKHI_MODE === "production" ? "production" : "preview";
export const PREVIEW = MODE === "preview";
