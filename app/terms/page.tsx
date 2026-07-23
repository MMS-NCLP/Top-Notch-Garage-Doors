import Link from 'next/link';
import { generateMetadata as genMeta } from '@/lib/seo';
import { Download } from 'lucide-react';

export const metadata = genMeta({
  title: 'Terms of Service',
  description: 'Terms of Service for Top-Notch Garage Doors website, garage door services, and pressure washing services.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl text-brand-blue uppercase mb-4">Terms of Service</h1>
        <p className="text-sm text-foreground/40 mb-8">Last updated: July 22, 2026</p>

        <div className="prose prose-sm max-w-none text-foreground/70 space-y-6">
          <h2 className="font-display text-xl text-brand-blue mt-8">1. Acceptance of Terms</h2>
          <p>By accessing and using the Top-Notch Garage Doors website (www.trytopnotchdoors.com), you agree to be bound by these Terms of Service. If you do not agree, please do not use our website.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">2. Services</h2>
          <p>Top-Notch Garage Doors LLC provides garage door repair, installation, maintenance, garage screen doors, pressure washing, and related services serving the Piedmont Triad corridor from Statesville to Durham, NC. Service availability, pricing, and scheduling are subject to change without notice.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">3. Appointments and Scheduling</h2>
          <p>Appointments booked through our website or Square scheduling system are subject to availability. We reserve the right to reschedule appointments due to weather, emergencies, or other circumstances beyond our control. We will make reasonable efforts to notify you of any changes.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">4. Pricing and Payment</h2>
          <p>All prices quoted on our website are estimates and may vary based on actual conditions, parts required, and scope of work. Final pricing is confirmed in a written estimate before work begins. Payment is due upon completion of service unless other arrangements are made in writing.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">5. Warranties</h2>
          <p>Our labor warranty and manufacturer warranties are detailed on our <Link href="/warranty" className="text-brand-blue hover:text-brand-red transition-colors underline">Warranty page</Link>. Warranty coverage is subject to the terms and conditions specified therein and does not cover damage from misuse, acts of nature, or unauthorized modifications.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">6. User-Submitted Content</h2>
          <p>By submitting reviews, photos, or other content to our website, you grant Top-Notch Garage Doors a non-exclusive, royalty-free license to use, display, and publish that content on our website and marketing materials. You represent that any content you submit is truthful and does not violate any third-party rights.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">7. Intellectual Property</h2>
          <p>All content on this website — including text, images, logos, design elements, and code — is the property of Top-Notch Garage Doors LLC or its licensors and is protected by copyright and trademark laws. Unauthorized reproduction or distribution is prohibited.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">8. Limitation of Liability</h2>
          <p>Top-Notch Garage Doors LLC is not liable for any indirect, incidental, or consequential damages arising from your use of our website or services. Our total liability for any claim shall not exceed the amount paid for the specific service in question.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">9. External Links</h2>
          <p>Our website may contain links to third-party websites (manufacturers, scheduling services, design tools). We are not responsible for the content, privacy practices, or availability of these external sites.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">10. Governing Law</h2>
          <p>These Terms are governed by the laws of the State of North Carolina. Any disputes shall be resolved in the courts of Alamance County, North Carolina.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">11. Changes to Terms</h2>
          <p>We reserve the right to modify these Terms at any time. Continued use of our website after changes constitutes acceptance of the updated Terms.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">12. Contact</h2>
          <address className="not-italic">
            <p>Top-Notch Garage Doors LLC</p>
            <p>1183 University Drive Ste 105, #2115</p>
            <p>Burlington, NC 27215</p>
            <p>Phone: <a href="tel:+13366046494" className="text-brand-blue hover:text-brand-red transition-colors">(336) 604-6494</a></p>
            <p>Fax: (336) 604-0809</p>
          </address>
        </div>

        {/* PRESSURE WASHING TERMS & CONDITIONS */}
        <div className="divider-gleam my-12" />

        <h2 className="font-display text-2xl text-brand-blue uppercase mb-2">Pressure Washing Services — Terms &amp; Conditions</h2>
        <p className="text-sm text-foreground/40 mb-6">Effective Date: May 1, 2025</p>

        <div className="mb-6">
          <a
            href="/documents/tngd-pressure-washing-terms.pdf"
            download
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-red hover:text-red-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Full PDF
          </a>
        </div>

        <div className="prose prose-sm max-w-none text-foreground/70 space-y-6">
          <h3 className="font-display text-lg text-brand-blue mt-6">1. Scope of Service</h3>
          <p>Top Notch Garage Doors LLC (&ldquo;TNGD&rdquo;) offers residential and light commercial pressure washing including driveways, siding, decks, fencing, and more. We may decline unsafe or unsuitable surfaces.</p>

          <h3 className="font-display text-lg text-brand-blue mt-6">2. Estimates &amp; Pricing</h3>
          <p>Estimates valid for 30 days. Final pricing may change after inspection. Full payment due at service unless agreed otherwise.</p>

          <h3 className="font-display text-lg text-brand-blue mt-6">3. Scheduling &amp; Access Requirements</h3>
          <p>Customers must:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Provide access to work areas</li>
            <li>Ensure working outdoor water supply</li>
            <li>Remove obstacles</li>
            <li>Secure pets and children</li>
            <li>Close all doors/windows before arrival</li>
            <li>Protect live power sources</li>
          </ul>
          <p>TNGD is not responsible for water intrusion through worn seals, open windows, or live electrical exposure.</p>

          <h3 className="font-display text-lg text-brand-blue mt-6">4. Customer Preparation Responsibility</h3>
          <p>Customers must complete all prep as instructed. TNGD is not liable for damage due to non-compliance with instructions or faulty seals.</p>

          <h3 className="font-display text-lg text-brand-blue mt-6">5. Weather Policy</h3>
          <p>Services may be rescheduled for inclement weather.</p>

          <h3 className="font-display text-lg text-brand-blue mt-6">6. Surface Acknowledgement &amp; Liability Waiver</h3>
          <p>TNGD is not liable for pre-existing or surface defects. Cleaning involves risks, and fragile materials may suffer damage.</p>

          <h3 className="font-display text-lg text-brand-blue mt-6">7. Chemical Use &amp; Environmental Care</h3>
          <p>We use eco-friendly cleaners. TNGD is not responsible for incidental damage to plants or property near treated areas.</p>

          <h3 className="font-display text-lg text-brand-blue mt-6">8. Right to Refuse or Stop Work</h3>
          <p>We reserve the right to stop work if unsafe conditions, exposed wiring, or aggressive animals are present.</p>

          <h3 className="font-display text-lg text-brand-blue mt-6">9. Damage Claims &amp; Satisfaction</h3>
          <p>Report concerns within 48 hours. Claims must be made within 5 business days with photos.</p>

          <h3 className="font-display text-lg text-brand-blue mt-6">10. Marketing &amp; Photography</h3>
          <p>TNGD may document work for marketing. Clients may opt out in writing.</p>

          <h3 className="font-display text-lg text-brand-blue mt-6">11. Cancellations &amp; Refunds</h3>
          <p>Cancel 48 hours in advance to avoid a $50 fee. Refunds processed in 7 business days. Late cancellations may incur fees.</p>

          <h3 className="font-display text-lg text-brand-blue mt-6">12. Limited Service Warranty</h3>
          <p>7-day workmanship guarantee excludes regrowth, weathering, or issues from poor surface conditions.</p>

          <h3 className="font-display text-lg text-brand-blue mt-6">13. Governing Law</h3>
          <p>Governed by North Carolina law. Venue: Alamance County.</p>

          <h3 className="font-display text-lg text-brand-blue mt-6">14. Acceptance of Terms</h3>
          <p>By scheduling service or signing an agreement, client agrees to all terms and prep responsibilities.</p>
        </div>

        <div className="mt-8 text-sm text-foreground/50 text-center">
          <p>Top Notch Garage Doors LLC &middot; Strong. Spotless. Sealed tight.</p>
          <p>Phone: <a href="tel:+13366046494" className="hover:text-brand-blue transition-colors">(336) 604-6494</a> &middot; www.trytopnotchdoors.com</p>
        </div>
      </div>
    </section>
  );
}
