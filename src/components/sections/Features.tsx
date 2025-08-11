import { motion } from 'framer-motion';
import { BrainCircuit, Plane, BedDouble, Sparkles } from 'lucide-react';

const featureList = [
  { icon: <BrainCircuit className="w-10 h-10 text-blue-400" />, title: 'AI-Powered Planning', description: 'Our advanced AI analyzes millions of data points to find the best flights, hotels, and deals for your specific needs.' },
  { icon: <Plane className="w-10 h-10 text-blue-400" />, title: 'Comprehensive Flight Analysis', description: 'We find the optimal balance of price, duration, and comfort, including insights on the best travel times.' },
  { icon: <BedDouble className="w-10 h-10 text-blue-400" />, title: 'Curated Accommodations', description: 'From luxury resorts to cozy boutique hotels, get top-rated recommendations that match your style and budget.' },
  { icon: <Sparkles className="w-10 h-10 text-blue-400" />, title: 'Personalized Activities', description: 'Discover unforgettable experiences. Our AI suggests activities based on your interests, from hidden gems to popular attractions.' },
];

const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } },
};

const Features = () => {
  return (
    <section id="features" className="py-24 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tighter">The Future of Travel Planning</h2>
          <p className="max-w-3xl mx-auto mt-4 text-lg text-slate-400">Horizon AI goes beyond simple search. We provide a holistic, intelligent service to create your perfect trip from start to finish.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureList.map((feature) => (
            <motion.div key={feature.title} className="bg-slate-800/50 p-8 rounded-xl border border-slate-700" initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.5 }} variants={cardVariants} >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;


