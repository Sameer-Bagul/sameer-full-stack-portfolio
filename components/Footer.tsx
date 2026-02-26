'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants/personalInfo';

export default function Footer() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <footer className="py-16 sm:py-20 bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 overflow-hidden w-full">
            <div className="container px-4 sm:px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
                    {/* Column 1 - Logo (3 cols) */}
                    <div className="sm:col-span-2 lg:col-span-3 space-y-4 sm:space-y-6">
                        <Link href="/" className="text-xl sm:text-2xl font-black tracking-tighter lowercase font-seona">
                            sameer <span className="text-primary">bagul</span>
                        </Link>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed opacity-80">
                            {PERSONAL_INFO.bio}
                        </p>
                    </div>

                    {/* Column 2 - Quick Links (3 cols) */}
                    <div className="sm:col-span-1 lg:col-span-3 space-y-4 sm:space-y-6">
                        <h4 className="text-xs sm:text-sm font-black lowercase tracking-widest text-primary font-seona not-italic">quick links</h4>
                        <ul className="space-y-2 sm:space-y-3">
                            <li><Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
                            <li><Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Projects</Link></li>
                            <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
                            <li><Link href="/study" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Study Material</Link></li>
                        </ul>
                    </div>

                    {/* Column 3 - Socials (3 cols) */}
                    <div className="sm:col-span-1 lg:col-span-3 space-y-4 sm:space-y-6">
                        <h4 className="text-xs sm:text-sm font-black lowercase tracking-widest text-primary font-seona not-italic">socials</h4>
                        <div className="flex gap-3 sm:gap-4">
                            <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                                <Github size={16} />
                            </a>
                            <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                                <Linkedin size={16} />
                            </a>
                            <a href={PERSONAL_INFO.socials.x} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                                <Twitter size={16} />
                            </a>
                            <a href={PERSONAL_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                                <Instagram size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Column 4 - Contact (3 cols) */}
                    <div className="sm:col-span-2 lg:col-span-3 space-y-4 sm:space-y-6">
                        <h4 className="text-xs sm:text-sm font-black lowercase tracking-widest text-primary font-seona not-italic">contact</h4>
                        <ul className="space-y-2">
                            <li className="text-sm text-muted-foreground">{PERSONAL_INFO.email}</li>
                            <li className="text-sm text-muted-foreground">+91 99999 99999</li>
                            <li className="text-sm text-muted-foreground">{PERSONAL_INFO.location}</li>
                        </ul>
                    </div>
                </div>

                <div className="pt-6 sm:pt-8 border-t border-zinc-200 dark:border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                    <p className="text-[10px] sm:text-xs text-muted-foreground text-center sm:text-left">
                        © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
                    </p>
                    <div className="flex gap-4 sm:gap-6">
                        <Link href="#" className="text-[9px] sm:text-[10px] uppercase font-bold text-muted-foreground hover:text-foreground">Privacy Policy</Link>
                        <Link href="#" className="text-[9px] sm:text-[10px] uppercase font-bold text-muted-foreground hover:text-foreground">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
