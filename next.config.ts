import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/promotions',
        destination: '/coupons',
        permanent: true,
      },
      {
        source: '/services/pressure-washing',
        destination: '/services',
        permanent: false,
      },
      {
        source: '/learn/pressure-washing',
        destination: '/learn',
        permanent: false,
      },
      {
        source: '/blog/pressure-washing-guide-when-why-how',
        destination: '/blog',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
