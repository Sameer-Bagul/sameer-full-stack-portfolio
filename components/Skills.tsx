'use client';

import React, { memo, useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { usePortfolio } from '@/context/PortfolioContext';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

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
                    <div key={`${skill.name}-${idx}`} className="flex flex-col items-center justify-center p-6 bg-white/5 border-white/10 backdrop-blur-sm rounded-[2rem] hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group border min-w-[120px] sm:min-w-[140px] md:min-w-[160px]">
                        <Image
                            src={`https://skillicons.dev/icons?i=${skill.icon}&theme=${'dark'}`}
                            alt={`${skill.name} - Professional Skill in ${skill.name} development`}
                            width={56}
                            height={56}
                            className="transition-transform duration-500 scale-90 group-hover:scale-110 drop-shadow-2xl"
                        />
                        <span className="mt-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-[#C5FF41] transition-colors font-dm-mono not-italic">{skill.name}</span>
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
                    <div key={`${skill.name}-duplicate-${idx}`} className="flex flex-col items-center justify-center p-6 bg-white/5 border-white/10 backdrop-blur-sm rounded-[2rem] hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group border min-w-[120px] sm:min-w-[140px] md:min-w-[160px]">
                        <Image
                            src={`https://skillicons.dev/icons?i=${skill.icon}&theme=${'dark'}`}
                            alt={`${skill.name} capability - Mastered in ${skill.name}`}
                            width={56}
                            height={56}
                            className="transition-transform duration-500 scale-90 group-hover:scale-110 drop-shadow-2xl"
                        />
                        <span className="mt-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-[#C5FF41] transition-colors font-dm-mono not-italic">{skill.name}</span>
                    </div>
                ))}
            </div>
        </div >
    );
};

import SectionHeading from './SectionHeading';

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
            <div className="py-24 flex items-center justify-center bg-transparent">
                <Loader2 className="w-10 h-10 animate-spin text-[#C5FF41]" />
            </div>
        );
    }

    if (row1.length === 0 && row2.length === 0) return null;

    return (
        <section className="py-24 sm:py-32 w-full border-t border-white/5 relative overflow-hidden">
            <div className="w-full">
                <div className="container px-4 sm:px-6 max-w-[1200px] mx-auto">
                    <SectionHeading 
                        watermark="SKILLS"
                        label="Technologies I use to bring ideas to life"
                        title={
                            <>
                                Tools & <br /> 
                                <span className="text-[#F46C38] italic">Capability</span>
                            </>
                        }
                        description="A comprehensive toolkit of modern frameworks, programming languages, and technologies I leverage to build scalable, high-performance digital products and systems."
                    />
                </div>

                <div className="relative flex flex-col gap-6 sm:gap-8 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 sm:before:w-32 before:bg-gradient-to-r before:from-[#151312] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 sm:after:w-32 after:bg-gradient-to-l after:from-[#151312] after:to-transparent">
                    <MarqueeRow items={row1} direction="right" speed="50s" />
                    <MarqueeRow items={row2} direction="left" speed="60s" />
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
