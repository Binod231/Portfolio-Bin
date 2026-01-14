"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolio } from "@/data/portfolio";
import { BookOpen, ExternalLink, Calendar, Tag } from "lucide-react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const blogStyles: Record<string, { 
    border: string; 
    gradient: string; 
    iconBg: string; 
    tag: string; 
    glow: string; 
    shadow: string; 
}> = {
  blue: {
    border: "hover:border-blue-500/50",
    gradient: "from-transparent via-blue-500 to-transparent",
    iconBg: "text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300 group-hover:ring-blue-500/30",
    tag: "group-hover:border-blue-500/30 group-hover:text-blue-300",
    glow: "bg-blue-600/10 group-hover:bg-blue-600/20",
    shadow: "hover:shadow-blue-500/10"
  },
  orange: {
    border: "hover:border-orange-500/50",
    gradient: "from-transparent via-orange-500 to-transparent",
    iconBg: "text-orange-400 group-hover:bg-orange-500/20 group-hover:text-orange-300 group-hover:ring-orange-500/30",
    tag: "group-hover:border-orange-500/30 group-hover:text-orange-300",
    glow: "bg-orange-600/10 group-hover:bg-orange-600/20",
    shadow: "hover:shadow-orange-500/10"
  },
  emerald: {
    border: "hover:border-emerald-500/50",
    gradient: "from-transparent via-emerald-500 to-transparent",
    iconBg: "text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 group-hover:ring-emerald-500/30",
    tag: "group-hover:border-emerald-500/30 group-hover:text-emerald-300",
    glow: "bg-emerald-600/10 group-hover:bg-emerald-600/20",
    shadow: "hover:shadow-emerald-500/10"
  }
};

export default function Blog() {
  const { blogs } = portfolio;

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
          {blogs.map((blog, index) => {
             const style = blogStyles[blog.color || 'blue'] || blogStyles.blue;
             return (
              <RevealOnScroll key={index} delay={index * 100}>
                {/* --- MODERN BLOG CARD --- */}
                <a 
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    group relative h-full border border-slate-800 rounded-2xl p-6 
                    hover:-translate-y-2 ${style.border} transition-all duration-300 overflow-hidden
                    shadow-lg ${style.shadow} block
                  `}
                >
                  {/* Top Gradient Line */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${style.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

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
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
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
                    ${style.glow}
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
