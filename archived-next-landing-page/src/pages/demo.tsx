'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from '@/hooks/useTranslations'

export default function DemoPage() {
  const { t, isLoading } = useTranslations('common')
  const [currentStep, setCurrentStep] = useState(0)

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

  // TODO: Replace with your actual Loom video URL
  const loomVideoId = "YOUR_LOOM_VIDEO_ID" // You'll replace this
  const hasVideo = loomVideoId !== "YOUR_LOOM_VIDEO_ID"

  const demoSteps = [
    {
      title: "Mixed Model Line Design",
      description: "See how MMLD calculates exact resource requirements for multiple product variants",
      image: "/demo/mmld-screenshot.png", // You'd add actual screenshots
      features: [
        "Product mix definition with volume targets",
        "Process flow design with drag-and-drop",
        "Automatic resource calculations",
        "One-click simulation model generation"
      ]
    },
    {
      title: "Visual Flow Simulation",
      description: "Watch real-time simulation with live status visualization",
      image: "/demo/visual-flow-screenshot.png",
      features: [
        "Real-time resource status colors",
        "Live throughput monitoring",
        "Bottleneck identification",
        "Interactive flow diagram"
      ]
    },
    {
      title: "AI-Powered Analytics",
      description: "Get intelligent insights and optimization recommendations",
      image: "/demo/analytics-screenshot.png",
      features: [
        "Automated bottleneck detection",
        "Waste pattern analysis",
        "Performance optimization suggestions",
        "Statistical analysis reports"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-8 h-8">
                <Image
                  src="/ezbelta-logo.png"
                  alt="Ezbelta Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-blue-600">Ezbelta</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Back to Home</Link>
              <Link href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {hasVideo ? "Product Demo Video" : "Interactive Product Demo"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {hasVideo
              ? "Watch how Ezbelta transforms manufacturing line design and optimization"
              : "Explore Ezbelta's powerful features through this step-by-step demonstration"
            }
          </p>
        </div>

        {/* Main Video Section - Show if video is available */}
        {hasVideo && (
          <div className="mb-16">
            <div className="bg-white rounded-xl shadow-xl border p-8">
              <div className="aspect-video mb-6">
                <iframe
                  src={`https://www.loom.com/embed/${loomVideoId}`}
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                  title="Ezbelta Demo"
                />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  See Real Manufacturing Transformation in Action
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  This demo shows actual MMLD calculations, live simulation, and AI-powered optimization recommendations
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Mixed Model Line Design
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Visual Flow Simulation
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    AI-Powered Analytics
                  </div>
                </div>
              </div>
            </div>

            {/* CTA after video */}
            <div className="text-center mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Ready to optimize your manufacturing line?
              </h3>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/auth/signup"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Start Free Trial
                </Link>
                <a
                  href="mailto:support@leandesignsimulator.com" // Replace with your contact email
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Schedule Consultation
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Demo Section - Show if no video or as supplementary content */}
        {!hasVideo && (
          <>
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Step-by-Step Feature Walkthrough
            </h2>

            {/* Demo Navigation */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-4">
                {demoSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentStep === index
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Step {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Feature Details Section - Always show, but positioned after video if present */}
        {hasVideo && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Feature Deep Dive
            </h2>
            <p className="text-lg text-gray-600">
              Explore the technical details behind what you just saw in the demo
            </p>
          </div>
        )}

        {/* Current Demo Step */}
        <div className="bg-white rounded-xl shadow-lg border p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {demoSteps[currentStep].title}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {demoSteps[currentStep].description}
              </p>
              <ul className="space-y-3">
                {demoSteps[currentStep].features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="text-green-500 mr-3">✓</div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              {/* Placeholder for demo screenshot/video */}
              <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <p className="text-gray-600">Interactive Demo Coming Soon</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Screenshot: {demoSteps[currentStep].image}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-lg font-medium ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>

          <div className="text-center">
            <p className="text-gray-600 mb-4">Ready to try it yourself?</p>
            <Link
              href="/auth/signup"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>

          <button
            onClick={() => setCurrentStep(Math.min(demoSteps.length - 1, currentStep + 1))}
            disabled={currentStep === demoSteps.length - 1}
            className={`px-6 py-3 rounded-lg font-medium ${
              currentStep === demoSteps.length - 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next
          </button>
        </div>

        {/* Additional Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-2">Fast Setup</h3>
            <p className="text-gray-600 text-sm">Get up and running in under 5 minutes</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="font-semibold text-gray-900 mb-2">Proven Results</h3>
            <p className="text-gray-600 text-sm">15+ years of simulation refinement</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="font-semibold text-gray-900 mb-2">Enterprise Ready</h3>
            <p className="text-gray-600 text-sm">Secure, scalable, and compliant</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Removed getStaticProps since we're using client-side translations now