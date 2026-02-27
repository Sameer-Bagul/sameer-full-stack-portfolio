'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { STYLES } from '@/lib/constants/styles';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Quote, Star, Loader2 } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

export default function Testimonials() {
    const { testimonials, loading } = usePortfolio();

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'center',
            skipSnaps: false,
            containScroll: false
        },
        [Autoplay({ delay: 6000, stopOnInteraction: false })]
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

    if (loading) {
        return (
            <div className="py-24 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (testimonials.length === 0) return null;

    return (
        <section className="relative py-24 sm:py-32 bg-background w-full">
            <div className={cn(STYLES.container, "relative z-10 mx-auto max-w-7xl")}>
                <div className="text-center mb-16 sm:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className={cn(STYLES.heading, "text-4xl sm:text-6xl md:text-7xl mb-6 font-seona not-italic uppercase tracking-tight")}>
                            Kind <span className="text-primary italic">words</span>
                        </h2>
                        <div className="flex items-center justify-center gap-4 opacity-40">
                            <div className="h-px w-8 bg-zinc-800" />
                            <p className="text-[10px] font-black uppercase tracking-[0.4em]">
                                Global Collaborations
                            </p>
                            <div className="h-px w-8 bg-zinc-800" />
                        </div>
                    </motion.div>
                </div>

                <div className="relative">
                    {/* Minimalistic Fading Edges */}
                    <div className="absolute inset-y-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none hidden md:block" />
                    <div className="absolute inset-y-0 right-0 w-24 sm:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none hidden md:block" />

                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {testimonials.map((testimonial, index) => {
                                const isActive = index === selectedIndex;
                                return (
                                    <div
                                        key={testimonial._id}
                                        className="flex-[0_0_85%] sm:flex-[0_0_70%] lg:flex-[0_0_45%] xl:flex-[0_0_40%] px-4 py-8"
                                    >
                                        <div
                                            className={cn(
                                                "p-8 sm:p-12 h-full bg-zinc-900/5 dark:bg-white/5 border border-zinc-200 dark:border-white/5 rounded-3xl transition-all duration-700 ease-out flex flex-col justify-between",
                                                isActive ? "opacity-100 scale-100" : "opacity-30 scale-95 grayscale"
                                            )}
                                        >
                                            <div className="space-y-6">
                                                <div className="flex gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={12} className="fill-primary text-primary" />
                                                    ))}
                                                </div>

                                                <p className="text-lg sm:text-xl font-medium leading-relaxed text-zinc-800 dark:text-zinc-200 font-seona not-italic lowercase">
                                                    "{testimonial.content}"
                                                </p>
                                            </div>

                                            <div className="mt-12 flex items-center gap-4">
                                                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-zinc-200 dark:border-white/10 group-hover:border-primary transition-colors">
                                                    <Image
                                                        src={testimonial.avatar}
                                                        alt={`Testimonial from ${testimonial.name} - ${testimonial.role}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="text-base font-black text-zinc-900 dark:text-zinc-100 tracking-tight font-seona not-italic uppercase">
                                                        {testimonial.name}
                                                    </h4>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">
                                                        {testimonial.role}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Minimalistic Pagination */}
                    <div className="flex justify-center gap-2 mt-12 sm:mt-16">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => emblaApi?.scrollTo(index)}
                                className={cn(
                                    "h-1 rounded-full transition-all duration-500",
                                    index === selectedIndex ? "w-8 bg-primary" : "w-1 bg-zinc-200 dark:bg-zinc-800"
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
