'use client';

import { useEffect, useState } from 'react';
import CTAButton from '@/components/CTAButton';
import { Paintbrush, Upload, MousePointerClick, Phone } from 'lucide-react';

const STEPS = [
  { icon: <Upload className="w-4 h-4" />, title: 'Upload Photo' },
  { icon: <Paintbrush className="w-4 h-4" />, title: 'Choose Style' },
  { icon: <MousePointerClick className="w-4 h-4" />, title: 'Compare' },
  { icon: <Phone className="w-4 h-4" />, title: 'Get a Quote' },
];

export default function DesignToolPage() {
  const [topOffset, setTopOffset] = useState(0);

  useEffect(() => {
    function measure() {
      const header = document.querySelector('header');
      if (header) {
        setTopOffset(header.getBoundingClientRect().height);
      }
    }
    measure();
    window.addEventListener('resize', measure);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('resize', measure);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className="fixed left-0 right-0 bottom-0 flex flex-col z-30"
      style={{ top: `${topOffset}px` }}
    >
      {/* Compact instruction strip */}
      <div className="bg-brand-blue text-white py-2.5 px-4 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2 shrink-0">
            <Paintbrush className="w-4 h-4 text-brand-gold" />
            <h1 className="font-display text-base sm:text-lg uppercase tracking-wider">Design Your Door</h1>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs text-white/70">
            {STEPS.map((step, i) => (
              <span key={step.title} className="flex items-center gap-1 whitespace-nowrap">
                <span className="w-4 h-4 rounded-full bg-brand-gold text-brand-blue flex items-center justify-center font-display text-[9px] font-bold shrink-0">
                  {i + 1}
                </span>
                {step.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Iframe fills all remaining space */}
      <div className="flex-1 relative min-h-0">
        <iframe
          src="https://www.clopaydoor.com/ezdoor"
          title="Clopay Door Design Tool"
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
        />
        {/* Floating CTA */}
        <div className="absolute bottom-4 right-4 z-10">
          <CTAButton text="Get a Quote" variant="primary" showIcon={false} />
        </div>
      </div>
    </div>
  );
}
