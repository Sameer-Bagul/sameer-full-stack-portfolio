'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FolderIcon, BookOpen } from 'lucide-react';
import { getPublicFolders, type NoteFolder } from '@/lib/api';
import Link from 'next/link';

export default function NotesPage() {
    const [folders, setFolders] = useState<NoteFolder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                // Assuming "sameerbagul" as username or omitting if it defaults to your own
                const res = await getPublicFolders();
                if (res.success && res.data?.folders) {
                    setFolders(res.data.folders);
                } else if (Array.isArray((res as any).data)) {
                    // Fallback depending on exact response format
                    setFolders((res as any).data);
                }
            } catch (error) {
                console.error('Error fetching public folders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFolders();
    }, []);

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

    return (
        <div className="pt-32 pb-24 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-5 font-seona">
                        Notes
                    </h1>
                    <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
                        A digital garden of my public notes, research, and documentation.
                    </p>
                </motion.div>

                {folders.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                    >
                        {folders.map((folder, i) => (
                            <motion.div
                                key={folder._id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: i * 0.06 }}
                            >
                                <Link href={`/notes/${folder.slug}`} className="block h-full cursor-pointer">
                                    <div className="h-full flex flex-col bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 transition-all duration-300">
                                        <div className="flex items-start justify-between mb-4">
                                            <div 
                                                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                                                style={{ backgroundColor: `${folder.color || '#6366f1'}20`, color: folder.color || '#6366f1' }}
                                            >
                                                <FolderIcon className="w-6 h-6" />
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground/60 bg-white dark:bg-black/20 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800">
                                                <BookOpen className="w-3.5 h-3.5" />
                                                {folder.noteCount || 0}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 line-clamp-1">{folder.name}</h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-auto">
                                            {folder.description || 'No description provided.'}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-6">
                            <FolderIcon className="w-7 h-7 text-muted-foreground/30" />
                        </div>
                        <p className="text-sm font-black uppercase tracking-widest text-muted-foreground/40">No public folders available</p>
                    </div>
                )}
            </div>
        </div>
    );
}
