import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {az} from './locale/az'
import {en} from './locale/en'
import {de} from './locale/de'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      az: {
        translation: az
      },
      de: {
        translation: de
      },
    },
    lng: "az",
    fallbackLng: "az",
  });

export default i18n;