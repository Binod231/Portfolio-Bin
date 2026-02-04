"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Code, Cloud, Database, Terminal, User, BookOpen, Globe, Briefcase, Award } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolio } from "@/data/portfolio";
import type { AboutCard } from "@/types";
import ThreeDPhoto from "@/components/ui/ThreeDPhoto";

const AWS_BADGES = ["4fe1dc98-121e-41ed-a1b1-0d611ef6b6ac", "f31fbcf5-1fdc-4f17-9f1b-41d7a1973d5c", "399aee65-8615-4184-8e2e-936079480423", "f3b317af-3010-4168-a35d-57019fab009e", "fab8bca5-d14d-4327-a2d6-8cff3e8e205a"];

const skills = [
  { name: "Python", color: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: <Code size={14} /> },
  { name: "AWS", color: "bg-orange-500/10 text-orange-400 border-orange-500/20", icon: <Cloud size={14} /> },
  { name: "FastAPI", color: "bg-teal-500/10 text-teal-400 border-teal-500/20", icon: <Terminal size={14} /> },
  { name: "Docker", color: "bg-blue-600/10 text-blue-400 border-blue-600/20", icon: <Database size={14} /> },
];

export default function About() {
  return (
    <SectionWrapper id="about" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-600/10 border border-blue-500/30 shadow-lg shadow-blue-500/20">
              <User size={32} className="text-blue-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-400 to-blue-600 font-heading tracking-tight">
              About Me
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Main Narrative Card - Glassmorphism */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, amount: 0.2 }}
               transition={{ duration: 0.4 }}
               className="lg:col-span-8 group relative h-full border border-white/10 rounded-3xl p-6 backdrop-blur-xl bg-slate-900/40 hover:border-blue-500/50 transition-all duration-300 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.05)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1),0_0_60px_-15px_rgba(56,189,248,0.2),inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl transition-all duration-500 bg-blue-600/10 group-hover:bg-blue-600/20"></div>

                <div className="relative z-10">
                    {/* 3D Profile Photo Centered */}
                    <div className="w-full flex justify-center mb-6">
                       <ThreeDPhoto 
                        src={portfolio.personal.photo} 
                        alt="Binod Prasad Joshi" 
                        className="w-36 h-36 md:w-45 md:h-45"
                       />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 font-heading tracking-tight">
                      Hello, I'm Binod Prasad Joshi.
                    </h3>

                    <p className="text-lg text-slate-400 leading-[1.7] mb-4 text-justify tracking-wide antialiased">
                      I'm a <strong>DevOps-focused Cloud Engineer</strong> with hands-on experience designing secure, scalable backend systems on <strong>AWS</strong>. My work centers on bridging application development with reliable cloud infrastructure using <strong>Docker</strong>, <strong>CI/CD automation</strong>, and cloud-native best practices, ensuring high performance, availability, and maintainability in production environments.
                    </p>

                    <p className="text-lg text-slate-400 leading-[1.7] mb-6 text-justify tracking-wide antialiased">
                      Currently at <strong className="text-white">Karnovation Inc.</strong>, I manage cloud infrastructure while optimizing backend and database performance, with a strong focus on <strong>Shift-Left Security</strong>—integrating security early in the development lifecycle. I'm a final-year B.Tech student graduating in May 2026, with growing interests in infrastructure automation, AI/ML-ready cloud systems, and building resilient distributed architectures for long-term professional and research growth.
                    </p>

                    <div className="flex flex-wrap gap-2 mt-6">
                      {skills.map((skill, idx) => (
                        <span key={idx} className={`px-3 py-1.5 rounded-lg border text-sm font-medium flex items-center gap-1.5 tracking-wide ${skill.color}`}>
                          {skill.icon} {skill.name}
                        </span>
                      ))}
                    </div>
                </div>
            </motion.div>

            {/* Stats Column - AWS Badges */}
            <div className="lg:col-span-4 space-y-6">
              {/* 2x AWS Certified - Summary Card */}
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, amount: 0.2 }}
                 transition={{ duration: 0.4 }}
                 className="group relative border border-white/10 p-6 rounded-3xl flex flex-col justify-center items-center text-center backdrop-blur-xl bg-slate-900/40 hover:-translate-y-1 hover:border-blue-500/50 transition-all duration-300 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_40px_-10px_rgba(56,189,248,0.15)]"
              >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl transition-all duration-500 bg-blue-600/10 group-hover:bg-blue-600/20"></div>
                  
                  <div className="relative z-10 w-full flex flex-col items-center">
                      <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20 ring-1 ring-blue-500/30">
                        <ShieldCheck size={32} className="text-blue-400" />
                      </div>
                      <div className="text-3xl font-bold text-white mb-1 font-heading tracking-tight">2x</div>
                      <div className="text-sm text-blue-400 uppercase tracking-widest font-semibold">AWS Certified</div>
                      <div className="mt-4 text-sm text-slate-500 leading-relaxed">Solutions Architect Assoc. & Cloud Practitioner</div>
                  </div>
              </motion.div>

              {/* Badge Images Card - images only, no names */}
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, amount: 0.2 }}
                 transition={{ duration: 0.4 }}
                 className="group relative border border-white/10 p-6 rounded-3xl backdrop-blur-xl bg-slate-900/40 hover:-translate-y-1 hover:border-blue-500/50 transition-all duration-300 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_40px_-10px_rgba(56,189,248,0.15)]"
              >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl transition-all duration-500 bg-blue-600/10 group-hover:bg-blue-600/20"></div>
                  
                  <div className="relative z-10 grid grid-cols-2 gap-4">
                    {AWS_BADGES.map((badgeId) => {
                      const cert = portfolio.certifications.find((c) => "badgeId" in c && c.badgeId === badgeId);
                      if (!cert) return null;
                      const credlyBadgeId = "badgeId" in cert ? cert.badgeId : null;
                      const imgSrc = cert.image ?? (credlyBadgeId ? `https://images.credly.com/size/340x340/badges/${credlyBadgeId}.png` : "");
                      if (!imgSrc) return null;
                      return (
                        <a
                          key={cert.id}
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center p-2 rounded-xl hover:bg-slate-800/50 transition-colors"
                          title={`${cert.title} - ${cert.date}`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={imgSrc}
                            alt={cert.title}
                            className="w-16 h-16 object-contain"
                          />
                        </a>
                      );
                    })}
                  </div>
              </motion.div>

              {/* Custom cards from portfolio.personal.aboutCards */}
              {portfolio.personal.aboutCards?.map((card: AboutCard, idx: number) => {
                const iconMap = {
                  shield: ShieldCheck,
                  cloud: Cloud,
                  code: Code,
                  database: Database,
                  book: BookOpen,
                  globe: Globe,
                  briefcase: Briefcase,
                  award: Award,
                };
                const Icon = iconMap[card.icon as keyof typeof iconMap] || ShieldCheck;
                const themeClasses: Record<string, { border: string; gradient: string; iconBg: string; titleHover: string; glow: string }> = {
                  blue: { border: "hover:border-blue-500/50", gradient: "from-transparent via-blue-500 to-transparent", iconBg: "bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20", titleHover: "group-hover:text-blue-400", glow: "bg-blue-600/10 group-hover:bg-blue-600/20" },
                  purple: { border: "hover:border-purple-500/50", gradient: "from-transparent via-purple-500 to-transparent", iconBg: "bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20", titleHover: "group-hover:text-purple-400", glow: "bg-purple-600/10 group-hover:bg-purple-600/20" },
                  emerald: { border: "hover:border-emerald-500/50", gradient: "from-transparent via-emerald-500 to-transparent", iconBg: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20", titleHover: "group-hover:text-emerald-400", glow: "bg-emerald-600/10 group-hover:bg-emerald-600/20" },
                  amber: { border: "hover:border-amber-500/50", gradient: "from-transparent via-amber-500 to-transparent", iconBg: "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20", titleHover: "group-hover:text-amber-400", glow: "bg-amber-600/10 group-hover:bg-amber-600/20" },
                  cyan: { border: "hover:border-cyan-500/50", gradient: "from-transparent via-cyan-500 to-transparent", iconBg: "bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20", titleHover: "group-hover:text-cyan-400", glow: "bg-cyan-600/10 group-hover:bg-cyan-600/20" },
                };
                const t = themeClasses[card.theme || "blue"] || themeClasses.blue;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: (idx + 2) * 0.1 }}
                    className={`group relative border border-white/10 p-6 rounded-3xl flex items-center gap-4 backdrop-blur-xl bg-slate-900/40 hover:-translate-y-1 ${t.border} transition-all duration-300 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_40px_-10px_rgba(56,189,248,0.15)]`}
                  >
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${t.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl transition-all duration-500 ${t.glow}`} />
                    <div className="relative z-10 flex items-center gap-4">
                      <div className={`p-3 rounded-xl ring-1 ${t.iconBg}`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <div className={`text-white font-bold ${t.titleHover} transition-colors font-heading tracking-tight`}>{card.title}</div>
                        <div className="text-sm text-slate-500 leading-relaxed">{card.subtitle}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

            </div>

          </div>
        </div>
    </SectionWrapper>
  );
}
