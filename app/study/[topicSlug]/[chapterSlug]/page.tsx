'use client';

import React, { use, useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { studyData, Chapter } from '@/data/study-materials';
import EbookReader from '@/components/study/EbookReader';
import { AnimatePresence } from 'framer-motion';

interface NotePageProps {
    params: Promise<{ topicSlug: string; chapterSlug: string }>;
}

/**
 * [Hierarchy Level: Page Controller]
 * Responsible for data fetching and coordination between state and UI.
 * Simplified for maximum performance and natural scrolling.
 */
export default function NotePage({ params }: NotePageProps) {
    const { topicSlug, chapterSlug } = use(params);
    const [isLiked, setIsLiked] = useState(false);

    // 1. Data Fetching
    const topic = studyData.find(item => item.slug === topicSlug);
    if (!topic) notFound();

    const chapter = topic.chapters.find(c => c.slug === chapterSlug);
    if (!chapter) notFound();

    const [activeChapter, setActiveChapter] = useState<Chapter | null>(chapter);

    // 2. State Sync
    useEffect(() => {
        if (chapter && chapter.slug !== activeChapter?.slug) {
            setActiveChapter(chapter);
        }
    }, [chapter, activeChapter?.slug]);

    // 3. Render
    // Removed h-screen and overflow-hidden to allow natural document scrolling
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
        </div>
    );
}
