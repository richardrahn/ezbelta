/**
 * Lightweight i18n (internationalization) for Ezbelta static site
 *
 * Usage:
 * - Add data-i18n="key.path" to elements for text translation
 * - Add data-i18n-placeholder="key.path" for input placeholders
 * - Add data-i18n-list="key.path" for lists (creates <li> elements)
 * - Call setLanguage('es') to switch languages
 */

const i18n = {
  currentLang: 'en',
  translations: {},
  supportedLanguages: ['en', 'es', 'de', 'pt-BR'],

  /**
   * Initialize i18n system
   */
  async init() {
    // Get saved language or detect from browser
    const savedLang = localStorage.getItem('ezbelta-lang');
    const browserLang = navigator.language.split('-')[0];

    // Use saved, or browser language if supported, or default to English
    const lang = savedLang ||
      (this.supportedLanguages.includes(browserLang) ? browserLang : 'en');

    await this.setLanguage(lang);
  },

  /**
   * Load translations for a language
   */
  async loadTranslations(lang) {
    try {
      // Use absolute path from site root
      const response = await fetch(`/locales/${lang}.json`);
      if (!response.ok) throw new Error(`Failed to load ${lang} translations`);
      return await response.json();
    } catch (error) {
      console.warn(`Could not load ${lang} translations:`, error);
      // Fall back to English if translation file not found
      if (lang !== 'en') {
        return this.loadTranslations('en');
      }
      return {};
    }
  },

  /**
   * Set the current language
   */
  async setLanguage(lang) {
    if (!this.supportedLanguages.includes(lang)) {
      console.warn(`Language ${lang} not supported, falling back to English`);
      lang = 'en';
    }

    this.translations = await this.loadTranslations(lang);
    this.currentLang = lang;
    localStorage.setItem('ezbelta-lang', lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Apply translations to the page
    this.applyTranslations();

    // Update language selector if it exists
    const selector = document.getElementById('languageSelector');
    if (selector) selector.value = lang;

    // Dispatch event for any custom handling
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  },

  /**
   * Get a translation by key path (e.g., "nav.products" or "solutions.0.bold")
   */
  t(keyPath, fallback = keyPath) {
    const keys = keyPath.split('.');
    let value = this.translations;

    for (const key of keys) {
      if (value == null) {
        return fallback;
      }
      // Handle both object properties and array indices
      if (Array.isArray(value)) {
        const index = parseInt(key, 10);
        if (!isNaN(index) && index >= 0 && index < value.length) {
          value = value[index];
        } else {
          return fallback;
        }
      } else if (typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return fallback;
      }
    }

    return value ?? fallback;
  },

  /**
   * Apply translations to all elements with data-i18n attributes
   */
  applyTranslations() {
    // Translate text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation && typeof translation === 'string') {
        el.textContent = translation;
      }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = this.t(key);
    });

    // Translate title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      el.title = this.t(key);
    });

    // Translate lists (arrays in JSON become <li> elements)
    document.querySelectorAll('[data-i18n-list]').forEach(el => {
      const key = el.getAttribute('data-i18n-list');
      const items = this.t(key);
      if (Array.isArray(items)) {
        el.innerHTML = items.map(item => `<li>${item}</li>`).join('');
      }
    });

    // Translate select options
    document.querySelectorAll('select option[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation && typeof translation === 'string') {
        el.textContent = translation;
      }
    });
  }
};

// Auto-initialize when DOM is ready
(async function initI18n() {
  try {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => i18n.init());
    } else {
      await i18n.init();
    }
  } catch (error) {
    console.error('i18n initialization failed:', error);
  }
})();

// Expose setLanguage globally for easy use
function setLanguage(lang) {
  i18n.setLanguage(lang);
}
