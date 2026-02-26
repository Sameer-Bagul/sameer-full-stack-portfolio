'use client';

import React, { useState, useMemo } from 'react';
import { studyData } from '@/data/study-materials';
import StudyFolder from '@/components/study/StudyFolder';
import { Search } from 'lucide-react';
import { STYLES } from '@/lib/constants/styles';
import { motion } from 'framer-motion';

export default function StudyPage() {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter topics based on search
    const filteredTopics = useMemo(() => {
        return studyData.filter(item =>
            item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    return (
        <div className="pt-32 pb-24 px-6">
            <div className="max-w-6xl mx-auto">
                {/* macOS Header Style */}
                <div className="mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-5 font-seona"
                    >
                        study<span className="text-primary">library.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.4 }}
                        className="text-base text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed"
                    >
                        An engineering vault for technical research and architectural deep-dives.
                    </motion.p>
                </div>

                {/* macOS Mini Toolbar */}
                <div className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-4 rounded-[2.5rem] bg-zinc-100/50 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800">
                    <div className="relative w-full sm:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            placeholder="Search folders or topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-12 pl-12 pr-6 bg-white dark:bg-zinc-950 rounded-full border-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            {studyData.length} Topics
                        </span>
                        <span className="opacity-30">|</span>
                        <span>Finder Grid</span>
                    </div>
                </div>

                {/* Folder Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
                >
                    {filteredTopics.map((topic, index) => (
                        <motion.div
                            key={topic.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <StudyFolder
                                name={topic.topic}
                                slug={topic.slug}
                                description={topic.description}
                                itemCount={topic.chapters.length}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {filteredTopics.length === 0 && (
                    <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/20 rounded-[3rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                        <p className="text-muted-foreground font-medium">No folders found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
