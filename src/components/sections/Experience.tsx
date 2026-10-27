"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export default function Experience() {
  const { experience } = portfolio;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="w-full py-10 md:py-12 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">


        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
          <h2 className="text-2xl sm:text-3xl font-serif italic font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Experience &amp; Track Record
          </h2>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            Production &amp; Advisory Roles
          </span>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-8 font-normal">
          Engineering leadership, cloud consulting contracts, and multi-service production outcomes.
        </p>

        {/* Experience List */}
        <div className="space-y-8">
          {experience.map((job, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={job.company}
                className="border-b border-neutral-100 dark:border-neutral-800/80 pb-8 last:border-b-0"
              >
                {/* Role Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="text-lg sm:text-xl font-serif italic font-bold text-neutral-900 dark:text-neutral-100">
                      {job.role}
                    </h3>
                    <span className="text-neutral-400 dark:text-neutral-600">at</span>
                    <span className="text-base font-semibold text-neutral-800 dark:text-neutral-200">
                      {job.company}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                      {job.type}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 shrink-0">
                    {job.period}
                  </span>
                </div>

                {/* Key Achievements Bullet Points */}
                <div className="space-y-2 mt-4 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                  {job.impacts.map((impact, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-neutral-400 dark:text-neutral-500 font-mono mt-0.5">•</span>
                      <span className="text-justify" dangerouslySetInnerHTML={{ __html: impact.replace(/\*\*(.*?)\*\*/g, '<strong class="text-neutral-900 dark:text-neutral-100 font-medium">$1</strong>') }} />
                    </div>
                  ))}
                </div>

                {/* Technologies List */}
                <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  {job.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-50 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Detailed Architectural Case Study Teardown Toggle */}
                {job.caseStudy && (
                  <div className="mt-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#15191f] overflow-hidden">
                    <button
                      onClick={() => toggleExpand(index)}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                          Architecture Case Study:
                        </span>
                        <span className="text-xs sm:text-sm font-serif italic font-bold text-neutral-900 dark:text-neutral-100">
                          {job.caseStudy.title}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-neutral-500 flex items-center gap-1">
                        <span>{isExpanded ? "Collapse" : "Explore Teardown"}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-5 pt-2 border-t border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm space-y-4">
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal text-justify">
                          {job.caseStudy.overview}
                        </p>

                        {/* Features Breakdown */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                          {job.caseStudy.features.map((feat, fIdx) => (
                            <div
                              key={fIdx}
                              className="p-3 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#111418]"
                            >
                              <div className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1 text-xs">
                                {feat.title}
                              </div>
                              <div className="text-neutral-600 dark:text-neutral-400 text-xs leading-normal font-normal">
                                {feat.details}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Results & SLA Metrics */}
                        {job.caseStudy.results && (
                          <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800/80">
                            <div className="text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase tracking-wider">
                              Verified Outcomes:
                            </div>
                            <div className="space-y-1">
                              {job.caseStudy.results.map((res, rIdx) => (
                                <div key={rIdx} className="text-xs text-neutral-600 dark:text-neutral-400 flex items-start gap-1.5">
                                  <span>•</span>
                                  <span dangerouslySetInnerHTML={{ __html: res.replace(/\*\*(.*?)\*\*/g, '<strong class="text-neutral-900 dark:text-neutral-100">$1</strong>') }} />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
