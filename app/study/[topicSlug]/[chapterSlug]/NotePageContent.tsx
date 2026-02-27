'use client';

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { studyData, Chapter } from '@/data/study-materials';
import EbookReader from '@/components/study/EbookReader';
import { AnimatePresence } from 'framer-motion';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotePageContent({ params }: { params: { topicSlug: string; chapterSlug: string } }) {
    const { topicSlug, chapterSlug } = params;
    const [isLiked, setIsLiked] = useState(false);

    const topic = studyData.find(item => item.slug === topicSlug);
    if (!topic) notFound();

    const chapter = topic.chapters.find(c => c.slug === chapterSlug);
    if (!chapter) notFound();

    const [activeChapter, setActiveChapter] = useState<Chapter | null>(chapter);

    useEffect(() => {
        if (chapter && chapter.slug !== activeChapter?.slug) {
            setActiveChapter(chapter);
        }
    }, [chapter, activeChapter?.slug]);

    const relatedTopics = studyData.filter(t => t.slug !== topicSlug).slice(0, 3);

    return (
        <div className="w-full min-h-screen bg-background">
            <AnimatePresence mode="wait">
                <EbookReader
                    key={activeChapter?.id}
                    item={topic}
                    activeChapter={activeChapter}
                    setActiveChapter={setActiveChapter}
                    isLiked={isLiked}
                    setIsLiked={setIsLiked}
                />
            </AnimatePresence>

            {/* Related Research Section */}
            <div className="max-w-4xl mx-auto px-6 py-20 border-t border-white/10">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 font-seona not-italic">
                    Expand your <span className="text-primary italic">knowledge</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedTopics.map((t) => (
                        <Link
                            key={t.id}
                            href={`/study/${t.slug}`}
                            className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/40 transition-all"
                        >
                            <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{t.topic}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{t.description}</p>
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary/60">
                                Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
