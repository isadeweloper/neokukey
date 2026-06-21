import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* AI assistant / answer-engine crawlers + major search bots we explicitly
   welcome. The wildcard rule already allows everyone; listing these makes the
   intent explicit and survives any future tightening of the "*" rule. */
const ALLOWED_BOTS = [
  // OpenAI (ChatGPT)
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Anthropic (Claude)
  "ClaudeBot",
  "Claude-User",
  "anthropic-ai",
  // Google AI / Gemini training & AI Overviews
  "Google-Extended",
  // Classic search engines
  "Googlebot",
  "Bingbot",
  "Applebot",
  "DuckDuckBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...ALLOWED_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
