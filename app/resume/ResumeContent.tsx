'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { STYLES } from '@/lib/constants/styles';
import { cn } from '@/lib/utils';
import {
    Download, Mail, Phone, MapPin, Globe,
    Briefcase, GraduationCap, Award, Code,
    Github, Linkedin, Braces, Layout, Server, Cloud, Brain, Wrench, ExternalLink,
    Terminal, Sparkles, CheckCircle2, ChevronRight, Share2, Loader2, BrainCircuit
} from 'lucide-react';
import Link from 'next/link';

import { usePortfolio } from '@/context/PortfolioContext';

// ─── Data ────────────────────────────────────────────────────────────────────

const education = [
    {
        role: 'B.Tech – Information Technology',
        company: 'PES Modern College of Engineering, Pune',
        period: 'Nov 2022 – June 2026',
        color: 'from-purple-500 to-pink-500',
        bullets: [
            'CGPA: 8.21 / 10',
            'Relevant Coursework: Data Structures, Algorithms, Machine Learning, Full Stack Development, Software Engineering.',
            'Technical Lead of APP Club — mentored 200+ students and guided multiple projects to completion.',
            'Active participant in hackathons and technical competitions.',
        ],
    },
];

const contact = [
    { icon: Mail, label: 'Contact via Email', value: 'sameerbagul2004@gmail.com', href: 'mailto:sameerbagul2004@gmail.com', color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { icon: Linkedin, label: 'LinkedIn Profile', value: '@sameer-bagul', href: 'https://linkedin.com/in/sameer-bagul', color: 'text-[#0077B5]', bgColor: 'bg-[#0077B5]/10' },
    { icon: Github, label: 'GitHub Repository', value: '@Sameer-Bagul', href: 'https://github.com/Sameer-Bagul', color: 'text-zinc-900 dark:text-white', bgColor: 'bg-zinc-900/10 dark:bg-white/10' },
];

function Trophy(props: any) {
    return <Award {...props} />;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const GlassCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <Card className={cn(
        "bg-white/5 dark:bg-zinc-950/40 backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-[2rem] overflow-hidden",
        className
    )}>
        {children}
    </Card>
);

const TimelineItem = ({ role, company, period, bullets, color, index }: any) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="relative pl-12 md:pl-16 pb-12 last:pb-0"
    >
        {/* Timeline Line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/10 to-transparent" />

        {/* Timeline Dot */}
        <div className={cn(
            "absolute left-[1.125rem] md:left-[1.625rem] top-1 w-6 h-6 rounded-full border-4 border-background flex items-center justify-center bg-gradient-to-br shadow-xl z-10",
            color
        )}>
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        </div>

        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                    <h3 className="text-xl md:text-2xl font-black tracking-tight font-seona not-italic uppercase">{role}</h3>
                    <p className="text-sm font-black text-primary/80 uppercase tracking-widest">{company}</p>
                </div>
                <span className="inline-flex px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-widest text-primary shrink-0 w-fit">
                    {period}
                </span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bullets.map((b: string, i: number) => (
                    <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-3 group">
                        <CheckCircle2 size={14} className="text-primary/40 group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                        <span>{b}</span>
                    </li>
                ))}
            </ul>
        </div>
    </motion.div>
);

const SkillBar = ({ name, icon: Icon, color, bgColor, skills }: any) => (
    <GlassCard className="p-6 group hover:border-primary/20 transition-all duration-500">
        <div className="flex items-center gap-4 mb-6">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", bgColor, color)}>
                <Icon size={24} />
            </div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em]">{name}</h4>
        </div>
        <div className="flex flex-wrap gap-2">
            {skills.map((s: string) => (
                <span key={s} className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/5 text-[10px] font-black uppercase tracking-wider text-muted-foreground hover:text-primary hover:border-primary/20 transition-all">
                    {s}
                </span>
            ))}
        </div>
    </GlassCard>
);

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ResumeContent() {
    const { experience: experiences, achievements, skills, loading } = usePortfolio();
    const [skillCategories, setSkillCategories] = React.useState<any[]>([]);

    React.useEffect(() => {
        if (skills && skills.length > 0) {
            // Categorize skills
            const categories: any = {};
            const categoryIcons: any = {
                'Languages': { icon: Braces, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
                'Frameworks': { icon: Layout, color: 'text-violet-500', bgColor: 'bg-violet-500/10' },
                'DevOps': { icon: Brain, color: 'text-rose-500', bgColor: 'bg-rose-500/10' },
                'AI': { icon: BrainCircuit, color: 'text-purple-500', bgColor: 'bg-purple-500/10' }
            };

            skills.forEach(skill => {
                const cat = skill.category || 'Other';
                if (!categories[cat]) {
                    categories[cat] = {
                        name: cat,
                        icon: categoryIcons[cat]?.icon || Code,
                        color: categoryIcons[cat]?.color || 'text-zinc-500',
                        bgColor: categoryIcons[cat]?.bgColor || 'bg-zinc-500/10',
                        skills: []
                    };
                }
                categories[cat].skills.push(skill.name);
            });

            setSkillCategories(Object.values(categories));
        }
    }, [skills]);

    const experienceColors = [
        'from-blue-500 to-indigo-500',
        'from-emerald-500 to-teal-500',
        'from-orange-500 to-rose-500',
        'from-purple-500 to-pink-500'
    ];

    if (loading) {
        return (
            <div className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background relative selection:bg-primary selection:text-primary-foreground">
            {/* Background Orbs */}
            <div className="fixed inset-0 overflow-hidden -z-10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <main className="container mx-auto px-6 pt-32 pb-24 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6 max-w-2xl"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
                            <Sparkles size={14} className="text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Resume 2024/2025</span>
                        </div>
                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] font-seona not-italic uppercase">
                            Engineer <br />
                            <span className="text-primary">& Creator</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                            Architecting digital futures through <span className="text-foreground font-black">AI-powered</span> systems and <span className="text-foreground font-black">Full-stack</span> engineering. Based in Pune, India.
                        </p>
                    </motion.div>

                    <div className="flex flex-col gap-4 w-full md:w-auto">
                        <div className="flex gap-3">
                            <Button size="lg" className="flex-1 md:flex-none h-14 rounded-2xl px-8 font-black uppercase tracking-widest text-xs gap-2 shadow-2xl shadow-primary/20" asChild>
                                <a href="/sameerbagul-resume.pdf" download>
                                    <Download size={16} /> Download CV
                                </a>
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 w-14 rounded-2xl p-0 flex items-center justify-center" asChild>
                                <Link href="https://linkedin.com/in/sameer-bagul" target="_blank">
                                    <Share2 size={20} />
                                </Link>
                            </Button>
                        </div>
                        <GlassCard className="p-4 flex items-center gap-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-black text-xs">
                                        {i === 1 ? 'S' : i === 2 ? 'B' : '+'}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Available for</p>
                                <p className="text-xs font-black uppercase">Full-time roles</p>
                            </div>
                        </GlassCard>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Timeline */}
                    <div className="lg:col-span-8 space-y-16">
                        {/* Experience */}
                        <section>
                            <div className="flex items-center gap-4 mb-12">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Briefcase size={24} />
                                </div>
                                <h2 className="text-4xl font-black uppercase tracking-tight font-seona not-italic">Experience</h2>
                            </div>
                            <div className="space-y-0">
                                {experiences.map((exp, i) => (
                                    <TimelineItem
                                        key={exp._id}
                                        role={exp.role}
                                        company={exp.company}
                                        period={exp.duration}
                                        bullets={exp.bullets}
                                        color={experienceColors[i % experienceColors.length]}
                                        index={i}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Education */}
                        <section>
                            <div className="flex items-center gap-4 mb-12">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <GraduationCap size={24} />
                                </div>
                                <h2 className="text-4xl font-black uppercase tracking-tight font-seona not-italic">Education</h2>
                            </div>
                            <div className="space-y-0">
                                {education.map((edu, i) => (
                                    <TimelineItem key={i} {...edu} index={i} color="from-purple-500 to-pink-500" />
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Minimalistic Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Unified Expertise Card */}
                        <GlassCard className="p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <Code size={20} className="text-primary" />
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground/60">Expertise</h3>
                            </div>
                            <div className="space-y-8">
                                {skillCategories.map((cat, i) => (
                                    <div key={i} className="group">
                                        <div className="flex items-center gap-3 mb-4">
                                            <cat.icon size={16} className={cn("transition-colors", cat.color)} />
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">{cat.name}</h4>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {cat.skills.map((s: string) => (
                                                <span key={s} className="px-2.5 py-1 rounded-lg bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-white/5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/80 hover:text-primary hover:border-primary/20 transition-all cursor-default">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        {/* Achievements - More Compact */}
                        <GlassCard className="p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <Award size={20} className="text-primary" />
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground/60">Honors</h3>
                            </div>
                            <div className="space-y-6">
                                {achievements.map((ach, i) => (
                                    <div key={ach._id} className="flex gap-4 group items-start">
                                        <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                            <Trophy size={14} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black uppercase tracking-tight leading-snug group-hover:text-primary transition-colors">{ach.title}</p>
                                            <p className="text-[9px] text-muted-foreground font-medium mt-0.5">{ach.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        {/* Unified Contact Card */}
                        <GlassCard className="p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <Share2 size={20} className="text-primary" />
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground/60">Connect</h3>
                            </div>
                            <div className="space-y-3">
                                {contact.map((cta, i) => (
                                    <Link
                                        key={i}
                                        href={cta.href}
                                        target="_blank"
                                        className="flex items-center justify-between p-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-all duration-300 group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110",
                                                cta.bgColor, 
                                                cta.color
                                            )}>
                                                <cta.icon size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">{cta.label}</p>
                                                <p className="text-[11px] font-bold opacity-80">{cta.value}</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </main>
        </div>
    );
}
