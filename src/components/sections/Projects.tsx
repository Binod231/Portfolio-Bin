"use client";

import { Star, Github, ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export default function Projects() {
  const { projects } = portfolio;

  return (
    <section id="projects" className="w-full py-10 md:py-12 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header (arpitbhayani.me exact style) */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
          <h2 className="text-2xl sm:text-3xl font-serif italic font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Side Projects &amp; Open Source
          </h2>
          <a
            href={portfolio.personal.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors inline-flex items-center gap-1"
          >
            <span>All projects on GitHub ➔</span>
          </a>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-8 font-normal">
          Developer utilities, security analyzers, and cloud infrastructure systems I maintain in the open.
        </p>

        {/* Project List (Matching Arpit Bhayani's editorial list style) */}
        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group border-b border-neutral-100 dark:border-neutral-800/80 pb-6 last:border-b-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1.5">
                {/* Star / Badge indicator */}
                <div className="flex items-center gap-1 text-xs font-mono text-neutral-500 dark:text-neutral-400 shrink-0">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                  <span className="font-semibold">{project.type}</span>
                  <span className="text-neutral-400 dark:text-neutral-600 mx-1">·</span>
                </div>

                {/* Project Title with link */}
                <a
                  href={project.repo || portfolio.personal.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-lg font-serif italic font-bold text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-300 hover:underline transition-colors inline-flex items-center gap-1"
                >
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 opacity-70 group-hover:opacity-100 transition-opacity" />
                </a>

                {/* Tech Pills */}
                <div className="flex flex-wrap items-center gap-1.5 sm:ml-auto">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal mb-2">
                {project.desc}
              </p>

              {/* Key Architecture Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1 list-disc list-inside ml-1">
                  {project.highlights.map((hl, i) => (
                    <li key={i}>{hl}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
