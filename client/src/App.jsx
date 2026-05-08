import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import Home from './pages/Home'
import Detect from './pages/Detect'
import About from './pages/About'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-dark-900 text-white relative">
      {/* Background Effects */}
      <div className="mesh-gradient" />
      <div className="bg-grid fixed inset-0 z-0 pointer-events-none" />
      <ParticleBackground />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(30, 41, 59, 0.9)',
            color: '#f1f5f9',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            backdropFilter: 'blur(16px)',
            borderRadius: '12px',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#22c55e', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Page Routes with Animation */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/detect" element={<Detect />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
