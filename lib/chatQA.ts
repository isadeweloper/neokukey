// ─── Chat Q&A dataset ────────────────────────────────────────────────────────
// Edit questions, keywords, and answers here.
// `suggested` controls which entry IDs appear as pill buttons (in order).
// `keywords` are lowercase substrings matched against the user's free-text input.

export interface QAEntry {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
}

export interface ChatLocaleData {
  suggested: string[];
  entries: QAEntry[];
  fallback: string;
}

export const chatQA: Record<string, ChatLocaleData> = {
  // ── English ────────────────────────────────────────────────────────────────
  en: {
    suggested: ["automate", "timeline", "industries", "security", "pricing"],
    entries: [
      {
        id: "automate",
        keywords: ["automat", "what do you do", "what can"],
        question: "What can NEOKUKEY automate?",
        answer:
          "We automate document processing, data pipelines, multi-step workflows, and AI-driven decisions. Most clients reduce manual work by 60–80% within the first month.",
      },
      {
        id: "timeline",
        keywords: ["timeline", "how long", "how much time", "weeks", "duration"],
        question: "How long does a project take?",
        answer:
          "A focused project typically ships in 2–4 weeks. Larger integrations take 6–10 weeks. We work in tight iterations so you see results early.",
      },
      {
        id: "industries",
        keywords: ["industr", "sector", "who do you work", "clients", "e-commerce", "logistics"],
        question: "What industries do you work with?",
        answer:
          "We've worked across professional services, e-commerce, logistics, SaaS, and finance. The common thread is repetitive knowledge work.",
      },
      {
        id: "security",
        keywords: ["secur", "privacy", "gdpr", "safe", "complian", "data protection"],
        question: "How do you handle data security?",
        answer:
          "Security is built in from day one. We follow GDPR-aligned practices, use encrypted connections, and never store sensitive client data beyond what's needed for the integration.",
      },
      {
        id: "pricing",
        keywords: ["pric", "cost", "how much", "fee", "budget", "rate"],
        question: "What's your pricing model?",
        answer:
          "We work on a fixed-scope project basis — no hourly billing surprises. After a discovery call we send a clear proposal with a defined scope and price.",
      },
    ],
    fallback:
      "Great question. For a detailed answer tailored to your situation, the best next step is a short discovery call with our team.",
  },

  // ── Russian ────────────────────────────────────────────────────────────────
  ru: {
    suggested: ["automate", "timeline", "industries", "security", "pricing"],
    entries: [
      {
        id: "automate",
        keywords: ["автомат", "что вы делаете", "что можно"],
        question: "Что может автоматизировать NEOKUKEY?",
        answer:
          "Мы автоматизируем обработку документов, потоки данных, многоэтапные рабочие процессы и решения на основе ИИ. Большинство клиентов сокращают ручной труд на 60–80% уже в первый месяц.",
      },
      {
        id: "timeline",
        keywords: ["сроки", "как долго", "сколько времени", "недель", "длительность"],
        question: "Сколько времени занимает проект?",
        answer:
          "Сфокусированный проект обычно запускается за 2–4 недели. Более крупные интеграции занимают 6–10 недель. Мы работаем короткими итерациями — результаты видны рано.",
      },
      {
        id: "industries",
        keywords: ["отрасл", "индустри", "клиент", "сектор", "логистик", "e-commerce"],
        question: "С какими отраслями вы работаете?",
        answer:
          "Мы работали с профессиональными услугами, e-commerce, логистикой, SaaS и финансами. Общий знаменатель — повторяющаяся интеллектуальная работа.",
      },
      {
        id: "security",
        keywords: ["безопасност", "конфиденциальн", "gdpr", "шифрован", "защита данных"],
        question: "Как вы обеспечиваете безопасность данных?",
        answer:
          "Безопасность встроена с первого дня. Мы следуем принципам GDPR, используем зашифрованные соединения и не храним конфиденциальные данные клиентов дольше, чем требует интеграция.",
      },
      {
        id: "pricing",
        keywords: ["цена", "стоимость", "сколько стоит", "бюджет", "тариф", "прайс"],
        question: "Как устроено ценообразование?",
        answer:
          "Мы работаем по модели фиксированного объёма — никаких почасовых сюрпризов. После discovery-звонка предоставляем чёткое предложение с определённым объёмом и стоимостью.",
      },
    ],
    fallback:
      "Хороший вопрос. Для развёрнутого ответа под вашу ситуацию лучший следующий шаг — короткий discovery-звонок с нашей командой.",
  },

  // ── German ─────────────────────────────────────────────────────────────────
  de: {
    suggested: ["automate", "timeline", "industries", "security", "pricing"],
    entries: [
      {
        id: "automate",
        keywords: ["automat", "was macht ihr", "was können sie"],
        question: "Was kann NEOKUKEY automatisieren?",
        answer:
          "Wir automatisieren Dokumentenverarbeitung, Datenpipelines, mehrstufige Workflows und KI-gestützte Entscheidungen. Die meisten Kunden reduzieren manuelle Arbeit innerhalb des ersten Monats um 60–80 %.",
      },
      {
        id: "timeline",
        keywords: ["zeitplan", "wie lange", "dauer", "wochen", "wie viel zeit"],
        question: "Wie lange dauert ein Projekt?",
        answer:
          "Ein fokussiertes Projekt wird in der Regel in 2–4 Wochen geliefert. Größere Integrationen dauern 6–10 Wochen. Wir arbeiten in kurzen Iterationen, damit Sie früh Ergebnisse sehen.",
      },
      {
        id: "industries",
        keywords: ["branche", "industrie", "klient", "sektor", "logistik", "e-commerce"],
        question: "Mit welchen Branchen arbeiten Sie?",
        answer:
          "Wir haben in professionellen Dienstleistungen, E-Commerce, Logistik, SaaS und Finanzwesen gearbeitet. Der gemeinsame Nenner ist repetitive Wissensarbeit.",
      },
      {
        id: "security",
        keywords: ["sicherh", "datenschutz", "gdpr", "verschlüssel", "dsgvo"],
        question: "Wie gehen Sie mit Datensicherheit um?",
        answer:
          "Sicherheit ist von Anfang an eingebaut. Wir folgen DSGVO-konformen Praktiken, verwenden verschlüsselte Verbindungen und speichern keine sensiblen Kundendaten über das für die Integration nötige Maß hinaus.",
      },
      {
        id: "pricing",
        keywords: ["preis", "kosten", "wie viel", "budget", "tarif", "honorar"],
        question: "Wie funktioniert Ihre Preisgestaltung?",
        answer:
          "Wir arbeiten auf Basis eines festen Projektumfangs — keine stündlichen Überraschungen. Nach einem Erstgespräch liefern wir ein klares Angebot mit definiertem Umfang und Preis.",
      },
    ],
    fallback:
      "Gute Frage. Für eine detaillierte, auf Ihre Situation zugeschnittene Antwort ist der beste nächste Schritt ein kurzes Erstgespräch mit unserem Team.",
  },

  // ── Turkish ────────────────────────────────────────────────────────────────
  tr: {
    suggested: ["automate", "timeline", "industries", "security", "pricing"],
    entries: [
      {
        id: "automate",
        keywords: ["otomat", "ne yapıyorsunuz", "ne otomatik"],
        question: "NEOKUKEY neler otomatikleştirebilir?",
        answer:
          "Belge işleme, veri boru hatları, çok adımlı iş akışları ve yapay zeka destekli kararları otomatikleştiriyoruz. Müşterilerin çoğu ilk ay içinde manuel iş yükünü %60–80 oranında azaltıyor.",
      },
      {
        id: "timeline",
        keywords: ["ne kadar sürer", "süre", "hafta", "zaman", "ne zaman"],
        question: "Bir proje ne kadar sürer?",
        answer:
          "Odaklanmış bir proje genellikle 2–4 haftada teslim edilir. Daha büyük entegrasyonlar 6–10 hafta sürer. Sonuçları erken görmeniz için kısa iterasyonlarla çalışıyoruz.",
      },
      {
        id: "industries",
        keywords: ["sektör", "endüstri", "müşteri", "hangi alan", "lojistik", "e-ticaret"],
        question: "Hangi sektörlerle çalışıyorsunuz?",
        answer:
          "Profesyonel hizmetler, e-ticaret, lojistik, SaaS ve finans alanlarında çalıştık. Ortak nokta, tekrarlayan bilgi işidir.",
      },
      {
        id: "security",
        keywords: ["güvenlik", "gizlilik", "gdpr", "şifrel", "veri koruma"],
        question: "Veri güvenliğini nasıl sağlıyorsunuz?",
        answer:
          "Güvenlik, başından itibaren yerleşik olarak tasarlanmıştır. GDPR uyumlu uygulamaları takip ediyor, şifreli bağlantılar kullanıyor ve entegrasyon için gerekenden fazla müşteri verisi saklamıyoruz.",
      },
      {
        id: "pricing",
        keywords: ["fiyat", "ücret", "ne kadar tutar", "bütçe", "maliyet", "tarife"],
        question: "Fiyatlandırma modeliniz nasıl?",
        answer:
          "Sabit kapsam proje bazında çalışıyoruz — saatlik sürpriz fatura yok. Keşif görüşmesinin ardından net kapsam ve fiyat içeren açık bir teklif sunuyoruz.",
      },
    ],
    fallback:
      "Güzel bir soru. Durumunuza özel ayrıntılı bir yanıt için en iyi adım, ekibimizle kısa bir keşif görüşmesi yapmaktır.",
  },
};
