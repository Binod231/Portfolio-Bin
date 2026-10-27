import Hero from "@/components/sections/Hero";
import ShowcaseGrid from "@/components/sections/ShowcaseGrid";
import RecentFeeds from "@/components/sections/RecentFeeds";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Blog from "@/components/sections/Blog";
import Certifications from "@/components/sections/Certifications";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center w-full">
      <Hero />
      <ShowcaseGrid />
      <RecentFeeds />
      <Projects />
      <Services />
      <Blog />
      <Certifications />
      <Experience />
      <Skills />
      <About />
      <Contact />
    </main>
  );
}
