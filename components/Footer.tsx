'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants/personalInfo';

export default function Footer() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <footer className="pb-12 sm:pb-24 w-full">
            <div className="container px-4 sm:px-6 max-w-[1200px] mx-auto">
                <div className="w-full bg-[#0A0A0A] border border-white/10 rounded-[3.5rem] p-8 md:p-16 backdrop-blur-md shadow-2xl relative overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5FF41]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16 relative z-10">
                    {/* Column 1 - Logo (4 cols) */}
                    <div className="sm:col-span-2 lg:col-span-4 space-y-6">
                        <Link href="/" className="text-3xl sm:text-4xl font-black tracking-tighter lowercase font-seona text-white block hover:text-[#C5FF41] transition-colors duration-300">
                            sameer <span className="text-[#C5FF41]">bagul</span>
                        </Link>
                        <p className="text-sm text-zinc-400 leading-relaxed font-light max-w-sm">
                            {PERSONAL_INFO.bio}
                        </p>
                        
                        <div className="flex gap-4 pt-2">
                            <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:bg-[#C5FF41] hover:text-black hover:border-[#C5FF41] transition-all duration-300 shadow-sm text-white">
                                <Github size={20} />
                            </a>
                            <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:bg-[#C5FF41] hover:text-black hover:border-[#C5FF41] transition-all duration-300 shadow-sm text-white">
                                <Linkedin size={20} />
                            </a>
                            <a href={PERSONAL_INFO.socials.x} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:bg-[#C5FF41] hover:text-black hover:border-[#C5FF41] transition-all duration-300 shadow-sm text-white">
                                <Twitter size={20} />
                            </a>
                            <a href={PERSONAL_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:bg-[#C5FF41] hover:text-black hover:border-[#C5FF41] transition-all duration-300 shadow-sm text-white">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2 - Quick Links (4 cols) */}
                    <div className="sm:col-span-1 lg:col-span-4 space-y-6 lg:pl-10">
                        <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 font-dm-mono">Navigation</h4>
                        <ul className="space-y-4">
                            <li><Link href="/" className="text-base text-zinc-300 hover:text-[#C5FF41] transition-colors flex items-center gap-2 group"><span className="w-0 overflow-hidden group-hover:w-4 transition-all text-[#C5FF41]">→</span> Home</Link></li>
                            <li><Link href="/projects" className="text-base text-zinc-300 hover:text-[#C5FF41] transition-colors flex items-center gap-2 group"><span className="w-0 overflow-hidden group-hover:w-4 transition-all text-[#C5FF41]">→</span> All Projects</Link></li>
                            <li><Link href="/blog" className="text-base text-zinc-300 hover:text-[#C5FF41] transition-colors flex items-center gap-2 group"><span className="w-0 overflow-hidden group-hover:w-4 transition-all text-[#C5FF41]">→</span> Blog</Link></li>
                            <li><Link href="/study" className="text-base text-zinc-300 hover:text-[#C5FF41] transition-colors flex items-center gap-2 group"><span className="w-0 overflow-hidden group-hover:w-4 transition-all text-[#C5FF41]">→</span> Study Material</Link></li>
                        </ul>
                    </div>

                    {/* Column 3 - Contact (4 cols) */}
                    <div className="sm:col-span-1 lg:col-span-4 space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 font-dm-mono">Contact Details</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-base text-zinc-300 hover:text-white transition-colors block">
                                    {PERSONAL_INFO.email}
                                </a>
                            </li>
                            <li>
                                <span className="text-base text-zinc-300 block">
                                    +91 7841941033
                                </span>
                            </li>
                            <li>
                                <span className="text-base text-zinc-300 block">
                                    {PERSONAL_INFO.location}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
                    <p className="text-xs text-zinc-500 font-dm-mono tracking-widest uppercase">
                        © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-[10px] uppercase font-bold text-zinc-500 hover:text-[#C5FF41] transition-colors tracking-widest font-dm-mono">Privacy</Link>
                        <Link href="#" className="text-[10px] uppercase font-bold text-zinc-500 hover:text-[#C5FF41] transition-colors tracking-widest font-dm-mono">Terms</Link>
                    </div>
                </div>
                </div>
            </div>
        </footer>
    );
}
