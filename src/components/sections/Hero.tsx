"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ShieldCheck, ChevronRight } from "lucide-react";

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const bgY1 = useTransform(scrollYProgress, [0, 0.5], ["0%", "15%"]);
  const bgY2 = useTransform(scrollYProgress, [0, 0.5], ["0%", "-10%"]);
  const bgY3 = useTransform(scrollYProgress, [0, 0.5], ["0%", "8%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6]);

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
        {/* Parallax Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <motion.div
            style={{ y: bgY1, opacity: bgOpacity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"
          />
          <motion.div
            style={{ y: bgY2, opacity: bgOpacity }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"
          />
          <motion.div
            style={{ y: bgY3 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]"
          />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center z-10 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/40 border border-white/10 text-blue-400 text-sm font-medium mb-8 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.05)]">
              <ShieldCheck size={14} /> 2x AWS Certified 
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
              Building Scalable <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Cloud-Native Systems</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              I bridge the gap between application logic and infrastructure. 
              Specializing in backend security, distributed systems, and scalable AWS architectures.
            </p>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4, delay: 0.15 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => scrollTo('projects')} className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 cursor-pointer">
                View My Work <ChevronRight size={18} />
              </button>
              <button onClick={() => scrollTo('about')} className="w-full sm:w-auto px-8 py-4 bg-slate-900/40 hover:bg-slate-800/80 text-white rounded-xl font-semibold transition-all border border-white/10 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.3)] cursor-pointer">
                About Me
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-600 cursor-pointer hover:text-blue-400 transition-colors"
            onClick={() => scrollTo('contact')}
        >
          <ArrowDown size={24} />
        </motion.div>
      </section>
  );
}
