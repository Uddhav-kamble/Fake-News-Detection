import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
  RiShieldCheckLine, RiAlarmWarningLine, RiDeleteBinLine,
  RiSendPlaneFill, RiFileTextLine, RiTimeLine, RiLoader4Line,
  RiClipboardLine, RiLightbulbLine, RiHistoryLine
} from 'react-icons/ri'

// const API_URL = 'http://localhost:5000'
const API_URL = 'https://fake-news-detection-coral.vercel.app/'

const exampleNews = [
  {
    label: 'Real News Example',
    text: 'The Federal Reserve announced today that it will maintain current interest rates, citing stable economic growth and moderate inflation. The decision was widely expected by financial analysts and follows the latest employment data showing continued job market improvement across multiple sectors.'
  },
  {
    label: 'Fake News Example',
    text: 'BREAKING: Scientists discover that drinking lemon water cures all types of cancer overnight! Big pharma has been hiding this miracle cure for decades. Share this with everyone you know before they delete this post! Doctors are SHOCKED by these results.'
  },
]

export default function Detect() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('truthguard_history')
    if (saved) setHistory(JSON.parse(saved))
  }, [])

  const saveHistory = (entry) => {
    const updated = [entry, ...history].slice(0, 10)
    setHistory(updated)
    localStorage.setItem('truthguard_history', JSON.stringify(updated))
  }

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast.error('Please enter some news text to analyze')
      return
    }
    if (text.trim().length < 10) {
      toast.error('Text is too short. Please enter at least 10 characters.')
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await axios.post(`${API_URL}/predict`, { text: text.trim() })
      const data = response.data
      setResult(data)
      saveHistory({
        text: text.trim().substring(0, 100) + (text.length > 100 ? '...' : ''),
        prediction: data.prediction,
        confidence: data.confidence,
        timestamp: new Date().toLocaleString(),
      })
      toast.success('Analysis complete!')
    } catch (error) {
      const msg = error.response?.data?.error || 'Failed to connect to the server. Make sure the Flask backend is running.'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setText('')
    setResult(null)
  }

  const handleExample = (example) => {
    setText(example.text)
    setResult(null)
    toast.success(`Loaded: ${example.label}`)
  }

  const isReal = result?.prediction === 'Real News'
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const charCount = text.length

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-24 md:pt-32 pb-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold uppercase tracking-wider mb-4">
            AI Detection Engine
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Analyze <span className="gradient-text">News Text</span>
          </h1>
          <p className="text-dark-400 text-base md:text-lg max-w-2xl mx-auto">
            Paste any news article below and our AI will determine if it's real or fake.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-6 md:p-8">
              {/* Textarea */}
              <div className="relative">
                <textarea
                  id="news-input"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your news article or text here..."
                  rows={10}
                  className="w-full bg-dark-800/50 border border-dark-700/50 rounded-xl p-4 text-white text-sm leading-relaxed resize-none focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all placeholder:text-dark-600 font-mono"
                />
                {/* Counters */}
                <div className="flex items-center justify-between mt-3 text-xs text-dark-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <RiFileTextLine /> {wordCount} words
                    </span>
                    <span>{charCount} characters</span>
                  </div>
                  {text && (
                    <button
                      onClick={() => { navigator.clipboard.writeText(text); toast.success('Copied!') }}
                      className="flex items-center gap-1 hover:text-primary-400 transition-colors"
                    >
                      <RiClipboardLine /> Copy
                    </button>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-5">
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !text.trim()}
                  className="btn-glow px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <RiLoader4Line className="animate-spin text-lg" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <RiSendPlaneFill className="text-lg" />
                      Detect Now
                    </>
                  )}
                </button>
                <button
                  onClick={handleClear}
                  className="px-5 py-3 rounded-xl font-semibold text-sm text-dark-400 border border-dark-700 hover:border-red-500/30 hover:text-red-400 transition-all flex items-center gap-2"
                >
                  <RiDeleteBinLine /> Clear
                </button>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="px-5 py-3 rounded-xl font-semibold text-sm text-dark-400 border border-dark-700 hover:border-primary-500/30 hover:text-primary-400 transition-all flex items-center gap-2 ml-auto"
                >
                  <RiHistoryLine /> History
                </button>
              </div>

              {/* Example Buttons */}
              <div className="mt-5 pt-5 border-t border-dark-700/50">
                <p className="text-xs text-dark-500 mb-3 flex items-center gap-1">
                  <RiLightbulbLine className="text-yellow-400" /> Try an example:
                </p>
                <div className="flex flex-wrap gap-2">
                  {exampleNews.map((ex, i) => (
                    <button
                      key={i}
                      onClick={() => handleExample(ex)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-dark-800/50 border border-dark-700/50 text-dark-300 hover:text-primary-400 hover:border-primary-500/30 transition-all"
                    >
                      {ex.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Result / Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Result Card */}
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-card p-8 text-center"
                >
                  <div className="spinner mx-auto mb-4" />
                  <p className="text-dark-300 text-sm font-medium">Analyzing text patterns...</p>
                  <p className="text-dark-500 text-xs mt-1">Running ML pipeline</p>
                </motion.div>
              )}

              {result && !loading && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', bounce: 0.3 }}
                  className={`rounded-2xl p-6 md:p-8 border ${
                    isReal
                      ? 'bg-green-500/5 border-green-500/20'
                      : 'bg-red-500/5 border-red-500/20'
                  }`}
                >
                  {/* Status Icon */}
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                    isReal ? 'bg-green-500/10' : 'bg-red-500/10'
                  }`}>
                    {isReal ? (
                      <RiShieldCheckLine className="text-3xl text-green-400" />
                    ) : (
                      <RiAlarmWarningLine className="text-3xl text-red-400" />
                    )}
                  </div>

                  <h3 className="text-center text-lg font-bold text-white mb-1">
                    Prediction Result
                  </h3>

                  {/* Verdict */}
                  <div className={`text-center text-2xl font-display font-bold mb-4 ${
                    isReal ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {isReal ? '✅' : '❌'} {result.prediction}
                  </div>

                  {/* Confidence */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-dark-400">Confidence</span>
                      <span className={`font-bold font-mono ${isReal ? 'text-green-400' : 'text-red-400'}`}>
                        {result.confidence}
                      </span>
                    </div>
                    <div className="confidence-meter">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence_value * 100}%` }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className={`confidence-meter-fill ${
                          isReal
                            ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                            : 'bg-gradient-to-r from-red-500 to-orange-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 rounded-lg bg-dark-800/30">
                      <p className="text-xs text-dark-500 mb-1">Words</p>
                      <p className="text-white font-semibold text-sm">{result.word_count}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-dark-800/30">
                      <p className="text-xs text-dark-500 mb-1">Characters</p>
                      <p className="text-white font-semibold text-sm">{result.char_count}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {!result && !loading && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card p-8 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-dark-800/50 flex items-center justify-center">
                    <RiShieldCheckLine className="text-3xl text-dark-600" />
                  </div>
                  <p className="text-dark-400 text-sm font-medium">No analysis yet</p>
                  <p className="text-dark-600 text-xs mt-1">Paste text and click Detect</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* History Panel */}
            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="glass-card p-5 overflow-hidden"
                >
                  <h4 className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
                    <RiHistoryLine className="text-primary-400" /> Recent Analyses
                  </h4>
                  {history.length === 0 ? (
                    <p className="text-dark-500 text-xs">No history yet</p>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {history.map((item, i) => (
                        <div key={i} className="p-3 rounded-lg bg-dark-800/30 border border-dark-700/30">
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-xs font-semibold ${
                              item.prediction === 'Real News' ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {item.prediction === 'Real News' ? '✅' : '❌'} {item.prediction}
                            </span>
                            <span className="text-xs text-dark-500 font-mono">{item.confidence}</span>
                          </div>
                          <p className="text-dark-400 text-xs truncate">{item.text}</p>
                          <p className="text-dark-600 text-[10px] mt-1 flex items-center gap-1">
                            <RiTimeLine /> {item.timestamp}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.main>
  )
}
