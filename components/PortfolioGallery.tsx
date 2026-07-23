'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronRight, X, Filter, Wrench, Navigation } from 'lucide-react';
import {
  projects,
  serviceTypeFilters,
  anchorCityFilters,
  SERVICE_TYPE_LABELS,
  type PortfolioProject,
  type ImageTag,
} from '@/lib/portfolio-data';

const TAG_STYLES: Record<ImageTag, { bg: string; text: string; label: string }> = {
  before: { bg: 'bg-brand-red', text: 'text-white', label: 'Before' },
  after: { bg: 'bg-green-600', text: 'text-white', label: 'After' },
  detail: { bg: 'bg-brand-blue', text: 'text-white', label: 'Detail' },
  process: { bg: 'bg-brand-gold', text: 'text-brand-blue', label: 'In Progress' },
  verification: { bg: 'bg-green-700', text: 'text-white', label: 'Verified' },
};

function ImageTagBadge({ tag }: { tag: ImageTag }) {
  const style = TAG_STYLES[tag];
  return (
    <span className={`absolute top-3 left-3 ${style.bg} ${style.text} px-3 py-1 rounded-full font-accent text-sm z-10`}>
      {style.label}
    </span>
  );
}

function ProjectCard({ project, onClick }: { project: PortfolioProject; onClick: () => void }) {
  const hero = project.images[0];
  const hasBeforeAfter = project.images.some((i) => i.tag === 'before') && project.images.some((i) => i.tag === 'after');

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
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          {hasBeforeAfter && (
            <span className="bg-brand-gold/90 text-brand-blue text-xs font-display uppercase px-2 py-1 rounded-full">
              Before & After
            </span>
          )}
          {project.images.length >= 2 && (
            <span className="bg-brand-blue/90 text-white text-xs px-2 py-1 rounded-full">
              {project.images.length} photos
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-brand-blue/5 border border-brand-blue/10 rounded text-[10px] font-display uppercase tracking-wider text-brand-blue">
            {SERVICE_TYPE_LABELS[project.serviceType]}
          </span>
          <span className="px-2 py-0.5 bg-brand-gold/10 border border-brand-gold/20 rounded text-[10px] font-display uppercase tracking-wider text-brand-gold">
            {project.anchorCity}
          </span>
        </div>
        <h3 className="font-display text-sm text-brand-blue uppercase mb-1">{project.title}</h3>
        <div className="flex items-center gap-1 text-xs text-foreground/50 mb-2">
          <MapPin className="w-3 h-3" />
          {project.location}
        </div>
        <p className="text-xs text-foreground/60 line-clamp-2">{project.caption}</p>
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
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-xs text-foreground/50">
                <MapPin className="w-3 h-3" /> {project.location}
              </span>
              <span className="text-xs text-foreground/30">|</span>
              <span className="text-xs text-brand-blue/70 font-display uppercase">{SERVICE_TYPE_LABELS[project.serviceType]}</span>
              <span className="text-xs text-foreground/30">|</span>
              <span className="text-xs text-brand-gold font-display uppercase">{project.anchorCity}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-brand-silver/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {/* Metadata Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="p-3 bg-brand-blue/5 rounded-lg border border-brand-blue/10">
              <p className="text-[10px] font-display uppercase text-foreground/40 mb-0.5">System Type</p>
              <p className="text-xs text-foreground/70">{project.systemType}</p>
            </div>
            <div className="p-3 bg-brand-red/5 rounded-lg border border-brand-red/10">
              <p className="text-[10px] font-display uppercase text-foreground/40 mb-0.5">Failure Mode</p>
              <p className="text-xs text-foreground/70">{project.failureMode}</p>
            </div>
            <div className="p-3 bg-brand-gold/5 rounded-lg border border-brand-gold/10">
              <p className="text-[10px] font-display uppercase text-foreground/40 mb-0.5">Materials</p>
              <p className="text-xs text-foreground/70">{project.materials}</p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800/30">
              <p className="text-[10px] font-display uppercase text-foreground/40 mb-0.5">Images</p>
              <p className="text-xs text-foreground/70">{project.images.length} photos</p>
            </div>
          </div>

          {/* Educator Caption */}
          <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-lg p-4 mb-6">
            <p className="text-sm text-foreground/70 leading-relaxed italic">&ldquo;{project.caption}&rdquo;</p>
          </div>

          {/* Image Grid */}
          <div className={`grid gap-4 mb-6 ${project.images.length >= 2 ? 'sm:grid-cols-2' : ''}`}>
            {project.images.map((img, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <ImageTagBadge tag={img.tag} />
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

          {/* Problem / Solution / Outcome */}
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
  const [serviceFilter, setServiceFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [selected, setSelected] = useState<PortfolioProject | null>(null);

  const filtered = projects.filter((p) => {
    if (serviceFilter !== 'all' && p.serviceType !== serviceFilter) return false;
    if (cityFilter !== 'all' && p.anchorCity !== cityFilter) return false;
    return true;
  });

  const activeFilters = (serviceFilter !== 'all' ? 1 : 0) + (cityFilter !== 'all' ? 1 : 0);

  return (
    <>
      {/* Filter Controls */}
      <div className="mb-10 space-y-4">
        {/* Service Type Filter */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="w-3.5 h-3.5 text-brand-blue" />
            <span className="text-xs font-display uppercase tracking-wider text-foreground/40">Service Type</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {serviceTypeFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setServiceFilter(f.id)}
                className={`px-4 py-2 rounded-full text-xs font-display uppercase tracking-wider transition-all ${
                  serviceFilter === f.id
                    ? 'bg-brand-blue text-white'
                    : 'bg-brand-silver/10 text-foreground/60 hover:bg-brand-silver/20'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Anchor City Filter */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Navigation className="w-3.5 h-3.5 text-brand-gold" />
            <span className="text-xs font-display uppercase tracking-wider text-foreground/40">Corridor Location</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {anchorCityFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setCityFilter(f.id)}
                className={`px-4 py-2 rounded-full text-xs font-display uppercase tracking-wider transition-all ${
                  cityFilter === f.id
                    ? 'bg-brand-gold text-brand-blue'
                    : 'bg-brand-silver/10 text-foreground/60 hover:bg-brand-silver/20'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active filter summary */}
        {activeFilters > 0 && (
          <div className="flex items-center gap-2 text-xs text-foreground/50">
            <Filter className="w-3 h-3" />
            <span>Showing {filtered.length} project{filtered.length !== 1 ? 's' : ''}</span>
            <button
              onClick={() => { setServiceFilter('all'); setCityFilter('all'); }}
              className="text-brand-red hover:underline ml-1"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Project Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={() => setSelected(project)} />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-foreground/40 py-12">No projects match these filters.</p>
      )}

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
