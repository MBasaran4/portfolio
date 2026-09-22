import { Locale, Dictionary } from "./types";
import { trDictionary } from "./dictionaries/tr";
import { enDictionary } from "./dictionaries/en";

export const locales: Locale[] = ["tr", "en"];
export const defaultLocale: Locale = "tr";

const dictionaries: Record<Locale, Dictionary> = {
  tr: trDictionary,
  en: enDictionary,
};

export function getDictionary(locale: string | undefined): Dictionary {
  if (locale && (locale === "en" || locale === "tr")) {
    return dictionaries[locale];
  }
  return dictionaries[defaultLocale];
}

export function isLocale(val: string): val is Locale {
  return val === "tr" || val === "en";
}

export * from "./types";
