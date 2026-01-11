import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import GlobeBackground from "@/components/ui/GlobeBackground";
import Navbar from "@/components/ui/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Binod Prasad Joshi | Cloud & Backend Engineer",
  description: "Portfolio of Binod Prasad Joshi, AWS Certified Backend & Cloud Engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
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
