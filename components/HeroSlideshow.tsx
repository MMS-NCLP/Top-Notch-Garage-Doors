'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  {
    src: '/images/hero/carriage-house-door-dusk-lighting-nc.jpg',
    alt: 'Carriage house garage door at golden hour with warm interior glow in Piedmont Triad NC',
  },
  {
    src: '/images/hero/modern-black-garage-door-installation-nc.jpg',
    alt: 'Modern black garage door installation in North Carolina',
  },
  {
    src: '/images/hero/walnut-woodgrain-garage-door-modern-farmhouse-nc.jpg',
    alt: 'Dark walnut woodgrain garage door on modern farmhouse in Mooresville NC',
  },
  {
    src: '/images/hero/canyonridge-luxury-garage-door-nc.jpg',
    alt: 'CanyonRidge luxury wood-look garage door',
  },
  {
    src: '/images/hero/black-garage-doors-red-brick-nc.jpg',
    alt: 'Black garage doors on red brick home with gravel driveway in Piedmont Triad NC',
  },
  {
    src: '/images/hero/coachman-carriage-house-door-nc.jpg',
    alt: 'Coachman carriage house style garage door',
  },
  {
    src: '/images/hero/screen-door-brick-american-flag-hero-nc.jpg',
    alt: 'Premium garage screen door on brick home with American flag in NC',
  },
  {
    src: '/images/hero/modern-steel-black-garage-door-nc.jpg',
    alt: 'Modern steel garage door with long windows',
  },
  {
    src: '/images/hero/grand-harbor-premium-door-nc.jpg',
    alt: 'Grand Harbor premium residential garage door',
  },
];

const INTERVAL = 6000;

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, INTERVAL);
    return () => clearInterval(timer);
  }, [advance]);

  return (
    <>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[current].src}
            alt={SLIDES[current].alt}
            fill
            priority={current === 0}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current
                ? 'bg-brand-gold w-6'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </>
  );
}
