'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { STYLES } from '@/lib/constants/styles';
import {
    ArrowUpRight, Github, Linkedin, Twitter, Globe, Terminal,
    Code2, User, MapPin, Calendar, Code, Instagram, Loader2
} from 'lucide-react';
import Link from 'next/link';

import Image from 'next/image';
import { PERSONAL_INFO } from '@/lib/constants/personalInfo';

const SocialIcon = ({ icon: Icon, href }: { icon: any; href: string }) => (
    <Link
        href={href}
        target="_blank"
        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-primary hover:border-primary/40 transition-all hover:scale-110"
    >
        <Icon size={16} />
    </Link>
);

const StatBlock = ({ value, label }: { value: string; label: string }) => (
    <div className="space-y-1">
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-foreground font-seona not-italic">{value}</h3>
        <p className="text-[9px] sm:text-[10px] uppercase font-black tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground/60 leading-tight">
            {label.split(' ').map((line, i) => (
                <span key={i} className="block">{line}</span>
            ))}
        </p>
    </div>
);

export default function Hero() {
    const [typedText, setTypedText] = React.useState('');
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(true);
    const fullText = "engineering intelligent systems with minimalist precision.";

    useEffect(() => {
        setMounted(true);
        let i = 0;
        const timer = setInterval(() => {
            setTypedText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(timer);
        }, 40);

        setLoading(false);
        return () => clearInterval(timer);
    }, []);

    if (loading) {
        return (
            <section className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </section>
        );
    }

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-20 w-full">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/[0.02] -z-10 blur-3xl rounded-full translate-x-1/2" />

            {/* Content Container */}
            <div className="container relative z-10 w-full px-4 sm:px-6 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Column: Text Content */}
                    <div className="lg:col-span-7 space-y-8 lg:space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-4 sm:space-y-6 md:space-y-8"
                        >

                            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[140px] font-black uppercase tracking-[-0.06em] leading-[0.85] text-foreground font-seona not-italic break-words">
                                {PERSONAL_INFO.name.split(' ')[0]}<br />
                                {PERSONAL_INFO.name.split(' ')[1]}
                            </h1>

                            <div className="space-y-3 sm:space-y-4 md:space-y-6 max-w-lg">
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground/90 uppercase tracking-tight not-italic">
                                    {PERSONAL_INFO.role}
                                </h2>
                                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-medium not-italic">
                                    Architecting <span className="text-foreground font-bold">AI/ML</span> systems and <span className="text-foreground font-bold">Full-stack</span> experiences.
                                    <span className="flex items-center gap-2 mt-4 text-base sm:text-lg text-primary/80 font-black lowercase tracking-tight font-seona not-italic">
                                        <span className="opacity-40 text-sm">↳</span>
                                        {typedText}
                                        <span className="w-1.5 h-4 bg-primary animate-pulse ml-0.5" />
                                    </span>
                                </p>
                            </div>

                            <div className="pt-3 sm:pt-4 border-t border-white/5 max-w-md">
                                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-muted-foreground/40 leading-relaxed">
                                    code as music • performance as art
                                </p>
                            </div>
                        </motion.div>

                        {/* Social Icons & Bottom Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
                        >
                            <div className="flex gap-2 sm:gap-3">
                                <SocialIcon icon={Linkedin} href={PERSONAL_INFO.socials.linkedin} />
                                <SocialIcon icon={Github} href={PERSONAL_INFO.socials.github} />
                                <SocialIcon icon={Twitter} href={PERSONAL_INFO.socials.x} />
                                <SocialIcon icon={Instagram} href={PERSONAL_INFO.socials.instagram} />
                                <SocialIcon icon={Calendar} href="https://topmate.io/sameerbagul/" />
                            </div>

                            {/* Stats DataSheet Style */}
                            <div className="flex gap-6 sm:gap-12 sm:pl-6 sm:border-l sm:border-white/10">
                                <StatBlock value="1+" label="Years of Experience" />
                                <StatBlock value="100+" label="Projects Completed" />
                                <Link
                                    href="/projects"
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 shrink-0"
                                >
                                    <ArrowUpRight size={18} />
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Hero Image Container */}
                    <div className="lg:col-span-5 mt-12 sm:mt-16 lg:mt-0 relative group">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1, ease: "circOut" }}
                            className="relative aspect-[4/5] w-full max-w-[350px] sm:max-w-[400px] lg:max-w-[450px] mx-auto z-10"
                        >
                            {/* Animated Background Rings */}
                            <div className="absolute inset-0 -m-6 sm:-m-8 border border-primary/10 rounded-[2.5rem] sm:rounded-[3rem] animate-[spin_20s_linear_infinite] opacity-40" />
                            <div className="absolute inset-0 -m-8 sm:-m-12 border border-primary/5 rounded-[3rem] sm:rounded-[4rem] animate-[spin_30s_linear_infinite_reverse] opacity-20" />


                            {/* Main Image Container */}
                            <div className="relative h-full w-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                                <Image
                                    src="/hero.jpg"
                                    alt="Sameer Bagul - Freelance Software AI Developer and Expert Engineering Educator"
                                    fill
                                    className="object-cover"
                                    priority
                                />

                                {/* Glass Overlay on Image */}
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60" />

                                {/* Bottom Info in Image */}
                                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                                            <Code className="text-white" size={14} />
                                        </div>
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                                            <Terminal className="text-white" size={14} />
                                        </div>
                                    </div>
                                    <div className="px-3 py-1 sm:px-4 sm:py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
                                        <span className="text-[8px] sm:text-[10px] font-bold text-white uppercase tracking-tighter flex items-center gap-1 sm:gap-2">
                                            <MapPin size={8} className="text-primary" /> {PERSONAL_INFO.location}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </motion.div>

                        {/* Decorative Background Blobs */}
                        <div className="absolute -top-8 sm:-top-12 -right-8 sm:-right-12 w-48 sm:w-64 h-48 sm:h-64 bg-primary/10 rounded-full blur-[80px] sm:blur-[100px] -z-10 animate-pulse" />
                        <div className="absolute -bottom-8 sm:-bottom-12 -left-8 sm:-left-12 w-48 sm:w-64 h-48 sm:h-64 bg-accent/10 rounded-full blur-[80px] sm:blur-[100px] -z-10 animate-pulse delay-700" />
                    </div>
                </div>
            </div>
        </section>
    );
}
