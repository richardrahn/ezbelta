'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'es' | 'fr' | 'de' | 'no' | 'pt-BR'

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (lang: Language) => void
  availableLanguages: { code: Language; name: string }[]
  isHydrated: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const availableLanguages = [
  { code: 'en' as Language, name: 'English' },
  { code: 'es' as Language, name: 'Español' },
  { code: 'fr' as Language, name: 'Français' },
  { code: 'de' as Language, name: 'Deutsch' },
  { code: 'no' as Language, name: 'Norsk' },
  { code: 'pt-BR' as Language, name: 'Português (Brasil)' }
]

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en')
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Load saved language from localStorage
    setIsHydrated(true)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('docs-language') as Language
      if (saved && availableLanguages.some(lang => lang.code === saved)) {
        setCurrentLanguage(saved)
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('docs-language', lang)
    }
  }

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      availableLanguages,
      isHydrated
    }}>
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