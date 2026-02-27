'use client';

import React, { useState, memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerClose
} from '@/components/ui/drawer';
import {
    Github as GithubIcon,
    MessageSquare as MessageSquareIcon,
    Share2 as Share2Icon,
    Heart as HeartIcon,
    X as XIcon,
    Clock as ClockIcon,
    Calendar as CalendarIcon,
    ChevronRight as ChevronRightIcon,
    User as UserIcon,
    ArrowUpRight as ArrowUpRightIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Blog {
    id: string;
    title: string;
    shortDescription: string;
    longContent: string;
    category: string;
    date: string;
    author: string;
    readingTime?: string;
    tags?: string[];
    image?: string;
    githubLink?: string;
}

interface BlogCardProps {
    blog: Blog;
}

const categoryColors: Record<string, string> = {
    Tech: 'bg-blue-500/10 text-blue-500',
    AI: 'bg-violet-500/10 text-violet-500',
    Health: 'bg-green-500/10 text-green-500',
    Poetry: 'bg-pink-500/10 text-pink-500',
    Life: 'bg-amber-500/10 text-amber-500',
};

const BlogCard = memo(({ blog }: BlogCardProps) => {
    const [liked, setLiked] = useState(false);
    const colorClass = categoryColors[blog.category] ?? 'bg-primary/10 text-primary';

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="h-full"
                >
                    {/* Fixed height card: 320px */}
                    <Card className="group relative overflow-hidden rounded-2xl border-none bg-zinc-50 dark:bg-zinc-900/60 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-[320px]">

                        {/* Top accent bar */}
                        <div className="h-1 w-full bg-gradient-to-r from-primary/60 via-primary to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="flex flex-col flex-1 p-7 min-h-0">
                            {/* Header row */}
                            <div className="flex items-center justify-between mb-4 shrink-0">
                                <span className={cn('text-[9px] font-black uppercase tracking-[0.25em] px-3 py-1 rounded-full', colorClass)}>
                                    {blog.category}
                                </span>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    {blog.readingTime && (
                                        <span className="text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                                            <ClockIcon size={10} /> {blog.readingTime}
                                        </span>
                                    )}
                                    <span className="text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                                        <CalendarIcon size={10} /> {blog.date || 'Soon'}
                                    </span>
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-black tracking-tight leading-snug group-hover:text-primary transition-colors duration-300 mb-3 shrink-0 line-clamp-2">
                                {blog.title}
                            </h3>

                            {/* Description with fade */}
                            <div className="relative flex-1 min-h-0 overflow-hidden">
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                    {blog.shortDescription}
                                </p>
                                {/* Fade gradient at bottom */}
                                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-zinc-50 dark:from-zinc-900/60 to-transparent pointer-events-none" />
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 mt-2 border-t border-zinc-100 dark:border-zinc-800 shrink-0">
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                        <UserIcon size={10} className="text-primary" />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest">{blog.author || 'Sameer Bagul'}</span>
                                </div>
                                <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                    Read more <ArrowUpRightIcon size={10} />
                                </span>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </DrawerTrigger>

            {/* Drawer — full article reader */}
            <DrawerContent className="h-[96vh] border-none bg-zinc-50 dark:bg-zinc-950 rounded-t-[3.5rem] shadow-2xl flex flex-col outline-none">
                <div className="mx-auto mt-4 h-1.5 w-16 rounded-full bg-zinc-300 dark:bg-zinc-800 shrink-0" />

                <DrawerHeader className="sr-only">
                    <DrawerTitle>{blog.title}</DrawerTitle>
                </DrawerHeader>

                <DrawerClose className="absolute top-8 right-8 z-50 p-3 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-all active:scale-95 shadow-xl">
                    <XIcon size={20} />
                </DrawerClose>

                <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-6 sm:p-12 md:p-20">
                    <div className="max-w-5xl mx-auto space-y-12">

                        {/* Hero header */}
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-8 bg-zinc-900 rounded-[2.5rem] overflow-hidden relative min-h-[360px] flex items-end p-10">
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                                <div className="relative z-20 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className={cn('text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full', colorClass)}>
                                            {blog.category}
                                        </span>
                                        <span className="text-[9px] text-white/50 font-black uppercase tracking-[0.3em] flex items-center gap-1.5">
                                            <ClockIcon size={12} /> {blog.readingTime || '5 min read'}
                                        </span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
                                        {blog.title}
                                    </h2>
                                </div>
                            </div>

                            <Card className="col-span-12 lg:col-span-4 rounded-[2.5rem] border-none bg-white dark:bg-zinc-900 p-8 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Published By</h4>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                            <UserIcon size={20} />
                                        </div>
                                        <div>
                                            <div className="font-black tracking-tight text-sm">{blog.author}</div>
                                            <div className="text-[9px] text-muted-foreground uppercase tracking-widest">{blog.date}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                                    <Button
                                        onClick={() => setLiked(!liked)}
                                        className={cn(
                                            'h-12 rounded-xl font-black uppercase tracking-widest text-xs transition-all',
                                            liked ? 'bg-red-500 text-white' : 'bg-primary text-primary-foreground'
                                        )}
                                    >
                                        <HeartIcon size={16} className="mr-2" fill={liked ? 'white' : 'none'} />
                                        {liked ? 'Liked!' : 'Show Support'}
                                    </Button>
                                    <Button variant="outline" className="h-12 rounded-xl border-2 font-black uppercase tracking-widest text-xs">
                                        <Share2Icon size={16} className="mr-2" /> Share
                                    </Button>
                                </div>
                            </Card>
                        </div>

                        {/* Article content */}
                        <div className="grid grid-cols-12 gap-10">
                            <div className="col-span-12 lg:col-span-8">
                                <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:leading-relaxed prose-p:text-foreground/80">
                                    <p className="text-xl font-medium text-primary leading-relaxed border-l-4 border-primary pl-6 mb-10 opacity-90">
                                        {blog.shortDescription}
                                    </p>
                                    <div className="space-y-6">
                                        <p>{blog.longContent}</p>
                                    </div>
                                </article>
                            </div>

                            {/* Sidebar */}
                            <div className="col-span-12 lg:col-span-4 space-y-5">
                                <Card className="rounded-[2rem] border-none bg-white dark:bg-zinc-900 p-8 space-y-6">
                                    <div>
                                        <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-4">Topics</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {blog.tags?.map((tag) => (
                                                <span key={tag} className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-[9px] font-black uppercase tracking-wider">
                                                    #{tag}
                                                </span>
                                            )) || <span className="text-muted-foreground text-xs">No tags.</span>}
                                        </div>
                                    </div>
                                    {blog.githubLink && (
                                        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800">
                                            <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-4">Code</h4>
                                            <Button variant="outline" className="w-full h-12 rounded-xl border-2 font-black uppercase tracking-widest text-xs group" asChild>
                                                <a href={blog.githubLink} target="_blank" rel="noopener noreferrer">
                                                    <GithubIcon size={16} className="mr-2 group-hover:rotate-12 transition-transform" /> Repository
                                                </a>
                                            </Button>
                                        </div>
                                    )}
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
});

BlogCard.displayName = 'BlogCard';
export default BlogCard;
