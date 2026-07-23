import Link from 'next/link';
import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';
import { faqSchema } from '@/lib/schema';
import { FileText, Download, Shield, Wrench, BookOpen, ExternalLink } from 'lucide-react';

export const metadata = genMeta({
  title: 'Warranty Information & Documents',
  description: 'Warranty details, downloadable manufacturer documents, and product registration links for Clopay, Hormann, Lifestyle Screens, Chamberlain, and Genie products.',
  path: '/warranty',
});

const faqs = [
  { question: 'What does the TNGD labor warranty cover?', answer: 'Our labor warranty covers defects in installation workmanship for 2 years from the date of service. If an issue arises from how we installed or repaired your door, we fix it at no charge.' },
  { question: 'What about manufacturer warranties?', answer: 'Manufacturer warranties vary by brand and product. Clopay offers lifetime limited warranties on residential steel doors. Hormann offers lifetime limited warranties on steel sections. Lifestyle Screens offers a lifetime limited parts warranty. See the documents below for full details.' },
  { question: 'Are springs covered under warranty?', answer: 'Yes. Clopay covers hardware and springs for 3 years. Hormann covers springs for 3 years across all models, with hardware coverage ranging from 2 to 8 years depending on the model series.' },
  { question: 'How do I register my product for warranty?', answer: 'Use the registration links below. Chamberlain/LiftMaster, Clopay, and Genie each have their own online registration portals. We recommend registering within 30 days of installation.' },
  { question: 'How do I make a warranty claim?', answer: 'Call us at (336) 604-6494. We keep records of all installations and repairs. If your issue is covered under warranty, we schedule the repair at no cost to you. For manufacturer claims, we handle the process on your behalf.' },
  { question: 'Does the warranty transfer if I sell my home?', answer: 'Most manufacturer warranties apply only to the original purchaser and are non-transferable. Our labor warranty is tied to the property address, so it transfers with the home.' },
  { question: 'What voids a warranty?', answer: 'Unauthorized modifications, improper maintenance, damage from vehicles or storms, repairs performed by unlicensed individuals, and failure to follow manufacturer installation or maintenance instructions.' },
];

const warrantyDocs = [
  {
    brand: 'Clopay',
    docs: [
      {
        title: 'Steel Garage Doors Warranty',
        description: 'Covers models 94, T40, T42, T50, T52, HDB, HDS, 4200, 5500, 70B series. Lifetime limited on sections for single-family residential.',
        filename: 'clopay-steel-doors-warranty.pdf',
      },
      {
        title: 'Insulated Steel Garage Doors Warranty',
        description: 'Covers models 4050, 4300, HDG, 2050, 6200, 9130, 9200, HDP, 7200 series. Lifetime limited sections, 10-year windows, 3-year hardware/springs.',
        filename: 'clopay-insulated-steel-warranty.pdf',
      },
      {
        title: 'Composite Overlay Garage Doors Warranty',
        description: 'Covers GHxx, GHVxx models. Lifetime limited sections for single-family, 5-year paint/overlay, 10-year windows, 3-year hardware/springs.',
        filename: 'clopay-composite-overlay-warranty.pdf',
      },
    ],
  },
  {
    brand: 'Hormann',
    docs: [
      {
        title: 'Residential Door Warranty',
        description: 'Covers all Hormann residential models including Pro Safe 2100, Therma Safe 3200, Clima Tech 4400, Style Safe 5200, Classic Safe 7200, and more. Lifetime limited on steel sections, 2-8 year hardware, 3-year springs.',
        filename: 'hormann-residential-warranty.pdf',
      },
    ],
  },
  {
    brand: 'Lifestyle Screens',
    docs: [
      {
        title: 'Limited Lifetime Warranty',
        description: 'Covers all Lifestyle Screen products against defects in material and workmanship for the lifetime of original ownership. Limited to parts only — does not cover installer workmanship, screen mesh wear, or UV discoloration.',
        filename: 'lifestyle-screens-warranty.pdf',
      },
    ],
  },
];

const registrationLinks = [
  {
    brand: 'Chamberlain / LiftMaster',
    url: 'https://support.chamberlaingroup.com/s/register-product',
    description: 'Register your LiftMaster or Chamberlain garage door opener, remote, or accessory.',
  },
  {
    brand: 'Clopay',
    url: 'https://www.clopaydoor.com/warranty-registration',
    description: 'Register your Clopay garage door for warranty coverage.',
  },
  {
    brand: 'Genie',
    url: 'https://www.geniecompany.com/support',
    description: 'Register your Genie opener or access support and troubleshooting.',
  },
  {
    brand: 'Lifestyle Screens',
    url: 'https://www.lifestylescreens.com/warranty-registration.html',
    description: 'Register your Lifestyle garage screen for lifetime limited warranty coverage on parts and materials.',
  },
];

export default function WarrantyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      {/* HERO */}
      <section className="py-20 surface-matte">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-4">
            <BookOpen className="w-4 h-4" /> Warranty Guide
          </span>
          <h1 className="font-display text-4xl text-brand-blue uppercase mb-4">Warranty &amp; Coverage</h1>
          <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
            We stand behind every job with a labor warranty and partner with manufacturers who back their products for years — or even a lifetime. Download official warranty documents below or register your product online.
          </p>

          <div className="grid gap-6 md:grid-cols-2 mb-12">
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
              <Wrench className="w-6 h-6 text-brand-blue mb-3" />
              <h2 className="font-display text-xl text-brand-blue mb-3">TNGD Labor Warranty</h2>
              <p className="text-sm text-foreground/70 mb-2"><strong className="text-foreground/80">2 Years</strong> on all installation and repair work</p>
              <p className="text-sm text-foreground/60">Covers defects in workmanship. Does not cover damage from misuse, acts of nature, or normal wear on consumable components.</p>
            </div>
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
              <Shield className="w-6 h-6 text-brand-blue mb-3" />
              <h2 className="font-display text-xl text-brand-blue mb-3">Manufacturer Warranty</h2>
              <p className="text-sm text-foreground/70 mb-2"><strong className="text-foreground/80">Varies by product</strong></p>
              <p className="text-sm text-foreground/60">Clopay, Hormann, Lifestyle Screens, LiftMaster, Chamberlain, and Genie each offer their own warranty programs. We process all claims on your behalf.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* DOWNLOADABLE DOCUMENTS */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-2">Warranty Documents</h2>
          <p className="text-sm text-foreground/60 mb-8">Download official manufacturer warranty documents for your records. All documents are in PDF format.</p>

          {warrantyDocs.map((group) => (
            <div key={group.brand} className="mb-10">
              <h3 className="font-display text-lg text-brand-blue mb-4">{group.brand}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {group.docs.map((doc) => (
                  <div key={doc.filename} className="surface-elevated border border-brand-silver/20 rounded-lg p-5 flex items-start gap-4 gleam">
                    <div className="w-10 h-10 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-sm text-brand-blue mb-1">{doc.title}</h4>
                      <p className="text-xs text-foreground/50 leading-relaxed mb-2">{doc.description}</p>
                      <a
                        href={`/documents/warranties/${doc.filename}`}
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
            </div>
          ))}

          <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-lg p-5 gleam">
            <p className="text-sm text-foreground/70">
              <strong>Need a specific warranty document?</strong> If your product or installation date isn&apos;t covered by the documents above, call us at <a href="tel:+13366046494" className="text-brand-blue hover:text-brand-red transition-colors font-semibold">(336) 604-6494</a>. We maintain records of all installations and can provide your specific warranty details.
            </p>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* PRODUCT REGISTRATION */}
      <section className="py-16 surface-matte">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-2">Register Your Product</h2>
          <p className="text-sm text-foreground/60 mb-8">Register your product directly with the manufacturer to activate warranty coverage. We recommend registering within 30 days of installation.</p>

          <div className="grid gap-4 md:grid-cols-3">
            {registrationLinks.map((reg) => (
              <a
                key={reg.brand}
                href={reg.url}
                target="_blank"
                rel="noopener noreferrer"
                className="surface-elevated border border-brand-silver/20 rounded-lg p-5 gleam hover:border-brand-blue/30 transition-colors group"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-sm text-brand-blue">{reg.brand}</h3>
                  <ExternalLink className="w-4 h-4 text-foreground/30 group-hover:text-brand-blue transition-colors" />
                </div>
                <p className="text-xs text-foreground/50 leading-relaxed">{reg.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4 mb-12">
            {faqs.map((faq) => (
              <div key={faq.question} className="surface-elevated border border-brand-silver/20 rounded-lg p-5 gleam">
                <h3 className="font-display text-base text-brand-blue mb-1">{faq.question}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center space-y-3">
            <CTAButton text="Contact Us About Warranty" variant="primary" />
            <p className="text-xs text-foreground/40">
              Also see our <Link href="/terms" className="text-brand-blue hover:text-brand-red transition-colors underline">Terms of Service</Link> and <Link href="/terms#pressure-washing" className="text-brand-blue hover:text-brand-red transition-colors underline">Pressure Washing Terms &amp; Conditions</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
