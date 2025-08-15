import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TripForm } from '../TripForm';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg transition-colors ${
        scrolled ? 'bg-slate-950/60 border-b border-slate-800' : 'bg-slate-950/30'
      }`}
    >
      <div className="container mx-auto px-6 py-3 grid grid-cols-3 items-center">
        {/* Left: Logo */}
        <div className="justify-self-start">
          <a href="#" className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
            Horizon AI
          </a>
        </div>

        {/* Center: Nav */}
        <nav className="hidden md:flex justify-center space-x-8 text-sm">
          <button
            className="hover:text-blue-300 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Features
          </button>
          <button
            className="hover:text-blue-300 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('howitworks')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            How It Works
          </button>
          <button
            className="hover:text-blue-300 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Pricing
          </button>
        </nav>

        {/* Right: CTA that opens the TripForm dialog */}
        <div className="justify-self-end">
          <TripForm />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;


