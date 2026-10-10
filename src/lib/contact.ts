/**
 * Contact link builders (Master Plan §8). Pure functions: no Astro imports, unit-tested in tests/unit.
 */
import { dict, fmt, type Lang } from "../i18n";

/** wa.me needs the international number as digits only: no "+", spaces or dashes. */
export function normalizeWhatsappNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  // Bangladeshi mobile numbers: 880 + 1 + 9 digits. A local "01…" number gets the country code.
  const full = digits.startsWith("880") ? digits : digits.startsWith("0") ? `88${digits}` : digits;
  if (!/^8801\d{9}$/.test(full)) throw new Error(`Not a Bangladeshi mobile number in international format: "${raw}"`);
  return full;
}

export function whatsappLink(number: string, message?: string): string {
  const base = `https://wa.me/${normalizeWhatsappNumber(number)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Messenger and Instagram cannot take pre-filled text (Master Plan §8.2). */
export function messengerLink(username: string): string {
  if (!/^[A-Za-z0-9.]{5,}$/.test(username)) throw new Error(`Invalid Facebook Page username: "${username}"`);
  return `https://m.me/${username}`;
}

export function instagramLink(username: string): string {
  if (!/^[A-Za-z0-9._]{1,30}$/.test(username)) throw new Error(`Invalid Instagram username: "${username}"`);
  return `https://ig.me/m/${username}`;
}

export function telLink(e164: string): string {
  if (!/^\+8801\d{9}$/.test(e164)) throw new Error(`Phone must be in +8801XXXXXXXXX format: "${e164}"`);
  return `tel:${e164}`;
}

export function mailtoLink(email: string, subject?: string): string {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error(`Invalid email: "${email}"`);
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
}

/* Pre-filled WhatsApp messages (Master Plan §8.3) -------------------------- */

export type MessageContext =
  | { kind: "general" | "business" | "renewal" }
  | { kind: "design"; code: string; name: string; url: string }
  | { kind: "project"; name: string; url: string };

/** Each message ends with the "sent from akhifurniture.com" line, so staff can count website leads. */
export function buildMessage(lang: Lang, ctx: MessageContext): string {
  const m = dict(lang).messages;
  switch (ctx.kind) {
    case "design":
      return [fmt(m.design, { code: ctx.code, name: ctx.name }), ctx.url, m.sentFrom].join("\n");
    case "project":
      return [fmt(m.project, { name: ctx.name }), ctx.url, m.sentFrom].join("\n");
    default:
      return [m[ctx.kind], m.sentFrom].join("\n");
  }
}

/** What Messenger/Instagram buttons copy to the clipboard before opening the chat. */
export function clipboardText(code: string, url: string): string {
  return `${code} ${url}`;
}
