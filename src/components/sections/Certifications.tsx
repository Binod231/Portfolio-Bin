"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolio } from "@/data/portfolio";
import { Award, Cloud, Database, GraduationCap, Trophy, Gamepad2 } from "lucide-react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const getIcon = (id: string) => {
  switch (id) {
    case "SAA-C03": return <Award size={24} />;
    case "CLF-C02": return <Cloud size={24} />;
    case "QUEST": return <Gamepad2 size={24} />;
    case "ELITE": return <Award size={24} />;
    case "SQL-50": return <Database size={24} />;
    case "FOUNDATION": return <GraduationCap size={24} />;
    default: return <Award size={24} />;
  }
};

const certStyles: Record<string, { shadow: string; iconText: string; titleGroupText: string; dateText: string }> = {
  orange: {
    shadow: "hover:shadow-orange-900/20",
    iconText: "text-orange-400",
    titleGroupText: "group-hover:text-orange-400",
    dateText: "text-orange-500/80"
  },
  blue: {
    shadow: "hover:shadow-blue-900/20",
    iconText: "text-blue-400",
    titleGroupText: "group-hover:text-blue-400",
    dateText: "text-blue-500/80"
  },
  green: {
    shadow: "hover:shadow-green-900/20",
    iconText: "text-green-400",
    titleGroupText: "group-hover:text-green-400",
    dateText: "text-green-500/80"
  },
  yellow: {
    shadow: "hover:shadow-yellow-900/20",
    iconText: "text-yellow-400",
    titleGroupText: "group-hover:text-yellow-400",
    dateText: "text-yellow-500/80"
  },
  amber: {
    shadow: "hover:shadow-amber-900/20",
    iconText: "text-amber-400",
    titleGroupText: "group-hover:text-amber-400",
    dateText: "text-amber-500/80"
  },
  purple: {
    shadow: "hover:shadow-purple-900/20",
    iconText: "text-purple-400",
    titleGroupText: "group-hover:text-purple-400",
    dateText: "text-purple-500/80"
  }
};

export default function Certifications() {
  const { certifications } = portfolio;

  return (
    <SectionWrapper id="certifications" delay={0.6} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          {/* --- MODERN HEADER: CERTIFICATIONS (Amber/Gold) --- */}
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border border-amber-500/30 shadow-lg shadow-amber-500/20">
              <Award size={32} className="text-amber-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">
              Certifications & Achievements
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => {
            const style = certStyles[cert.theme || 'amber'] || certStyles.amber;
            return (
              <RevealOnScroll key={index} delay={index * 100}>
                {/* --- MODERN CERT CARD --- */}
                <div className={`
                  group relative h-full border border-slate-800 
                  rounded-2xl p-6 flex flex-col items-start gap-4 transition-all duration-300
                  ${cert.border} hover:shadow-2xl ${style.shadow}
                `}>
                  
                  {/* Card Background Gradient (Subtle) */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cert.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>

                  {/* Icon with Glow */}
                  <div className={`
                    relative p-3 rounded-xl ${style.iconText} 
                    ring-1 ring-white/5 shadow-inner group-hover:scale-110 transition-transform duration-300
                  `}>
                    {getIcon(cert.id || "")}
                  </div>

                  <div className="relative z-10 w-full">
                    <h3 className={`text-lg font-bold text-white mb-2 leading-tight ${style.titleGroupText} transition-colors`}>
                      {cert.title}
                    </h3>
                    <div className="text-sm font-medium text-slate-400 mb-4 pb-4 border-b border-white/5">{cert.issuer}</div>
                    
                    <div className="flex items-center justify-between mt-auto w-full pt-2 gap-3">
                       <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 px-2 py-1 rounded border border-white/5 whitespace-nowrap">{cert.id}</span>
                       <span className={`text-xs font-semibold ${style.dateText} text-right`}>{cert.date}</span>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
