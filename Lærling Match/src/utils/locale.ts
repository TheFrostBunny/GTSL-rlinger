export type Locale = "en-GB" | "nb-NO";

const webBrowserLocaleMap: Record<Locale, { pattern: RegExp }> = {
  "en-GB": { pattern: /^en(?:-|$)/i },
  "nb-NO": { pattern: /^(?:nb|no|nn)(?:-|$)/i },
};
export const locales = ["en-GB", "nb-NO"] as const;

export const getWebBrowserLocale = (): Locale => {
  const browserLocales = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  const matchingLocale = browserLocales.find((browserLocale) =>
    (Object.keys(webBrowserLocaleMap) as Locale[]).some((locale) =>
      webBrowserLocaleMap[locale].pattern.test(browserLocale),
    ),
  );

  if (!matchingLocale) {
    return "nb-NO";
  }

  return matchingLocale.toLowerCase().startsWith("en")
    ? "en-GB"
    : "nb-NO";
};