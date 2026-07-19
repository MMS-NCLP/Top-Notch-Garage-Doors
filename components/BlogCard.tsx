'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function BlogCard({
  title,
  slug,
  excerpt,
  publishedAt,
}: {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
}) {
  const date = new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

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
        <div className="bg-gradient-to-br from-brand-blue/5 to-brand-blue/10 h-40 flex items-center justify-center">
          <BookOpen className="w-10 h-10 text-brand-blue/20 group-hover:text-brand-blue/40 transition-colors" />
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
