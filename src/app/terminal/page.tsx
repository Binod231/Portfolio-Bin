import type { Metadata } from "next";
import LinuxTerminal from "@/components/terminal/LinuxTerminal";

export const metadata: Metadata = {
  title: "Binod Linux World | Interactive Terminal",
  description:
    "Explore Binod Prasad Joshi's DevOps portfolio through an interactive Ubuntu Linux terminal with virtual directories, cat, nano, dot-matrix portrait, and direct redirects.",
};

export default function TerminalPage() {
  return (
    <main className="min-h-screen w-full bg-neutral-950/95 dark:bg-[#0b0d11] py-2">
      <LinuxTerminal />
    </main>
  );
}

