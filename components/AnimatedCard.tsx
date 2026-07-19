'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function AnimatedCard({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,40,104,0.08)' }}
      className={`surface-elevated rounded-lg border border-brand-silver/20 gleam transition-colors ${className}`}
    >
      {children}
    </motion.div>
  );
}
