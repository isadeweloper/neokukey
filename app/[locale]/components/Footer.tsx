import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PEOPLE } from "./ContactPeople";

export default function Footer() {
  const t = useTranslations("footer");
  const navLinks = [
    { label: t("home"), href: "/" },
    { label: t("about"), href: "/about" },
    { label: t("contact"), href: "/contact" },
  ];

  const colTitle = {
    fontFamily: "var(--font-manrope), sans-serif",
    fontSize: "0.68rem",
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase" as const,
    color: "var(--muted-foreground)",
    marginBottom: 14,
  };

  return (
    <footer
      className="site-footer"
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--secondary)",
        padding: "3rem 1.5rem 2rem",
      }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div
          className="footer-cols"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 32,
          }}
        >
          {/* Brand */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--foreground)",
              }}
            >
              NEOKUKEY
            </span>
            <p
              style={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontSize: "0.82rem",
                color: "var(--muted-foreground)",
                lineHeight: 1.6,
                marginTop: 10,
                maxWidth: 220,
                letterSpacing: "-0.005em",
              }}
            >
              {t("tagline")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p style={colTitle}>{t("navTitle")}</p>
            <nav style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="footer-link"
                  style={{
                    fontFamily: "var(--font-manrope), sans-serif",
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    fontWeight: 400,
                    transition: "color 0.15s",
                    letterSpacing: "-0.005em",
                    width: "fit-content",
                  }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <p style={colTitle}>{t("contactsTitle")}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {PEOPLE.map((name) => (
                <span
                  key={name}
                  style={{
                    fontFamily: "var(--font-manrope), sans-serif",
                    fontSize: "0.85rem",
                    color: "var(--foreground)",
                    lineHeight: 1.5,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: 36,
            paddingTop: 18,
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontSize: "0.76rem",
              color: "var(--muted-foreground)",
              letterSpacing: "-0.005em",
            }}
          >
            © 2026 NEOKUKEY
          </span>
          <span
            style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontSize: "0.76rem",
              color: "var(--muted-foreground)",
              letterSpacing: "-0.005em",
            }}
          >
            {t("rights")}
          </span>
        </div>
      </div>
    </footer>
  );
}
