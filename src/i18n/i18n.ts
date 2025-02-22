import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "@/i18n/languages/en";
import { es } from "@/i18n/languages/es";
import { ar } from "@/i18n/languages/ar";
import { fr } from "@/i18n/languages/fr";
import { de } from "@/i18n/languages/de";
import { ja } from "@/i18n/languages/ja";
import { pt } from "@/i18n/languages/pt";
import { ru } from "@/i18n/languages/ru";
import { hi } from "@/i18n/languages/hi";
import { zh } from "@/i18n/languages/zh";
import { id } from "@/i18n/languages/id";

const resources = {
  en,
  es,
  ar,
  fr,
  de,
  ja,
  pt,
  ru,
  hi,
  zh,
  id,
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
