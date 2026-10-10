import { LOCALES, type Lang } from "../i18n";

/** getStaticPaths for pages that exist once per language. */
export function langPaths() {
  return LOCALES.map((lang) => ({ params: { lang } }));
}

export function langParam(value: string | undefined): Lang {
  if (value === "en" || value === "bn") return value;
  throw new Error(`Unknown language "${value}"`);
}
