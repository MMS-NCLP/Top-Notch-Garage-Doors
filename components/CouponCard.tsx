'use client';

import { motion } from 'framer-motion';
import { Scissors } from 'lucide-react';
import Image from 'next/image';

interface CouponProps {
  title: string;
  value: string;
  description: string;
  code: string;
  expiresAt: string;
  terms: string;
}

export default function CouponCard({
  title,
  value,
  description,
  code,
  expiresAt,
  terms,
}: CouponProps) {
  const [year, month, day] = expiresAt.split('-').map(Number);
  const expDate = new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="coupon-card relative border-2 border-dashed border-brand-gold bg-white rounded-sm overflow-hidden print:break-inside-avoid"
      style={{ width: '100%', maxWidth: '612px', minHeight: '216px' }}
    >
      {/* Scissors cut indicator */}
      <div className="absolute -top-1 left-6 text-brand-gold print:text-gray-400">
        <Scissors className="w-4 h-4 rotate-90" />
      </div>

      <div className="flex h-full">
        {/* Left accent strip */}
        <div className="w-2 bg-brand-blue shrink-0" />

        {/* Main content */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg text-brand-blue uppercase leading-tight">{title}</h3>
                <p className="text-sm text-foreground/60 mt-1">{description}</p>
              </div>
              <div className="shrink-0 text-right">
                <span className="font-hero text-2xl sm:text-3xl text-brand-red leading-none">{value}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 bg-brand-blue/5 border border-brand-blue/20 rounded px-3 py-1.5">
                <span className="text-[10px] text-foreground/40 uppercase tracking-wider">Code:</span>
                <span className="font-mono text-sm font-bold text-brand-blue tracking-wider">{code}</span>
              </div>
              <p className="text-[10px] text-foreground/40">EXP. {expDate}</p>
            </div>
            <div className="hidden sm:block w-10 h-10 relative opacity-30">
              <Image src="/images/logos/tngd-logo-small-1.png" alt="" fill className="object-contain" sizes="40px" />
            </div>
          </div>
        </div>

        {/* Right accent strip */}
        <div className="w-2 bg-brand-red shrink-0" />
      </div>

      {/* Fine print */}
      <div className="border-t border-dashed border-brand-silver px-5 py-2 bg-gray-50">
        <p className="text-[9px] text-foreground/40 leading-relaxed">
          {terms} • Limit one (1) coupon per household per visit. Not valid with any other offer or discount.
          Must present coupon at time of service. No cash value. Void where prohibited.
          Valid in Top-Notch Garage Doors service area only. Expires {expDate}.
        </p>
      </div>
    </motion.div>
  );
}
