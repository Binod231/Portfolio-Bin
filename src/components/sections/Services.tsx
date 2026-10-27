"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export default function Services() {
  const { services } = portfolio;

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 30;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="w-full py-10 md:py-12 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">


        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
          <h2 className="text-2xl sm:text-3xl font-serif italic font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Consulting &amp; Capabilities
          </h2>
          <button
            onClick={scrollToContact}
            className="text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Inquire for engagement ➔</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-8 font-normal">
          How I help high-growth startups and enterprise teams build resilient cloud architectures, automate deployments, and eliminate cloud waste.
        </p>

        {/* Services Grid (Clean 2-column or 3-column layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15191f] p-6 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 font-semibold">
                    0{index + 1}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                    {service.metrics}
                  </span>
                </div>

                <h3 className="text-lg font-serif italic font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal mb-4 text-justify">
                  {service.description}
                </p>

                {/* Deliverables List */}
                <div className="space-y-1.5 mb-5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                  {service.deliverables.map((del, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                      <span className="text-neutral-400 dark:text-neutral-500 font-mono mt-0.5">•</span>
                      <span className="font-normal">{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap gap-1.5">
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-50 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
