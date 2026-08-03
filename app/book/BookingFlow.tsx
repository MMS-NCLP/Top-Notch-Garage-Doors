'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
  Wrench,
  Home,
  Zap,
  PanelTop,
  Droplets,
  Shield,
  Settings,
} from 'lucide-react';

const SQUARE_HOSTED_URL =
  'https://app.squareup.com/appointments/book/3h4bcnk512pz19/LJ7P7KQK2FTA6/start';

type ServiceOption = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
};

const SERVICES: ServiceOption[] = [
  { id: 'repair', name: 'Garage Door Repair', description: 'Springs, cables, panels, rollers, tracks — diagnosed and fixed on-site.', icon: <Wrench className="w-5 h-5" />, category: 'Repair' },
  { id: 'spring', name: 'Spring Replacement', description: 'Torsion and extension spring replacement. BOGO half-off on pairs.', icon: <Settings className="w-5 h-5" />, category: 'Repair' },
  { id: 'installation', name: 'New Door Installation', description: 'Residential and commercial garage door installation. All major brands.', icon: <Home className="w-5 h-5" />, category: 'Installation' },
  { id: 'opener', name: 'Opener Install or Repair', description: 'Belt-drive, chain-drive, wall-mount. Smart-home ready openers.', icon: <Zap className="w-5 h-5" />, category: 'Installation' },
  { id: 'tuneup', name: 'Tune-Up & Maintenance', description: '21-point inspection: lubrication, balance check, safety calibration, hardware tightening.', icon: <Shield className="w-5 h-5" />, category: 'Service' },
  { id: 'screen', name: 'Garage Screen Door', description: 'Retractable and fixed motorized screen solutions for any garage opening.', icon: <PanelTop className="w-5 h-5" />, category: 'Installation' },
  { id: 'pressure', name: 'Pressure Washing', description: 'Driveways, sidewalks, siding, decks — professional-grade cleaning.', icon: <Droplets className="w-5 h-5" />, category: 'Service' },
  { id: 'other', name: 'Something Else', description: 'Not sure what you need? No problem — we\'ll figure it out together.', icon: <MessageSquare className="w-5 h-5" />, category: 'Other' },
];

const HOURS = ['8', '9', '10', '11', '12', '1', '2', '3', '4', '5'];

type Step = 'service' | 'info' | 'confirm' | 'done';

function formatDateNice(dateStr: string) {
  if (!dateStr) return '';
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export default function BookingFlow() {
  const [step, setStep] = useState<Step>('service');
  const [selectedService, setSelectedService] = useState<ServiceOption | null>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredHour, setPreferredHour] = useState('');
  const [preferredPeriod, setPreferredPeriod] = useState('AM');
  const [note, setNote] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  async function handleSubmit() {
    if (!selectedService || !name.trim() || !phone.trim()) return;

    setSubmitting(true);
    setSubmitError('');

    const fd = new FormData();
    fd.set('name', name.trim());
    fd.set('phone', phone.trim());
    fd.set('email', email.trim());
    fd.set('topic', selectedService.id);
    fd.set('message', note.trim() || `Requesting free estimate for: ${selectedService.name}`);
    fd.set('preferredDate', preferredDate);
    fd.set('preferredTime', preferredHour ? `${preferredHour}:00 ${preferredPeriod}` : '');

    try {
      const res = await fetch('/api/callback', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setStep('done');
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please call (336) 604-6494.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  const steps: { key: Step; label: string; num: number }[] = [
    { key: 'service', label: 'Service', num: 1 },
    { key: 'info', label: 'Your Info', num: 2 },
    { key: 'confirm', label: 'Confirm', num: 3 },
  ];

  const inputBase =
    'w-full px-4 py-3 rounded-lg border border-brand-silver/30 bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue/50 transition-colors';
  const labelBase =
    'block font-display text-xs uppercase tracking-wider text-brand-blue mb-1.5';

  return (
    <section className="py-12 sm:py-20 surface-matte min-h-[80vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-3">
            <Calendar className="w-4 h-4" /> Free Estimate
          </span>
          <h1 className="font-display text-3xl sm:text-4xl text-brand-blue uppercase mb-2">
            Schedule Your Free Estimate
          </h1>
          <p className="text-foreground/60 max-w-lg mx-auto">
            Tell us what you need and we&apos;ll reach out to schedule your no-obligation, on-site estimate. Same-day emergency service available by phone.
          </p>
        </div>

        {/* Step Indicator */}
        {step !== 'done' && (
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8">
            {steps.map((s, i) => {
              const active = step === s.key;
              const completed =
                steps.findIndex((x) => x.key === step) >
                steps.findIndex((x) => x.key === s.key);
              return (
                <div key={s.key} className="flex items-center gap-1 sm:gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold transition-colors ${
                      completed
                        ? 'bg-green-500 text-white'
                        : active
                          ? 'bg-brand-blue text-white'
                          : 'bg-brand-silver/20 text-foreground/40'
                    }`}
                  >
                    {completed ? <CheckCircle className="w-4 h-4" /> : s.num}
                  </div>
                  <span
                    className={`hidden sm:block text-xs font-display uppercase tracking-wider ${
                      active
                        ? 'text-brand-blue'
                        : completed
                          ? 'text-green-600'
                          : 'text-foreground/30'
                    }`}
                  >
                    {s.label}
                  </span>
                  {i < steps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-foreground/20" />
                  )}
                </div>
              );
            })}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1: Service Selection */}
          {step === 'service' && (
            <motion.div
              key="service"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="surface-elevated border border-brand-silver/20 rounded-xl p-6 sm:p-8 gleam"
            >
              <h2 className="font-display text-xl text-brand-blue uppercase mb-1">
                What do you need help with?
              </h2>
              <p className="text-sm text-foreground/40 mb-5">
                Select a service and we&apos;ll provide a free, no-obligation estimate.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {SERVICES.map((service) => {
                  const isSelected = selectedService?.id === service.id;
                  return (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-brand-blue bg-brand-blue/5'
                          : 'border-brand-silver/20 hover:border-brand-blue/30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`shrink-0 mt-0.5 ${isSelected ? 'text-brand-blue' : 'text-foreground/30'}`}>
                          {service.icon}
                        </div>
                        <div>
                          <span className="font-display text-sm text-brand-blue uppercase block">
                            {service.name}
                          </span>
                          <p className="text-xs text-foreground/50 mt-0.5 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-foreground/30 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  Free estimate — no obligation
                </span>
                <button
                  disabled={!selectedService}
                  onClick={() => setStep('info')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-blue text-white font-display text-sm uppercase tracking-wider font-semibold hover:bg-brand-blue/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed gloss-button"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Customer Info + Preferred Time */}
          {step === 'info' && (
            <motion.div
              key="info"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="surface-elevated border border-brand-silver/20 rounded-xl p-6 sm:p-8 gleam"
            >
              <h2 className="font-display text-xl text-brand-blue uppercase mb-1">
                Your Information
              </h2>
              <p className="text-sm text-foreground/40 mb-5">
                {selectedService?.name} — Free Estimate
              </p>

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelBase}>
                      <User className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      maxLength={200}
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label className={labelBase}>
                      <Phone className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 123-4567"
                      maxLength={30}
                      className={inputBase}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelBase}>
                    <Mail className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />
                    Email <span className="text-foreground/30">(optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    maxLength={200}
                    className={inputBase}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelBase}>
                      <Calendar className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />
                      Preferred Date <span className="text-foreground/30">(optional)</span>
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      min={today}
                      max={maxDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label className={labelBase}>
                      <Clock className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />
                      Preferred Time <span className="text-foreground/30">(optional)</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={preferredHour}
                        onChange={(e) => setPreferredHour(e.target.value)}
                        className={inputBase}
                        aria-label="Hour"
                      >
                        <option value="">Hour</option>
                        {HOURS.map((h) => (
                          <option key={h} value={h}>{h}:00</option>
                        ))}
                      </select>
                      <select
                        value={preferredPeriod}
                        onChange={(e) => setPreferredPeriod(e.target.value)}
                        className={inputBase}
                        aria-label="AM or PM"
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className={labelBase}>
                    <MessageSquare className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />
                    Tell us more <span className="text-foreground/30">(optional)</span>
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Describe what's going on — brand, age of door, symptoms, photos welcome..."
                    rows={3}
                    maxLength={2000}
                    className={inputBase + ' resize-none'}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setStep('service')}
                  className="inline-flex items-center gap-1 text-sm text-foreground/50 hover:text-brand-blue transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  disabled={!name.trim() || !phone.trim()}
                  onClick={() => setStep('confirm')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-blue text-white font-display text-sm uppercase tracking-wider font-semibold hover:bg-brand-blue/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed gloss-button"
                >
                  Review
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Confirmation */}
          {step === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="surface-elevated border border-brand-silver/20 rounded-xl p-6 sm:p-8 gleam"
            >
              <h2 className="font-display text-xl text-brand-blue uppercase mb-5">
                Review & Submit
              </h2>

              <div className="space-y-4">
                <div className="bg-brand-blue/[0.03] border border-brand-blue/10 rounded-lg p-4">
                  <div className="grid gap-3 text-sm">
                    <div>
                      <span className="font-display text-xs uppercase tracking-wider text-brand-blue">
                        Service
                      </span>
                      <p className="text-foreground/80 mt-0.5">
                        {selectedService?.name}
                      </p>
                      <p className="text-xs text-green-600 font-semibold mt-0.5">
                        Free Estimate
                      </p>
                    </div>

                    {preferredDate && (
                      <div>
                        <span className="font-display text-xs uppercase tracking-wider text-brand-blue">
                          Preferred Schedule
                        </span>
                        <p className="text-foreground/80 mt-0.5">
                          {formatDateNice(preferredDate)}
                          {preferredHour && ` around ${preferredHour}:00 ${preferredPeriod}`}
                        </p>
                      </div>
                    )}

                    <div className="border-t border-brand-silver/20 pt-3">
                      <span className="font-display text-xs uppercase tracking-wider text-brand-blue">
                        Contact
                      </span>
                      <p className="text-foreground/80 mt-0.5">{name}</p>
                      <p className="text-foreground/60 text-xs">{phone}</p>
                      {email && (
                        <p className="text-foreground/60 text-xs">{email}</p>
                      )}
                      {note && (
                        <p className="text-foreground/50 text-xs mt-1 italic">
                          &ldquo;{note}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-lg p-3">
                  <p className="text-xs text-foreground/60 leading-relaxed">
                    <strong className="text-brand-blue">How it works:</strong>{' '}
                    Our team will call you to confirm your appointment and discuss your needs.
                    Your on-site estimate is completely free with no obligation.
                    We&apos;ll provide honest pricing and options so you can make the best decision for your home.
                  </p>
                </div>
              </div>

              {submitError && (
                <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
                  <AlertCircle className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{submitError}</p>
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setStep('info')}
                  className="inline-flex items-center gap-1 text-sm text-foreground/50 hover:text-brand-blue transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  disabled={submitting}
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-brand-red text-white font-display text-sm uppercase tracking-wider font-semibold hover:bg-red-700 transition-colors gloss-button disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      Request Free Estimate
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* DONE */}
          {step === 'done' && (
            <motion.div
              key="done"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="surface-elevated border border-brand-silver/20 rounded-xl p-8 sm:p-10 gleam text-center"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="font-display text-2xl text-brand-blue uppercase mb-3">
                Request Received!
              </h2>
              <p className="text-foreground/60 mb-2">
                We&apos;ve received your free estimate request for{' '}
                <strong>{selectedService?.name}</strong>.
              </p>
              {preferredDate && (
                <p className="text-foreground/60 mb-4">
                  Preferred: {formatDateNice(preferredDate)}
                  {preferredHour && ` around ${preferredHour}:00 ${preferredPeriod}`}
                </p>
              )}
              <p className="text-sm text-foreground/40 mb-6">
                Our team will call you shortly to confirm your appointment. If your issue is urgent, don&apos;t wait.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:+13366046494"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border-2 border-brand-red text-brand-red text-sm font-display uppercase tracking-wider hover:bg-brand-red hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Now — (336) 604-6494
                </a>
                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-brand-blue text-white text-sm font-display uppercase tracking-wider hover:bg-brand-blue/90 transition-colors gloss-button"
                >
                  Back to Home
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer — Square booking alternative + phone */}
        {step !== 'done' && (
          <div className="mt-6 text-center space-y-2">
            <p className="text-xs text-foreground/30">
              Want to book directly?{' '}
              <a
                href={SQUARE_HOSTED_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue underline hover:text-brand-blue/80"
              >
                Schedule on Square
              </a>
            </p>
            <p className="text-xs text-foreground/30">
              Need emergency service? Call{' '}
              <a
                href="tel:+13366046494"
                className="text-brand-red font-semibold"
              >
                (336) 604-6494
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
