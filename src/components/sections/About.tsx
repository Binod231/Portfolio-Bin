"use client";

import { motion } from "framer-motion";
import { ShieldCheck, GraduationCap, Code, Cloud, Database, Terminal, Briefcase, User } from "lucide-react";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolio } from "@/data/portfolio";
import ThreeDPhoto from "@/components/ui/ThreeDPhoto";

const skills = [
  { name: "Python", color: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: <Code size={14} /> },
  { name: "AWS", color: "bg-orange-500/10 text-orange-400 border-orange-500/20", icon: <Cloud size={14} /> },
  { name: "FastAPI", color: "bg-teal-500/10 text-teal-400 border-teal-500/20", icon: <Terminal size={14} /> },
  { name: "Docker", color: "bg-blue-600/10 text-blue-400 border-blue-600/20", icon: <Database size={14} /> },
];

export default function About() {
  return (
    <SectionWrapper id="about" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-600/10 border border-blue-500/30 shadow-lg shadow-blue-500/20">
              <User size={32} className="text-blue-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-400 to-blue-600">
              About Me
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Main Narrative Card */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="lg:col-span-8 group relative h-full border border-slate-800 rounded-3xl p-6 hover:-translate-y-2 hover:border-blue-500/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-blue-500/10"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl transition-all duration-500 bg-blue-600/10 group-hover:bg-blue-600/20"></div>

                <div className="relative z-10">
                    {/* 3D Profile Photo Centered */}
                    <div className="w-full flex justify-center mb-6">
                       <ThreeDPhoto 
                        src={portfolio.personal.photo} 
                        alt="Binod Prasad Joshi" 
                        className="w-36 h-36 md:w-45 md:h-45"
                       />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4">
                      Hello, I'm Binod Prasad Joshi.
                    </h3>

                    <p className="text-lg text-slate-400 leading-relaxed mb-4">
                      I am a <strong >DevOps-focused Cloud Engineer</strong> with hands-on experience
                      in <strong >AWS</strong>, <strong >Docker</strong>, and
                      <strong > CI/CD automation</strong>, focused on designing and delivering
                      secure, scalable, and high-performance cloud systems.
                    </p>

                    <p className="text-lg text-slate-400 leading-relaxed mb-6">
                      At <strong className="text-white">Karnovation Inc.</strong>, I manage cloud infrastructure, optimize
                      backend and database performance, and follow <strong >shift-left security </strong>
                      principles while actively researching modern <strong >cloud-native security
                      challenges</strong>.
                    </p>

                    <div className="flex flex-wrap gap-2 mt-6">
                      {skills.map((skill, idx) => (
                        <span key={idx} className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 ${skill.color}`}>
                          {skill.icon} {skill.name}
                        </span>
                      ))}
                    </div>
                </div>
            </motion.div>

            {/* Stats Column */}
            <div className="lg:col-span-4 space-y-6">
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="group relative border border-slate-800 p-6 rounded-3xl flex flex-col justify-center items-center text-center hover:-translate-y-2 hover:border-blue-500/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-blue-500/10"
              >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl transition-all duration-500 bg-blue-600/10 group-hover:bg-blue-600/20"></div>
                  
                  <div className="relative z-10 w-full flex flex-col items-center">
                      <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20 ring-1 ring-blue-500/30">
                        <ShieldCheck size={32} className="text-blue-400" />
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">2x</div>
                      <div className="text-sm text-blue-400 uppercase tracking-wider font-semibold">AWS Certified</div>
                      <div className="mt-4 text-xs text-slate-500">Solutions Architect Assoc. & Cloud Practitioner</div>
                  </div>
              </motion.div>
              
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.3 }}
                 className="group relative border border-slate-800 p-8 rounded-3xl flex items-center gap-4 hover:-translate-y-2 hover:border-purple-500/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-purple-500/10"
              >
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl transition-all duration-500 bg-purple-600/10 group-hover:bg-purple-600/20"></div>

                 <div className="relative z-10 flex items-center gap-4">
                    <div className="bg-purple-500/10 p-3 rounded-xl text-purple-400 ring-1 ring-purple-500/20">
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <div className="text-white font-bold group-hover:text-purple-400 transition-colors">PhD Aspirant</div>
                      <div className="text-sm text-slate-500">Targeting Fall 2026</div>
                    </div>
                 </div>
              </motion.div>

              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.4 }}
                 className="group relative border border-slate-800 p-5 rounded-3xl flex items-center gap-4 hover:-translate-y-2 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-emerald-500/10"
              >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl transition-all duration-500 bg-emerald-600/10 group-hover:bg-emerald-600/20"></div>

                  <div className="relative z-10 flex items-center gap-4">
                     <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-400 group-hover:bg-emerald-500/20 transition-colors ring-1 ring-emerald-500/20">
                         <Briefcase size={24} />
                     </div>
                     <div>
                         <div className="text-white font-bold text-lg group-hover:text-emerald-400 transition-colors">Actively Looking</div>
                         <div className="text-sm text-slate-400">DevOps & Cloud Roles</div>
                     </div>
                  </div>
              </motion.div>

            </div>

          </div>
        </div>
    </SectionWrapper>
  );
}
