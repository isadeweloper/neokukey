import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

/* og:locale wants a full xx_XX tag, our routing locales are short codes. */
const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  ru: "ru_RU",
  de: "de_DE",
  tr: "tr_TR",
};

type PageKey = "home" | "about" | "contact";

/* Builds localized, GEO-friendly metadata for one page in one locale:
   title/description (translated), canonical, hreflang alternates, Open Graph. */
export async function buildPageMetadata(
  locale: string,
  path: string,
  page: PageKey,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t(`${page}.title`);
  const description = t(`${page}.description`);

  const languages: Record<string, string> = {
    "x-default": `${SITE_URL}/${routing.defaultLocale}${path}`,
  };
  for (const l of routing.locales) {
    languages[l] = `${SITE_URL}/${l}${path}`;
  }

  const canonical = `${SITE_URL}/${locale}${path}`;

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      siteName: "NEOKUKEY",
      title,
      description,
      url: canonical,
      locale: OG_LOCALE[locale] ?? locale,
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l] ?? l),
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
