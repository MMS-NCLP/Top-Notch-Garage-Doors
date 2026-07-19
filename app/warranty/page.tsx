import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';
import { faqSchema } from '@/lib/schema';
import { FileText, Download, Shield, Wrench, BookOpen } from 'lucide-react';

export const metadata = genMeta({
  title: 'Warranty Information & Documents',
  description: 'Warranty details, downloadable documents, and coverage information for garage door products and labor from Top-Notch Garage Doors.',
  path: '/warranty',
});

const faqs = [
  { question: 'What does the labor warranty cover?', answer: 'Our labor warranty covers defects in installation workmanship for 2 years from the date of service. If an issue arises from how we installed or repaired your door, we fix it at no charge.' },
  { question: 'What about manufacturer warranties?', answer: 'Manufacturer warranties vary by brand and product. Clopay offers lifetime limited warranties on residential doors. LiftMaster provides 5-year motor and parts warranties. We handle all warranty claims on your behalf.' },
  { question: 'Are springs covered under warranty?', answer: 'Springs carry a manufacturer warranty based on cycle rating. Standard springs are warranted for 10,000 cycles (approximately 7 years). High-cycle springs have proportionally longer warranties.' },
  { question: 'How do I make a warranty claim?', answer: 'Simply call us. We keep records of all installations and repairs. If your issue is covered under warranty, we schedule the repair at no cost to you.' },
  { question: 'Does the warranty transfer if I sell my home?', answer: 'Manufacturer warranties typically transfer to the new homeowner. Our labor warranty is tied to the property address, not the individual — so yes, it transfers.' },
  { question: 'What voids a warranty?', answer: 'Unauthorized modifications, improper maintenance (such as never lubricating springs), damage from vehicles or storms, and repairs performed by unlicensed individuals.' },
];

const warrantyDocs = [
  {
    title: 'Top-Notch Labor Warranty',
    description: '2-year workmanship guarantee covering all installation and repair services performed by our team.',
    filename: 'top-notch-labor-warranty.pdf',
    icon: <Wrench className="w-5 h-5" />,
  },
  {
    title: 'Clopay Residential Door Warranty',
    description: 'Lifetime limited warranty for Clopay residential garage doors. Covers manufacturing defects in materials and workmanship.',
    filename: 'clopay-residential-warranty.pdf',
    icon: <Shield className="w-5 h-5" />,
  },
  {
    title: 'LiftMaster Opener Warranty',
    description: '5-year motor and parts warranty for LiftMaster garage door openers. Covers mechanical and electrical component failures.',
    filename: 'liftmaster-opener-warranty.pdf',
    icon: <Shield className="w-5 h-5" />,
  },
  {
    title: 'Amarr Door Warranty',
    description: 'Lifetime limited warranty for Amarr residential doors. Includes SafeGuard panel and hardware coverage.',
    filename: 'amarr-door-warranty.pdf',
    icon: <Shield className="w-5 h-5" />,
  },
  {
    title: 'Spring Warranty Guide',
    description: 'Warranty terms for torsion and extension springs based on cycle rating (10,000 to 50,000 cycles).',
    filename: 'spring-warranty-guide.pdf',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: 'Warranty Claim Form',
    description: 'Printable warranty claim form. Fill out and call us, or submit via email for fastest processing.',
    filename: 'warranty-claim-form.pdf',
    icon: <FileText className="w-5 h-5" />,
  },
];

export default function WarrantyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      {/* EDUCATION */}
      <section className="py-20 surface-matte">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-4">
            <BookOpen className="w-4 h-4" /> Warranty Guide
          </span>
          <h1 className="font-display text-4xl text-brand-blue uppercase mb-4">Warranty &amp; Coverage</h1>
          <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
            We stand behind every job with a labor warranty and partner with manufacturers who back their products for years or even a lifetime. Here&apos;s how it all works — and how to download your documentation.
          </p>

          <div className="grid gap-6 md:grid-cols-2 mb-12">
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
              <Wrench className="w-6 h-6 text-brand-blue mb-3" />
              <h2 className="font-display text-xl text-brand-blue mb-3">Labor Warranty</h2>
              <p className="text-sm text-foreground/70 mb-2"><strong className="text-foreground/80">2 Years</strong> on all installation and repair work</p>
              <p className="text-sm text-foreground/60">Covers defects in workmanship. Does not cover damage from misuse, acts of nature, or normal wear on consumable components.</p>
            </div>
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
              <Shield className="w-6 h-6 text-brand-blue mb-3" />
              <h2 className="font-display text-xl text-brand-blue mb-3">Manufacturer Warranty</h2>
              <p className="text-sm text-foreground/70 mb-2"><strong className="text-foreground/80">Varies by product</strong></p>
              <p className="text-sm text-foreground/60">Clopay: Lifetime limited. LiftMaster: 5-year motor/parts. Amarr: Lifetime limited. We process all claims for you.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* DOWNLOADABLE DOCUMENTS */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">Warranty Documents</h2>
          <p className="text-sm text-foreground/60 mb-8">Download warranty documents for your records. All documents are in PDF format.</p>

          <div className="grid gap-4 md:grid-cols-2">
            {warrantyDocs.map((doc) => (
              <div key={doc.filename} className="surface-elevated border border-brand-silver/20 rounded-lg p-5 flex items-start gap-4 gleam">
                <div className="w-10 h-10 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue shrink-0">
                  {doc.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-sm text-brand-blue mb-1">{doc.title}</h3>
                  <p className="text-xs text-foreground/50 leading-relaxed mb-2">{doc.description}</p>
                  <a
                    href={`/warranty/${doc.filename}`}
                    download
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-red hover:text-red-700 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-brand-gold/10 border border-brand-gold/30 rounded-lg p-5 gleam">
            <p className="text-sm text-foreground/70">
              <strong>Need a specific warranty document?</strong> If your product or installation date isn&apos;t covered by the documents above, call us at (336) 000-0000. We maintain records of all installations and can provide your specific warranty details.
            </p>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* FAQ */}
      <section className="py-16 surface-matte">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6 mb-12">
            {faqs.map((faq) => (
              <div key={faq.question} className="surface-elevated border border-brand-silver/20 rounded-lg p-5 gleam">
                <h3 className="font-display text-base text-brand-blue mb-1">{faq.question}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <CTAButton text="Contact Us About Warranty" variant="primary" />
          </div>
        </div>
      </section>
    </>
  );
}
