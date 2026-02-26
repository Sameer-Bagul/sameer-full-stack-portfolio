'use client';

import React, { memo, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { STYLES } from '@/lib/constants/styles';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BrainCircuit,
    Smartphone,
    Cloud,
    Palette,
    Layers,
    ExternalLink,
    Rocket,
    Globe,
    Terminal,
    Sparkles,
    ArrowUpRight,
    X,
    CheckCircle2
} from 'lucide-react';

const services = [
    {
        title: "AI & Intelligence Systems",
        description: "Custom LLM integrations, RAG architectures, and smart AI tools to automate workflows and insights.",
        icon: BrainCircuit,
        iconColor: "text-purple-600 dark:text-purple-400",
        iconBg: "bg-purple-500/10",
        cardBg: "bg-purple-500/5 dark:bg-purple-500/10",
        borderClass: "border-purple-500/10 dark:border-purple-500/20",
        tools: ["RAG", "LLMs", "Vector DBs"],
        details: "Specializing in building autonomous AI agents and enterprise-grade generative AI solutions. We focus on low-latency inference and high-accuracy retrieval systems."
    },
    {
        title: "SaaS Tools Development",
        description: "Full-scale SaaS product development with robust multi-tenancy, billing, and scalable backend architectures.",
        icon: Rocket,
        iconColor: "text-orange-600 dark:text-orange-400",
        iconBg: "bg-orange-500/10",
        cardBg: "bg-orange-500/5 dark:bg-orange-500/10",
        borderClass: "border-orange-500/10 dark:border-orange-500/20",
        tools: ["Auth", "Payments", "Scalability"],
        details: "Building production-ready SaaS platforms with Stripe integration, multi-tenant database schemas, and optimized AWS/GCP deployments."
    },
    {
        title: "Web Development",
        description: "Modern, high-performance web applications built for speed, SEO, and exceptional user experiences.",
        icon: Globe,
        iconColor: "text-blue-600 dark:text-blue-400",
        iconBg: "bg-blue-500/10",
        cardBg: "bg-blue-500/5 dark:bg-blue-500/10",
        borderClass: "border-blue-500/10 dark:border-blue-500/20",
        tools: ["React", "Next.js", "TypeScript"],
        details: "Crafting pixel-perfect, responsive web experiences using the latest frontend technologies. Focus on Core Web Vitals and accessible design."
    },
    {
        title: "App Development",
        description: "Seamless cross-platform mobile apps for iOS and Android using unified codebases.",
        icon: Smartphone,
        iconColor: "text-emerald-600 dark:text-emerald-400",
        iconBg: "bg-emerald-500/10",
        cardBg: "bg-emerald-500/5 dark:bg-emerald-500/10",
        borderClass: "border-emerald-500/10 dark:border-emerald-500/20",
        tools: ["React Native", "Expo", "Native APIs"],
        details: "Developing high-performance mobile applications with React Native. Expertise in native module integration and smooth gesture-based interactions."
    },
    {
        title: "Desktop Applications",
        description: "Powerful cross-platform desktop tools built with Electron and Tauri for native-level performance.",
        icon: Terminal,
        iconColor: "text-indigo-600 dark:text-indigo-400",
        iconBg: "bg-indigo-500/10",
        cardBg: "bg-indigo-500/5 dark:bg-indigo-500/10",
        borderClass: "border-indigo-500/10 dark:border-indigo-500/20",
        tools: ["Electron", "Tauri", "Native Ops"],
        details: "Engineering desktop tools that bridge the gap between web and native system capabilities, featuring offline-first data and local file system access."
    },
    {
        title: "QA & Automation",
        description: "End-to-end testing and workflow automation to ensure flawless releases and minimal manual work.",
        icon: Layers,
        iconColor: "text-red-600 dark:text-red-400",
        iconBg: "bg-red-500/10",
        cardBg: "bg-red-500/5 dark:bg-red-500/10",
        borderClass: "border-red-500/10 dark:border-red-500/20",
        tools: ["Playwright", "Python", "n8n", "Make"],
        details: "Streamlining development with robust CI/CD pipelines and automated browser testing using Playwright. Automating business processes with n8n."
    },
    {
        title: "UI/UX & Design",
        description: "Premium product design and design systems focused on aesthetics, accessibility, and user psychology.",
        icon: Palette,
        iconColor: "text-pink-600 dark:text-pink-400",
        iconBg: "bg-pink-500/10",
        cardBg: "bg-pink-500/5 dark:bg-pink-500/10",
        borderClass: "border-pink-500/10 dark:border-pink-500/20",
        tools: ["Figma", "Design Systems", "Prototyping"],
        details: "Designing intuitive interfaces that prioritize user needs. Building scalable design systems that bridge the gap between design and code."
    },
    {
        title: "DevOps & Infrastructure",
        description: "Helping DevOps teams with CI/CD pipelines, cloud infrastructure, and team workflow optimization.",
        icon: Cloud,
        iconColor: "text-cyan-600 dark:text-cyan-400",
        iconBg: "bg-cyan-500/10",
        cardBg: "bg-cyan-500/5 dark:bg-cyan-500/10",
        borderClass: "border-cyan-500/10 dark:border-cyan-500/20",
        tools: ["Docker", "K8s", "CI/CD"],
        details: "Securing and scaling infrastructure using containerization and orchestration. Expertise in infrastructure-as-code and cloud-native solutions."
    },
    {
        title: "Career Guidance",
        description: "One-on-one mentorship, career roadmaps, and industry insights to help you grow as an engineer.",
        icon: Sparkles,
        iconColor: "text-yellow-600 dark:text-yellow-400",
        iconBg: "bg-yellow-500/10",
        cardBg: "bg-yellow-500/5 dark:bg-yellow-500/10",
        borderClass: "border-yellow-500/10 dark:border-yellow-500/20",
        tools: ["Mentorship", "Roadmaps", "Topmate"],
        link: "https://topmate.io/sameerbagul/",
        details: "Providing actionable guidance for aspiring developers. Helping you navigate the tech landscape, from learning paths to interview preparation."
    },
];

type Service = typeof services[number];
const ServicePopup = ({ service, onClose }: { service: Service; onClose: () => void }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-100 flex items-center justify-center px-4 bg-zinc-950/60 backdrop-blur-xl"
        onClick={onClose}
    >
        <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-xl bg-white dark:bg-zinc-950 rounded-4xl md:rounded-[2.5rem] p-6 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Background Accent */}
            <div className={cn("absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-[0.15] blur-3xl", service.iconBg)} />

            <button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center hover:scale-110 transition-transform group z-20"
            >
                <X size={20} className="text-muted-foreground group-hover:text-foreground" />
            </button>

            <div className="relative z-10 space-y-6 md:space-y-8">
                <div className={cn("inline-flex p-4 md:p-5 rounded-2xl md:rounded-3xl transform rotate-3", service.iconBg)}>
                    {service.icon && (
                        <service.icon className={"w-10 h-10 md:w-14 md:h-14 " + (service.iconColor || "")} />
                    )}
                </div>

                <div className="space-y-3 md:space-y-4">
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground font-seona not-italic uppercase">
                        {service.title}
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium">
                        {service.description}
                    </p>
                </div>

                <div className="p-4 md:p-6 bg-zinc-50 dark:bg-white/2 rounded-2xl border border-zinc-200/50 dark:border-white/5">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mb-3">Service Deep-dive</h4>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                        {service.details}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 md:gap-3">
                    {service.tools.map((tool: string) => (
                        <div key={tool} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700/50 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            <CheckCircle2 size={12} className="text-primary/60" />
                            {tool}
                        </div>
                    ))}
                </div>

                {service.link && (
                    <Link
                        href={service.link}
                        target="_blank"
                        className="w-full py-4 rounded-xl md:rounded-2xl bg-primary text-primary-foreground text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    >
                        Book Strategy Session <ExternalLink size={16} />
                    </Link>
                )}
            </div>
        </motion.div>
    </motion.div>
);

const Services = memo(() => {
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    return (
        <section className={cn(STYLES.section, "bg-zinc-50 dark:bg-zinc-950/20 py-16 sm:py-20 overflow-hidden w-full")}>
            <div className={cn(STYLES.container, "px-4 sm:px-6")}>
                <div className="mb-12 sm:mb-16 text-center">
                    <h2 className={cn(STYLES.heading, "text-3xl sm:text-4xl md:text-6xl")}>Services — What I build</h2>
                    <p className={cn(STYLES.subheading, "text-sm sm:text-base")}>Turning complex requirements into seamless digital products</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                    {services.map((service, index) => {
                        // Extract hex color from borderClass using regex (e.g., border-purple-500/10)
                        let borderColor = '#a1a1aa';
                        const match = service.borderClass?.match(/border-([a-z]+)-(\d+)(?:\/\d+)?/);
                        if (match) {
                            const colorMap: Record<string, string> = {
                                purple: '#a78bfa',
                                orange: '#fdba74',
                                blue: '#60a5fa',
                                emerald: '#34d399',
                                indigo: '#818cf8',
                                red: '#f87171',
                                pink: '#f472b6',
                                cyan: '#22d3ee',
                                yellow: '#fde047',
                            };
                            borderColor = colorMap[match[1]] || borderColor;
                        }
                        return (
                            <div key={index} className="relative h-full">
                                <Card
                                    onClick={() => setSelectedService(service)}
                                    className={cn(
                                        "p-4 sm:p-7 flex flex-col justify-between transition-all duration-300 group overflow-visible relative cursor-pointer border-none h-full",
                                        service.cardBg,
                                        "hover:scale-[1.02] hover:shadow-xl dark:hover:shadow-primary/5 shadow-sm"
                                    )}
                                >
                                    <div className="absolute -top-2 sm:-top-6 -right-2 sm:-right-6 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-[0.08] dark:group-hover:opacity-[0.12] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 pointer-events-none">
                                        {service.icon && (
                                            <service.icon className="w-24 h-24 sm:w-48 sm:h-48" />
                                        )}
                                    </div>
                                    <div className="flex flex-col h-full relative z-20">
                                        <div className={cn("inline-flex p-2.5 sm:p-4 rounded-lg sm:rounded-2xl mb-3 sm:mb-6 self-start transform group-hover:scale-110 transition-transform duration-300", service.iconBg)}>
                                            {service.icon && (
                                                <service.icon className={"w-5 h-5 sm:w-8 sm:h-8 " + (service.iconColor || "")} />
                                            )}
                                        </div>
                                        <div className="grow">
                                            <h3 className="text-sm sm:text-2xl font-extrabold mb-1.5 sm:mb-3 tracking-tight text-foreground uppercase font-seona not-italic leading-tight">
                                                {service.title}
                                            </h3>
                                            <p className="text-[10px] sm:text-lg font-semibold leading-normal sm:leading-relaxed text-muted-foreground/80 mb-4 sm:mb-7 line-clamp-2 sm:line-clamp-none">
                                                {service.description}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {service.tools.map((tool) => (
                                                <span key={tool} className="text-[10px] uppercase tracking-widest font-black px-2 py-1 rounded-md bg-zinc-900/5 dark:bg-zinc-100/5 text-muted-foreground/80">
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>

            <AnimatePresence>
                {selectedService && (
                    <ServicePopup
                        service={selectedService}
                        onClose={() => setSelectedService(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
});

Services.displayName = 'Services';

export default Services;
