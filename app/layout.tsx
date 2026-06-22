import type { Metadata } from "next";
import { Manrope, Caveat } from "next/font/google";
import { headers } from "next/headers";
import { SITE_URL } from "@/lib/site";
import { SITE_NAME, OG_BASE, TWITTER_BASE } from "@/lib/metadata";
import Preloader from "./components/Preloader";

/* Self-hosted via next/font — no external request, no layout shift (FOUT).
   Both are variable fonts, so no weight list is needed. */
const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});
const caveat = Caveat({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-caveat",
  display: "swap",
});

/* Site-wide base metadata. The localized layout (app/[locale]/layout) owns the
   "%s | NEOKUKEY" title template and per-locale titles — the home page is a
   Client Component, so its title can't live in a page and the [locale] layout
   is the effective root for content titles. Here we set the shared defaults
   that every route inherits unless it overrides them. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} — AI & Automation Studio`,
  openGraph: { ...OG_BASE },
  twitter: { ...TWITTER_BASE },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const locale = headersList.get("x-next-intl-locale") ?? "en";

  return (
    <html lang={locale} className={`${manrope.variable} ${caveat.variable}`}>
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
