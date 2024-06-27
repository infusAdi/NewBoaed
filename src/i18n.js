import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/trans.json";
import translationES from "./locales/es/trans.json";
import i18n from "i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "en",
    fallbackLng: localStorage.getItem("lang") || "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: translationEN,
        // translation:{
        //     login : "Login to Account"
        // }
      },
      es: {
        translation: translationES,
        // translation:{
        //     login : "Melden Sie sich bei Ihrem Konto an"
        // }
      },
    },
  });
export default i18n;
