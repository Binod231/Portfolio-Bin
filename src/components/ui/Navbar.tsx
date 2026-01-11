"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Github, Linkedin, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { portfolio } from "@/data/portfolio";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Handle scroll effect for background styling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update active section based on scroll position
  useEffect(() => {
    const handleScrollForActive = () => {
      // Get all sections
      const sectionIds = ['hero', ...navItems.map(item => item.href.replace("#", ""))];
      
      let currentSection = sectionIds[0];
      const scrollY = window.scrollY;
      
      // Check each section
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollY;
          
          // If we've scrolled past this section's top (with small offset), it's active
          if (scrollY >= elementTop - 200) {
            currentSection = sectionId;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScrollForActive);
    handleScrollForActive(); // Run once on mount

    return () => window.removeEventListener("scroll", handleScrollForActive);
  }, []);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-lg shadow-black/20" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        
        {/* Logo */}
        <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => scrollToSection("#hero")}
        >
            <div className="flex items-center gap-3 md:gap-4">
              <div className="relative flex items-center justify-center shrink-0">
                <img src="/favicon.ico" alt="Logo" className="w-12 h-12 md:w-14 md:h-14" />
              </div>
              <div className="font-bold text-lg sm:text-xl md:text-3xl tracking-tight whitespace-nowrap">
                Binod<span className="text-blue-500"> Prasad</span><span className="tracking-tight whitespace-nowrap"> Joshi</span>
              </div>
            </div>
        </div>

        <div className="hidden lg:flex items-center gap-1 bg-slate-900/50 p-1 rounded-full border border-white/5 backdrop-blur-sm">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={cn(
                "px-3 xl:px-4 py-2 text-xs xl:text-sm font-medium rounded-full transition-colors relative z-10 whitespace-nowrap",
                activeSection === item.href.substring(1) 
                  ? "text-white" 
                  : "text-slate-400 hover:text-white"
              )}
            >
              {item.name}
              {activeSection === item.href.substring(1) && (
                <motion.div
                  layoutId="navbar-pill"
                  className="absolute inset-0 bg-blue-600 rounded-full -z-10 shadow-lg shadow-blue-900/20"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Desktop Social/CTA */}
        <div className="hidden lg:flex items-center gap-2 ml-2">
            <a href={portfolio.personal.links.github} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full border border-transparent hover:border-white/10">
                <Github className="w-5 h-5" />
            </a>
             <a href={portfolio.personal.links.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full border border-transparent hover:border-white/10">
                <Linkedin className="w-5 h-5" />
            </a>
            <Button size="sm" className="ml-2 bg-white text-slate-900 hover:bg-slate-200" asChild>
                <a href={portfolio.personal.links.resume} target="_blank" rel="noopener noreferrer">
                    Resume
                </a>
            </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-white bg-white/5 rounded-lg border border-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => {
                      const element = document.querySelector(item.href);
                      if (element) {
                        const offsetTop = element.getBoundingClientRect().top + window.scrollY - 85;
                        window.scrollTo({
                          top: offsetTop,
                          behavior: "smooth",
                        });
                      }
                    }, 300);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-colors block",
                    activeSection === item.href.substring(1) 
                      ? "text-blue-400 bg-blue-500/10 border border-blue-500/20" 
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  )}
                >
                  {item.name}
                </button>
              ))}
               <div className="flex items-center gap-4 mt-2 pt-4 border-t border-white/10 px-2 justify-center">
                  <a href={portfolio.personal.links.github} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-full">
                      <Github className="w-5 h-5" />
                  </a>
                  <a href={portfolio.personal.links.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-full">
                      <Linkedin className="w-5 h-5" />
                  </a>
                  <Button size="sm" className="ml-2 bg-blue-600 hover:bg-blue-500 text-white border-none" asChild>
                     <a href={portfolio.personal.links.resume} target="_blank" rel="noopener noreferrer">Resume</a>
                  </Button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
