export type ThemeName = "ubuntu" | "kali" | "matrix" | "amber";

export interface TerminalTheme {
  name: ThemeName;
  label: string;
  bg: string;
  bgDark: string;
  bgElevated: string;
  border: string;
  titleGrad: string;
  promptUser: string;
  promptPath: string;
  accent: string;
  text: string;
  muted: string;
  danger: string;
  warn: string;
}

export const TERMINAL_THEMES: Record<ThemeName, TerminalTheme> = {
  ubuntu: {
    name: "ubuntu",
    label: "Ubuntu 24.04 LTS",
    bg: "#300a24",
    bgDark: "#22071a",
    bgElevated: "#3d1430",
    border: "#5c244b",
    titleGrad: "linear-gradient(180deg, #484642 0%, #2c2b29 100%)",
    promptUser: "#8ae234",
    promptPath: "#729fcf",
    accent: "#e95420",
    text: "#eeeeec",
    muted: "#ad7fa8",
    danger: "#f87171",
    warn: "#fbbf24",
  },
  kali: {
    name: "kali",
    label: "Kali Linux Rolling",
    bg: "#0b0f17",
    bgDark: "#070a10",
    bgElevated: "#131b29",
    border: "#1e2d45",
    titleGrad: "linear-gradient(180deg, #1f2937 0%, #111827 100%)",
    promptUser: "#38bdf8",
    promptPath: "#f43f5e",
    accent: "#38bdf8",
    text: "#e2e8f0",
    muted: "#94a3b8",
    danger: "#fb7185",
    warn: "#fbbf24",
  },
  matrix: {
    name: "matrix",
    label: "Matrix Phosphor",
    bg: "#030b04",
    bgDark: "#020703",
    bgElevated: "#071a0a",
    border: "#14532d",
    titleGrad: "linear-gradient(180deg, #052e16 0%, #02180b 100%)",
    promptUser: "#4ade80",
    promptPath: "#22d3ee",
    accent: "#22c55e",
    text: "#dcfce7",
    muted: "#86efac",
    danger: "#f87171",
    warn: "#facc15",
  },
  amber: {
    name: "amber",
    label: "DEC VT220 Amber",
    bg: "#120c02",
    bgDark: "#0b0701",
    bgElevated: "#241804",
    border: "#78350f",
    titleGrad: "linear-gradient(180deg, #292524 0%, #1c1917 100%)",
    promptUser: "#fbbf24",
    promptPath: "#fb923c",
    accent: "#f59e0b",
    text: "#fef3c7",
    muted: "#fcd34d",
    danger: "#f87171",
    warn: "#fde047",
  },
};

