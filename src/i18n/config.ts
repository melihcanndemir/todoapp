import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import trTranslations from './locales/tr.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      tr: {
        translation: trTranslations
      }
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;