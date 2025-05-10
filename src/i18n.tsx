import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from '../i18n/locales/en/translation.json';
import jaTranslations from '../i18n/locales/ja/translation.json';
import zhTranslations from '../i18n/locales/zh/translation.json';
import koTranslations from '../i18n/locales/ko/translation.json';

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		ns: ['translations'],
		defaultNS: 'translations',
		debug: process.env.NODE_ENV === 'development',
		resources: {
			en: { translations: enTranslations },
			ja: { translations: jaTranslations },
			zh: { translations: zhTranslations },
			ko: { translations: koTranslations }
		},
		interpolation: {
			escapeValue: false,
		},
		react: {
			useSuspense: false
		}
	});

export default i18n;