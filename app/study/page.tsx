'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { getPublicFolders, NoteFolder } from '@/lib/api';
import StudyFolder from '@/components/study/StudyFolder';
import { Search, RefreshCw, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StudyPage() {
    const [folders, setFolders] = useState<NoteFolder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                setIsLoading(true);
                const response = await getPublicFolders();
                if (response.success) {
                    setFolders(response.data.folders);
                } else {
                    setError('Failed to load study materials');
                }
            } catch (err) {
                console.error('Error fetching folders:', err);
                setError('Something went wrong while connecting to the server.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchFolders();
    }, []);

    // Filter topics based on search
    const filteredFolders = useMemo(() => {
        return folders.filter(folder =>
            folder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (folder.description && folder.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [folders, searchQuery]);

    return (
        <div className="pt-32 pb-24 px-6">
            <div className="max-w-6xl mx-auto">
                {/* macOS Header Style */}
                <div className="mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-5 font-seona"
                    >
                        study<span className="text-primary">library.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.4 }}
                        className="text-base text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed"
                    >
                        An engineering vault for technical research and architectural deep-dives. Sync'd live from the cloud.
                    </motion.p>
                </div>

                {/* macOS Mini Toolbar */}
                <div className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-4 rounded-[2.5rem] bg-zinc-100/50 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800">
                    <div className="relative w-full sm:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            placeholder="Search folders or topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-12 pl-12 pr-6 bg-white dark:bg-zinc-950 rounded-full border-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                        <span className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-amber-500 animate-pulse' : 'bg-primary'}`} />
                            {isLoading ? 'Fetching...' : `${folders.length} Topics`}
                        </span>
                        <span className="opacity-30">|</span>
                        <span>Finder Grid</span>
                    </div>
                </div>

                {/* Main Content Area */}
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div 
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
                        >
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex flex-col items-center gap-4 animate-pulse">
                                    <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
                                    <div className="w-20 h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                                </div>
                            ))}
                        </motion.div>
                    ) : error ? (
                        <motion.div 
                            key="error"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-20 bg-red-50/50 dark:bg-red-500/5 rounded-[3rem] border border-red-100 dark:border-red-900/30"
                        >
                            <AlertCircle className="mx-auto text-red-500 mb-4" size={40} />
                            <h3 className="text-lg font-black uppercase tracking-widest text-red-600 dark:text-red-400 mb-2">Sync Error</h3>
                            <p className="text-zinc-500 max-w-sm mx-auto text-sm">{error}</p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="mt-6 px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform"
                            >
                                Retry Connection
                            </button>
                        </motion.div>
                    ) : filteredFolders.length === 0 ? (
                        <motion.div 
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/20 rounded-[3rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800"
                        >
                            <p className="text-muted-foreground font-medium">No folders found matching your search.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            layout
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
                        >
                            {filteredFolders.map((folder, index) => (
                                <motion.div
                                    key={folder._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <StudyFolder
                                        name={folder.name}
                                        slug={folder.slug}
                                        description={folder.description}
                                        itemCount={folder.noteCount || 0}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
