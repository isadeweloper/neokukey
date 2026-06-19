/* Shared list of NEOKUKEY contacts, shown on the About and Contact pages. */

const PEOPLE = [
  "Братаниевич Минихан Бурмалдеевич",
  "Глеб Сергеевич Ерунда",
];

export default function ContactPeople({ label }: { label: string }) {
  return (
    <div>
      <p
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--muted-foreground)",
          marginBottom: 14,
        }}
      >
        {label}
      </p>
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
                fontFamily: "'Manrope', sans-serif",
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
