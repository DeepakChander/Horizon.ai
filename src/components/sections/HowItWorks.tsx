import { motion } from 'framer-motion';
import { FileText, Wand2, Mail } from 'lucide-react';

const steps = [
  { icon: <FileText className="w-12 h-12 text-teal-300" />, title: "1. Share Your Vision", description: "Fill out a simple form with your destination, dates, and interests. The more details, the better!" },
  { icon: <Wand2 className="w-12 h-12 text-teal-300" />, title: "2. Let AI Do the Magic", description: "Our intelligent engine gets to work, analyzing flights, accommodations, and activities to build your custom itinerary." },
  { icon: <Mail className="w-12 h-12 text-teal-300" />, title: "3. Receive Your Plan", description: "Your complete, personalized travel plan arrives directly in your inbox, ready for you to review and book." },
];

const HowItWorks = () => {
  return (
    <section id="howitworks" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tighter">Effortless Planning in 3 Steps</h2>
          <p className="max-w-3xl mx-auto mt-4 text-lg text-slate-400">From idea to itinerary in just a few minutes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="p-4 bg-slate-800 rounded-full border border-slate-700 mb-6">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-slate-400 max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;


