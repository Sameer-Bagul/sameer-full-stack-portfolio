'use client';

import React from 'react';
import { STYLES } from '@/lib/constants/styles';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function IntroVideo() {
    return (
        <section className="relative py-24 sm:py-32 bg-background w-full">
            <div className={cn(STYLES.container, "px-4 sm:px-6 relative z-10")}>
                <div className="text-center mb-16 sm:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className={cn(STYLES.heading, "text-4xl sm:text-6xl md:text-7xl mb-6 font-seona not-italic uppercase tracking-tight")}>
                            Beyond <span className="text-primary italic">the</span> code
                        </h2>
                        <div className="flex items-center justify-center gap-4 opacity-40">
                            <div className="h-px w-8 bg-zinc-800" />
                            <p className="text-[10px] font-black uppercase tracking-[0.4em]">
                                Video Introduction
                            </p>
                            <div className="h-px w-8 bg-zinc-800" />
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 1 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="col-span-12 lg:col-span-10 lg:col-start-2"
                    >
                        <div className="aspect-video rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800/50 shadow-sm relative group bg-zinc-900/5 max-w-[350px] sm:max-w-none mx-auto">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder
                                title="Intro Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
