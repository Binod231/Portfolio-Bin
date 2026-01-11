"use client";

import { motion } from "framer-motion";
import { ArrowDown, ShieldCheck, ChevronRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Hero() {

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center z-10 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-blue-400 text-sm font-medium mb-8 backdrop-blur-sm">
              <ShieldCheck size={14} /> 2x AWS Certified 
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
              Building Scalable <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Cloud-Native Systems</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              I bridge the gap between application logic and infrastructure. 
              Specializing in backend security, distributed systems, and scalable AWS architectures.
            </p>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => scrollTo('projects')} className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 cursor-pointer">
                View My Work <ChevronRight size={18} />
              </button>
              <button onClick={() => scrollTo('about')} className="w-full sm:w-auto px-8 py-4 bg-slate-900/50 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all border border-slate-800 backdrop-blur-sm cursor-pointer">
                About Me
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-600 cursor-pointer hover:text-blue-400 transition-colors"
            onClick={() => scrollTo('contact')}
        >
          <ArrowDown size={24} />
        </motion.div>
      </section>
  );
}
