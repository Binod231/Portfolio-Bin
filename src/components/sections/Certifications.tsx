"use client";

import Image from "next/image";
import { ArrowUpRight, Award, ShieldCheck, CheckCircle2 } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export default function Certifications() {
  const { certifications } = portfolio;

  return (
    <section id="certifications" className="w-full py-10 md:py-12 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">


        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
          <h2 className="text-2xl sm:text-3xl font-serif italic font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Certifications &amp; Accreditations
          </h2>
          <a
            href="https://www.credly.com/users/binod-prasad-joshi.69a505f6/badges/credly"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors inline-flex items-center gap-1"
          >
            <span>Verify on Credly profile ➔</span>
          </a>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-8 font-normal">
          Formal engineering qualifications certified and independently verified by Amazon Web Services, IIT Madras, and LeetCode.
        </p>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15191f] p-4 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              <div>
                {/* Badge Image or Icon */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center relative">
                    {cert.image ? (
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    ) : (
                      <Award className="w-5 h-5 text-neutral-500" />
                    )}
                  </div>

                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                    {cert.id}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mb-1 leading-snug">
                  {cert.title}
                </h3>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mb-2">
                  {cert.issuer}
                </p>

                <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 mb-4">
                  {cert.date}
                </p>
              </div>

              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pt-2.5 border-t border-neutral-100 dark:border-neutral-800/80 text-[11px] font-mono text-neutral-800 dark:text-neutral-200 hover:underline flex items-center justify-between"
                >
                  <span>Verify Credential</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                </a>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
