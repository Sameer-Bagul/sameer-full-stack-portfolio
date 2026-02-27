'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { studyData } from '@/data/study-materials';
import StudyFile from '@/components/study/StudyFile';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, FolderOpen, Info } from 'lucide-react';

export default function TopicPageContent({ params }: { params: { topicSlug: string } }) {
    const { topicSlug } = params;
    const topic = studyData.find(item => item.slug === topicSlug);

    if (!topic) {
        notFound();
    }

    return (
        <div className="w-full min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    <Link
                        href="/study"
                        className="flex items-center gap-1 hover:text-primary transition-colors group"
                    >
                        <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Library
                    </Link>
                    <span className="opacity-30">/</span>
                    <span className="text-foreground">{topic.topic}</span>
                </div>

                <div className="mb-16 flex flex-col md:flex-row items-end justify-between gap-8 border-b border-zinc-100 dark:border-zinc-800 pb-12">
                    <div className="space-y-4 max-w-2xl text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                            <FolderOpen size={12} /> Topic Archive
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black lowercase tracking-tighter">
                            {topic.topic}<span className="text-primary">.</span>
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            {topic.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                        <div className="p-6 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 text-center">
                            <span className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Chapters</span>
                            <span className="text-2xl font-black">{topic.chapters.length}</span>
                        </div>
                        <div className="p-6 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 text-center">
                            <span className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Rating</span>
                            <span className="text-2xl font-black">{topic.rating}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-3 mb-8 opacity-50">
                        <Info size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Select a file to start reading</span>
                    </div>

                    <motion.div
                        layout
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8"
                    >
                        {topic.chapters.map((chapter, index) => (
                            <motion.div
                                key={chapter.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <StudyFile
                                    title={chapter.title}
                                    topicSlug={topic.slug}
                                    chapterSlug={chapter.slug}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {topic.chapters.length === 0 && (
                    <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/20 rounded-[3rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                        <p className="text-muted-foreground font-medium">No research notes found in this topic yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
