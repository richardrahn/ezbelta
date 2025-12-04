import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from '@/hooks/useTranslations'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Home() {
  const { t, isLoading } = useTranslations('common')
  const { currentLanguage, setLanguage } = useLanguage()
  const router = useRouter()

  // Add loading state to prevent SSR errors
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as any)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img
                src="/Ezbelta3.svg"
                alt="Ezbelta Logo"
                className="h-15 w-auto object-contain"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">{t('navigation.features')}</Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">{t('navigation.howItWorks')}</Link>
              <Link href="/admin" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">{t('navigation.admin')}</Link>

              {/* Language Selector for Pages Router */}
              <select
                value={currentLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <option value="en">🇺🇸 English</option>
                <option value="es">🇪🇸 Español</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="no">🇳🇴 Norsk</option>
                <option value="de">🇩🇪 Deutsch</option>
                <option value="pt-BR">🇧🇷 Português</option>
              </select>

              <Link href="/auth/login" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium">{t('navigation.signIn')}</Link>
              <Link href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">{t('navigation.getStarted')}</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('hero.title')}
              <span className="text-blue-600 block">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link
                href="/auth/signup"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                {t('hero.getStarted')}
              </Link>
              <Link
                href="/demo"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                {t('hero.watchDemo')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t('problemSolution.problemTitle')}
              </h2>
              <div className="space-y-4 mb-8">
                {(t('problemSolution.problems', { returnObjects: true }) as string[]).map((problem, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-red-500 text-xl mr-3">❌</div>
                    <p className="text-gray-600">{problem}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-600 mb-6">
                {t('problemSolution.solutionTitle')}
              </h3>
              <div className="space-y-4">
                {(t('problemSolution.solutions', { returnObjects: true }) as string[]).map((solution, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-green-500 text-xl mr-3">✅</div>
                    <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: solution }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
              <div className="text-blue-600 text-5xl mb-6">📐</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('features.mmld.title')}</h3>
              <p className="text-gray-600 mb-4">
                {t('features.mmld.description')}
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                {(t('features.mmld.features', { returnObjects: true }) as string[]).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
              <div className="text-green-600 text-5xl mb-6">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('features.simulation.title')}</h3>
              <p className="text-gray-600 mb-4">
                {t('features.simulation.description')}
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                {(t('features.simulation.features', { returnObjects: true }) as string[]).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
              <div className="text-purple-600 text-5xl mb-6">🧠</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('features.ai.title')}</h3>
              <p className="text-gray-600 mb-4">
                {t('features.ai.description')}
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                {(t('features.ai.features', { returnObjects: true }) as string[]).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
              <div className="text-yellow-600 text-5xl mb-6">🔄</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('features.visual.title')}</h3>
              <p className="text-gray-600 mb-4">
                {t('features.visual.description')}
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                {(t('features.visual.features', { returnObjects: true }) as string[]).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
              <div className="text-orange-600 text-5xl mb-6">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('features.analytics.title')}</h3>
              <p className="text-gray-600 mb-4">
                {t('features.analytics.description')}
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                {(t('features.analytics.features', { returnObjects: true }) as string[]).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* AI Video Analyzer - REMOVED - Not included in app
            <div className="bg-white p-8 rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
              <div className="text-indigo-600 text-5xl mb-6">🎥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('features.videoAnalyzer.title')}</h3>
              <p className="text-gray-600 mb-4">
                {t('features.videoAnalyzer.description')}
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                {(t('features.videoAnalyzer.features', { returnObjects: true }) as string[]).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            */}

            <div className="bg-white p-8 rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
              <div className="text-red-600 text-5xl mb-6">🏢</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('features.enterprise.title')}</h3>
              <p className="text-gray-600 mb-4">
                {t('features.enterprise.description')}
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                {(t('features.enterprise.features', { returnObjects: true }) as string[]).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('howItWorks.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('howItWorks.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(t('howItWorks.steps', { returnObjects: true }) as Array<{title: string, description: string}>).map((step, index) => (
              <div key={index} className="text-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg text-white ${
                  index === 0 ? 'bg-blue-600' : 
                  index === 1 ? 'bg-green-600' : 
                  index === 2 ? 'bg-yellow-600' : 'bg-purple-600'
                }`}>
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*
        Shopfloor Modules Section - HIDDEN FOR PHASE 3 RELEASE
        This section will be re-enabled in Phase 4 when Shopfloor features are ready for production.
        All Shopfloor code remains intact in the codebase - only navigation/marketing is hidden.
      */}
      {/* <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('shopfloorModules.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('shopfloorModules.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(t('shopfloorModules.modules', { returnObjects: true }) as Array<{name: string, description: string, benefit: string}>).map((module, index) => (
              <div key={index} className={`p-8 rounded-xl ${
                index === 0 ? 'bg-gradient-to-br from-blue-50 to-blue-100' :
                index === 1 ? 'bg-gradient-to-br from-green-50 to-green-100' :
                index === 2 ? 'bg-gradient-to-br from-purple-50 to-purple-100' :
                index === 3 ? 'bg-gradient-to-br from-teal-50 to-teal-100' :
                index === 4 ? 'bg-gradient-to-br from-indigo-50 to-indigo-100' :
                'bg-gradient-to-br from-orange-50 to-orange-100'
              }`}>
                <div className="text-4xl mb-4">
                  {index === 0 ? '📋' : index === 1 ? '🏭' : index === 2 ? '📊' : index === 3 ? '🔄' : index === 4 ? '🎥' : '📈'}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{module.name}</h3>
                <p className="text-gray-600 mb-4">
                  {module.description}
                </p>
                <div className={`text-sm font-medium ${
                  index === 0 ? 'text-blue-600' :
                  index === 1 ? 'text-green-600' :
                  index === 2 ? 'text-purple-600' :
                  index === 3 ? 'text-teal-600' :
                  index === 4 ? 'text-indigo-600' : 'text-orange-600'
                }`}>
                  {module.benefit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}


      {/* Final CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('finalCta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('finalCta.description')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link
              href="/auth/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              {t('finalCta.getStarted')}
            </Link>
            <a
              href="https://calendly.com/rrahn/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              {t('finalCta.scheduleDemo')}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-4">{t('footer.brand')}</div>
              <p className="text-gray-400 mb-4">
                {t('footer.description')}
              </p>
              <div className="flex space-x-4">
                <a href="https://linkedin.com/in/richarddrahn" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">{t('footer.social.linkedin')}</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.product.title')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">{t('footer.product.features')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.product.documentation')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.product.apiReference')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.languages.title')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className="hover:text-white transition-colors text-left"
                  >
                    {t('footer.languages.english')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLanguageChange('es')}
                    className="hover:text-white transition-colors text-left"
                  >
                    {t('footer.languages.spanish')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLanguageChange('fr')}
                    className="hover:text-white transition-colors text-left"
                  >
                    {t('footer.languages.french')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLanguageChange('no')}
                    className="hover:text-white transition-colors text-left"
                  >
                    {t('footer.languages.norwegian')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLanguageChange('de')}
                    className="hover:text-white transition-colors text-left"
                  >
                    {t('footer.languages.german')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLanguageChange('pt-BR')}
                    className="hover:text-white transition-colors text-left"
                  >
                    {t('footer.languages.portuguese')}
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.support.title')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.support.helpCenter')}</a></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">{t('footer.support.contactUs')}</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.support.training')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.support.community')}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Removed getStaticProps since we're using client-side translations now