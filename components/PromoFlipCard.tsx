'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Star, ArrowRight, Scissors, BookOpen, X } from 'lucide-react';

export default function PromoFlipCard() {
  const [flipped, setFlipped] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleClick = useCallback(() => {
    setExpanded(true);
  }, []);

  return (
    <>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="perspective-[1200px] h-[340px] sm:h-[320px] cursor-pointer"
            onClick={handleClick}
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

                <div className="absolute inset-2 sm:inset-3 border-2 border-dashed border-white/25 rounded-lg" />

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
                    Hover to see reviews — Click to expand
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
                      <Star className="w-4 h-4" /> Read Reviews <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/learn"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-white/30 text-white font-display text-sm uppercase tracking-wider font-semibold hover:bg-white/10 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" /> Knowledge Hub
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <p className="text-center text-xs text-foreground/30 mt-3">
            Must present coupon code at time of booking. Cannot be combined with other offers. One per household.
          </p>
        </div>
      </section>

      {/* ═══ EXPANDED MODAL ═══ */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setExpanded(false)} />

            <motion.div
              className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <Image
                src="/images/portfolio/installations/carriage-house-door-nc-1.jpg"
                alt="Professional garage door service"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 900px"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/92 via-brand-blue/88 to-brand-blue/92" />

              <div className="absolute inset-3 sm:inset-5 border-2 border-dashed border-white/20 rounded-xl" />

              <div className="absolute top-0 right-8 sm:right-12">
                <div className="bg-brand-gold text-brand-blue w-10 h-10 rounded-b-xl flex items-center justify-center">
                  <Scissors className="w-5 h-5" />
                </div>
              </div>

              <button
                onClick={() => setExpanded(false)}
                className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10 py-12 sm:py-16 px-8 sm:px-16 flex flex-col items-center text-center">
                <span className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-widest text-brand-gold mb-4">
                  <Tag className="w-4 h-4" />
                  Official Top-Notch Garage Doors Coupon
                </span>

                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white uppercase leading-tight mb-4">
                  Lube &amp; Tune Special
                </h2>

                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-display text-6xl sm:text-7xl lg:text-8xl text-brand-gold">$79</span>
                  <span className="font-display text-3xl text-white/35 line-through">$129</span>
                </div>

                <p className="text-white/80 text-base sm:text-lg max-w-lg mb-6 leading-relaxed">
                  Complete 21-point garage door tune-up: lubrication, balance check,
                  safety inspection &amp; hardware tightening. Normally $129.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                  <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 border border-white/25 text-sm font-mono font-bold text-white tracking-widest">
                    TNGD-TUNE79
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-brand-gold text-brand-blue font-display text-sm uppercase tracking-wider font-bold hover:bg-white transition-colors"
                  >
                    Book Your Tune-Up <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/coupons"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-white/30 text-white font-display text-sm uppercase tracking-wider font-semibold hover:bg-white/10 transition-colors"
                  >
                    View All Coupons
                  </Link>
                </div>

                <p className="text-white/30 text-xs max-w-md">
                  Present code at time of booking. One per household. Cannot be combined with other offers.
                  Expires July 22, 2027.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
