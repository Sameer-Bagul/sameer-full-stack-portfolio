'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Folder } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StudyFolderProps {
    name: string;
    slug: string;
    description?: string;
    itemCount: number;
    className?: string;
}

export default function StudyFolder({ name, slug, description, itemCount, className }: StudyFolderProps) {
    return (
        <Link href={`/study/${slug}`}>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    "group relative flex flex-col items-center justify-center p-6 transition-all duration-300",
                    "hover:bg-zinc-100/10 dark:hover:bg-white/5 rounded-2xl",
                    className
                )}
            >
                {/* macOS Folder Icon Container */}
                <div className="relative mb-4">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                        {/* Shadow/Glow */}
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Folder Icon with layers */}
                        <div className="relative z-10 transition-transform duration-500 group-hover:-rotate-6">
                            <Folder
                                size={80}
                                strokeWidth={1.2}
                                className="text-primary fill-primary/10 transition-all group-hover:fill-primary/20"
                            />

                            {/* Folder Indicator for items */}
                            <div className="absolute bottom-4 right-4 bg-white dark:bg-zinc-800 text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-sm border border-zinc-100 dark:border-zinc-700">
                                {itemCount}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Name & Metadata */}
                <div className="text-center">
                    <h3 className="text-sm font-black uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">
                        {name}
                    </h3>
                    {description && (
                        <p className="mt-2 text-[10px] text-muted-foreground font-medium max-w-[150px] line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {description}
                        </p>
                    )}
                </div>
            </motion.div>
        </Link>
    );
}
