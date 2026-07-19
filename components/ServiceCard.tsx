'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function ServiceCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,40,104,0.08)' }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={href}
        className="group block surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam h-full"
      >
        <div className="w-12 h-12 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue mb-4 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-200">
          {icon}
        </div>
        <h3 className="font-display text-lg text-brand-blue mb-2">{title}</h3>
        <p className="text-sm text-foreground/60 leading-relaxed">{description}</p>
      </Link>
    </motion.div>
  );
}
