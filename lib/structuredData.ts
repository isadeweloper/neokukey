import type { QAEntry } from "@/lib/chatQA";
import { SITE_URL } from "@/lib/site";

/* schema.org Organization describing NEOKUKEY. Locale-independent (English)
   so answer engines have one canonical company record. */
export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NEOKUKEY",
    url: SITE_URL,
    description:
      "NEOKUKEY is an AI & automation studio that designs and builds AI-powered systems and automations, helping businesses move smarter, cut manual work, and deliver results without friction.",
    knowsAbout: [
      "Artificial intelligence",
      "Business process automation",
      "Data pipelines",
      "System integration",
      "AI workflows",
    ],
  };
}

/* schema.org FAQPage built from the assistant widget's Q&A for the active
   locale, so the same answers shown in the UI are machine-readable. */
export function faqPageLd(entries: QAEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((e) => ({
      "@type": "Question",
      name: e.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: e.answer,
      },
    })),
  };
}
