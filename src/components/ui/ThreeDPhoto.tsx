"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ThreeDPhotoProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ThreeDPhoto({ src, alt, className }: ThreeDPhotoProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();

    if (rect) {
      const width = rect.width;
      const height = rect.height;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;

      x.set(xPct);
      y.set(yPct);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative w-64 h-64 md:w-80 md:h-80 rounded-full cursor-default", className)}
    >
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1), 0 0 80px -20px rgba(56,189,248,0.3), inset 0 1px 0 rgba(255,255,255,0.2), inset -1px -1px 0 rgba(0,0,0,0.1)",
        }}
        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-primary/10 to-secondary/30 p-1 ring-2 ring-white/10"
      >
        {/* Rim light - subtle gradient border */}
        <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/20 to-transparent opacity-60 pointer-events-none" />
        <div className="relative w-full h-full rounded-full overflow-hidden bg-background">
            <Image 
                src={src} 
                alt={alt} 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 256px, 320px"
                priority
            />
            {/* Shine Effect */}
            <div 
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ mixBlendMode: "overlay" }}
            />
        </div>
      </div>
    </motion.div>
  );
}
