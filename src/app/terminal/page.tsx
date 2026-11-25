import type { Metadata } from "next";
import LinuxTerminal from "@/components/terminal/LinuxTerminal";

export const metadata: Metadata = {
  title: "Binod Linux World | Interactive Terminal",
  description:
    "Full-screen read-only Ubuntu Linux terminal for Binod Prasad Joshi's Cloud & DevOps portfolio.",
};

export default function TerminalPage() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-[#300a24]">
      <LinuxTerminal />
    </main>
  );
}
