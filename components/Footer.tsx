import Link from 'next/link';
import { MapPin, Phone, Clock } from 'lucide-react';
import CTAButton from './CTAButton';

export default function Footer() {
  return (
    <footer className="bg-brand-blue text-white mt-auto">
      <div className="divider-gleam" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="font-display text-lg uppercase tracking-tight mb-4">Top-Notch Garage Doors</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Professional garage door services serving Whitsett &amp; surrounding areas. Quality craftsmanship you can trust.
            </p>
            <CTAButton text="Schedule Service" variant="secondary" />
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-wider mb-4 text-brand-gold">Services</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href="/services/repair" className="hover:text-white transition-colors">Garage Door Repair</Link></li>
              <li><Link href="/services/installation" className="hover:text-white transition-colors">Installation</Link></li>
              <li><Link href="/services/openers" className="hover:text-white transition-colors">Openers</Link></li>
              <li><Link href="/services/pressure-washing" className="hover:text-white transition-colors">Pressure Washing</Link></li>
              <li><Link href="/garage-screens" className="hover:text-white transition-colors">Garage Screen Doors</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-wider mb-4 text-brand-gold">Company</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href="/brands" className="hover:text-white transition-colors">Brands We Carry</Link></li>
              <li><Link href="/reviews" className="hover:text-white transition-colors">Reviews</Link></li>
              <li><Link href="/warranty" className="hover:text-white transition-colors">Warranty</Link></li>
              <li><Link href="/partnership" className="hover:text-white transition-colors">Partnerships</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
              <li><Link href="/coupons" className="hover:text-white transition-colors">Coupons</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-wider mb-4 text-brand-gold">Contact</h4>
            <address className="not-italic text-sm text-white/70 space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-gold" />
                <span>705 NC Hwy 61<br />Whitsett, NC 27377</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-brand-gold" />
                <a href="tel:+13360000000" className="hover:text-white transition-colors">(336) 000-0000</a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 text-brand-gold" />
                <span>Mon–Fri: 7AM–6PM<br />Sat: 8AM–4PM</span>
              </div>
            </address>
          </div>
        </div>

        <div className="divider-gleam mt-12 mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-white/50 gap-4">
          <div>
            <p>&copy; {new Date().getFullYear()} Top-Notch Garage Doors. All rights reserved.</p>
            <p className="mt-1">Serving Whitsett &amp; Surrounding Areas</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
