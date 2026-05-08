import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Statistics from '../components/Statistics'
import Testimonials from '../components/Testimonials'
import CredibilityTips from '../components/CredibilityTips'

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero />
      <Features />
      <Statistics />
      <HowItWorks />
      <CredibilityTips />
      <Testimonials />
    </motion.main>
  )
}
