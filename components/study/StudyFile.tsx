'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
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
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "group relative flex flex-col items-center justify-center p-6 transition-all duration-300",
                    "hover:bg-zinc-100/20 dark:hover:bg-white/5 rounded-[2rem]",
                    className
                )}
            >
                {/* macOS File Icon Container */}
                <div className="relative mb-4">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                        {/* Shadow/Glow */}
                        <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* File Icon */}
                        <div className="relative z-10">
                            <FileText
                                size={64}
                                strokeWidth={1}
                                className="text-muted-foreground group-hover:text-foreground transition-all duration-300"
                            />

                            {/* File Decorative Lines */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 gap-1 px-4 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                                <div className="h-[2px] w-full bg-current rounded-full" />
                                <div className="h-[2px] w-full bg-current rounded-full" />
                                <div className="h-[2px] w-2/3 bg-current rounded-full self-start" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Title & Description */}
                <div className="text-center px-2">
                    <p className="text-[11px] font-bold leading-tight text-foreground/80 group-hover:text-foreground transition-colors line-clamp-2">
                        {title}
                    </p>
                    {description && (
                         <p className="mt-2 text-[9px] text-muted-foreground font-medium max-w-[120px] line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {description}
                        </p>
                    )}
                </div>
            </motion.div>
        </Link>
    );
}
