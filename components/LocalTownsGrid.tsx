'use client';

import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { SERVICE_AREAS } from '@/lib/service-areas';

export default function LocalTownsGrid() {
  return (
    <section className="py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-3">
          <MapPin className="w-4 h-4" /> Local Coverage
        </span>
        <h2 className="font-display text-2xl text-brand-blue uppercase mb-4">
          Serving Your Neighborhood
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
          {SERVICE_AREAS.map((area, i) => (
            <span key={area.slug} className="inline-flex items-center">
              <Link
                href={`/service-areas/${area.slug}`}
                className="font-display text-sm text-brand-blue hover:text-brand-red transition-colors px-1 py-0.5"
              >
                {area.name}
              </Link>
              {i < SERVICE_AREAS.length - 1 && (
                <span className="text-brand-gold/50 text-xs select-none">&bull;</span>
              )}
            </span>
          ))}
        </div>
        <p className="text-foreground/50 text-xs mt-3 max-w-md mx-auto">
          Priority local service across the entire Piedmont Triad corridor — Statesville to Durham.
        </p>
      </div>
    </section>
  );
}
