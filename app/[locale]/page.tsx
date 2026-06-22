import { useTranslations } from "next-intl";
import { Zap, GitBranch, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { chatQA } from "@/lib/chatQA";
import Navbar from "./components/Navbar";
import ChatSection from "./components/ChatSection";
import JsonLd from "./components/JsonLd";
import { organizationLd, faqPageLd } from "@/lib/structuredData";

const CARD_ICONS: LucideIcon[] = [Zap, GitBranch, Shield];
const CARD_KEYS = ["automation", "integration", "reliability"] as const;
const STAT_VALUES = ["60–80%", "2–4 wks", "15–40h"];
const STAT_KEYS = ["manualWork", "deployment", "hours"] as const;

/* ── Hero ────────────────────────────────────────────────── */

function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      className="hero-section"
      style={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "4.5rem",
        paddingBottom: "2rem",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
      }}
    >
      <div style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "var(--font-caveat), cursive",
            fontSize: "clamp(2.6rem, 6vw, 4.2rem)",
            fontWeight: 500,
            letterSpacing: "0",
            lineHeight: 1.12,
            color: "var(--foreground)",
            marginBottom: "1.1rem",
          }}
        >
          {t("headingMain")}{" "}
          <span style={{ fontWeight: 700, color: "var(--accent)" }}>
            {t("headingAccent")}
          </span>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-manrope), sans-serif",
            fontSize: "clamp(0.88rem, 1.7vw, 1rem)",
            fontWeight: 400,
            lineHeight: 1.72,
            color: "var(--muted-foreground)",
            maxWidth: 400,
            margin: "0 auto 1.4rem",
            letterSpacing: "-0.01em",
          }}
        >
          {t("body")}
        </p>

        <p
          style={{
            fontFamily: "var(--font-manrope), sans-serif",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
            opacity: 0.65,
          }}
        >
          NEOKUKEY
        </p>
      </div>
    </section>
  );
}

/* ── Services / Experience ───────────────────────────────── */

function ExperienceSection() {
  const t = useTranslations("services");

  const cards = CARD_KEYS.map((key, i) => ({
    Icon: CARD_ICONS[i],
    title: t(`cards.${key}.title`),
    description: t(`cards.${key}.description`),
  }));

  const stats = STAT_KEYS.map((key, i) => ({
    value: STAT_VALUES[i],
    label: t(`stats.${key}`),
  }));

  return (
    <section
      id="services"
      className="services-section"
      style={{
        padding: "3.5rem 1.5rem 5rem",
        borderTop: "1px solid var(--border)",
        marginTop: "2.5rem",
      }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
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
          <h2
            style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontSize: "clamp(1.4rem, 2.8vw, 1.8rem)",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              color: "var(--foreground)",
              lineHeight: 1.25,
              maxWidth: 440,
            }}
          >
            {t("headingMain")}{" "}
            <span style={{ fontWeight: 500 }}>{t("headingAccent")}</span>
          </h2>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 10,
            marginBottom: 24,
          }}
        >
          {cards.map(({ Icon, title, description }) => (
            <div key={title} className="service-card">
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 9,
                  background: "var(--secondary)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 13,
                }}
              >
                <Icon size={14} color="var(--accent)" strokeWidth={1.8} />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--foreground)",
                  marginBottom: 5,
                  lineHeight: 1.35,
                  letterSpacing: "-0.01em",
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontSize: "0.815rem",
                  color: "var(--muted-foreground)",
                  lineHeight: 1.62,
                  fontWeight: 400,
                  letterSpacing: "-0.005em",
                }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 13,
            overflow: "hidden",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={i < stats.length - 1 ? "stats-item" : "stats-item-last"}
              style={{
                padding: "20px 14px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  color: "var(--foreground)",
                  lineHeight: 1.1,
                  marginBottom: 4,
                  letterSpacing: "-0.03em",
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontSize: "0.72rem",
                  color: "var(--muted-foreground)",
                  lineHeight: 1.4,
                  letterSpacing: "-0.005em",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Page (Server Component) ─────────────────────────────── */

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeQA = chatQA[locale] ?? chatQA.en;

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)" }}>
      <JsonLd data={organizationLd()} />
      <JsonLd data={faqPageLd(localeQA.entries)} />
      <Navbar />
      <main>
        <HeroSection />
        <ChatSection />
        <ExperienceSection />
      </main>
    </div>
  );
}
