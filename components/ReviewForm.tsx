'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Upload, X, Camera, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';

const SERVICE_TYPES = [
  { value: '', label: 'Select a service...' },
  { value: 'repair', label: 'Garage Door Repair' },
  { value: 'installation', label: 'New Door Installation' },
  { value: 'opener', label: 'Opener Install / Repair' },
  { value: 'spring', label: 'Spring Replacement' },
  { value: 'maintenance', label: 'Tune-Up / Maintenance' },
  { value: 'screen_door', label: 'Garage Screen Door' },
  { value: 'pressure_washing', label: 'Pressure Washing' },
  { value: 'other', label: 'Other' },
];

type PhotoPreview = {
  file: File;
  url: string;
};

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [beforePhotos, setBeforePhotos] = useState<PhotoPreview[]>([]);
  const [afterPhotos, setAfterPhotos] = useState<PhotoPreview[]>([]);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);

  function addPhotos(files: FileList | null, type: 'before' | 'after') {
    if (!files) return;
    const setter = type === 'before' ? setBeforePhotos : setAfterPhotos;
    const current = type === 'before' ? beforePhotos : afterPhotos;
    const remaining = 3 - current.length;
    const newPhotos: PhotoPreview[] = [];

    for (let i = 0; i < Math.min(files.length, remaining); i++) {
      const file = files[i];
      if (file.size > 5 * 1024 * 1024) continue;
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) continue;
      newPhotos.push({ file, url: URL.createObjectURL(file) });
    }

    setter([...current, ...newPhotos]);
  }

  function removePhoto(type: 'before' | 'after', index: number) {
    const setter = type === 'before' ? setBeforePhotos : setAfterPhotos;
    const current = type === 'before' ? [...beforePhotos] : [...afterPhotos];
    URL.revokeObjectURL(current[index].url);
    current.splice(index, 1);
    setter(current);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating === 0) {
      setErrorMsg('Please select a star rating.');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData();

    formData.append('name', (form.elements.namedItem('name') as HTMLInputElement).value);
    formData.append('phone', (form.elements.namedItem('phone') as HTMLInputElement).value);
    formData.append('rating', String(rating));
    formData.append('review_text', (form.elements.namedItem('review_text') as HTMLTextAreaElement).value);

    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    if (email) formData.append('email', email);

    const city = (form.elements.namedItem('city') as HTMLInputElement).value;
    if (city) formData.append('city', city);

    const serviceType = (form.elements.namedItem('service_type') as HTMLSelectElement).value;
    if (serviceType) formData.append('service_type', serviceType);

    const jobDate = (form.elements.namedItem('job_date') as HTMLInputElement).value;
    if (jobDate) formData.append('job_date', jobDate);

    const captionBefore = (form.elements.namedItem('caption_before') as HTMLInputElement)?.value;
    if (captionBefore) formData.append('caption_before', captionBefore);

    const captionAfter = (form.elements.namedItem('caption_after') as HTMLInputElement)?.value;
    if (captionAfter) formData.append('caption_after', captionAfter);

    for (const photo of beforePhotos) {
      formData.append('photos_before', photo.file);
    }
    for (const photo of afterPhotos) {
      formData.append('photos_after', photo.file);
    }

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setStatus('sent');
        form.reset();
        setRating(0);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Something went wrong.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="surface-elevated border border-brand-silver/20 rounded-lg p-8 text-center gleam"
      >
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="font-display text-xl text-brand-blue mb-2">Thank You!</h3>
        <p className="text-sm text-foreground/60 mb-1">
          Your review has been submitted and will appear on our site after verification.
        </p>
        {(beforePhotos.length > 0 || afterPhotos.length > 0) && (
          <p className="text-sm text-foreground/50">
            Your before &amp; after photos will be featured in our portfolio once approved.
          </p>
        )}
        <button
          onClick={() => { setStatus('idle'); setBeforePhotos([]); setAfterPhotos([]); }}
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

      {/* Star Rating */}
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
              className="p-0.5 transition-transform hover:scale-110"
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
          {rating > 0 && (
            <span className="ml-2 text-sm text-foreground/40 self-center">
              {rating} star{rating !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Name + Phone */}
      <div className="grid gap-4 sm:grid-cols-2 mb-4">
        <div>
          <label htmlFor="review-name" className="block text-sm font-medium text-foreground/70 mb-1">Name *</label>
          <input
            type="text"
            id="review-name"
            name="name"
            required
            placeholder="John D."
            className="w-full border border-brand-silver/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue transition-colors"
          />
        </div>
        <div>
          <label htmlFor="review-phone" className="block text-sm font-medium text-foreground/70 mb-1">Phone *</label>
          <input
            type="tel"
            id="review-phone"
            name="phone"
            required
            placeholder="(336) 555-1234"
            className="w-full border border-brand-silver/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue transition-colors"
          />
        </div>
      </div>

      {/* Email + City */}
      <div className="grid gap-4 sm:grid-cols-2 mb-4">
        <div>
          <label htmlFor="review-email" className="block text-sm font-medium text-foreground/70 mb-1">
            Email <span className="text-foreground/30">(optional)</span>
          </label>
          <input
            type="email"
            id="review-email"
            name="email"
            placeholder="john@example.com"
            className="w-full border border-brand-silver/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue transition-colors"
          />
        </div>
        <div>
          <label htmlFor="review-city" className="block text-sm font-medium text-foreground/70 mb-1">
            City <span className="text-foreground/30">(optional)</span>
          </label>
          <input
            type="text"
            id="review-city"
            name="city"
            placeholder="Burlington, NC"
            className="w-full border border-brand-silver/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue transition-colors"
          />
        </div>
      </div>

      {/* Service Type + Job Date */}
      <div className="grid gap-4 sm:grid-cols-2 mb-4">
        <div>
          <label htmlFor="review-service" className="block text-sm font-medium text-foreground/70 mb-1">
            Service Type <span className="text-foreground/30">(optional)</span>
          </label>
          <select
            id="review-service"
            name="service_type"
            className="w-full border border-brand-silver/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue transition-colors"
          >
            {SERVICE_TYPES.map((st) => (
              <option key={st.value} value={st.value}>{st.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="review-date" className="block text-sm font-medium text-foreground/70 mb-1">
            Service Date <span className="text-foreground/30">(optional)</span>
          </label>
          <input
            type="date"
            id="review-date"
            name="job_date"
            className="w-full border border-brand-silver/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue transition-colors"
          />
        </div>
      </div>

      {/* Review Text */}
      <div className="mb-4">
        <label htmlFor="review-text" className="block text-sm font-medium text-foreground/70 mb-1">Your Review *</label>
        <textarea
          id="review-text"
          name="review_text"
          required
          rows={4}
          maxLength={2000}
          placeholder="Tell us about your experience..."
          className="w-full border border-brand-silver/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue transition-colors resize-y"
        />
      </div>

      {/* Photo Upload Section */}
      <div className="border border-brand-silver/20 rounded-lg p-4 sm:p-5 mb-6 bg-brand-blue/[0.02]">
        <div className="flex items-center gap-2 mb-3">
          <Camera className="w-5 h-5 text-brand-blue" />
          <h4 className="font-display text-sm text-brand-blue uppercase tracking-wider">
            Before &amp; After Photos
          </h4>
          <span className="text-xs text-foreground/30">(optional)</span>
        </div>
        <p className="text-xs text-foreground/50 mb-4">
          Share before and after photos of your project. Up to 3 photos each, max 5MB per image (JPG, PNG, or WebP).
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Before Photos */}
          <div>
            <label className="block text-xs font-display uppercase tracking-wider text-foreground/50 mb-2">Before</label>
            <div className="space-y-2">
              {beforePhotos.map((photo, i) => (
                <div key={i} className="relative group rounded-lg overflow-hidden border border-brand-silver/20">
                  <Image src={photo.url} alt={`Before photo ${i + 1}`} width={300} height={200} className="w-full h-24 object-cover" unoptimized />
                  <button
                    type="button"
                    onClick={() => removePhoto('before', i)}
                    className="absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              ))}
              {beforePhotos.length < 3 && (
                <button
                  type="button"
                  onClick={() => beforeInputRef.current?.click()}
                  className="w-full h-24 border-2 border-dashed border-brand-silver/30 rounded-lg flex flex-col items-center justify-center gap-1 text-foreground/30 hover:border-brand-blue/40 hover:text-brand-blue/60 transition-colors"
                >
                  <Upload className="w-5 h-5" />
                  <span className="text-xs">Add before photo</span>
                </button>
              )}
              <input
                ref={beforeInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={(e) => { addPhotos(e.target.files, 'before'); e.target.value = ''; }}
              />
            </div>
            <input
              name="caption_before"
              type="text"
              placeholder="Before caption (optional)"
              className="mt-2 w-full px-3 py-1.5 rounded border border-brand-silver/20 text-xs focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>

          {/* After Photos */}
          <div>
            <label className="block text-xs font-display uppercase tracking-wider text-foreground/50 mb-2">After</label>
            <div className="space-y-2">
              {afterPhotos.map((photo, i) => (
                <div key={i} className="relative group rounded-lg overflow-hidden border border-brand-silver/20">
                  <Image src={photo.url} alt={`After photo ${i + 1}`} width={300} height={200} className="w-full h-24 object-cover" unoptimized />
                  <button
                    type="button"
                    onClick={() => removePhoto('after', i)}
                    className="absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              ))}
              {afterPhotos.length < 3 && (
                <button
                  type="button"
                  onClick={() => afterInputRef.current?.click()}
                  className="w-full h-24 border-2 border-dashed border-brand-silver/30 rounded-lg flex flex-col items-center justify-center gap-1 text-foreground/30 hover:border-brand-blue/40 hover:text-brand-blue/60 transition-colors"
                >
                  <Upload className="w-5 h-5" />
                  <span className="text-xs">Add after photo</span>
                </button>
              )}
              <input
                ref={afterInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={(e) => { addPhotos(e.target.files, 'after'); e.target.value = ''; }}
              />
            </div>
            <input
              name="caption_after"
              type="text"
              placeholder="After caption (optional)"
              className="mt-2 w-full px-3 py-1.5 rounded border border-brand-silver/20 text-xs focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {(status === 'error' || errorMsg) && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {errorMsg || 'Something went wrong. Please try again.'}
        </div>
      )}

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-display text-sm uppercase tracking-wider font-semibold bg-brand-blue text-white hover:bg-blue-800 shadow-md hover:shadow-lg transition-all gloss-button disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Review'
        )}
      </motion.button>

      <p className="text-xs text-foreground/40 mt-3">
        By submitting, you agree that your review and photos may be published on our website.
        Your phone and email are never shared publicly.
      </p>
    </form>
  );
}
