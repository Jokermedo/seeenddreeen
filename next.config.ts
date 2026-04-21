import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ❌ لا تستخدم 'standalone' مع Vercel - هو يعمل على serverless تلقائياً
  // output: 'standalone',  // هذا فقط للـ Docker/self-hosted

  poweredByHeader: false,  // إخفاء X-Powered-By header للأمان
  compress: true,           // Gzip compression

  // تحسين الصور لـ Vercel
  images: {
    formats: ['image/webp', 'image/avif'],  // AVIF أصغر حجماً
    deviceSizes: [390, 640, 750, 1080],     // أحجام شاشات شائعة (iPhone first)
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 86400,                 // cache الصور 24 ساعة
    dangerouslyAllowSVG: false,
    // Vercel يوفر Image Optimization مجاناً (1000 تحويل/شهر في الخطة المجانية)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',    // لصور الإيصالات
      },
    ],
  },

  // إعدادات الـ headers لـ caching وأمان على Vercel
  async headers() {
    return [
      // Static assets - cache طويل جداً (Vercel CDN)
      {
        source: '/:path*.(jpg|jpeg|png|webp|avif|ico|svg)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
      // الصفحات الرئيسية - cache معتدل مع revalidation
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // تحسين الـ bundle
  experimental: {
    optimizePackageImports: [
      'lucide-react',   // تقليل حجم أيقونات lucide
      'framer-motion',  // تحميل framer-motion بشكل جزئي
    ],
  },

  // تقليل حجم الـ JavaScript
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // حذف console.log في production
  },
};

export default nextConfig;
