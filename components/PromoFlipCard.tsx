'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Tag, Star, ArrowRight, Scissors } from 'lucide-react';

export default function PromoFlipCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="perspective-[1200px] h-[340px] sm:h-[320px] cursor-pointer"
          onClick={() => setFlipped(!flipped)}
          onMouseEnter={() => setFlipped(true)}
          onMouseLeave={() => setFlipped(false)}
        >
          <motion.div
            className="relative w-full h-full"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* ═══ FRONT — Deal Hero ═══ */}
            <div
              className="absolute inset-0 rounded-xl overflow-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <Image
                src="/images/portfolio/installations/carriage-house-door-nc-1.jpg"
                alt="Professional garage door service"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 via-brand-blue/80 to-brand-blue/60" />

              {/* Dashed coupon border */}
              <div className="absolute inset-2 sm:inset-3 border-2 border-dashed border-white/25 rounded-lg" />

              {/* Scissors icon */}
              <div className="absolute top-0 right-6 sm:right-10">
                <div className="bg-brand-gold text-brand-blue w-8 h-8 rounded-b-lg flex items-center justify-center">
                  <Scissors className="w-4 h-4" />
                </div>
              </div>

              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 sm:px-12">
                <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-3">
                  <Tag className="w-3.5 h-3.5" />
                  Limited-Time Offer
                </span>

                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white uppercase leading-tight mb-2">
                  Lube &amp; Tune Special
                </h2>

                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-5xl sm:text-6xl text-brand-gold">$79</span>
                  <span className="font-display text-2xl text-white/40 line-through">$129</span>
                </div>

                <p className="text-white/70 text-sm sm:text-base max-w-md mb-4">
                  Complete 21-point inspection, lubrication, balance check &amp; hardware tightening.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold text-white tracking-wider">
                    TNGD-TUNE79
                  </span>
                  <span className="text-white/40 text-xs">Expires July 22, 2027</span>
                </div>

                <span className="text-xs text-brand-gold/60 font-display uppercase tracking-wider mt-4">
                  Tap to see what our customers say
                </span>
              </div>
            </div>

            {/* ═══ BACK — Review + Links ═══ */}
            <div
              className="absolute inset-0 rounded-xl overflow-hidden"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <Image
                src="/images/portfolio/installations/track-installation-greensboro-nc.jpg"
                alt="Garage door maintenance service"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-red/90 via-brand-red/85 to-brand-red/75" />

              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 sm:px-12">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
                  ))}
                </div>

                <blockquote className="text-white text-lg sm:text-xl leading-relaxed max-w-lg mb-4 italic">
                  &ldquo;Spring broke at 7am, they were here by noon. Fair price, clean work, explained everything. Exactly what you want from a local company.&rdquo;
                </blockquote>

                <p className="text-white/70 text-sm font-display uppercase tracking-wider mb-6">
                  — Mike T., Whitsett NC
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    href="/reviews"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-brand-red font-display text-sm uppercase tracking-wider font-semibold hover:bg-brand-gold hover:text-brand-blue transition-colors"
                  >
                    Read More Reviews <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/coupons"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-white/30 text-white font-display text-sm uppercase tracking-wider font-semibold hover:bg-white/10 transition-colors"
                  >
                    View All Coupons
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-foreground/30 mt-3">
          Must present coupon code at time of booking. Cannot be combined with other offers. One per household.
        </p>
      </div>
    </section>
  );
}
