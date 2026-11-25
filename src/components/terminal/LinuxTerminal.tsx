"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createInitialFs, FsNode } from "@/data/linuxFs";
import { portfolio } from "@/data/portfolio";
import DotMatrixPortrait from "./DotMatrixPortrait";
import { TERMINAL_THEMES, ThemeName } from "./terminalThemes";
import { handleDevOpsCommand } from "./devopsCli";
import { HtopMonitor, LessPager, NanoViewer } from "./TerminalPanes";
import {
  ArrowUpRight,
  Folder,
  FileText,
  Image as ImageIcon,
  Terminal as TerminalIcon,
  LayoutGrid,
  Lock,
  X,
} from "lucide-react";

type OutputEntry = {
  id: number;
  promptPath: string;
  command: string;
  body: React.ReactNode;
};

type ActiveModal =
  | { kind: "nano"; fileName: string; content: string }
  | { kind: "less"; fileName: string; content: string }
  | { kind: "htop" }
  | null;

const COMMAND_LIST = [
  "help",
  "ls",
  "ll",
  "cd",
  "pwd",
  "tree",
  "cat",
  "head",
  "tail",
  "wc",
  "less",
  "more",
  "nano",
  "view",
  "imgcat",
  "open",
  "grep",
  "aws",
  "kubectl",
  "docker",
  "htop",
  "ping",
  "curl",
  "man",
  "theme",
  "./hire-me.sh",
  "hire-me",
  "resume",
  "cowsay",
  "fortune",
  "whoami",
  "id",
  "hostname",
  "uname",
  "uptime",
  "df",
  "free",
  "ps",
  "env",
  "neofetch",
  "history",
  "clear",
  "exit",
];

const READONLY_CMDS = new Set(["touch", "mkdir", "rm", "rmdir", "mv", "cp", "chmod", "chown", "vi", "vim"]);

function longestCommonPrefix(items: string[]): string {
  if (items.length === 0) return "";
  let prefix = items[0];
  for (let i = 1; i < items.length; i++) {
    while (!items[i].startsWith(prefix) && prefix.length > 0) {
      prefix = prefix.slice(0, -1);
    }
  }
  return prefix;
}

function renderTextWithLinks(text: string, linkColor = "#38bdf8"): React.ReactNode {
  const regex = /(https?:\/\/[^\s)]+|mailto:[^\s)]+)/g;
  return text.split("\n").map((line, li) => {
    const parts = line.split(regex);
    return (
      <div key={li} className="min-h-[1.25rem]">
        {parts.map((part, pi) =>
          /^(https?:\/\/|mailto:)/.test(part) ? (
            <a
              key={pi}
              href={part}
              target={part.startsWith("http") ? "_blank" : undefined}
              rel={part.startsWith("http") ? "noopener noreferrer" : undefined}
              className="underline hover:opacity-80 inline-flex items-center gap-0.5 break-all"
              style={{ color: linkColor }}
            >
              <span>{part}</span>
              <ArrowUpRight className="w-3 h-3 inline shrink-0" />
            </a>
          ) : (
            <span key={pi}>{part}</span>
          )
        )}
      </div>
    );
  });
}

export default function LinuxTerminal() {
  const router = useRouter();
  const [fsRoot] = useState<FsNode>(() => createInitialFs());
  const [cwdParts, setCwdParts] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number>(-1);
  const [entries, setEntries] = useState<OutputEntry[]>([]);
  const [themeName, setThemeName] = useState<ThemeName>("ubuntu");
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  const theme = TERMINAL_THEMES[themeName];
  const outputEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const nextId = useRef(1);

  const cwdDisplay = cwdParts.length === 0 ? "~" : `~/${cwdParts.join("/")}`;

  const resolveNode = (
    pathStr: string,
    baseParts: string[] = cwdParts,
    root: FsNode = fsRoot
  ): { node: FsNode | null; parts: string[] } => {
    const cleaned = pathStr.trim();
    let targetParts: string[];
    if (!cleaned || cleaned === "~" || cleaned === "/home/binod") {
      targetParts = [];
    } else if (cleaned.startsWith("~/")) {
      targetParts = cleaned.slice(2).split("/").filter(Boolean);
    } else if (cleaned.startsWith("/home/binod/")) {
      targetParts = cleaned.slice("/home/binod/".length).split("/").filter(Boolean);
    } else if (cleaned.startsWith("/")) {
      targetParts = cleaned.slice(1).split("/").filter(Boolean);
    } else {
      targetParts = [...baseParts, ...cleaned.split("/").filter(Boolean)];
    }

    const normalized: string[] = [];
    for (const seg of targetParts) {
      if (seg === ".") continue;
      if (seg === "..") {
        normalized.pop();
      } else {
        normalized.push(seg);
      }
    }

    let curr: FsNode = root;
    for (const seg of normalized) {
      if (curr.type !== "dir" || !curr.children[seg]) {
        return { node: null, parts: normalized };
      }
      curr = curr.children[seg];
    }
    return { node: curr, parts: normalized };
  };

  /** Expand simple globs like `*.md` or `experience/*.md` into matching file paths. */
  const expandGlobPaths = (pattern: string, baseParts: string[]): { node: FsNode; parts: string[] }[] => {
    if (!pattern.includes("*")) {
      const res = resolveNode(pattern, baseParts);
      return res.node ? [{ node: res.node, parts: res.parts }] : [];
    }
    const lastSlash = pattern.lastIndexOf("/");
    const dirPart = lastSlash >= 0 ? pattern.slice(0, lastSlash) || "/" : ".";
    const filePattern = lastSlash >= 0 ? pattern.slice(lastSlash + 1) : pattern;
    const dirRes = resolveNode(dirPart, baseParts);
    if (!dirRes.node || dirRes.node.type !== "dir") return [];

    const regex = new RegExp(
      "^" + filePattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$"
    );
    return Object.entries(dirRes.node.children)
      .filter(([name]) => regex.test(name))
      .map(([name, node]) => ({ node, parts: [...dirRes.parts, name] }));
  };

  const currentDir = useMemo(() => {
    const res = resolveNode("~/" + cwdParts.join("/"), []);
    return res.node && res.node.type === "dir" ? res.node : null;
  }, [cwdParts, fsRoot]);

  const appendOutput = (command: string, body: React.ReactNode, promptPath = cwdDisplay) => {
    setEntries((prev) => [...prev, { id: nextId.current++, promptPath, command, body }]);
  };

  useEffect(() => {
    if (entries.length === 0) {
      executeCommand("welcome");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries]);

  useEffect(() => {
    const onGlobalKey = (e: KeyboardEvent) => {
      if (!activeModal && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
        e.preventDefault();
        setEntries([]);
      }
    };
    window.addEventListener("keydown", onGlobalKey);
    return () => window.removeEventListener("keydown", onGlobalKey);
  }, [activeModal]);

  const buildTreeLines = (node: FsNode, prefix = "", isLast = true, isRoot = true): string[] => {
    const lines: string[] = [];
    if (isRoot) {
      lines.push("/home/binod");
    } else {
      lines.push(`${prefix}${isLast ? "└── " : "├── "}${node.name}${node.type === "dir" ? "/" : ""}`);
    }
    if (node.type === "dir") {
      const keys = Object.keys(node.children);
      keys.forEach((k, idx) => {
        const child = node.children[k];
        const childPrefix = isRoot ? "" : prefix + (isLast ? "    " : "│   ");
        lines.push(...buildTreeLines(child, childPrefix, idx === keys.length - 1, false));
      });
    }
    return lines;
  };

  const renderDirListing = (dirNode: FsNode & { type: "dir" }, dirParts: string[], longMode = false) => {
    const keys = Object.keys(dirNode.children);
    if (longMode) {
      return (
        <div className="space-y-1 text-xs">
          <div style={{ color: theme.text }}>total {keys.length * 4}</div>
          {keys.map((key) => {
            const item = dirNode.children[key];
            const fullPath = dirParts.length ? `~/${dirParts.join("/")}/${key}` : `~/${key}`;
            const perms = item.type === "dir" ? "dr-xr-xr-x" : "-r--r--r--";
            const size = item.type === "dir" ? "4096" : String(item.content.length).padStart(4, " ");
            return (
              <div key={key} className="flex flex-wrap items-center gap-2 font-mono">
                <span style={{ color: theme.muted }}>{perms}</span>
                <span style={{ color: theme.text }}>1 binod devops {size} Nov 25 11:55</span>
                {item.type === "dir" ? (
                  <button
                    onClick={() => executeCommand(`cd ${fullPath} && ls`)}
                    className="font-bold hover:underline cursor-pointer"
                    style={{ color: theme.promptPath }}
                  >
                    {key}/
                  </button>
                ) : item.imageSrc ? (
                  <button
                    onClick={() => executeCommand(`view ${fullPath}`)}
                    className="font-bold hover:underline cursor-pointer"
                    style={{ color: theme.accent }}
                  >
                    {key}
                  </button>
                ) : (
                  <button
                    onClick={() => executeCommand(`cat ${fullPath}`)}
                    className="hover:underline cursor-pointer"
                    style={{ color: theme.promptUser }}
                  >
                    {key}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-2">
        {keys.map((key) => {
          const item = dirNode.children[key];
          const fullPath = dirParts.length ? `~/${dirParts.join("/")}/${key}` : `~/${key}`;
          if (item.type === "dir") {
            return (
              <button
                key={key}
                onClick={() => executeCommand(`cd ${fullPath} && ls`)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border font-bold text-xs cursor-pointer transition-colors"
                style={{ background: theme.bgElevated, borderColor: theme.border, color: theme.promptPath }}
              >
                <Folder className="w-3.5 h-3.5" />
                <span>{key}/</span>
              </button>
            );
          }
          if (item.imageSrc) {
            return (
              <button
                key={key}
                onClick={() => executeCommand(`view ${fullPath}`)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs cursor-pointer transition-colors"
                style={{ background: theme.bgDark, borderColor: theme.accent, color: theme.accent }}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{key}</span>
              </button>
            );
          }
          return (
            <button
              key={key}
              onClick={() => executeCommand(`cat ${fullPath}`)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs cursor-pointer transition-colors"
              style={{ background: theme.bgDark, borderColor: theme.border, color: theme.promptUser }}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{key}</span>
            </button>
          );
        })}
      </div>
    );
  };

  const renderImageCard = (node: FsNode & { type: "file" }) => (
    <div
      className="mt-2 p-3 rounded-lg border inline-flex flex-col sm:flex-row items-center gap-4"
      style={{ background: theme.bgDark, borderColor: theme.border }}
    >
      {node.isDotMatrix ? (
        <DotMatrixPortrait src={node.imageSrc || "/profile-headshot.jpg"} size={210} />
      ) : (
        <img
          src={node.imageSrc}
          alt={node.name}
          className="max-w-[240px] max-h-[240px] rounded-lg border object-cover"
          style={{ borderColor: theme.promptUser }}
        />
      )}
      <div className="text-xs space-y-1.5" style={{ color: theme.text }}>
        <div className="font-bold" style={{ color: theme.promptUser }}>
          [IMAGE VIEWER // {node.name}]
        </div>
        <div className="whitespace-pre-wrap">{renderTextWithLinks(node.content, theme.promptPath)}</div>
        {node.redirectUrl && (
          <a
            href={node.redirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded text-white font-bold inline-flex items-center gap-1 hover:opacity-90"
            style={{ background: theme.accent }}
          >
            <span>Open Verification Link</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );

  /** Evaluate a single stage returning plain text for `|` pipelines. */
  const evalTextStage = (rawStage: string, stdinText: string | null, currentParts: string[]): string => {
    const parts = rawStage.trim().split(/\s+/);
    const cmd = (parts[0] || "").toLowerCase();
    const args = parts.slice(1);

    const devopsOut = handleDevOpsCommand(cmd, args);
    if (devopsOut !== null) return devopsOut;

    if (cmd === "ls" || cmd === "ll" || cmd === "dir") {
      const hasLong = cmd === "ll" || args.some((a) => a.startsWith("-") && a.includes("l"));
      const targetArg = args.filter((a) => !a.startsWith("-"))[0] || "";
      const res = targetArg
        ? resolveNode(targetArg, currentParts)
        : resolveNode("~/" + currentParts.join("/"), []);
      if (!res.node) return `ls: cannot access '${targetArg}': No such file or directory`;
      if (res.node.type === "file") return res.node.name;
      const entriesList = Object.entries(res.node.children);
      if (hasLong) {
        return entriesList
          .map(([k, item]) => {
            const perms = item.type === "dir" ? "dr-xr-xr-x" : "-r--r--r--";
            const sz = item.type === "dir" ? "4096" : String(item.content.length).padStart(4, " ");
            return `${perms} 1 binod devops ${sz} Nov 25 11:55 ${k}${item.type === "dir" ? "/" : ""}`;
          })
          .join("\n");
      }
      return entriesList.map(([k, item]) => `${k}${item.type === "dir" ? "/" : ""}`).join("\n");
    }

    if (cmd === "tree") {
      const targetArg = args[0] || "";
      const target = targetArg ? resolveNode(targetArg, currentParts) : { node: currentDir || fsRoot, parts: currentParts };
      return target.node ? buildTreeLines(target.node).join("\n") : `tree: ${targetArg}: No such directory`;
    }

    if (cmd === "cat" || cmd === "head" || cmd === "tail" || cmd === "wc") {
      let nLines = 10;
      const nonFlagArgs: string[] = [];
      for (let i = 0; i < args.length; i++) {
        if (args[i] === "-n" && args[i + 1]) {
          nLines = Math.max(1, parseInt(args[i + 1], 10) || 10);
          i++;
        } else if (!args[i].startsWith("-")) {
          nonFlagArgs.push(args[i]);
        }
      }

      let sourceText = stdinText;
      if (sourceText === null) {
        if (nonFlagArgs.length === 0) return `Usage: ${cmd} <file>`;
        const matched = nonFlagArgs.flatMap((a) => expandGlobPaths(a, currentParts));
        const files = matched.filter((m) => m.node.type === "file");
        if (files.length === 0) return `${cmd}: ${nonFlagArgs[0]}: No such file`;
        sourceText = files.map((f) => (f.node.type === "file" ? f.node.content : "")).join("\n\n");
      }

      if (cmd === "head") return sourceText.split("\n").slice(0, nLines).join("\n");
      if (cmd === "tail") return sourceText.split("\n").slice(-nLines).join("\n");
      if (cmd === "wc") {
        const lines = sourceText === "" ? 0 : sourceText.split("\n").length;
        const words = sourceText.trim().split(/\s+/).filter(Boolean).length;
        const bytes = sourceText.length;
        if (args.includes("-l")) return String(lines);
        if (args.includes("-w")) return String(words);
        if (args.includes("-c")) return String(bytes);
        return ` ${lines}  ${words}  ${bytes}`;
      }
      return sourceText;
    }

    if (cmd === "grep") {
      const q = args.filter((a) => !a.startsWith("-")).join(" ").toLowerCase();
      if (!q) return "Usage: grep <keyword>";
      if (stdinText !== null) {
        const matched = stdinText.split("\n").filter((ln) => ln.toLowerCase().includes(q));
        return matched.join("\n") || `(no lines matched "${q}")`;
      }
      const hits: string[] = [];
      const walk = (n: FsNode, p: string[]) => {
        if (n.type === "file") {
          n.content.split("\n").forEach((ln) => {
            if (ln.toLowerCase().includes(q)) hits.push(`~/${p.join("/")}: ${ln.trim()}`);
          });
        } else {
          Object.entries(n.children).forEach(([k, ch]) => walk(ch, [...p, k]));
        }
      };
      walk(fsRoot, []);
      return hits.slice(0, 30).join("\n") || `No matches for "${q}"`;
    }

    return `bash: ${cmd}: unsupported in pipe`;
  };

  const runSingleCommand = (rawCmd: string, currentParts: string[]): string[] => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return currentParts;
    const promptStr = currentParts.length === 0 ? "~" : `~/${currentParts.join("/")}`;

    // Block shell output redirection (`>` / `>>`)
    if (/[^a-zA-Z0-9](>|>>)\s*\S+/.test(trimmed)) {
      appendOutput(
        trimmed,
        <span style={{ color: theme.danger }}>
          [AWS IAM GUARDRAIL] bash: Read-only file system (writes and redirections are disabled)
        </span>,
        promptStr
      );
      return currentParts;
    }

    // Handle true Unix pipes `|`
    if (trimmed.includes("|")) {
      const stages = trimmed.split("|").map((s) => s.trim()).filter(Boolean);
      let buffer: string | null = null;
      for (const stage of stages) {
        buffer = evalTextStage(stage, buffer, currentParts);
      }
      appendOutput(
        trimmed,
        <div className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed" style={{ color: theme.text }}>
          {renderTextWithLinks(buffer || "", theme.promptPath)}
        </div>,
        promptStr
      );
      return currentParts;
    }

    const [cmdRaw, ...rest] = trimmed.split(/\s+/);
    const cmd = cmdRaw.toLowerCase();
    const arg = rest.join(" ").trim();

    if (cmd === "clear") {
      setEntries([]);
      return currentParts;
    }
    if (cmd === "exit" || cmd === "logout") {
      router.push("/");
      return currentParts;
    }
    if (cmd === "htop") {
      setActiveModal({ kind: "htop" });
      return currentParts;
    }
    if (cmd === "sudo") {
      appendOutput(
        trimmed,
        <span style={{ color: theme.danger }}>
          [sudo] password for binod: visitor is not in the sudoers file. This incident will be reported.
        </span>,
        promptStr
      );
      return currentParts;
    }
    if (cmd === "rm" && (arg.includes("-rf /") || arg.includes("-rf *") || arg.includes("-r /"))) {
      appendOutput(
        trimmed,
        <span style={{ color: theme.danger }}>
          [AWS IAM GUARDRAIL] Action denied: Production filesystem mounted read-only (ro). Nice try!
        </span>,
        promptStr
      );
      return currentParts;
    }
    if (cmd === "vi" || cmd === "vim") {
      if (!arg) {
        appendOutput(trimmed, <span style={{ color: theme.warn }}>Usage: nano &lt;file&gt; (Read-only viewer)</span>, promptStr);
        return currentParts;
      }
      return runSingleCommand(`nano ${arg}`, currentParts);
    }
    if (READONLY_CMDS.has(cmd)) {
      appendOutput(
        trimmed,
        <span style={{ color: theme.danger }}>
          {cmd}: cannot modify '{arg || "."}': Read-only file system (ro)
        </span>,
        promptStr
      );
      return currentParts;
    }

    if (cmd === "theme") {
      const target = arg.toLowerCase() as ThemeName;
      if (target && TERMINAL_THEMES[target]) {
        setThemeName(target);
        appendOutput(
          trimmed,
          <span style={{ color: TERMINAL_THEMES[target].promptUser }}>
            Theme switched to {TERMINAL_THEMES[target].label} ({target})
          </span>,
          promptStr
        );
      } else {
        appendOutput(
          trimmed,
          <span style={{ color: theme.warn }}>
            Current: {themeName} | Available: {Object.keys(TERMINAL_THEMES).join(", ")} (e.g. 'theme kali')
          </span>,
          promptStr
        );
      }
      return currentParts;
    }

    if (cmd === "./hire-me.sh" || cmd === "hire-me" || cmd === "resume") {
      const p = portfolio.personal;
      appendOutput(
        trimmed,
        <pre className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed" style={{ color: theme.text }}>
          {renderTextWithLinks(
            [
              `==================================================================`,
              `EXECUTIVE BRIEF — ${p.name.toUpperCase()}`,
              `==================================================================`,
              `Role       : ${p.role}`,
              `Current    : DevOps Consultant @ Glovion Consulting Private Limited`,
              `Location   : Kathmandu, Nepal (UTC+5:45 | Remote-ready)`,
              `Impact     : 99.9% Uptime SLA | ~50% Faster CI/CD | ~30% FinOps Cut | -95% OAuth2 Latency`,
              ``,
              `Resume PDF : ${p.links.resume}`,
              `LinkedIn   : ${p.links.linkedin}`,
              `GitHub     : ${p.links.github}`,
              `Credly     : https://www.credly.com/users/binod-prasad-joshi.69a505f6/badges/credly`,
              `Email      : mailto:${p.email}`,
            ].join("\n"),
            theme.promptPath
          )}
        </pre>,
        promptStr
      );
      return currentParts;
    }

    if (cmd === "welcome") {
      appendOutput(
        "",
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 py-1">
          <div className="space-y-2 text-xs sm:text-sm leading-snug">
            <pre
              className="font-bold whitespace-pre overflow-x-auto leading-tight text-[10px] sm:text-xs"
              style={{ color: theme.promptUser }}
            >{` ____  ___ _   _  ___  ____    _     ___ _   _ _   ___  __
| __ )|_ _| \\ | |/ _ \\|  _ \\  | |   |_ _| \\ | | | | \\ \\/ /
|  _ \\ | ||  \\| | | | | | | | | |    | ||  \\| | | | |\\  / 
| |_) || || |\\  | |_| | |_| | | |___ | || |\\  | |_| |/  \\ 
|____/|___|_| \\_|\\___/|____/  |_____|___|_| \\_|\\___//_/\\_\\`}</pre>

            <pre className="whitespace-pre-wrap text-xs sm:text-[13px] pt-1" style={{ color: theme.text }}>{`       =[ binod-linux-world v2026.11-devops-ro         ]
+ -- --=[ ${portfolio.experience.length} experiences  - ${portfolio.experience.filter((e) => e.caseStudy).length} case-studies - ${portfolio.projects.length} projects ]
+ -- --=[ ${portfolio.services.length} services     - ${portfolio.blogs.length} blogs       - ${portfolio.certifications.length} certs    ]
+ -- --=[ 2x AWS Certified | AWS Community Builder 2026 ]
+ -- --=[ Kathmandu, Nepal (UTC+5:45) | Read-Only Shell ]`}</pre>

            <div className="pt-1" style={{ color: theme.text }}>
              Welcome to <span className="font-bold" style={{ color: theme.promptUser }}>Binod Linux World</span>. Type{" "}
              <button onClick={() => executeCommand("help")} className="underline cursor-pointer font-bold" style={{ color: theme.promptUser }}>
                help
              </button>
              ,{" "}
              <button onClick={() => executeCommand("ls -la")} className="underline cursor-pointer font-bold" style={{ color: theme.promptPath }}>
                ls -la
              </button>
              ,{" "}
              <button onClick={() => executeCommand("aws sts get-caller-identity")} className="underline cursor-pointer font-bold" style={{ color: theme.promptUser }}>
                aws
              </button>
              ,{" "}
              <button onClick={() => executeCommand("kubectl get pods -A")} className="underline cursor-pointer font-bold" style={{ color: theme.promptPath }}>
                kubectl
              </button>
              ,{" "}
              <button onClick={() => executeCommand("htop")} className="underline cursor-pointer font-bold" style={{ color: theme.warn }}>
                htop
              </button>
              , or{" "}
              <button onClick={() => executeCommand("./hire-me.sh")} className="underline cursor-pointer font-bold" style={{ color: theme.accent }}>
                ./hire-me.sh
              </button>
              .
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 self-start lg:self-center">
            <DotMatrixPortrait src="/profile-headshot.jpg" size={172} />
            <span className="text-[10px]" style={{ color: theme.muted }}>
              [dot-matrix // binod231]
            </span>
          </div>
        </div>,
        ""
      );
      return currentParts;
    }

    if (cmd === "help") {
      appendOutput(
        trimmed,
        <pre className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed" style={{ color: theme.text }}>{`BINOD LINUX WORLD — SUPPORTED COMMANDS (READ-ONLY SHELL)
---------------------------------------------------------------------------
  Filesystem   : ls [-la], ll, cd <dir|..|~>, pwd, tree, cat, head [-n], tail [-n], wc [-l]
  Pagers/View  : less <file>, nano <file> (RO), view <image>, grep <term>
  Pipes/Globs  : Supports '|' and '*' (e.g. 'cat blogs/all-blogs.txt | grep Bedrock')
  Cloud/DevOps : aws (sts/ecs/s3), kubectl (get pods/nodes), docker (ps/images), htop, curl, ping
  Recruiter/UX : ./hire-me.sh, resume, theme <ubuntu|kali|matrix|amber>, man <cmd>, open <target>
  System/Fun   : whoami, id, hostname, uname, uptime, df, free, ps, env, neofetch, cowsay, fortune
  Shortcuts    : Tab (multi-match autocomplete), Up/Down (history), Ctrl+L (clear), exit`}</pre>,
        promptStr
      );
      return currentParts;
    }

    const devopsOut = handleDevOpsCommand(cmd, rest);
    if (devopsOut !== null) {
      appendOutput(
        trimmed,
        <pre className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed" style={{ color: theme.text }}>
          {renderTextWithLinks(devopsOut, theme.promptPath)}
        </pre>,
        promptStr
      );
      return currentParts;
    }

    if (cmd === "pwd") {
      appendOutput(
        trimmed,
        <span style={{ color: theme.text }}>{currentParts.length === 0 ? "/home/binod" : `/home/binod/${currentParts.join("/")}`}</span>,
        promptStr
      );
      return currentParts;
    }
    if (cmd === "whoami") {
      appendOutput(trimmed, <span style={{ color: theme.promptUser }}>binod</span>, promptStr);
      return currentParts;
    }
    if (cmd === "id") {
      appendOutput(
        trimmed,
        <span style={{ color: theme.text }}>uid=1000(binod) gid=1000(devops) groups=1000(devops),27(aws-cb),999(docker-ro)</span>,
        promptStr
      );
      return currentParts;
    }
    if (cmd === "hostname") {
      appendOutput(trimmed, <span style={{ color: theme.text }}>binod-linux-world.kathmandu.np</span>, promptStr);
      return currentParts;
    }
    if (cmd === "uname") {
      appendOutput(
        trimmed,
        <span style={{ color: theme.text }}>Linux binod-linux-world 6.8.0-aws-devops #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux</span>,
        promptStr
      );
      return currentParts;
    }
    if (cmd === "uptime") {
      appendOutput(
        trimmed,
        <span style={{ color: theme.text }}> 11:55:00 up 365 days, 23:59,  1 user,  load average: 0.12, 0.09, 0.08 (99.9% SLA)</span>,
        promptStr
      );
      return currentParts;
    }
    if (cmd === "df") {
      appendOutput(
        trimmed,
        <pre className="text-xs whitespace-pre-wrap" style={{ color: theme.text }}>{`Filesystem      Size  Used Avail Use% Mounted on
/dev/nvme0n1p1   50G  4.2G   46G   9% /home/binod (ro,noexec)`}</pre>,
        promptStr
      );
      return currentParts;
    }
    if (cmd === "free") {
      appendOutput(
        trimmed,
        <pre className="text-xs whitespace-pre-wrap" style={{ color: theme.text }}>{`               total        used        free      shared  buff/cache   available
Mem:            16Gi       3.1Gi       9.8Gi       128Mi       3.1Gi        12Gi
Swap:          2.0Gi          0B       2.0Gi`}</pre>,
        promptStr
      );
      return currentParts;
    }
    if (cmd === "ps") {
      appendOutput(trimmed, <pre className="text-xs whitespace-pre-wrap" style={{ color: theme.text }}>{handleDevOpsCommand("docker", ["ps"])}</pre>, promptStr);
      return currentParts;
    }
    if (cmd === "env") {
      appendOutput(
        trimmed,
        <pre className="text-xs whitespace-pre-wrap" style={{ color: theme.text }}>{`USER=binod
HOME=/home/binod
SHELL=/bin/bash
TERM=xterm-256color
THEME=${themeName}
LOCATION=Kathmandu, Nepal (UTC+5:45)
AWS_CERTIFIED=SAA-C03,CLF-C02
FS_MODE=READ_ONLY`}</pre>,
        promptStr
      );
      return currentParts;
    }
    if (cmd === "neofetch") {
      appendOutput(
        trimmed,
        <div className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded border" style={{ background: theme.bgDark, borderColor: theme.border }}>
          <DotMatrixPortrait src="/profile-headshot.jpg" size={150} />
          <pre className="text-xs whitespace-pre-wrap" style={{ color: theme.text }}>{`binod@linux-world
-----------------
OS       : Binod Linux World (${theme.label})
Host     : Glovion Consulting Private Limited
Location : Kathmandu, Nepal (UTC+5:45)
Shell    : bash 5.2 (Read-Only FS + Pipes)
Certs    : 2x AWS Certified (SAA-C03, CLF-C02)
Award    : AWS Community Builder (Dev Tools 2026)
Contents : 8 Dirs | ${portfolio.blogs.length} Blogs | ${portfolio.projects.length} Projects`}</pre>
        </div>,
        promptStr
      );
      return currentParts;
    }
    if (cmd === "date") {
      appendOutput(trimmed, <span style={{ color: theme.text }}>{new Date().toString()}</span>, promptStr);
      return currentParts;
    }
    if (cmd === "echo") {
      appendOutput(trimmed, <span style={{ color: theme.text }}>{arg}</span>, promptStr);
      return currentParts;
    }
    if (cmd === "history") {
      appendOutput(
        trimmed,
        <pre className="text-xs whitespace-pre-wrap" style={{ color: theme.muted }}>
          {history.map((h, i) => `  ${i + 1}  ${h}`).join("\n") || "(empty)"}
        </pre>,
        promptStr
      );
      return currentParts;
    }

    if (cmd === "tree") {
      const target = arg ? resolveNode(arg, currentParts) : { node: currentDir || fsRoot, parts: currentParts };
      appendOutput(
        trimmed,
        target.node ? (
          <pre className="text-xs whitespace-pre-wrap leading-relaxed" style={{ color: theme.promptUser }}>
            {buildTreeLines(target.node).join("\n")}
          </pre>
        ) : (
          <span style={{ color: theme.danger }}>tree: {arg}: No such directory</span>
        ),
        promptStr
      );
      return currentParts;
    }

    if (cmd === "ls" || cmd === "ll" || cmd === "dir") {
      const hasLongFlag = cmd === "ll" || rest.some((r) => r.startsWith("-") && r.includes("l"));
      const cleanArg = rest.filter((r) => !r.startsWith("-")).join(" ");
      if (cleanArg.includes("*")) {
        const matches = expandGlobPaths(cleanArg, currentParts);
        appendOutput(
          trimmed,
          matches.length ? (
            <span style={{ color: theme.promptUser }}>{matches.map((m) => m.node.name).join("  ")}</span>
          ) : (
            <span style={{ color: theme.danger }}>ls: cannot access '{cleanArg}': No such file or directory</span>
          ),
          promptStr
        );
        return currentParts;
      }
      const res = cleanArg ? resolveNode(cleanArg, currentParts) : resolveNode("~/" + currentParts.join("/"), []);
      if (!res.node) {
        appendOutput(trimmed, <span style={{ color: theme.danger }}>ls: cannot access '{cleanArg}': No such file or directory</span>, promptStr);
      } else if (res.node.type === "file") {
        appendOutput(trimmed, <span style={{ color: theme.promptUser }}>{res.node.name}</span>, promptStr);
      } else {
        appendOutput(trimmed, renderDirListing(res.node, res.parts, hasLongFlag), promptStr);
      }
      return currentParts;
    }

    if (cmd === "cd") {
      const res = resolveNode(arg || "~", currentParts);
      if (!res.node) {
        appendOutput(trimmed, <span style={{ color: theme.danger }}>bash: cd: {arg}: No such file or directory</span>, promptStr);
        return currentParts;
      }
      if (res.node.type !== "dir") {
        appendOutput(trimmed, <span style={{ color: theme.danger }}>bash: cd: {arg}: Not a directory</span>, promptStr);
        return currentParts;
      }
      setCwdParts(res.parts);
      return res.parts;
    }

    if (cmd === "less" || cmd === "more") {
      if (!arg) {
        appendOutput(trimmed, <span style={{ color: theme.warn }}>Usage: less &lt;filename&gt;</span>, promptStr);
        return currentParts;
      }
      const res = resolveNode(arg, currentParts);
      if (!res.node || res.node.type !== "file") {
        appendOutput(trimmed, <span style={{ color: theme.danger }}>{cmd}: {arg}: No such file</span>, promptStr);
        return currentParts;
      }
      setActiveModal({ kind: "less", fileName: res.node.name, content: res.node.content });
      return currentParts;
    }

    if (cmd === "cat" || cmd === "head" || cmd === "tail" || cmd === "wc") {
      if (arg.includes("*") || cmd === "head" || cmd === "tail" || cmd === "wc") {
        const out = evalTextStage(trimmed, null, currentParts);
        appendOutput(
          trimmed,
          <div className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed" style={{ color: theme.text }}>
            {renderTextWithLinks(out, theme.promptPath)}
          </div>,
          promptStr
        );
        return currentParts;
      }
      if (!arg) {
        appendOutput(trimmed, <span style={{ color: theme.warn }}>Usage: cat &lt;filename&gt;</span>, promptStr);
        return currentParts;
      }
      const res = resolveNode(arg, currentParts);
      if (!res.node) {
        appendOutput(trimmed, <span style={{ color: theme.danger }}>cat: {arg}: No such file or directory</span>, promptStr);
        return currentParts;
      }
      if (res.node.type === "dir") {
        appendOutput(trimmed, <span style={{ color: theme.warn }}>cat: {arg}: Is a directory</span>, promptStr);
        return currentParts;
      }
      const fileNode = res.node;
      if (fileNode.imageSrc) {
        appendOutput(trimmed, renderImageCard(fileNode), promptStr);
        return currentParts;
      }
      const fullPath = `~/${res.parts.join("/")}`;
      appendOutput(
        trimmed,
        <div className="p-3 rounded-lg border space-y-2 text-xs sm:text-sm" style={{ background: theme.bgDark, borderColor: theme.border, color: theme.text }}>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b" style={{ borderColor: theme.border }}>
            <span className="font-bold" style={{ color: theme.promptUser }}>{fullPath} [ro]</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => executeCommand(`less ${fullPath}`)}
                className="px-2 py-0.5 rounded border text-xs cursor-pointer"
                style={{ background: theme.bgElevated, borderColor: theme.promptUser, color: theme.promptUser }}
              >
                Pager (less)
              </button>
              <button
                onClick={() => executeCommand(`nano ${fullPath}`)}
                className="px-2 py-0.5 rounded border text-xs cursor-pointer"
                style={{ background: theme.bgElevated, borderColor: theme.promptPath, color: theme.promptPath }}
              >
                Nano (RO)
              </button>
              {fileNode.redirectUrl && (
                <a
                  href={fileNode.redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-0.5 rounded text-white text-xs font-bold inline-flex items-center gap-1"
                  style={{ background: theme.accent }}
                >
                  <span>Visit Link</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
          <div className="leading-relaxed whitespace-pre-wrap">{renderTextWithLinks(fileNode.content, theme.promptPath)}</div>
        </div>,
        promptStr
      );
      return currentParts;
    }

    if (cmd === "view" || cmd === "imgcat" || cmd === "display") {
      const targetPath = arg || "about/profile-dotmatrix.img";
      const res = resolveNode(targetPath, currentParts);
      if (!res.node || res.node.type !== "file" || !res.node.imageSrc) {
        appendOutput(
          trimmed,
          <span style={{ color: theme.warn }}>
            Usage: view about/profile-dotmatrix.img | view about/profile-headshot.jpg | view about/aws-stage-speaking.jpg | view certifications/saa-c03.png
          </span>,
          promptStr
        );
        return currentParts;
      }
      appendOutput(trimmed, renderImageCard(res.node), promptStr);
      return currentParts;
    }

    if (cmd === "nano") {
      if (!arg) {
        appendOutput(trimmed, <span style={{ color: theme.warn }}>Usage: nano &lt;existing-file&gt;</span>, promptStr);
        return currentParts;
      }
      const res = resolveNode(arg, currentParts);
      if (!res.node) {
        appendOutput(
          trimmed,
          <span style={{ color: theme.danger }}>nano: {arg}: No such file (creating/editing disabled in read-only mode)</span>,
          promptStr
        );
        return currentParts;
      }
      if (res.node.type === "dir") {
        appendOutput(trimmed, <span style={{ color: theme.danger }}>nano: {arg}: Is a directory</span>, promptStr);
        return currentParts;
      }
      if (res.node.imageSrc) {
        appendOutput(trimmed, renderImageCard(res.node), promptStr);
        return currentParts;
      }
      setActiveModal({ kind: "nano", fileName: res.node.name, content: res.node.content });
      return currentParts;
    }

    if (cmd === "open" || cmd === "redirect") {
      const key = arg.toLowerCase();
      const map: Record<string, string> = {
        github: portfolio.personal.links.github,
        linkedin: portfolio.personal.links.linkedin,
        resume: portfolio.personal.links.resume,
        email: `mailto:${portfolio.personal.email}`,
        builder: "https://builder.aws.com/community/@binodprasadjoshi?tab=articles",
        credly: "https://www.credly.com/users/binod-prasad-joshi.69a505f6/badges/credly",
        about: "/#about",
        experience: "/#experience",
        "case-studies": "/#case-studies",
        projects: "/#projects",
        services: "/#services",
        blogs: "/#blogs",
        certifications: "/#certifications",
        contact: "/#contact",
        gui: "/",
      };
      const targetUrl = map[key];
      if (targetUrl) {
        if (targetUrl.startsWith("/")) router.push(targetUrl);
        else window.open(targetUrl, "_blank", "noopener,noreferrer");
        appendOutput(trimmed, <span style={{ color: theme.promptUser }}>Redirecting to {targetUrl}...</span>, promptStr);
      } else {
        appendOutput(
          trimmed,
          <span style={{ color: theme.warn }}>Targets: {Object.keys(map).join(", ")}</span>,
          promptStr
        );
      }
      return currentParts;
    }

    if (cmd === "grep") {
      const out = evalTextStage(trimmed, null, currentParts);
      appendOutput(
        trimmed,
        <pre className="text-xs whitespace-pre-wrap" style={{ color: theme.text }}>
          {out}
        </pre>,
        promptStr
      );
      return currentParts;
    }

    appendOutput(
      trimmed,
      <span style={{ color: theme.danger }}>
        bash: {cmd}: command not found. Type <b style={{ color: theme.promptUser }}>help</b> to see all commands.
      </span>,
      promptStr
    );
    return currentParts;
  };

  const executeCommand = (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;
    setHistory((prev) => [...prev, trimmed]);
    setHistIdx(-1);

    const chain = trimmed.split("&&");
    let nextParts = [...cwdParts];
    for (const part of chain) {
      nextParts = runSingleCommand(part, nextParts);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
      e.preventDefault();
      appendOutput(`${input}^C`, <span style={{ color: theme.muted }}>^C</span>, cwdDisplay);
      setInput("");
      return;
    }
    if (e.key === "Enter") {
      const val = input;
      setInput("");
      executeCommand(val);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      if (histIdx >= history.length - 1) {
        setHistIdx(-1);
        setInput("");
      } else {
        const idx = histIdx + 1;
        setHistIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const tokens = input.split(/\s+/);
      if (tokens.length === 1) {
        const matches = COMMAND_LIST.filter((c) => c.startsWith(tokens[0]));
        if (matches.length === 1) {
          setInput(matches[0] + " ");
        } else if (matches.length > 1) {
          setInput(longestCommonPrefix(matches));
          appendOutput(input, <span style={{ color: theme.promptPath }}>{matches.join("   ")}</span>, cwdDisplay);
        }
      } else if (currentDir) {
        const last = tokens[tokens.length - 1];
        const slashIdx = last.lastIndexOf("/");
        const dirPrefix = slashIdx >= 0 ? last.slice(0, slashIdx + 1) : "";
        const partial = slashIdx >= 0 ? last.slice(slashIdx + 1) : last;
        const targetDirRes = dirPrefix ? resolveNode(dirPrefix.slice(0, -1) || "~") : { node: currentDir, parts: cwdParts };

        if (targetDirRes.node && targetDirRes.node.type === "dir") {
          const dirObj = targetDirRes.node;
          const matches = Object.keys(dirObj.children).filter((k) => k.startsWith(partial));
          if (matches.length === 1) {
            const node = dirObj.children[matches[0]];
            tokens[tokens.length - 1] = dirPrefix + matches[0] + (node.type === "dir" ? "/" : "");
            setInput(tokens.join(" "));
          } else if (matches.length > 1) {
            tokens[tokens.length - 1] = dirPrefix + longestCommonPrefix(matches);
            setInput(tokens.join(" "));
            appendOutput(input, <span style={{ color: theme.promptUser }}>{matches.join("   ")}</span>, cwdDisplay);
          }
        }
      }
    }
  };

  return (
    <div
      className="w-screen h-screen font-mono flex flex-col overflow-hidden transition-colors duration-200"
      style={{ background: theme.bg, color: theme.text }}
      onClick={() => !activeModal && inputRef.current?.focus()}
    >
      {/* Full-Screen Window Title Bar */}
      <div
        className="px-4 py-2 flex items-center justify-between border-b border-[#1e1d1b] select-none shrink-0"
        style={{ background: theme.titleGrad }}
      >
        <div className="flex items-center gap-3 text-xs" style={{ color: theme.text }}>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <TerminalIcon className="w-4 h-4" style={{ color: theme.promptUser }} />
            <span className="hidden sm:inline">{theme.label}</span>
          </span>
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px]"
            style={{ background: theme.bgDark, borderColor: theme.border, color: theme.muted }}
          >
            <Lock className="w-2.5 h-2.5" style={{ color: theme.promptUser }} />
            <span>READ-ONLY FS</span>
          </span>
        </div>

        <div className="text-xs sm:text-sm font-sans font-semibold truncate px-2" style={{ color: theme.text }}>
          binod@linux-world: {cwdDisplay}
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#3c3b37] hover:bg-[#555753] border border-[#6a6863] text-xs font-sans font-medium text-[#eeeeec]"
            title="Switch to GUI Portfolio"
          >
            <LayoutGrid className="w-3 h-3" style={{ color: theme.promptUser }} />
            <span className="hidden sm:inline">GUI Mode</span>
          </Link>
          <Link
            href="/"
            title="Close Terminal & Return to GUI"
            className="w-4 h-4 rounded-full text-white flex items-center justify-center hover:opacity-90"
            style={{ background: theme.accent }}
          >
            <X className="w-2.5 h-2.5" />
          </Link>
        </div>
      </div>

      {/* Modal Views: Nano / Less / Htop OR Active Terminal Session */}
      {activeModal?.kind === "nano" ? (
        <NanoViewer
          fileName={activeModal.fileName}
          content={activeModal.content}
          theme={theme}
          onExit={() => {
            setActiveModal(null);
            setTimeout(() => inputRef.current?.focus(), 20);
          }}
        />
      ) : activeModal?.kind === "less" ? (
        <LessPager
          fileName={activeModal.fileName}
          content={activeModal.content}
          theme={theme}
          onExit={() => {
            setActiveModal(null);
            setTimeout(() => inputRef.current?.focus(), 20);
          }}
        />
      ) : activeModal?.kind === "htop" ? (
        <HtopMonitor
          theme={theme}
          onExit={() => {
            setActiveModal(null);
            setTimeout(() => inputRef.current?.focus(), 20);
          }}
        />
      ) : (
        <>
          <div className="flex-1 p-4 sm:p-5 space-y-4 overflow-y-auto text-xs sm:text-sm min-h-0">
            {entries.map((entry) => (
              <div key={entry.id} className="space-y-1.5">
                {entry.command && (
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="font-bold" style={{ color: theme.promptUser }}>binod@linux-world</span>
                    <span>:</span>
                    <span className="font-bold" style={{ color: theme.promptPath }}>{entry.promptPath}</span>
                    <span>$ {entry.command}</span>
                  </div>
                )}
                <div className="pl-1 sm:pl-2">{entry.body}</div>
              </div>
            ))}
            <div ref={outputEndRef} />
          </div>

          <div
            className="px-4 sm:px-5 py-3 border-t flex items-center gap-1.5 text-xs sm:text-sm shrink-0"
            style={{ background: theme.bgDark, borderColor: theme.border }}
          >
            <span className="font-bold shrink-0" style={{ color: theme.promptUser }}>binod@linux-world</span>
            <span className="shrink-0">:</span>
            <span className="font-bold shrink-0" style={{ color: theme.promptPath }}>{cwdDisplay}</span>
            <span className="shrink-0">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="try ls -la, aws sts get-caller-identity, kubectl get pods, htop, cat blogs/all-blogs.txt | grep Bedrock..."
              className="flex-1 bg-transparent outline-none font-mono"
              style={{ color: theme.text }}
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </>
      )}
    </div>
  );
}
