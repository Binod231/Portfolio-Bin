"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export default function SectionWrapper({ children, id, className, delay = 0 }: SectionWrapperProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id={id} className={cn("py-6 md:py-8 px-4 w-full max-w-5xl mx-auto scroll-mt-28", className)}>
      <motion.div
        initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ 
          once: false, 
          margin: isMobile ? "0px" : "0px 0px -15% 0px",
          amount: isMobile ? 0.1 : 0.2
        }}
        transition={{ 
          duration: isMobile ? 0.3 : 0.6, // Fast on mobile, normal on desktop
          delay: isMobile ? 0 : delay, // No delay on mobile
          ease: "easeOut" 
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}
