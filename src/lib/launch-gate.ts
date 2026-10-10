import { settings } from "../content/settings";
import { MODE, PREVIEW } from "./mode";

/** Optional pages (Master Plan §23) are always built for preview, and in production only once confirmed. */
export const pageEnabled = {
  forBusiness: PREVIEW || settings.pages.forBusiness,
  sofaRenewal: PREVIEW || settings.pages.sofaRenewal,
};

/** Build Plan M14: a production build must not ship while any business fact is still a placeholder. */
export function assertLaunchReady(): void {
  if (MODE !== "production") return;
  const open = Object.entries(settings.todoVerify);
  if (open.length === 0) return;
  throw new Error(
    `Production build stopped: ${open.length} business facts still need AKHI's confirmation.\n` +
      `Confirm each one, update src/content/settings.ts and remove it from todoVerify:\n` +
      open.map(([key, what]) => `  - ${key}: ${what}`).join("\n"),
  );
}
