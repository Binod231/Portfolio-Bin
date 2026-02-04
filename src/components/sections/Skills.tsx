"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { Cpu, ExternalLink } from "lucide-react";
import Image from "next/image";

// Technology with local icons - User's actual tech stack
const technologies = [
  { name: "AWS", icon: "https://img.icons8.com/color/96/amazon-web-services.png", orbit: 0, angle: 0, size: 100, isCenter: true, speed: 0 },
  
  // Inner orbit - Core Backend (4 items max)
  { name: "FastAPI", icon: "https://cdn.simpleicons.org/fastapi/009688", orbit: 1, angle: 0, size: 65, speed: 30 },
  { name: "Flask", icon: "https://cdn.simpleicons.org/flask/000000", orbit: 1, angle: 90, size: 65, speed: 30 },
  { name: "Django", icon: "https://cdn.simpleicons.org/django/092E20", orbit: 1, angle: 180, size: 65, speed: 30 },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB", orbit: 1, angle: 270, size: 65, speed: 30 },
  
  // Middle orbit - Cloud & DevOps (4 items max)
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED", orbit: 2, angle: 0, size: 60, speed: 40 },
  { name: "GitHub Actions", icon: "https://cdn.simpleicons.org/githubactions/2088FF", orbit: 2, angle: 90, size: 60, speed: 40 },
  { name: "Linux", icon: "https://cdn.simpleicons.org/linux/FCC624", orbit: 2, angle: 180, size: 60, speed: 40 },
  { name: "Redis", icon: "https://cdn.simpleicons.org/redis/DC382D", orbit: 2, angle: 270, size: 60, speed: 40 },
  
  // Outer orbit - Databases & AWS Services (Local AWS Icons)
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1", orbit: 3, angle: 0, size: 55, speed: 50 },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1", orbit: 3, angle: 72, size: 55, speed: 50 },
  { name: "EC2", icon: "/icons/ec2.svg", orbit: 3, angle: 144, size: 55, speed: 50 },
  { name: "S3", icon: "/icons/s3.svg", orbit: 3, angle: 216, size: 55, speed: 50 },
  { name: "RDS", icon: "/icons/rds.svg", orbit: 3, angle: 288, size: 55, speed: 50 },
];

export default function Skills() {
  const orbitRadii = {
    0: 0,
    1: 220,
    2: 370,
    3: 520,
  };

  return (
    <SectionWrapper id="skills" className="relative overflow-visible py-16">
      <div className="max-w-6xl mx-auto mb-12 relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-600/10 border border-emerald-500/30 shadow-lg shadow-emerald-500/20">
            <Cpu size={32} className="text-emerald-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-cyan-400 to-emerald-600">
            Technical Skills
          </h2>
        </div>
      </div>

      <div className="relative w-full min-h-[500px] md:min-h-[1200px] flex items-center justify-center">
        
        {/* Scaling Wrapper for Responsiveness */}
        <div className="relative scale-[0.4] xs:scale-[0.5] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 transition-transform duration-500 origin-center">
          
          {/* Orbit Rings with labels */}
          {[
            { orbit: 1, name: "Core Backend" },
            { orbit: 2, name: "Cloud & DevOps" },
            { orbit: 3, name: "Databases & AWS Services" }
          ].map(({ orbit, name }) => (
            <motion.div
              key={`orbit-${orbit}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-muted/10 transition-colors"
              style={{
                width: orbitRadii[orbit as keyof typeof orbitRadii] * 2,
                height: orbitRadii[orbit as keyof typeof orbitRadii] * 2,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: orbit * 0.1, duration: 0.5 }}
            >
              {/* Orbit label - Always visible */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <span className="text-secondary/50 text-xl md:text-[10px] uppercase tracking-widest font-semibold whitespace-nowrap">
                  {name}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Orbiting Technologies */}
          {technologies.map((tech, index) => {
            const radius = orbitRadii[tech.orbit as keyof typeof orbitRadii];
            const isCenter = tech.orbit === 0;

            return (
              <div
                key={tech.name}
                className={`absolute left-1/2 top-1/2 pointer-events-none ${isCenter ? 'z-50' : 'z-10'}`}
                style={{
                  width: radius * 2,
                  height: radius * 2,
                  marginLeft: -radius,
                  marginTop: -radius,
                }}
              >
                <motion.div
                  className="absolute w-full h-full pointer-events-none"
                  initial={{ rotate: tech.angle }}
                  animate={!isCenter ? { rotate: 360 + tech.angle } : {}}
                  transition={
                    !isCenter
                      ? {
                          duration: tech.speed,
                          repeat: Infinity,
                          ease: "linear",
                        }
                      : {}
                  }
                >
                  {/* Stable wrapper */}
                  <div
                    className={`absolute ${isCenter ? 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' : 'top-0 left-1/2 -translate-x-1/2'} pointer-events-auto`}
                    style={{
                      width: tech.size,
                      height: tech.size,
                    }}
                  >
                    <motion.div
                      className="cursor-pointer w-full h-full"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      whileHover={!isCenter ? { scale: 1.3 } : {}}
                      animate={!isCenter ? { rotate: -360 - tech.angle } : {}}
                      transition={
                        !isCenter
                          ? {
                              scale: { delay: index * 0.05, type: "spring" },
                              opacity: { delay: index * 0.05, type: "spring" },
                              rotate: {
                                duration: tech.speed,
                                repeat: Infinity,
                                ease: "linear",
                              },
                            }
                          : { delay: index * 0.05, type: "spring" }
                      }
                    >
                      {isCenter ? (
                        // AWS Center - Text Badge
                        <a 
                          href="https://www.credly.com/users/binod-prasad-joshi.69a505f6/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 backdrop-blur-md border-2 border-primary/40 flex items-center justify-center shadow-2xl hover:scale-105 transition-transform cursor-pointer"
                        >
                          <div className="text-center">
                            <div className="text-4xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                              AWS
                            </div>
                            <div className="text-sm md:text-sm text-muted-foreground mt-1">Certified</div>
                          </div>
                        </a>
                      ) : (
                        // Pure Icon
                        <div className="w-full h-full">
                          <Image
                            src={tech.icon}
                            alt={tech.name}
                            width={tech.size}
                            height={tech.size}
                            className="w-full h-full object-contain drop-shadow-2xl filter transition-all"
                          />
                        </div>
                      )}
                    </motion.div>
                    
                    {/* Name label - Always visible */}
                    {!isCenter && (
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-[100]">
                        <span className="text-xl md:text-xs font-medium text-foreground/70 bg-background/50 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/5 shadow-sm">
                          {tech.name}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
