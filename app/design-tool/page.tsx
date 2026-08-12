'use client';

import { useEffect, useState } from 'react';
import CTAButton from '@/components/CTAButton';
import { Paintbrush, Upload, MousePointerClick, Phone } from 'lucide-react';

const STEPS = [
  {
    icon: <Upload className="w-5 h-5" />,
    title: 'Upload Your Photo',
    desc: 'Take a photo of your home\'s front and upload it into the tool.',
  },
  {
    icon: <Paintbrush className="w-5 h-5" />,
    title: 'Choose a Style',
    desc: 'Browse door styles — raised panel, carriage house, modern flush, wood-look, and more.',
  },
  {
    icon: <MousePointerClick className="w-5 h-5" />,
    title: 'Visualize & Compare',
    desc: 'See how each door looks on your actual home. Try different colors, windows, and hardware.',
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: 'Get a Quote',
    desc: 'Found a style you love? Call us or book a consultation and we\'ll bring it to life.',
  },
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
      {/* Instructions bar */}
      <div className="bg-brand-blue text-white py-4 px-4 shrink-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Paintbrush className="w-5 h-5 text-brand-gold shrink-0" />
            <h1 className="font-display text-lg uppercase tracking-wider">Design Your Door</h1>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {STEPS.map((step, i) => (
              <div key={step.title} className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-gold text-brand-blue flex items-center justify-center font-display text-xs font-bold">
                  {i + 1}
                </span>
                <div>
                  <p className="font-display text-sm text-white">{step.title}</p>
                  <p className="text-xs text-white/60 leading-snug hidden lg:block">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Iframe fills all remaining space — Clopay nav + dealer button clipped */}
      <div className="flex-1 relative min-h-0 overflow-hidden">
        <iframe
          src="https://www.clopaydoor.com/ezdoor"
          title="Clopay Door Design Tool"
          className="absolute left-0 right-0 border-0"
          style={{ top: '-121px', height: 'calc(100% + 121px)', width: '100%' }}
          loading="lazy"
        />
        {/* Overlay to cover any sticky Clopay nav that might reappear */}
        <div
          className="absolute top-0 left-0 right-0 bg-white z-10 pointer-events-none"
          style={{ height: '2px' }}
        />
        {/* Floating CTA */}
        <div className="absolute bottom-4 right-4 z-10">
          <CTAButton text="Get a Quote" variant="primary" showIcon={false} />
        </div>
      </div>
    </div>
  );
}
