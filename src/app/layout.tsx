import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vid Bolt — AI-Powered Video Production Platform | Idea to Export in Minutes",
  description:
    "Create professional videos with AI. Vid Bolt's multi-agent pipeline handles research, scripting, media generation, editing, and export — all from one command center.",
  keywords: [
    "AI video generator",
    "automated video production",
    "AI video editor",
    "video creation platform",
    "AI content creation",
    "text to video",
    "automated editing",
    "video production software",
    "AI video maker",
    "professional video editor",
  ],
  metadataBase: new URL("https://vidbolt.app"),
  openGraph: {
    title: "Vid Bolt — AI-Powered Video Production Platform",
    description:
      "From idea to export in minutes. AI-driven research, scripting, media generation, editing, and publishing — all from one command center.",
    url: "https://vidbolt.app",
    siteName: "Vid Bolt",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://vidbolt.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vid Bolt — AI-Powered Video Production Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vid Bolt — AI-Powered Video Production",
    description:
      "Create professional videos with AI in minutes. Research, script, produce, edit, export.",
    images: ["https://vidbolt.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://vidbolt.app",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://studio.vidbolt.app" />
        <link rel="dns-prefetch" href="https://discord.gg" />
        <link
          rel="preload"
          href="/devices/feature-command-center.webp"
          as="image"
          type="image/webp"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Vid Bolt",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Web",
              description:
                "AI-powered video production platform that handles research, scripting, media generation, editing, and export from one command center.",
              url: "https://vidbolt.app",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                description: "Free tier available",
              },
              featureList: [
                "AI-powered script generation",
                "Multi-agent production pipeline",
                "GPU-accelerated media generation",
                "Professional timeline video editor",
                "One-click video export",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
