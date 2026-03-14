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
            <div className="rounded-3xl border border-white/5 bg-zinc-950/10 backdrop-blur-3xl overflow-hidden shadow-sm mb-32 relative">

                <article className="relative">
                    {/* Header: Academic & Minimal */}
                    <header className="px-10 lg:px-20 pt-20 pb-12 border-b border-white/5">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">
                                INVESTIGATION ASSET / {id.slice(-8).toUpperCase()}
                            </span>
                        </div>
 
                        <h1 className="text-4xl lg:text-6xl font-black tracking-tighter mb-6 text-white leading-tight">
                            {title}
                        </h1>
 
                        <div className="flex items-center gap-4 text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-40">
                            <span>ARCHIVE REF: {topic.toUpperCase()}</span>
                            <span>•</span>
                            <span>{estimatedTime} READ</span>
                        </div>
                    </header>

                    {/* Content Section */}
                    <div className="px-10 lg:px-20 py-20">
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
