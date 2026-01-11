"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { portfolio } from "@/data/portfolio";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  const { email, links } = portfolio.personal;

  return (
    <footer className="w-full py-12 md:py-24 bg-card/30 mt-12 border-t border-muted/10">
      <SectionWrapper id="contact" className="py-0 md:py-0">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-teal-500/20 to-indigo-600/10 border border-teal-500/30 shadow-lg shadow-teal-500/20">
              <Mail size={32} className="text-teal-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-indigo-400 to-teal-600">
              Get in Touch
            </h2>
          </div>
          <p className="text-muted-foreground max-w-lg">
            I'm currently open to new opportunities in Cloud Engineering, Backend Development, and DevOps.
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <Button size="lg" className="h-12 px-8 text-lg" asChild>
            <a href={`mailto:${email}`}>
              <Mail className="mr-2 w-5 h-5" /> Say Hello
            </a>
          </Button>

          <div className="flex gap-4 mt-8">
            <a 
              href={links.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-muted/20 transition-colors text-muted-foreground hover:text-foreground"
            >
              <Github className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a 
              href={links.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-muted/20 transition-colors text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>

          <p className="text-sm text-muted-foreground/60 mt-12">
            © {new Date().getFullYear()} {portfolio.personal.name}. All rights reserved.
          </p>
        </div>
      </SectionWrapper>
    </footer>
  );
}
