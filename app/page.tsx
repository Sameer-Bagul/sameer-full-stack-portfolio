import Hero from "@/components/Hero";
// import IntroVideo from "@/components/IntroVideo";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import Testimonials from "@/components/Testimonials";
import Experience from "@/components/Experience";
import CTA from "@/components/CTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sameer Bagul | Senior Full Stack & AI Developer",
  description: "Senior Full Stack Engineer building scalable MERN, Next.js, and AI systems. Explore my portfolio, projects, and technical blogs.",
};


export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      {/* <IntroVideo /> */}
      <About />
      <Skills />
      <Services />
      <FeaturedProjects />
      <Testimonials />
      <Experience />
      <CTA />
    </div>
  );
}
