'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Review } from '@/lib/supabaseClient';

const PLACEHOLDER_REVIEWS: Review[] = [
  {
    id: '1', name: 'Mike T.', city: 'Whitsett', rating: 5,
    service_type: 'repair', review_text: 'Spring broke at 7am, they were here by noon. Fair price, clean work, explained everything. Exactly what you want from a local company.',
    contractor_name: null, job_date: null, source: 'form', featured: true, created_at: '2026-06-15',
  },
  {
    id: '2', name: 'Sarah K.', city: 'Burlington', rating: 5,
    service_type: 'installation', review_text: 'New door looks incredible. They helped us pick the right style for our house and the installation was spotless. Neighbors have already asked who did it.',
    contractor_name: null, job_date: null, source: 'form', featured: true, created_at: '2026-05-20',
  },
  {
    id: '3', name: 'James R.', city: 'Greensboro', rating: 5,
    service_type: 'opener', review_text: 'Upgraded to a LiftMaster with the camera. Setup was seamless, they connected it to my phone, showed me everything. Now I can see my garage from work.',
    contractor_name: null, job_date: null, source: 'form', featured: true, created_at: '2026-04-10',
  },
  {
    id: '4', name: 'Linda P.', city: 'Gibsonville', rating: 5,
    service_type: 'screen_door', review_text: 'The retractable screen turned our garage into a second living room. Kids play there all summer now without the bugs. Best home improvement we\'ve done.',
    contractor_name: null, job_date: null, source: 'form', featured: true, created_at: '2026-03-22',
  },
  {
    id: '5', name: 'Patricia W.', city: 'High Point', rating: 5,
    service_type: 'installation', review_text: 'Had them replace both doors on our duplex rental property. Matched the style perfectly, both doors installed in one day. Great communication and fair pricing.',
    contractor_name: null, job_date: null, source: 'form', featured: true, created_at: '2024-12-02',
  },
  {
    id: '6', name: 'Wayne B.', city: 'Statesville', rating: 5,
    service_type: 'installation', review_text: 'Drove all the way out to Statesville and still showed up on time. New Clopay door looks fantastic on our ranch. Professional crew, clean job site.',
    contractor_name: null, job_date: null, source: 'form', featured: true, created_at: '2025-02-28',
  },
];

export default function ReviewCarousel({ reviews }: { reviews?: Review[] }) {
  const items = reviews && reviews.length > 0 ? reviews : PLACEHOLDER_REVIEWS;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [items.length]);

  const review = items[current];

  return (
    <div className="relative max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={review.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center px-8"
        >
          <div className="flex items-center justify-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < review.rating ? 'fill-brand-gold text-brand-gold' : 'text-brand-silver'}`}
              />
            ))}
          </div>
          <p className="text-lg text-foreground/70 leading-relaxed mb-4 italic">
            &ldquo;{review.review_text}&rdquo;
          </p>
          <p className="font-medium text-foreground/80">{review.name}</p>
          {review.city && (
            <p className="flex items-center justify-center gap-1 text-sm text-foreground/40 mt-1">
              <MapPin className="w-3 h-3" /> {review.city}, NC
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + items.length) % items.length)}
          className="p-1.5 rounded-full bg-brand-blue/5 hover:bg-brand-blue/10 text-brand-blue transition-colors"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-brand-blue' : 'bg-brand-silver'}`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % items.length)}
          className="p-1.5 rounded-full bg-brand-blue/5 hover:bg-brand-blue/10 text-brand-blue transition-colors"
          aria-label="Next review"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
