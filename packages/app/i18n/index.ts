import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLocales } from 'expo-localization'

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

// Get device language using expo-localization
const getDeviceLanguage = () => {
  try {
    const locales = getLocales()
    const deviceLanguage = locales[0]?.languageCode || 'en'
    // Return 'es' for Spanish, 'en' for English, default to 'en'
    return deviceLanguage.startsWith('es') ? 'es' : 'en'
  } catch (error) {
    console.warn('Failed to get device language:', error)
    return 'en'
  }
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
