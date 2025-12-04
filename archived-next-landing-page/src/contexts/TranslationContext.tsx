'use client'

/**
 * TranslationContext - Global Translation State Management
 *
 * Provides:
 * - Current language state (from existing LanguageContext)
 * - Translation cache (in-memory)
 * - Language switching
 * - Auto-fetching from API
 */

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { useLanguage } from './LanguageContext'

const APP_ID = 'dev-simjs'

export interface Language {
  code: string
  label: string
  direction: 'ltr' | 'rtl'
}

interface TranslationContextValue {
  currentLang: string
  setCurrentLang: (lang: string) => void
  availableLanguages: Language[]
  translations: Record<string, Record<string, string>> // cacheKey -> { key: translation }
  loading: boolean
  error: string | null
  fetchTranslations: (lang: string, namespace: string, keys?: string[]) => Promise<void>
}

const TranslationContext = createContext<TranslationContextValue | null>(null)

export function useTranslationContext() {
  return useContext(TranslationContext)
}

interface TranslationProviderProps {
  children: React.ReactNode
}

export function TranslationProvider({
  children
}: TranslationProviderProps) {
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pendingFetches, setPendingFetches] = useState<Set<string>>(new Set())

  // Use existing LanguageContext for language state
  const langContext = useLanguage()
  const { currentLanguage, setLanguage, availableLanguages: langContextLanguages } = langContext

  // Convert LanguageContext format to TranslationContext format
  const availableLanguages: Language[] = useMemo(() =>
    langContextLanguages.map(lang => ({
      code: lang.code,
      label: lang.name,
      direction: 'ltr' as const
    }))
  , [langContextLanguages])

  // Fetch translations for a specific language/namespace
  const fetchTranslations = useCallback(async (lang: string, namespace: string, keys: string[] = []) => {
    const cacheKey = `${lang}:${namespace}`

    // Skip if already cached
    if (translations[cacheKey]) {
      return
    }

    // Skip if already fetching
    if (pendingFetches.has(cacheKey)) {
      return
    }

    // If no keys provided, initialize with empty cache to prevent infinite retries
    if (keys.length === 0) {
      setTranslations(prev => ({
        ...prev,
        [cacheKey]: {}
      }))
      return
    }

    // Mark as pending
    setPendingFetches(prev => new Set(prev).add(cacheKey))
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/translations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appId: APP_ID,
          lang,
          namespace,
          keys
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to fetch translations: ${response.status}`)
      }

      const data = await response.json()

      // Update cache
      setTranslations(prev => ({
        ...prev,
        [cacheKey]: data.translations || {}
      }))

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch translations'
      console.error(`[TranslationProvider] Error fetching ${cacheKey}:`, err)
      setError(errorMessage)

      // Set empty cache on error to prevent infinite retries
      setTranslations(prev => ({
        ...prev,
        [cacheKey]: {}
      }))
    } finally {
      setLoading(false)
      setPendingFetches(prev => {
        const next = new Set(prev)
        next.delete(cacheKey)
        return next
      })
    }
  }, [translations, pendingFetches])

  const value = useMemo<TranslationContextValue>(() => ({
    currentLang: currentLanguage,
    setCurrentLang: setLanguage,
    availableLanguages,
    translations,
    loading,
    error,
    fetchTranslations
  }), [currentLanguage, setLanguage, availableLanguages, translations, loading, error, fetchTranslations])

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  )
}
