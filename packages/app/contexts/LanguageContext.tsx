import React, { createContext, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface LanguageContextType {
  currentLanguage: string
  changeLanguage: (language: string) => void
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)
  const [isRTL, setIsRTL] = useState(false)

  const changeLanguage = (language: string) => {
    try {
      i18n.changeLanguage(language)
      setCurrentLanguage(language)
      setIsRTL(language === 'ar') // Add RTL support if needed in future
    } catch (error) {
      console.error('Failed to change language:', error)
    }
  }

  const value: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    isRTL,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
