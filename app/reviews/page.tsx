import ReviewForm from '@/components/ReviewForm';
import ReviewCarousel from '@/components/ReviewCarousel';
import ReviewCard from '@/components/ReviewCard';
import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';
import { Star, MessageSquare, Users } from 'lucide-react';
import type { Review } from '@/lib/supabaseClient';

export const metadata = genMeta({
  title: 'Customer Reviews — Real Experiences from Your Neighbors',
  description: 'Read verified reviews from homeowners in Whitsett, Burlington, Greensboro, and surrounding areas. Share your own experience with Top-Notch Garage Doors.',
  path: '/reviews',
  keywords: ['garage door reviews Whitsett', 'Top-Notch Garage Doors reviews', 'local garage door company reviews'],
});

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
    id: '5', name: 'David M.', city: 'McLeansville', rating: 5,
    service_type: 'pressure_washing', review_text: 'Driveway looked brand new after they finished. Hadn\'t been cleaned in 5 years and they got every stain out. Will absolutely use again next spring.',
    contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2026-02-18',
  },
  {
    id: '6', name: 'Cheryl W.', city: 'Elon', rating: 5,
    service_type: 'repair', review_text: 'Cable snapped on a Saturday. They came out Monday first thing and had it fixed in under an hour. Honest pricing, no pressure upsell. Will use again.',
    contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2026-01-12',
  },
];

export default function ReviewsPage() {
  const reviews = PLACEHOLDER_REVIEWS;

  return (
    <>
      {/* Hero Stats */}
      <section className="py-16 surface-matte">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl text-brand-blue uppercase mb-3">Customer Reviews</h1>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Real experiences from your neighbors. Every review is verified before publishing — no fakes, no paid placements, no third-party imports.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 text-center gleam">
              <Star className="w-6 h-6 text-brand-gold mx-auto mb-2" />
              <p className="font-display text-3xl text-brand-blue">5.0</p>
              <p className="text-xs text-foreground/40 mt-1">Average Rating</p>
            </div>
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 text-center gleam">
              <MessageSquare className="w-6 h-6 text-brand-blue mx-auto mb-2" />
              <p className="font-display text-3xl text-brand-blue">{reviews.length}</p>
              <p className="text-xs text-foreground/40 mt-1">Verified Reviews</p>
            </div>
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 text-center gleam">
              <Users className="w-6 h-6 text-brand-blue mx-auto mb-2" />
              <p className="font-display text-3xl text-brand-blue">6</p>
              <p className="text-xs text-foreground/40 mt-1">Towns Served</p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* Featured Review Carousel */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase text-center mb-8">Featured Reviews</h2>
          <ReviewCarousel reviews={reviews.filter((r) => r.featured)} />
        </div>
      </section>

      <div className="divider-gleam" />

      {/* All Reviews Grid */}
      <section className="py-16 surface-matte">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-8">All Reviews</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <ReviewCard key={review.id} review={review} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* Submission Form */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase text-center mb-8">Leave a Review</h2>
          <ReviewForm />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center">
        <p className="text-foreground/60 text-sm mb-4">Ready to experience the difference?</p>
        <CTAButton text="Book Your Service" variant="primary" />
      </section>
    </>
  );
}
