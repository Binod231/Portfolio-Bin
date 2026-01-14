"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud } from "lucide-react";

interface CloudPosition {
  x: number;
  y: number;
  scale: number;
}

export default function WelcomeScreen() {
  const [isClicked, setIsClicked] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [cloudPositions, setCloudPositions] = useState<CloudPosition[]>([]);

  // Initialize cloud positions only on client to avoid hydration mismatch
  useEffect(() => {
    setCloudPositions(
      [...Array(8)].map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: Math.random() * 0.5 + 0.5
      }))
    );
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setShowWelcome(true), 800);
  };

  return (
    <AnimatePresence>
      {!isClicked ? (
        <motion.div
          key="clouds"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="fixed inset-0 z-50 bg-gradient-to-b from-sky-400 via-blue-300 to-blue-200 cursor-pointer"
          onClick={handleClick}
        >
          {/* Click hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-center"
            >
              <Cloud className="w-24 h-24 mx-auto text-white/80 mb-4" />
              <p className="text-white text-xl font-medium">Click to enter</p>
            </motion.div>
          </motion.div>

          {/* Animated Clouds */}
          {cloudPositions.map((cloud, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: `${cloud.x}vw`,
                y: `${cloud.y}vh`,
                scale: cloud.scale
              }}
              animate={isClicked ? {
                x: i % 2 === 0 ? "-100vw" : "200vw",
                y: `${Math.random() * 100}vh`,
                opacity: 0,
                scale: 2
              } : {
                x: [`${cloud.x}vw`, `${(cloud.x + 20) % 100}vw`],
                y: [`${cloud.y}vh`, `${(cloud.y + 10) % 100}vh`],
              }}
              transition={isClicked ? {
                duration: 1.5,
                ease: "easeInOut"
              } : {
                duration: 20 + i * 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute pointer-events-none"
            >
              <Cloud className="w-32 h-32 text-white/60" />
            </motion.div>
          ))}
        </motion.div>
      ) : showWelcome ? (
        <motion.div
          key="welcome"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 bg-background flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center space-y-4"
          >
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Welcome
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              to Binod Prasad Joshi's Portfolio
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
