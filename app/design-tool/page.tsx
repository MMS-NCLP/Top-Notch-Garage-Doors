import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';
import { Paintbrush, Upload, MousePointerClick, Phone } from 'lucide-react';

export const metadata = genMeta({
  title: 'Design Your Door — Visualize Your New Garage Door',
  description: 'Upload a photo of your home and visualize how different garage door styles will look. Powered by Clopay\'s Door Imagination System.',
  path: '/design-tool',
});

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
  return (
    <div className="flex flex-col">
      {/* Instructions bar */}
      <div className="bg-brand-blue text-white py-4 px-4">
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

      {/* Full-height iframe */}
      <div className="flex-1 relative" style={{ height: 'calc(100vh - 200px)', minHeight: '500px' }}>
        <iframe
          src="https://www.clopaydoor.com/ezdoor"
          title="Clopay Door Design Tool"
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
        />
      </div>

      {/* Bottom CTA strip */}
      <div className="bg-brand-blue/5 border-t border-brand-silver/30 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-foreground/60 text-sm text-center sm:text-left">
            Found a style you love? Let Top-Notch Garage Doors bring it to life.
          </p>
          <CTAButton text="Schedule Consultation" variant="primary" showIcon={false} />
        </div>
      </div>
    </div>
  );
}
