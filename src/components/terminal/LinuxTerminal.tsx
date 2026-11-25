"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createInitialFs, FsNode } from "@/data/linuxFs";
import { portfolio } from "@/data/portfolio";
import DotMatrixPortrait from "./DotMatrixPortrait";
import { ArrowUpRight, Folder, FileText, Image as ImageIcon, Terminal as TerminalIcon, X } from "lucide-react";

type OutputEntry = {
  id: number;
  promptPath: string;
  command: string;
  body: React.ReactNode;
};

const QUICK_DIRS = [
  "~",
  "about",
  "experience",
  "case-studies",
  "projects",
  "services",
  "blogs",
  "certifications",
  "skills",
  "contact",
];

const COMMAND_LIST = [
  "help",
  "ls",
  "cd",
  "pwd",
  "cat",
  "nano",
  "view",
  "imgcat",
  "tree",
  "open",
  "grep",
  "whoami",
  "neofetch",
  "clear",
  "exit",
];

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
  const [fsRoot, setFsRoot] = useState<FsNode>(() => createInitialFs());
  const [cwdParts, setCwdParts] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number>(-1);
  const [entries, setEntries] = useState<OutputEntry[]>([]);

  // Nano editor state
  const [nanoState, setNanoState] = useState<{
    pathParts: string[];
    fileName: string;
    content: string;
    savedNotice: string;
    searchQuery: string;
    showSearch: boolean;
  } | null>(null);

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

  const currentDir = useMemo(() => {
    const res = resolveNode("~/" + cwdParts.join("/"), []);
    return res.node && res.node.type === "dir" ? res.node : null;
  }, [cwdParts, fsRoot]);

  const appendOutput = (command: string, body: React.ReactNode, promptPath = cwdDisplay) => {
    setEntries((prev) => [...prev, { id: nextId.current++, promptPath, command, body }]);
  };

  useEffect(() => {
    // Boot welcome session once
    if (entries.length === 0) {
      executeCommand("welcome");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries]);

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

  const renderDirListing = (dirNode: FsNode & { type: "dir" }, dirParts: string[]) => {
    const keys = Object.keys(dirNode.children);
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

    const [cmdRaw, ...rest] = trimmed.split(/\s+/);
    const cmd = cmdRaw.toLowerCase();
    const arg = rest.join(" ").trim();
    const promptStr = currentParts.length === 0 ? "~" : `~/${currentParts.join("/")}`;

    if (cmd === "clear") {
      setEntries([]);
      return currentParts;
    }

    if (cmd === "exit") {
      router.push("/");
      return currentParts;
    }

    if (cmd === "welcome") {
      appendOutput(
        "welcome",
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-4 rounded-lg bg-[#22071a] border border-[#5c244b]">
          <div className="space-y-2.5 flex-1">
            <div className="text-lg sm:text-xl font-bold text-[#8ae234]">
              Welcome to Binod Linux World (Ubuntu 24.04 LTS)
            </div>
            <div className="text-xs sm:text-sm text-[#d3d7cf] leading-relaxed">
              Interactive DevOps Portfolio Shell for <b className="text-white">{portfolio.personal.name}</b> —{" "}
              <span className="text-sky-400">Kathmandu, Nepal (UTC+5:45)</span>
              <br />
              All navbar sections live inside real Linux directories (<code className="text-[#8ae234]">about/</code>,{" "}
              <code className="text-[#8ae234]">experience/</code>, <code className="text-[#8ae234]">case-studies/</code>,{" "}
              <code className="text-[#8ae234]">projects/</code>, <code className="text-[#8ae234]">services/</code>,{" "}
              <code className="text-[#8ae234]">blogs/</code>, <code className="text-[#8ae234]">certifications/</code>,{" "}
              <code className="text-[#8ae234]">contact/</code>).
            </div>
            <div className="text-xs text-[#ad7fa8]">
              Try commands: <code className="text-[#8ae234]">ls</code>, <code className="text-[#8ae234]">cd experience</code>,{" "}
              <code className="text-[#8ae234]">cat about/bio.txt</code>, <code className="text-[#8ae234]">nano welcome.txt</code>,{" "}
              <code className="text-[#8ae234]">view about/profile-dotmatrix.img</code>, <code className="text-[#8ae234]">tree</code>,{" "}
              <code className="text-[#8ae234]">help</code>
            </div>
            <div className="flex flex-wrap gap-2 pt-1 text-xs">
              <button
                onClick={() => executeCommand("help")}
                className="px-2.5 py-1 rounded bg-[#8ae234] text-[#1a0514] font-bold cursor-pointer"
              >
                $ help
              </button>
              <button
                onClick={() => executeCommand("tree")}
                className="px-2.5 py-1 rounded bg-[#3d1430] border border-[#729fcf] text-[#729fcf] font-bold cursor-pointer"
              >
                $ tree
              </button>
              <a
                href={portfolio.personal.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded bg-[#3d1430] border border-[#8ae234]/60 text-[#8ae234] font-bold inline-flex items-center gap-1"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <Link
                href="/"
                className="px-2.5 py-1 rounded bg-[#e95420] text-white font-bold inline-flex items-center gap-1"
              >
                <span>Return to GUI Portfolio</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1.5 self-center">
            <DotMatrixPortrait src="/profile-headshot.jpg" size={180} />
            <span className="text-[11px] text-[#ad7fa8]">[3D Dot-Matrix Profile :: Hover Me]</span>
          </div>
        </div>,
        promptStr
      );
      return currentParts;
    }

    if (cmd === "help" || cmd === "man") {
      appendOutput(
        trimmed,
        <pre className="text-xs sm:text-sm text-[#eeeeec] whitespace-pre-wrap leading-relaxed">{`BINOD LINUX WORLD — SUPPORTED COMMANDS
-----------------------------------------------------------------------
  ls [dir]        List directories & clickable files
  cd <dir|..|~>   Change directory (e.g. 'cd experience', 'cd ..')
  pwd             Print current working directory
  tree            Show full portfolio filesystem tree
  cat <file>      Read file contents (clickable URLs & GUI redirects)
  nano <file>     Open GNU nano interactive editor (view/edit/save!)
  view <image>    View images & 3D dot-matrix portrait inline (alias: imgcat)
  open <target>   Redirect to GUI section or social link (github, linkedin, resume, blogs)
  grep <keyword>  Search across all portfolio files
  whoami / neofetch  Display operator profile & system summary
  clear           Clear terminal screen
  exit            Return to standard portfolio GUI`}</pre>,
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
      appendOutput(
        trimmed,
        <div className="text-xs sm:text-sm text-[#eeeeec] space-y-1">
          <div>
            <b className="text-[#8ae234]">binod</b> — {portfolio.personal.name} ({portfolio.personal.role})
          </div>
          <div>Location: Kathmandu, Nepal (UTC+5:45)</div>
        </div>,
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
Certs    : 2x AWS Certified (SAA-C03, CLF-C02)
Award    : AWS Community Builder (Dev Tools 2026)
Sections : 8 Directories | ${portfolio.blogs.length} Blogs | ${portfolio.projects.length} Projects`}</pre>
        </div>,
        promptStr
      );
      return currentParts;
    }

    if (cmd === "uname") {
      appendOutput(
        trimmed,
        <span className="text-[#eeeeec]">Linux binod-cloud 6.8.0-aws-devops #1 SMP x86_64 GNU/Linux</span>,
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
      const cleanArg = rest.filter((r) => !r.startsWith("-")).join(" ");
      const res = cleanArg
        ? resolveNode(cleanArg, currentParts)
        : resolveNode("~/" + currentParts.join("/"), []);
      if (!res.node) {
        appendOutput(trimmed, <span className="text-red-400">ls: cannot access '{cleanArg}': No such file or directory</span>, promptStr);
      } else if (res.node.type === "file") {
        appendOutput(trimmed, <span className="text-[#8ae234]">{res.node.name}</span>, promptStr);
      } else {
        appendOutput(trimmed, renderDirListing(res.node, res.parts), promptStr);
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

    if (cmd === "cat") {
      if (!arg) {
        appendOutput(trimmed, <span className="text-amber-400">Usage: cat &lt;filename&gt;</span>, promptStr);
        return currentParts;
      }
      const res = resolveNode(arg, currentParts);
      if (!res.node) {
        appendOutput(trimmed, <span className="text-red-400">cat: {arg}: No such file or directory</span>, promptStr);
        return currentParts;
      }
      if (res.node.type === "dir") {
        appendOutput(trimmed, <span className="text-amber-400">cat: {arg}: Is a directory (use ls or cd)</span>, promptStr);
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
        <div className="p-3 rounded-lg bg-[#22071a] border border-[#5c244b] space-y-2 text-xs sm:text-sm text-[#eeeeec]">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-[#48183a]">
            <span className="text-[#8ae234] font-bold">{fullPath}</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => executeCommand(`nano ${fullPath}`)}
                className="px-2 py-0.5 rounded bg-[#3d1430] border border-[#729fcf] text-[#729fcf] text-xs cursor-pointer hover:bg-[#729fcf] hover:text-[#1a0514]"
              >
                Open in nano
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
        appendOutput(trimmed, <span className="text-amber-400">Usage: nano &lt;filename&gt;</span>, promptStr);
        return currentParts;
      }
      const res = resolveNode(arg, currentParts);
      if (res.node && res.node.type === "dir") {
        appendOutput(trimmed, <span className="text-red-400">nano: {arg}: Is a directory</span>, promptStr);
        return currentParts;
      }
      const fileName = res.parts[res.parts.length - 1] || arg;
      setNanoState({
        pathParts: res.parts,
        fileName,
        content: res.node && res.node.type === "file" ? res.node.content : `# New note: ${fileName}\n`,
        savedNotice: "",
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

    // Support chaining like `cd experience && ls`
    const chain = trimmed.split("&&");
    let nextParts = [...cwdParts];
    for (const part of chain) {
      nextParts = runSingleCommand(part, nextParts);
    }
  };

  const saveNanoFile = () => {
    if (!nanoState) return;
    const parts = nanoState.pathParts;
    if (parts.length === 0) return;

    const cloneNode = (n: FsNode): FsNode =>
      n.type === "dir"
        ? {
            ...n,
            children: Object.fromEntries(
              Object.entries(n.children).map(([k, v]) => [k, cloneNode(v)])
            ),
          }
        : { ...n };

    const updatedRoot = cloneNode(fsRoot);
    let curr: FsNode = updatedRoot;
    for (let i = 0; i < parts.length - 1; i++) {
      if (curr.type === "dir" && curr.children[parts[i]]) {
        curr = curr.children[parts[i]];
      }
    }
    const fname = parts[parts.length - 1];
    if (curr.type === "dir") {
      const existing = curr.children[fname];
      curr.children[fname] =
        existing && existing.type === "file"
          ? { ...existing, content: nanoState.content }
          : { type: "file", name: fname, content: nanoState.content };
      setFsRoot(updatedRoot);
      setNanoState({
        ...nanoState,
        savedNotice: `[ Wrote ${nanoState.content.split("\n").length} lines to ${fname} ]`,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
      <div
        className="w-full rounded-xl overflow-hidden border border-[#555753] bg-[#300a24] shadow-2xl font-mono text-[#eeeeec] flex flex-col min-h-[78vh]"
        onClick={() => !nanoState && inputRef.current?.focus()}
      >
        {/* Ubuntu GNOME Window Title Bar */}
        <div className="bg-gradient-to-b from-[#484642] to-[#2c2b29] px-4 py-2 flex items-center justify-between border-b border-[#1e1d1b] select-none">
          <div className="flex items-center gap-2 text-xs text-[#d3d7cf]">
            <TerminalIcon className="w-4 h-4 text-[#8ae234]" />
            <span className="hidden sm:inline font-semibold">Ubuntu Linux Shell</span>
          </div>
          <div className="text-xs sm:text-sm font-sans font-semibold text-[#eeeeec]">
            binod@linux-world: {cwdDisplay}
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              title="Minimize to Portfolio GUI"
              className="w-4 h-4 rounded-full bg-[#3c3b37] border border-[#555753] flex items-center justify-center text-[10px] hover:bg-[#555753]"
            >
              -
            </Link>
            <Link
              href="/"
              title="Exit Terminal to Portfolio GUI"
              className="w-4 h-4 rounded-full bg-[#e95420] text-white flex items-center justify-center hover:opacity-90"
            >
              <X className="w-2.5 h-2.5" />
            </Link>
          </div>
        </div>

        {/* Navbar-mirrored Linux Directory Quick Bar */}
        <div className="bg-[#22071a] px-3 sm:px-4 py-2 border-b border-[#4c1a3d] flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[#ad7fa8] mr-1 font-bold">DIRS:</span>
          {QUICK_DIRS.map((dir) => {
            const isActive =
              (dir === "~" && cwdParts.length === 0) ||
              (cwdParts.length > 0 && cwdParts[0] === dir);
            return (
              <button
                key={dir}
                onClick={() => executeCommand(dir === "~" ? "cd ~ && ls" : `cd ~/${dir} && ls`)}
                className={`px-2 py-0.5 rounded border text-xs cursor-pointer transition-colors ${
                  isActive
                    ? "bg-[#8ae234] text-[#1a0514] border-[#8ae234] font-bold"
                    : "bg-[#3d1430] text-[#d3d7cf] border-[#5c244b] hover:border-[#8ae234] hover:text-[#8ae234]"
                }`}
              >
                {dir === "~" ? "~" : `${dir}/`}
              </button>
            );
          })}
          <button
            onClick={() => executeCommand("view about/profile-dotmatrix.img")}
            className="ml-auto px-2 py-0.5 rounded bg-[#e95420]/20 border border-[#e95420] text-[#ffad8e] hover:bg-[#e95420] hover:text-white cursor-pointer text-xs font-bold"
          >
            img: dot-matrix
          </button>
        </div>

        {/* GNU Nano Interactive Overlay OR Normal Terminal Session */}
        {nanoState ? (
          <div className="flex-1 flex flex-col bg-[#1b0514] text-xs sm:text-sm">
            <div className="bg-[#eeeeec] text-[#1b0514] px-3 py-1 flex items-center justify-between font-bold">
              <span>GNU nano 7.2</span>
              <span>File: {nanoState.fileName}</span>
              <span>Modified</span>
            </div>

            {nanoState.showSearch && (
              <div className="bg-[#3d1430] px-3 py-1.5 flex items-center gap-2 border-b border-[#5c244b]">
                <span className="text-[#8ae234]">Search:</span>
                <input
                  type="text"
                  value={nanoState.searchQuery}
                  onChange={(e) => setNanoState({ ...nanoState, searchQuery: e.target.value })}
                  placeholder="find text..."
                  className="bg-[#22071a] px-2 py-0.5 rounded text-[#eeeeec] outline-none border border-[#5c244b] flex-1 max-w-xs"
                />
              </div>
            )}

            <textarea
              value={nanoState.content}
              onChange={(e) =>
                setNanoState({ ...nanoState, content: e.target.value, savedNotice: "" })
              }
              className="flex-1 w-full bg-[#1b0514] text-[#eeeeec] p-4 outline-none resize-none font-mono leading-relaxed min-h-[420px]"
              spellCheck={false}
            />

            {nanoState.savedNotice && (
              <div className="bg-[#eeeeec] text-[#1b0514] text-center py-0.5 font-bold">
                {nanoState.savedNotice}
              </div>
            )}

            <div className="bg-[#2c2b29] px-3 py-2 flex flex-wrap items-center gap-3 border-t border-[#4c4a46] text-xs">
              <button
                onClick={saveNanoFile}
                className="px-2.5 py-1 rounded bg-[#8ae234] text-[#1a0514] font-bold cursor-pointer"
              >
                ^O Write Out (Save)
              </button>
              <button
                onClick={() =>
                  setNanoState({ ...nanoState, showSearch: !nanoState.showSearch })
                }
                className="px-2.5 py-1 rounded bg-[#3d1430] border border-[#729fcf] text-[#729fcf] font-bold cursor-pointer"
              >
                ^W Where Is
              </button>
              <button
                onClick={() => setNanoState(null)}
                className="px-2.5 py-1 rounded bg-[#e95420] text-white font-bold cursor-pointer ml-auto"
              >
                ^X Exit nano
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Scrollable Terminal History */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[65vh] text-xs sm:text-sm">
              {entries.map((entry) => (
                <div key={entry.id} className="space-y-1.5">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-[#8ae234] font-bold">binod@linux-world</span>
                    <span className="text-[#eeeeec]">:</span>
                    <span className="text-[#729fcf] font-bold">{entry.promptPath}</span>
                    <span className="text-[#eeeeec]">$ {entry.command}</span>
                  </div>
                  <div className="pl-1 sm:pl-2">{entry.body}</div>
                </div>
              ))}
              <div ref={outputEndRef} />
            </div>

            {/* Active Terminal Prompt Input */}
            <div className="bg-[#22071a] px-4 py-3 border-t border-[#4c1a3d] flex items-center gap-1.5 text-xs sm:text-sm">
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
                placeholder="type command (ls, cd, cat, nano, view, help)..."
                className="flex-1 bg-transparent outline-none text-[#eeeeec] placeholder:text-[#ad7fa8]/60 font-mono"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

