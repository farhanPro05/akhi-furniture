import type { Lang } from "../i18n";
import { settings } from "../content/settings";

/** Site-relative URL for a page in one language, always with a trailing slash. */
export function localUrl(lang: Lang, path = ""): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `/${lang}/${clean}/` : `/${lang}/`;
}

/** Same page in the other language: only the language prefix changes (slugs stay in English). */
export function switchLang(pathname: string, to: Lang): string {
  return pathname.replace(/^\/(en|bn)(\/|$)/, `/${to}/`);
}

/** The path after the language prefix, e.g. "/bn/designs/x/" -> "designs/x". */
export function pagePath(pathname: string): string {
  return pathname.replace(/^\/(en|bn)\/?/, "").replace(/\/+$/, "");
}

export function absoluteUrl(path: string): string {
  return new URL(path, settings.siteUrl).href;
}
