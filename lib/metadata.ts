import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

export const SITE_NAME = "NEOKUKEY";

/* Shared base for the document title and nested OG/Twitter objects.
   Next.js does NOT deep-merge `openGraph`/`twitter` across segments — a child
   that sets them replaces the parent's — so we spread these bases everywhere
   to keep one source of truth. */
export const TITLE_TEMPLATE = `%s | ${SITE_NAME}`;
export const OG_BASE = { siteName: SITE_NAME, type: "website" as const };
export const TWITTER_BASE = { card: "summary_large_image" as const };

/* og:locale wants a full xx_XX tag, our routing locales are short codes. */
const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  ru: "ru_RU",
  de: "de_DE",
  tr: "tr_TR",
};

type PageKey = "home" | "about" | "contact";

/* Builds localized metadata for one page in one locale: title/description
   (translated), self-canonical, hreflang alternates, Open Graph & Twitter.
   The home title is brand-led (absolute, no template); sub-pages use the
   short label and let the root layout's "%s | NEOKUKEY" template append it. */
export async function buildPageMetadata(
  locale: string,
  path: string,
  page: PageKey,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const label = t(`${page}.title`);
  const description = t(`${page}.description`);

  const isHome = page === "home";
  const socialTitle = isHome ? label : `${label} | ${SITE_NAME}`;

  const languages: Record<string, string> = {
    "x-default": `${SITE_URL}/${routing.defaultLocale}${path}`,
  };
  for (const l of routing.locales) {
    languages[l] = `${SITE_URL}/${l}${path}`;
  }

  const canonical = `${SITE_URL}/${locale}${path}`;

  return {
    // Home (the [locale] layout) sets `default` + `template`: `default` is the
    // brand-led home title, `template` is inherited by child pages (about/
    // contact) so their short labels render as "Label | NEOKUKEY".
    title: isHome ? { default: label, template: TITLE_TEMPLATE } : label,
    description,
    alternates: { canonical, languages },
    openGraph: {
      ...OG_BASE,
      title: socialTitle,
      description,
      url: canonical,
      locale: OG_LOCALE[locale] ?? locale,
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l] ?? l),
    },
    twitter: {
      ...TWITTER_BASE,
      title: socialTitle,
      description,
    },
  };
}
