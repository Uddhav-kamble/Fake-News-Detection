import { motion } from 'framer-motion'
import { RiFileTextLine, RiCpuLine, RiCheckDoubleLine } from 'react-icons/ri'

const steps = [
  {
    step: '01',
    icon: RiFileTextLine,
    title: 'Paste Your News',
    description: 'Copy and paste any news article or text you want to verify into our analysis box.',
    color: 'text-primary-400',
    bg: 'bg-primary-500/10',
    border: 'border-primary-500/20',
  },
  {
    step: '02',
    icon: RiCpuLine,
    title: 'AI Analysis',
    description: 'Our ML pipeline preprocesses, vectorizes, and classifies the text using trained models.',
    color: 'text-secondary-400',
    bg: 'bg-secondary-500/10',
    border: 'border-secondary-500/20',
  },
  {
    step: '03',
    icon: RiCheckDoubleLine,
    title: 'Get Results',
    description: 'Receive an instant verdict with confidence score — Real News or Fake News.',
    color: 'text-accent-400',
    bg: 'bg-accent-500/10',
    border: 'border-accent-500/20',
  },
]

export default function HowItWorks() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-xs font-semibold uppercase tracking-wider mb-4">
            How It Works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Three Simple <span className="gradient-text">Steps</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Verifying news authenticity has never been easier.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-primary-500/30 via-secondary-500/30 to-accent-500/30" />

          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="text-center relative"
            >
              {/* Step number */}
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center relative z-10`}>
                <item.icon className={`text-2xl ${item.color}`} />
              </div>
              <span className={`text-xs font-mono font-bold ${item.color} mb-2 block`}>STEP {item.step}</span>
              <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-dark-400 text-sm leading-relaxed max-w-xs mx-auto">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
