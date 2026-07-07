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
  },
  green: {
    border: "hover:border-green-500/50",
    gradient: "from-transparent via-green-500 to-transparent",
    iconBg: "text-green-400 group-hover:bg-green-500/20 group-hover:text-green-300 group-hover:ring-green-500/30",
    tag: "group-hover:border-green-500/30 group-hover:text-green-300",
    glow: "bg-green-600/10 group-hover:bg-green-600/20",
    shadow: "hover:shadow-green-500/10",
    titleHover: "group-hover:text-green-400"
  },
  cyan: {
    border: "hover:border-cyan-500/50",
    gradient: "from-transparent via-cyan-500 to-transparent",
    iconBg: "text-cyan-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 group-hover:ring-cyan-500/30",
    tag: "group-hover:border-cyan-500/30 group-hover:text-cyan-300",
    glow: "bg-cyan-600/10 group-hover:bg-cyan-600/20",
    shadow: "hover:shadow-cyan-500/10",
    titleHover: "group-hover:text-cyan-400"
  },
  red: {
    border: "hover:border-red-500/50",
    gradient: "from-transparent via-red-500 to-transparent",
    iconBg: "text-red-400 group-hover:bg-red-500/20 group-hover:text-red-300 group-hover:ring-red-500/30",
    tag: "group-hover:border-red-500/30 group-hover:text-red-300",
    glow: "bg-red-600/10 group-hover:bg-red-600/20",
    shadow: "hover:shadow-red-500/10",
    titleHover: "group-hover:text-red-400"
  },
  pink: {
    border: "hover:border-pink-500/50",
    gradient: "from-transparent via-pink-500 to-transparent",
    iconBg: "text-pink-400 group-hover:bg-pink-500/20 group-hover:text-pink-300 group-hover:ring-pink-500/30",
    tag: "group-hover:border-pink-500/30 group-hover:text-pink-300",
    glow: "bg-pink-600/10 group-hover:bg-pink-600/20",
    shadow: "hover:shadow-pink-500/10",
    titleHover: "group-hover:text-pink-400"
  }
};

export default function Blog() {
  const { blogs } = portfolio;

  // Sort: 1) Winner first  2) Other spotlights  3) Remaining by date (newest first)
  const sortedBlogs = [...blogs].sort((a, b) => {
    const rank = (blog: typeof blogs[number]) => {
      if ('winner' in blog && blog.winner) return 2;
      if ('spotlight' in blog && blog.spotlight) return 1;
      return 0;
    };
    const rankDiff = rank(b) - rank(a);
    if (rankDiff !== 0) return rankDiff;
    // Same rank → sort by date descending
    const dateA = 'date' in a && a.date ? new Date(a.date).getTime() : 0;
    const dateB = 'date' in b && b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
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
            const isWinner = 'winner' in blog && blog.winner;
            const isSpotlight = !isWinner && 'spotlight' in blog && blog.spotlight;
            const style = blogStyles[blog.color || 'blue'] || blogStyles.blue;

            /* ============================================================
               🏆  4x4 WINNER CARD — full-width hero, green-gold gradient
            ============================================================ */
            if (isWinner) {
              return (
                <RevealOnScroll key={index} delay={0} className="lg:col-span-3 md:col-span-2">
                  <a
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block overflow-hidden rounded-3xl border border-emerald-500/40
                      bg-gradient-to-br from-[#0d1f17] via-slate-900 to-[#0d1a2a]
                      shadow-[0_0_0_1px_rgba(52,211,153,0.15),0_20px_60px_rgba(16,185,129,0.12)]
                      hover:shadow-[0_0_0_1px_rgba(52,211,153,0.4),0_30px_80px_rgba(16,185,129,0.25)]
                      hover:-translate-y-1 transition-all duration-500"
                  >
                    {/* Animated top border */}
                    <div className="absolute top-0 left-0 w-full h-[3px] rounded-t-3xl
                      bg-gradient-to-r from-emerald-400 via-green-300 to-yellow-400 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Corner glows */}
                    <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full
                      bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700" />
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full
                      bg-yellow-500/8 blur-3xl group-hover:bg-yellow-500/15 transition-all duration-700" />

                    <div className="relative z-10 p-8 md:flex md:gap-8 md:items-start">
                      {/* Left column */}
                      <div className="flex-1 min-w-0">
                        {/* 🏆 WINNER BANNER */}
                        <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-2xl
                          bg-gradient-to-r from-emerald-500/20 via-green-400/15 to-yellow-500/10
                          border border-emerald-400/40 shadow-lg shadow-emerald-500/20">
                          <span className="text-lg">🏆</span>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
                            AWS Data 4×4 Winner
                          </span>
                          <span className="text-emerald-500/40">·</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-300">
                            $100 AWS Credits
                          </span>
                          <span className="relative flex h-2 w-2 ml-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                          </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3
                          group-hover:text-emerald-300 transition-colors duration-300 leading-tight">
                          {blog.title}
                        </h3>
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-5 max-w-3xl">
                          {blog.description}
                        </p>

                        {/* Date + Read Now */}
                        <div className="flex flex-wrap items-center gap-4 mb-5">
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Calendar size={13} />
                            <span>{blog.date}</span>
                          </div>
                          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400
                            group-hover:text-emerald-300 transition-colors">
                            Read on AWS Builder Center
                            <ExternalLink size={12} />
                          </span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {blog.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] uppercase font-bold tracking-wider
                              px-3 py-1.5 rounded-lg border border-emerald-500/25 text-emerald-400/80
                              group-hover:border-emerald-400/50 group-hover:text-emerald-300 transition-colors">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right: trophy visual */}
                      <div className="hidden md:flex flex-col items-center justify-center gap-3 pl-6
                        border-l border-emerald-500/20 min-w-[140px]">
                        <div className="w-20 h-20 rounded-2xl
                          bg-gradient-to-br from-emerald-500/20 to-yellow-500/10
                          border border-emerald-400/30 flex items-center justify-center
                          shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40
                          transition-all duration-500 group-hover:scale-110">
                          <span className="text-4xl select-none">🏆</span>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-500 text-center">
                          Community Pick
                        </span>
                      </div>
                    </div>
                  </a>
                </RevealOnScroll>
              );
            }

            /* ============================================================
               ⭐  SPOTLIGHT CARD — amber, slightly wider feel
            ============================================================ */
            if (isSpotlight) {
              return (
                <RevealOnScroll key={index} delay={index * 100}>
                  <a
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative h-full block overflow-hidden rounded-2xl
                      border border-amber-500/25
                      bg-gradient-to-b from-slate-900/70 to-amber-950/20
                      shadow-[0_8px_32px_rgba(245,158,11,0.08),0_0_0_1px_rgba(245,158,11,0.08)]
                      hover:shadow-[0_16px_56px_rgba(245,158,11,0.22),0_0_0_1px_rgba(245,158,11,0.3)]
                      hover:border-amber-400/50 hover:-translate-y-1 transition-all duration-400"
                  >
                    {/* Animated top stripe */}
                    <div className="absolute top-0 left-0 w-full h-[2px] rounded-t-2xl
                      bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-400
                      opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Glow orb */}
                    <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full
                      bg-amber-600/8 blur-3xl group-hover:bg-amber-600/18 transition-all duration-700" />

                    {/* SPOTLIGHT BADGE */}
                    <div className="absolute -top-3 left-5 z-20 flex items-center gap-1.5
                      px-3 py-1 rounded-full
                      bg-gradient-to-r from-amber-500 to-orange-500
                      border border-amber-400/50 shadow-md shadow-amber-500/20">
                      <Award size={10} className="text-white" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-white">Spotlight</span>
                      <span className="text-white/30 text-[9px]">|</span>
                      <span className="text-[9px] font-semibold text-amber-100">{blog.spotlight}</span>
                    </div>

                    <div className="relative z-10 p-6 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4 mt-2">
                        <div className="p-3 rounded-xl transition-all duration-300 ring-1 ring-amber-700/30
                          text-amber-400 group-hover:bg-amber-500/15 group-hover:text-amber-300
                          group-hover:ring-amber-500/30">
                          <BookOpen size={22} />
                        </div>
                        <div className="opacity-40 group-hover:opacity-100 transition-opacity">
                          <div className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                            <ExternalLink size={16} />
                          </div>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2
                        group-hover:text-amber-300 transition-colors duration-300 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                        {blog.description}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                        <Calendar size={13} />
                        <span>{blog.date}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {blog.tags.map((tag, i) => (
                          <span key={i} className="text-[10px] uppercase font-bold tracking-wider
                            px-3 py-1.5 rounded-lg border border-amber-700/30 text-slate-400
                            group-hover:border-amber-500/40 group-hover:text-amber-300 transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                </RevealOnScroll>
              );
            }

            /* ============================================================
               📄  REGULAR CARD — existing themed design
            ============================================================ */
            return (
              <RevealOnScroll key={index} delay={index * 100}>
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    group relative h-full border rounded-2xl p-6
                    backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 block
                    border-white/10 bg-slate-900/40
                    shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)]
                    hover:shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)]
                    ${style.border} ${style.shadow}
                  `}
                >
                  {/* Top Gradient Line */}
                  <div className={`
                    absolute top-0 left-0 w-full h-1 rounded-t-2xl transition-opacity duration-500
                    bg-gradient-to-r ${style.gradient} opacity-0 group-hover:opacity-100
                  `} />

                  <div className="mb-6 relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`
                        p-3 rounded-xl transition-all duration-300 ring-1 ring-slate-700/50
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

                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                      <Calendar size={14} />
                      <span>{blog.date}</span>
                    </div>
                  </div>

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

                  <div className={`
                    absolute -bottom-10 -right-10 w-32 h-32
                    rounded-full blur-3xl transition-all duration-500 ${style.glow}
                  `} />
                </a>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
