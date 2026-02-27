'use client';

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { studyData, Chapter } from '@/data/study-materials';
import EbookReader from '@/components/study/EbookReader';
import { AnimatePresence } from 'framer-motion';

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
