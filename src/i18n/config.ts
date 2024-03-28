import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enweb from './en/web.json';

export const resources = {
  en: {
    web: enweb,
  },
};

i18next.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: true,
  resources,
});
