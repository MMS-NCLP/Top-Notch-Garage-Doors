'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck } from 'lucide-react';

const BRANDS = [
  { name: 'Clopay', logo: '/images/logos/brand-clopay.png' },
  { name: 'LiftMaster', logo: '/images/logos/brand-liftmaster.png' },
  { name: 'Amarr', logo: '/images/logos/brand-amarr.png' },
  { name: 'Chamberlain', logo: '/images/logos/brand-chamberlain.png' },
  { name: 'Genie', logo: '/images/logos/brand-genie.png' },
  { name: 'Haas Door', logo: '/images/logos/brand-haas.png' },
  { name: 'Overhead Door', logo: '/images/logos/brand-overhead-door.png' },
  { name: 'Garaga', logo: '/images/logos/brand-garaga.png' },
];

function BrandItem({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex-shrink-0 w-36 h-20 flex items-center justify-center px-4">
      <Image
        src={logo}
        alt={`${name} logo`}
        width={120}
        height={60}
        className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  );
}

export default function BrandGrid() {
  return (
    <section className="py-16 surface-matte overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-3">
          <BadgeCheck className="w-4 h-4" /> Authorized Dealer & Certified Installer
        </span>
        <h2 className="font-display text-2xl text-brand-blue uppercase mb-2">
          Brands We Carry & Service
        </h2>
        <p className="text-foreground/60 text-sm max-w-xl mx-auto">
          Factory-trained technicians. Genuine OEM parts. Manufacturer-backed warranties.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--surface-matte)] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--surface-matte)] to-transparent z-10" />

        <div className="flex animate-marquee">
          {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
            <BrandItem key={`${brand.name}-${i}`} name={brand.name} logo={brand.logo} />
          ))}
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          href="/brands"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-display text-xs uppercase tracking-wider font-semibold text-brand-blue border border-brand-blue/30 hover:bg-brand-blue hover:text-white transition-all duration-200"
        >
          View All Brands & Partnerships
        </Link>
      </div>
    </section>
  );
}
