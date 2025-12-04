'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

type TranslationData = Record<string, any>

/**
 * Hook for API-based translations with auto-translation via Claude AI
 * Falls back to static JSON files if API is not available
 */
export function useTranslations(namespace: string = 'common') {
  const { currentLanguage } = useLanguage()
  const [translations, setTranslations] = useState<TranslationData>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true)
      try {
        // Try API-based translations first
        const apiResponse = await fetch('/api/translations/all', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            appId: 'dev-simjs',
            lang: currentLanguage,
            namespace
          })
        })

        if (apiResponse.ok) {
          const data = await apiResponse.json()
          setTranslations(data.translations || {})
        } else {
          // Fallback to static JSON files
          const locale = currentLanguage
          const fallbackResponse = await fetch(`/locales/${locale}/${namespace}.json`)

          if (fallbackResponse.ok) {
            const data = await fallbackResponse.json()
            setTranslations(data)
          } else {
            console.error('Failed to load translations:', fallbackResponse.status)
          }
        }
      } catch (error) {
        console.error('Error loading translations:', error)
        // Try fallback to static files on error
        try {
          const locale = currentLanguage
          const fallbackResponse = await fetch(`/locales/${locale}/${namespace}.json`)

          if (fallbackResponse.ok) {
            const data = await fallbackResponse.json()
            setTranslations(data)
          }
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadTranslations()
  }, [namespace, currentLanguage])

  const t = (key: string, options?: { returnObjects?: boolean }) => {
    const keys = key.split('.')
    let value = translations

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Return appropriate fallback based on returnObjects option
        return options?.returnObjects ? [] : key
      }
    }

    // If returnObjects is true, try to parse JSON strings into arrays/objects
    if (options?.returnObjects) {
      if (Array.isArray(value)) {
        return value
      }
      // Try to parse JSON string
      if (typeof value === 'string' && (value.startsWith('[') || value.startsWith('{'))) {
        try {
          const parsed = JSON.parse(value)
          return parsed
        } catch (e) {
          console.warn(`Failed to parse JSON for key "${key}":`, value)
          return []
        }
      }
      return []
    }

    return typeof value === 'string' ? value : key
  }

  return { t, isLoading }
}