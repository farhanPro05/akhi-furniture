/**
 * Umami event attributes (Master Plan §16). Umami records clicks on elements carrying
 * data-umami-event, so contact buttons need no extra JavaScript. Only the listed
 * properties are sent; never personal data.
 */
export type Channel = "whatsapp" | "messenger" | "instagram" | "call" | "email";
export type Placement =
  | "header"
  | "menu"
  | "sticky_bar"
  | "chooser"
  | "hero"
  | "design_page"
  | "cta_band"
  | "footer"
  | "visit_page"
  | "showroom"
  | "brief"
  | "empty_state"
  | "page";

export function track(event: string, props: Record<string, string | undefined> = {}): Record<string, string> {
  const attrs: Record<string, string> = { "data-umami-event": event };
  for (const [key, value] of Object.entries(props)) if (value) attrs[`data-umami-event-${key}`] = value;
  return attrs;
}

export function contactTrack(channel: Channel, placement: Placement, lang: string, designCode?: string) {
  return track("contact_click", { channel, placement, lang, design_code: designCode });
}

export function directionsTrack(placement: Placement) {
  return track("directions_click", { placement });
}
