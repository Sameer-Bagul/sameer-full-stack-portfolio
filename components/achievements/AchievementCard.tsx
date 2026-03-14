'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Award, Star, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Achievement } from '@/lib/api';

interface AchievementCardProps {
    achievement: Achievement;
    index: number;
}

const iconMap: Record<string, any> = {
    trophy: Trophy,
    award: Award,
    star: Star,
    medal: Medal,
};

export default function AchievementCard({ achievement, index }: AchievementCardProps) {
    const IconComponent = iconMap[achievement.icon?.toLowerCase() || ''] || Trophy;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative"
        >
            <div className="relative h-full flex flex-col bg-zinc-50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 overflow-hidden">
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors duration-500" />
                
                <div className="flex flex-col h-full relative z-10">
                    {/* Icon & Date Header */}
                    <div className="flex items-start justify-between mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                            <IconComponent className="w-7 h-7" strokeWidth={1.5} />
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                            <Calendar size={12} className="opacity-50" />
                            {achievement.date ? new Date(achievement.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recent'}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                        <h3 className="text-2xl font-black tracking-tight mb-4 group-hover:text-primary transition-colors duration-300">
                            {achievement.title}
                        </h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-4">
                            {achievement.description}
                        </p>
                    </div>

                    {/* Decorative Bottom Bar */}
                    <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/30">Validation Badge</span>
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-5 h-5 rounded-full border-2 border-white dark:border-zinc-900 bg-zinc-200 dark:bg-zinc-800" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
