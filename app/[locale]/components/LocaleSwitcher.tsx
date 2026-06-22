"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  ru: "RU",
  de: "DE",
  tr: "TR",
};

export default function LocaleSwitcher() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = (params.locale as string) ?? routing.defaultLocale;

  const switchLocale = (locale: string) => {
    router.replace(pathname, { locale });
    setOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          fontFamily: "var(--font-manrope), sans-serif",
          fontSize: "0.76rem",
          fontWeight: 600,
          color: "var(--muted-foreground)",
          background: "transparent",
          border: "1px solid var(--border)",
          borderRadius: 6,
          padding: "4px 10px",
          cursor: "pointer",
          letterSpacing: "0.05em",
          transition: "color 0.15s, border-color 0.15s",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color =
            "var(--foreground)";
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "var(--accent)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color =
            "var(--muted-foreground)";
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "var(--border)";
        }}
        aria-label="Switch language"
      >
        {LOCALE_LABELS[currentLocale]}
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
            opacity: 0.6,
          }}
        >
          <path
            d="M1 2.5L4 5.5L7 2.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <>
          {/* backdrop */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 40,
            }}
            onClick={() => setOpen(false)}
          />
          {/* dropdown */}
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              right: 0,
              zIndex: 50,
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(92,61,46,0.1)",
              minWidth: 64,
            }}
          >
            {routing.locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLocale(locale)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "7px 14px",
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontSize: "0.76rem",
                  fontWeight: locale === currentLocale ? 600 : 400,
                  color:
                    locale === currentLocale
                      ? "var(--foreground)"
                      : "var(--muted-foreground)",
                  background:
                    locale === currentLocale
                      ? "var(--secondary)"
                      : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  letterSpacing: "0.05em",
                  transition: "background 0.12s, color 0.12s",
                }}
                onMouseEnter={(e) => {
                  if (locale !== currentLocale) {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "var(--secondary)";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "var(--foreground)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (locale !== currentLocale) {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "var(--muted-foreground)";
                  }
                }}
              >
                {LOCALE_LABELS[locale]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
