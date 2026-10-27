"use client";

import { useState } from "react";
import Image from "next/image";
import { Github, Linkedin, Mail, FileText, Award, ArrowUpRight, ArrowLeftRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export default function Hero() {
  const { personal } = portfolio;
  const [activePhoto, setActivePhoto] = useState<"speaking" | "passport">("speaking");

  const isSpeakingMain = activePhoto === "speaking";

  return (
    <section id="hero" className="w-full pt-8 pb-14 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">

          {/* Main Editorial Bio Column (7 cols on desktop) */}
          <div className="md:col-span-7 flex flex-col order-2 md:order-1">

            {/* Signature Arpit-style Serif Italic Greeting */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif italic font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">
              Hey, I am Binod
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl font-serif italic text-neutral-600 dark:text-neutral-400 mb-6">
              cloud architecture, devops, and automation. always building.
            </p>

            {/* Editorial Bio Text */}
            <div className="space-y-4 text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal text-justify">
              <p className="text-justify leading-relaxed">
                I am a software engineer and DevOps consultant passionate about resilient cloud architecture, automated infrastructure, and applied AI. Currently, I am a DevOps Consultant at{" "}
                <strong className="text-neutral-900 dark:text-neutral-100 font-semibold">Glovion Consulting Private Limited</strong>, managing on-premise private data center operations, bare-metal virtualization, and dedicated Nepali server infrastructure. Previously at{" "}
                <strong className="text-neutral-900 dark:text-neutral-100 font-semibold">One Cloud Utopia</strong>, I led DevOps operations and zero-downtime rollouts across four production platforms on AWS:{" "}
                <em className="text-neutral-900 dark:text-neutral-200 font-medium not-italic">Zyrona</em>,{" "}
                <em className="text-neutral-900 dark:text-neutral-200 font-medium not-italic">Outfitmirror</em>,{" "}
                <em className="text-neutral-900 dark:text-neutral-200 font-medium not-italic">Princika Traders</em>, and{" "}
                <em className="text-neutral-900 dark:text-neutral-200 font-medium not-italic">MCQtest</em>.
              </p>

              <p className="text-justify leading-relaxed">
                As a <strong className="text-neutral-900 dark:text-neutral-100 font-semibold">2x AWS Certified Solutions Architect</strong> and <strong className="text-neutral-900 dark:text-neutral-100 font-semibold">AWS Community Builder (2026)</strong>, I specialize in designing multi-AZ VPC topologies, container orchestration with ECS Fargate and Docker, automated GitHub Actions pipelines, and executing systematic FinOps audits that cut monthly AWS bills by ~30%.
              </p>

              <p className="text-justify leading-relaxed">
                I actively author deep-dive technical research covering enterprise network fabrics, serverless architectures, and agentic DevOps. My writing has been recognized on{" "}
                <strong className="text-neutral-900 dark:text-neutral-100 font-semibold">AWS Builder Center</strong>, winning the{" "}
                <span className="text-neutral-900 dark:text-neutral-100 font-medium underline decoration-neutral-300 dark:decoration-neutral-700">AWS Data 4x4 Technical Challenge</span>.
              </p>
            </div>

            {/* Arpit-style Social Pills with metrics */}
            <div className="flex flex-wrap items-center gap-2.5 mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-xs font-mono">
              <a
                href={personal.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200 hover:border-neutral-500 dark:hover:border-neutral-500 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
                <span>GitHub </span>
              </a>

              <a
                href={personal.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200 hover:border-neutral-500 dark:hover:border-neutral-500 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
                <span>LinkedIn </span>
              </a>

              <a
                href="https://builder.aws.com/community/@binodprasadjoshi?tab=articles"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200 hover:border-neutral-500 dark:hover:border-neutral-500 transition-colors"
              >
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>AWS Builder Center (34+ Articles)</span>
              </a>

              <a
                href="https://www.credly.com/users/binod-prasad-joshi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200 hover:border-neutral-500 dark:hover:border-neutral-500 transition-colors"
              >
                <span>Credly (8 Badges)</span>
              </a>

              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200 hover:border-neutral-500 dark:hover:border-neutral-500 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
                <span>Email</span>
              </a>

              <a
                href={personal.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200 hover:border-neutral-500 dark:hover:border-neutral-500 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
                <span>Resume PDF</span>
              </a>
            </div>
          </div>

          {/* Right Portrait Column (5 cols on desktop) */}
          <div className="md:col-span-5 flex flex-col items-center md:items-end order-1 md:order-2">
            <div className="w-full max-w-[340px] md:max-w-[360px] aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-300 dark:border-neutral-700/80 bg-neutral-100 dark:bg-[#15191f] shadow-lg relative group">
              {/* Main Background Image */}
              <Image
                src={isSpeakingMain ? "/portfoilo.jpeg" : "/PassportSizeimage.png"}
                alt={isSpeakingMain ? "Binod Prasad Joshi speaking at AWS Event" : "Binod Prasad Joshi - DevOps Consultant"}
                fill
                priority
                className={`object-cover transition-all duration-300 ${
                  isSpeakingMain ? "object-top" : "object-center"
                }`}
                sizes="(max-width: 768px) 340px, 360px"
              />

              {/* Gradient Scrim for subtle contrast at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Top Tag: Context */}
              <div className="absolute top-3 left-3 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-mono text-white/90 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{isSpeakingMain ? "AWS Community Speaker" : "DevOps Consultant"}</span>
                </span>
              </div>

              {/* Inset Picture-in-Picture Card: The other picture inside */}
              <button
                type="button"
                onClick={() => setActivePhoto(isSpeakingMain ? "passport" : "speaking")}
                title="Click to switch portraits"
                className="absolute bottom-3 right-3 flex items-center gap-2.5 p-1.5 rounded-xl bg-white/95 dark:bg-[#12161b]/95 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 text-left cursor-pointer group/inset"
              >
                <div className="relative w-14 h-16 sm:w-16 sm:h-20 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 shrink-0 bg-neutral-100 dark:bg-neutral-800">
                  <Image
                    src={isSpeakingMain ? "/PassportSizeimage.png" : "/portfoilo.jpeg"}
                    alt="Alternate portrait"
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="pr-2 font-mono">
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-semibold">
                    {isSpeakingMain ? "Executive ID" : "AWS Stage"}
                  </div>
                  <div className="text-xs font-serif italic font-bold text-neutral-900 dark:text-neutral-100 leading-tight mt-0.5">
                    {isSpeakingMain ? "Formal Portrait" : "Speaking at AWS"}
                  </div>
                  <div className="text-[9px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-mono">
                    <ArrowLeftRight className="w-2.5 h-2.5" />
                    <span>Click to switch</span>
                  </div>
                </div>
              </button>
            </div>

            {/* Caption beneath portrait */}
            <div className="mt-3.5 space-y-0.5 text-xs font-mono text-neutral-500 dark:text-neutral-400 text-center md:text-right">
              <div>Binod Prasad Joshi · Lalitpur, Nepal (UTC+5:45)</div>
              <div className="text-[11px] text-neutral-400 dark:text-neutral-500">
                DevOps Consultant @ Glovion · 2× AWS Certified
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
