# Archived Next.js Landing Page

This folder contains the archived landing page code that was previously used for the Digital Twin (dev-simjs) application at ezbelta.com.

## Why Archived

The landing page was moved here to separate the marketing site from the SaaS application:
- **ezbelta.com** - Marketing hub for the Ezbelta product suite (using static HTML in `public_html/`)
- **Digital Twin app** - Standalone SaaS application (dev-simjs project)

## Contents

```
archived-next-landing-page/
├── src/
│   ├── pages/
│   │   ├── index.tsx       # Main marketing landing page
│   │   └── demo.tsx        # Demo page
│   ├── hooks/
│   │   └── useTranslations.ts  # Translation hook (fetches from Supabase)
│   └── contexts/
│       ├── LanguageContext.tsx     # Language state management
│       └── TranslationContext.tsx  # Translation context provider
├── public/
│   ├── Ezbelta3.svg        # Logo
│   └── locales/
│       ├── en/common.json  # English translations
│       ├── es/common.json  # Spanish translations
│       ├── de/common.json  # German translations
│       └── no/common.json  # Norwegian translations
└── README.md               # This file
```

## Features

The archived landing page included:
- Multi-language support (EN, ES, DE, NO) with auto-translation via Claude AI
- Supabase-backed translation system
- Marketing sections: Hero, Features, How It Works, CTA
- Language selector dropdown
- Sign In/Get Started buttons linking to auth pages

## Dependencies

If you want to restore this landing page, it requires:
- Next.js 14+
- Supabase client (`@supabase/supabase-js`)
- Tailwind CSS
- Environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

## Date Archived

December 2025

## Current Approach

The current ezbelta.com website uses a simple static HTML site located in `../public_html/`. This approach:
- Loads instantly (no JavaScript required)
- Works on SiteGround shared hosting
- Easy to maintain and update
- No translation system complexity
