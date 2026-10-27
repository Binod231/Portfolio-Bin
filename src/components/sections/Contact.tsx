"use client";

import { useState } from "react";
import { Mail, Github, Linkedin, Copy, Check, ArrowUpRight, FileText } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export default function Contact() {
  const { email, links, name } = portfolio.personal;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 30;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="w-full pt-10 md:pt-14 pb-12 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Contact Inquiry Card (Editorial Style) */}
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15191f] p-6 sm:p-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
            <div className="max-w-xl">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold mb-2 block">
                ● Accepting Consulting Engagements
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif italic font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">
                Let&apos;s architect resilient systems together.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                Whether you need an architectural review for an upcoming AWS launch, automated zero-downtime CI/CD pipelines, or an audit to reduce your monthly cloud bill, I am available for advisory and contract engineering.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
              <a
                href={`mailto:${email}?subject=Consulting%20Inquiry%20-%20Cloud%20Architecture`}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-medium hover:opacity-90 transition-opacity"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Email Inquiry</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-mono hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied to Clipboard" : "Copy Email"}</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-500">
            <span>Direct: <strong className="text-neutral-800 dark:text-neutral-200 font-normal">{email}</strong></span>
            <span>Remote-friendly · UTC+5:45 · English &amp; Nepali</span>
          </div>
        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-neutral-200 dark:border-neutral-800 text-xs">

          {/* Column 1: Writings & Media */}
          <div>
            <h4 className="font-serif italic font-bold text-sm text-neutral-900 dark:text-neutral-100 mb-3">
              Writings &amp; Media
            </h4>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
              <li>
                <button onClick={() => scrollTo("#blogs")} className="hover:underline hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer">
                  Technical Essays ({portfolio.blogs.length})
                </button>
              </li>
              <li>
                <a href="https://builder.aws.com/community/@binodprasadjoshi?tab=articles" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-neutral-900 dark:hover:text-neutral-100">
                  AWS Builder Center (34+ Articles)
                </a>
              </li>
              <li>
                <a href="https://dev.to/binod_prasadjoshi_b591ca" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-neutral-900 dark:hover:text-neutral-100">
                  Dev.to Articles
                </a>
              </li>
              <li>
                <a href="https://medium.com/@joshibinodprasad77" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-neutral-900 dark:hover:text-neutral-100">
                  Medium Publications
                </a>
              </li>
              <li>
                <button onClick={() => scrollTo("#case-studies")} className="hover:underline hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer">
                  Architecture Teardowns
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Consulting & Capabilities */}
          <div>
            <h4 className="font-serif italic font-bold text-sm text-neutral-900 dark:text-neutral-100 mb-3">
              Consulting Services
            </h4>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
              <li>
                <button onClick={() => scrollTo("#services")} className="hover:underline hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer">
                  AWS Architecture Design
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("#services")} className="hover:underline hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer">
                  CI/CD &amp; Docker Pipelines
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("#services")} className="hover:underline hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer">
                  FinOps AWS Cost Reduction
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("#services")} className="hover:underline hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer">
                  DevSecOps &amp; IAM Security
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("#services")} className="hover:underline hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer">
                  Bedrock &amp; RAG Infrastructure
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Credentials & Proof */}
          <div>
            <h4 className="font-serif italic font-bold text-sm text-neutral-900 dark:text-neutral-100 mb-3">
              Credentials &amp; Proof
            </h4>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
              <li>
                <a href="https://www.credly.com/users/binod-prasad-joshi" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-neutral-900 dark:hover:text-neutral-100">
                  AWS Solutions Architect (SAA)
                </a>
              </li>
              <li>
                <a href="https://www.credly.com/users/binod-prasad-joshi" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-neutral-900 dark:hover:text-neutral-100">
                  AWS Cloud Practitioner (CLF)
                </a>
              </li>
              <li>
                <a href="https://builder.aws.com/content/3FlFKUUccesUcVX2E9osFo1rR5r/stop-vibe-coding-build-deterministic-ai-infrastructure-with-aws-blocks" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-neutral-900 dark:hover:text-neutral-100">
                  AWS Community Builder (2026)
                </a>
              </li>
              <li>
                <a href="https://www.credly.com/users/binod-prasad-joshi" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-neutral-900 dark:hover:text-neutral-100">
                  8 Credly Badges Profile
                </a>
              </li>
              <li>
                <button onClick={() => scrollTo("#projects")} className="hover:underline hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer">
                  Open Source Codebases
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: About & Contact */}
          <div>
            <h4 className="font-serif italic font-bold text-sm text-neutral-900 dark:text-neutral-100 mb-3">
              About &amp; Contact
            </h4>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
              <li>
                <button onClick={() => scrollTo("#about")} className="hover:underline hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer">
                  About Binod
                </button>
              </li>
              <li>
                <a href={`mailto:${email}`} className="hover:underline hover:text-neutral-900 dark:hover:text-neutral-100">
                  Inquiries &amp; Consultations
                </a>
              </li>
              <li>
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-neutral-900 dark:hover:text-neutral-100">
                  LinkedIn (2k+ Network)
                </a>
              </li>
              <li>
                <a href={links.github} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-neutral-900 dark:hover:text-neutral-100">
                  GitHub Profile
                </a>
              </li>
              <li>
                <a href={links.resume} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-neutral-900 dark:hover:text-neutral-100">
                  Download Resume PDF
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} {name}. All rights reserved.
          </div>
          <div>
            Let's architect resilient systems together.


          </div>
        </div>

      </div>
    </footer>
  );
}
