'use client';

import React from 'react';
import { motion } from 'framer-motion';

import SectionHeading from './SectionHeading';

import { ArrowUpRight } from 'lucide-react';

import { usePortfolio } from '@/context/PortfolioContext';

export default function Experience() {
    const { experience: experiences, loading } = usePortfolio();

    return (
        <section className="py-24 sm:py-32 w-full relative overflow-hidden">
            <div className="container px-4 sm:px-6 max-w-[1200px] mx-auto">
                <SectionHeading 
                    watermark="CAREER"
                    label="Work Experience"
                    title={
                        <>
                            My professional<br />
                            journey.
                        </>
                    }
                    description="A timeline of my professional experience building scalable digital products and leading engineering efforts for ambitious tech companies."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-10 w-full mt-4 md:mt-8 border-t border-white/5 pt-8 md:pt-12">
                    {loading ? (
                        <div className="text-zinc-500 font-dm-mono text-sm uppercase tracking-widest col-span-1 md:col-span-2">Loading experience...</div>
                    ) : (experiences || []).map((exp: any, index: number) => (
                        <motion.div
                            key={exp._id || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group flex flex-col items-start cursor-pointer border-b border-white/5 pb-6 md:pb-8 relative"
                        >
                            <div className="flex flex-col mb-3 md:mb-4">
                                <span className="font-dm-mono text-zinc-500 group-hover:text-[#F46C38] transition-colors duration-500 text-xs md:text-sm tracking-widest uppercase mb-2">
                                    {exp.duration}
                                </span>
                                <h3 className="font-seona uppercase tracking-tighter text-2xl md:text-3xl lg:text-4xl text-zinc-100 group-hover:text-white transition-colors duration-500 leading-none mb-2">
                                    {exp.role}
                                </h3>
                                <span className="font-dm-mono text-zinc-500 text-xs tracking-widest uppercase group-hover:text-[#C5FF41] transition-colors duration-500">
                                    {exp.company}
                                </span>
                            </div>

                            <p className="text-zinc-300 group-hover:text-white text-xs md:text-sm leading-relaxed transition-colors duration-300 mb-4 md:mb-6 pr-8">
                                {exp.description || (exp.bullets && exp.bullets[0]) || ''}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {(exp.techStack || []).map((tag: string) => (
                                    <span key={tag} className="px-2.5 py-1 rounded-full border border-white/10 group-hover:border-white/30 text-[9px] md:text-[10px] font-dm-mono tracking-wider text-zinc-300 group-hover:text-white transition-colors duration-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            
                            <ArrowUpRight className="absolute top-4 right-0 w-5 h-5 md:w-6 md:h-6 ml-auto text-zinc-500 group-hover:text-[#C5FF41] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
