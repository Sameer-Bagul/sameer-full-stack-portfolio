'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { STYLES } from '@/lib/constants/styles';
import { Card } from '@/components/ui/card';

const SERVICES = [
  {
    num: '01', name: 'AI & Intelligence Systems',
    clients: 12, projects: 18, satisfaction: '98%',
    pitch: 'Stop losing hours to repetitive decisions. I build AI systems that learn your business logic, surface the right information at the right moment, and handle the cognitive load — so your team can focus on what only humans can do.',
    techNote: 'Architected on LangChain / LangGraph with RAG pipelines, vector stores (Pinecone, FAISS), and custom agent orchestration. Deployable on-premise or cloud.',
    tags: ['LLMs', 'RAG', 'LangChain', 'LangGraph', 'LlamaIndex', 'Pinecone', 'FAISS', 'OpenAI'],
    deliverables: ['Custom LLM integration', 'RAG pipeline design', 'Vector DB setup', 'Agent orchestration', 'Workflow automation', 'Model evaluation & testing'],
  },
  {
    num: '02', name: 'SaaS Tools Development',
    clients: 8, projects: 11, satisfaction: '100%',
    pitch: 'Turn your product idea into a revenue-generating platform. I handle the full stack — auth, billing, multi-tenancy, and admin — so you launch faster, charge confidently, and scale without rewrites.',
    techNote: 'MERN / Next.js stack with Stripe or Razorpay billing, JWT + OAuth auth, and a modular multi-tenant data architecture built for horizontal scaling.',
    tags: ['Next.js', 'Node.js', 'Stripe', 'Razorpay', 'PostgreSQL', 'Redis', 'Multi-tenancy'],
    deliverables: ['Multi-tenant architecture', 'Billing & subscription flows', 'RBAC & permissions', 'Usage metering & limits', 'Admin panel', 'API-first backend'],
  },
  {
    num: '03', name: 'Web Development',
    clients: 22, projects: 34, satisfaction: '97%',
    pitch: 'Your website is your best salesperson — it works 24/7 and never asks for commission. I build fast, beautiful, and search-optimised web experiences that turn visitors into customers.',
    techNote: 'React 19 / Next.js 15 with Turbopack, ISR/SSG/SSR strategies, Edge runtime, and a relentless focus on Core Web Vitals and Lighthouse scores.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL', 'Vercel'],
    deliverables: ['SSR / SSG / ISR', 'Core Web Vitals', 'SEO & metadata', 'CMS integration', 'API development', 'Performance audits'],
  },
  {
    num: '04', name: 'App Development',
    clients: 7, projects: 9, satisfaction: '96%',
    pitch: 'Your customers are already on their phones. I build cross-platform mobile apps that feel native, load instantly, and keep users coming back — delivered once for both iOS and Android.',
    techNote: 'React Native 0.81 + Expo SDK 54 with EAS build pipelines, OTA updates, native module bridging, and deep-link / push notification support.',
    tags: ['React Native', 'Expo', 'EAS', 'TypeScript', 'iOS', 'Android', 'Push Notifications'],
    deliverables: ['Cross-platform codebase', 'Native device APIs', 'Offline-first support', 'Push notifications', 'App Store deployment', 'OTA updates'],
  },
  {
    num: '05', name: 'Desktop Applications',
    clients: 4, projects: 5, satisfaction: '100%',
    pitch: 'Some workflows just need the full power of a desktop. I build cross-platform apps that sit in your dock, access local files, and run without a browser — giving your power users the tool they deserve.',
    techNote: 'Electron for rapid delivery and rich ecosystem access; Tauri + Rust for lightweight, performant binaries with a minimal attack surface.',
    tags: ['Electron', 'Tauri', 'Rust', 'Windows', 'macOS', 'Linux', 'Auto-update'],
    deliverables: ['File system access', 'Native OS integration', 'Auto-update pipeline', 'System tray support', 'Offline capability', 'Cross-platform builds'],
  },
  {
    num: '06', name: 'QA & Automation',
    clients: 6, projects: 14, satisfaction: '99%',
    pitch: 'Every bug your users find costs you trust. I set up the safety nets — automated test suites, regression checks, and workflow automations — so releases are events to celebrate, not dread.',
    techNote: 'Playwright for E2E, Vitest / Jest for unit/integration, n8n and Make for no-code automation, and CI/CD quality gates to block broken code before it ships.',
    tags: ['Playwright', 'Vitest', 'Jest', 'n8n', 'Make', 'GitHub Actions', 'CI/CD'],
    deliverables: ['E2E test suites', 'API & unit testing', 'n8n / Make automation', 'CI/CD quality gates', 'Regression coverage', 'Test reporting'],
  },
  {
    num: '07', name: 'UI/UX & Design',
    clients: 14, projects: 20, satisfaction: '98%',
    pitch: 'Design is not decoration — it is the first argument you make to your customer. I create interfaces that are immediately understood, genuinely enjoyable, and built to convert.',
    techNote: 'Figma-based design systems with tokenised variables, auto-layout components, WCAG 2.2 accessibility checks, and developer-ready design-to-code handoff.',
    tags: ['Figma', 'Design Systems', 'Tokens', 'Prototyping', 'WCAG', 'Accessibility'],
    deliverables: ['Component design systems', 'High-fidelity prototypes', 'Accessibility audits', 'Brand consistency', 'User flow mapping', 'Dev handoff'],
  },
  {
    num: '08', name: 'DevOps & Infrastructure',
    clients: 5, projects: 8, satisfaction: '100%',
    pitch: 'Slow deployments and fragile infrastructure kill momentum. I set up the pipelines, containers, and cloud architecture that let your team ship with confidence — multiple times a day if needed.',
    techNote: 'Docker + Kubernetes orchestration, GitHub Actions / GitLab CI pipelines, AWS / GCP cloud infra, Terraform for IaC, Prometheus + Grafana for observability.',
    tags: ['Docker', 'Kubernetes', 'GitHub Actions', 'AWS', 'GCP', 'Terraform', 'Prometheus'],
    deliverables: ['Docker & K8s setup', 'CI/CD pipelines', 'Cloud infrastructure', 'Zero-downtime deploys', 'Monitoring & alerting', 'IaC with Terraform'],
  },
  {
    num: '09', name: 'Career Guidance',
    clients: 31, projects: 60, satisfaction: '100%',
    pitch: 'The right mentor at the right time is worth years of trial and error. I give engineers an honest map of the road ahead — what to learn, what to skip, and how to position yourself for the opportunities you actually want.',
    techNote: 'Structured via Topmate with async roadmap reviews, live 1:1 sessions, resume & portfolio teardowns, system design walkthroughs, and OSS contribution strategy.',
    tags: ['1:1 Mentorship', 'Roadmaps', 'Resume Review', 'Interview Prep', 'OSS Strategy', 'Topmate'],
    deliverables: ['Personalised roadmaps', '1:1 mentoring', 'Resume & portfolio review', 'Interview preparation', 'Tech stack guidance', 'Open source strategy'],
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  const activeService = SERVICES[activeIndex];
  const dir = activeIndex > prevIndex ? 1 : -1;

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setPrevIndex(activeIndex);
    setActiveIndex(index);
    
    // Smooth scroll list to ensure active item is visible on mobile
    if (window.innerWidth <= 1024) {
        const listContainer = document.getElementById('svc-list');
        const activeItem = document.getElementById(`svc-item-${index}`);
        if (listContainer && activeItem) {
            const scrollPos = activeItem.offsetLeft - (listContainer.clientWidth / 2) + (activeItem.clientWidth / 2);
            listContainer.scrollTo({ left: scrollPos, behavior: 'smooth' });
        }
    }
  };

  return (
    <section className="py-24 sm:py-32 w-full border-t border-[var(--tmpl-border)] overflow-hidden">
      <div className="container px-4 sm:px-6 max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
                <h2 className={cn(STYLES.heading, "text-left leading-none m-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-seona not-italic tracking-tight")}>
                    Services
                </h2>
                <p className={cn(STYLES.subheading, "text-left m-0 uppercase tracking-[0.3em] text-[10px] sm:text-[11px] font-dm-mono text-[var(--tmpl-text-3)]")}>
                    What I build
                </p>
            </div>
            <div className="font-dm-mono text-[11px] text-[var(--tmpl-text-3)] tracking-[0.2em] hidden md:block">
                <span className="text-[var(--tmpl-text)] font-medium">{activeService.num}</span> / 09
            </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[650px]">
          
          {/* LEFT (List) */}
          <div 
            className="col-span-1 lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-y-visible hide-scrollbar pb-2 lg:pb-0 gap-2 lg:gap-1 -mx-4 px-4 lg:mx-0 lg:px-0" 
            id="svc-list"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {SERVICES.map((s, i) => {
                const isActive = i === activeIndex;
                return (
                    <div 
                        key={s.num}
                        id={`svc-item-${i}`}
                        className={cn(
                            "group relative px-4 lg:px-5 py-3 lg:py-4 cursor-pointer flex flex-col lg:flex-row lg:items-center gap-1.5 lg:gap-5 rounded-xl lg:rounded-2xl transition-all duration-300 shrink-0",
                            isActive 
                                ? "bg-[var(--tmpl-surface)] border border-[var(--tmpl-border)] shadow-sm lg:shadow-lg" 
                                : "hover:bg-[var(--tmpl-surface)]/50 border border-transparent"
                        )}
                        onClick={() => handleTabClick(i)}
                    >
                        {/* Active Indicator Line (Desktop) */}
                        {isActive && (
                            <motion.div 
                                layoutId="active-indicator"
                                className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--tmpl-accent)] rounded-l-2xl hidden lg:block"
                            />
                        )}
                        {/* Active Indicator Line (Mobile) */}
                        {isActive && (
                            <motion.div 
                                layoutId="active-indicator-mobile"
                                className="absolute left-0 right-0 bottom-0 h-1 bg-[var(--tmpl-accent)] rounded-b-xl lg:hidden"
                            />
                        )}
                        
                        <div className="flex flex-col lg:flex-row lg:items-baseline gap-0.5 lg:gap-4 text-center lg:text-left min-w-[100px] lg:min-w-0">
                            <span className={cn(
                                "font-dm-mono text-[9px] sm:text-[11px] tracking-[0.2em] transition-colors duration-300",
                                isActive ? "text-[var(--tmpl-accent)]" : "text-[var(--tmpl-text-3)]"
                            )}>
                                {s.num}
                            </span>
                            <span className={cn(
                                "font-sans text-[0.8rem] sm:text-base whitespace-nowrap transition-colors duration-300",
                                isActive ? "text-[var(--tmpl-text)] font-medium" : "text-[var(--tmpl-text-2)] font-light group-hover:text-[var(--tmpl-text)]"
                            )}>
                                {s.name}
                            </span>
                        </div>
                    </div>
                );
            })}
          </div>

          {/* RIGHT (Details) */}
          <div className="col-span-1 lg:col-span-8 flex flex-col justify-start relative">
            <Card className="bg-[var(--tmpl-surface)] border-[var(--tmpl-border)] overflow-hidden shadow-xl lg:shadow-2xl rounded-[1.5rem] lg:rounded-[2rem] p-6 sm:p-8 md:p-12 w-full h-full relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: dir > 0 ? 15 : -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: dir > 0 ? -15 : 15 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="w-full flex flex-col h-full"
                    >
                        {/* Meta Row */}
                        <div className="flex flex-wrap items-center justify-between gap-4 lg:gap-6 mb-6 sm:mb-10">
                            <div className="font-dm-mono text-[9px] sm:text-[11px] tracking-[0.2em] text-[var(--tmpl-text-3)] uppercase flex items-center gap-2 sm:gap-4">
                                Service {activeService.num}
                                <div className="w-8 sm:w-12 h-[1px] bg-[var(--tmpl-border-hi)] hidden xs:block"></div>
                            </div>
                            
                            <div className="flex gap-2 sm:gap-3">
                                <div className="flex flex-col items-center py-2 px-3 sm:py-2.5 sm:px-5 border border-[var(--tmpl-border)] rounded-lg bg-[var(--tmpl-bg)]/50 min-w-[60px] sm:min-w-[80px]">
                                    <span className="font-dm-mono text-sm sm:text-lg font-medium text-[var(--tmpl-text)] leading-none">{activeService.clients}</span>
                                    <span className="font-dm-mono text-[8px] sm:text-[9px] tracking-[0.1em] text-[var(--tmpl-text-3)] uppercase mt-1 sm:mt-1.5">Clients</span>
                                </div>
                                <div className="flex flex-col items-center py-2 px-3 sm:py-2.5 sm:px-5 border border-[var(--tmpl-border)] rounded-lg bg-[var(--tmpl-bg)]/50 min-w-[60px] sm:min-w-[80px]">
                                    <span className="font-dm-mono text-sm sm:text-lg font-medium text-[var(--tmpl-text)] leading-none">{activeService.projects}</span>
                                    <span className="font-dm-mono text-[8px] sm:text-[9px] tracking-[0.1em] text-[var(--tmpl-text-3)] uppercase mt-1 sm:mt-1.5">Projects</span>
                                </div>
                                <div className="flex flex-col items-center py-2 px-3 sm:py-2.5 sm:px-5 border border-[var(--tmpl-border)] rounded-lg bg-[var(--tmpl-bg)]/50 min-w-[60px] sm:min-w-[80px] hidden sm:flex">
                                    <span className="font-dm-mono text-sm sm:text-lg font-medium text-[var(--tmpl-text)] leading-none">{activeService.satisfaction}</span>
                                    <span className="font-dm-mono text-[8px] sm:text-[9px] tracking-[0.1em] text-[var(--tmpl-text-3)] uppercase mt-1 sm:mt-1.5">Satisfied</span>
                                </div>
                            </div>
                        </div>

                        <h3 className="font-instrument text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--tmpl-text)] font-normal leading-[1.1] mb-4 sm:mb-5">
                            {activeService.name}
                        </h3>
                        
                        <p className="font-sans text-sm sm:text-base lg:text-lg text-[var(--tmpl-text-2)] leading-relaxed font-light max-w-[600px] mb-6">
                            {activeService.pitch}
                        </p>

                        <div className="w-8 sm:w-12 h-[1px] bg-[var(--tmpl-border)] my-4 sm:my-8"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-auto">
                            {/* Under the hood */}
                            <div>
                                <div className="font-dm-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[var(--tmpl-text-3)] uppercase mb-3 sm:mb-4">
                                    Under the hood
                                </div>
                                <p className="font-sans text-[13px] sm:text-sm text-[var(--tmpl-text-2)] leading-relaxed font-light mb-5 sm:mb-6">
                                    {activeService.techNote}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {activeService.tags.map(t => (
                                        <span key={t} className="font-dm-mono text-[9px] sm:text-[10px] tracking-[0.1em] text-[var(--tmpl-text-2)] border border-[var(--tmpl-border)] rounded-md px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[var(--tmpl-bg)]/30">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Deliverables */}
                            <div>
                                <div className="font-dm-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[var(--tmpl-text-3)] uppercase mb-3 sm:mb-4">
                                    What you get
                                </div>
                                <div className="flex flex-col gap-2 sm:gap-3">
                                    {activeService.deliverables.map((d, idx) => (
                                        <div key={idx} className="flex items-start gap-2 sm:gap-3 font-sans text-[13px] sm:text-sm text-[var(--tmpl-text-2)] leading-relaxed">
                                            <span className="text-[var(--tmpl-accent)] text-[9px] sm:text-[10px] mt-[3px] sm:mt-1">✦</span>
                                            {d}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </Card>
          </div>

        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
