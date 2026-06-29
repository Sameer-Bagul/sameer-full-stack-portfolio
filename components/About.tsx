'use client';

import React, { memo, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { STYLES } from '@/lib/constants/styles';
import { cn } from '@/lib/utils';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import {
    Briefcase,
    Code2,
    Flame,
    Clock,
    Globe2,
    Linkedin,
    MapPin,
    Trophy,
    Loader2,
    ArrowUpRight,
    Zap,
    Coffee,
    Cpu,
    Terminal,
    Database
} from 'lucide-react';
import Image from 'next/image';
import { PERSONAL_INFO } from '@/lib/constants/personalInfo';

const BentoStatCard = memo(({ value, label, colorClass, icon: Icon, delay = 0 }: { value: string, label: string, colorClass: string, icon: React.ElementType, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="h-full"
    >
        <Card className={cn(
            "p-6 h-full flex flex-col justify-center items-center text-center space-y-2 rounded-[2.5rem] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden",
            colorClass
        )}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Icon className="w-5 h-5 opacity-40 group-hover:scale-125 group-hover:opacity-100 transition-all duration-500 z-10" />
            <div className="flex flex-col z-10">
                <span className="text-5xl font-black group-hover:scale-110 transition-transform duration-500 tracking-tighter not-italic font-seona">{value}</span>
                <span className="opacity-60 font-black uppercase text-[10px] tracking-[0.2em] font-dm-mono not-italic mt-2">{label}</span>
            </div>
        </Card>
    </motion.div>
));

const LiveClock = memo(() => {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const istTime = time ? new Date(time.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })) : null;

    return (
        <div className="flex flex-col items-center justify-center">
            <span className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-white tabular-nums not-italic font-seona" suppressHydrationWarning>
                {istTime ? istTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '--:--:--'}
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#F46C38] mt-2 font-dm-mono not-italic">IST • INDIA</span>
        </div>
    );
});

type GitHubData = { public_repos: number; followers: number; public_gists: number; };

const useGitHubStats = (username: string) => {
    const [data, setData] = useState<GitHubData | null>(null);
    useEffect(() => {
        fetch(`https://api.github.com/users/${username}`)
            .then(r => r.json())
            .then(setData)
            .catch(() => null);
    }, [username]);
    return data;
};

const GitHubTile = memo(({ mounted, resolvedTheme }: { mounted: boolean; resolvedTheme: string | undefined }) => {
    const stats = useGitHubStats('sameer-bagul');

    return (
        <Card className="px-4 py-6 bg-transparent border border-white/10 rounded-[2.5rem] h-full flex flex-col justify-between overflow-hidden relative group hover:bg-white/5 transition-colors duration-500 shadow-xl">
            {/* Header row */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#C5FF41] flex items-center gap-2 font-dm-mono">
                    <div className="w-2 h-2 rounded-full bg-[#C5FF41] animate-pulse shadow-[0_0_10px_rgba(197,255,65,0.5)]" />
                    Contributions
                </h3>
                {/* Mini stats */}
                {stats && (
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center group-hover:scale-110 transition-transform duration-500">
                            <span className="text-xs font-black text-white tabular-nums font-seona">{stats.public_repos}</span>
                            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 font-dm-mono">Repos</span>
                        </div>
                        <div className="w-px h-6 bg-white/10" />
                        <div className="flex flex-col items-center group-hover:scale-110 transition-transform duration-500">
                            <span className="text-xs font-black text-white tabular-nums font-seona">{stats.followers}</span>
                            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 font-dm-mono">Followers</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Calendar */}
            <div className="w-full flex-1 flex items-center justify-center overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                {mounted ? (
                    <div className="w-full overflow-x-auto no-scrollbar flex justify-center items-center">
                        <div className="min-w-fit pr-4">
                            <GitHubCalendar
                                username="sameer-bagul"
                                fontSize={10}
                                blockSize={8}
                                blockMargin={3}
                                colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'}
                                theme={{
                                    light: ['#f4f4f5', '#C5FF41'],
                                    dark: ['#1c1a19', '#C5FF41'],
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-[120px] animate-pulse bg-white/5 rounded-xl flex items-center justify-center text-[10px] text-zinc-500 font-black uppercase tracking-widest font-dm-mono">
                        Syncing Graph...
                    </div>
                )}
            </div>
        </Card>
    );
});

const MatrixRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Parent container size
        const parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        }

        const letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789$+-*/=%\"\'#&_(),.;:?!\\|{}<>[]^~'.split('');
        const fontSize = 10;
        const columns = Math.ceil(canvas.width / fontSize);

        const drops: number[] = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, .1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillStyle = '#C5FF41'; // Using the brand neon green instead of #0f0
                ctx.font = `${fontSize}px monospace`;
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        const handleResize = () => {
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full" 
            style={{ borderRadius: '2.5rem' }} 
        />
    );
};

const MusicTile = () => {
    const [track, setTrack] = useState<any>(null);

    useEffect(() => {
        const fetchTrack = async () => {
            try {
                const res = await fetch('/api/lastfm');
                if (res.ok) {
                    const data = await res.json();
                    setTrack(data);
                }
            } catch (e) {}
        };
        fetchTrack();
        const interval = setInterval(fetchTrack, 30000); // Check every 30s
        return () => clearInterval(interval);
    }, []);

    return (
        <Card className="p-6 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] h-full relative overflow-hidden group shadow-[0_0_30px_rgba(255,255,255,0.02)] hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/50 to-transparent pointer-events-none" />
            
            <div className="flex flex-col h-full relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start w-full mb-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C5FF41] font-dm-mono mb-1 flex items-center gap-2">
                            {track?.isPlaying ? (
                                <>
                                    <span className="relative flex h-2 w-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5FF41] opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5FF41]"></span>
                                    </span>
                                    Now Playing
                                </>
                            ) : (
                                'Recently Played'
                            )}
                        </span>
                        <span className="text-[8px] font-bold text-zinc-500 tracking-widest uppercase">Last.fm Scrobble</span>
                    </div>
                    {track?.isPlaying ? (
                        <div className="flex gap-[3px] items-end h-4">
                            <div className="w-1 h-2 bg-[#C5FF41] animate-[pulse_1s_ease-in-out_infinite]" />
                            <div className="w-1 h-4 bg-[#C5FF41] animate-[pulse_1s_ease-in-out_infinite_0.2s]" />
                            <div className="w-1 h-3 bg-[#C5FF41] animate-[pulse_1s_ease-in-out_infinite_0.4s]" />
                        </div>
                    ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-white/10" />
                    )}
                </div>

                {/* Content */}
                {track ? (
                    <div className="flex items-center mt-6">
                        {/* Album & Vinyl Container */}
                        <div className="relative w-24 h-24 shrink-0 cursor-pointer group/vinyl">
                            {/* Vinyl Record */}
                            <div className={cn(
                                "absolute top-0 right-0 w-24 h-24 bg-[#050505] rounded-full border border-zinc-800 shadow-2xl flex items-center justify-center transition-all duration-700 ease-out",
                                track.isPlaying ? "translate-x-12 animate-[spin_4s_linear_infinite]" : "translate-x-4",
                                "group-hover/vinyl:translate-x-14"
                            )}>
                                {/* Grooves */}
                                <div className="absolute inset-1 rounded-full border border-white/5" />
                                <div className="absolute inset-3 rounded-full border border-white/5" />
                                <div className="absolute inset-6 rounded-full border border-white/5" />
                                {/* Center Label */}
                                <div className="w-8 h-8 rounded-full overflow-hidden relative border border-zinc-800">
                                    <img src={track.image} alt="label" className="w-full h-full object-cover" />
                                    {/* Center Hole */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#0a0a0a] rounded-full border border-black/50" />
                                </div>
                            </div>
                            
                            {/* Album Cover Sleeve */}
                            <div className="relative z-10 w-24 h-24 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-white/10 bg-zinc-900 group-hover/vinyl:scale-105 transition-transform duration-500">
                                <img src={track.image} alt={track.album} className="w-full h-full object-cover" />
                            </div>
                        </div>

                        {/* Track Info */}
                        <div className="flex flex-col overflow-hidden pl-16 md:pl-20">
                            <a href={track.url} target="_blank" rel="noreferrer" className="text-xl md:text-2xl font-black uppercase tracking-tight font-seona text-white truncate hover:text-[#C5FF41] transition-colors leading-none mb-2">
                                {track.name}
                            </a>
                            <span className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest font-dm-mono truncate mb-1">
                                {track.artist}
                            </span>
                            <span className="text-[8px] md:text-[10px] text-zinc-600 uppercase tracking-wider font-dm-mono truncate">
                                {track.album}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-24 mt-6">
                        <Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
                    </div>
                )}
            </div>
        </Card>
    );
};

export default function About() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="py-24 flex items-center justify-center bg-transparent">
                <Loader2 className="w-10 h-10 animate-spin text-[#C5FF41]" />
            </div>
        );
    }

    return (
        <section className="py-24 sm:py-32 w-full border-t border-white/5">
            <div className="container px-4 sm:px-6 max-w-[1200px] mx-auto">


                {/* Mobile Layout */}
                <div className="md:hidden space-y-4">
                    {/* ... Mobile layout remains mostly same but with updated colors ... */}
                    <div className="relative group aspect-square w-full max-w-[350px] mx-auto">
                        <div className="absolute inset-0 bg-[#C5FF41]/20 rounded-[2.5rem] rotate-3 group-hover:rotate-0 transition-transform duration-700 blur-xl" />
                        <div className="w-full h-full bg-transparent rounded-[2.5rem] relative z-10 flex items-center justify-center border border-white/10 shadow-2xl overflow-hidden">
                            <Image
                                src="/about.png"
                                alt={PERSONAL_INFO.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#151312]/80 to-transparent" />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4 p-8 bg-transparent border border-white/10 rounded-[2.5rem] shadow-xl">
                        <h2 className="text-4xl leading-tight text-white font-seona uppercase tracking-tighter not-italic">
                            Building Digital Excellence
                        </h2>
                        <p className="text-sm text-zinc-400 leading-relaxed font-light">
                            {PERSONAL_INFO.bio}
                        </p>
                    </div>
                </div>

                {/* Desktop-Only: Full Bento Grid */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 md:grid-rows-6 md:h-[850px]">
                    
                    {/* Tile 1: The Manifesto */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-8 md:row-span-2 flex flex-col justify-center space-y-6 p-12 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-colors duration-500 shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F46C38]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#F46C38]/20 transition-colors duration-700"></div>
                        <h2 className="text-left leading-none m-0 text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-seona uppercase tracking-tighter text-white relative z-10">
                            Architecting Digital Bridges
                        </h2>
                        <p className="text-left leading-relaxed text-zinc-400 text-lg font-light relative z-10 max-w-2xl font-poppins">
                            {PERSONAL_INFO.bio}
                        </p>
                    </motion.div>

                    {/* Tile 2: Orbusys Founder (Image Tile) */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-4 md:row-span-4 md:col-start-9 md:row-start-1 relative group block cursor-pointer"
                    >
                        <Link href="https://orbusys.sameerbagul.com" target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                            <div className="absolute inset-0 bg-[#F46C38]/20 rounded-[2.5rem] rotate-2 group-hover:rotate-0 transition-transform duration-700 blur-sm" />
                            <Card className="w-full h-full bg-[#151312] rounded-[2.5rem] relative z-10 flex flex-col items-center justify-center border border-white/10 shadow-2xl overflow-hidden group-hover:border-[#F46C38]/50 transition-colors duration-500 p-8">
                                <div className="absolute inset-0 opacity-20 pointer-events-none">
                                    <svg className="absolute w-full h-full" viewBox="0 0 200 200" fill="none">
                                        <circle cx="100" cy="100" r="80" stroke="#F46C38" strokeWidth="2" strokeDasharray="4 4" className="animate-[spin_10s_linear_infinite]" />
                                        <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="1" strokeDasharray="2 2" className="animate-[spin_15s_linear_infinite_reverse]" />
                                    </svg>
                                </div>
                                
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-[#F46C38] to-[#C5FF41] rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(244,108,56,0.3)] group-hover:shadow-[0_0_50px_rgba(244,108,56,0.6)] transition-shadow duration-500">
                                        <span className="text-4xl font-black text-black font-seona uppercase">O</span>
                                    </div>
                                    <h3 className="text-3xl font-black text-white uppercase tracking-widest font-seona mb-2">Orbusys</h3>
                                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#F46C38] font-dm-mono">Founder & CEO</p>
                                </div>
                                
                                <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 backdrop-blur-sm">
                                    <div className="flex items-center gap-2 text-white font-black uppercase tracking-widest text-sm font-dm-mono">
                                        <span>Let's Build</span>
                                        <ArrowUpRight className="w-5 h-5 text-[#F46C38]" />
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </motion.div>

                    {/* Tile 3: AI Architect (Swapped from Tile 7) */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="md:col-span-2 md:col-start-1 md:row-start-3 h-full"
                    >
                        <Card className="p-4 sm:p-6 bg-[#C5FF41] text-[#151312] border-none rounded-[2.5rem] h-full flex flex-col justify-center relative overflow-hidden group hover:shadow-[0_0_40px_rgba(197,255,65,0.4)] transition-shadow">
                            <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-125 transition-transform duration-500">
                                <Cpu className="w-20 h-20 text-[#151312]" />
                            </div>
                            <h4 className="text-xl font-black uppercase tracking-tight font-seona relative z-10 leading-none">AI / ML<br/>Architect</h4>
                            <span className="text-[9px] font-black uppercase tracking-widest text-[#151312]/60 mt-2 font-dm-mono relative z-10">Neural Networks</span>
                        </Card>
                    </motion.div>

                    {/* Tile 4: MCU Superfan */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="md:col-span-2 md:row-span-2 md:col-start-3 md:row-start-3 h-full"
                    >
                        <Card className="w-full h-full rounded-[2.5rem] relative overflow-hidden border-none shadow-2xl p-0">
                            <Image
                                src="/marvel.jpg"
                                alt="Marvel"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </Card>
                    </motion.div>

                    {/* Tile 5: Matrix Rain */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-1 md:row-span-2 md:col-start-5 md:row-start-3 h-full"
                    >
                        <Card className="p-0 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] h-full relative overflow-hidden group shadow-[0_0_30px_rgba(197,255,65,0.05)] hover:shadow-[0_0_40px_rgba(197,255,65,0.15)] transition-shadow duration-500">
                            <MatrixRain />
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-50" />
                        </Card>
                    </motion.div>

                    {/* Tile 6: Vertical Quote */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="md:col-span-1 md:row-span-4 md:col-start-6 md:row-start-3 h-full"
                    >
                        <Card className="py-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col items-center justify-between group h-full relative overflow-hidden text-center hover:bg-white/10 transition-colors duration-500 shadow-xl">
                            <div className="w-3 h-3 rounded-full bg-[#F46C38] animate-pulse shadow-[0_0_15px_rgba(244,108,56,0.8)]" />
                            <div className="flex flex-col items-center justify-center origin-center -rotate-90 whitespace-nowrap min-w-[250px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <span className="text-xl font-bold tracking-widest text-[#e8e8e8] font-sans">
                                    विद्या ददाति विनयं विनयाद् याति पात्रताम्।
                                </span>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Tile 7: Merged Arch Linux Badge */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="md:col-span-2 md:row-span-2 md:col-start-7 md:row-start-3 h-full"
                    >
                        <Card className="w-full h-full rounded-[2.5rem] relative overflow-hidden border-none shadow-2xl p-0 group cursor-pointer hover:shadow-[0_0_40px_rgba(226,54,54,0.3)] transition-shadow">
                            <Image
                                src="/arch.jpg"
                                alt="Arch Linux"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                            <div className="absolute bottom-6 left-6 z-10 flex flex-col gap-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-2 h-2 rounded-full bg-[#E23636] animate-pulse shadow-[0_0_10px_rgba(226,54,54,0.8)]" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#E23636] font-dm-mono drop-shadow-lg leading-tight">I use Arch,<br/>btw</span>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Tile 8: Global Base */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="md:col-span-2 md:col-start-1 md:row-start-4 h-full"
                    >
                        <Card className="p-6 bg-white/5 border border-white/10 rounded-[2.5rem] h-full flex flex-col justify-between group overflow-hidden relative shadow-xl hover:bg-white/10 transition-colors">
                            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <path d="M 0 50 Q 25 30 50 50 T 100 50" fill="none" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
                                </svg>
                            </div>
                            <div className="flex justify-between items-start relative z-10 text-[10px] font-black uppercase tracking-widest text-zinc-500 font-dm-mono">
                                <span>Global Base</span>
                                <MapPin className="w-4 h-4 text-[#F46C38]" />
                            </div>
                            <div className="relative z-10">
                                <span className="text-xl font-black block tracking-tighter text-white uppercase font-seona not-italic">
                                    PUNE, INDIA
                                </span>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Tile 10: The Soundtrack (Last.fm API) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 }}
                        className="md:col-span-3 md:row-span-2 md:col-start-1 md:row-start-5 h-full"
                    >
                        <MusicTile />
                    </motion.div>

                    {/* Tile 11: Currently Reading */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        className="md:col-span-2 md:row-span-2 md:col-start-4 md:row-start-5 h-full"
                    >
                        <Card className="p-6 h-full bg-[#151312] border border-white/5 rounded-[2.5rem] flex flex-col relative overflow-hidden group shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:bg-white/5 transition-colors">
                            <div className="relative z-10 flex flex-col mb-auto">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C5FF41] font-dm-mono mb-2">Currently Reading</span>
                                <h4 className="text-xl font-black uppercase tracking-tight leading-none font-seona text-white">Atomic<br/>Habits</h4>
                            </div>
                            
                            <div className="absolute -right-4 -bottom-8 w-32 h-44 rotate-12 group-hover:rotate-6 group-hover:-translate-y-2 group-hover:-translate-x-2 transition-all duration-500 shadow-2xl rounded-sm overflow-hidden border border-white/20">
                                <Image
                                    src="/atomic-habbit.jpg"
                                    alt="Atomic Habits"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </Card>
                    </motion.div>

                    {/* Tile 12: GitHub Contributions */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.0 }}
                        className="md:col-span-6 md:row-span-2 md:col-start-7 md:row-start-5 h-full"
                    >
                        <GitHubTile mounted={mounted} resolvedTheme={resolvedTheme} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
