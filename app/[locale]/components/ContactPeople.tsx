/* Shared list of NEOKUKEY contacts, shown on the About and Contact pages. */

export const PEOPLE = [
  "Братаниевич Минихан Бурмалдеевич",
  "Глеб Сергеевич Ерунда",
];

export default function ContactPeople({ label }: { label: string }) {
  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-manrope), sans-serif",
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--muted-foreground)",
          marginBottom: 14,
        }}
      >
        {label}
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 10,
        }}
      >
        {PEOPLE.map((name) => (
          <div
            key={name}
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 13,
              padding: "18px 20px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "var(--foreground)",
                lineHeight: 1.4,
                letterSpacing: "-0.01em",
              }}
            >
              {name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
