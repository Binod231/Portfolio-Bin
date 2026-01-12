import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import GlobeBackground from "@/components/ui/GlobeBackground";
import Navbar from "@/components/ui/Navbar";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Binod Prasad Joshi | AWS Certified Cloud & Backend Engineer",
    template: "%s | Binod Prasad Joshi"
  },
  description: "Portfolio of Binod Prasad Joshi - AWS Certified Solutions Architect & Developer Associate. Specializing in cloud architecture, backend development, FastAPI, Docker, and cloud-native security.",
  keywords: [
    "Binod Prasad Joshi",
    "AWS Certified",
    "Cloud Engineer",
    "Backend Developer",
    "Solutions Architect",
    "FastAPI",
    "Python Developer",
    "Docker",
    "Cloud Architecture",
    "Nepal Developer",
    "AWS Solutions Architect",
    "AWS Developer Associate",
    "Cloud Native Security",
    "Backend Engineering"
  ],
  authors: [{ name: "Binod Prasad Joshi", url: "https://github.com/Binod231" }],
  creator: "Binod Prasad Joshi",
  publisher: "Binod Prasad Joshi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://binodprasadjoshi.com.np"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://binodprasadjoshi.com.np",
    title: "Binod Prasad Joshi | AWS Certified Cloud & Backend Engineer",
    description: "Portfolio showcasing cloud engineering expertise, AWS certifications, and backend development projects. Specializing in FastAPI, Docker, and cloud-native solutions.",
    siteName: "Binod Prasad Joshi Portfolio",
    images: [
      {
        url: "/portfoilo.jpeg",
        width: 1200,
        height: 630,
        alt: "Binod Prasad Joshi - Cloud & Backend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Binod Prasad Joshi | AWS Certified Cloud & Backend Engineer",
    description: "AWS Certified Solutions Architect & Developer. Specializing in cloud architecture, FastAPI, and backend development.",
    images: ["/portfoilo.jpeg"],
    creator: "@binodprasadjoshi",
  },
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <StructuredData />
      </head>
      <body
        suppressHydrationWarning={true}
        className={`${inter.variable} ${outfit.variable} antialiased text-foreground font-sans relative selection:bg-primary/20 selection:text-primary`}
      >
        {/* Solid Background Layer */}
        <div className="fixed inset-0 bg-background z-[-2]" />
        
        {/* Interactive Canvas Layer - Globe Background */}
        <div className="fixed inset-0 z-[-1]">
           <GlobeBackground />
        </div>
        
        <Navbar />
        
        {/* Content */}
        {children}
      </body>
    </html>
  );
}
