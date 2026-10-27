"use client";

import { ArrowUpRight, ArrowRight, ExternalLink } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export default function RecentFeeds() {
  const { blogs } = portfolio;
  const recentBlogs = blogs.slice(0, 8);

  const caseStudies = [
    {
      date: "2026",
      title: "Glovion: On-Premise Data Center Operations & Local Nepali Servers",
      subtitle: "Bare-metal virtualization, HAProxy traffic routing & sovereign data hosting",
      metric: "Data Center",
      link: "#experience",
    },
    {
      date: "2026",
      title: "MCQtest: Multi-AZ ECS Fargate, WAF & Private VPC Subnets",
      subtitle: "12-stack CloudFormation architecture with Multi-AZ RDS PostgreSQL & Redis",
      metric: "99.9% Uptime",
      link: "#experience",
    },
    {
      date: "2026",
      title: "Outfitmirror: Decoupled Async Queues for Bedrock Nova Canvas",
      subtitle: "Serverless VTO pipeline with AWS SAM, Cognito Auth & S3 pre-signed uploads",
      metric: "<100ms API",
      link: "#experience",
    },
    {
      date: "2026",
      title: "Zyrona: Zero-Downtime ASG Instance Refresh & 30% AWS Cost Cut",
      subtitle: "Migrated expensive OpenSearch domain to optimized PostgreSQL query filters",
      metric: "-30% Bill",
      link: "#experience",
    },
    {
      date: "2026",
      title: "Princika Traders: Monorepo Dockerization & Automated Alembic CI/CD",
      subtitle: "Standardized multi-container Compose workflows with automated database migrations",
      metric: "50% Faster",
      link: "#experience",
    },
    {
      date: "2026",
      title: "AWS Pathway: Timed Exam Simulation Engine & Hierarchical RBAC",
      subtitle: "Continuous session state persistence on Redis/Postgres for high-stakes testing",
      metric: "1,000+ Users",
      link: "#experience",
    },
    {
      date: "2026",
      title: "Redis JWKS Token Caching: ~95% OAuth2 Auth Latency Reduction",
      subtitle: "Enterprise token invalidation, session caching, and stateless validation",
      metric: "~95% Faster",
      link: "#experience",
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">


          <div>
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-xl sm:text-2xl font-serif italic font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                Recent blogs
              </h3>
              <button
                onClick={() => scrollTo("#blogs")}
                className="text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Full archive ➔</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-6 font-normal">
              Long-form engineering essays and architecture tutorials I have published recently.
            </p>

            <div className="space-y-3.5">
              {recentBlogs.map((blog) => (
                <div key={blog.title} className="flex items-start gap-2 text-sm">
                  {/* Monospace Date Prefix */}
                  <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 shrink-0 pt-0.5 w-[96px] truncate">
                    {blog.date} :
                  </span>

                  {/* Blog Title Link */}
                  <a
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white hover:underline transition-colors leading-snug flex-1 group"
                  >
                    <span>{blog.title}</span>
                    <ArrowUpRight className="inline-block w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400" />
                  </a>
                </div>
              ))}
            </div>
          </div>


          <div id="case-studies">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-xl sm:text-2xl font-serif italic font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                Case studies &amp; systems
              </h3>
              <button
                onClick={() => scrollTo("#experience")}
                className="text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <span>All systems ➔</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-6 font-normal">
              Production architectures, failure post-mortems &amp; cloud engineering takeaways.
            </p>

            <div className="space-y-3.5">
              {caseStudies.map((item) => (
                <div key={item.title} className="flex items-start gap-2 text-sm">
                  {/* Monospace Year Prefix */}
                  <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 shrink-0 pt-0.5 w-[50px]">
                    {item.date} :
                  </span>

                  {/* Title & Metric */}
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2">
                    <button
                      onClick={() => scrollTo(item.link)}
                      className="text-left text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white hover:underline transition-colors leading-snug cursor-pointer"
                    >
                      {item.title}
                    </button>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 shrink-0 self-start sm:self-auto">
                      {item.metric}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
