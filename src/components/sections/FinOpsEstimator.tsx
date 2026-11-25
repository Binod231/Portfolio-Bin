"use client";

import { useState } from "react";
import { portfolio } from "@/data/portfolio";
import {
  calculateFinOpsSavings,
  WORKLOAD_PROFILES,
  WorkloadProfile,
} from "@/data/finopsCalc";

export default function FinOpsEstimator() {
  const [monthlySpend, setMonthlySpend] = useState(5000);
  const [workload, setWorkload] = useState<WorkloadProfile>("multi-az-saas");

  const estimate = calculateFinOpsSavings(monthlySpend, workload);

  const mailtoSubject = encodeURIComponent(
    `AWS FinOps Audit Request - $${estimate.monthlySpend.toLocaleString()}/mo (${estimate.workloadLabel})`
  );
  const mailtoBody = encodeURIComponent(
    `Hi Binod,\n\nI used the FinOps Estimator on your portfolio:\n- Current Monthly AWS Spend: $${estimate.monthlySpend.toLocaleString()}/mo\n- Architecture Profile: ${estimate.workloadLabel}\n- Projected Monthly Savings: ~$${estimate.monthlySaved.toLocaleString()}/mo (~${estimate.totalSavingsPct}%)\n\nLet's discuss an audit for our infrastructure.`
  );
  const finopsMailto = `mailto:${portfolio.personal.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <div
      id="finops-estimator"
      className="mt-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15191f] p-6 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 font-semibold">
          06
        </span>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
          ~{estimate.totalSavingsPct}% Projected Monthly Reduction
        </span>
      </div>

      <h3 className="text-lg font-serif italic font-bold text-neutral-900 dark:text-neutral-100 mb-2">
        Cloud FinOps Savings Estimator
      </h3>

      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal mb-6">
        Estimate projected AWS savings from compute rightsizing, persistence optimization, caching, and network architecture tuning.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
        <div className="lg:col-span-5 space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-neutral-600 dark:text-neutral-400">Monthly AWS Spend</span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                ${estimate.monthlySpend.toLocaleString()} / mo
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={50000}
              step={250}
              value={monthlySpend}
              onChange={(e) => setMonthlySpend(Number(e.target.value))}
              className="w-full accent-neutral-800 dark:accent-neutral-200 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-neutral-400 dark:text-neutral-500 mt-1">
              <span>$500</span>
              <span>$15,000</span>
              <span>$50,000</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-2">
              Architecture Profile
            </div>
            <div className="space-y-1.5">
              {WORKLOAD_PROFILES.map((prof) => {
                const active = workload === prof.id;
                return (
                  <button
                    key={prof.id}
                    onClick={() => setWorkload(prof.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                      active
                        ? "bg-neutral-900 text-neutral-50 border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:border-neutral-100 font-semibold"
                        : "bg-neutral-50 dark:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600"
                    }`}
                  >
                    {prof.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40">
              <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                Monthly Savings
              </div>
              <div className="text-lg font-serif italic font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
                ${estimate.monthlySaved.toLocaleString()}
              </div>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40">
              <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                Annualized Savings
              </div>
              <div className="text-lg font-serif italic font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
                ${estimate.annualSaved.toLocaleString()}
              </div>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40">
              <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                Projected Bill
              </div>
              <div className="text-lg font-serif italic font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
                ${estimate.projectedSpend.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
            {estimate.breakdown.map((b) => (
              <div key={b.label} className="flex items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-2">
                  <span className="text-neutral-400 dark:text-neutral-500 font-mono mt-0.5">•</span>
                  <div>
                    <div className="font-medium text-neutral-800 dark:text-neutral-200">
                      {b.label}
                    </div>
                    <div className="text-neutral-500 dark:text-neutral-400 font-normal">
                      {b.recommendation}
                    </div>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-neutral-700 dark:text-neutral-300 shrink-0">
                  -{b.pct}% (${b.monthlySaved.toLocaleString()}/mo)
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="text-neutral-500 dark:text-neutral-400">
              CLI: <code>./finops-calc.sh --spend={monthlySpend}</code>
            </span>
            <a
              href={finopsMailto}
              className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              Request FinOps audit ➔
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
