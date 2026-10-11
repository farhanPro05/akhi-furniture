import { settings } from "../content/settings";
import { MODE } from "./mode";

/**
 * Optional pages (Master Plan §23), built in every mode only once switched on in settings.pages.
 * Both still have photo slots AKHI hasn't filled, which fail the build until real photos are added.
 */
export const pageEnabled = {
  forBusiness: settings.pages.forBusiness,
  sofaRenewal: settings.pages.sofaRenewal,
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
