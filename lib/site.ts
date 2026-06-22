/* Canonical production origin, reused by robots/sitemap/metadata.
   Override with NEXT_PUBLIC_SITE_URL when a custom domain is set up. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://neokukey-59o8.vercel.app"
).replace(/\/$/, "");
