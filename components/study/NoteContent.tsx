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
            className="w-full py-12 px-4 lg:px-8"
        >
            <div className="rounded-3xl border border-white/5 bg-zinc-950/10 backdrop-blur-3xl overflow-hidden shadow-sm mb-32 relative notebook-background">

                <article className="relative">
                    {/* Header: Academic & Minimal */}
                    <header className="px-6 lg:px-12 pt-16 pb-8 border-b border-white/5">
                        <h1 className="text-4xl lg:text-7xl font-black tracking-tighter mb-4 text-white leading-tight">
                            {title}
                        </h1>
 
                        <div className="flex items-center gap-4 text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-30">
                            <span>ARCHIVE REF: {topic.toUpperCase()}</span>
                            <span>•</span>
                            <span>{estimatedTime} READ</span>
                        </div>
                    </header>

                    {/* Content Section */}
                    <div className="px-6 lg:px-12 py-16">
                        <div
                            className="technical-content"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>

                    {/* Minimal Footer */}
                    <footer className="px-6 lg:px-12 py-8 border-t border-white/5 flex items-center justify-between opacity-20">
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
            </div>
        </motion.div>
    );
};
