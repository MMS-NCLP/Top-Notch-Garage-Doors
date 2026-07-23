'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';
import { SERVICE_AREAS } from '@/lib/service-areas';

const ANCHOR_SLUGS = ['statesville', 'greensboro', 'burlington', 'durham'];

export default function LocalTownsGrid() {
  const [expanded, setExpanded] = useState(false);

  const anchorAreas = ANCHOR_SLUGS.map(s => SERVICE_AREAS.find(a => a.slug === s)!);
  const remainingAreas = SERVICE_AREAS.filter(a => !ANCHOR_SLUGS.includes(a.slug));

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-3">
            <MapPin className="w-4 h-4" /> Local Coverage
          </span>
          <h2 className="font-display text-2xl sm:text-3xl text-brand-blue uppercase mb-3">
            Serving Your Neighborhood
          </h2>
          <p className="text-foreground/60 max-w-xl mx-auto text-sm">
            We&apos;re not a national chain — we&apos;re your neighbors. Serving the entire Piedmont Triad corridor from Statesville to Durham with priority local service.
          </p>
        </div>

        {/* Anchor cities — always visible */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {anchorAreas.map((area, i) => (
            <motion.div
              key={area.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              whileHover={{ y: -3 }}
            >
              <Link
                href={`/service-areas/${area.slug}`}
                className="block surface-elevated border border-brand-blue/20 rounded-lg p-5 text-center hover:border-brand-blue/40 transition-all gleam"
              >
                <MapPin className="w-5 h-5 text-brand-blue mx-auto mb-2" />
                <p className="font-display text-sm text-brand-blue">{area.name}</p>
                <p className="text-xs text-foreground/40 mt-0.5">{area.tagline}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Expand/collapse toggle */}
        <div className="text-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-display text-xs uppercase tracking-wider text-brand-blue hover:bg-brand-blue/5 transition-colors"
          >
            {expanded ? 'Show Less' : `+ ${remainingAreas.length} More Service Areas`}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Remaining cities — expandable */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-4">
                {remainingAreas.map((area, i) => (
                  <motion.div
                    key={area.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                    whileHover={{ y: -3 }}
                  >
                    <Link
                      href={`/service-areas/${area.slug}`}
                      className="block surface-elevated border border-brand-silver/20 rounded-lg p-4 text-center hover:border-brand-blue/30 transition-all gleam"
                    >
                      <MapPin className="w-5 h-5 text-brand-blue mx-auto mb-2" />
                      <p className="font-display text-sm text-brand-blue">{area.name}</p>
                      <p className="text-xs text-foreground/40 mt-0.5">{area.tagline}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
