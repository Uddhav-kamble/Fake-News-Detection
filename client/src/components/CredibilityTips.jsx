import { motion } from 'framer-motion'
import { RiShieldCheckLine, RiAlertLine, RiSearchEyeLine, RiLinksFill, RiTimeLine, RiEmotionLine } from 'react-icons/ri'

const tips = [
  { icon: RiSearchEyeLine, title: 'Check the Source', desc: 'Verify the publisher is reputable and well-known.' },
  { icon: RiLinksFill, title: 'Cross-Reference', desc: 'Look for the same story from multiple credible outlets.' },
  { icon: RiTimeLine, title: 'Check the Date', desc: 'Old news is sometimes recirculated as if it were new.' },
  { icon: RiEmotionLine, title: 'Watch for Emotion', desc: 'Fake news often uses extreme emotional language.' },
  { icon: RiAlertLine, title: 'Clickbait Headlines', desc: 'Sensational headlines are a red flag for misinformation.' },
  { icon: RiShieldCheckLine, title: 'Use AI Tools', desc: 'Leverage tools like TruthGuard AI for automated analysis.' },
]

export default function CredibilityTips() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Credibility Guide
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            News <span className="gradient-text">Credibility Tips</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Learn to spot misinformation with these expert-backed strategies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tips.map((tip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-4 p-5 rounded-xl bg-dark-800/30 border border-dark-700/50 hover:border-primary-500/20 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/20 transition-colors">
                <tip.icon className="text-lg text-primary-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm mb-1">{tip.title}</h4>
                <p className="text-dark-400 text-xs leading-relaxed">{tip.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
