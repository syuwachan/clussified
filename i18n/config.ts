// i18n/config.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(initReactI18next)
  .use(LanguageDetector) 
  .init({
    fallbackLng: 'en', 
    returnEmptyString: false, 
    resources: { 
      en: {
        translation: require('./locales/en.json')
      },
      ja: {
        translation: require('./locales/ja.json')
      },
      zh: {
        translation: require('./locales/zh.json')
      },
      ko: {
        translation: require('./locales/ko.json')
      }
    },
    interpolation: {
      escapeValue: false
    },
    react: {
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'span']
    }
  })

export default i18n