'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, MapPin, ShieldCheck, Banknote, Award, Users } from 'lucide-react';
import CTAButton from './CTAButton';
import HeroSlideshow from './HeroSlideshow';

const TRUST_BADGES = [
  { label: 'Fast Service by Real Pros', icon: <Award className="w-4 h-4" /> },
  { label: 'No Service Call Fee', icon: <Banknote className="w-4 h-4" /> },
  { label: 'Certified & Insured', icon: <ShieldCheck className="w-4 h-4" /> },
  { label: 'Local & Trusted Experts', icon: <Users className="w-4 h-4" /> },
];

export default function Hero({
  title,
  subtitle,
  showPhone = false,
  showLocation = false,
  backgroundImage,
  slideshow = false,
}: {
  title: string;
  subtitle: string;
  showPhone?: boolean;
  showLocation?: boolean;
  backgroundImage?: string;
  slideshow?: boolean;
}) {
  return (
    <section className="relative bg-gradient-to-br from-brand-blue via-brand-blue to-blue-900 text-white py-24 lg:py-36 overflow-hidden">
      {slideshow ? (
        <div className="absolute inset-0 opacity-25">
          <HeroSlideshow />
        </div>
      ) : backgroundImage ? (
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          className="object-cover opacity-20"
          sizes="100vw"
        />
      ) : null}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute inset-0 z-[1] opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      {/* Logo watermark */}
      <div className="absolute top-6 right-6 z-[2] opacity-15 hidden lg:block">
        <Image src="/images/logos/tngd-logo-small-1.png" alt="" width={100} height={100} className="object-contain" />
      </div>

      <div className="relative z-[5] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-hero text-4xl sm:text-5xl lg:text-7xl tracking-wider mb-4"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="font-display text-xl sm:text-2xl lg:text-3xl uppercase tracking-wide text-white/90 mb-2"
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
              <a href="tel:+13366046494" className="hover:text-white transition-colors">(336) 604-6494</a>
            </p>
          )}
          {showLocation && (
            <p className="flex items-center justify-center gap-2 text-sm text-white/60">
              <MapPin className="w-4 h-4" />
              Serving the Piedmont Triad — Statesville to Mebane
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <CTAButton text="Book Service" variant="secondary" />
          <CTAButton text="View Services" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-blue" showIcon={false} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {TRUST_BADGES.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-xs sm:text-sm text-white/60 uppercase tracking-wider">
              <span className="text-brand-gold">{badge.icon}</span>
              {badge.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
