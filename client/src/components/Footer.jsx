import { Link } from 'react-router-dom'
import { RiShieldCheckFill, RiGithubFill, RiTwitterXFill, RiLinkedinFill, RiMailLine, RiArrowUpLine } from 'react-icons/ri'

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-dark-700/50 bg-dark-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <RiShieldCheckFill className="text-2xl text-primary-500" />
              <span className="font-display text-xl font-bold">
                <span className="text-white">Truth</span>
                <span className="gradient-text">Guard</span>
                <span className="text-dark-400 text-sm font-medium ml-1.5">AI</span>
              </span>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed max-w-sm mb-6">
              AI-powered fake news detection platform using advanced machine learning 
              to help you verify news authenticity instantly.
            </p>
            <div className="flex items-center gap-3">
              {[RiGithubFill, RiTwitterXFill, RiLinkedinFill, RiMailLine].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-dark-800/50 border border-dark-700/50 flex items-center justify-center text-dark-400 hover:text-primary-400 hover:border-primary-500/30 transition-all"
                >
                  <Icon className="text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-2.5">
              {['Home', 'Detect News', 'About'].map((item, i) => (
                <li key={i}>
                  <Link
                    to={i === 0 ? '/' : i === 1 ? '/detect' : '/about'}
                    className="text-dark-400 text-sm hover:text-primary-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Technology</h4>
            <ul className="space-y-2.5">
              {['Random Forest', 'TF-IDF Vectorizer', 'Logistic Regression', 'Flask API', 'React.js'].map((item, i) => (
                <li key={i}>
                  <span className="text-dark-400 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-dark-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-xs">
            © {new Date().getFullYear()} TruthGuard AI. Built with ❤️ and Machine Learning.
          </p>
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-lg bg-dark-800/50 border border-dark-700/50 flex items-center justify-center text-dark-400 hover:text-primary-400 hover:border-primary-500/30 transition-all"
            aria-label="Scroll to top"
          >
            <RiArrowUpLine className="text-base" />
          </button>
        </div>
      </div>
    </footer>
  )
}
