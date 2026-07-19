import CouponCard from '@/components/CouponCard';
import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta({
  title: 'Coupons & Discounts',
  description: 'Save on garage door services in Whitsett, NC. Current coupons and discounts for repair, installation, and maintenance.',
  path: '/coupons',
});

const placeholderCoupons = [
  { title: '$50 Off Any Repair', description: 'Valid for any garage door repair service over $200.', code: 'REPAIR50', expiresAt: '2026-12-31' },
  { title: '10% Off Installation', description: 'Save on a new garage door installation. Includes labor and materials.', code: 'INSTALL10', expiresAt: '2026-12-31' },
  { title: 'Free Safety Inspection', description: 'Complimentary 21-point safety inspection with any service call.', code: 'SAFETY21', expiresAt: '2026-12-31' },
];

export default function CouponsPage() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="font-display text-4xl text-brand-blue uppercase mb-3">Coupons &amp; Discounts</h1>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            We believe in fair pricing — and a little savings never hurts. Use these offers when you book your next service.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {placeholderCoupons.map((coupon) => (
            <CouponCard key={coupon.code} {...coupon} />
          ))}
        </div>

        <div className="text-center">
          <p className="text-foreground/60 mb-4">Mention your coupon code when booking.</p>
          <CTAButton text="Book Now" variant="primary" />
        </div>
      </div>
    </section>
  );
}
