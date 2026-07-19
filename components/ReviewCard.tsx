'use client';

import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';
import type { Review } from '@/lib/supabaseClient';

export default function ReviewCard({ review, delay = 0 }: { review: Review; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam"
    >
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < review.rating ? 'fill-brand-gold text-brand-gold' : 'text-brand-silver'}`}
          />
        ))}
      </div>
      <p className="text-sm text-foreground/70 leading-relaxed mb-4 line-clamp-4">
        &ldquo;{review.review_text}&rdquo;
      </p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground/80">{review.name}</p>
          {review.city && (
            <p className="flex items-center gap-1 text-xs text-foreground/40 mt-0.5">
              <MapPin className="w-3 h-3" /> {review.city}, NC
            </p>
          )}
        </div>
        {review.service_type && (
          <span className="text-xs px-2 py-0.5 bg-brand-blue/5 text-brand-blue rounded-full capitalize">
            {review.service_type.replace('_', ' ')}
          </span>
        )}
      </div>
    </motion.div>
  );
}
