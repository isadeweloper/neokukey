import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

/* Every public route, listed once per locale with hreflang alternates so
   crawlers (and answer engines) discover all language versions. */
const PAGES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const { locales, defaultLocale } = routing;
  const lastModified = new Date();

  return PAGES.flatMap(({ path, priority }) => {
    const languages: Record<string, string> = {
      "x-default": `${SITE_URL}/${defaultLocale}${path}`,
    };
    for (const locale of locales) {
      languages[locale] = `${SITE_URL}/${locale}${path}`;
    }

    return locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages },
    }));
  });
}
