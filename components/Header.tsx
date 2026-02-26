'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';
import { useHeader } from '@/context/HeaderContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants/personalInfo';

const navItems = [
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Study', href: '/study' },
    { name: 'Resume', href: '/resume' },
];

export default function Header() {
    const { title, actions } = useHeader();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isHome = pathname === '/';
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (isMenuOpen) return;
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 50);
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setVisible(false);
            } else {
                setVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, isMenuOpen]);

    // Close menu on navigation
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Personal info is now static

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: visible ? 0 : -100 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 h-20 border-b transition-all duration-300",
                    (isHome && !scrolled && !isMenuOpen)
                        ? "bg-transparent border-transparent"
                        : "backdrop-blur-2xl bg-white/5 dark:bg-black/5 border-white/10"
                )}
            >
                <div className="w-full h-full flex items-center justify-between px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto">
                    {/* Left Section: Logo & Dynamic Title */}
                    <div className="flex items-center gap-3 sm:gap-6 min-w-0 flex-1">
                        <Link
                            href="/"
                            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary text-primary-foreground font-black text-lg sm:text-xl hover:scale-110 transition-transform shadow-xl shrink-0 z-50 overflow-hidden"
                        >
                            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
                        </Link>

                        <AnimatePresence mode="wait">
                            {title && (
                                <motion.div
                                    key={title}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="hidden sm:flex items-center gap-2 sm:gap-3 border-l border-white/10 pl-3 sm:pl-6 overflow-hidden min-w-0"
                                >
                                    <div className="w-1 h-4 sm:h-6 bg-primary/40 rounded-full shrink-0" />
                                    <span className="text-base sm:text-lg font-black lowercase tracking-tight text-foreground/80 truncate">
                                        {title}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Center Section: Navigation (Desktop) */}
                    <nav className="absolute left-1/2 -translate-x-1/2 hidden md:block">
                        <ul className="flex items-center gap-4 lg:gap-8">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "text-xs lg:text-[15px] font-black uppercase tracking-[0.15em] lg:tracking-[0.2em] transition-all",
                                            pathname.startsWith(item.href)
                                                ? "text-primary scale-105"
                                                : "text-foreground/40 hover:text-foreground/80"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Right Section: Actions & Theme Toggle */}
                    <div className="flex items-center gap-2 sm:gap-4 z-[60] shrink-0">
                        <AnimatePresence>
                            {actions && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="hidden lg:flex items-center gap-2 pr-4 border-r border-white/10"
                                >
                                    {actions}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <ThemeToggle />

                        {/* Hamburger Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 dark:bg-zinc-900/50 border border-white/10 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 z-[70] shrink-0"
                        >
                            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[40] md:hidden bg-zinc-950/95 backdrop-blur-2xl px-4 sm:px-6 pt-24 sm:pt-32 pb-6 sm:pb-10 flex flex-col justify-between overflow-y-auto"
                    >
                        <nav className="space-y-6 sm:space-y-8">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "text-4xl sm:text-5xl font-black uppercase tracking-tighter block font-seona not-italic break-words",
                                            pathname.startsWith(item.href)
                                                ? "text-primary"
                                                : "text-foreground/40 hover:text-foreground"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="border-t border-white/10 pt-6 sm:pt-8 space-y-3 sm:space-y-4"
                        >
                            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-muted-foreground/60 block">Socials & Contact</span>
                            <div className="flex gap-3 sm:gap-4">
                                <Link href={PERSONAL_INFO.socials.github} target="_blank" className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-all">
                                    <ArrowUpRight size={18} />
                                </Link>
                                <Link href={`mailto:${PERSONAL_INFO.email}`} className="px-4 sm:px-6 h-11 sm:h-12 rounded-2xl bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] sm:text-xs flex items-center justify-center flex-grow">
                                    Get in touch
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
