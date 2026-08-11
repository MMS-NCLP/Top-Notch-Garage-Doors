import Image from 'next/image';
import CouponCard from '@/components/CouponCard';
import CTAButton from '@/components/CTAButton';
import PrintButton from '@/components/PrintButton';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta({
  title: 'Coupons & Promotions — Save on Garage Door Services',
  description: 'Official coupons and promotions from Top-Notch Garage Doors. Save on installations, repairs, openers, and maintenance in the Piedmont Triad, NC.',
  path: '/coupons',
  keywords: ['garage door coupons NC', 'garage door discounts Piedmont Triad', 'Top-Notch Garage Doors promotions'],
});

const promotions = [
  {
    title: 'Spring Replacement — BOGO',
    value: '50% OFF',
    subtitle: '2nd Spring Half Price',
    description: 'Buy one spring, get the second at half price. Includes 5-year extended warranty on both springs — most competitors offer one year.',
    code: 'TNGD-BOGO5YR',
    terms: 'Valid on torsion or extension spring replacement. Covers up to two springs on the same door. Includes 5-year total warranty (parts and labor). Does not apply to emergency after-hours surcharge.',
    image: '/images/portfolio/springs/new-torsion-springs-installed-header-wide-nc.jpg',
    overlay: 'red' as const,
    review: {
      text: 'Spring broke at 7am, they were here by noon. Fair price, clean work, explained everything. Exactly what you want from a local company.',
      author: 'Mike T., Whitsett NC',
    },
  },
  {
    title: 'Lube & Tune Special',
    value: '$79',
    subtitle: 'Normally $129',
    description: 'Complete 21-point garage door tune-up: lubrication, balance check, safety inspection, and hardware tightening.',
    code: 'TNGD-TUNE79',
    terms: 'Regular price $129. Coupon price $79. Must present coupon before service begins.',
    image: '/images/portfolio/installations/clopay-door-interior-windows-tracks-nc.jpg',
    overlay: 'blue' as const,
    review: {
      text: 'Very professional and knowledgeable. Took the time to explain everything. Door runs smooth and quiet now.',
      author: 'Deborah S., Burlington NC',
    },
  },
  {
    title: 'Emergency Service',
    value: '$50 OFF',
    subtitle: 'Same-Day Calls',
    description: 'Save $50 on any emergency or same-day service call. Because emergencies don\'t wait — and neither should your savings.',
    code: 'TNGD-URGENT50',
    terms: 'Valid on emergency and same-day service calls only. Applied to total service invoice after parts and labor. Cannot be combined with spring replacement coupon.',
    image: '/images/hero/emergency-crashed-garage-door-nc.jpg',
    overlay: 'red' as const,
  },
  {
    title: 'Door Sale — Single',
    value: '$79 OFF',
    subtitle: 'Any Style, Any Color',
    description: 'Save $79 on any single-size garage door purchase. Raised panel, carriage house, flush, modern — all styles included.',
    code: 'TNGD-SINGLE79',
    terms: 'Valid on any single-width garage door purchased through Top-Notch Garage Doors. Installation labor not included unless bundled.',
    image: '/images/portfolio/door-styles/single-car-door-brick-home-gym-nc.jpg',
    overlay: 'blue' as const,
  },
  {
    title: 'Door Sale — Double',
    value: '$125 OFF',
    subtitle: 'Upgrade Your Curb Appeal',
    description: 'Save $125 on any double-size garage door. The biggest impact for the best price.',
    code: 'TNGD-DOUBLE125',
    terms: 'Valid on any double-width garage door purchased through Top-Notch Garage Doors. Installation labor not included unless bundled.',
    image: '/images/portfolio/door-styles/carriage-house-door-dusk-lighting-nc.jpg',
    overlay: 'blue' as const,
    review: {
      text: 'Night and day difference. The new door completely transformed the front of our house. Neighbors keep asking who did the work.',
      author: 'Patricia F., Mebane NC',
    },
  },
  {
    title: 'Insulation Upgrade',
    value: '$200 OFF',
    subtitle: 'R-16 or Higher',
    description: 'Save $200 on any R-16+ insulated garage door. Cut energy costs and keep your garage comfortable year-round.',
    code: 'TNGD-INSUL200',
    terms: 'Valid on purchase of any garage door rated R-16 or above. Applies to door purchase only — installation labor quoted separately unless bundled. One coupon per door. Cannot be combined with other door sale coupons.',
    image: '/images/hero/grand-harbor-premium-door-nc.jpg',
    overlay: 'blue' as const,
  },
  {
    title: 'Weatherseal — Single Door',
    value: 'SAVE $29',
    subtitle: 'Full Perimeter Package',
    description: 'Complete weatherseal package for single doors: vinyl trim on all sides plus bottom rubber seal replacement.',
    code: 'TNGD-SEAL29',
    terms: 'Includes vinyl trim and bottom rubber for one single-width door. Additional doors quoted separately.',
    image: '/images/portfolio/installations/raised-panel-door-completed-exterior-gray-siding-nc.jpg',
    overlay: 'blue' as const,
  },
  {
    title: 'Weatherseal — Double Door',
    value: 'SAVE $69',
    subtitle: 'Full Perimeter Package',
    description: 'Complete weatherseal package for double doors: full perimeter vinyl trim plus heavy-duty bottom rubber seal.',
    code: 'TNGD-SEAL69',
    terms: 'Includes vinyl trim and bottom rubber for one double-width door. Additional doors quoted separately.',
    image: '/images/portfolio/installations/raised-panel-two-bay-completed-exterior-nc.jpg',
    overlay: 'blue' as const,
  },
  {
    title: 'Veteran & First Responder',
    value: '10% OFF',
    subtitle: 'Thank You For Your Service',
    description: 'All active-duty military, veterans, police, fire, and EMS receive 10% off any service.',
    code: 'TNGD-HERO10',
    terms: 'Must present valid military ID, DD-214, VA card, or department-issued ID at time of service. Applies to labor and parts on any service call.',
    image: '/images/hero/screen-door-brick-american-flag-hero-nc.jpg',
    overlay: 'red' as const,
  },
  {
    title: 'Healthcare Workers',
    value: '10% OFF',
    subtitle: 'We Appreciate Your Care',
    description: 'All hospital and healthcare workers receive 10% off any service. Because you take care of us — we take care of you.',
    code: 'TNGD-CARE10',
    terms: 'Must present valid hospital or healthcare employer ID badge at time of service. Applies to labor and parts on any service call.',
    image: '/images/portfolio/installations/craftsman-raised-panel-7-windows-exterior-nc.jpg',
    overlay: 'blue' as const,
  },
  {
    title: 'Refer a Neighbor',
    value: '15% OFF',
    subtitle: 'Both Parties Save',
    description: 'Refer a friend or neighbor to Top-Notch. When they complete service, you both receive 15% off your next visit.',
    code: 'TNGD-REFER15',
    terms: 'Referring customer must be a previous Top-Notch customer. New customer must mention referrer at time of booking. Door and motor sales excluded. Cannot be combined with other offers. Limit three referral credits per household per calendar year.',
    image: '/images/portfolio/installations/townhouse-multi-unit-all-doors-tngd-truck-after-nc.jpg',
    overlay: 'blue' as const,
    review: {
      text: 'Already referred two neighbors. Both called and said they had the same great experience. That says everything.',
      author: 'James R., Greensboro NC',
    },
  },
];

const expiresAt = '2027-12-31';

export default function CouponsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 surface-matte print:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h1 className="font-hero text-4xl text-brand-blue mb-3">Coupons &amp; Promotions</h1>
            <p className="text-foreground/60 max-w-sm mx-auto">
              Official offers from Top-Notch Garage Doors. Print or screenshot your coupon and present at time of service.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-foreground/40 print:hidden">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>All coupons active — Expires December 31, 2027</span>
          </div>
        </div>
      </section>

      {/* Print button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 print:hidden">
        <PrintButton />
      </div>

      {/* Coupon Grid */}
      <section className="py-8 print:py-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 print:gap-2 print:grid-cols-1">
            {promotions.map((promo) => (
              <CouponCard key={promo.code} {...promo} expiresAt={expiresAt} />
            ))}
          </div>
        </div>
      </section>

      {/* General Terms */}
      <section className="py-8 print:py-2">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-brand-silver/30 rounded-sm p-6 bg-gray-50 print:border-gray-300">
            <h2 className="font-display text-sm text-brand-blue uppercase mb-3">General Terms &amp; Conditions</h2>
            <ul className="text-[11px] text-foreground/50 space-y-1.5 leading-relaxed">
              <li>&bull; Limit one (1) coupon honored per household per service visit.</li>
              <li>&bull; Coupons cannot be combined with any other offer, promotion, or discount unless explicitly stated. No coupon stacking — only one (1) coupon may be applied per service or transaction.</li>
              <li>&bull; Must present coupon (printed or digital screenshot) at time of service before work begins.</li>
              <li>&bull; Valid only within the Top-Notch Garage Doors service area: Guilford, Alamance, Rockingham, Caswell, Randolph, and surrounding NC counties.</li>
              <li>&bull; All coupons expire December 31, 2027. No extensions will be granted past expiration date.</li>
              <li>&bull; Top-Notch Garage Doors reserves the right to modify or discontinue any promotion without prior notice.</li>
              <li>&bull; Coupons have no cash value and are non-transferable.</li>
              <li>&bull; Void where prohibited by law.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center print:hidden">
        <p className="text-foreground/60 mb-4">Ready to save? Mention your coupon code when booking.</p>
        <CTAButton text="Book Now & Save" variant="primary" />
      </section>
    </>
  );
}
