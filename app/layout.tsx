import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#a8893c",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://sendreen-store.com'),
  title: {
    default: "سندرين بيوتي - سيروم الجمال الطبيعي | خصم 22%",
    template: "%s | سندرين بيوتي",
  },
  description: "احصلي على سيروم الجمال الطبيعي بفيتامين E والخلاصات النباتية. منتج أصلي مرخص.خصم 22% فقط اليوم. توصيل سريع لجميع محافظات مصر.",
  keywords: ["سيروم للجمال", "فيتامين E", "العناية بالبشرة", "منتجات naturel", "جلد ناضح", "ترطيب بشره", "مصر"],
  authors: [{ name: "Sendreen Beauty" }],
  creator: "سندرين بيوتي",
  publisher: "سندرين بيوتي",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://sendreen-store.com",
    title: "سندرين بيوتي - سيروم الجمال الطبيعي | خصم 22%",
    description: "احصلي على سيروم الجمال الطبيعي بفيتامين E. منتج أصلي مرخص بخصم 22%.",
    siteName: "سندرين بيوتي",
    locale: "ar_EG",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "سندرين بيوتي - سيروم الجمال الطبيعي",
    description: "احصلي على سيروم الجمال الطبيعي بخصم حصري. اطلبي الآن!",
  },
  // verification: سيُضاف بعد ربط Google Search Console
  // verification: {
  //   google: "YOUR_ACTUAL_GOOGLE_VERIFICATION_CODE",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className="h-full antialiased"
    >
      <head>
        <link rel="preload" as="image" href="/assets/logo.jpeg" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
