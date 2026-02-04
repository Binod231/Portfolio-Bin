"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolio } from "@/data/portfolio";
import { Calendar, Briefcase, ChevronDown, ChevronUp } from "lucide-react";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function Experience() {
  const { experience } = portfolio;
  const [expandedId, setExpandedId] = React.useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scrollHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const toggleExpand = (index: number) => {
    setExpandedId(expandedId === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05 
      }
    },
    exit: { 
      opacity: 0,
      height: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <SectionWrapper id="experience" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto" ref={containerRef}>
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-600/10 border border-purple-500/30 shadow-lg shadow-purple-500/20">
            <Briefcase size={32} className="text-purple-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-violet-400 to-purple-600">
            Professional Experience
          </h2>
        </div>

        <div className="relative">
          {/* Scroll-Triggered Vertical Line */}
          <div className="hidden md:block absolute left-1/2 w-0.5 h-full bg-slate-800/30 -translate-x-1/2 rounded-full overflow-hidden">
             <motion.div 
               style={{ height: scrollHeight }} 
               className="w-full bg-gradient-to-b from-purple-500 via-blue-500 to-purple-500 opacity-70"
             />
          </div>
          
          <div className="md:hidden absolute left-4 w-0.5 h-full bg-slate-800/30">
            <motion.div 
               style={{ height: scrollHeight }} 
               className="w-full bg-purple-500 opacity-70"
             />
          </div>

          <div className="space-y-12">
            {experience.map((job, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row items-center justify-between ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} group`}>
                
                {/* Timeline Dot */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-4 md:left-1/2 top-0 md:top-6 md:-translate-y-1/2 w-10 h-10 rounded-full border-4 border-slate-950 bg-slate-900 flex items-center justify-center shadow-[0_0_0_4px_rgba(30,41,59,0.5)] group-hover:scale-110 group-hover:border-purple-500/50 transition-all duration-300 z-20 md:-translate-x-1/2 -translate-x-1/2"
                >
                   <Briefcase size={16} className="text-blue-500 group-hover:text-purple-400 transition-colors" />
                </motion.div>

                {/* Content Card */}
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4 }}
                  className={`w-full md:w-[45%] pl-12 md:pl-0 relative z-10 text-left`}
                >
                   <div className={`bg-slate-900/50 border border-slate-800 p-6 rounded-3xl backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 group-hover:bg-slate-900/80 ${expandedId === index ? 'shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] border-blue-500/30' : ''}`}>
                      
                      <div className="flex flex-col mb-4 gap-2 items-start">
                        <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">{job.role}</h3>
                            <div className="text-blue-400 font-medium">{job.company}</div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-950/50 px-3 py-1 rounded-full border border-slate-800 w-fit">
                            <Calendar size={14} /> {job.period}
                        </div>
                      </div>

                      {job.history && (
                        <div className="mb-4 border-l border-slate-700 space-y-3 pl-4">
                            {job.history.map((hist, i) => (
                                <div key={i}>
                                    <div className="text-slate-300 font-medium">{hist.role}</div>
                                    <div className="text-xs text-slate-500">{hist.period}</div>
                                </div>
                            ))}
                        </div>
                      )}

                      {/* Tech Stack Pills */}
                      {job.tech && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.tech.map((tech: string, i: number) => (
                            <span key={i} className="text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded hover:bg-blue-500/20 transition-colors cursor-default">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {expandedId !== index && (
                        <motion.ul 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-2 text-slate-400 text-sm leading-relaxed marker:text-blue-500 list-disc pl-4 text-left mb-4"
                        >
                           {job.impacts.map((impact, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: impact.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></li>
                           ))}
                        </motion.ul>
                      )}

                      {/* Case Study Toggle */}

                      {job.caseStudy && (
                        <div className="mt-4 pt-4 border-t border-slate-800/50">
                          <button 
                            onClick={() => toggleExpand(index)}
                            className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors w-full group/btn"
                          >
                             {expandedId === index ? (
                                <>Hide Engineering Case Study <ChevronUp size={16} /></>
                             ) : (
                                <>View Engineering Case Study <ChevronDown size={16} className="group-hover/btn:translate-y-0.5 transition-transform" /></>
                             )}
                          </button>

                          {/* Expanded Case Study Content */}
                          <AnimatePresence mode="wait">
                            {expandedId === index && (
                              <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="overflow-hidden mt-4"
                              >
                                <div className="bg-slate-950/80 rounded-xl border border-blue-500/20 p-4 md:p-6 space-y-6 shadow-inner shadow-black/50">
                                  
                                  {/* Header */}
                                  <motion.div variants={itemVariants}>
                                      <div className="text-xs uppercase tracking-wider text-blue-500 font-bold mb-2 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                        Detailed Case Study
                                      </div>

                                      <h4 className="text-lg font-bold text-white mb-2">{job.caseStudy.title}</h4>

                                      <p className="text-slate-400 text-sm leading-relaxed">{job.caseStudy.overview}</p>
                                  </motion.div>

                                  {/* Features Grid */}
                                  <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4">
                                      {job.caseStudy.features.map((feature: any, idx: number) => (
                                          <div key={idx} className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
                                              <div className="font-bold text-sky-400 text-sm mb-1">{feature.title}</div>
                                              <div className="text-slate-400 text-xs">{feature.details}</div>
                                          </div>
                                      ))}
                                  </motion.div>

                                  {/* Challenges vs Solutions */}
                                  <motion.div variants={itemVariants} className="space-y-3">
                                      <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">Challenges & Solutions</div>
                                      {job.caseStudy.challenges.map((challenge: any, idx: number) => (
                                          <div key={idx} className="flex flex-col gap-2 text-xs border-l-2 border-slate-700 pl-3">
                                              <div className="text-red-400 font-medium">⚠️ {challenge.problem}</div>
                                              <div className="text-emerald-400 font-medium">✅ {challenge.solution}</div>
                                          </div>
                                      ))}
                                  </motion.div>

                                  {/* Results */}
                                  <motion.div variants={itemVariants} className="pt-2 border-t border-slate-800/50">
                                      {job.caseStudy.results.map((res: string, idx: number) => (
                                          <div key={idx} className="text-xs text-slate-300 py-1" dangerouslySetInnerHTML={{ __html: res.replace(/\*\*(.*?)\*\*/g, '<span class="text-white font-bold">$1</span>') }}></div>
                                      ))}
                                  </motion.div>

                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                   </div>
                </motion.div>
                
                {/* Spacer for Desktop Balance */}
                <div className="hidden md:block w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
