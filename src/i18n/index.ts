import en from "./en.json";
import bn from "./bn.json";

export const LOCALES = ["en", "bn"] as const;
export type Lang = (typeof LOCALES)[number];
export type Dict = typeof en;

/** Every leaf path in a dictionary, e.g. "home.steps[0].title". */
function leafPaths(value: unknown, path = ""): string[] {
  if (value === null || typeof value !== "object") return [path];
  if (Array.isArray(value)) return value.flatMap((v, i) => leafPaths(v, `${path}[${i}]`));
  return Object.entries(value).flatMap(([k, v]) => leafPaths(v, path ? `${path}.${k}` : k));
}

/** Lists keys present in one dictionary but not the other. Empty when both match. */
export function missingKeys(a: unknown, b: unknown): { onlyInFirst: string[]; onlyInSecond: string[] } {
  const A = new Set(leafPaths(a));
  const B = new Set(leafPaths(b));
  return {
    onlyInFirst: [...A].filter((k) => !B.has(k)),
    onlyInSecond: [...B].filter((k) => !A.has(k)),
  };
}

// The build fails if a translation is missing in either language (Build Plan M2).
const diff = missingKeys(en, bn);
if (diff.onlyInFirst.length || diff.onlyInSecond.length) {
  throw new Error(
    `i18n: en.json and bn.json differ.\n  Missing in bn.json: ${diff.onlyInFirst.join(", ") || "none"}\n  Missing in en.json: ${diff.onlyInSecond.join(", ") || "none"}`,
  );
}

const dictionaries: Record<Lang, Dict> = { en, bn: bn as Dict };

export function dict(lang: Lang): Dict {
  return dictionaries[lang];
}

/** Replaces {name} placeholders. Unknown placeholders are left as they are. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match));
}

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export function otherLang(lang: Lang): Lang {
  return lang === "en" ? "bn" : "en";
}

/** A {en, bn} pair resolved for one language. */
export type Localized = { en: string; bn: string };
export function pick(value: Localized, lang: Lang): string {
  return value[lang];
}
