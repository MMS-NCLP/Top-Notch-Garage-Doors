'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { ArrowRight, Star } from 'lucide-react';

interface FlipCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  backImage: string;
  backImageAlt: string;
  backInsight: string;
  blogSlug?: string;
  blogLabel?: string;
  overlay?: 'blue' | 'red';
}

export default function FlipCard({
  icon,
  title,
  description,
  backImage,
  backImageAlt,
  backInsight,
  blogSlug,
  blogLabel = 'Read the Full Guide',
  overlay = 'blue',
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const overlayClass = overlay === 'red'
    ? 'bg-brand-red/85'
    : 'bg-brand-blue/85';

  return (
    <div
      className="perspective-[1000px] h-[260px] cursor-pointer"
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-lg surface-elevated border border-brand-silver/20 p-6 gleam flex flex-col"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-10 h-10 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue mb-3">
            {icon}
          </div>
          <h3 className="font-display text-lg text-brand-blue mb-2">{title}</h3>
          <p className="text-sm text-foreground/60 leading-relaxed flex-1">{description}</p>
          <span className="text-xs text-brand-gold font-display uppercase tracking-wider mt-3 opacity-60">
            Tap to learn more
          </span>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-lg overflow-hidden flex flex-col"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <Image
            src={backImage}
            alt={backImageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className={`absolute inset-0 ${overlayClass}`} />
          <div className="relative z-10 p-6 flex flex-col h-full">
            <h3 className="font-display text-base text-white uppercase mb-1 tracking-wide">{title}</h3>
            <div className="flex gap-0.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
              ))}
            </div>
            <p className="text-sm text-white/90 leading-relaxed flex-1 italic">{backInsight}</p>
            {blogSlug && (
              <Link
                href={`/blog/${blogSlug}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-wider text-brand-gold hover:text-white transition-colors mt-3"
              >
                {blogLabel} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
