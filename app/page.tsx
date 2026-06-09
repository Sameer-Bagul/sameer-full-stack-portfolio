import Hero from "@/components/Hero";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

const About = dynamic(() => import("@/components/About"));
const Skills = dynamic(() => import("@/components/Skills"));
const Services = dynamic(() => import("@/components/Services"));
const FeaturedProjects = dynamic(() => import("@/components/FeaturedProjects"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Experience = dynamic(() => import("@/components/Experience"));
const CTA = dynamic(() => import("@/components/CTA"));

export const metadata: Metadata = {
  title: "Sameer Bagul | Senior Full Stack & AI Developer",
  description: "Senior Full Stack Engineer building scalable MERN, Next.js, and AI systems. Explore my portfolio, projects, and technical blogs.",
  alternates: {
    canonical: SITE_URL,
  },
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
