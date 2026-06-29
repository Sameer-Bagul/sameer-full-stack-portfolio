'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

const SERVICES = [
  {
    num: '01', name: 'AI & Intelligence Systems',
    clients: 12, projects: 18, satisfaction: '98%',
    pitch: 'Stop losing hours to repetitive decisions. I build AI systems that learn your business logic, surface the right information at the right moment, and handle the cognitive load — so your team can focus on what only humans can do.',
    techNote: 'Architected on LangChain / LangGraph with RAG pipelines, vector stores (Pinecone, FAISS), and custom agent orchestration.',
    tags: ['LLMs', 'RAG', 'LangChain', 'OpenAI'],
    deliverables: ['Custom LLM integration', 'RAG pipeline design', 'Agent orchestration'],
  },
  {
    num: '02', name: 'SaaS Tools Development',
    clients: 8, projects: 11, satisfaction: '100%',
    pitch: 'Turn your product idea into a revenue-generating platform. I handle the full stack — auth, billing, multi-tenancy, and admin — so you launch faster, charge confidently, and scale without rewrites.',
    techNote: 'MERN / Next.js stack with Stripe billing, JWT + OAuth auth, and a modular multi-tenant data architecture.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Multi-tenancy'],
    deliverables: ['Multi-tenant architecture', 'Billing flows', 'RBAC & permissions'],
  },
  {
    num: '03', name: 'Web Development',
    clients: 22, projects: 34, satisfaction: '97%',
    pitch: 'Your website is your best salesperson — it works 24/7 and never asks for commission. I build fast, beautiful, and search-optimised web experiences that turn visitors into customers.',
    techNote: 'React / Next.js with Turbopack, ISR/SSG strategies, and a relentless focus on Core Web Vitals.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    deliverables: ['SSR / SSG / ISR', 'Core Web Vitals', 'CMS integration'],
  },
  {
    num: '04', name: 'App Development',
    clients: 7, projects: 9, satisfaction: '96%',
    pitch: 'Your customers are already on their phones. I build cross-platform mobile apps that feel native, load instantly, and keep users coming back — delivered once for both iOS and Android.',
    techNote: 'React Native + Expo SDK with EAS build pipelines, OTA updates, and native module bridging.',
    tags: ['React Native', 'Expo', 'iOS', 'Android'],
    deliverables: ['Cross-platform codebase', 'Offline-first support', 'Push notifications'],
  },
  {
    num: '05', name: 'Desktop Applications',
    clients: 4, projects: 5, satisfaction: '100%',
    pitch: 'Some workflows just need the full power of a desktop. I build cross-platform apps that sit in your dock, access local files, and run without a browser.',
    techNote: 'Electron for rapid delivery and rich ecosystem access; Tauri + Rust for lightweight, performant binaries.',
    tags: ['Electron', 'Tauri', 'Rust', 'Windows/macOS'],
    deliverables: ['File system access', 'Native OS integration', 'Auto-update pipeline'],
  },
  {
    num: '06', name: 'QA & Automation',
    clients: 6, projects: 14, satisfaction: '99%',
    pitch: 'Every bug your users find costs you trust. I set up the safety nets — automated test suites, regression checks, and workflow automations — so releases are events to celebrate.',
    techNote: 'Playwright for E2E, Vitest for unit/integration, and CI/CD quality gates to block broken code.',
    tags: ['Playwright', 'Vitest', 'GitHub Actions', 'CI/CD'],
    deliverables: ['E2E test suites', 'CI/CD quality gates', 'Regression coverage'],
  }
];

import SectionHeading from './SectionHeading';

export default function Services() {
  return (
    <section className="py-12 md:py-20 w-full relative overflow-hidden">
      <div className="container px-4 sm:px-6 max-w-[1200px] mx-auto flex flex-col min-h-[90vh] justify-center">
        
        <SectionHeading 
            watermark="SERVICES"
            label="Creative Digital Agency"
            title={
                <>
                    Multidisciplinary<br />
                    digital engineering.
                </>
            }
            description="I am a premium software engineer focused on Web, Mobile, and AI engineering, deeply integrated into your business processes. I develop visually stunning and scalable digital systems with a methodology based on architectural direction, UI/UX design, cloud modeling, and continuous deployment, collaborating directly with ambitious brands and enterprises from concept to delivery."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-10 w-full mt-4 md:mt-8 border-t border-white/5 pt-8 md:pt-12">
          {SERVICES.map((service, index) => (
            <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col items-start cursor-pointer border-b border-white/5 pb-6 md:pb-8"
            >
                <div className="flex items-center gap-4 w-full mb-3 md:mb-4">
                    <span className="font-dm-mono text-zinc-500 text-xs shrink-0 group-hover:text-[#C5FF41] transition-colors duration-500">
                        {service.num}
                    </span>
                    <h3 className="font-seona uppercase tracking-tighter text-2xl md:text-3xl lg:text-4xl text-zinc-100 group-hover:text-white transition-colors duration-500 leading-none">
                        {service.name}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 ml-auto text-zinc-500 group-hover:text-[#C5FF41] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
                </div>
                
                <p className="text-zinc-300 group-hover:text-white text-xs md:text-sm leading-relaxed transition-colors duration-300 mb-4 md:mb-6 pr-8">
                    {service.pitch}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {service.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 rounded-full border border-white/10 group-hover:border-white/30 text-[9px] md:text-[10px] font-dm-mono tracking-wider text-zinc-300 group-hover:text-white transition-colors duration-300">
                            {tag}
                        </span>
                    ))}
                </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
