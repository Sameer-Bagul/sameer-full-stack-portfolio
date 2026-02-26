'use client';

import { usePortfolio } from '@/context/PortfolioContext';
import { STYLES } from '@/lib/constants/styles';
import { cn } from '@/lib/utils';
import ProjectCard from './ProjectCard';
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { ArrowRight, MoveRight } from 'lucide-react';

export default function FeaturedProjects() {
    const { projects: allProjects, loading } = usePortfolio();

    const projects = React.useMemo(() => {
        return allProjects.filter(p => p.isFeatured);
    }, [allProjects]);

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'center',
            skipSnaps: false,
            containScroll: false
        },
        [Autoplay({ delay: 4000, stopOnInteraction: false })]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    if (loading || projects.length === 0) return null;

    return (
        <section className={cn(STYLES.section, "overflow-hidden py-16 sm:py-20 md:py-24 bg-background w-full")}>
            <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
                <div className="mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
                    <div className="space-y-3 sm:space-y-4">
                        <h2 className={cn(STYLES.heading, "text-left leading-none m-0 text-3xl sm:text-4xl md:text-6xl font-seona not-italic uppercase tracking-tight")}>
                            Featured <span className="text-primary italic">Projects</span>
                        </h2>
                        <p className={cn(STYLES.subheading, "text-left m-0 opacity-40 uppercase tracking-[0.3em] text-[9px] sm:text-[10px] font-black")}>
                            Proof of execution — A selection of my best work
                        </p>
                    </div>

                    <Link href="/projects" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 hover:text-primary transition-colors">
                        View Archives <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="relative">
                    {/* Carousel Container */}
                    <div className="overflow-visible" ref={emblaRef}>
                        <div className="flex">
                            {projects.map((project, index) => {
                                const isActive = index === selectedIndex;
                                return (
                                    <div
                                        key={project._id}
                                        className="flex-[0_0_90%] sm:flex-[0_0_85%] md:flex-[0_0_70%] lg:flex-[0_0_45%] xl:flex-[0_0_35%] px-3 sm:px-4 py-6 sm:py-8 md:py-10 h-auto"
                                    >
                                        <div className={cn(
                                            "transition-all duration-700 ease-out h-full",
                                            isActive
                                                ? "scale-100 sm:scale-105 opacity-100 z-10"
                                                : "scale-95 opacity-30 z-0 grayscale"
                                        )}>
                                            <ProjectCard project={project as any} isFeatured />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation Indicators */}
                    <div className="flex justify-center gap-2 mt-8 sm:mt-12">
                        {projects.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => emblaApi?.scrollTo(index)}
                                className={cn(
                                    "h-1 rounded-full transition-all duration-500",
                                    index === selectedIndex ? "w-8 bg-primary" : "w-1.5 bg-zinc-200 dark:bg-zinc-800"
                                )}
                            />
                        ))}
                    </div>
                </div>

                {/* Explore All Work Footer */}
                <div className="mt-16 sm:mt-20">
                    <Link
                        href="/projects"
                        className="group flex flex-col sm:flex-row items-start sm:items-center justify-between w-full p-6 sm:p-8 rounded-[2rem] border border-zinc-200 dark:border-white/10 hover:border-primary/50 transition-all duration-500 relative overflow-hidden gap-4 sm:gap-0"
                    >
                        <div className="relative z-10">
                            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 block mb-2">Portfolio Archives</span>
                            <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-foreground/90 font-seona not-italic uppercase">
                                Feel free to explore <span className="text-primary italic">all work</span>
                            </span>
                        </div>

                        <div className="relative z-10 flex items-center gap-4 sm:gap-6 shrink-0">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]">
                                <MoveRight className="w-6 h-6 text-primary-foreground" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
