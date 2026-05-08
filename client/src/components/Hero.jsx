import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { RiShieldCheckFill, RiArrowRightLine, RiSparklingFill } from 'react-icons/ri'
import { HiPlay } from 'react-icons/hi'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [typedText, setTypedText] = useState('')
  const fullText = 'Detect Fake News Instantly'

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i))
        i++
      } else {
        clearInterval(timer)
      }
    }, 60)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Hero Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 cursor-default"
        >
          <RiSparklingFill className="text-primary-400 text-sm" />
          <span className="text-xs sm:text-sm font-medium text-dark-300">
            AI-Powered News Verification Platform
          </span>
          <span className="px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-400 text-xs font-semibold">
            v2.0
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-white">{typedText}</span>
          <span className="inline-block w-0.5 h-[0.8em] bg-primary-500 ml-1 animate-pulse align-middle" />
          <br />
          <span className="gradient-text mt-2 block">
            With TruthGuard AI
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-dark-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Harness the power of advanced machine learning to instantly verify news authenticity. 
          Our AI analyzes text patterns, language cues, and credibility markers with{' '}
          <span className="text-primary-400 font-medium">94%+ accuracy</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            to="/detect"
            className="btn-glow text-base px-8 py-4 rounded-xl font-semibold flex items-center gap-2.5 group w-full sm:w-auto justify-center"
          >
            <RiShieldCheckFill className="text-lg" />
            Analyze News Now
            <RiArrowRightLine className="text-lg group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/about"
            className="px-8 py-4 rounded-xl font-semibold text-dark-300 hover:text-white border border-dark-700 hover:border-primary-500/30 transition-all flex items-center gap-2.5 w-full sm:w-auto justify-center group"
          >
            <HiPlay className="text-lg text-primary-400 group-hover:scale-110 transition-transform" />
            Learn How It Works
          </Link>
        </motion.div>

        {/* 3D Hero Visual */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Glowing border card */}
          <div className="animated-border p-[1px] rounded-2xl">
            <div className="bg-dark-900/80 rounded-2xl p-6 md:p-8 backdrop-blur-xl">
              {/* Mock Terminal */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-dark-500 font-mono">truthguard-ai — analysis engine</span>
              </div>
              <div className="font-mono text-sm space-y-2 text-left">
                <p><span className="text-primary-400">$</span> <span className="text-dark-300">Initializing TruthGuard AI engine...</span></p>
                <p><span className="text-green-400">✓</span> <span className="text-dark-400">NLP pipeline loaded</span></p>
                <p><span className="text-green-400">✓</span> <span className="text-dark-400">TF-IDF vectorizer ready</span></p>
                <p><span className="text-green-400">✓</span> <span className="text-dark-400">Random Forest model loaded (94.2% accuracy)</span></p>
                <p><span className="text-green-400">✓</span> <span className="text-dark-400">API server running on port 5000</span></p>
                <p className="flex items-center gap-2">
                  <span className="text-accent-400">→</span>
                  <span className="text-white">Ready to analyze news articles</span>
                  <span className="inline-block w-2 h-4 bg-primary-500 animate-pulse" />
                </p>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 -right-4 glass-card p-3 rounded-xl hidden md:flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <span className="text-green-400 text-sm">✓</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Real News</p>
              <p className="text-xs text-dark-400">94.2% confidence</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-4 -left-4 glass-card p-3 rounded-xl hidden md:flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
              <span className="text-red-400 text-sm">✗</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Fake News</p>
              <p className="text-xs text-dark-400">97.8% confidence</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-dark-500 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>10K+ News Analyzed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-500" />
            <span>94%+ Accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-500" />
            <span>Real-time Detection</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary-500" />
            <span>4 ML Models</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
