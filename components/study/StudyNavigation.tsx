'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ListOrdered, CheckCircle2, Bookmark, ExternalLink } from 'lucide-react';
import { Chapter, StudyMaterial } from '@/data/study-materials';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface StudyNavigationProps {
    item: StudyMaterial;
    activeChapter: Chapter | null;
    toggleSidebar?: () => void;
    topicSlug: string;
}

export function StudyNavigation({
    item,
    activeChapter,
    topicSlug
}: StudyNavigationProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full flex flex-col h-full bg-zinc-950/20"
        >
            {/* Sidebar Header */}
            <div className="p-8 border-b border-white/5 bg-white/[0.02]">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 text-primary mb-6">
                    <ListOrdered size={14} /> CURRICULUM ARCHIVE
                </h3>

                <div className="space-y-1">
                    <h4 className="text-lg font-black tracking-tighter text-foreground uppercase truncate">
                        {item.topic}
                    </h4>
                    <div className="flex items-center gap-2 opacity-40">
                        <span className="text-[10px] font-bold uppercase tracking-widest">{item.chapters.length} Investigation Units</span>
                    </div>
                </div>
            </div>

            {/* Navigation List */}
            <ScrollArea className="flex-1 py-6">
                <div className="px-4 space-y-8">
                    <div className="space-y-1">
                        <div className="px-4 mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30">Select Module</div>

                        {item.chapters.map((chapter, index) => (
                            <Link
                                key={chapter.id}
                                href={`/study/${topicSlug}/${chapter.slug}`}
                                className={cn(
                                    "w-full text-left p-4 rounded-2xl text-xs font-bold flex items-center justify-between group transition-all duration-300",
                                    activeChapter?.id === chapter.id
                                        ? "bg-primary/10 text-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.05)] border border-primary/10"
                                        : "hover:bg-white/5 text-muted-foreground hover:text-foreground border border-transparent"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <span className={cn(
                                        "text-[10px] font-black opacity-20 group-hover:opacity-40 transition-opacity",
                                        activeChapter?.id === chapter.id && "opacity-100"
                                    )}>
                                        {(index + 1).toString().padStart(2, '0')}
                                    </span>
                                    <span className="tracking-tight line-clamp-1">{chapter.title}</span>
                                </div>
                                {activeChapter?.id === chapter.id ? (
                                    <CheckCircle2 size={14} className="text-primary" />
                                ) : (
                                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-40 transition-all -translate-x-2 group-hover:translate-x-0" />
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </ScrollArea>

            {/* Sidebar Footer */}
            <div className="p-6 border-t border-white/5 bg-black/40 backdrop-blur-md">
                <Button
                    variant="outline"
                    className="w-full flex items-center gap-3 rounded-2xl border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-500 py-6"
                >
                    <Bookmark size={14} />
                    Download Investigation
                </Button>
            </div>
        </motion.div>
    );
}
