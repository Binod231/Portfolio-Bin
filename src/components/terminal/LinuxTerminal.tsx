"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createInitialFs, FsNode } from "@/data/linuxFs";
import { portfolio } from "@/data/portfolio";
import DotMatrixPortrait from "./DotMatrixPortrait";
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
  "nano",
  "view",
  "imgcat",
  "open",
  "grep",
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

function renderTextWithLinks(text: string): React.ReactNode {
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
              className="text-sky-400 underline decoration-sky-500/50 hover:text-[#8ae234] inline-flex items-center gap-0.5 break-all"
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

  // Read-only Nano viewer state
  const [nanoState, setNanoState] = useState<{
    fileName: string;
    content: string;
    notice: string;
    searchQuery: string;
    showSearch: boolean;
  } | null>(null);

  const outputEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const nanoRef = useRef<HTMLTextAreaElement | null>(null);
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

  // Global keyboard shortcuts for nano (Esc / Ctrl+X / Ctrl+O) and terminal (Ctrl+L)
  useEffect(() => {
    const onGlobalKey = (e: KeyboardEvent) => {
      if (nanoState) {
        if (e.key === "Escape" || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "x")) {
          e.preventDefault();
          setNanoState(null);
          setTimeout(() => inputRef.current?.focus(), 20);
        } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "o") {
          e.preventDefault();
          setNanoState((prev) =>
            prev ? { ...prev, notice: "[ Error: Read-only file system (chmod 444) — edits disabled ]" } : null
          );
        } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "w") {
          e.preventDefault();
          setNanoState((prev) => (prev ? { ...prev, showSearch: !prev.showSearch } : null));
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
        e.preventDefault();
        setEntries([]);
      }
    };
    window.addEventListener("keydown", onGlobalKey);
    return () => window.removeEventListener("keydown", onGlobalKey);
  }, [nanoState]);

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
          <div className="text-[#d3d7cf]">total {keys.length * 4}</div>
          {keys.map((key) => {
            const item = dirNode.children[key];
            const fullPath = dirParts.length ? `~/${dirParts.join("/")}/${key}` : `~/${key}`;
            const perms = item.type === "dir" ? "dr-xr-xr-x" : "-r--r--r--";
            const size = item.type === "dir" ? "4096" : String(item.content.length).padStart(4, " ");
            return (
              <div key={key} className="flex flex-wrap items-center gap-2 font-mono">
                <span className="text-[#ad7fa8]">{perms}</span>
                <span className="text-[#d3d7cf]">1 binod devops {size} Nov 25 11:40</span>
                {item.type === "dir" ? (
                  <button
                    onClick={() => executeCommand(`cd ${fullPath} && ls`)}
                    className="text-[#729fcf] font-bold hover:underline cursor-pointer"
                  >
                    {key}/
                  </button>
                ) : item.imageSrc ? (
                  <button
                    onClick={() => executeCommand(`view ${fullPath}`)}
                    className="text-[#ffad8e] font-bold hover:underline cursor-pointer"
                  >
                    {key}
                  </button>
                ) : (
                  <button
                    onClick={() => executeCommand(`cat ${fullPath}`)}
                    className="text-[#8ae234] hover:underline cursor-pointer"
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
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {keys.map((key) => {
            const item = dirNode.children[key];
            const fullPath = dirParts.length ? `~/${dirParts.join("/")}/${key}` : `~/${key}`;
            if (item.type === "dir") {
              return (
                <button
                  key={key}
                  onClick={() => executeCommand(`cd ${fullPath} && ls`)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#3d1430] hover:bg-[#561d44] border border-[#6e2858] text-[#729fcf] font-bold text-xs cursor-pointer transition-colors"
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
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2a0c20] hover:bg-[#421333] border border-[#e95420]/50 text-[#ffad8e] text-xs cursor-pointer transition-colors"
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
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#22071a] hover:bg-[#38102c] border border-[#5c244b] text-[#8ae234] text-xs cursor-pointer transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{key}</span>
              </button>
            );
          })}
        </div>
        {dirNode.guiSection && (
          <div className="pt-1">
            <Link
              href={dirNode.guiSection}
              className="inline-flex items-center gap-1 text-xs text-sky-400 hover:text-[#8ae234] underline"
            >
              <span>Redirect to GUI section ({dirNode.guiSection})</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>
    );
  };

  const renderImageCard = (node: FsNode & { type: "file" }) => (
    <div className="mt-2 p-3 rounded-lg bg-[#1d0515] border border-[#5c244b] inline-flex flex-col sm:flex-row items-center gap-4">
      {node.isDotMatrix ? (
        <DotMatrixPortrait src={node.imageSrc || "/profile-headshot.jpg"} size={210} />
      ) : (
        <img
          src={node.imageSrc}
          alt={node.name}
          className="max-w-[240px] max-h-[240px] rounded-lg border border-[#8ae234]/50 object-cover"
        />
      )}
      <div className="text-xs space-y-1.5 text-[#eeeeec]">
        <div className="text-[#8ae234] font-bold">[IMAGE VIEWER // {node.name}]</div>
        <div className="text-[#d3d7cf] whitespace-pre-wrap">{renderTextWithLinks(node.content)}</div>
        <div className="flex flex-wrap gap-2 pt-1">
          {node.redirectUrl && (
            <a
              href={node.redirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded bg-[#e95420] text-white font-bold inline-flex items-center gap-1 hover:opacity-90"
            >
              <span>Open Verification Link</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
          {node.guiSection && (
            <Link
              href={node.guiSection}
              className="px-2.5 py-1 rounded bg-[#3d1430] border border-[#729fcf] text-[#729fcf] font-bold inline-flex items-center gap-1 hover:bg-[#729fcf] hover:text-[#1a0514]"
            >
              <span>Open in Portfolio GUI</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  const runSingleCommand = (rawCmd: string, currentParts: string[]): string[] => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return currentParts;

    const promptStr = currentParts.length === 0 ? "~" : `~/${currentParts.join("/")}`;

    // Block output redirection (`>` / `>>`) in read-only filesystem
    if (/[^a-zA-Z0-9](>|>>)\s*\S+/.test(trimmed)) {
      appendOutput(
        trimmed,
        <span className="text-red-400">bash: Read-only file system (writes and redirections are disabled)</span>,
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

    if (cmd === "sudo") {
      appendOutput(
        trimmed,
        <span className="text-red-400">
          [sudo] password for binod: visitor is not in the sudoers file. This incident will be reported.
        </span>,
        promptStr
      );
      return currentParts;
    }

    if (cmd === "vi" || cmd === "vim") {
      if (!arg) {
        appendOutput(trimmed, <span className="text-amber-400">Usage: nano &lt;file&gt; (Read-only viewer)</span>, promptStr);
        return currentParts;
      }
      return runSingleCommand(`nano ${arg}`, currentParts);
    }

    if (READONLY_CMDS.has(cmd)) {
      appendOutput(
        trimmed,
        <span className="text-red-400">
          {cmd}: cannot modify '{arg || "."}': Read-only file system (ro)
        </span>,
        promptStr
      );
      return currentParts;
    }

    if (cmd === "welcome") {
      appendOutput(
        "",
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 py-1">
          <div className="space-y-2 text-xs sm:text-sm leading-snug">
            <pre className="text-[#8ae234] font-bold whitespace-pre overflow-x-auto leading-tight text-[10px] sm:text-xs">{` ____  ___ _   _  ___  ____    _     ___ _   _ _   ___  __
| __ )|_ _| \\ | |/ _ \\|  _ \\  | |   |_ _| \\ | | | | \\ \\/ /
|  _ \\ | ||  \\| | | | | | | | | |    | ||  \\| | | | |\\  / 
| |_) || || |\\  | |_| | |_| | | |___ | || |\\  | |_| |/  \\ 
|____/|___|_| \\_|\\___/|____/  |_____|___|_| \\_|\\___//_/\\_\\`}</pre>

            <pre className="text-[#d3d7cf] whitespace-pre-wrap text-xs sm:text-[13px] pt-1">{`       =[ binod-linux-world v2026.11-devops-ro         ]
+ -- --=[ ${portfolio.experience.length} experiences  - ${portfolio.experience.filter((e) => e.caseStudy).length} case-studies - ${portfolio.projects.length} projects ]
+ -- --=[ ${portfolio.services.length} services     - ${portfolio.blogs.length} blogs       - ${portfolio.certifications.length} certs    ]
+ -- --=[ 2x AWS Certified | AWS Community Builder 2026 ]
+ -- --=[ Kathmandu, Nepal (UTC+5:45) | Read-Only Shell ]`}</pre>

            <div className="text-[#eeeeec] pt-1">
              Welcome to <span className="text-[#8ae234] font-bold">Binod Linux World</span>. Type{" "}
              <button
                onClick={() => executeCommand("help")}
                className="text-[#8ae234] underline cursor-pointer font-bold"
              >
                help
              </button>
              ,{" "}
              <button
                onClick={() => executeCommand("tree")}
                className="text-[#729fcf] underline cursor-pointer font-bold"
              >
                tree
              </button>
              ,{" "}
              <button
                onClick={() => executeCommand("ls -la")}
                className="text-[#8ae234] underline cursor-pointer font-bold"
              >
                ls -la
              </button>
              , or{" "}
              <button
                onClick={() => executeCommand("cat contact/links.txt")}
                className="text-[#ffad8e] underline cursor-pointer font-bold"
              >
                cat contact/links.txt
              </button>{" "}
              (or <Link href="/" className="text-[#e95420] underline font-bold">exit</Link> for GUI).
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 self-start lg:self-center">
            <DotMatrixPortrait src="/profile-headshot.jpg" size={172} />
            <span className="text-[10px] text-[#ad7fa8]">[dot-matrix // binod231]</span>
          </div>
        </div>,
        ""
      );
      return currentParts;
    }

    if (cmd === "help" || cmd === "man") {
      appendOutput(
        trimmed,
        <pre className="text-xs sm:text-sm text-[#eeeeec] whitespace-pre-wrap leading-relaxed">{`BINOD LINUX WORLD — REAL LINUX SHELL COMMANDS (READ-ONLY)
---------------------------------------------------------------------------
  ls [-la] [dir]   List files & directories (use 'ls -la' for permissions)
  ll               Alias for 'ls -la'
  cd <dir|..|~>    Change directory (e.g. 'cd experience', 'cd ..')
  pwd              Print current working directory
  tree             Show full /home/binod directory tree
  cat <file>       Print full file contents with clickable redirect links
  head / tail      Show first or last 10 lines of a file
  wc <file>        Print line, word, and byte counts
  nano <file>      Open GNU nano in Read-Only mode (^W search, ^X exit)
  view <image>     Render images & 3D dot-matrix portrait inline (alias: imgcat)
  open <target>    Redirect to GUI section or external link (github, linkedin, resume, blogs)
  grep <keyword>   Search across all portfolio files
  whoami / id      Display current user identity & groups
  uname / uptime   Show Linux kernel & cluster SLA uptime
  df -h / free -h  Show mounted read-only filesystem & memory status
  ps aux / env     Show running DevOps services & environment variables
  neofetch         Display operator profile + dot-matrix portrait
  clear / Ctrl+L   Clear terminal output
  exit             Close shell and return to GUI Portfolio`}</pre>,
        promptStr
      );
      return currentParts;
    }

    if (cmd === "pwd") {
      const abs = currentParts.length === 0 ? "/home/binod" : `/home/binod/${currentParts.join("/")}`;
      appendOutput(trimmed, <span className="text-[#eeeeec]">{abs}</span>, promptStr);
      return currentParts;
    }

    if (cmd === "whoami") {
      appendOutput(trimmed, <span className="text-[#8ae234]">binod</span>, promptStr);
      return currentParts;
    }

    if (cmd === "id") {
      appendOutput(
        trimmed,
        <span className="text-[#eeeeec]">uid=1000(binod) gid=1000(devops) groups=1000(devops),27(aws-cb),999(docker-ro)</span>,
        promptStr
      );
      return currentParts;
    }

    if (cmd === "hostname") {
      appendOutput(trimmed, <span className="text-[#eeeeec]">binod-linux-world.kathmandu.np</span>, promptStr);
      return currentParts;
    }

    if (cmd === "uname") {
      appendOutput(
        trimmed,
        <span className="text-[#eeeeec]">Linux binod-linux-world 6.8.0-aws-devops #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux</span>,
        promptStr
      );
      return currentParts;
    }

    if (cmd === "uptime") {
      appendOutput(
        trimmed,
        <span className="text-[#eeeeec]"> 11:41:20 up 365 days, 23:59,  1 user,  load average: 0.12, 0.09, 0.08 (99.9% SLA)</span>,
        promptStr
      );
      return currentParts;
    }

    if (cmd === "df") {
      appendOutput(
        trimmed,
        <pre className="text-xs text-[#eeeeec] whitespace-pre-wrap">{`Filesystem      Size  Used Avail Use% Mounted on
/dev/nvme0n1p1   50G  4.2G   46G   9% /home/binod (ro,noexec)`}</pre>,
        promptStr
      );
      return currentParts;
    }

    if (cmd === "free") {
      appendOutput(
        trimmed,
        <pre className="text-xs text-[#eeeeec] whitespace-pre-wrap">{`               total        used        free      shared  buff/cache   available
Mem:            16Gi       3.1Gi       9.8Gi       128Mi       3.1Gi        12Gi
Swap:          2.0Gi          0B       2.0Gi`}</pre>,
        promptStr
      );
      return currentParts;
    }

    if (cmd === "ps") {
      appendOutput(
        trimmed,
        <pre className="text-xs text-[#eeeeec] whitespace-pre-wrap">{`USER       PID %CPU %MEM COMMAND
root         1  0.0  0.1 /sbin/init
binod      104  0.4  1.2 ecs-fargate-agent --region us-east-1
binod      218  0.2  0.9 prometheus-node-exporter --multi-dc
binod      305  0.3  1.8 odoo-erp-worker --workers=8 --db=postgres
binod      412  0.1  0.5 fastapi-uvicorn --workers 4 --jwks-redis-cache`}</pre>,
        promptStr
      );
      return currentParts;
    }

    if (cmd === "env") {
      appendOutput(
        trimmed,
        <pre className="text-xs text-[#eeeeec] whitespace-pre-wrap">{`USER=binod
HOME=/home/binod
SHELL=/bin/bash
TERM=xterm-256color
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
        <div className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded bg-[#22071a] border border-[#5c244b]">
          <DotMatrixPortrait src="/profile-headshot.jpg" size={150} />
          <pre className="text-xs text-[#eeeeec] whitespace-pre-wrap">{`binod@linux-world
-----------------
OS       : Binod Linux World (Ubuntu 24.04 LTS)
Host     : Glovion Consulting Private Limited
Location : Kathmandu, Nepal (UTC+5:45)
Shell    : bash 5.2 (Read-Only FS)
Certs    : 2x AWS Certified (SAA-C03, CLF-C02)
Award    : AWS Community Builder (Dev Tools 2026)
Contents : 8 Dirs | ${portfolio.blogs.length} Blogs | ${portfolio.projects.length} Projects`}</pre>
        </div>,
        promptStr
      );
      return currentParts;
    }

    if (cmd === "date") {
      appendOutput(trimmed, <span className="text-[#eeeeec]">{new Date().toString()}</span>, promptStr);
      return currentParts;
    }

    if (cmd === "echo") {
      appendOutput(trimmed, <span className="text-[#eeeeec]">{arg}</span>, promptStr);
      return currentParts;
    }

    if (cmd === "history") {
      appendOutput(
        trimmed,
        <pre className="text-xs text-[#d3d7cf] whitespace-pre-wrap">
          {history.map((h, i) => `  ${i + 1}  ${h}`).join("\n") || "(empty)"}
        </pre>,
        promptStr
      );
      return currentParts;
    }

    if (cmd === "tree") {
      const target = arg ? resolveNode(arg, currentParts) : { node: currentDir || fsRoot, parts: currentParts };
      if (!target.node) {
        appendOutput(trimmed, <span className="text-red-400">tree: {arg}: No such directory</span>, promptStr);
      } else {
        appendOutput(
          trimmed,
          <pre className="text-xs text-[#8ae234] whitespace-pre-wrap leading-relaxed">
            {buildTreeLines(target.node).join("\n")}
          </pre>,
          promptStr
        );
      }
      return currentParts;
    }

    if (cmd === "ls" || cmd === "ll" || cmd === "dir") {
      const hasLongFlag = cmd === "ll" || rest.some((r) => r.startsWith("-") && r.includes("l"));
      const cleanArg = rest.filter((r) => !r.startsWith("-")).join(" ");
      const res = cleanArg
        ? resolveNode(cleanArg, currentParts)
        : resolveNode("~/" + currentParts.join("/"), []);
      if (!res.node) {
        appendOutput(trimmed, <span className="text-red-400">ls: cannot access '{cleanArg}': No such file or directory</span>, promptStr);
      } else if (res.node.type === "file") {
        appendOutput(trimmed, <span className="text-[#8ae234]">{res.node.name}</span>, promptStr);
      } else {
        appendOutput(trimmed, renderDirListing(res.node, res.parts, hasLongFlag), promptStr);
      }
      return currentParts;
    }

    if (cmd === "cd") {
      const res = resolveNode(arg || "~", currentParts);
      if (!res.node) {
        appendOutput(trimmed, <span className="text-red-400">bash: cd: {arg}: No such file or directory</span>, promptStr);
        return currentParts;
      }
      if (res.node.type !== "dir") {
        appendOutput(trimmed, <span className="text-red-400">bash: cd: {arg}: Not a directory</span>, promptStr);
        return currentParts;
      }
      setCwdParts(res.parts);
      return res.parts;
    }

    if (cmd === "cat" || cmd === "head" || cmd === "tail" || cmd === "wc") {
      if (!arg) {
        appendOutput(trimmed, <span className="text-amber-400">Usage: {cmd} &lt;filename&gt;</span>, promptStr);
        return currentParts;
      }
      const res = resolveNode(arg, currentParts);
      if (!res.node) {
        appendOutput(trimmed, <span className="text-red-400">{cmd}: {arg}: No such file or directory</span>, promptStr);
        return currentParts;
      }
      if (res.node.type === "dir") {
        appendOutput(trimmed, <span className="text-amber-400">{cmd}: {arg}: Is a directory</span>, promptStr);
        return currentParts;
      }
      const fileNode = res.node;
      if (cmd === "wc") {
        const lines = fileNode.content.split("\n").length;
        const words = fileNode.content.trim().split(/\s+/).filter(Boolean).length;
        const bytes = fileNode.content.length;
        appendOutput(trimmed, <span className="text-[#eeeeec]">{` ${lines}  ${words}  ${bytes} ${fileNode.name}`}</span>, promptStr);
        return currentParts;
      }
      if (cmd === "head" || cmd === "tail") {
        const lines = fileNode.content.split("\n");
        const slice = cmd === "head" ? lines.slice(0, 10) : lines.slice(-10);
        appendOutput(
          trimmed,
          <div className="text-xs sm:text-sm text-[#eeeeec] whitespace-pre-wrap">{renderTextWithLinks(slice.join("\n"))}</div>,
          promptStr
        );
        return currentParts;
      }
      if (fileNode.imageSrc) {
        appendOutput(trimmed, renderImageCard(fileNode), promptStr);
        return currentParts;
      }
      const fullPath = `~/${res.parts.join("/")}`;
      appendOutput(
        trimmed,
        <div className="p-3 rounded-lg bg-[#22071a] border border-[#5c244b] space-y-2 text-xs sm:text-sm text-[#eeeeec]">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-[#48183a]">
            <span className="text-[#8ae234] font-bold">{fullPath} [ro]</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => executeCommand(`nano ${fullPath}`)}
                className="px-2 py-0.5 rounded bg-[#3d1430] border border-[#729fcf] text-[#729fcf] text-xs cursor-pointer hover:bg-[#729fcf] hover:text-[#1a0514]"
              >
                Inspect in nano (RO)
              </button>
              {fileNode.redirectUrl && (
                <a
                  href={fileNode.redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-0.5 rounded bg-[#e95420] text-white text-xs font-bold inline-flex items-center gap-1"
                >
                  <span>Visit Link</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
              {fileNode.guiSection && (
                <Link
                  href={fileNode.guiSection}
                  className="px-2 py-0.5 rounded bg-[#8ae234]/20 border border-[#8ae234] text-[#8ae234] text-xs inline-flex items-center gap-1"
                >
                  <span>GUI View</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
          <div className="leading-relaxed whitespace-pre-wrap">{renderTextWithLinks(fileNode.content)}</div>
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
          <span className="text-amber-400">
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
        appendOutput(trimmed, <span className="text-amber-400">Usage: nano &lt;existing-file&gt;</span>, promptStr);
        return currentParts;
      }
      const res = resolveNode(arg, currentParts);
      if (!res.node) {
        appendOutput(
          trimmed,
          <span className="text-red-400">nano: {arg}: No such file (creating/editing files disabled in read-only mode)</span>,
          promptStr
        );
        return currentParts;
      }
      if (res.node.type === "dir") {
        appendOutput(trimmed, <span className="text-red-400">nano: {arg}: Is a directory</span>, promptStr);
        return currentParts;
      }
      if (res.node.imageSrc) {
        appendOutput(trimmed, renderImageCard(res.node), promptStr);
        return currentParts;
      }
      setNanoState({
        fileName: res.node.name,
        content: res.node.content,
        notice: "[ File is READ-ONLY (-r--r--r--). Editing is disabled. Press ^X or Esc to exit. ]",
        searchQuery: "",
        showSearch: false,
      });
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
        if (targetUrl.startsWith("/")) {
          router.push(targetUrl);
        } else {
          window.open(targetUrl, "_blank", "noopener,noreferrer");
        }
        appendOutput(trimmed, <span className="text-[#8ae234]">Redirecting to {targetUrl}...</span>, promptStr);
      } else {
        appendOutput(
          trimmed,
          <span className="text-amber-400">
            Targets: github, linkedin, resume, builder, credly, email, about, experience, case-studies, projects, services, blogs, certifications, contact, gui
          </span>,
          promptStr
        );
      }
      return currentParts;
    }

    if (cmd === "grep") {
      if (!arg) {
        appendOutput(trimmed, <span className="text-amber-400">Usage: grep &lt;keyword&gt;</span>, promptStr);
        return currentParts;
      }
      const q = arg.toLowerCase();
      const hits: { path: string; line: string }[] = [];
      const walk = (n: FsNode, p: string[]) => {
        if (n.type === "file") {
          n.content.split("\n").forEach((ln) => {
            if (ln.toLowerCase().includes(q)) {
              hits.push({ path: `~/${p.join("/")}`, line: ln.trim() });
            }
          });
        } else {
          Object.entries(n.children).forEach(([k, ch]) => walk(ch, [...p, k]));
        }
      };
      walk(fsRoot, []);
      appendOutput(
        trimmed,
        hits.length ? (
          <div className="space-y-1 text-xs">
            {hits.slice(0, 20).map((h, idx) => (
              <div key={idx}>
                <button
                  onClick={() => executeCommand(`cat ${h.path}`)}
                  className="text-[#8ae234] hover:underline font-bold cursor-pointer"
                >
                  {h.path}
                </button>
                <span className="text-[#d3d7cf]">: {h.line}</span>
              </div>
            ))}
          </div>
        ) : (
          <span className="text-neutral-400">No matches for "{arg}"</span>
        ),
        promptStr
      );
      return currentParts;
    }

    appendOutput(
      trimmed,
      <span className="text-red-400">
        bash: {cmd}: command not found. Type <b className="text-[#8ae234]">help</b> to see all commands.
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
      appendOutput(`${input}^C`, <span className="text-[#ad7fa8]">^C</span>, cwdDisplay);
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
        const match = COMMAND_LIST.find((c) => c.startsWith(tokens[0]));
        if (match) setInput(match + " ");
      } else if (currentDir) {
        const last = tokens[tokens.length - 1];
        const match = Object.keys(currentDir.children).find((k) => k.startsWith(last));
        if (match) {
          tokens[tokens.length - 1] = match;
          setInput(tokens.join(" "));
        }
      }
    }
  };

  const runNanoSearch = () => {
    if (!nanoState || !nanoState.searchQuery || !nanoRef.current) return;
    const idx = nanoState.content.toLowerCase().indexOf(nanoState.searchQuery.toLowerCase());
    if (idx === -1) {
      setNanoState({ ...nanoState, notice: `[ "${nanoState.searchQuery}" not found ]` });
      return;
    }
    nanoRef.current.focus();
    nanoRef.current.setSelectionRange(idx, idx + nanoState.searchQuery.length);
    setNanoState({ ...nanoState, notice: `[ Found match for "${nanoState.searchQuery}" ]` });
  };

  return (
    <div
      className="w-screen h-screen bg-[#300a24] font-mono text-[#eeeeec] flex flex-col overflow-hidden"
      onClick={() => !nanoState && inputRef.current?.focus()}
    >
      {/* Full-Screen Ubuntu GNOME Window Bar */}
      <div className="bg-gradient-to-b from-[#484642] to-[#2c2b29] px-4 py-2 flex items-center justify-between border-b border-[#1e1d1b] select-none shrink-0">
        <div className="flex items-center gap-3 text-xs text-[#d3d7cf]">
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <TerminalIcon className="w-4 h-4 text-[#8ae234]" />
            <span className="hidden sm:inline">Ubuntu 24.04 LTS</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#22071a] border border-[#5c244b] text-[10px] text-[#ad7fa8]">
            <Lock className="w-2.5 h-2.5 text-[#8ae234]" />
            <span>READ-ONLY FS</span>
          </span>
        </div>

        <div className="text-xs sm:text-sm font-sans font-semibold text-[#eeeeec] truncate px-2">
          binod@linux-world: {cwdDisplay}
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#3c3b37] hover:bg-[#555753] border border-[#6a6863] text-xs font-sans font-medium text-[#eeeeec]"
            title="Switch to GUI Portfolio"
          >
            <LayoutGrid className="w-3 h-3 text-[#8ae234]" />
            <span className="hidden sm:inline">GUI Mode</span>
          </Link>
          <Link
            href="/"
            title="Close Terminal & Return to GUI"
            className="w-4 h-4 rounded-full bg-[#e95420] text-white flex items-center justify-center hover:opacity-90"
          >
            <X className="w-2.5 h-2.5" />
          </Link>
        </div>
      </div>

      {/* Read-Only GNU Nano Viewer OR Full-Screen Terminal Session */}
      {nanoState ? (
        <div className="flex-1 flex flex-col bg-[#1b0514] text-xs sm:text-sm min-h-0">
          <div className="bg-[#eeeeec] text-[#1b0514] px-4 py-1 flex items-center justify-between font-bold shrink-0">
            <span>GNU nano 7.2</span>
            <span>File: {nanoState.fileName}</span>
            <span>[ Read-Only ]</span>
          </div>

          {nanoState.showSearch && (
            <div className="bg-[#3d1430] px-4 py-1.5 flex items-center gap-2 border-b border-[#5c244b] shrink-0">
              <span className="text-[#8ae234]">Search:</span>
              <input
                type="text"
                value={nanoState.searchQuery}
                onChange={(e) => setNanoState({ ...nanoState, searchQuery: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && runNanoSearch()}
                placeholder="find text & press Enter..."
                className="bg-[#22071a] px-2 py-0.5 rounded text-[#eeeeec] outline-none border border-[#5c244b] flex-1 max-w-xs"
                autoFocus
              />
              <button
                onClick={runNanoSearch}
                className="px-2.5 py-0.5 rounded bg-[#8ae234] text-[#1a0514] font-bold cursor-pointer text-xs"
              >
                Find
              </button>
            </div>
          )}

          <textarea
            ref={nanoRef}
            value={nanoState.content}
            readOnly
            onKeyDown={(e) => {
              if (!e.ctrlKey && !e.metaKey && e.key.length === 1) {
                setNanoState((prev) =>
                  prev
                    ? { ...prev, notice: "[ Error: Read-only file system — editing is disabled ]" }
                    : null
                );
              }
            }}
            className="flex-1 w-full bg-[#1b0514] text-[#eeeeec] p-5 outline-none resize-none font-mono leading-relaxed min-h-0"
            spellCheck={false}
          />

          {nanoState.notice && (
            <div className="bg-[#eeeeec] text-[#1b0514] text-center py-0.5 font-bold shrink-0">
              {nanoState.notice}
            </div>
          )}

          <div className="bg-[#2c2b29] px-4 py-2 flex flex-wrap items-center gap-3 border-t border-[#4c4a46] text-xs shrink-0">
            <button
              onClick={() =>
                setNanoState({
                  ...nanoState,
                  notice: "[ Error: Read-only file system (chmod 444) — write disabled ]",
                })
              }
              className="px-2.5 py-1 rounded bg-[#3c3b37] border border-[#555753] text-[#ad7fa8] cursor-not-allowed"
            >
              ^O Write Out (Locked)
            </button>
            <button
              onClick={() =>
                setNanoState({ ...nanoState, showSearch: !nanoState.showSearch })
              }
              className="px-2.5 py-1 rounded bg-[#3d1430] border border-[#729fcf] text-[#729fcf] font-bold cursor-pointer"
            >
              ^W Where Is (Search)
            </button>
            <button
              onClick={() => {
                setNanoState(null);
                setTimeout(() => inputRef.current?.focus(), 20);
              }}
              className="px-2.5 py-1 rounded bg-[#e95420] text-white font-bold cursor-pointer ml-auto"
            >
              ^X Exit nano
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Full-Height Scrollable Terminal Output */}
          <div className="flex-1 p-4 sm:p-5 space-y-4 overflow-y-auto text-xs sm:text-sm min-h-0">
            {entries.map((entry) => (
              <div key={entry.id} className="space-y-1.5">
                {entry.command && (
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-[#8ae234] font-bold">binod@linux-world</span>
                    <span className="text-[#eeeeec]">:</span>
                    <span className="text-[#729fcf] font-bold">{entry.promptPath}</span>
                    <span className="text-[#eeeeec]">$ {entry.command}</span>
                  </div>
                )}
                <div className="pl-1 sm:pl-2">{entry.body}</div>
              </div>
            ))}
            <div ref={outputEndRef} />
          </div>

          {/* Active Bottom Terminal Prompt */}
          <div className="bg-[#22071a] px-4 sm:px-5 py-3 border-t border-[#4c1a3d] flex items-center gap-1.5 text-xs sm:text-sm shrink-0">
            <span className="text-[#8ae234] font-bold shrink-0">binod@linux-world</span>
            <span className="text-[#eeeeec] shrink-0">:</span>
            <span className="text-[#729fcf] font-bold shrink-0">{cwdDisplay}</span>
            <span className="text-[#eeeeec] shrink-0">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type Linux command (ls -la, cd, cat, nano, view, tree, help)..."
              className="flex-1 bg-transparent outline-none text-[#eeeeec] placeholder:text-[#ad7fa8]/60 font-mono"
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
