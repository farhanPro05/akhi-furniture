/** JSON-LD builders (Master Plan §14). No Product markup: nothing is sold here. */
import { settings } from "../content/settings";
import { dict, type Lang } from "../i18n";
import { absoluteUrl, localUrl } from "./urls";

export function furnitureStore(lang: Lang) {
  const showroom = settings.showrooms[0]!;
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "@id": `${settings.siteUrl}/#store`,
    name: settings.brand[lang],
    alternateName: settings.brand[lang === "en" ? "bn" : "en"],
    url: absoluteUrl(localUrl(lang)),
    logo: absoluteUrl("/icon-512.png"),
    image: absoluteUrl("/og-default.jpg"),
    telephone: settings.phone.e164,
    ...(settings.email ? { email: settings.email } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: showroom.streetAddress,
      addressLocality: showroom.locality,
      postalCode: showroom.postalCode,
      addressCountry: showroom.country,
    },
    hasMap: showroom.mapUrl,
    ...(showroom.hours
      ? {
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: showroom.hours.days,
            opens: showroom.hours.opens,
            closes: showroom.hours.closes,
          },
        }
      : {}),
    sameAs: [settings.social.facebook, ...(settings.instagramUsername ? [`https://www.instagram.com/${settings.instagramUsername}/`] : [])],
  };
}

export function website(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.brand[lang],
    url: absoluteUrl(localUrl(lang)),
    inLanguage: lang,
    publisher: { "@id": `${settings.siteUrl}/#store` },
  };
}

export type Crumb = { label: string; href: string };

export function breadcrumbList(lang: Lang, crumbs: Crumb[]) {
  const home = { label: dict(lang).nav.home, href: localUrl(lang) };
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [home, ...crumbs].map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: absoluteUrl(c.href) })),
  };
}

export function faqPage(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
}
