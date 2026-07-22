'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronRight, X } from 'lucide-react';
import { projects, categories, type PortfolioProject } from '@/lib/portfolio-data';

function BeforeAfterLabel({ label }: { label?: string }) {
  if (!label) return null;
  const color = label === 'Before' ? 'bg-brand-red' : label === 'After' ? 'bg-green-600' : 'bg-brand-blue';
  return (
    <span className={`absolute top-3 left-3 ${color} text-white px-3 py-1 rounded-full font-accent text-sm z-10`}>
      {label}
    </span>
  );
}

function ProjectCard({ project, onClick }: { project: PortfolioProject; onClick: () => void }) {
  const hero = project.images[0];
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group text-left w-full surface-elevated border border-brand-silver/20 rounded-lg overflow-hidden hover:border-brand-blue/30 transition-all"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {project.images.length >= 2 && (
          <div className="absolute bottom-3 right-3 bg-brand-blue/90 text-white text-xs px-2 py-1 rounded-full">
            {project.images.length} photos
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-sm text-brand-blue uppercase mb-1">{project.title}</h3>
        <div className="flex items-center gap-1 text-xs text-foreground/50 mb-2">
          <MapPin className="w-3 h-3" />
          {project.location}
        </div>
        <p className="text-xs text-foreground/60 line-clamp-2">{project.outcome}</p>
        <span className="inline-flex items-center gap-1 text-xs text-brand-gold font-display uppercase mt-3">
          View Project <ChevronRight className="w-3 h-3" />
        </span>
      </div>
    </motion.button>
  );
}

function ProjectModal({ project, onClose }: { project: PortfolioProject; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="surface-elevated rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-brand-silver/20 surface-elevated">
          <div>
            <h2 className="font-display text-lg text-brand-blue uppercase">{project.title}</h2>
            <div className="flex items-center gap-1 text-xs text-foreground/50">
              <MapPin className="w-3 h-3" /> {project.location}
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-brand-silver/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className={`grid gap-4 mb-6 ${project.images.length >= 2 ? 'sm:grid-cols-2' : ''}`}>
            {project.images.map((img, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <BeforeAfterLabel label={img.label} />
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-3 text-sm">
            <div className="p-4 bg-brand-red/5 rounded-lg border border-brand-red/10">
              <h4 className="font-display text-brand-red uppercase text-xs mb-1">The Problem</h4>
              <p className="text-foreground/70">{project.problem}</p>
            </div>
            <div className="p-4 bg-brand-blue/5 rounded-lg border border-brand-blue/10">
              <h4 className="font-display text-brand-blue uppercase text-xs mb-1">Our Solution</h4>
              <p className="text-foreground/70">{project.solution}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200 dark:bg-green-900/10 dark:border-green-800/30">
              <h4 className="font-display text-green-700 dark:text-green-400 uppercase text-xs mb-1">The Outcome</h4>
              <p className="text-foreground/70">{project.outcome}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PortfolioGallery() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<PortfolioProject | null>(null);

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-display uppercase tracking-wider transition-all ${
              filter === cat.id
                ? 'bg-brand-blue text-white'
                : 'bg-brand-silver/10 text-foreground/60 hover:bg-brand-silver/20'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={() => setSelected(project)} />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-foreground/40 py-12">No projects in this category yet.</p>
      )}

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
