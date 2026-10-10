import type { Lang } from "../i18n";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Bengali pages show Bengali digits for display. Links always keep standard digits. */
export function localDigits(value: string | number, lang: Lang): string {
  const s = String(value);
  return lang === "bn" ? s.replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]!) : s;
}

/** Two-digit step numbers ("01", "০১"). */
export function stepNumber(index: number, lang: Lang): string {
  return localDigits(String(index + 1).padStart(2, "0"), lang);
}
