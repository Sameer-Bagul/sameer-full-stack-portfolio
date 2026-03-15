'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Scroll, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StudyFileProps {
    title: string;
    topicSlug: string;
    chapterSlug: string;
    description?: string;
    className?: string;
}

export default function StudyFile({ title, topicSlug, chapterSlug, description, className }: StudyFileProps) {
    return (
        <Link href={`/study/${topicSlug}/${chapterSlug}`}>
            <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "group relative flex flex-col items-center justify-center p-8 transition-all duration-500",
                    "bg-zinc-950/10 hover:bg-zinc-950/40 backdrop-blur-3xl rounded-[3rem] border border-white/5 hover:border-primary/20",
                    "shadow-xl hover:shadow-2xl hover:shadow-primary/5",
                    className
                )}
            >
                {/* Decorative Pattern (Subtle) */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none notebook-background rounded-[3rem]" />

                {/* macOS File Icon Container */}
                <div className="relative mb-6">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                        {/* Shadow/Glow */}
                        <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* File Icon */}
                        <div className="relative z-10">
                            <div className="relative">
                                <BookOpen
                                    size={56}
                                    strokeWidth={1.5}
                                    className="text-muted-foreground group-hover:text-primary transition-all duration-500 transform group-hover:-rotate-3 group-hover:scale-110"
                                />
                                <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-zinc-900 border border-white/5 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-zinc-950">
                                    <Scroll size={12} strokeWidth={2.5} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Title & Description */}
                <div className="text-center px-2 relative z-10">
                    <p className="text-[13px] font-black leading-tight text-foreground tracking-tight group-hover:text-primary transition-colors duration-500 line-clamp-1 mb-2">
                        {title}.
                    </p>
                    {description && (
                         <p className="text-[10px] text-muted-foreground/60 font-medium leading-relaxed max-w-[140px] line-clamp-2 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            {description}
                        </p>
                    )}
                </div>
            </motion.div>
        </Link>
    );
}
