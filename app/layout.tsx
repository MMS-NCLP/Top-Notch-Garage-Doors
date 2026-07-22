import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Oswald, Roboto, Yellowtail } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BUSINESS_SCHEMA } from '@/lib/schema';
import './globals.css';

const norwester = localFont({
  src: '../public/fonts/norwester-400.woff2',
  variable: '--font-norwester',
  display: 'swap',
});

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

const yellowtail = Yellowtail({
  variable: '--font-yellowtail',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Top-Notch Garage Doors | Piedmont Triad, NC',
  description: 'Professional garage door repair, installation, and maintenance serving the Piedmont Triad corridor from Statesville to Mebane. Fast service by real pros — certified & insured.',
  metadataBase: new URL('https://www.trytopnotchdoors.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${norwester.variable} ${oswald.variable} ${roboto.variable} ${yellowtail.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(BUSINESS_SCHEMA) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
