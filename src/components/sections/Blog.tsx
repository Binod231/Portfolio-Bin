"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolio } from "@/data/portfolio";
import { BookOpen, ExternalLink, Calendar, Tag, Award } from "lucide-react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const blogStyles: Record<string, { 
    border: string; 
    gradient: string; 
    iconBg: string; 
    tag: string; 
    glow: string; 
    shadow: string; 
    titleHover: string;
}> = {
  blue: {
    border: "hover:border-blue-500/50",
    gradient: "from-transparent via-blue-500 to-transparent",
    iconBg: "text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300 group-hover:ring-blue-500/30",
    tag: "group-hover:border-blue-500/30 group-hover:text-blue-300",
    glow: "bg-blue-600/10 group-hover:bg-blue-600/20",
    shadow: "hover:shadow-blue-500/10",
    titleHover: "group-hover:text-blue-400"
  },
  orange: {
    border: "hover:border-orange-500/50",
    gradient: "from-transparent via-orange-500 to-transparent",
    iconBg: "text-orange-400 group-hover:bg-orange-500/20 group-hover:text-orange-300 group-hover:ring-orange-500/30",
    tag: "group-hover:border-orange-500/30 group-hover:text-orange-300",
    glow: "bg-orange-600/10 group-hover:bg-orange-600/20",
    shadow: "hover:shadow-orange-500/10",
    titleHover: "group-hover:text-orange-400"
  },
  emerald: {
    border: "hover:border-emerald-500/50",
    gradient: "from-transparent via-emerald-500 to-transparent",
    iconBg: "text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 group-hover:ring-emerald-500/30",
    tag: "group-hover:border-emerald-500/30 group-hover:text-emerald-300",
    glow: "bg-emerald-600/10 group-hover:bg-emerald-600/20",
    shadow: "hover:shadow-emerald-500/10",
    titleHover: "group-hover:text-emerald-400"
  },
  amber: {
    border: "hover:border-amber-500/50",
    gradient: "from-transparent via-amber-500 to-transparent",
    iconBg: "text-amber-400 group-hover:bg-amber-500/20 group-hover:text-amber-300 group-hover:ring-amber-500/30",
    tag: "group-hover:border-amber-500/30 group-hover:text-amber-300",
    glow: "bg-amber-600/10 group-hover:bg-amber-600/20",
    shadow: "hover:shadow-amber-500/10",
    titleHover: "group-hover:text-amber-400"
  },
  purple: {
    border: "hover:border-purple-500/50",
    gradient: "from-transparent via-purple-500 to-transparent",
    iconBg: "text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 group-hover:ring-purple-500/30",
    tag: "group-hover:border-purple-500/30 group-hover:text-purple-300",
    glow: "bg-purple-600/10 group-hover:bg-purple-600/20",
    shadow: "hover:shadow-purple-500/10",
    titleHover: "group-hover:text-purple-400"
  },
  violet: {
    border: "hover:border-violet-500/50",
    gradient: "from-transparent via-violet-500 to-transparent",
    iconBg: "text-violet-400 group-hover:bg-violet-500/20 group-hover:text-violet-300 group-hover:ring-violet-500/30",
    tag: "group-hover:border-violet-500/30 group-hover:text-violet-300",
    glow: "bg-violet-600/10 group-hover:bg-violet-600/20",
    shadow: "hover:shadow-violet-500/10",
    titleHover: "group-hover:text-violet-400"
  }
};

export default function Blog() {
  const { blogs } = portfolio;

  // Spotlight blogs always appear first
  const sortedBlogs = [...blogs].sort((a, b) => {
    const aSpot = 'spotlight' in a ? 1 : 0;
    const bSpot = 'spotlight' in b ? 1 : 0;
    return bSpot - aSpot;
  });

  return (
    <SectionWrapper id="blog" delay={0.6} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          {/* --- MODERN HEADER: BLOG (Indigo/Purple) --- */}
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/10 border border-indigo-500/30 shadow-lg shadow-indigo-500/20">
              <BookOpen size={32} className="text-indigo-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-400 to-indigo-600">
              Featured Articles
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedBlogs.map((blog, index) => {
             const style = blogStyles[blog.color || 'blue'] || blogStyles.blue;
             return (
              <RevealOnScroll key={index} delay={index * 100}>
                {/* --- MODERN BLOG CARD --- */}
                <a 
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    group relative h-full border rounded-2xl p-6 
                    backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 block
                    ${blog.spotlight 
                      ? 'border-amber-500/30 bg-gradient-to-b from-slate-900/60 to-amber-500/5 shadow-[0_8px_32px_rgba(245,158,11,0.08),0_0_0_1px_rgba(245,158,11,0.1)] hover:shadow-[0_16px_48px_rgba(245,158,11,0.2),0_0_0_1px_rgba(245,158,11,0.25)] hover:border-amber-400/50' 
                      : `border-white/10 bg-slate-900/40 shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)] ${style.border} ${style.shadow}`
                    }
                  `}
                >
                  {/* Top Gradient Line */}
                  <div className={`
                    absolute top-0 left-0 w-full h-1 rounded-t-2xl transition-opacity duration-500
                    ${blog.spotlight 
                      ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 opacity-60 group-hover:opacity-100' 
                      : `bg-gradient-to-r ${style.gradient} opacity-0 group-hover:opacity-100`
                    }
                  `}></div>

                  {/* Spotlight Badge */}
                  {blog.spotlight && (
                     <div className="absolute -top-3 left-6 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 border border-amber-400/60 shadow-lg shadow-amber-500/25">
                       <span className="relative flex h-2 w-2">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                         <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                       </span>
                       <Award size={12} className="text-white animate-pulse" />
                       <span className="text-[9px] font-black uppercase tracking-widest text-white">
                         SPOTLIGHT
                       </span>
                       <span className="text-white/40 text-[9px] font-light">|</span>
                       <span className="text-[9px] font-bold uppercase tracking-wider text-amber-100">
                         {blog.spotlight}
                       </span>
                     </div>
                   )}

                  <div className="mb-6 relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`
                        p-3 rounded-xl 
                        transition-all duration-300 ring-1 ring-slate-700/50
                        ${style.iconBg}
                      `}>
                        <BookOpen size={24} />
                      </div>
                      <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <div className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                          <ExternalLink size={18} />
                        </div>
                      </div>
                    </div>
                    
                    <h3 className={`text-xl font-bold text-white mb-3 ${style.titleHover} transition-colors line-clamp-2`}>
                      {blog.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {blog.description}
                    </p>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                      <Calendar size={14} />
                      <span>{blog.date}</span>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="mt-auto flex flex-wrap gap-2 relative z-10">
                    {blog.tags.map((tag, i) => (
                      <span key={i} className={`
                        text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-lg
                        text-slate-400 border border-slate-700
                        ${style.tag} transition-colors
                      `}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Background Glow Effect */}
                  <div className={`
                    absolute -bottom-10 -right-10 w-32 h-32 
                    rounded-full blur-3xl transition-all duration-500
                    ${blog.spotlight ? 'bg-amber-600/10 group-hover:bg-amber-600/20' : style.glow}
                  `}></div>
                </a>
              </RevealOnScroll>
             );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
