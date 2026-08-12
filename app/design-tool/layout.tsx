import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta({
  title: 'Design Your Door — Visualize Your New Garage Door',
  description: 'Upload a photo of your home and visualize how different garage door styles will look. Powered by Clopay\'s Door Imagination System.',
  path: '/design-tool',
});

export default function DesignToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
