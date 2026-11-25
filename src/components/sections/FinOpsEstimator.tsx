"use client";

import { useState } from "react";
import { Calculator, ArrowUpRight } from "lucide-react";
import {
  calculateFinOpsSavings,
  WORKLOAD_PROFILES,
  WorkloadProfile,
} from "@/data/finopsCalc";

export default function FinOpsEstimator() {
  const [monthlySpend, setMonthlySpend] = useState(5000);
  const [workload, setWorkload] = useState<WorkloadProfile>("multi-az-saas");

  const estimate = calculateFinOpsSavings(monthlySpend, workload);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 30;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <div
      id="finops-estimator"
      className="mt-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15191f] p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold mb-1">
            <Calculator className="w-3.5 h-3.5" />
            <span>INTERACTIVE CLOUD FINOPS AUDIT ESTIMATOR</span>
          </div>
          <h3 className="text-lg sm:text-xl font-serif italic font-bold text-neutral-900 dark:text-neutral-100">
            Estimate Your Monthly AWS Cost Reduction
          </h3>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
          ~{estimate.totalSavingsPct}% Projected Savings
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-neutral-600 dark:text-neutral-400">Current Monthly AWS Spend</span>
              <span className="font-bold text-neutral-900 dark:text-neutral-100">
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
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-neutral-400 mt-1">
              <span>$500</span>
              <span>$15,000</span>
              <span>$50,000</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-2">
              Primary Architecture Profile
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {WORKLOAD_PROFILES.map((prof) => (
                <button
                  key={prof.id}
                  onClick={() => setWorkload(prof.id)}
                  className={`text-left px-3 py-2 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                    workload === prof.id
                      ? "bg-neutral-900 text-white border-neutral-900 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-600"
                      : "bg-neutral-50 dark:bg-neutral-900/50 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400"
                  }`}
                >
                  {prof.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#111418]">
              <div className="text-[11px] font-mono text-neutral-500">Monthly Savings</div>
              <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                ${estimate.monthlySaved.toLocaleString()}
              </div>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#111418]">
              <div className="text-[11px] font-mono text-neutral-500">Annualized ROI</div>
              <div className="text-xl font-bold font-mono text-neutral-900 dark:text-neutral-100 mt-0.5">
                ${estimate.annualSaved.toLocaleString()}
              </div>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#111418]">
              <div className="text-[11px] font-mono text-neutral-500">Optimized Bill</div>
              <div className="text-xl font-bold font-mono text-sky-600 dark:text-sky-400 mt-0.5">
                ${estimate.projectedSpend.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="space-y-2.5 pt-1">
            {estimate.breakdown.map((b) => (
              <div
                key={b.label}
                className="p-2.5 rounded-lg border border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-neutral-900/40"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">{b.label}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    -{b.pct}% (${b.monthlySaved.toLocaleString()}/mo)
                  </span>
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {b.recommendation}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] font-mono text-neutral-500">
              Tip: Try <code className="text-neutral-800 dark:text-neutral-200">./finops-calc.sh --spend={monthlySpend}</code> in Terminal Mode
            </span>
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-900 dark:bg-emerald-600 text-white text-xs font-mono font-semibold hover:opacity-90 cursor-pointer"
            >
              <span>Request FinOps Audit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
