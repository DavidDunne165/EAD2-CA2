import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './Translations/en.json';
import es from './Translations/es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
