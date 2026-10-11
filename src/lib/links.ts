import { settings } from "../content/settings";
import type { Lang } from "../i18n";
import { localDigits } from "./digits";
import { buildMessage, instagramLink, mailtoLink, messengerLink, telLink, whatsappLink, type MessageContext } from "./contact";

/**
 * Every contact link a page needs, built from the settings file.
 * Instagram and email are undefined while their settings are empty; pages then leave those channels out.
 */
export function contactLinks(lang: Lang, ctx: MessageContext = { kind: "general" }) {
  const showroom = settings.showrooms[0]!;
  return {
    whatsapp: whatsappLink(settings.whatsappNumber, buildMessage(lang, ctx)),
    messenger: messengerLink(settings.messengerUsername),
    instagram: settings.instagramUsername ? instagramLink(settings.instagramUsername) : undefined,
    tel: telLink(settings.phone.e164),
    email: settings.email ? mailtoLink(settings.email) : undefined,
    directions: showroom.mapUrl,
    phoneDisplay: localDigits(settings.phone.display, lang),
    facebook: settings.social.facebook,
  };
}

export type ContactLinks = ReturnType<typeof contactLinks>;
