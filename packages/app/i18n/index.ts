import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as Localization from 'expo-localization'

// Import translation files
import en from './locales/en.json'
import es from './locales/es.json'

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
}

// Get device language using Expo's localization
const getDeviceLanguage = () => {
  const locale = Localization.locale
  // Return 'es' for Spanish, 'en' for English, default to 'en'
  return locale.startsWith('es') ? 'es' : 'en'
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: 'en',
    debug: __DEV__,
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    
    react: {
      useSuspense: false, // Disable suspense for React Native
    },
  })

export default i18n
