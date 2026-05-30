import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { FAQJsonLd, LocalBusinessJsonLd, WebsiteJsonLd } from "@/components/JsonLd";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thevirtualvalley.com";
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Virtual Valley - Premium Digital Agency in India",
    template: "%s | Virtual Valley",
  },
  description:
    "Virtual Valley is a premium digital agency in Kolkata offering website development, social media management, and digital marketing services across India.",
  keywords: [
    "digital marketing agency India",
    "website development agency India",
    "social media management agency India",
    "digital agency Kolkata",
    "web design company Kolkata",
    "affordable website development India",
    "social media growth agency for startups",
    "brand identity design agency India",
  ],
  authors: [{ name: "Virtual Valley", url: siteUrl }],
  creator: "Virtual Valley",
  publisher: "Virtual Valley",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Virtual Valley",
    title: "Virtual Valley - Premium Digital Agency in India",
    description:
      "Transform your business with Virtual Valley - premium website development and social media management across India.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Virtual Valley Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Virtual Valley - Premium Digital Agency in India",
    description:
      "Transform your business with Virtual Valley - premium website development and social media management.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="llms" href="/llms.txt" type="text/plain" />
        <LocalBusinessJsonLd />
        <WebsiteJsonLd />
        <FAQJsonLd />
      </head>
      <body className="bg-black text-white">
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
