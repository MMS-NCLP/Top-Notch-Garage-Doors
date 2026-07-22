import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta({
  title: 'Contact Us — Top-Notch Garage Doors',
  description: 'Reach Top-Notch Garage Doors for garage door repair, installation, and service in the Piedmont Triad. Call (336) 604-6494 or submit our contact form.',
  path: '/contact',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
