"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Navbar() {
  const t = useTranslations("nav");
  const navLinks = [
    { label: t("services"), href: "/#services" },
    { label: t("about"), href: "/about" },
    { label: t("contact"), href: "/contact" },
  ];

  return (
    <nav
      className="nav-bar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        height: 52,
        background: "rgba(245, 240, 234, 0.85)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "0.8rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--foreground)",
          textDecoration: "none",
        }}
      >
        NEOKUKEY
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {navLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.82rem",
              color: "var(--muted-foreground)",
              textDecoration: "none",
              fontWeight: 400,
              transition: "color 0.15s",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "var(--foreground)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color =
                "var(--muted-foreground)")
            }
          >
            {label}
          </Link>
        ))}
        </div>
        <a
          href="#book"
          className="nav-book-btn"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 600,
            padding: "6px 16px",
            borderRadius: 8,
            background: "var(--primary)",
            color: "var(--primary-foreground)",
            textDecoration: "none",
            transition: "opacity 0.18s",
            letterSpacing: "-0.01em",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
          }
        >
          {t("bookCall")}
        </a>
        <LocaleSwitcher />
      </div>
    </nav>
  );
}
