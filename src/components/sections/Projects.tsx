"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolio } from "@/data/portfolio";
import { Terminal, Github, ExternalLink } from "lucide-react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const projectStyles: Record<string, { 
    border: string; 
    gradient: string; 
    iconBg: string; 
    tech: string; 
    glow: string; 
    shadow: string; 
}> = {
  emerald: {
    border: "hover:border-emerald-500/50",
    gradient: "from-transparent via-emerald-500 to-transparent",
    iconBg: "text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 group-hover:ring-emerald-500/30",
    tech: "group-hover:border-emerald-500/30 group-hover:text-emerald-300",
    glow: "bg-emerald-600/10 group-hover:bg-emerald-600/20",
    shadow: "hover:shadow-emerald-500/10"
  },
  blue: {
    border: "hover:border-blue-500/50",
    gradient: "from-transparent via-blue-500 to-transparent",
    iconBg: "text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300 group-hover:ring-blue-500/30",
    tech: "group-hover:border-blue-500/30 group-hover:text-blue-300",
    glow: "bg-blue-600/10 group-hover:bg-blue-600/20",
    shadow: "hover:shadow-blue-500/10"
  },
  amber: {
    border: "hover:border-amber-500/50",
    gradient: "from-transparent via-amber-500 to-transparent",
    iconBg: "text-amber-400 group-hover:bg-amber-500/20 group-hover:text-amber-300 group-hover:ring-amber-500/30",
    tech: "group-hover:border-amber-500/30 group-hover:text-amber-300",
    glow: "bg-amber-600/10 group-hover:bg-amber-600/20",
    shadow: "hover:shadow-amber-500/10"
  },
  pink: {
    border: "hover:border-pink-500/50",
    gradient: "from-transparent via-pink-500 to-transparent",
    iconBg: "text-pink-400 group-hover:bg-pink-500/20 group-hover:text-pink-300 group-hover:ring-pink-500/30",
    tech: "group-hover:border-pink-500/30 group-hover:text-pink-300",
    glow: "bg-pink-600/10 group-hover:bg-pink-600/20",
    shadow: "hover:shadow-pink-500/10"
  },
  cyan: {
    border: "hover:border-cyan-500/50",
    gradient: "from-transparent via-cyan-500 to-transparent",
    iconBg: "text-cyan-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 group-hover:ring-cyan-500/30",
    tech: "group-hover:border-cyan-500/30 group-hover:text-cyan-300",
    glow: "bg-cyan-600/10 group-hover:bg-cyan-600/20",
    shadow: "hover:shadow-cyan-500/10"
  }
};

export default function Projects() {
  const { projects } = portfolio;

  return (
    <SectionWrapper id="projects" delay={0.5} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          {/* --- MODERN HEADER: PROJECTS (Emerald/Teal) --- */}
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-600/10 border border-emerald-500/30 shadow-lg shadow-emerald-500/20">
              <Terminal size={32} className="text-emerald-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-400 to-emerald-600">
              Featured Projects
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
             const style = projectStyles[project.color || 'emerald'] || projectStyles.emerald;
             return (
              <RevealOnScroll key={index} delay={index * 100}>
                {/* --- MODERN PROJECT CARD --- */}
                <div className={`
                  group relative h-full border border-slate-800 rounded-2xl p-6 
                  hover:-translate-y-2 ${style.border} transition-all duration-300 overflow-hidden
                  shadow-lg ${style.shadow}
                `}>
                  {/* Top Gradient Line */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${style.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  <div className="mb-6 relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`
                        p-3 rounded-xl 
                        transition-all duration-300 ring-1 ring-slate-700/50
                        ${style.iconBg}
                      `}>
                        <Terminal size={24} />
                      </div>
                      <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        {project.repo && (
                          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                            <Github size={18} />
                          </a>
                        )}
                        {/* Placeholder for live link */}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      {project.desc}
                    </p>
                  </div>
                  
                  {/* Tech Stack Pills */}
                  <div className="mt-auto flex flex-wrap gap-2 relative z-10">
                    {project.tech.map((t, i) => (
                      <span key={i} className={`
                        text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-lg
                        text-slate-400 border border-slate-700
                        ${style.tech} transition-colors
                      `}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Background Glow Effect */}
                  <div className={`
                    absolute -bottom-10 -right-10 w-32 h-32 
                    rounded-full blur-3xl transition-all duration-500
                    ${style.glow}
                  `}></div>
                </div>
              </RevealOnScroll>
             );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
