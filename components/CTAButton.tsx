'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const BOOKING_URL = 'https://app.squareup.com/appointments/book/3h4bcnk512pz19/LJ7P7KQK2FTA6/start';

export default function CTAButton({
  text = 'Book Now',
  variant = 'primary',
  className = '',
  showIcon = true,
}: {
  text?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  showIcon?: boolean;
}) {
  const base = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-display text-sm uppercase tracking-wider font-semibold transition-all duration-200 gloss-button';
  const variants = {
    primary: 'bg-brand-red text-white hover:bg-red-700 shadow-md hover:shadow-lg',
    secondary: 'bg-brand-gold text-brand-blue hover:bg-yellow-400 shadow-md hover:shadow-lg',
    outline: 'border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      <Link
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${variants[variant]} ${className}`}
      >
        {showIcon && <Calendar className="w-4 h-4" />}
        {text}
      </Link>
    </motion.div>
  );
}
