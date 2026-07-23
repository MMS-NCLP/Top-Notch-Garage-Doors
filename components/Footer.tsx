import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Clock, Printer } from 'lucide-react';
import CTAButton from './CTAButton';
import LogoText from './LogoText';

export default function Footer() {
  return (
    <footer className="bg-brand-blue text-white mt-auto">
      <div className="divider-gleam" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logos/tngd-logo-small-1.png"
                alt="Top-Notch Garage Doors logo"
                width={56}
                height={56}
                className="w-14 h-14 object-contain"
              />
              <h3 className="font-hero text-lg tracking-wider">TOP-NOTCH GARAGE DOORS</h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Professional garage door services serving the Piedmont Triad corridor from Statesville to Durham. Quality craftsmanship you can trust.
            </p>
            <CTAButton text="Request a Quote" variant="secondary" />
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-wider mb-4 text-brand-gold">Our Services</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href="/services/repair" className="hover:text-white transition-colors">Garage Door Emergency Repair</Link></li>
              <li><Link href="/services/installation" className="hover:text-white transition-colors">Garage Door Installation</Link></li>
              <li><Link href="/services/repair" className="hover:text-white transition-colors">Garage Door Maintenance</Link></li>
              <li><Link href="/services/openers" className="hover:text-white transition-colors">Garage Door Opener Service</Link></li>
              <li><Link href="/design-tool" className="hover:text-white transition-colors">Door Designer Tool</Link></li>
              <li><Link href="/services/pressure-washing" className="hover:text-white transition-colors">Pressure Washing Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-wider mb-4 text-brand-gold">About Us</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/reviews" className="hover:text-white transition-colors">Local Inspirations</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">TNGD Blog</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/warranty" className="hover:text-white transition-colors">Product Warranty Disclosures</Link></li>
              <li><Link href="/partnership" className="hover:text-white transition-colors">Partnerships</Link></li>
              <li><Link href="/coupons" className="hover:text-white transition-colors">Coupons</Link></li>
            </ul>

            <h4 className="font-display text-sm uppercase tracking-wider mt-6 mb-3 text-brand-gold">Other Services</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href="/services/pressure-washing" className="hover:text-white transition-colors">Pressure Washing</Link></li>
              <li><Link href="/garage-screens" className="hover:text-white transition-colors">Screen Doors</Link></li>
              <li><Link href="/partnership" className="hover:text-white transition-colors">Partnerships</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-wider mb-4 text-brand-gold">Contact Us</h4>
            <address className="not-italic text-sm text-white/70 space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-gold" />
                <span>1183 University Drive Ste 105, #2115<br />Burlington, NC 27215</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-brand-gold" />
                <a href="tel:+13366046494" className="hover:text-white transition-colors">(336) 604-6494</a>
              </div>
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 shrink-0 text-brand-gold" />
                <span>Fax: (336) 604-0809</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 text-brand-gold" />
                <span>Mon–Fri: 8AM–5:30PM<br />Sat: 9AM–4PM</span>
              </div>
            </address>

            <div className="mt-6 flex items-center gap-3">
              <a href="https://www.facebook.com/topnotchdoorsnc" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors text-xs uppercase tracking-wider">Facebook</a>
              <span className="text-white/20">|</span>
              <a href="https://www.instagram.com/topnotchdoorsnc" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors text-xs uppercase tracking-wider">Instagram</a>
              <span className="text-white/20">|</span>
              <a href="https://www.linkedin.com/company/topnotchdoorsnc" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors text-xs uppercase tracking-wider">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="divider-gleam mt-12 mb-8" />

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 text-xs text-white/50 uppercase tracking-wider">
          <span>Fast Service by Real Pros</span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span>No Service Call Fee</span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span>Certified &amp; Insured</span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span>Local &amp; Trusted Experts</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-white/50 gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <Image
              src="/images/logos/tngd-logo-small-2.png"
              alt=""
              width={36}
              height={36}
              className="w-9 h-9 object-contain opacity-60"
            />
            <div>
              <p>&copy; {new Date().getFullYear()} <span className="font-hero tracking-wider text-white/60">Top-Notch Garage Doors</span>. All rights reserved.</p>
              <p className="mt-1">Site Powered by <span className="text-white/60">Momentum Marketing Solutions LLC</span>.</p>
            </div>
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
