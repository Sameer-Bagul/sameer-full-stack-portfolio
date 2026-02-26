'use client';

import React, { memo, useEffect, useState } from 'react';
import { STYLES } from '@/lib/constants/styles';
import { cn } from '@/lib/utils';
import { usePortfolio } from '@/context/PortfolioContext';
import { Loader2 } from 'lucide-react';

const MarqueeRow = ({ items, direction = 'left', speed = '40s' }: { items: { name: string, icon: string }[], direction?: 'left' | 'right', speed?: string }) => {
    return (
        <div className="group flex overflow-hidden p-2 [--gap:2rem] [gap:var(--gap)] flex-row w-full">
            <div className={cn(
                "flex shrink-0 justify-around [gap:var(--gap)] min-w-full items-center",
                direction === 'left' ? "animate-marquee flex-row" : "animate-marquee-reverse flex-row"
            )}
                style={{ animationDuration: speed }}
            >
                {items.map((skill, idx) => (
                    <div key={`${skill.name}-${idx}`} className="flex flex-col items-center justify-center p-5 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-zinc-200/50 dark:border-zinc-800/50 min-w-[110px] sm:min-w-[120px] md:min-w-[140px]">
                        <img
                            src={`https://skillicons.dev/icons?i=${skill.icon}&theme=${'dark'}`}
                            alt={skill.name}
                            className="w-11 h-11 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-all duration-500 scale-90 group-hover:scale-110"
                        />
                        <span className="mt-3 sm:mt-4 text-[10px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 group-hover:text-primary transition-colors font-seona not-italic">{skill.name}</span>
                    </div>
                ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className={cn(
                "flex shrink-0 justify-around [gap:var(--gap)] min-w-full items-center",
                direction === 'left' ? "animate-marquee flex-row" : "animate-marquee-reverse flex-row"
            )}
                style={{ animationDuration: speed }}
                aria-hidden="true"
            >
                {items.map((skill, idx) => (
                    <div key={`${skill.name}-duplicate-${idx}`} className="flex flex-col items-center justify-center p-5 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-zinc-200/50 dark:border-zinc-800/50 min-w-[110px] sm:min-w-[120px] md:min-w-[140px]">
                        <img
                            src={`https://skillicons.dev/icons?i=${skill.icon}&theme=${'dark'}`}
                            alt={skill.name}
                            className="w-11 h-11 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-all duration-500 scale-90 group-hover:scale-110"
                        />
                        <span className="mt-3 sm:mt-4 text-[10px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 group-hover:text-primary transition-colors">{skill.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Skills = memo(() => {
    const { skills, loading } = usePortfolio();
    const [row1, setRow1] = useState<{ name: string, icon: string }[]>([]);
    const [row2, setRow2] = useState<{ name: string, icon: string }[]>([]);

    useEffect(() => {
        if (skills && skills.length > 0) {
            const r1 = skills.filter(s => s.row === 1 || !s.row).map(s => ({ name: s.name, icon: s.icon }));
            const r2 = skills.filter(s => s.row === 2).map(s => ({ name: s.name, icon: s.icon }));

            // Fallback to splitting if only one row is populated from API
            if (r2.length === 0 && r1.length > 1) {
                const half = Math.ceil(r1.length / 2);
                setRow1(r1.slice(0, half));
                setRow2(r1.slice(half));
            } else {
                setRow1(r1);
                setRow2(r2);
            }
        }
    }, [skills]);

    if (loading) {
        return (
            <div className="py-24 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (row1.length === 0 && row2.length === 0) return null;

    return (
        <section className="py-16 sm:py-20 md:py-24 overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/20 w-full">
            <div className="container px-4 sm:px-6 max-w-7xl mx-auto">
                <div className="text-center mb-12 sm:mb-16 flex flex-col items-center">
                    <h2 className={cn(STYLES.heading, "text-3xl sm:text-4xl md:text-6xl")}>Tools & capability clusters</h2>
                    <p className={cn(STYLES.subheading, "text-sm sm:text-base")}>Technologies I use to bring ideas to life</p>
                </div>

                <div className="relative flex flex-col gap-8 sm:gap-12 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-12 sm:before:w-20 before:bg-gradient-to-r before:from-zinc-50 dark:before:from-zinc-950/20 before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-12 sm:after:w-20 after:bg-gradient-to-l after:from-zinc-50 dark:after:from-zinc-950/20 after:to-transparent">
                    <MarqueeRow items={row1} direction="right" speed="60s" />
                    <MarqueeRow items={row2} direction="left" speed="55s" />
                </div>
            </div>

            <style jsx global>{`
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(calc(-100% - var(--gap))); }
                }
                @keyframes marquee-reverse {
                    from { transform: translateX(calc(-100% - var(--gap))); }
                    to { transform: translateX(0); }
                }
                .animate-marquee {
                    animation: marquee linear infinite;
                }
                .animate-marquee-reverse {
                    animation: marquee-reverse linear infinite;
                }
            `}</style>
        </section>
    );
});

Skills.displayName = 'Skills';

export default Skills;
