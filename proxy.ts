import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export function proxy(request: Parameters<typeof handleI18nRouting>[0]) {
  return handleI18nRouting(request);
}

export const config = {
  // Exclude root metadata routes (icon, apple-icon) so the i18n proxy doesn't
  // redirect them to a locale prefix. favicon.ico and *.xml/*.txt already match
  // the dot rule.
  matcher: ["/((?!_next|api|favicon\\.ico|icon|apple-icon|.*\\..*).*)"],
};
