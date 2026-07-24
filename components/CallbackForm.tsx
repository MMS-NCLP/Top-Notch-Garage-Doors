'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Phone, Upload, X, CheckCircle, AlertCircle, Loader2, Camera, Clock, Calendar, FileText } from 'lucide-react';

const TOPICS = [
  { value: '', label: 'Select a topic...' },
  { value: 'repair', label: 'Garage Door Repair' },
  { value: 'installation', label: 'New Door Installation' },
  { value: 'opener', label: 'Opener Install / Repair' },
  { value: 'spring', label: 'Spring Replacement' },
  { value: 'screen', label: 'Garage Screen Door' },
  { value: 'maintenance', label: 'Tune-Up / Maintenance' },
  { value: 'commercial', label: 'Commercial Service' },
  { value: 'troubleshoot', label: 'Troubleshoot My Door' },
  { value: 'pressure_washing', label: 'Pressure Washing' },
  { value: 'other', label: 'Other' },
];

const HOURS = ['1', '2', '3', '4', '5', '8', '9', '10', '11'];
const MINUTES = ['00', '15', '30', '45'];

type FilePreview = { file: File; url: string; type: 'image' | 'video' };

const ACCEPTED_TYPES = [
  'image/jpeg', 'image/png', 'image/webp', 'image/heic',
  'video/mp4', 'video/quicktime', 'video/webm',
];

export default function CallbackForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [attachments, setAttachments] = useState<FilePreview[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    const remaining = 4 - attachments.length;
    const newFiles: FilePreview[] = [];
    for (let i = 0; i < Math.min(fileList.length, remaining); i++) {
      const f = fileList[i];
      if (f.size > 25 * 1024 * 1024) continue;
      if (!ACCEPTED_TYPES.includes(f.type)) continue;
      newFiles.push({
        file: f,
        url: URL.createObjectURL(f),
        type: f.type.startsWith('video/') ? 'video' : 'image',
      });
    }
    setAttachments((prev) => [...prev, ...newFiles]);
  }

  function removeFile(idx: number) {
    setAttachments((prev) => {
      URL.revokeObjectURL(prev[idx].url);
      return prev.filter((_, i) => i !== idx);
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const form = e.currentTarget;
    const fd = new FormData();

    fd.set('name', (form.elements.namedItem('name') as HTMLInputElement).value);
    fd.set('phone', (form.elements.namedItem('phone') as HTMLInputElement).value);
    fd.set('email', (form.elements.namedItem('email') as HTMLInputElement).value);
    fd.set('topic', (form.elements.namedItem('topic') as HTMLSelectElement).value);
    fd.set('message', (form.elements.namedItem('message') as HTMLTextAreaElement).value);
    fd.set('preferredDate', (form.elements.namedItem('preferredDate') as HTMLInputElement).value);
    const ampm = (form.elements.namedItem('timePeriod') as HTMLSelectElement).value;
    const hour = (form.elements.namedItem('timeHour') as HTMLSelectElement).value;
    const minute = (form.elements.namedItem('timeMinute') as HTMLSelectElement).value;
    fd.set('preferredTime', hour ? `${hour}:${minute} ${ampm}` : '');

    for (const att of attachments) {
      fd.append('attachments', att.file);
    }

    try {
      const res = await fetch('/api/callback', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus('sent');
      form.reset();
      setAttachments([]);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'sent') {
    return (
      <section id="callback" className="py-20 surface-matte">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="surface-elevated border border-brand-silver/20 rounded-xl p-10 gleam"
          >
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h2 className="font-display text-2xl text-brand-blue uppercase mb-3">We Got Your Request</h2>
            <p className="text-foreground/60 mb-2">
              Our team will call you back during office hours around your preferred time.
            </p>
            <p className="text-sm text-foreground/40">
              If your issue is urgent, call us directly at{' '}
              <a href="tel:+13366046494" className="text-brand-red font-semibold">(336) 604-6494</a>.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  const inputBase = 'w-full px-4 py-3 rounded-lg border border-brand-silver/30 bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue/50 transition-colors';
  const labelBase = 'block font-display text-xs uppercase tracking-wider text-brand-blue mb-1.5';

  return (
    <section id="callback" className="py-20 surface-matte">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-3">
            <Phone className="w-4 h-4" /> Callback Request
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-brand-blue uppercase mb-3">Want Us to Call You?</h2>
          <p className="text-foreground/60 max-w-lg mx-auto">
            Fill out the form below and we&apos;ll reach out at a time that works for you. Upload photos or video if you need help troubleshooting.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="surface-elevated border border-brand-silver/20 rounded-xl p-6 sm:p-8 gleam space-y-5">

          {/* Name + Phone */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="cb-name" className={labelBase}>Name *</label>
              <input id="cb-name" name="name" type="text" required maxLength={200} placeholder="Your name" className={inputBase} />
            </div>
            <div>
              <label htmlFor="cb-phone" className={labelBase}>Phone *</label>
              <input id="cb-phone" name="phone" type="tel" required maxLength={30} placeholder="(555) 123-4567" className={inputBase} />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="cb-email" className={labelBase}>Email <span className="text-foreground/30">(optional)</span></label>
            <input id="cb-email" name="email" type="email" maxLength={200} placeholder="you@email.com" className={inputBase} />
          </div>

          {/* Topic */}
          <div>
            <label htmlFor="cb-topic" className={labelBase}>What do you need help with? *</label>
            <select id="cb-topic" name="topic" required className={inputBase}>
              {TOPICS.map((t) => (
                <option key={t.value} value={t.value} disabled={!t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Date + Time */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="cb-date" className={labelBase}>
                <Calendar className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />
                Preferred Date
              </label>
              <input
                id="cb-date"
                name="preferredDate"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className={inputBase}
              />
            </div>
            <div>
              <label className={labelBase}>
                <Clock className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />
                Preferred Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                <select name="timePeriod" className={inputBase} aria-label="AM or PM">
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
                <select name="timeHour" className={inputBase} aria-label="Hour">
                  <option value="">Hr</option>
                  {HOURS.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                <select name="timeMinute" className={inputBase} aria-label="Minutes">
                  {MINUTES.map((m) => (
                    <option key={m} value={m}>{m === '00' ? ':00' : `:${m}`}</option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-foreground/30 mt-1.5">EST (Eastern Standard Time)</p>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="cb-message" className={labelBase}>
              Message <span className="text-foreground/30">(optional)</span>
            </label>
            <textarea
              id="cb-message"
              name="message"
              rows={3}
              maxLength={2000}
              placeholder="Briefly describe your situation or question..."
              className={inputBase + ' resize-none'}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className={labelBase}>
              <Camera className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />
              Upload Photos or Video <span className="text-foreground/30">(optional — up to 4 files, 25MB each)</span>
            </label>

            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-3">
                {attachments.map((att, i) => (
                  <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-brand-silver/30 group">
                    {att.type === 'image' ? (
                      <img src={att.url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-brand-blue/5 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-brand-blue/40" />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="absolute top-0.5 right-0.5 w-5 h-5 bg-brand-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {attachments.length < 4 && (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-brand-silver/40 text-sm text-foreground/50 hover:border-brand-blue/40 hover:text-brand-blue transition-colors"
              >
                <Upload className="w-4 h-4" />
                {attachments.length === 0 ? 'Add photos or video' : 'Add more'}
              </button>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic,video/mp4,video/quicktime,video/webm"
              multiple
              className="hidden"
              onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }}
            />
          </div>

          {/* Error */}
          {status === 'error' && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
              <AlertCircle className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{errorMsg}</p>
            </div>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={status === 'sending'}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-brand-red text-white font-display text-sm uppercase tracking-wider font-semibold hover:bg-red-700 transition-colors gloss-button disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Phone className="w-4 h-4" />
                Request a Callback
              </>
            )}
          </motion.button>

          {/* Disclaimer */}
          <div className="bg-brand-blue/[0.03] border border-brand-blue/10 rounded-lg p-4 space-y-1.5">
            <p className="font-display text-xs uppercase tracking-wider text-brand-blue mb-1">Please Note</p>
            <p className="text-xs text-foreground/50 leading-relaxed">
              Callbacks occur during office hours only (Mon–Fri 8 AM – 6 PM, Sat 9 AM – 4 PM).
            </p>
            <p className="text-xs text-foreground/50 leading-relaxed">
              We return calls as soon as possible around your scheduled time.
            </p>
            <p className="text-xs text-foreground/50 leading-relaxed">
              Messages are welcomed and returned in the order they are received.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
