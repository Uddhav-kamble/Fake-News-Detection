import { motion } from 'framer-motion'
import {
  RiShieldCheckLine, RiBrainLine, RiCodeSSlashLine, RiFlowChart,
  RiBarChartGroupedLine, RiGitBranchLine, RiDatabase2Line, RiTerminalBoxLine
} from 'react-icons/ri'

const models = [
  { name: 'Random Forest', accuracy: '96%', desc: 'Ensemble of decision trees for robust classification', color: 'text-green-400', bg: 'bg-green-500/10', width: 'w-[96%]', barColor: 'from-green-500 to-emerald-400' },
  { name: 'Logistic Regression', accuracy: '93%', desc: 'Linear model optimized for binary text classification', color: 'text-primary-400', bg: 'bg-primary-500/10', width: 'w-[93%]', barColor: 'from-primary-500 to-secondary-400' },
  { name: 'Gradient Boosting', accuracy: '95%', desc: 'Sequential boosting for high-accuracy predictions', color: 'text-accent-400', bg: 'bg-accent-500/10', width: 'w-[95%]', barColor: 'from-accent-500 to-primary-400' },
  { name: 'Decision Tree', accuracy: '89%', desc: 'Interpretable tree-based classification model', color: 'text-secondary-400', bg: 'bg-secondary-500/10', width: 'w-[89%]', barColor: 'from-secondary-500 to-pink-400' },
]

const techStack = [
  { icon: RiCodeSSlashLine, name: 'React.js', desc: 'Frontend UI framework' },
  { icon: RiTerminalBoxLine, name: 'Flask', desc: 'Python backend API' },
  { icon: RiBrainLine, name: 'scikit-learn', desc: 'ML model training' },
  { icon: RiDatabase2Line, name: 'TF-IDF', desc: 'Text vectorization' },
  { icon: RiFlowChart, name: 'Tailwind CSS', desc: 'Utility-first styling' },
  { icon: RiGitBranchLine, name: 'Framer Motion', desc: 'Smooth animations' },
]

const pipeline = [
  { step: 'Input', desc: 'Raw news text received from user' },
  { step: 'Lowercase', desc: 'Convert all text to lowercase' },
  { step: 'Clean', desc: 'Remove URLs, HTML, punctuation, numbers' },
  { step: 'Vectorize', desc: 'TF-IDF with 5000 features + bigrams' },
  { step: 'Classify', desc: 'Random Forest ensemble prediction' },
  { step: 'Output', desc: 'Prediction label + confidence score' },
]

export default function About() {
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
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-500/10 border border-secondary-500/20 text-secondary-400 text-xs font-semibold uppercase tracking-wider mb-4">
            About the Project
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            How <span className="gradient-text">TruthGuard AI</span> Works
          </h1>
          <p className="text-dark-400 text-base md:text-lg max-w-2xl mx-auto">
            A deep dive into the machine learning pipeline, models, and technology powering our fake news detection system.
          </p>
        </motion.div>

        {/* ML Pipeline */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <RiFlowChart className="text-primary-400" /> ML Pipeline
          </h2>
          <div className="glass-card p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {pipeline.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="p-3 rounded-xl bg-dark-800/50 border border-dark-700/50 text-center min-w-[120px]">
                    <p className="text-primary-400 text-xs font-mono font-bold mb-1">{item.step}</p>
                    <p className="text-dark-400 text-[10px]">{item.desc}</p>
                  </div>
                  {i < pipeline.length - 1 && (
                    <span className="text-dark-600 text-lg hidden sm:block">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Model Comparison */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <RiBarChartGroupedLine className="text-green-400" /> Model Performance
          </h2>
          <div className="space-y-4">
            {models.map((model, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${model.bg} flex items-center justify-center`}>
                      <RiBrainLine className={`text-sm ${model.color}`} />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-semibold">{model.name}</h4>
                      <p className="text-dark-500 text-xs">{model.desc}</p>
                    </div>
                  </div>
                  <span className={`font-mono font-bold text-lg ${model.color}`}>{model.accuracy}</span>
                </div>
                <div className="confidence-meter">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: model.width === 'w-[96%]' ? '96%' : model.width === 'w-[93%]' ? '93%' : model.width === 'w-[95%]' ? '95%' : '89%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                    className={`confidence-meter-fill bg-gradient-to-r ${model.barColor}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <RiCodeSSlashLine className="text-accent-400" /> Tech Stack
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-5 text-center group"
              >
                <tech.icon className="text-2xl text-primary-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-white text-sm font-semibold">{tech.name}</h4>
                <p className="text-dark-500 text-xs mt-1">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* About Card */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-8 md:p-10 text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-primary-500/10 flex items-center justify-center">
              <RiShieldCheckLine className="text-3xl text-primary-400" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-3">About TruthGuard AI</h3>
            <p className="text-dark-400 text-sm leading-relaxed max-w-2xl mx-auto mb-4">
              TruthGuard AI is an AI-powered fake news detection system that uses Natural Language Processing
              and Machine Learning to classify news articles as real or fake. The system employs TF-IDF vectorization
              combined with an ensemble of classifiers including Random Forest, Logistic Regression, Gradient Boosting,
              and Decision Tree models. Built with React.js on the frontend and Flask on the backend, it delivers
              real-time predictions with confidence scores.
            </p>
            <p className="text-dark-500 text-xs">
              Built with ❤️ using Python, scikit-learn, React.js, and Tailwind CSS
            </p>
          </div>
        </motion.section>
      </div>
    </motion.main>
  )
}
