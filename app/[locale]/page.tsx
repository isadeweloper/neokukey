"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { chatQA } from "@/lib/chatQA";
import { Send, Calendar, Sparkles, Zap, GitBranch, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Navbar from "./components/Navbar";
import JsonLd from "./components/JsonLd";
import { organizationLd, faqPageLd } from "@/lib/structuredData";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  showBookCall?: boolean;
}

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
            fontFamily: "'Caveat', cursive",
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
            fontFamily: "'Manrope', sans-serif",
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
            fontFamily: "'Manrope', sans-serif",
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

/* ── Chat ────────────────────────────────────────────────── */

function ChatSection() {
  const t = useTranslations("chat");

  const [messages, setMessages] = useState<Message[]>(() => [
    { id: "0", role: "assistant", content: t("initialMessage") },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!hasSentMessage) return;
    const el = messagesRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, hasSentMessage]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 80) + "px";
  }, [input]);

  const locale = useLocale();
  const localeQA = chatQA[locale] ?? chatQA["en"];

  const getResponse = (text: string): { content: string; showBookCall?: boolean } => {
    const lower = text.toLowerCase();
    for (const entry of localeQA.entries) {
      if (text === entry.question) return { content: entry.answer };
    }
    for (const entry of localeQA.entries) {
      if (entry.keywords.some((kw) => lower.includes(kw))) {
        return { content: entry.answer };
      }
    }
    return { content: localeQA.fallback, showBookCall: true };
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setHasSentMessage(true);
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: text.trim() },
    ]);
    setInput("");
    setTimeout(() => setIsTyping(true), 600);
    setTimeout(() => {
      setIsTyping(false);
      const response = getResponse(text);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.content,
          showBookCall: response.showBookCall,
        },
      ]);
    }, 1700);
  };

  const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
  const DURATION = "0.55s";

  const suggested = localeQA.entries
    .filter((e) => localeQA.suggested.includes(e.id))
    .sort((a, b) => localeQA.suggested.indexOf(a.id) - localeQA.suggested.indexOf(b.id));

  return (
    <section
      className="chat-section"
      style={{
        padding: "0 1.5rem 2rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className="chat-widget"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: hovered ? "95%" : "70%",
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: hovered
            ? "0 8px 52px rgba(92, 61, 46, 0.13)"
            : "0 2px 16px rgba(92, 61, 46, 0.05)",
          transition: `width ${DURATION} ${EASE}, box-shadow ${DURATION} ease`,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 18px",
            borderBottom: "1px solid var(--border)",
            background: "var(--secondary)",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Sparkles size={13} color="var(--primary-foreground)" />
          </div>
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "var(--foreground)",
              flex: 1,
              letterSpacing: "-0.01em",
            }}
          >
            {t("title")}
          </p>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.68rem",
              color: "var(--muted-foreground)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#7cb87c",
                display: "inline-block",
              }}
            />
            {t("online")}
          </span>
        </div>

        {/* Messages */}
        <div
          ref={messagesRef}
          className="chat-messages"
          role="log"
          aria-live="polite"
          aria-label={t("title")}
          style={{
            padding: "16px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            overflowY: "auto",
            height: hovered ? 420 : 250,
            transition: `height ${DURATION} ${EASE}`,
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                justifyContent:
                  msg.role === "user" ? "flex-end" : "flex-start",
                animation: "fadeUp 0.28s ease both",
              }}
            >
              <div
                style={{
                  maxWidth: "78%",
                  padding: "9px 13px",
                  borderRadius:
                    msg.role === "user"
                      ? "13px 13px 3px 13px"
                      : "13px 13px 13px 3px",
                  background:
                    msg.role === "user"
                      ? "var(--primary)"
                      : "var(--secondary)",
                  color:
                    msg.role === "user"
                      ? "var(--primary-foreground)"
                      : "var(--foreground)",
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "0.855rem",
                  lineHeight: 1.62,
                  fontWeight: 400,
                  letterSpacing: "-0.008em",
                }}
              >
                {msg.content}
                {msg.showBookCall && (
                  <a
                    href="#book"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      marginTop: 10,
                      padding: "6px 12px",
                      borderRadius: 7,
                      background: "var(--primary)",
                      color: "var(--primary-foreground)",
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      letterSpacing: "-0.005em",
                    }}
                  >
                    <Calendar size={11} />
                    {t("bookCall")}
                  </a>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: "flex" }}>
              <div
                style={{
                  padding: "9px 14px",
                  borderRadius: "13px 13px 13px 3px",
                  background: "var(--secondary)",
                  display: "flex",
                  gap: 4,
                  alignItems: "center",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "var(--muted-foreground)",
                      display: "inline-block",
                      animation: `typingDot 1s ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Suggested pills */}
        <div
          className="chat-pills"
          style={{
            padding: "10px 18px",
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            borderTop: "1px solid var(--border)",
          }}
        >
          {suggested.map((entry) => (
            <button
              key={entry.id}
              onClick={() => sendMessage(entry.question)}
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.72rem",
                color: "var(--muted-foreground)",
                background: "transparent",
                border: "1px solid var(--border)",
                borderRadius: 999,
                padding: "3px 11px",
                cursor: "pointer",
                transition: "color 0.15s, border-color 0.15s",
                fontWeight: 400,
                letterSpacing: "-0.005em",
              }}
              onMouseEnter={(e) => {
                const el = e.target as HTMLButtonElement;
                el.style.color = "var(--foreground)";
                el.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                const el = e.target as HTMLButtonElement;
                el.style.color = "var(--muted-foreground)";
                el.style.borderColor = "var(--border)";
              }}
            >
              {entry.question}
            </button>
          ))}
        </div>

        {/* Input row */}
        <div
          className="chat-input-row"
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 8,
            padding: "12px 18px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            rows={1}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder={t("placeholder")}
            aria-label={t("placeholder")}
            style={{
              flex: 1,
              background: "var(--input-background)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "8px 12px",
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.845rem",
              color: "var(--foreground)",
              outline: "none",
              transition: "border-color 0.2s, box-shadow 0.2s",
              letterSpacing: "-0.008em",
              resize: "none",
              overflow: "hidden",
              lineHeight: "1.5",
              display: "block",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--accent)";
              e.target.style.boxShadow = "0 0 0 3px rgba(122, 85, 69, 0.14)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--border)";
              e.target.style.boxShadow = "none";
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            aria-label={t("send")}
            disabled={!input.trim()}
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: input.trim() ? "var(--primary)" : "var(--muted)",
              border: "none",
              cursor: input.trim() ? "pointer" : "default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
              flexShrink: 0,
            }}
          >
            <Send
              size={13}
              color={
                input.trim()
                  ? "var(--primary-foreground)"
                  : "var(--muted-foreground)"
              }
            />
          </button>
          <a
            href="#book"
            className="chat-book-btn"
            aria-label={t("bookCall")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "8px 14px",
              borderRadius: 8,
              background: "var(--accent)",
              color: "var(--accent-foreground)",
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.76rem",
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "opacity 0.18s",
              flexShrink: 0,
              letterSpacing: "-0.005em",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.82")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
            }
          >
            <Calendar size={12} />
            {t("bookCall")}
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(7px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes typingDot {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1;   }
        }
      `}</style>
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
              fontFamily: "'Manrope', sans-serif",
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
              fontFamily: "'Manrope', sans-serif",
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
            <div
              key={title}
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 13,
                padding: "20px",
                cursor: "default",
                transition: "transform 0.18s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-2px)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.transform = "none")
              }
            >
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
                  fontFamily: "'Manrope', sans-serif",
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
                  fontFamily: "'Manrope', sans-serif",
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
                  fontFamily: "'Manrope', sans-serif",
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
                  fontFamily: "'Manrope', sans-serif",
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

/* ── Page ────────────────────────────────────────────────── */

export default function Page() {
  const locale = useLocale();
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
