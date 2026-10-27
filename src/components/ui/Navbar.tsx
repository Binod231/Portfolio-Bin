"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { portfolio } from "@/data/portfolio";

const navLinks = [
  { name: "Case Studies", href: "#case-studies" },
  { name: "Services", href: "#services" },
  { name: "Blogs", href: "#blogs", count: portfolio.blogs.length },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const isDarkNow = root.classList.contains("dark") || root.getAttribute("data-theme") === "dark";
    setIsDark(isDarkNow);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const isCurrentlyDark = root.classList.contains("dark") || root.getAttribute("data-theme") === "dark";
    if (isCurrentlyDark) {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      try {
        localStorage.setItem("theme", "light");
      } catch (_) {}
      setIsDark(false);
    } else {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch (_) {}
      setIsDark(true);
    }
  };

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 30;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-[#111418]/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        
        {/* Brand / Name Logo in Signature Italic Serif */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group flex flex-col"
        >
          <span className="text-xl sm:text-2xl font-serif italic font-bold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
            {portfolio.personal.name}
          </span>
          <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
            cloud &amp; devops consultant
          </span>
        </a>

        {/* Desktop Navigation Links (arpitbhayani.me clean text style) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>{link.name}</span>
              {link.count && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                  {link.count}
                </span>
              )}
            </button>
          ))}

          {/* Theme Toggle Button */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle dark/light theme"
            className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer ml-1"
          >
            {mounted ? (
              isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
            ) : (
              <span className="w-4 h-4 block" />
            )}
          </button>
        </nav>

        {/* Mobile Menu & Theme Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            id="mobile-theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle dark/light theme"
            className="p-2 text-neutral-600 dark:text-neutral-300 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
          >
            {mounted ? (
              isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
            ) : (
              <span className="w-4 h-4 block" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 text-neutral-600 dark:text-neutral-300 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 px-4 py-4 bg-white dark:bg-[#111418] space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="w-full text-left py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white flex items-center justify-between"
            >
              <span>{link.name}</span>
              {link.count && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                  {link.count} articles
                </span>
              )}
            </button>
          ))}
          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-500">
            <span>Available for Consulting</span>
            <a
              href={`mailto:${portfolio.personal.email}`}
              className="text-neutral-900 dark:text-neutral-100 underline"
            >
              {portfolio.personal.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
