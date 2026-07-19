import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta({
  title: 'Accessibility Statement',
  description: 'Accessibility commitment and WCAG compliance statement for Top-Notch Garage Doors website.',
  path: '/accessibility',
});

export default function AccessibilityPage() {
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl text-brand-blue uppercase mb-4">Accessibility Statement</h1>
        <p className="text-sm text-foreground/40 mb-8">Last updated: July 19, 2026</p>

        <div className="prose prose-sm max-w-none text-foreground/70 space-y-6">
          <h2 className="font-display text-xl text-brand-blue mt-8">Our Commitment</h2>
          <p>Top-Notch Garage Doors is committed to ensuring that our website is accessible to all users, including those with disabilities. We strive to meet or exceed the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">Accessibility Features</h2>
          <p>Our website includes the following accessibility features:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Semantic HTML structure with proper heading hierarchy</li>
            <li>ARIA labels on interactive elements and navigation</li>
            <li>Keyboard-navigable interface for all interactive components</li>
            <li>Sufficient color contrast ratios (minimum 4.5:1 for normal text)</li>
            <li>Descriptive alt text on all meaningful images</li>
            <li>Responsive design that works across devices and screen sizes</li>
            <li>Clear focus indicators for keyboard navigation</li>
            <li>Form labels and error messages associated with inputs</li>
            <li>Skip navigation links for screen reader users</li>
            <li>No content that flashes more than three times per second</li>
          </ul>

          <h2 className="font-display text-xl text-brand-blue mt-8">Standards We Follow</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>WCAG 2.1 Level AA</li>
            <li>Section 508 of the Rehabilitation Act</li>
            <li>ADA Title III compliance for web-based services</li>
          </ul>

          <h2 className="font-display text-xl text-brand-blue mt-8">Ongoing Efforts</h2>
          <p>We regularly review and test our website to identify and address accessibility barriers. Our efforts include:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Automated accessibility testing during development</li>
            <li>Manual testing with screen readers (NVDA, VoiceOver)</li>
            <li>Keyboard-only navigation testing</li>
            <li>Color contrast verification</li>
            <li>Regular audits of new content and features</li>
          </ul>

          <h2 className="font-display text-xl text-brand-blue mt-8">Known Limitations</h2>
          <p>While we strive for full accessibility, some third-party embedded content (such as the Clopay design tool and Google Maps) may not meet all accessibility standards. We provide alternative methods to access the same information:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Design tool: Call us for a personalized door selection consultation</li>
            <li>Maps: Our full address is provided in text format on the Contact page</li>
          </ul>

          <h2 className="font-display text-xl text-brand-blue mt-8">Feedback</h2>
          <p>If you encounter any accessibility barriers on our website, please contact us. We take all feedback seriously and will work to resolve issues promptly.</p>
          <address className="not-italic">
            <p>Top-Notch Garage Doors</p>
            <p>705 NC Hwy 61, Whitsett, NC 27377</p>
            <p>Phone: (336) 000-0000</p>
          </address>
          <p>We aim to respond to accessibility-related inquiries within 2 business days.</p>

          <h2 className="font-display text-xl text-brand-blue mt-8">Alternative Access</h2>
          <p>If you are unable to access any content or feature on our website, please call us directly at (336) 000-0000. We will provide the information or service you need through an alternative method.</p>
        </div>
      </div>
    </section>
  );
}
