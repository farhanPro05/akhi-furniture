import { settings } from "../content/settings";
import type { Lang } from "../i18n";
import { localDigits } from "./digits";
import { buildMessage, instagramLink, mailtoLink, messengerLink, telLink, whatsappLink, type MessageContext } from "./contact";

/** Every contact link a page needs, built from the settings file. */
export function contactLinks(lang: Lang, ctx: MessageContext = { kind: "general" }) {
  const showroom = settings.showrooms[0]!;
  return {
    whatsapp: whatsappLink(settings.whatsappNumber, buildMessage(lang, ctx)),
    messenger: messengerLink(settings.messengerUsername),
    instagram: instagramLink(settings.instagramUsername),
    tel: telLink(settings.phone.e164),
    email: mailtoLink(settings.email),
    directions: showroom.mapUrl,
    phoneDisplay: localDigits(settings.phone.display, lang),
    facebook: settings.social.facebook,
    youtube: settings.social.youtube,
  };
}

export type ContactLinks = ReturnType<typeof contactLinks>;
