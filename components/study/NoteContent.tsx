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
            className="w-full"
        >
            <article className="relative">
                {/* Header: Academic & Minimal */}
                <header className="px-8 lg:px-16 py-12 border-b border-white/5 bg-zinc-900/40 backdrop-blur-md sticky top-0 z-20">
                    <h1 className="text-3xl lg:text-5xl font-black tracking-tighter mb-4 text-white leading-tight">
                        {title}
                    </h1>

                    <div className="flex items-center gap-4 text-[9px] font-bold text-muted-foreground tracking-widest opacity-40">
                        <span>archive ref: {topic}</span>
                        <span>•</span>
                        <span>{estimatedTime} read</span>
                    </div>
                </header>

                {/* Content Section */}
                <div className="px-8 lg:px-16 py-16">
                    <div
                        className="technical-content"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>

                {/* Minimal Footer */}
                <footer className="px-8 lg:px-16 py-12 border-t border-white/5 flex items-center justify-between opacity-20">
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.5em]">
                        End of Research Module
                    </p>
                    <p className="text-[8px] font-bold text-primary tracking-widest">
                        VERIFIED ASSET
                    </p>
                </footer>
            </article>

            {/* Background glow effects - very subtle */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 blur-[150px] rounded-full -z-10" />
        </motion.div>
    );
};
