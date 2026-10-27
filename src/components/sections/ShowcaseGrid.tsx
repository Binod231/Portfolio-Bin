"use client";

import { ArrowRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export default function ShowcaseGrid() {
  const showcaseItems = [
    {
      category: "Long-form",
      count: `${portfolio.blogs.length} Blogs`,
      title: "Blogs & Technical Writing",
      description: "In-depth essays on AWS enterprise network fabrics, Bedrock Generative AI, RDS persistence, and deterministic agentic DevOps.",
      href: "#blogs",
      linkText: "View blogs →",
    },
    {
      category: "Production",
      count: "4 Platforms",
      title: "Case Studies & Systems",
      description: "Real-world infrastructure architectures for Zyrona, Outfitmirror, Princika Traders, and MCQtest with 99.9% uptime SLA.",
      href: "#case-studies",
      linkText: "View case studies →",
    },
    {
      category: "Advisory",
      count: "5 Capabilities",
      title: "Consulting & Services",
      description: "Senior advisory on multi-AZ VPC architecture, zero-downtime CI/CD automation, FinOps bill reduction, and DevSecOps.",
      href: "#services",
      linkText: "View capabilities →",
    },
    {
      category: "Open Source",
      count: "6 Projects",
      title: "Side Projects & Repos",
      description: "Open-source static security analyzers, asynchronous Bedrock serverless engines, and containerized REST backends.",
      href: "#projects",
      linkText: "View projects →",
    },
    {
      category: "Accredited",
      count: "8 Badges",
      title: "Certifications & Credentials",
      description: "2x AWS Certified (Solutions Architect & Cloud Practitioner), AWS Community Builder (2026), and IIT Madras AI accreditations.",
      href: "#certifications",
      linkText: "View credentials →",
    },
    {
      category: "Track Record",
      count: "3+ Roles",
      title: "Experience & Timeline",
      description: "Managing on-premise data centers at Glovion Consulting, cloud operations at One Cloud Utopia, and backend systems at Karnovation Inc.",
      href: "#experience",
      linkText: "View timeline →",
    },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 30;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-10 md:py-12 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading in Signature Italic Serif */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif italic font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">
            Everything I build, write, publish, and consult in the open.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal">
            A structured directory of production cloud deployments, deep-dive publications, open-source repositories, and verified accreditations.
          </p>
        </div>

        {/* 6 Clean Boxed Cards (3x2 grid on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {showcaseItems.map((item) => (
            <div
              key={item.title}
              onClick={() => scrollTo(item.href)}
              className="group cursor-pointer rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15191f] p-5 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-medium">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                    {item.count}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-serif italic font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs font-medium text-neutral-900 dark:text-neutral-200 group-hover:underline">
                <span>{item.linkText}</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
