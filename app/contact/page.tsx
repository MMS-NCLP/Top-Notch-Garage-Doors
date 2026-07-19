import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta({
  title: 'Contact Us',
  description: 'Contact Top-Notch Garage Doors in Whitsett, NC. Call, email, or book online. Serving the Piedmont Triad area.',
  path: '/contact',
});

export default function ContactPage() {
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
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-1">Name</label>
                  <input type="text" id="name" name="name" className="w-full border border-brand-silver/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground/70 mb-1">Phone</label>
                  <input type="tel" id="phone" name="phone" className="w-full border border-brand-silver/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue" />
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
                  <option value="pressure-washing">Pressure Washing</option>
                  <option value="screens">Garage Screen Doors</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground/70 mb-1">Message</label>
                <textarea id="message" name="message" rows={4} className="w-full border border-brand-silver/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue resize-none" />
              </div>
              <button type="submit" className="inline-flex items-center justify-center px-6 py-3 rounded font-display text-sm uppercase tracking-wider font-semibold bg-brand-red text-white hover:bg-red-700 shadow-md hover:shadow-lg transition-all">
                Send Message
              </button>
            </form>
          </div>

          <div>
            <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">Info</h2>
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="font-display text-sm uppercase tracking-wider text-brand-gold mb-1">Address</h3>
                <p className="text-foreground/70">705 NC Hwy 61<br />Whitsett, NC 27377</p>
              </div>
              <div>
                <h3 className="font-display text-sm uppercase tracking-wider text-brand-gold mb-1">Phone</h3>
                <a href="tel:+13360000000" className="text-brand-blue hover:text-brand-red transition-colors">(336) 000-0000</a>
              </div>
              <div>
                <h3 className="font-display text-sm uppercase tracking-wider text-brand-gold mb-1">Hours</h3>
                <p className="text-foreground/70 text-sm">
                  Monday – Friday: 7:00 AM – 6:00 PM<br />
                  Saturday: 8:00 AM – 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
              <div>
                <h3 className="font-display text-sm uppercase tracking-wider text-brand-gold mb-1">Coverage Area</h3>
                <p className="text-foreground/70 text-sm">Serving Whitsett &amp; Surrounding Areas including Burlington, Greensboro, Gibsonville, McLeansville, Elon, and the greater Piedmont Triad.</p>
              </div>
            </div>

            <CTAButton text="Book Online" variant="primary" />

            <div className="mt-8 rounded-lg overflow-hidden shadow-md aspect-[4/3]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3231.7!2d-79.58!3d36.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDA0JzEyLjAiTiA3OcKwMzQnNDguMCJX!5e0!3m2!1sen!2sus!4v1"
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
