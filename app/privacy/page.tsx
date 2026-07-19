import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta({
  title: 'Privacy Policy',
  description: 'Privacy Policy for Top-Notch Garage Doors. How we collect, use, and protect your personal information.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl text-brand-blue uppercase mb-4">Privacy Policy</h1>
        <p className="text-sm text-foreground/40 mb-8">Last updated: July 19, 2026</p>

        <div className="prose prose-sm max-w-none text-foreground/70 space-y-6">
          <h2 className="font-display text-xl text-brand-blue mt-8">1. Information We Collect</h2>
          <p>Top-Notch Garage Doors (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects information you voluntarily provide when you:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Submit a contact form or service request</li>
            <li>Book an appointment through our scheduling system</li>
            <li>Submit a review on our website</li>
            <li>Subscribe to our newsletter or promotions</li>
            <li>Interact with our website</li>
          </ul>
          <p>This may include your name, email address, phone number, physical address, service details, and review content.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">2. How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Provide, maintain, and improve our services</li>
            <li>Communicate with you about appointments and service updates</li>
            <li>Process and display approved reviews on our website</li>
            <li>Send promotional offers and company updates (with your consent)</li>
            <li>Comply with legal obligations</li>
            <li>Protect against fraud and unauthorized access</li>
          </ul>

          <h2 className="font-display text-xl text-brand-blue mt-8">3. Information Sharing</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share information with:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Service providers who assist in operating our website and business (hosting, scheduling, payment processing)</li>
            <li>Legal authorities when required by law or to protect our rights</li>
          </ul>

          <h2 className="font-display text-xl text-brand-blue mt-8">4. Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal information, including encrypted data transmission (SSL/TLS), secure database storage, and access controls. However, no method of transmission over the Internet is 100% secure.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">5. Cookies and Tracking</h2>
          <p>Our website may use cookies and similar technologies to enhance your experience, analyze site usage, and deliver relevant content. You can control cookie preferences through your browser settings.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">6. Third-Party Services</h2>
          <p>Our website integrates with third-party services including:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Square (appointment booking and payment processing)</li>
            <li>Supabase (secure data storage)</li>
            <li>Vercel (website hosting)</li>
            <li>Google Maps (location display)</li>
          </ul>
          <p>These services have their own privacy policies governing data use.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal data</li>
            <li>Opt out of marketing communications at any time</li>
            <li>Withdraw consent for data processing</li>
          </ul>

          <h2 className="font-display text-xl text-brand-blue mt-8">8. Children&apos;s Privacy</h2>
          <p>Our services are not directed to individuals under 18. We do not knowingly collect personal information from children.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">9. Changes to This Policy</h2>
          <p>We may update this Privacy Policy periodically. Changes will be posted on this page with an updated revision date.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">10. Contact Us</h2>
          <p>For questions about this Privacy Policy or your personal data, contact us at:</p>
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
