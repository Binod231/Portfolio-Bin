import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Binod Prasad Joshi | Cloud & DevOps Consultant | Solutions Architect",
    template: "%s | Binod Prasad Joshi"
  },
  description: "Official portfolio of Binod Prasad Joshi. Cloud & DevOps Consultant, 2x AWS Certified Solutions Architect, and AWS Community Builder. Specializing in AWS infrastructure modernization, zero-downtime CI/CD automation, and cloud-native systems.",
  keywords: [
    "Binod Prasad Joshi",
    "DevOps Consultant",
    "Cloud Consultant",
    "AWS Certified Solutions Architect",
    "AWS Community Builder",
    "Cloud Architecture",
    "Docker & ECS Fargate",
    "CI/CD Automation",
    "FastAPI & Python",
    "PostgreSQL & Redis",
    "DevSecOps",
    "FinOps Cost Optimization"
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
    title: "Binod Prasad Joshi | Cloud & DevOps Consultant | Solutions Architect",
    description: "Cloud & DevOps Consultant and AWS Community Builder. Architecting resilient cloud systems, automated CI/CD pipelines, and cost-optimized infrastructure.",
    siteName: "Binod Prasad Joshi - Cloud & DevOps Consultant",
    images: [
      {
        url: "/portfoilo.jpeg",
        width: 1200,
        height: 630,
        alt: "Binod Prasad Joshi - Cloud & DevOps Consultant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Binod Prasad Joshi | Cloud & DevOps Consultant | Solutions Architect",
    description: "AWS Certified Solutions Architect & Developer Associate. DevOps Consultant & AWS Community Builder.",
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning={true}
        className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable} antialiased text-neutral-900 dark:text-neutral-100 font-sans relative selection:bg-neutral-200 dark:selection:bg-neutral-800 bg-white dark:bg-[#111418] transition-colors duration-200`}
      >
        <StructuredData />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
