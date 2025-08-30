import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize"; 
import arLang from "./locales/ar-AE/translation.json";
import enLang from "./locales/en-US/translation.json";

const resources = {
  en: enLang,
  ar: arLang
};

const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: async(callback: (param: string) => void) => {
    const locales = RNLocalize.getLocales();
    callback(locales[0].languageTag);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};


i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
