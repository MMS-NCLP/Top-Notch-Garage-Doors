'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { SERVICE_AREAS } from '@/lib/service-areas';

export default function LocalTownsGrid() {
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
            We&apos;re not a national chain — we&apos;re your neighbors. Serving the entire Piedmont Triad corridor from Statesville to Mebane with priority local service.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {SERVICE_AREAS.map((area, i) => (
            <motion.div
              key={area.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
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
      </div>
    </section>
  );
}
