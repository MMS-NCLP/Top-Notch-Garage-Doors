'use client';

import { useState } from 'react';
import CTAButton from '@/components/CTAButton';
import { MapPin, Phone, Clock, Printer, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      service: (form.elements.namedItem('service') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="font-display text-4xl text-brand-blue uppercase mb-3">Contact Us</h1>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Have a question or ready to schedule service? Reach out — we typically respond within an hour during business hours.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">Get in Touch</h2>

            {status === 'sent' ? (
              <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-display text-green-800 mb-1">Message Sent</p>
                  <p className="text-sm text-green-700">We&apos;ll get back to you shortly. For immediate help, call us at <a href="tel:+13366046494" className="font-semibold underline">(336) 604-6494</a>.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-1">Name *</label>
                    <input type="text" id="name" name="name" required className="w-full border border-brand-silver/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground/70 mb-1">Phone *</label>
                    <input type="tel" id="phone" name="phone" required className="w-full border border-brand-silver/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-1">Email</label>
                  <input type="email" id="email" name="email" className="w-full border border-brand-silver/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue" />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-foreground/70 mb-1">Service Needed</label>
                  <select id="service" name="service" className="w-full border border-brand-silver/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue">
                    <option value="">Select a service</option>
                    <option value="repair">Garage Door Repair</option>
                    <option value="installation">New Installation</option>
                    <option value="opener">Opener Service</option>
                    <option value="spring">Spring Replacement</option>
                    <option value="tune-up">Tune-Up / Maintenance</option>
                    <option value="screens">Garage Screen Doors</option>
                    <option value="pressure-washing">Pressure Washing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground/70 mb-1">Message</label>
                  <textarea id="message" name="message" rows={4} className="w-full border border-brand-silver/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue resize-none" />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>Something went wrong. Please call us at (336) 604-6494 instead.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center justify-center px-6 py-3 rounded font-display text-sm uppercase tracking-wider font-semibold bg-brand-red text-white hover:bg-red-700 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          <div>
            <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">Info</h2>
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="font-display text-sm uppercase tracking-wider text-brand-gold mb-1">Address</h3>
                <p className="text-foreground/70 flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-gold" />
                  <span>1183 University Drive Ste 105, #2115<br />Burlington, NC 27215</span>
                </p>
              </div>
              <div>
                <h3 className="font-display text-sm uppercase tracking-wider text-brand-gold mb-1">Phone</h3>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0 text-brand-gold" />
                  <a href="tel:+13366046494" className="text-brand-blue hover:text-brand-red transition-colors">(336) 604-6494</a>
                </p>
              </div>
              <div>
                <h3 className="font-display text-sm uppercase tracking-wider text-brand-gold mb-1">Fax</h3>
                <p className="flex items-center gap-2">
                  <Printer className="w-4 h-4 shrink-0 text-brand-gold" />
                  <span className="text-foreground/70">(336) 604-0809</span>
                </p>
              </div>
              <div>
                <h3 className="font-display text-sm uppercase tracking-wider text-brand-gold mb-1">Hours</h3>
                <p className="text-foreground/70 text-sm flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 shrink-0 text-brand-gold" />
                  <span>
                    Mon–Fri: 8AM–5:30PM<br />
                    Sat: 9AM–4PM
                  </span>
                </p>
              </div>
              <div>
                <h3 className="font-display text-sm uppercase tracking-wider text-brand-gold mb-1">Coverage Area</h3>
                <p className="text-foreground/70 text-sm">Serving the Piedmont Triad corridor from Statesville to Durham — Guilford, Alamance, Durham, Iredell, Rowan, Davidson, and surrounding NC counties.</p>
              </div>
            </div>

            <CTAButton text="Book Online" variant="primary" />

            <div className="mt-8 rounded-lg overflow-hidden shadow-md aspect-[4/3]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3231.7!2d-79.44!3d36.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDA0JzEyLjAiTiA3OcKwMjYnMTYuMCJX!5e0!3m2!1sen!2sus!4v1"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Top-Notch Garage Doors Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
