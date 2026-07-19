'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, CheckCircle } from 'lucide-react';
import { submitReview } from '@/lib/supabaseClient';

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating === 0) {
      setErrorMsg('Please select a rating');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const result = await submitReview({
      source: 'form',
      name: formData.get('name') as string,
      email: formData.get('email') as string || undefined,
      city: formData.get('city') as string || undefined,
      rating,
      service_type: formData.get('service_type') as string || undefined,
      review_text: formData.get('review_text') as string,
      contractor_name: formData.get('contractor_name') as string || undefined,
    });

    if (result.success) {
      setStatus('success');
      form.reset();
      setRating(0);
    } else {
      setStatus('error');
      setErrorMsg(result.error || 'Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="surface-elevated border border-brand-silver/20 rounded-lg p-8 text-center gleam"
      >
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="font-display text-xl text-brand-blue mb-2">Thank You!</h3>
        <p className="text-sm text-foreground/60">
          Your review has been submitted and will appear on our site after verification. We appreciate you taking the time to share your experience.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-brand-blue hover:text-brand-red transition-colors font-medium"
        >
          Submit Another Review
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="surface-elevated border border-brand-silver/20 rounded-lg p-6 sm:p-8 gleam">
      <h3 className="font-display text-xl text-brand-blue mb-6">Share Your Experience</h3>

      {/* Rating */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground/70 mb-2">Rating *</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-0.5"
            >
              <Star
                className={`w-7 h-7 transition-colors ${
                  star <= (hoverRating || rating)
                    ? 'fill-brand-gold text-brand-gold'
                    : 'text-brand-silver hover:text-brand-gold/50'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-4">
        <div>
          <label htmlFor="review-name" className="block text-sm font-medium text-foreground/70 mb-1">Name *</label>
          <input
            type="text"
            id="review-name"
            name="name"
            required
            className="w-full border border-brand-silver/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue transition-colors"
          />
        </div>
        <div>
          <label htmlFor="review-city" className="block text-sm font-medium text-foreground/70 mb-1">City</label>
          <input
            type="text"
            id="review-city"
            name="city"
            placeholder="e.g., Whitsett"
            className="w-full border border-brand-silver/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue transition-colors"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-4">
        <div>
          <label htmlFor="review-email" className="block text-sm font-medium text-foreground/70 mb-1">Email (optional)</label>
          <input
            type="email"
            id="review-email"
            name="email"
            className="w-full border border-brand-silver/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue transition-colors"
          />
        </div>
        <div>
          <label htmlFor="review-service" className="block text-sm font-medium text-foreground/70 mb-1">Service Type</label>
          <select
            id="review-service"
            name="service_type"
            className="w-full border border-brand-silver/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue transition-colors"
          >
            <option value="">Select service</option>
            <option value="repair">Garage Door Repair</option>
            <option value="installation">New Installation</option>
            <option value="opener">Opener Service</option>
            <option value="pressure_washing">Pressure Washing</option>
            <option value="screen_door">Screen Door</option>
            <option value="general">General</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="review-text" className="block text-sm font-medium text-foreground/70 mb-1">Your Review *</label>
        <textarea
          id="review-text"
          name="review_text"
          required
          rows={4}
          placeholder="Tell us about your experience..."
          className="w-full border border-brand-silver/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue transition-colors resize-none"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="review-contractor" className="block text-sm font-medium text-foreground/70 mb-1">Technician Name (optional)</label>
        <input
          type="text"
          id="review-contractor"
          name="contractor_name"
          className="w-full border border-brand-silver/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue transition-colors"
        />
      </div>

      {errorMsg && (
        <p className="text-sm text-brand-red mb-4">{errorMsg}</p>
      )}

      <motion.button
        type="submit"
        disabled={status === 'submitting'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-display text-sm uppercase tracking-wider font-semibold bg-brand-blue text-white hover:bg-blue-800 shadow-md hover:shadow-lg transition-all gloss-button disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        {status === 'submitting' ? 'Submitting...' : 'Submit Review'}
      </motion.button>

      <p className="text-xs text-foreground/40 mt-3">
        Reviews are verified before publishing. Your email is never displayed publicly.
      </p>
    </form>
  );
}
