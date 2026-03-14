'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import BlogCard from '@/components/BlogCard';
import { Sparkles } from 'lucide-react';
import { type Blog } from '@/lib/api';

const categories = ['All', 'Tech', 'AI', 'Health', 'Poetry', 'Life'];

const categoryColors: Record<string, string> = {
    All: 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900',
    Tech: 'bg-blue-500 text-white',
    AI: 'bg-violet-500 text-white',
    Health: 'bg-green-500 text-white',
    Poetry: 'bg-pink-500 text-white',
    Life: 'bg-amber-500 text-white',
};

const inactiveClass = 'bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-primary/50 hover:text-primary';

interface BlogContentProps {
    initialBlogs: Blog[];
}

export default function BlogContent({ initialBlogs }: BlogContentProps) {
    const [filter, setFilter] = useState('All');

    const filteredBlogs = useMemo(() => 
        initialBlogs.filter(b => (filter === 'All' || b.category === filter) && b.isPublished),
    [initialBlogs, filter]);

    return (
        <div className="pt-32 pb-24 px-6">
            <div className="max-w-6xl mx-auto">

                {/* Page header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-5 font-seona">
                        Blog
                    </h1>
                    <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
                        Thoughts, tutorials, and deep-dives on technology, AI, and the things that keep me curious.
                    </p>
                </motion.div>

                {/* Category filters */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex flex-wrap gap-2 mb-12"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={cn(
                                'px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-200',
                                filter === cat
                                    ? (categoryColors[cat] ?? 'bg-primary text-primary-foreground') + ' shadow-md'
                                    : inactiveClass
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Stats row */}
                <div className="flex items-center gap-2 mb-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                    <Sparkles className="w-3 h-3" />
                    <span>{filteredBlogs.length} {filteredBlogs.length === 1 ? 'Article' : 'Articles'}</span>
                    {filter !== 'All' && <span className="text-primary">in {filter}</span>}
                </div>

                {/* Blog grid — fixed 3-col on desktop, equal height rows */}
                {filteredBlogs.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
                    >
                        {filteredBlogs.map((blog, i) => (
                            <motion.div
                                key={blog._id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: i * 0.06 }}
                            >
                                <BlogCard blog={blog as any} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-6">
                            <Sparkles className="w-7 h-7 text-muted-foreground/30" />
                        </div>
                        <p className="text-sm font-black uppercase tracking-widest text-muted-foreground/40">No articles yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
