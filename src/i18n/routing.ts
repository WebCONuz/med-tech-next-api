import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["rus", "eng", "ar"],
  defaultLocale: "eng",
  localePrefix: "as-needed",
});
