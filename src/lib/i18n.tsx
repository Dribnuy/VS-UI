"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Lang = "uk" | "en";

export type Dictionary = Record<string, { uk: string; en: string }>;

const dictionary: Dictionary = {
  perfumes: { uk: "Парфуми", en: "Perfumes" },
  sprays: { uk: "Спреї", en: "Sprays" },
  lotions: { uk: "Лосьйони", en: "Lotions" },
  language: { uk: "Мова", en: "Language" },
  homeTitle: { uk: "VS Aroma Shop", en: "VS Aroma Shop" },
};

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: keyof typeof dictionary) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "vs-aroma.lang";

export function LanguageProvider({
  initialLang = "uk",
  children,
}: {
  initialLang?: Lang;
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "uk" || saved === "en") setLangState(saved);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const t = useCallback(
    (key: keyof typeof dictionary) => dictionary[key][lang],
    [lang],
  );

  const value = useMemo<I18nContextValue>(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

