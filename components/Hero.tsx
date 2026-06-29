'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight, Github, Linkedin, Twitter, Instagram, Loader2, Play
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PERSONAL_INFO } from '@/lib/constants/personalInfo';

export default function Hero() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <section className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </section>
        );
    }

    return (
        <section className="relative min-h-screen flex items-center pt-24 pb-12 w-full">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -z-10 blur-[120px] rounded-full translate-x-1/2" />
            
            <div className="container relative z-10 w-full px-4 sm:px-6 mx-auto max-w-[1400px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    
                    {/* Left Column: Profile Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-4 xl:col-span-4 flex flex-col"
                    >
                        <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 flex flex-col items-center justify-between shadow-2xl relative overflow-hidden group h-full">
                            {/* Decorative dashed lines (simulated) */}
                            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 400 600" fill="none">
                                <path d="M 0 100 Q 150 50 300 200" stroke="#F46C38" strokeWidth="2" strokeDasharray="6 6" />
                                <path d="M 100 500 Q 250 450 400 600" stroke="#F46C38" strokeWidth="2" strokeDasharray="6 6" />
                            </svg>

                            <div className="w-full flex flex-col items-center">
                                {/* Image Container */}
                                <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden mb-8">
                                    <Image
                                        src="/hero.jpg"
                                        alt="Sameer Bagul"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        priority
                                    />
                                </div>

                                <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight mb-4 text-center font-seona uppercase">
                                    Sameer Bagul
                                </h2>

                                <div className="w-8 h-8 rounded-full bg-[#F46C38] flex items-center justify-center mb-6 text-white shrink-0">
                                    <span className="text-xs font-bold">SB</span>
                                </div>

                                <p className="text-zinc-600 text-center text-sm sm:text-base font-medium max-w-[280px] mb-8 leading-relaxed">
                                    A Software Engineer who has developed countless innovative solutions.
                                </p>
                            </div>

                            {/* Social Icons */}
                            <div className="flex items-center justify-center gap-4 w-full mt-auto">
                                {[
                                    { icon: Linkedin, href: PERSONAL_INFO.socials.linkedin },
                                    { icon: Github, href: PERSONAL_INFO.socials.github },
                                    { icon: Twitter, href: PERSONAL_INFO.socials.x },
                                    { icon: Instagram, href: PERSONAL_INFO.socials.instagram }
                                ].map((social, i) => (
                                    <Link 
                                        key={i} 
                                        href={social.href}
                                        target="_blank"
                                        className="w-10 h-10 rounded-full border border-[#F46C38] text-[#F46C38] flex items-center justify-center hover:bg-[#F46C38] hover:text-white transition-colors"
                                    >
                                        <social.icon size={16} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Typography, Stats, and Cards */}
                    <div className="lg:col-span-8 xl:col-span-8 flex flex-col justify-between h-full pt-4 lg:pt-0">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="flex flex-col justify-between h-full"
                        >
                            <div className="space-y-6 lg:space-y-10">
                                {/* Massive Headings */}
                                <div className="space-y-0">
                                    <h1 className="text-[4rem] sm:text-[6rem] md:text-[7rem] lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] text-white font-seona">
                                        SOFTWARE
                                    </h1>
                                    <h1 className="text-[4rem] sm:text-[6rem] md:text-[7rem] lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] text-transparent font-seona" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.15)' }}>
                                        ENGINEER
                                    </h1>
                                </div>

                                <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-2xl font-medium leading-relaxed font-poppins">
                                    Engineering intelligent systems with minimalist precision. Architecting AI/ML systems and Full-stack experiences. Code as music • performance as art.
                                </p>

                                {/* Stats Row */}
                                <div className="flex flex-wrap items-center gap-6 md:gap-10 xl:gap-16 pt-2 lg:pt-4">
                                    <div>
                                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-1">+5</h3>
                                        <p className="text-[9px] sm:text-[10px] md:text-xs text-zinc-500 font-bold tracking-widest uppercase">YEARS OF<br/>EXPERIENCE</p>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-1">+46</h3>
                                        <p className="text-[9px] sm:text-[10px] md:text-xs text-zinc-500 font-bold tracking-widest uppercase">PROJECTS<br/>COMPLETED</p>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-1">+20</h3>
                                        <p className="text-[9px] sm:text-[10px] md:text-xs text-zinc-500 font-bold tracking-widest uppercase">WORLDWIDE<br/>CLIENTS</p>
                                    </div>
                                </div>
                            </div>

                            {/* Colored Cards Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 pt-8 lg:pt-0 mt-8 lg:mt-auto">
                                {/* Orange Card */}
                                <div className="bg-[#F46C38] rounded-[1.5rem] lg:rounded-[2rem] p-6 lg:p-8 min-h-[180px] lg:min-h-[220px] flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                                    {/* Abstract shapes inside */}
                                    <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
                                        <svg viewBox="0 0 200 200" className="absolute -top-10 -right-10 w-full h-full" fill="none">
                                            <path d="M 0 100 Q 50 150 200 100" stroke="white" strokeWidth="4" />
                                            <path d="M 0 120 Q 50 170 200 120" stroke="white" strokeWidth="4" />
                                            <path d="M 0 140 Q 50 190 200 140" stroke="white" strokeWidth="4" />
                                        </svg>
                                    </div>
                                    <div className="w-8 h-8 lg:w-10 lg:h-10 border-2 border-white/40 rounded-lg flex flex-col gap-1 items-center justify-center p-1.5 lg:p-2 mb-3 lg:mb-4">
                                        <div className="w-full h-[2px] lg:h-1 bg-white/60 rounded-full" />
                                        <div className="w-full h-[2px] lg:h-1 bg-white/60 rounded-full" />
                                        <div className="w-full h-[2px] lg:h-1 bg-white/60 rounded-full" />
                                    </div>
                                    <h3 className="text-lg lg:text-xl xl:text-2xl font-black text-white uppercase tracking-tight max-w-[180px] lg:max-w-[200px] leading-tight font-poppins">
                                        FULL-STACK MERN, NEXT.JS ARCHITECTURE
                                    </h3>
                                    <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-white flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#F46C38] transition-colors">
                                        <ArrowRight size={16} className="-rotate-45" />
                                    </div>
                                </div>

                                {/* Lime Card */}
                                <div className="bg-[#C5FF41] rounded-[1.5rem] lg:rounded-[2rem] p-6 lg:p-8 min-h-[180px] lg:min-h-[220px] flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                                    {/* Abstract shapes inside */}
                                    <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
                                        <svg viewBox="0 0 200 200" className="absolute top-0 right-0 w-full h-full" fill="none">
                                            <path d="M 0 200 L 50 50 L 100 150 L 150 0 L 200 100" stroke="black" strokeWidth="4" strokeLinejoin="round" />
                                            <path d="M 0 220 L 50 70 L 100 170 L 150 20 L 200 120" stroke="black" strokeWidth="4" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="w-8 h-8 lg:w-10 lg:h-10 border-2 border-black/20 rounded-lg flex items-start justify-start p-1 lg:p-1.5 mb-3 lg:mb-4 relative">
                                        <div className="w-2 h-2 lg:w-3 lg:h-3 bg-black/40 rounded-sm" />
                                        <div className="w-full h-[2px] lg:h-1 bg-black/40 absolute bottom-1 lg:bottom-1.5 left-0" />
                                    </div>
                                    <h3 className="text-lg lg:text-xl xl:text-2xl font-black text-black uppercase tracking-tight max-w-[200px] lg:max-w-[240px] leading-tight font-poppins">
                                        AI / ML SYSTEMS, INTELLIGENT EXPERIENCES
                                    </h3>
                                    <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-black flex items-center justify-center text-black group-hover:bg-black group-hover:text-[#C5FF41] transition-colors">
                                        <ArrowRight size={16} className="-rotate-45" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}

