import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TripForm } from '../TripForm';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const q = gsap.utils.selector(heroRef);

  useLayoutEffect(() => {
    // Animate headline lines and CTA sequentially with GSAP for a polished entrance.
    gsap.fromTo(
      q('.hero-title'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2, delay: 0.3 }
    );
    gsap.fromTo(
      q('.hero-subtitle'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.8 }
    );
    gsap.fromTo(
      q('.hero-cta'),
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 1.2 }
    );
  }, [q]);

  // IMPORTANT: The user will need to add a video file named 'background-video.mp4' to the 'public/' directory.
  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video autoPlay loop muted className="w-full h-full object-cover opacity-20">
          <source src="/background-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>
      </div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4">
          <span className="hero-title block bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400">Intelligent Travel,</span>
          <span className="hero-title block bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-teal-300">Effortlessly Planned.</span>
        </h1>
        <p className="hero-subtitle max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-8">
          Describe your perfect trip, and let our AI craft a personalized itinerary in minutes. From flights to activities, your next adventure starts here.
        </p>
        <div className="hero-cta">
          <TripForm />
        </div>
      </div>
    </section>
  );
};

export default Hero;


