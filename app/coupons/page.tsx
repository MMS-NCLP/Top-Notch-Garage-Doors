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
    title: 'Door + Motor Bundle',
    value: '$399 VALUE',
    description: 'Buy any fully insulated door and get a 1/2 HP belt-drive motor with 2 remotes for just $199.',
    code: 'TNGD-BUNDLE399',
    terms: 'Motor upgrade is a 1/2 HP belt-drive with 2 remotes. Must purchase fully insulated door to qualify. Cannot be combined with other motor promotions.',
  },
  {
    title: 'Motor + Roller Bundle',
    value: '$249 VALUE',
    description: 'All Elite Series motors include a free set of long-stem 10-point ball bearing nylon rollers for ultra-quiet performance.',
    code: 'TNGD-ELITE249',
    terms: 'Applies to Elite Series motor purchases only. Nylon roller set included at no additional charge with qualifying motor installation.',
  },
  {
    title: 'Lube & Tune — Standard',
    value: '$69',
    description: 'Complete 21-point garage door tune-up: lubrication, balance check, safety inspection, and hardware tightening.',
    code: 'TNGD-TUNE69',
    terms: 'Physical mailer or printed coupon must be presented at time of service. Digital screenshots not accepted for this offer.',
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
    value: '$199',
    description: 'Complete weatherseal package for single doors: vinyl trim on all sides plus bottom rubber seal replacement.',
    code: 'TNGD-SEAL199',
    terms: 'Includes vinyl trim and bottom rubber for one single-width door. Additional doors quoted separately.',
  },
  {
    title: 'Weatherseal Bundle — Double',
    value: '$299',
    description: 'Complete weatherseal package for double doors: full perimeter vinyl trim plus heavy-duty bottom rubber seal.',
    code: 'TNGD-SEAL299',
    terms: 'Includes vinyl trim and bottom rubber for one double-width door. Additional doors quoted separately.',
  },
  {
    title: 'Elite Motor + Surge Protector',
    value: '$69 FREE',
    description: 'Buy any Elite Series motor and receive a surge protector free — protect your investment from power spikes.',
    code: 'TNGD-SURGE69',
    terms: 'Surge protector included free with any Elite Series motor purchase. One per motor. Installation included.',
  },
];

const expiresAt = '2027-07-19';

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
            <span>All coupons active — Expires July 19, 2027</span>
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
              <li>• Coupons cannot be combined with any other offer, promotion, or discount unless explicitly stated.</li>
              <li>• Must present coupon (printed or digital screenshot) at time of service before work begins.</li>
              <li>• Valid only within the Top-Notch Garage Doors service area: Guilford, Alamance, Rockingham, Caswell, Randolph, and surrounding NC counties.</li>
              <li>• All coupons expire July 19, 2027. No extensions will be granted past expiration date.</li>
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
