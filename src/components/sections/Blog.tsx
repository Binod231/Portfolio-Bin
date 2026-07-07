"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolio } from "@/data/portfolio";
import { BookOpen, ExternalLink, Calendar, Award } from "lucide-react";
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
    const dateA = 'date' in a && a.date ? new Date(a.date).getTime() : 0;
    const dateB = 'date' in b && b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <SectionWrapper id="blog" delay={0.6} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/10 border border-indigo-500/30 shadow-lg shadow-indigo-500/20">
              <BookOpen size={32} className="text-indigo-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-400 to-indigo-600">
              Featured Articles
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBlogs.map((blog, index) => {
            const isWinner = 'winner' in blog && blog.winner;
            const isSpotlight = !isWinner && 'spotlight' in blog && blog.spotlight;
            const style = blogStyles[blog.color || 'blue'] || blogStyles.blue;

            /* ── 🏆 WINNER: compact full-width banner ─────────────────── */
            if (isWinner) {
              return (
                <div key={index} className="lg:col-span-3 md:col-span-2">
                  <RevealOnScroll delay={0}>
                    <a
                      href={blog.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block rounded-2xl border border-emerald-500/25
                        bg-slate-900/55 backdrop-blur-xl p-5
                        shadow-[0_2px_20px_rgba(16,185,129,0.08)]
                        hover:shadow-[0_6px_32px_rgba(16,185,129,0.18)]
                        hover:border-emerald-400/45 hover:-translate-y-0.5
                        transition-all duration-300"
                    >
                      {/* Thin top line */}
                      <div className="absolute top-0 left-0 w-full h-[2px] rounded-t-2xl
                        bg-gradient-to-r from-emerald-400 via-green-300 to-yellow-400
                        opacity-60 group-hover:opacity-100 transition-opacity duration-400" />

                      {/* Subtle bg glow */}
                      <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full
                        bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10
                        transition-all duration-700 pointer-events-none" />

                      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:gap-6">
                        {/* Left */}
                        <div className="flex-1 min-w-0">
                          {/* Winner pill */}
                          <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full
                            bg-emerald-500/10 border border-emerald-500/25">
                            <span className="text-base leading-none">🏆</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-300">
                              AWS Data 4×4 Winner
                            </span>
                            <span className="text-emerald-600/50 mx-0.5">·</span>
                            <span className="text-[10px] font-semibold text-yellow-400/80">$100 AWS Credits</span>
                            <span className="relative flex h-1.5 w-1.5 ml-0.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                            </span>
                          </div>

                          <h3 className="text-lg md:text-xl font-bold text-white mb-1.5
                            group-hover:text-emerald-300 transition-colors duration-300 leading-snug">
                            {blog.title}
                          </h3>
                          <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-3 max-w-3xl">
                            {blog.description}
                          </p>

                          <div className="flex flex-wrap gap-1.5">
                            {blog.tags.map((tag, i) => (
                              <span key={i} className="text-[10px] uppercase font-bold tracking-wider
                                px-2 py-0.5 rounded border border-emerald-600/20 text-emerald-500/70
                                group-hover:border-emerald-500/35 group-hover:text-emerald-300/90 transition-colors">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Right: date + link */}
                        <div className="flex md:flex-col items-center md:items-end gap-3 mt-4 md:mt-0 shrink-0">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Calendar size={11} />
                            <span>{blog.date}</span>
                          </div>
                          <span className="flex items-center gap-1 text-xs font-semibold
                            text-emerald-400 group-hover:text-emerald-300 transition-colors whitespace-nowrap">
                            Read Article <ExternalLink size={11} />
                          </span>
                        </div>
                      </div>
                    </a>
                  </RevealOnScroll>
                </div>
              );
            }

            /* ── ⭐ SPOTLIGHT: amber card, badge inline ────────────────── */
            if (isSpotlight) {
              return (
                <RevealOnScroll key={index} delay={index * 80}>
                  <a
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative h-full flex flex-col rounded-2xl
                      border border-amber-500/18 bg-slate-900/50 backdrop-blur-xl p-5
                      shadow-[0_2px_16px_rgba(245,158,11,0.06)]
                      hover:shadow-[0_8px_32px_rgba(245,158,11,0.15)]
                      hover:border-amber-400/35 hover:-translate-y-0.5
                      transition-all duration-300"
                  >
                    {/* Top stripe */}
                    <div className="absolute top-0 left-0 w-full h-[2px] rounded-t-2xl
                      bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-400
                      opacity-35 group-hover:opacity-80 transition-opacity duration-400" />

                    {/* Bg glow */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full
                      bg-amber-600/5 blur-3xl group-hover:bg-amber-600/12
                      transition-all duration-700 pointer-events-none" />

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="p-2.5 rounded-xl ring-1 ring-amber-700/25
                            text-amber-400 group-hover:bg-amber-500/12
                            group-hover:ring-amber-500/35 transition-all duration-300">
                            <BookOpen size={17} />
                          </div>
                          {/* Inline spotlight pill */}
                          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full
                            bg-amber-500/8 border border-amber-500/20">
                            <Award size={8} className="text-amber-400" />
                            <span className="text-[8.5px] font-black uppercase tracking-widest text-amber-300/90">
                              Spotlight
                            </span>
                            <span className="text-amber-500/40 text-[8px]">·</span>
                            <span className="text-[8.5px] font-semibold text-amber-200/70">
                              {blog.spotlight}
                            </span>
                          </div>
                        </div>
                        <div className="opacity-35 group-hover:opacity-100 transition-opacity">
                          <div className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                            <ExternalLink size={14} />
                          </div>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-white mb-2
                        group-hover:text-amber-300 transition-colors duration-300 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 flex-1 mb-3">
                        {blog.description}
                      </p>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                        <Calendar size={11} />
                        <span>{blog.date}</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {blog.tags.map((tag, i) => (
                          <span key={i} className="text-[9.5px] uppercase font-bold tracking-wider
                            px-2 py-0.5 rounded border border-amber-700/20 text-slate-400
                            group-hover:border-amber-500/30 group-hover:text-amber-300/75 transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                </RevealOnScroll>
              );
            }

            /* ── 📄 REGULAR CARD ──────────────────────────────────────── */
            return (
              <RevealOnScroll key={index} delay={index * 80}>
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    group relative h-full border rounded-2xl p-5
                    backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 block
                    border-white/8 bg-slate-900/40
                    shadow-[0_4px_20px_rgba(0,0,0,0.35)]
                    hover:shadow-[0_10px_36px_rgba(0,0,0,0.45)]
                    ${style.border} ${style.shadow}
                  `}
                >
                  <div className={`
                    absolute top-0 left-0 w-full h-[2px] rounded-t-2xl transition-opacity duration-400
                    bg-gradient-to-r ${style.gradient} opacity-0 group-hover:opacity-100
                  `} />

                  <div className="mb-5 relative z-10">
                    <div className="flex justify-between items-start mb-3">
                      <div className={`p-2.5 rounded-xl transition-all duration-300 ring-1 ring-slate-700/50 ${style.iconBg}`}>
                        <BookOpen size={20} />
                      </div>
                      <div className="opacity-40 group-hover:opacity-100 transition-opacity">
                        <div className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                          <ExternalLink size={15} />
                        </div>
                      </div>
                    </div>

                    <h3 className={`text-base font-bold text-white mb-2 ${style.titleHover} transition-colors line-clamp-2`}>
                      {blog.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-3 line-clamp-3">
                      {blog.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                      <Calendar size={12} />
                      <span>{blog.date}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-1.5 relative z-10">
                    {blog.tags.map((tag, i) => (
                      <span key={i} className={`
                        text-[9.5px] uppercase font-bold tracking-wider px-2 py-0.5 rounded
                        text-slate-400 border border-slate-700/70
                        ${style.tag} transition-colors
                      `}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={`
                    absolute -bottom-8 -right-8 w-28 h-28
                    rounded-full blur-3xl transition-all duration-500 pointer-events-none ${style.glow}
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
