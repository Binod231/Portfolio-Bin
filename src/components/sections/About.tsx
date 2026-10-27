"use client";

import { Award, Briefcase, Globe, CheckCircle2, ShieldCheck } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export default function About() {
  const principles = [
    "Deterministic Infrastructure as Code over vibe coding",
    "Shift-Left Security & least-privilege IAM by default",
    "Zero-downtime rolling deployments as an operational baseline",
    "Continuous FinOps rightsizing before scaling compute",
    "Decoupled asynchronous worker queues for long-running AI models",
    "High-fidelity distributed observability with CloudWatch & X-Ray",
  ];

  return (
    <section id="about" className="w-full py-10 md:py-14 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">


        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
          <h2 className="text-2xl sm:text-3xl font-serif italic font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            About &amp; Engineering Ethos
          </h2>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            Background &amp; Principles
          </span>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-8 font-normal">
          An engineering philosophy centered on automation, failure domain isolation, and lean cloud economics.
        </p>

        {/* 2-Column Split: Narrative on Left, Status & Principles on Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Main Narrative (7 cols on desktop) */}
          <div className="md:col-span-7 space-y-4 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal text-justify">
            <p className="text-justify leading-relaxed">
              I believe great cloud architecture is about reducing accidental complexity. In an ecosystem where spinning up managed cloud services is trivial, the actual engineering craft lies in designing deterministic systems that don&apos;t fail unexpectedly under traffic spikes or burn through budgets unchecked.
            </p>

            <p className="text-justify leading-relaxed">
              Currently, I am working as a <strong className="text-neutral-900 dark:text-neutral-100 font-semibold">DevOps Consultant at Glovion Consulting Private Limited</strong>, managing and modernizing their <strong className="text-neutral-900 dark:text-neutral-100 font-semibold">private on-premise data center operations and dedicated Nepali server infrastructure</strong>. My focus spans bare-metal system architecture, virtualized compute pools (KVM), local traffic routing with Nginx &amp; HAProxy, self-hosted automated CI/CD runners, and strict sovereign data residency compliance.
            </p>

            <p className="text-justify leading-relaxed">
              Previously, I served as a DevOps Consultant at <strong className="text-neutral-900 dark:text-neutral-100 font-semibold">One Cloud Utopia</strong>, where I took end-to-end ownership of cloud operations for four production applications—including e-commerce platforms (<em>Zyrona</em>), AI virtual try-on engines using Amazon Bedrock (<em>Outfitmirror</em>), inventory monorepos (<em>Princika Traders</em>), and high-concurrency online test engines (<em>MCQtest</em>). Earlier, at <strong className="text-neutral-900 dark:text-neutral-100 font-semibold">Karnovation Inc</strong>, I engineered high-throughput async backends in FastAPI and optimized OAuth2 authentication latency by ~95% using Redis JWKS caching.
            </p>

            <p className="text-justify leading-relaxed">
              As an <strong className="text-neutral-900 dark:text-neutral-100 font-semibold">AWS Community Builder (2026)</strong>, I actively contribute back to the software community. I author in-depth architectural breakdowns covering multi-region enterprise network fabrics, deterministic agentic DevOps frameworks, and database persistence internals across{" "}
              <a
                href="https://builder.aws.com/community/@binodprasadjoshi?tab=articles"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-900 dark:hover:text-neutral-100 font-medium"
              >
                AWS Builder Center (34+ articles)
              </a>
              ,{" "}
              <a
                href="https://dev.to/binod_prasadjoshi_b591ca"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-900 dark:hover:text-neutral-100 font-medium"
              >
                Dev.to
              </a>
              , and{" "}
              <a
                href="https://medium.com/@joshibinodprasad77"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-900 dark:hover:text-neutral-100 font-medium"
              >
                Medium
              </a>
              —winning recognition including the AWS Data 4x4 Technical Challenge.
            </p>
          </div>

          {/* Right Column: Status & Maxims (5 cols on desktop) */}
          <div className="md:col-span-5 space-y-4">

            {/* Current Position & Track Record Box */}
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15191f] p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold mb-2">
                Current Position
              </div>
              <div className="font-serif italic font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-1">
                DevOps Consultant
              </div>
              <div className="text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-4">
                Glovion Consulting Private Limited
              </div>

              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-neutral-400">Focus:</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">Data Center &amp; Nepali Servers</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-neutral-400">Previous:</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">One Cloud Utopia</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-neutral-400">Earlier:</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">Karnovation Inc</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-neutral-400">Community:</span>
                  <span className="font-medium text-amber-600 dark:text-amber-400">AWS Community Builder</span>
                </div>
              </div>
            </div>

            {/* Engineering Maxims Card */}
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15191f] p-5">
              <h3 className="text-base font-serif italic font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                Engineering Maxims
              </h3>

              <div className="space-y-2.5 text-xs text-neutral-700 dark:text-neutral-300 font-normal">
                {principles.map((principle, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-neutral-400 dark:text-neutral-500 font-mono mt-0.5">•</span>
                    <span className="leading-snug">{principle}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
                <span>Nepal (UTC+5:45)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">● Available for Consulting</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
