import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import enTranslations from '../i18n/locales/en/translation.json';
import jaTranslations from '../i18n/locales/ja/translation.json';
import zhTranslations from '../i18n/locales/zh/translation.json';
import koTranslations from '../i18n/locales/ko/translation.json';

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		ns: ['translations'],
		defaultNS: 'translations',
		debug: true,
		resources: {
			en: { translations: enTranslations },
			ja: { translations: jaTranslations },
			zh: { translations: zhTranslations },
			ko: { translations: koTranslations }
		},
		interpolation: {
			escapeValue: false,
		}
	});

export default i18n;