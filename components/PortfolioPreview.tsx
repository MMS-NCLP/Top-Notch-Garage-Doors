'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ChevronRight, Camera } from 'lucide-react';
import { type PortfolioProject, SERVICE_TYPE_LABELS } from '@/lib/portfolio-data';

export default function PortfolioPreview({
  projects,
  heading = 'Recent Work in Your Area',
  subheading,
}: {
  projects: PortfolioProject[];
  heading?: string;
  subheading?: string;
}) {
  if (projects.length === 0) return null;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Camera className="w-4 h-4 text-brand-gold" />
              <span className="text-xs font-display uppercase tracking-widest text-brand-gold">Portfolio</span>
            </div>
            <h2 className="font-display text-2xl text-brand-blue uppercase">{heading}</h2>
            {subheading && <p className="text-sm text-foreground/60 mt-1">{subheading}</p>}
          </div>
          <Link
            href="/portfolio"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-display uppercase tracking-wider text-brand-blue hover:text-brand-red transition-colors"
          >
            View All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const hero = project.images[0];
            const hasBeforeAfter =
              project.images.some((i) => i.tag === 'before') &&
              project.images.some((i) => i.tag === 'after');

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  href={`/portfolio#${project.id}`}
                  className="group block surface-elevated border border-brand-silver/20 rounded-lg overflow-hidden hover:border-brand-blue/30 transition-all"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={hero.src}
                      alt={hero.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                      {hasBeforeAfter && (
                        <span className="bg-brand-gold/90 text-brand-blue text-xs font-display uppercase px-2 py-1 rounded-full">
                          Before & After
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-brand-blue/5 border border-brand-blue/10 rounded text-[10px] font-display uppercase tracking-wider text-brand-blue">
                        {SERVICE_TYPE_LABELS[project.serviceType]}
                      </span>
                    </div>
                    <h3 className="font-display text-sm text-brand-blue uppercase mb-1">{project.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-foreground/50 mb-2">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </div>
                    <p className="text-xs text-foreground/60 line-clamp-2 italic">&ldquo;{project.caption}&rdquo;</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1 text-xs font-display uppercase tracking-wider text-brand-blue hover:text-brand-red transition-colors"
          >
            View Full Portfolio <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
