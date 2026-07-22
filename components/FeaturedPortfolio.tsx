'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '@/lib/portfolio-data';

const featured = projects.filter((p) => p.featured).slice(0, 8);

export default function FeaturedPortfolio() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    return () => el.removeEventListener('scroll', updateScrollState);
  }, []);

  function scroll(direction: 'left' | 'right') {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('div')?.offsetWidth ?? 360;
    el.scrollBy({ left: direction === 'left' ? -cardWidth - 32 : cardWidth + 32, behavior: 'smooth' });
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-display text-3xl text-brand-blue uppercase mb-3">
              Recent Projects
            </h2>
            <p className="text-foreground/60 max-w-xl">
              Real results from real jobs across the Piedmont Triad. Every photo is from our work — no stock images.
            </p>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous project"
              className="w-10 h-10 rounded-full border border-brand-silver/40 flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand-blue transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Next project"
              className="w-10 h-10 rounded-full border border-brand-silver/40 flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand-blue transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 px-4 sm:px-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] no-scrollbar"
      >
        {featured.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex-shrink-0 w-[85vw] sm:w-[45vw] lg:w-[360px] snap-start"
          >
            <Link href="/portfolio" className="group block">
              {project.images.length >= 2 ? (
                <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden mb-4">
                  <div className="relative aspect-[4/3]">
                    <span className="absolute top-2 left-2 bg-brand-red text-white px-2 py-0.5 rounded-full font-accent text-xs z-10">Before</span>
                    <Image
                      src={project.images[0].src}
                      alt={project.images[0].alt}
                      fill
                      sizes="(max-width: 768px) 42vw, 180px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="relative aspect-[4/3]">
                    <span className="absolute top-2 left-2 bg-green-600 text-white px-2 py-0.5 rounded-full font-accent text-xs z-10">After</span>
                    <Image
                      src={project.images[1].src}
                      alt={project.images[1].alt}
                      fill
                      sizes="(max-width: 768px) 42vw, 180px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                  <Image
                    src={project.images[0].src}
                    alt={project.images[0].alt}
                    fill
                    sizes="(max-width: 768px) 85vw, 360px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <h3 className="font-display text-sm text-brand-blue uppercase mb-1">{project.title}</h3>
              <p className="text-xs text-foreground/60 line-clamp-2 mb-2">{project.outcome}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-center">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-brand-blue font-display text-sm uppercase tracking-wider hover:text-brand-gold transition-colors"
        >
          View All Projects <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
