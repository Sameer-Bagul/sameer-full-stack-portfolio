'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPublicFolderBySlug, type NoteFolder, type Note } from '@/lib/api';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FolderNotesPage({ params }: { params: { slug: string } }) {
    const [folder, setFolder] = useState<NoteFolder | null>(null);
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

    useEffect(() => {
        const fetchFolderAndNotes = async () => {
            try {
                // Assuming Next.js params is a promise in Next 15, we might need React.use() but let's just use it directly or unwrap if needed
                const slug = params.slug;
                const res = await getPublicFolderBySlug(slug as string);
                
                if (res.success && res.data) {
                    setFolder(res.data.folder);
                    setNotes(res.data.notes || []);
                    if (res.data.notes?.length > 0) {
                        setActiveNoteId(res.data.notes[0]._id);
                    }
                }
            } catch (error) {
                console.error('Error fetching folder:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFolderAndNotes();
    }, [params]);

    if (loading) {
        return (
            <div className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-lg mb-4"></div>
                    <div className="h-4 w-24 bg-zinc-100 dark:bg-zinc-900 rounded"></div>
                </div>
            </div>
        );
    }

    if (!folder) {
        return (
            <div className="pt-32 pb-24 px-6 min-h-screen flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold mb-4">Folder Not Found</h2>
                <p className="text-muted-foreground mb-8">This public note folder might have been deleted or made private.</p>
                <Link href="/notes" className="text-primary hover:underline">
                    &larr; Back to Notes
                </Link>
            </div>
        );
    }

    const activeNote = notes.find(n => n._id === activeNoteId) || notes[0];

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Link href="/notes" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Notes
                    </Link>
                    
                    <div className="flex items-center gap-4 mb-4">
                        <div 
                            className="w-12 h-12 rounded-2xl flex items-center justify-center"
                            style={{ backgroundColor: `${folder.color || '#6366f1'}20`, color: folder.color || '#6366f1' }}
                        >
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-none mt-2 font-seona">
                                {folder.name}
                            </h1>
                        </div>
                    </div>
                    {folder.description && (
                        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
                            {folder.description}
                        </p>
                    )}
                </div>

                <div className="flex flex-col md:flex-row gap-8 mt-12">
                    {/* Sidebar / Table of Contents */}
                    <div className="md:w-1/3 lg:w-1/4 flex-shrink-0">
                        <div className="sticky top-32 space-y-2">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 mb-4 px-3">
                                Notes ({notes.length})
                            </h3>
                            {notes.length === 0 ? (
                                <p className="text-sm text-zinc-500 italic px-3">No notes published in this folder yet.</p>
                            ) : (
                                <nav className="flex flex-col space-y-1">
                                    {notes.map(note => (
                                        <button
                                            key={note._id}
                                            onClick={() => setActiveNoteId(note._id)}
                                            className={cn(
                                                "text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium",
                                                activeNoteId === note._id
                                                    ? "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100"
                                                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/30"
                                            )}
                                        >
                                            <div className="line-clamp-1">{note.title}</div>
                                        </button>
                                    ))}
                                </nav>
                            )}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:w-2/3 lg:w-3/4">
                        {activeNote ? (
                            <motion.div
                                key={activeNote._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-10"
                            >
                                <div className="mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-8">
                                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                                        {activeNote.title}
                                    </h2>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4" />
                                            {new Date(activeNote.updatedAt).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                        {activeNote.tags?.length > 0 && (
                                            <div className="flex items-center gap-2">
                                                <Tag className="w-4 h-4" />
                                                <div className="flex gap-2">
                                                    {activeNote.tags.map(tag => (
                                                        <span key={tag} className="bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div 
                                    className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:border prose-img:border-zinc-200 dark:prose-img:border-zinc-800"
                                    dangerouslySetInnerHTML={{ __html: activeNote.content_html || activeNote.content || '<p><em>Empty note</em></p>' }}
                                />
                            </motion.div>
                        ) : (
                            <div className="bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-10 flex flex-col items-center justify-center text-center h-64">
                                <BookOpen className="w-10 h-10 text-muted-foreground/30 mb-4" />
                                <p className="text-muted-foreground font-medium">Select a note to read</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
