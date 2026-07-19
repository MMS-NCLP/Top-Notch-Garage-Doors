'use client';

import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';
import CTAButton from './CTAButton';

export default function CouponCard({
  title,
  description,
  code,
  expiresAt,
}: {
  title: string;
  description: string;
  code: string;
  expiresAt: string;
}) {
  const expDate = new Date(expiresAt).toLocaleDateString('en-US', {
    month: 'short',
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
      className="surface-elevated border-2 border-dashed border-brand-gold rounded-lg p-6 text-center gleam"
    >
      <Tag className="w-6 h-6 text-brand-gold mx-auto mb-3" />
      <h3 className="font-display text-xl text-brand-blue mb-2">{title}</h3>
      <p className="text-sm text-foreground/60 mb-4">{description}</p>
      <div className="inline-block bg-brand-gold/10 border border-brand-gold rounded px-4 py-2 mb-4">
        <span className="font-mono text-lg font-bold text-brand-blue">{code}</span>
      </div>
      <p className="text-xs text-foreground/40 mb-4">Expires {expDate}</p>
      <CTAButton text="Use This Offer" variant="primary" />
    </motion.div>
  );
}
