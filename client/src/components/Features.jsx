import { motion } from 'framer-motion'
import { RiShieldCheckLine, RiBrainLine, RiSpeedLine, RiLockLine, RiBarChartBoxLine, RiGlobalLine } from 'react-icons/ri'

const features = [
  {
    icon: RiBrainLine,
    title: 'Advanced ML Models',
    description: 'Powered by ensemble of Random Forest, Logistic Regression, Gradient Boosting, and Decision Tree classifiers.',
    gradient: 'from-primary-500 to-secondary-500',
  },
  {
    icon: RiSpeedLine,
    title: 'Real-time Analysis',
    description: 'Get instant predictions in under 200ms. No waiting — just paste your text and get results.',
    gradient: 'from-accent-500 to-primary-500',
  },
  {
    icon: RiShieldCheckLine,
    title: 'High Accuracy',
    description: 'Our TF-IDF + ensemble approach achieves 94%+ accuracy on detecting misinformation patterns.',
    gradient: 'from-green-500 to-accent-500',
  },
  {
    icon: RiBarChartBoxLine,
    title: 'Confidence Scoring',
    description: 'Every prediction comes with a confidence percentage so you can gauge the reliability of the analysis.',
    gradient: 'from-secondary-500 to-pink-500',
  },
  {
    icon: RiLockLine,
    title: 'Privacy First',
    description: 'Your text is analyzed in real-time and never stored. We respect your privacy and data security.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: RiGlobalLine,
    title: 'NLP Processing',
    description: 'Advanced natural language processing with text cleaning, stopword removal, and n-gram feature extraction.',
    gradient: 'from-pink-500 to-primary-500',
  },
]

export default function Features() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Features
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose <span className="gradient-text">TruthGuard AI</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Built with cutting-edge machine learning technology to help you separate fact from fiction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 md:p-8 group cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-5`}>
                <div className="w-full h-full rounded-[10px] bg-dark-900 flex items-center justify-center">
                  <feature.icon className="text-xl text-primary-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-dark-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
