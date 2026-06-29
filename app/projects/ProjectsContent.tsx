'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

import ProjectCard from '@/components/ProjectCard';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePortfolio } from '@/context/PortfolioContext';

const categories = ['All', 'Freelancing', 'Hackathons', 'SaaS', 'My Tools', 'Web', 'Android', 'CLI', 'UI UX', 'Games', '3D', 'AIML'];

// Map display labels to DB values
const categoryToDbValue: Record<string, string> = {
    'All': 'all',
    'Freelancing': 'freelancing',
    'Hackathons': 'hackathons',
    'SaaS': 'saas',
    'My Tools': 'my-tools',
    'Web': 'web',
    'Android': 'android',
    'CLI': 'cli',
    'UI UX': 'ui-ux',
    'Games': 'games',
    '3D': '3d',
    'AIML': 'aiml',
};

const categoryDescriptions: Record<string, string> = {
    'All': 'Explore my complete body of work across various tech sectors, from foundational experiments to advanced production systems.',
    'Freelancing': 'Real-world client projects built to spec — from MVPs to full-scale production applications.',
    'Hackathons': 'Time-boxed innovation sprints where creative problem-solving meets rapid prototyping.',
    'SaaS': 'Scalable software-as-a-service platforms engineered for reliability, multi-tenancy, and growth.',
    'My Tools': 'Custom-built utilities and developer tools that solve my own pain points.',
    'Web': 'Modern, high-performance web applications built with the latest front-end frameworks and robust back-end systems.',
    'Android': 'Native and cross-platform mobile experiences designed for scale and seamless user interaction.',
    'CLI': 'Command-line interfaces and terminal-based tools that bring power to the keyboard.',
    'UI UX': 'Human-centered design systems and interfaces that prioritize clarity, aesthetics, and meaningful interactions.',
    'Games': 'Interactive game experiences built with modern web technologies and creative gameplay mechanics.',
    '3D': 'Three-dimensional experiences, visualizations, and immersive web applications.',
    'AIML': 'Artificial Intelligence and Machine Learning projects, from neural networks to predictive analytics.',
};

export default function ProjectsContent() {
    const { projects, loading } = usePortfolio();
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [visibleCount, setVisibleCount] = useState(6);

    // Reset visible count when filter or search changes
    React.useEffect(() => {
        setVisibleCount(6);
    }, [filter, search]);

    const filteredProjects = projects.filter(p => {
        const dbValue = categoryToDbValue[filter];
        const matchesFilter = filter === 'All' || p.category === dbValue;
        const query = (search || '').toLowerCase();
        const matchesSearch = !query || (p.title?.toLowerCase().includes(query) || false) ||
            (p.shortDescription?.toLowerCase().includes(query) || false);
        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return (
            <div className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-4"></div>
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
                    <h1 className="text-[4rem] sm:text-[6rem] font-seona uppercase tracking-tighter leading-none mb-5 text-white">All Projects</h1>
                    <p className="text-base text-zinc-400 max-w-xl leading-relaxed">
                        A comprehensive list of my technical exploits, experiments, and production-ready applications.
                    </p>
                </motion.div>

                {/* Filters and Search */}
                <div className="space-y-6 mb-12">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={cn(
                                        "px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-200",
                                        filter === cat
                                            ? "bg-[#C5FF41] text-black shadow-[0_0_20px_rgba(197,255,65,0.2)] font-bold"
                                            : "bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white transition-all"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 bg-white/5 px-6 py-3 rounded-full border border-white/10 text-white focus-within:border-white/30 transition-colors w-full md:w-80">
                            <Search className="w-4 h-4 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-transparent border-none outline-none text-sm flex-1"
                            />
                        </div>
                    </div>

                    {/* Dynamic Category Description */}
                    <div className="pl-2">
                        <p className="text-zinc-500 text-sm leading-relaxed max-w-3xl animate-in fade-in slide-in-from-left-2 duration-500">
                            {categoryDescriptions[filter]}
                        </p>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-12 gap-8 mb-12">
                    {filteredProjects.slice(0, visibleCount).map((project: any) => (
                        <div key={project._id} className="col-span-12 md:col-span-6 lg:col-span-4">
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>

                {filteredProjects.length > visibleCount && (
                    <div className="flex justify-center mt-12 mb-8">
                        <button
                            onClick={() => setVisibleCount(prev => prev + 6)}
                            className="group relative px-8 py-4 rounded-full bg-[#0A0A0A] border border-white/10 text-white font-dm-mono text-sm uppercase tracking-widest hover:border-[#FF4F00] transition-all duration-300 shadow-xl overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2 group-hover:text-[#FF4F00] transition-colors">
                                View More Projects
                            </span>
                        </button>
                    </div>
                )}

                {filteredProjects.length === 0 && (
                    <div className="text-center py-24">
                        <p className="text-zinc-500">No projects found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
