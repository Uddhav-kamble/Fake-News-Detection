import { motion } from 'framer-motion'
import { RiDoubleQuotesL, RiStarFill } from 'react-icons/ri'

const testimonials = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Journalism Professor, NYU',
    text: 'TruthGuard AI has become an essential tool in my media literacy courses. Students use it to understand how ML can detect misinformation patterns.',
    rating: 5,
  },
  {
    name: 'Marcus Williams',
    role: 'Fact-Check Editor, Reuters',
    text: 'The accuracy and speed of this tool is impressive. It catches subtle linguistic cues that even experienced editors might miss on first pass.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Data Scientist, Google',
    text: 'The ensemble approach using multiple ML classifiers is solid engineering. The confidence scoring gives users the transparency they need.',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-500/10 border border-secondary-500/20 text-secondary-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by <span className="gradient-text">Experts</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            See what professionals say about TruthGuard AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="glass-card p-6 md:p-8 relative"
            >
              <RiDoubleQuotesL className="text-3xl text-primary-500/20 mb-4" />
              <p className="text-dark-300 text-sm leading-relaxed mb-6">
                "{item.text}"
              </p>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <RiStarFill key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-sm">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{item.name}</p>
                  <p className="text-dark-500 text-xs">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
