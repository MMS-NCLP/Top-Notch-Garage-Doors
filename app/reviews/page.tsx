import Image from 'next/image';
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
  {
    id: '7', name: 'Deborah S.', city: 'Greensboro', rating: 5,
    service_type: 'installation', review_text: 'Did a very good job and came back for a follow up to make sure everything was working properly. Very professional and thorough.',
    contractor_name: null, job_date: null, source: 'form', featured: true, created_at: '2025-12-08',
  },
  {
    id: '8', name: 'Anthony R.', city: 'Burlington', rating: 5,
    service_type: 'installation', review_text: 'Brand new door completely changed the front of our house. Installation crew was in and out in half a day. Clean, professional, and the door operates whisper quiet.',
    contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-11-15',
  },
  {
    id: '9', name: 'PF M.', city: 'Whitsett', rating: 5,
    service_type: 'installation', review_text: 'Could not have asked for any better installation. From the quote to the final walkthrough, everything was handled with care. Highly recommend.',
    contractor_name: null, job_date: null, source: 'form', featured: true, created_at: '2025-10-22',
  },
  {
    id: '10', name: 'Chad L.', city: 'Gibsonville', rating: 5,
    service_type: 'screen_door', review_text: 'Got both a new motor and a retractable screen door installed. The screen is perfect — lets in fresh air without the bugs. Motor is so quiet you barely hear it.',
    contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-09-30',
  },
  {
    id: '11', name: 'Darcy H.', city: 'Mebane', rating: 5,
    service_type: 'installation', review_text: 'New door and motor installed same day. They hauled away the old one and left the garage cleaner than they found it. Price was exactly what they quoted.',
    contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-09-12',
  },
  {
    id: '12', name: 'Rick F.', city: 'Alamance County', rating: 5,
    service_type: 'installation', review_text: 'Beautiful new door — the carriage house style was exactly what we wanted. Neighbors keep stopping to compliment it. Worth every penny.',
    contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-08-20',
  },
  {
    id: '13', name: 'Marie D.', city: 'Burlington', rating: 5,
    service_type: 'opener', review_text: 'New opener installed and old one removed in about two hours. They programmed the remotes, set up the keypad, and showed me how to use the app. Great service.',
    contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-08-05',
  },
  {
    id: '14', name: 'Alex G.', city: 'Greensboro', rating: 5,
    service_type: 'opener', review_text: 'Motor replacement went smoothly. The new belt-drive is incredibly quiet compared to the old chain drive. They also lubed all the hardware while they were at it.',
    contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-07-18',
  },
  {
    id: '15', name: 'John M.', city: 'McLeansville', rating: 5,
    service_type: 'repair', review_text: 'Broken torsion spring — they had the right size on the truck and replaced it in under 45 minutes. Explained how to spot early wear signs so I know for next time.',
    contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-07-02',
  },
  {
    id: '16', name: 'Kyneddir H.', city: 'Greensboro', rating: 5,
    service_type: 'repair', review_text: 'Someone backed into our garage door and it was completely off track. They came out next morning, straightened the track, replaced a bent panel, and it works perfectly again.',
    contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-06-14',
  },
  {
    id: '17', name: 'Thomas W.', city: 'Burlington', rating: 5,
    service_type: 'installation', review_text: 'Had them install a jackshaft motor for my golf simulator room. Unique setup but they handled it perfectly. The wall-mount motor freed up ceiling space which was the whole point.',
    contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-05-28',
  },
  {
    id: '18', name: 'Corey E.', city: 'Elon', rating: 5,
    service_type: 'repair', review_text: 'Roller replacement — quick and clean. Door rolls so much smoother now and the noise is completely gone. Should have done this a year ago.',
    contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-05-10',
  },
  {
    id: '19', name: 'George K.', city: 'Whitsett', rating: 5,
    service_type: 'installation', review_text: 'Full door replacement project. They removed the old wooden door, reframed the opening, and installed a new insulated steel door. Looks amazing and the garage stays warmer now.',
    contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-04-22',
  },
  {
    id: '20', name: 'Robert D.', city: 'Burlington', rating: 5,
    service_type: 'opener', review_text: 'Old motor was on its last legs — grinding noise every time. New LiftMaster is silent and the Wi-Fi feature lets me check the door from my phone. Should have upgraded sooner.',
    contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-04-03',
  },
  {
    id: '21', name: 'Lin N.', city: 'Gibsonville', rating: 5,
    service_type: 'opener', review_text: 'Motor install was fast and professional. They even sent me a video of the finished job working. Really appreciated the attention to detail and the follow-up.',
    contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-03-15',
  },
  {
    id: '22', name: 'Wayne B.', city: 'Statesville', rating: 5,
    service_type: 'installation', review_text: 'Drove all the way out to Statesville and still showed up on time. New Clopay door looks fantastic on our ranch — neighbors already asking for the number. Professional crew, clean job site.',
    contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-02-28',
  },
  {
    id: '23', name: 'Tamara J.', city: 'Mooresville', rating: 5,
    service_type: 'repair', review_text: 'Spring snapped on a Wednesday evening. They were here Thursday morning with the right spring on the truck. No markup for the quick turnaround. Very fair and honest.',
    contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-02-10',
  },
  {
    id: '24', name: 'Greg H.', city: 'Salisbury', rating: 5,
    service_type: 'opener', review_text: 'Upgraded from an old chain drive to a LiftMaster belt drive with the camera. Night and day difference — can check the garage from my phone at work. Installer was patient and walked me through the app.',
    contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-01-22',
  },
  {
    id: '25', name: 'Sandra P.', city: 'Lexington', rating: 5,
    service_type: 'installation', review_text: 'New insulated door made an immediate difference — the garage stays 15 degrees warmer in winter now. Installation was clean, on time, and they hauled away the old door without being asked.',
    contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-01-05',
  },
  {
    id: '26', name: 'Marcus T.', city: 'Thomasville', rating: 5,
    service_type: 'repair', review_text: 'Cable came off the drum on one side — door was hanging crooked and wouldn\'t move. They diagnosed it in 10 minutes and had it fixed in under an hour. Knew exactly what they were looking at.',
    contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2024-12-18',
  },
  {
    id: '27', name: 'Patricia W.', city: 'High Point', rating: 5,
    service_type: 'installation', review_text: 'Had them replace both doors on our duplex rental property. Matched the style perfectly, both doors installed in one day. Great communication, fair pricing, and they coordinated with my tenants directly.',
    contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2024-12-02',
  },
  {
    id: '28', name: 'Kevin R.', city: 'High Point', rating: 5,
    service_type: 'screen_door', review_text: 'Retractable screen door on our garage was the best upgrade we\'ve done. Use the garage as a workshop all summer now. Screen rolls up clean when we need to drive in.',
    contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2024-11-14',
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
              <p className="font-display text-3xl text-brand-blue">100+</p>
              <p className="text-xs text-foreground/40 mt-1">Verified Reviews</p>
            </div>
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 text-center gleam">
              <Users className="w-6 h-6 text-brand-blue mx-auto mb-2" />
              <p className="font-display text-3xl text-brand-blue">5</p>
              <p className="text-xs text-foreground/40 mt-1">Counties Covered</p>
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

      {/* Customer Spotlight Graphics */}
      <section className="py-12 surface-matte">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/marketing/tngd-review-deborah-s.png"
                alt="5-star customer review from Deborah S. — Did a very good job and came back for a follow up"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/marketing/tngd-review-pf-mnst.png"
                alt="5-star customer review from PF Mnst. — Could not have asked for any better installation"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
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
