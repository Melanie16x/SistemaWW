// i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationES from './locales/es/translation.json'; // Archivo de traducciones en español

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: translationES
      }
    },
    lng: "es",
    fallbackLng: "es",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
