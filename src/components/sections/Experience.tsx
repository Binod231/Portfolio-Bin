"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { Card, CardContent } from "@/components/ui/Card";
import { portfolio } from "@/data/portfolio";
import { Calendar, Briefcase, ChevronDown, ChevronUp } from "lucide-react";
import React from 'react';

export default function Experience() {
  const { experience } = portfolio;
  const [expandedId, setExpandedId] = React.useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedId(expandedId === index ? null : index);
  };

  return (
    <SectionWrapper id="experience" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-600/10 border border-purple-500/30 shadow-lg shadow-purple-500/20">
          <Briefcase size={32} className="text-purple-400" />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-violet-400 to-purple-600">
          Professional Experience
        </h2>
      </div>

        <div className="relative">
          {/* Vertical Lines */}
          <div className="hidden md:block absolute left-1/2 w-0.5 h-full bg-slate-800 -translate-x-1/2"></div>
          <div className="md:hidden absolute left-4 w-0.5 h-full bg-slate-800"></div>

          <div className="space-y-12">
            {experience.map((job, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row items-center justify-between ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} group`}>
                
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 top-0 md:top-6 md:-translate-y-1/2 w-10 h-10 rounded-full border-4 border-slate-950 bg-slate-900 flex items-center justify-center shadow-[0_0_0_4px_rgba(30,41,59,0.5)] group-hover:scale-110 transition-transform duration-300 z-20 md:-translate-x-1/2 -translate-x-1/2">
                   <Briefcase size={16} className="text-blue-500" />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[45%] pl-12 md:pl-0 relative z-10 text-left`}>
                   <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 group-hover:bg-slate-900/80">
                      
                      <div className="flex flex-col mb-4 gap-2 items-start">
                        <div>
                            <h3 className="text-xl font-bold text-white">{job.role}</h3>
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

                      {expandedId !== index && (
                        <ul className="space-y-2 text-slate-400 text-sm leading-relaxed marker:text-blue-500 list-disc pl-4 text-left mb-4">
                           {job.impacts.map((impact, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: impact.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></li>
                           ))}
                        </ul>
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
                          <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${expandedId === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                              <div className="bg-slate-950/50 rounded-xl border border-blue-500/20 p-4 md:p-6 space-y-6">
                                
                                {/* Header */}
                                <div>
                                    <div className="text-xs uppercase tracking-wider text-blue-500 font-bold mb-2">Detailed Case Study</div>

                                    <h4 className="text-lg font-bold text-white mb-2">{job.caseStudy.title}</h4>

                                    <p className="text-slate-400 text-sm leading-relaxed">{job.caseStudy.overview}</p>
                                </div>

                                {/* Features Grid */}
                                <div className="grid grid-cols-1 gap-4">
 
                                    {job.caseStudy.features.map((feature: any, idx: number) => (
                                        <div key={idx} className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                                            <div className="font-bold text-sky-400 text-sm mb-1">{feature.title}</div>
                                            <div className="text-slate-400 text-xs">{feature.details}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Challenges vs Solutions */}
                                <div className="space-y-3">
                                    <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">Challenges & Solutions</div>
 
                                    {job.caseStudy.challenges.map((challenge: any, idx: number) => (
                                        <div key={idx} className="flex flex-col gap-2 text-xs border-l-2 border-slate-700 pl-3">
                                            <div className="text-red-400 font-medium">⚠️ {challenge.problem}</div>
                                            <div className="text-emerald-400 font-medium">✅ {challenge.solution}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Results */}
                                <div className="pt-2">
 
                                    {job.caseStudy.results.map((res: string, idx: number) => (
                                        <div key={idx} className="text-xs text-slate-300 py-1" dangerouslySetInnerHTML={{ __html: res.replace(/\*\*(.*?)\*\*/g, '<span class="text-white font-bold">$1</span>') }}></div>
                                    ))}
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                   </div>
                </div>
                
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
