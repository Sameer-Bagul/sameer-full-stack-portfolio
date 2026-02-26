'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Briefcase, Loader2 } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

export default function Experience() {
    const { experience: experiencesData, loading } = usePortfolio();
    const [selectedJobId, setSelectedJobId] = useState<string>("");

    const experiences = React.useMemo(() => {
        return experiencesData.map(exp => ({
            ...exp,
            id: exp.id || exp._id
        }));
    }, [experiencesData]);

    useEffect(() => {
        if (experiences.length > 0 && !selectedJobId) {
            setSelectedJobId(experiences[0].id || experiences[0]._id);
        }
    }, [experiences, selectedJobId]);

    const selectedJob = experiences.find(j => j.id === selectedJobId || j._id === selectedJobId);

    if (loading) {
        return (
            <div className="py-24 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <section className="py-16 sm:py-20 md:py-24 bg-zinc-50 dark:bg-zinc-900/50 overflow-hidden w-full">
            <div className="container px-4 sm:px-6 max-w-6xl mx-auto">
                <div className="mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-none mb-3 sm:mb-4 font-seona not-italic">Experience</h2>
                    <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed font-seona not-italic">My journey through the tech landscape</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
                    {/* Timeline */}
                    <div className="md:col-span-7 space-y-3">
                        {experiences.map((job) => (
                            <div
                                key={job._id || job.id}
                                onClick={() => setSelectedJobId(job.id || job._id)}
                                className={cn(
                                    "p-4 sm:p-6 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300 border-2",
                                    (selectedJobId === job.id || selectedJobId === job._id)
                                        ? "bg-white dark:bg-zinc-800 border-primary shadow-lg"
                                        : "bg-zinc-100 dark:bg-zinc-900 border-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
                                )}
                            >
                                <div className="flex justify-between items-start gap-3 sm:gap-4">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap font-seona not-italic">
                                            <h3 className="text-sm sm:text-base font-black tracking-tight break-words">{job.role}</h3>
                                            {job.current && (
                                                <span className="text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full bg-primary/10 text-primary whitespace-nowrap">
                                                    Current
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-muted-foreground/60 truncate font-seona not-italic">
                                            {job.company} {job.location && <span className="opacity-50 ml-1">• {job.location}</span>}
                                        </p>
                                    </div>
                                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 whitespace-nowrap shrink-0">{job.duration}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Detail panel */}
                    <div className="md:col-span-5">
                        <Card className="p-5 sm:p-7 h-full md:sticky md:top-24 bg-white dark:bg-zinc-800 border-none rounded-xl sm:rounded-2xl shadow-sm">
                            {selectedJob ? (
                                <div className="space-y-5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Briefcase size={12} className="text-primary" />
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">Role Details</span>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-black tracking-tight leading-snug">{selectedJob.role}</h3>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 mt-1">
                                            {selectedJob.company} {selectedJob.location && <span className="opacity-50 ml-1">• {selectedJob.location}</span>}
                                        </p>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-primary mt-1">{selectedJob.duration}</p>
                                    </div>

                                    <ul className="space-y-2">
                                        {selectedJob.bullets?.map((b, i) => (
                                            <li key={i} className="flex gap-2 items-start text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                                <span className="shrink-0 mt-[5px] w-1.5 h-1.5 rounded-full bg-primary/60 block" />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>

                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-2">Tech Stack</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {selectedJob.techStack?.map((tech) => (
                                                <span key={tech} className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-[9px] font-black uppercase tracking-wider">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center py-12">Select a job to see details</p>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
