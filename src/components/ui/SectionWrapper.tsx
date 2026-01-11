"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export default function SectionWrapper({ children, id, className, delay = 0 }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-6 md:py-8 px-4 w-full max-w-5xl mx-auto scroll-mt-28", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ 
          once: false, 
          margin: "0px 0px -15% 0px", // Trigger when 15% from bottom of viewport
          amount: 0.2 // Trigger when 20% visible (better for mobile)
        }}
        transition={{ 
          duration: 0.8, // Longer duration for better visibility
          delay, 
          ease: "easeOut" 
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}
