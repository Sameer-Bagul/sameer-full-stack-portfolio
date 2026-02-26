'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, Terminal } from 'lucide-react';

interface NoteContentProps {
    title: string;
    content: string;
    topic: string;
    id: string;
    estimatedTime: string;
}

export const NoteContent: React.FC<NoteContentProps> = ({
    title,
    content,
    topic,
    id,
    estimatedTime
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-auto py-12 px-6"
        >
            <div className="glassmorphic-note-container rounded-[2rem] border border-white/5 bg-zinc-950/20 backdrop-blur-3xl overflow-hidden shadow-2xl mb-32 relative">
                {/* Visual Header Decoration */}
                <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                <article className="relative">
                    {/* Header: Clean & Modern */}
                    <header className="px-10 lg:px-16 pt-16 pb-12 border-b border-white/5 bg-white/[0.02]">
                        <div className="flex flex-wrap items-center gap-4 mb-10">
                            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                                <Terminal size={12} /> UNIT {id.toUpperCase()}
                            </span>
                            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                <Clock size={12} /> {estimatedTime}
                            </span>
                            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                <BookOpen size={12} /> ARCHIVE 2026
                            </span>
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-8 bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
                            {title}
                        </h1>

                        <div className="flex items-center gap-6 text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.3em] pb-2">
                            <span className="flex items-center gap-2"><Calendar size={12} /> FEB 16, 2026</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                            <span>ASSET {topic.toUpperCase()}</span>
                        </div>
                    </header>

                    {/* Content Section: Uses global .technical-content for simplicity */}
                    <div className="px-10 lg:px-16 py-16">
                        <div
                            className="technical-content"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>

                    {/* Simple Footer Decoration */}
                    <footer className="px-10 lg:px-16 py-10 border-t border-white/5 bg-black/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-[10px] font-black text-muted-foreground/20 uppercase tracking-[0.5em]">
                            End of Module {id.toUpperCase()}
                        </p>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/5 to-transparent mx-4 hidden sm:block" />
                        <p className="text-[10px] font-bold text-primary/40 tracking-widest">
                            Verified Investigation Asset
                        </p>
                    </footer>
                </article>

                {/* Background glow effects - very subtle */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-[120px] rounded-full -z-10" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 blur-[150px] rounded-full -z-10" />
            </div>
        </motion.div>
    );
};
