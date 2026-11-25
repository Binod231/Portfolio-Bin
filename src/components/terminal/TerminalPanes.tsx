"use client";

import React, { useEffect, useRef, useState } from "react";
import { TerminalTheme } from "./terminalThemes";

export function NanoViewer({
  fileName,
  content,
  theme,
  onExit,
}: {
  fileName: string;
  content: string;
  theme: TerminalTheme;
  onExit: () => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [notice, setNotice] = useState(
    "[ File is READ-ONLY (-r--r--r--). Editing is disabled. Press ^X or Esc to exit. ]"
  );
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "x")) {
        e.preventDefault();
        onExit();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "o") {
        e.preventDefault();
        setNotice("[ Error: Read-only file system (chmod 444) — writes disabled ]");
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "w") {
        e.preventDefault();
        setShowSearch((s) => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onExit]);

  const runSearch = () => {
    if (!searchQuery || !textareaRef.current) return;
    const idx = content.toLowerCase().indexOf(searchQuery.toLowerCase());
    if (idx === -1) {
      setNotice(`[ "${searchQuery}" not found ]`);
      return;
    }
    textareaRef.current.focus();
    textareaRef.current.setSelectionRange(idx, idx + searchQuery.length);
    setNotice(`[ Found match for "${searchQuery}" ]`);
  };

  return (
    <div className="flex-1 flex flex-col text-xs sm:text-sm min-h-0" style={{ background: theme.bgDark }}>
      <div
        className="px-4 py-1 flex items-center justify-between font-bold shrink-0"
        style={{ background: theme.text, color: theme.bgDark }}
      >
        <span>GNU nano 7.2</span>
        <span>File: {fileName}</span>
        <span>[ Read-Only ]</span>
      </div>

      {showSearch && (
        <div
          className="px-4 py-1.5 flex items-center gap-2 border-b shrink-0"
          style={{ background: theme.bgElevated, borderColor: theme.border }}
        >
          <span style={{ color: theme.promptUser }}>Search:</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
            placeholder="find text & press Enter..."
            className="px-2 py-0.5 rounded outline-none border flex-1 max-w-xs"
            style={{ background: theme.bgDark, borderColor: theme.border, color: theme.text }}
            autoFocus
          />
          <button
            onClick={runSearch}
            className="px-2.5 py-0.5 rounded font-bold cursor-pointer text-xs"
            style={{ background: theme.promptUser, color: theme.bgDark }}
          >
            Find
          </button>
        </div>
      )}

      <textarea
        ref={textareaRef}
        value={content}
        readOnly
        onKeyDown={(e) => {
          if (!e.ctrlKey && !e.metaKey && e.key.length === 1) {
            setNotice("[ Error: Read-only file system — editing is disabled ]");
          }
        }}
        className="flex-1 w-full p-5 outline-none resize-none font-mono leading-relaxed min-h-0"
        style={{ background: theme.bgDark, color: theme.text }}
        spellCheck={false}
      />

      {notice && (
        <div
          className="text-center py-0.5 font-bold shrink-0"
          style={{ background: theme.text, color: theme.bgDark }}
        >
          {notice}
        </div>
      )}

      <div
        className="px-4 py-2 flex flex-wrap items-center gap-3 border-t text-xs shrink-0"
        style={{ background: "#2c2b29", borderColor: "#4c4a46" }}
      >
        <button
          onClick={() => setNotice("[ Error: Read-only file system (chmod 444) — write disabled ]")}
          className="px-2.5 py-1 rounded bg-[#3c3b37] border border-[#555753] text-[#ad7fa8] cursor-not-allowed"
        >
          ^O Write Out (Locked)
        </button>
        <button
          onClick={() => setShowSearch((s) => !s)}
          className="px-2.5 py-1 rounded font-bold cursor-pointer border"
          style={{ background: theme.bgElevated, borderColor: theme.promptPath, color: theme.promptPath }}
        >
          ^W Where Is (Search)
        </button>
        <button
          onClick={onExit}
          className="px-2.5 py-1 rounded font-bold cursor-pointer ml-auto text-white"
          style={{ background: theme.accent }}
        >
          ^X Exit nano
        </button>
      </div>
    </div>
  );
}

export function LessPager({
  fileName,
  content,
  theme,
  onExit,
}: {
  fileName: string;
  content: string;
  theme: TerminalTheme;
  onExit: () => void;
}) {
  const lines = content.split("\n");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState("");
  const visible = filter
    ? lines.filter((l) => l.toLowerCase().includes(filter.toLowerCase()))
    : lines;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT") {
        if (e.key === "Escape") onExit();
        return;
      }
      if (e.key === "q" || e.key === "Escape") {
        e.preventDefault();
        onExit();
      } else if (e.key === "j" || e.key === "ArrowDown") {
        containerRef.current?.scrollBy({ top: 36 });
      } else if (e.key === "k" || e.key === "ArrowUp") {
        containerRef.current?.scrollBy({ top: -36 });
      } else if (e.key === " ") {
        e.preventDefault();
        containerRef.current?.scrollBy({ top: 280 });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onExit]);

  return (
    <div className="flex-1 flex flex-col text-xs sm:text-sm min-h-0" style={{ background: theme.bgDark }}>
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 sm:p-5 font-mono leading-relaxed whitespace-pre-wrap"
        style={{ color: theme.text }}
      >
        {visible.join("\n")}
      </div>
      <div
        className="px-4 py-1.5 flex flex-wrap items-center justify-between gap-3 border-t text-xs shrink-0"
        style={{ background: theme.bgElevated, borderColor: theme.border }}
      >
        <div className="flex items-center gap-3">
          <span className="font-bold px-2 py-0.5 rounded" style={{ background: theme.text, color: theme.bgDark }}>
            {fileName} ({visible.length}/{lines.length} lines)
          </span>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="/filter lines..."
            className="px-2 py-0.5 rounded border outline-none text-xs"
            style={{ background: theme.bgDark, borderColor: theme.border, color: theme.text }}
          />
        </div>
        <button
          onClick={onExit}
          className="px-2.5 py-0.5 rounded font-bold cursor-pointer text-white"
          style={{ background: theme.accent }}
        >
          [q] Quit less
        </button>
      </div>
    </div>
  );
}

const HTOP_PROCS = [
  { pid: 104, user: "binod", cmd: "ecs-fargate-agent --cluster mcqtest-multi-az --sla 99.9%" },
  { pid: 218, user: "binod", cmd: "prometheus-node-exporter --multi-dc --kathmandu --remote" },
  { pid: 305, user: "binod", cmd: "odoo-erp-worker --pool=8 --postgres-tuned" },
  { pid: 412, user: "binod", cmd: "fastapi-uvicorn --redis-jwks-cache --latency-cut=95%" },
  { pid: 509, user: "binod", cmd: "bedrock-rag-pipeline --pgvector --chromadb" },
  { pid: 617, user: "binod", cmd: "github-actions-runner --docker-cache --speedup=50%" },
  { pid: 724, user: "binod", cmd: "aws-finops-auditor --monthly-savings=30%" },
];

export function HtopMonitor({
  theme,
  onExit,
}: {
  theme: TerminalTheme;
  onExit: () => void;
}) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 900);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "q" || e.key === "Escape") {
        e.preventDefault();
        onExit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearInterval(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [onExit]);

  const makeBar = (pct: number) => {
    const filled = Math.round((pct / 100) * 26);
    return `[${"|".repeat(filled)}${" ".repeat(26 - filled)}] ${pct.toFixed(1)}%`;
  };

  const cpu1 = 18 + ((tick * 7) % 14);
  const cpu2 = 12 + ((tick * 11) % 19);
  const mem = 24.4 + ((tick * 3) % 4) * 0.3;

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-5 text-xs sm:text-sm min-h-0" style={{ background: theme.bgDark }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4 border-b" style={{ borderColor: theme.border }}>
        <div className="space-y-1">
          <div style={{ color: theme.promptUser }}>CPU0 {makeBar(cpu1)}</div>
          <div style={{ color: theme.promptUser }}>CPU1 {makeBar(cpu2)}</div>
          <div style={{ color: theme.promptPath }}>Mem  {makeBar(mem)} (3.9G/16.0G)</div>
        </div>
        <div className="space-y-1" style={{ color: theme.text }}>
          <div>Tasks: 7 running, 0 zombie | SLA: <b style={{ color: theme.promptUser }}>99.9%</b></div>
          <div>Load average: 0.14, 0.11, 0.09</div>
          <div>Location: Kathmandu, Nepal (UTC+5:45)</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-3 space-y-1 font-mono">
        <div className="font-bold px-2 py-1 rounded" style={{ background: theme.promptUser, color: theme.bgDark }}>
          PID   USER     CPU%   MEM%   COMMAND
        </div>
        {HTOP_PROCS.map((p, idx) => {
          const cpu = (0.8 + ((tick + idx * 3) % 7) * 0.4).toFixed(1);
          const m = (1.2 + idx * 0.4).toFixed(1);
          return (
            <div key={p.pid} className="px-2 py-0.5 flex gap-4 whitespace-pre" style={{ color: theme.text }}>
              <span>{String(p.pid).padEnd(5)}</span>
              <span style={{ color: theme.promptPath }}>{p.user.padEnd(8)}</span>
              <span style={{ color: theme.promptUser }}>{cpu.padStart(4)}%</span>
              <span>{m.padStart(4)}%</span>
              <span className="truncate">{p.cmd}</span>
            </div>
          );
        })}
      </div>

      <div className="pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: theme.border }}>
        <span style={{ color: theme.muted }}>Live telemetry updating every 0.9s</span>
        <button
          onClick={onExit}
          className="px-3 py-1 rounded font-bold cursor-pointer text-white"
          style={{ background: theme.accent }}
        >
          [q] Quit htop
        </button>
      </div>
    </div>
  );
}

