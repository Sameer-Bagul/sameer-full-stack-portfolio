'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, BookOpen, Briefcase } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-9xl font-black text-primary mb-4">404</h1>
                <h2 className="text-3xl font-bold mb-6 tracking-tight">You've reached a dead end.</h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-10 text-lg">
                    The page you're looking for might have been moved, deleted, or never existed in the first place.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-all font-medium"
                    >
                        <Home className="w-4 h-4" />
                        Go Home
                    </Link>
                    <Link
                        href="/study"
                        className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-full hover:opacity-90 transition-all font-medium"
                    >
                        <BookOpen className="w-4 h-4" />
                        Study Library
                    </Link>
                    <Link
                        href="/projects"
                        className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-full hover:opacity-90 transition-all font-medium"
                    >
                        <Briefcase className="w-4 h-4" />
                        Projects
                    </Link>
                </div>
            </motion.div>

            <div className="mt-20 text-sm text-muted-foreground flex items-center gap-2">
                <ArrowLeft className="w-3 h-3" />
                <span>Lost? Check out the sitemap or search.</span>
            </div>
        </div>
    );
}
