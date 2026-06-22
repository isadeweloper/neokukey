"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { chatQA } from "@/lib/chatQA";
import { Send, Calendar, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  showBookCall?: boolean;
}

export default function ChatSection() {
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
              fontFamily: "var(--font-manrope), sans-serif",
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
              fontFamily: "var(--font-manrope), sans-serif",
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
                  fontFamily: "var(--font-manrope), sans-serif",
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
                      fontFamily: "var(--font-manrope), sans-serif",
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
                fontFamily: "var(--font-manrope), sans-serif",
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
              fontFamily: "var(--font-manrope), sans-serif",
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
              fontFamily: "var(--font-manrope), sans-serif",
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
