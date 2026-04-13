"use client";

import React from "react";
import { useLanguage } from "./i18n";

export type WithLanguageProps = {
  lang: ReturnType<typeof useLanguage>["lang"];
  setLang: ReturnType<typeof useLanguage>["setLang"];
  t: ReturnType<typeof useLanguage>["t"];
};

export function withLanguage<P extends WithLanguageProps>(
  Component: React.ComponentType<P>,
) {
  const Wrapped = (props: Omit<P, keyof WithLanguageProps>) => {
    const { lang, setLang, t } = useLanguage();
    return (
      <Component
        {...(props as P)}
        lang={lang}
        setLang={setLang}
        t={t}
      />
    );
  };

  Wrapped.displayName = `withLanguage(${Component.displayName ?? Component.name ?? "Component"})`;
  return Wrapped;
}

