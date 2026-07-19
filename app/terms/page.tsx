import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta({
  title: 'Terms of Service',
  description: 'Terms of Service for Top-Notch Garage Doors website and services.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl text-brand-blue uppercase mb-4">Terms of Service</h1>
        <p className="text-sm text-foreground/40 mb-8">Last updated: July 19, 2026</p>

        <div className="prose prose-sm max-w-none text-foreground/70 space-y-6">
          <h2 className="font-display text-xl text-brand-blue mt-8">1. Acceptance of Terms</h2>
          <p>By accessing and using the Top-Notch Garage Doors website (topnotchgaragedoors.com), you agree to be bound by these Terms of Service. If you do not agree, please do not use our website.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">2. Services</h2>
          <p>Top-Notch Garage Doors provides garage door repair, installation, maintenance, pressure washing, and related services in Whitsett, NC and surrounding areas. Service availability, pricing, and scheduling are subject to change without notice.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">3. Appointments and Scheduling</h2>
          <p>Appointments booked through our website or Square scheduling system are subject to availability. We reserve the right to reschedule appointments due to weather, emergencies, or other circumstances beyond our control. We will make reasonable efforts to notify you of any changes.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">4. Pricing and Payment</h2>
          <p>All prices quoted on our website are estimates and may vary based on actual conditions, parts required, and scope of work. Final pricing is confirmed in a written estimate before work begins. Payment is due upon completion of service unless other arrangements are made in writing.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">5. Warranties</h2>
          <p>Our labor warranty and manufacturer warranties are detailed on our Warranty page. Warranty coverage is subject to the terms and conditions specified therein and does not cover damage from misuse, acts of nature, or unauthorized modifications.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">6. User-Submitted Content</h2>
          <p>By submitting reviews, photos, or other content to our website, you grant Top-Notch Garage Doors a non-exclusive, royalty-free license to use, display, and publish that content on our website and marketing materials. You represent that any content you submit is truthful and does not violate any third-party rights.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">7. Intellectual Property</h2>
          <p>All content on this website — including text, images, logos, design elements, and code — is the property of Top-Notch Garage Doors or its licensors and is protected by copyright and trademark laws. Unauthorized reproduction or distribution is prohibited.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">8. Limitation of Liability</h2>
          <p>Top-Notch Garage Doors is not liable for any indirect, incidental, or consequential damages arising from your use of our website or services. Our total liability for any claim shall not exceed the amount paid for the specific service in question.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">9. External Links</h2>
          <p>Our website may contain links to third-party websites (manufacturers, scheduling services, design tools). We are not responsible for the content, privacy practices, or availability of these external sites.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">10. Governing Law</h2>
          <p>These Terms are governed by the laws of the State of North Carolina. Any disputes shall be resolved in the courts of Guilford County, North Carolina.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">11. Changes to Terms</h2>
          <p>We reserve the right to modify these Terms at any time. Continued use of our website after changes constitutes acceptance of the updated Terms.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">12. Contact</h2>
          <address className="not-italic">
            <p>Top-Notch Garage Doors</p>
            <p>705 NC Hwy 61, Whitsett, NC 27377</p>
            <p>Phone: (336) 000-0000</p>
          </address>
        </div>
      </div>
    </section>
  );
}
