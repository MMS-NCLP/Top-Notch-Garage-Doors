'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import CTAButton from './CTAButton';

const SERVICE_LINKS = [
  { label: 'Door Repair', href: '/services/repair' },
  { label: 'Door Installation', href: '/services/installation' },
  { label: 'Opener Services', href: '/services/openers' },
  { label: 'Pressure Washing', href: '/services/pressure-washing' },
  { label: 'Garage Screen Doors', href: '/garage-screens' },
];

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services', children: SERVICE_LINKS },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Our Work', href: '/portfolio' },
  { label: 'Brands', href: '/brands' },
  { label: 'Local Inspirations', href: '/reviews' },
  { label: 'Industry Insights', href: '/blog' },
  { label: 'FAQ', href: '/resources' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <>
      {/* Emergency banner */}
      <div className="bg-brand-red text-white text-center py-2 px-4 text-sm font-medium">
        <a href="tel:+13366046494" className="inline-flex items-center gap-2 hover:underline">
          <Phone className="w-3.5 h-3.5" />
          EMERGENCY REPAIR? Call us at (336) 604-6494
        </a>
      </div>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-silver/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logos/tngd-logo-small-1.png"
                alt="Top-Notch Garage Doors logo"
                width={48}
                height={48}
                className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
              />
              <div className="flex items-center gap-1.5">
                <span className="font-hero text-xl lg:text-2xl text-brand-blue tracking-wider">
                  TOP-NOTCH
                </span>
                <span className="font-hero text-xl lg:text-2xl text-brand-red tracking-wider">
                  GARAGE DOORS
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-5">
              {NAV_LINKS.map((link) => (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-sm font-medium text-brand-black/70 hover:text-brand-blue transition-colors duration-200"
                  >
                    {link.label}
                    {link.children && <ChevronDown className="w-3 h-3" />}
                  </Link>
                  {link.children && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-white border border-brand-silver/30 rounded-lg shadow-lg py-2 min-w-[200px]">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-brand-black/70 hover:bg-brand-blue/5 hover:text-brand-blue transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <CTAButton text="Book Service" variant="primary" showIcon={false} />
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
              <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <div key={link.href}>
                    {link.children ? (
                      <>
                        <button
                          onClick={() => setServicesOpen(!servicesOpen)}
                          className="flex items-center justify-between w-full text-base font-medium text-brand-black/70 hover:text-brand-blue py-2 transition-colors"
                        >
                          {link.label}
                          <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {servicesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden pl-4"
                            >
                              {link.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block text-sm text-brand-black/60 hover:text-brand-blue py-2 transition-colors"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-base font-medium text-brand-black/70 hover:text-brand-blue py-2 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
                <a href="tel:+13366046494" className="flex items-center gap-2 text-brand-blue font-medium py-2">
                  <Phone className="w-4 h-4" />
                  (336) 604-6494
                </a>
                <CTAButton text="Book Service" variant="primary" className="mt-2 w-full" />
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
