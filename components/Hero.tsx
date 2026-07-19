'use client';

import { motion } from 'framer-motion';
import { Phone, MapPin } from 'lucide-react';
import CTAButton from './CTAButton';

export default function Hero({
  title,
  subtitle,
  showPhone = false,
  showLocation = false,
}: {
  title: string;
  subtitle: string;
  showPhone?: boolean;
  showLocation?: boolean;
}) {
  return (
    <section className="relative bg-gradient-to-br from-brand-blue via-brand-blue to-blue-900 text-white py-24 lg:py-36 overflow-hidden">
      {/* Subtle parallax overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-display text-4xl sm:text-5xl lg:text-7xl uppercase tracking-tight mb-4"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="font-accent text-2xl sm:text-3xl lg:text-4xl text-brand-gold mb-6"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-2 mb-8"
        >
          {showPhone && (
            <p className="flex items-center justify-center gap-2 text-lg text-white/80">
              <Phone className="w-4 h-4" />
              <a href="tel:+13360000000" className="hover:text-white transition-colors">(336) 000-0000</a>
            </p>
          )}
          {showLocation && (
            <p className="flex items-center justify-center gap-2 text-sm text-white/60">
              <MapPin className="w-4 h-4" />
              Serving Whitsett &amp; Surrounding Areas
            </p>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <CTAButton text="Book Now" variant="secondary" />
          <CTAButton text="View Services" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-blue" showIcon={false} />
        </motion.div>
      </div>
    </section>
  );
}
