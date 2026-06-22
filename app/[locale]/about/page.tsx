import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Navbar from "../components/Navbar";
import ContactPeople from "../components/ContactPeople";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/about", "about");
}

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)" }}>
      <Navbar />
      <main>
        <section
          style={{
            maxWidth: 680,
            margin: "0 auto",
            padding: "7rem 1.5rem 5rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              marginBottom: 10,
            }}
          >
            {t("label")}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              color: "var(--foreground)",
              marginBottom: "1.1rem",
            }}
          >
            {t("heading")}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontSize: "clamp(0.9rem, 1.7vw, 1rem)",
              lineHeight: 1.72,
              color: "var(--muted-foreground)",
              maxWidth: 520,
              marginBottom: "2.5rem",
              letterSpacing: "-0.01em",
            }}
          >
            {t("body")}
          </p>

          <ContactPeople label={t("peopleLabel")} />

          <p style={{ marginTop: "2.5rem" }}>
            <Link
              href="/contact"
              className="cta-link"
              style={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontSize: "0.95rem",
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              {t("cta")}
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
