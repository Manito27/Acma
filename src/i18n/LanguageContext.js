import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from './translations';

const LANGUAGE_STORAGE_KEY = 'acma-language';
const LanguageContext = createContext(null);

const getInitialLanguage = () => {
  try {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage === 'pt' || savedLanguage === 'en') return savedLanguage;
  } catch (error) {
    // Keep the site usable when browser storage is unavailable.
  }

  return window.navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'pt';
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-PT' : 'en';
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      // The current selection still applies for this visit if storage is blocked.
    }
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: (text) => (language === 'en' ? translations.en[text] || text : text),
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
