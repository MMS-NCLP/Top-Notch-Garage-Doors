'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const CATEGORY_IMAGES: Record<string, { src: string; alt: string }> = {
  'Repair & Maintenance': { src: '/images/portfolio/springs/broken-spring-replacement-nc.jpg', alt: 'Garage door spring repair' },
  'Installation & Products': { src: '/images/portfolio/installations/craftsman-raised-panel-7-windows-exterior-nc.jpg', alt: 'Garage door installation' },
  'Openers & Technology': { src: '/images/portfolio/openers/liftmaster-opener-install-nc.jpg', alt: 'Smart garage door opener' },
  'Emergency Services': { src: '/images/hero/emergency-crashed-garage-door-nc.jpg', alt: 'Emergency garage door repair' },
  'DIY & Maintenance': { src: '/images/portfolio/installations/track-installation-greensboro-nc.jpg', alt: 'Garage door maintenance' },
  'Safety & Education': { src: '/images/portfolio/springs/broken-torsion-spring-piedmont-triad.jpg', alt: 'Garage door safety' },
  'Pressure Washing': { src: '/images/about/tngd-service-truck-jobsite.jpg', alt: 'Pressure washing service' },
  'Products & Installation': { src: '/images/portfolio/installations/residential-door-installation-piedmont-after.jpg', alt: 'Residential door installation' },
};

const FALLBACK = { src: '/images/portfolio/installations/new-construction-door-install-nc-complete.jpg', alt: 'Top-Notch Garage Doors project' };

export default function BlogCard({
  title,
  slug,
  excerpt,
  publishedAt,
  category,
  image,
  imageAlt,
}: {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  category?: string;
  image?: string;
  imageAlt?: string;
}) {
  const date = new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const img = image
    ? { src: image, alt: imageAlt || title }
    : (category && CATEGORY_IMAGES[category]) || FALLBACK;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/blog/${slug}`}
        className="group block surface-elevated border border-brand-silver/20 rounded-lg overflow-hidden gleam h-full"
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {category && (
            <span className="absolute top-3 left-3 bg-brand-blue/90 text-white px-2.5 py-0.5 rounded-full text-xs font-display uppercase">
              {category}
            </span>
          )}
        </div>
        <div className="p-5">
          <time className="text-xs text-foreground/40 uppercase tracking-wider">{date}</time>
          <h3 className="font-display text-lg text-brand-blue mt-1 mb-2 group-hover:text-brand-red transition-colors">
            {title}
          </h3>
          <p className="text-sm text-foreground/60 leading-relaxed line-clamp-3">{excerpt}</p>
        </div>
      </Link>
    </motion.div>
  );
}
