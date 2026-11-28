import React from 'react';
import { useLanguage } from './LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const label = language === 'pt' ? 'Selecionar idioma' : 'Select language';

  return (
    <div className="language-switcher" role="group" aria-label={label}>
      <button type="button" aria-pressed={language === 'pt'} onClick={() => setLanguage('pt')}>PT</button>
      <span aria-hidden="true">|</span>
      <button type="button" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
    </div>
  );
};

export default LanguageSwitcher;
