import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Blog from "@/components/sections/Blog";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center w-full overflow-x-hidden relative z-0">
      <Hero />
      <div className="w-full space-y-8 md:space-y-12 pb-24">
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Blog />
        <Certifications />
      </div>
      <Contact />
    </main>
  );
}
