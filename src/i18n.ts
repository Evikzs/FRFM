import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import enCommon from '@/locales/en/common'
import enCorporate from '@/locales/en/corporate'
import roCommon from '@/locales/ro/common'
import roCorporate from '@/locales/ro/corporate'

// Same i18next setup as the main FRFM app: EN fallback, EN/RO, and the choice
// saved in localStorage under "i18nextLng". The language switcher therefore
// shares its state with the rest of the site on the same domain.
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon, corporate: enCorporate },
      ro: { common: roCommon, corporate: roCorporate },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ro'],
    defaultNS: 'common',
    ns: ['common', 'corporate'],
    detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
    interpolation: { escapeValue: false },
  })

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
})
document.documentElement.lang = i18n.resolvedLanguage ?? i18n.language

export default i18n
