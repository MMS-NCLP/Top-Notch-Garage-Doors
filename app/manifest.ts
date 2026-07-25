import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Top-Notch Garage Doors',
    short_name: 'TNGD',
    description: 'Professional garage door repair, installation, and maintenance serving the Piedmont Triad corridor from Statesville to Durham, NC.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#002868',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/images/logos/tngd-logo-badge.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/logos/tngd-logo-badge.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
