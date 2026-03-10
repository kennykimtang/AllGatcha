"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getLocale, translations, type Locale, type TranslationKey } from "@/lib/i18n";

interface I18nContextValue {
  locale: Locale;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    setLocale(getLocale());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback(
    (key: TranslationKey) => translations[locale][key],
    [locale]
  );

  const value = useMemo(() => ({ locale, t }), [locale, t]);

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

const defaultEn: I18nContextValue = {
  locale: "en",
  t: (key: TranslationKey) => translations.en[key],
};

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  return ctx ?? defaultEn;
}
