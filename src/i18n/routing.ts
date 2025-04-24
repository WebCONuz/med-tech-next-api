import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "en", "ar"],
  defaultLocale: "ru",
  localePrefix: "as-needed",
});
