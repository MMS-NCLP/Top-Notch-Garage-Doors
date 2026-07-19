import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta({
  title: 'Seasonal Promotions',
  description: 'Current seasonal promotions and special offers from Top-Notch Garage Doors in Whitsett, NC.',
  path: '/promotions',
});

const promos = [
  {
    title: 'Summer Tune-Up Special',
    description: 'Complete garage door tune-up including lubrication, balance check, safety inspection, and hardware tightening. Keep your door running smoothly all season.',
    price: '$89',
    note: 'Regular price $149',
  },
  {
    title: 'New Door + Opener Bundle',
    description: 'Purchase a new garage door installation and add a LiftMaster opener at a discounted rate. Includes full warranty on both.',
    price: 'Save $200',
    note: 'On qualifying doors',
  },
];

export default function PromotionsPage() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="font-display text-4xl text-brand-blue uppercase mb-3">Seasonal Promotions</h1>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Limited-time offers to help you get the most value from your garage door services.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto mb-16">
          {promos.map((promo) => (
            <div key={promo.title} className="bg-white border border-brand-silver/30 rounded-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-red text-white px-4 py-1 text-xs font-display uppercase rounded-bl-lg">
                Limited Time
              </div>
              <h2 className="font-display text-xl text-brand-blue mb-3 mt-2">{promo.title}</h2>
              <p className="text-sm text-foreground/60 leading-relaxed mb-4">{promo.description}</p>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-display text-2xl text-brand-red">{promo.price}</span>
                <span className="text-xs text-foreground/40">{promo.note}</span>
              </div>
              <CTAButton text="Claim Offer" variant="primary" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
