import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Explorer',
    price: '$19',
    cycle: '/ per trip',
    description: 'Perfect for the occasional traveler planning a single getaway.',
    features: [
      'Full Itinerary Generation',
      'Flight & Hotel Analysis',
      'Activity Recommendations',
      'Email Support',
    ],
    cta: 'Start Planning',
    emphasis: false,
  },
  {
    name: 'Voyager',
    price: '$49',
    cycle: '/ per year',
    description: 'Best value for frequent flyers and year-round adventurers.',
    features: [
      'Unlimited Itineraries',
      'Everything in Explorer',
      'Price Fluctuation Alerts',
      'Priority Email Support',
    ],
    cta: 'Choose Voyager',
    emphasis: true,
  },
  {
    name: 'Odyssey',
    price: 'Contact Us',
    cycle: 'Custom',
    description: 'For groups, businesses, and bespoke luxury travel planning.',
    features: [
      'Everything in Voyager',
      'Multi-user Collaboration',
      'Dedicated Travel Agent',
      'Custom Integrations',
    ],
    cta: 'Get a Quote',
    emphasis: false,
  },
];

const cardVariants = {
  offscreen: { y: 20, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tighter">Choose Your Perfect Plan</h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-slate-400">Simple, transparent pricing to fuel your next adventure.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.4 }}
              variants={cardVariants}
              className={`relative rounded-xl border p-8 bg-slate-800/40 border-slate-700 hover:border-blue-400/60 transition-all duration-300 ${
                plan.emphasis ? 'ring-2 ring-blue-500/40' : ''
              }`}
            >
              {plan.emphasis && (
                <div className="absolute -top-3 right-6 text-xs px-2 py-1 rounded-full bg-blue-600 text-white">Most Popular</div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className="text-slate-400">{plan.cycle}</span>
              </div>
              <p className="text-slate-400 mb-6">{plan.description}</p>
              <ul className="space-y-2 mb-8 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-blue-400">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button className={`${plan.emphasis ? 'bg-blue-500 hover:bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'} w-full`}>{plan.cta}</Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;


