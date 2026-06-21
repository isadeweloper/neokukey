/* Renders a schema.org JSON-LD block. The `<` escaping prevents the JSON
   payload from breaking out of the <script> tag. */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
