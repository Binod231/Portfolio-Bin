"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Terminal,
  FileText,
  ArrowUpRight,
  Copy,
  Check,
  FolderGit2,
  BookOpen,
  Briefcase,
  Compass,
  Calculator,
  X,
} from "lucide-react";
import { portfolio } from "@/data/portfolio";

type PaletteItem = {
  id: string;
  group: string;
  title: string;
  subtitle: string;
  icon: "terminal" | "section" | "project" | "blog" | "action" | "finops";
  action: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    const onCustomOpen = () => setOpen(true);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onCustomOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onCustomOpen);
    };
  }, [open]);

  const navigateToSection = (hash: string) => {
    setOpen(false);
    if (pathname !== "/") {
      router.push(`/${hash}`);
      return;
    }
    const el = document.querySelector(hash);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 30;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  const items: PaletteItem[] = useMemo(() => {
    const list: PaletteItem[] = [
      {
        id: "action-terminal",
        group: "Actions",
        title: "Open Binod Linux World Terminal",
        subtitle: "Full-screen read-only Ubuntu shell (/terminal)",
        icon: "terminal",
        action: () => {
          setOpen(false);
          router.push("/terminal");
        },
      },
      {
        id: "action-finops",
        group: "Actions",
        title: "Open AWS FinOps Savings Estimator",
        subtitle: "Calculate projected ~30% cloud cost reduction (#finops-estimator)",
        icon: "finops",
        action: () => navigateToSection("#finops-estimator"),
      },
      {
        id: "action-resume",
        group: "Actions",
        title: "View / Download Resume PDF",
        subtitle: "Google Drive CV — Cloud & DevOps Consultant",
        icon: "action",
        action: () => {
          setOpen(false);
          window.open(portfolio.personal.links.resume, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "action-email",
        group: "Actions",
        title: copiedEmail ? "Email Copied!" : `Copy Email (${portfolio.personal.email})`,
        subtitle: "Copy direct consulting contact email to clipboard",
        icon: "action",
        action: () => {
          navigator.clipboard?.writeText(portfolio.personal.email);
          setCopiedEmail(true);
          setTimeout(() => setCopiedEmail(false), 1800);
        },
      },
    ];

    const sections = [
      { label: "About", hash: "#about" },
      { label: "Experience", hash: "#experience" },
      { label: "Case Studies", hash: "#case-studies" },
      { label: "Projects", hash: "#projects" },
      { label: "Services", hash: "#services" },
      { label: "Blogs", hash: "#blogs" },
      { label: "Certifications", hash: "#certifications" },
      { label: "Contact", hash: "#contact" },
    ];
    sections.forEach((sec) => {
      list.push({
        id: `sec-${sec.hash}`,
        group: "Sections",
        title: sec.label,
        subtitle: `Jump to /${sec.hash}`,
        icon: "section",
        action: () => navigateToSection(sec.hash),
      });
    });

    portfolio.projects.forEach((p) => {
      list.push({
        id: `proj-${p.title}`,
        group: "Projects",
        title: p.title,
        subtitle: `${p.type} · ${p.tech.slice(0, 4).join(", ")}`,
        icon: "project",
        action: () => {
          setOpen(false);
          window.open(p.repo, "_blank", "noopener,noreferrer");
        },
      });
    });

    portfolio.blogs.forEach((b) => {
      list.push({
        id: `blog-${b.title}`,
        group: "Blogs",
        title: b.title,
        subtitle: `${b.platform} · ${b.date} · ${b.category}`,
        icon: "blog",
        action: () => {
          setOpen(false);
          window.open(b.url, "_blank", "noopener,noreferrer");
        },
      });
    });

    return list;
  }, [copiedEmail, pathname]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 14);
    return items
      .filter((it) => `${it.group} ${it.title} ${it.subtitle}`.toLowerCase().includes(q))
      .slice(0, 20);
  }, [items, query]);

  useEffect(() => {
    setSelectedIdx(0);
  }, [query, open]);

  if (!open) return null;

  const renderIcon = (kind: PaletteItem["icon"]) => {
    if (kind === "terminal") return <Terminal className="w-4 h-4 text-emerald-500" />;
    if (kind === "project") return <FolderGit2 className="w-4 h-4 text-sky-500" />;
    if (kind === "blog") return <BookOpen className="w-4 h-4 text-amber-500" />;
    if (kind === "finops") return <Calculator className="w-4 h-4 text-emerald-500" />;
    if (kind === "section") return <Compass className="w-4 h-4 text-neutral-500" />;
    if (copiedEmail) return <Check className="w-4 h-4 text-emerald-500" />;
    return <FileText className="w-4 h-4 text-neutral-500" />;
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-start justify-center pt-[12vh] px-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-2xl rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15191f] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIdx((i) => Math.min(filtered.length - 1, i + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIdx((i) => Math.max(0, i - 1));
              } else if (e.key === "Enter" && filtered[selectedIdx]) {
                e.preventDefault();
                filtered[selectedIdx].action();
              }
            }}
            placeholder="Search blogs (31), projects, sections, FinOps estimator, or launch Terminal..."
            className="flex-1 bg-transparent outline-none text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
            autoFocus
          />
          <button
            onClick={() => setOpen(false)}
            className="p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800/70">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-xs font-mono text-neutral-500">
              No matching commands, projects, or blogs found.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={item.id}
                onClick={item.action}
                onMouseEnter={() => setSelectedIdx(idx)}
                className={`w-full text-left px-4 py-2.5 flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                  idx === selectedIdx
                    ? "bg-neutral-100 dark:bg-neutral-800/80"
                    : "hover:bg-neutral-50 dark:hover:bg-neutral-800/40"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0">{renderIcon(item.icon)}</div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                      {item.title}
                    </div>
                    <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 truncate">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 shrink-0 inline-flex items-center gap-1">
                  <span>{item.group}</span>
                  {(item.group === "Projects" || item.group === "Blogs") && (
                    <ArrowUpRight className="w-3 h-3" />
                  )}
                </span>
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2 bg-neutral-50 dark:bg-[#111418] border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span>↑↓ Navigate · ↵ Open · Esc Close</span>
          <span>Ctrl+K / ⌘K</span>
        </div>
      </div>
    </div>
  );
}

