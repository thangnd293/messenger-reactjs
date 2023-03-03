import dayjs from 'dayjs';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import locales from '@/locales';
import { DEFAULT_LANGUAGE_KEY } from '../constants/i18n';

dayjs.locale(DEFAULT_LANGUAGE_KEY);

i18n
   .use(Backend)
   .use(LanguageDetector)
   .use(initReactI18next)
   .init({
      debug: false,
      fallbackLng: DEFAULT_LANGUAGE_KEY,
      interpolation: {
         escapeValue: false,
      },
      resources: locales,
   });

export default i18n;
