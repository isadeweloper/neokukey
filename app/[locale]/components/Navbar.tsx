"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
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

        {/* Burger toggle — visible on mobile only (see globals.css) */}
        <button
          className="nav-burger"
          aria-label={t("menu")}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            width: 34,
            height: 34,
            borderRadius: 8,
            background: "transparent",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <>
          {/* backdrop — click outside closes */}
          <div
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, top: 52, zIndex: 40 }}
          />
          {/* menu panel */}
          <div
            className="nav-mobile-menu"
            style={{
              position: "fixed",
              top: 52,
              left: 0,
              right: 0,
              zIndex: 49,
              display: "flex",
              flexDirection: "column",
              background: "var(--background)",
              borderBottom: "1px solid var(--border)",
              boxShadow: "0 8px 24px rgba(92, 61, 46, 0.08)",
              padding: "8px 16px 14px",
              animation: "navMenuDrop 0.22s ease both",
            }}
          >
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "0.95rem",
                  color: "var(--foreground)",
                  textDecoration: "none",
                  fontWeight: 500,
                  padding: "12px 4px",
                  borderBottom: "1px solid var(--border)",
                  letterSpacing: "-0.01em",
                }}
              >
                {label}
              </Link>
            ))}
            <a
              href="#book"
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 600,
                textAlign: "center",
                marginTop: 12,
                padding: "11px 16px",
                borderRadius: 8,
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              {t("bookCall")}
            </a>
          </div>
          <style>{`
            @keyframes navMenuDrop {
              from { opacity: 0; transform: translateY(-6px); }
              to   { opacity: 1; transform: translateY(0);    }
            }
            .nav-mobile-menu a:last-child { border-bottom: none !important; }
          `}</style>
        </>
      )}
    </nav>
  );
}
