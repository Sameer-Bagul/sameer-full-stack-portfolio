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
import SectionHeading from './SectionHeading';

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
        <section className={cn(STYLES.section, "overflow-hidden py-16 sm:py-20 md:py-32 bg-transparent w-full relative")}>
            <div className="container px-4 sm:px-6 mx-auto max-w-[1200px]">
                <SectionHeading 
                    watermark="WORK"
                    label="Featured Projects"
                    title={
                        <>
                            Proof of execution.<br />
                            <span className="text-[#C5FF41] italic">Selected works.</span>
                        </>
                    }
                    description="A curated selection of my best work, demonstrating my ability to build complex, scalable applications from the ground up."
                />

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
                            <span className="text-[10px] sm:text-[11px] font-dm-mono uppercase tracking-[0.3em] text-[var(--tmpl-text-3)] block mb-2">Portfolio Archives</span>
                            <span className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-white/90 font-seona uppercase tracking-tighter not-italic">
                                Feel free to explore <span className="text-[#C5FF41] italic">all work</span>
                            </span>
                        </div>

                        <div className="relative z-10 flex items-center gap-4 sm:gap-6 shrink-0">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-[2rem] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]">
                                <MoveRight className="w-6 h-6 text-[#C5FF41]-foreground" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
