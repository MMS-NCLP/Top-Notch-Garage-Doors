'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Tag, Star, X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CouponProps {
  title: string;
  value: string;
  subtitle?: string;
  description: string;
  code: string;
  expiresAt: string;
  terms: string;
  image: string;
  overlay?: 'blue' | 'red';
  review?: {
    text: string;
    author: string;
  };
}

export default function CouponCard({
  title,
  value,
  subtitle,
  description,
  code,
  expiresAt,
  terms,
  image,
  overlay = 'blue',
  review,
}: CouponProps) {
  const [flipped, setFlipped] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const [year, month, day] = expiresAt.split('-').map(Number);
  const expDate = new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const overlayGradient = overlay === 'red'
    ? 'from-brand-red/92 via-brand-red/85 to-brand-red/75'
    : 'from-brand-blue/92 via-brand-blue/85 to-brand-blue/70';

  const backOverlay = overlay === 'red'
    ? 'from-brand-blue/92 via-brand-blue/88 to-brand-blue/80'
    : 'from-brand-red/92 via-brand-red/88 to-brand-red/80';

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="perspective-[1200px] h-[280px] cursor-pointer print:break-inside-avoid print:h-auto"
        onClick={() => setExpanded(true)}
        onMouseEnter={() => review && setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* ═══ FRONT ═══ */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden print:relative print:rounded-none"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${overlayGradient}`} />

            <div className="absolute inset-2 border-2 border-dashed border-white/20 rounded-lg print:hidden" />

            <div className="absolute top-0 right-6">
              <div className="bg-brand-gold text-brand-blue w-7 h-7 rounded-b-lg flex items-center justify-center">
                <Scissors className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-display uppercase tracking-widest text-brand-gold mb-2">
                <Tag className="w-3 h-3" />
                {subtitle || 'Official Offer'}
              </span>

              <h3 className="font-display text-xl sm:text-2xl text-white uppercase leading-tight mb-2">
                {title}
              </h3>

              <span className="font-display text-4xl sm:text-5xl text-brand-gold leading-none mb-2">
                {value}
              </span>

              <p className="text-white/75 text-sm max-w-sm mb-3 leading-relaxed">
                {description}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-mono font-bold text-white tracking-wider">
                  {code}
                </span>
                <span className="text-white/35 text-[10px]">Exp. {expDate}</span>
              </div>

              {review && (
                <span className="text-[10px] text-brand-gold/50 font-display uppercase tracking-wider mt-3 print:hidden">
                  Hover to see review
                </span>
              )}
            </div>
          </div>

          {/* ═══ BACK (review) ═══ */}
          {review && (
            <div
              className="absolute inset-0 rounded-xl overflow-hidden print:hidden"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${backOverlay}`} />

              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>

                <blockquote className="text-white text-base leading-relaxed max-w-md mb-3 italic">
                  &ldquo;{review.text}&rdquo;
                </blockquote>

                <p className="text-white/60 text-xs font-display uppercase tracking-wider mb-4">
                  — {review.author}
                </p>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-mono font-bold text-white tracking-wider">
                  {code}
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* ═══ EXPANDED MODAL ═══ */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 print:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setExpanded(false)} />

            <motion.div
              className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 700px"
              />
              <div className={`absolute inset-0 bg-gradient-to-b ${overlayGradient}`} />

              <div className="absolute inset-3 sm:inset-5 border-2 border-dashed border-white/20 rounded-xl" />

              <div className="absolute top-0 right-8 sm:right-12">
                <div className="bg-brand-gold text-brand-blue w-9 h-9 rounded-b-xl flex items-center justify-center">
                  <Scissors className="w-4 h-4" />
                </div>
              </div>

              <button
                onClick={() => setExpanded(false)}
                className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10 py-10 sm:py-14 px-8 sm:px-14 flex flex-col items-center text-center">
                <span className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-widest text-brand-gold mb-3">
                  <Tag className="w-4 h-4" />
                  Official Top-Notch Garage Doors Coupon
                </span>

                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white uppercase leading-tight mb-3">
                  {title}
                </h2>

                <span className="font-display text-5xl sm:text-6xl lg:text-7xl text-brand-gold leading-none mb-3">
                  {value}
                </span>

                <p className="text-white/80 text-base sm:text-lg max-w-lg mb-5 leading-relaxed">
                  {description}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 mb-5">
                  <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/25 text-sm font-mono font-bold text-white tracking-widest">
                    {code}
                  </span>
                </div>

                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-brand-gold text-brand-blue font-display text-sm uppercase tracking-wider font-bold hover:bg-white transition-colors mb-4"
                >
                  Book & Save <ArrowRight className="w-4 h-4" />
                </Link>

                <p className="text-white/25 text-[10px] max-w-md leading-relaxed">
                  {terms} Limit one (1) coupon per household per visit. Must present coupon at time of service.
                  No cash value. Valid in TNGD service area only. Expires {expDate}.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
