'use client';

import { StaggerContainer, StaggerItem } from './motion';

const BRANDS = [
  { name: 'Clopay', slug: 'clopay' },
  { name: 'LiftMaster', slug: 'liftmaster' },
  { name: 'Amarr', slug: 'amarr' },
  { name: 'CHI Overhead Doors', slug: 'chi' },
  { name: 'Wayne Dalton', slug: 'wayne-dalton' },
  { name: 'Chamberlain', slug: 'chamberlain' },
];

export default function BrandGrid() {
  return (
    <section className="py-16 surface-matte">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl text-center text-brand-blue uppercase mb-10">
          Brands We Trust
        </h2>
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {BRANDS.map((brand) => (
            <StaggerItem key={brand.slug}>
              <div className="surface-elevated rounded-lg border border-brand-silver/20 p-6 flex items-center justify-center aspect-[3/2] hover:shadow-md transition-shadow gleam">
                <span className="font-display text-sm text-brand-blue/70 uppercase text-center">
                  {brand.name}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
