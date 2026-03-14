'use client';

import React, { useEffect } from 'react';
import { Chapter, StudyMaterial } from '@/data/study-materials';
import { useParams } from 'next/navigation';
import { useHeader } from '@/context/HeaderContext';
import { Bookmark as BookmarkIcon, Download, Share2 } from 'lucide-react';
import { StudyNavigation } from './StudyNavigation';
import { NoteContent } from './NoteContent';

interface EbookReaderProps {
    item: StudyMaterial;
    activeChapter: Chapter | null;
    setActiveChapter: (chapter: Chapter) => void;
    isLiked: boolean;
    setIsLiked: (liked: boolean) => void;
}

/**
 * [Hierarchy Level: UI Wrapper]
 * A simplified wrapper that arranges the Sidebar and Note Content.
 * Uses natural browser scrolling for the main content area.
 */
export default function EbookReader({
    item,
    activeChapter,
    isLiked,
    setIsLiked
}: EbookReaderProps) {
    const { setTitle, setActions, clearHeader } = useHeader();
    const params = useParams();
    const topicSlug = params.topicSlug as string;

    // Stable Sync with Global Header
    useEffect(() => {
        if (!activeChapter) return;

        setTitle(activeChapter.title);

        const actions = (
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2.5 rounded-xl border border-white/5 transition-all duration-300 ${isLiked ? 'bg-primary/20 text-primary border-primary/20' : 'hover:bg-white/10'
                        }`}
                >
                    <BookmarkIcon size={18} fill={isLiked ? "currentColor" : "none"} />
                </button>
                <button className="p-2.5 rounded-xl border border-white/5 hover:bg-white/10 transition-all duration-300">
                    <Download size={18} />
                </button>
                <button className="p-2.5 rounded-xl border border-white/5 hover:bg-white/10 transition-all duration-300">
                    <Share2 size={18} />
                </button>
            </div>
        );

        setActions(actions);
        return () => clearHeader();
    }, [activeChapter?.id, isLiked, setTitle, setActions, clearHeader, setIsLiked]);

    if (!activeChapter) return null;

    return (
        <div className="w-full bg-background selection:bg-primary/30 pt-28 pb-12 lg:px-8">
            {/* Minimal Background */}
            <div className="fixed inset-0 pointer-events-none -z-10 bg-background" />

            <div className="flex w-full min-h-[calc(100vh-10rem)] rounded-3xl border border-white/5 bg-zinc-950/10 backdrop-blur-3xl overflow-hidden shadow-2xl relative">
                {/* 1. Sidebar Component (Sticky) */}
                <aside className="hidden lg:block w-[350px] shrink-0 border-r border-white/5 relative bg-zinc-950/20">
                    <div className="h-full">
                        <StudyNavigation
                            item={item}
                            topicSlug={topicSlug}
                            activeChapter={activeChapter}
                        />
                    </div>
                </aside>

                {/* 2. Content Component (Natural Scroll) */}
                <main className="flex-1 min-w-0 notebook-background">
                    <NoteContent
                        title={activeChapter.title}
                        content={activeChapter.content}
                        topic={item.topic}
                        id={activeChapter.id}
                        estimatedTime={item.estimatedTime || '10m'}
                    />
                </main>
            </div>
        </div>
    );
}
