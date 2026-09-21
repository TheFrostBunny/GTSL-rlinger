// i18n.config.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import no from "./locales/no.json";

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    no: { translation: no },
  },
  lng: "no",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
