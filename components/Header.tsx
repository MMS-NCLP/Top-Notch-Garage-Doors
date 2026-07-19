'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import CTAButton from './CTAButton';

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Brands', href: '/brands' },
  { label: 'Garage Screens', href: '/garage-screens' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Coupons', href: '/coupons' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-silver/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-xl lg:text-2xl text-brand-blue uppercase tracking-tight">
              Top-Notch
            </span>
            <span className="font-display text-xl lg:text-2xl text-brand-red uppercase tracking-tight">
              Garage Doors
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-brand-blue transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <a href="tel:+13360000000" className="flex items-center gap-1.5 text-sm font-medium text-brand-blue">
              <Phone className="w-4 h-4" />
              <span>(336) 000-0000</span>
            </a>
            <CTAButton text="Book Now" variant="primary" showIcon={false} />
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-brand-blue"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-brand-silver/30 bg-white overflow-hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-foreground/70 hover:text-brand-blue py-1 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <a href="tel:+13360000000" className="flex items-center gap-2 text-brand-blue font-medium py-1">
                <Phone className="w-4 h-4" />
                (336) 000-0000
              </a>
              <CTAButton text="Book Now" variant="primary" className="mt-2 w-full" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
