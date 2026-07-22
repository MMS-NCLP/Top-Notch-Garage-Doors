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
    title: 'Door Sale — Single Door',
    value: '$79 OFF',
    description: 'Save $79 on any single-size garage door purchase. All styles, all colors.',
    code: 'TNGD-SINGLE79',
    terms: 'Valid on any single-width garage door purchase. Installation labor not included unless bundled.',
  },
  {
    title: 'Door Sale — Double Door',
    value: '$125 OFF',
    description: 'Save $125 on any double-size garage door. Upgrade your curb appeal for less.',
    code: 'TNGD-DOUBLE125',
    terms: 'Valid on any double-width garage door purchase. Installation labor not included unless bundled.',
  },
  {
    title: 'Lube & Tune — Standard',
    value: '$79',
    description: 'Complete 21-point garage door tune-up: lubrication, balance check, safety inspection, and hardware tightening. Normally $129.',
    code: 'TNGD-TUNE79',
    terms: 'Regular price $129. Coupon price $79. Physical mailer or printed coupon must be presented at time of service. Digital screenshots not accepted for this offer.',
  },
  {
    title: 'Keypad + Tune-Up Special',
    value: '$129',
    description: 'Purchase a wireless keypad entry system and receive a full tune-up service completely free.',
    code: 'TNGD-KEYPAD129',
    terms: 'Includes wireless keypad installation and standard tune-up service. Keypad model subject to availability.',
  },
  {
    title: 'Weatherseal Bundle — Single',
    value: 'SAVE $29',
    description: 'Complete weatherseal package for single doors: vinyl trim on all sides plus bottom rubber seal replacement.',
    code: 'TNGD-SEAL29',
    terms: 'Includes vinyl trim and bottom rubber for one single-width door. Additional doors quoted separately.',
  },
  {
    title: 'Weatherseal Bundle — Double',
    value: 'SAVE $69',
    description: 'Complete weatherseal package for double doors: full perimeter vinyl trim plus heavy-duty bottom rubber seal.',
    code: 'TNGD-SEAL69',
    terms: 'Includes vinyl trim and bottom rubber for one double-width door. Additional doors quoted separately.',
  },
  {
    title: 'Veteran Discount',
    value: '10% OFF',
    description: 'Thank you for your service. All active-duty military and veterans receive 10% off any service.',
    code: 'TNGD-VET10',
    terms: 'Must present valid military ID, DD-214, or VA card at time of service. Applies to labor and parts on any service call. One discount per household per visit.',
  },
  {
    title: 'Healthcare Workers Discount',
    value: '10% OFF',
    description: 'We appreciate those who care for our community. All hospital and healthcare workers receive 10% off any service.',
    code: 'TNGD-HEALTH10',
    terms: 'Must present valid hospital or healthcare employer ID badge at time of service. Applies to labor and parts on any service call. One discount per household per visit.',
  },
  {
    title: 'Block Party — Neighbor Discount',
    value: '15% OFF',
    description: '2 or more households on the same street booking together each receive 15% off service. Rally your neighbors and save.',
    code: 'TNGD-BLOCK15',
    terms: 'Valid for service calls only — does not apply to new door or motor installations. Each participating household must present their own coupon. Limit one (1) coupon per household. All participating households must be located on the same street and schedule service within the same 7-day window. Discount applied to labor only, not parts. Cannot be combined with any other offer.',
  },
  {
    title: 'Winter Insulation Upgrade',
    value: '$200 OFF',
    description: 'Save $200 on any R-16 or higher insulated garage door. Cut energy costs and keep your garage comfortable year-round.',
    code: 'TNGD-INSUL200',
    terms: 'Valid on purchase of any garage door rated R-16 or above. Applies to door purchase only — installation labor quoted separately unless bundled. One coupon per door. Must present coupon before order is placed. Cannot be combined with other door sale coupons.',
  },
];

const expiresAt = '2027-07-22';

export default function CouponsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 surface-matte print:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h1 className="font-hero text-4xl text-brand-blue mb-3">Coupons & Promotions</h1>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Official offers from Top-Notch Garage Doors. Print or screenshot your coupon and present at time of service.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-foreground/40 print:hidden">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>All coupons active — Expires July 22, 2027</span>
          </div>
        </div>
      </section>

      {/* Print button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 print:hidden">
        <PrintButton />
      </div>

      {/* Coupon Grid */}
      <section className="py-8 print:py-0">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 print:gap-2">
            {promotions.map((promo) => (
              <CouponCard key={promo.code} {...promo} expiresAt={expiresAt} />
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Sticker */}
      <section className="py-12 surface-matte print:hidden">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/marketing/tngd-emergency-service-sticker.png"
              alt="Top-Notch Garage Doors emergency service sticker — 12% off annual tune-up"
              fill
              sizes="(max-width: 640px) 100vw, 512px"
              className="object-cover"
            />
          </div>
          <p className="text-center text-xs text-foreground/40 mt-3">
            Show this sticker at your appointment for 12% off your tune-up.
          </p>
        </div>
      </section>

      {/* General Terms */}
      <section className="py-8 print:py-2">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-brand-silver/30 rounded-sm p-6 bg-gray-50 print:border-gray-300">
            <h2 className="font-display text-sm text-brand-blue uppercase mb-3">General Terms & Conditions</h2>
            <ul className="text-[11px] text-foreground/50 space-y-1.5 leading-relaxed">
              <li>• Limit one (1) coupon honored per household per service visit.</li>
              <li>• Coupons cannot be combined with any other offer, promotion, or discount unless explicitly stated. No coupon stacking — only one (1) coupon may be applied per service or transaction.</li>
              <li>• Must present coupon (printed or digital screenshot) at time of service before work begins.</li>
              <li>• Valid only within the Top-Notch Garage Doors service area: Guilford, Alamance, Rockingham, Caswell, Randolph, and surrounding NC counties.</li>
              <li>• All coupons expire July 22, 2027. No extensions will be granted past expiration date.</li>
              <li>• Top-Notch Garage Doors reserves the right to modify or discontinue any promotion without prior notice.</li>
              <li>• Coupons have no cash value and are non-transferable.</li>
              <li>• Void where prohibited by law.</li>
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
