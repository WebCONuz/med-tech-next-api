import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uz", "eng", "rus"],
  defaultLocale: "eng",
  localePrefix: "as-needed",
});
