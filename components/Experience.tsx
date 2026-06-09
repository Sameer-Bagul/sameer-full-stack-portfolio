'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Briefcase, Loader2 } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { STYLES } from '@/lib/constants/styles';

export default function Experience() {
    const { experience: experiencesData, loading } = usePortfolio();
    const [selectedJobId, setSelectedJobId] = useState<string>("");

    const experiences = React.useMemo(() => {
        const mapped = experiencesData.map(exp => ({
            ...exp,
            id: exp.id || exp._id
        }));
        return mapped.sort((a, b) => {
            if (a.current && !b.current) return -1;
            if (!a.current && b.current) return 1;
            return 0;
        });
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
        <section className="py-24 sm:py-32 overflow-hidden w-full border-t border-[var(--tmpl-border)]">
            <div className="container px-4 sm:px-6 max-w-[1200px] mx-auto">
                <div className="mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
                    <div className="space-y-3 sm:space-y-4">
                        <h2 className={cn(STYLES.heading, "text-left leading-none m-0 text-3xl sm:text-4xl md:text-6xl font-seona not-italic tracking-tight")}>
                            Experience
                        </h2>
                        <p className={cn(STYLES.subheading, "text-left m-0 opacity-40 uppercase tracking-[0.3em] text-[9px] sm:text-[10px] font-black")}>
                            My journey through the tech landscape
                        </p>
                    </div>

                    <Link href="/resume" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 hover:text-primary transition-colors">
                        View Resume <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                    {/* Timeline */}
                    <div className="md:col-span-7 space-y-3">
                        {experiences.map((job) => (
                            <div
                                key={job._id || job.id}
                                onClick={() => setSelectedJobId(job.id || job._id)}
                                className={cn(
                                    "p-6 sm:p-7 rounded-xl cursor-pointer transition-all duration-300 border group",
                                    (selectedJobId === job.id || selectedJobId === job._id)
                                        ? "bg-[var(--tmpl-surface)] border-[var(--tmpl-border-hi)] shadow-xl"
                                        : "bg-transparent border-[var(--tmpl-border)] hover:bg-[var(--tmpl-surface)] hover:border-[var(--tmpl-border-hi)]"
                                )}
                            >
                                <div className="flex flex-col xl:flex-row justify-between items-start gap-4">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                                            <h3 className={cn(
                                                "text-lg sm:text-xl font-medium transition-colors",
                                                (selectedJobId === job.id || selectedJobId === job._id) ? "text-[var(--tmpl-text)]" : "text-[var(--tmpl-text-2)] group-hover:text-[var(--tmpl-text)]"
                                            )}>{job.role}</h3>
                                            {job.current && (
                                                <span className="text-[10px] font-dm-mono uppercase tracking-[0.1em] px-2.5 py-1 rounded-full bg-[var(--tmpl-green-dim)] text-[var(--tmpl-green)] border border-[rgba(69,201,122,0.18)]">
                                                    Current
                                                </span>
                                            )}
                                        </div>
                                        <p className="font-dm-mono text-[11px] uppercase tracking-[0.1em] text-[var(--tmpl-text-2)]">
                                            {job.company} {job.location && <span className="opacity-50 ml-2">• {job.location}</span>}
                                        </p>
                                    </div>
                                    <span className="font-dm-mono text-[10px] uppercase tracking-[0.1em] text-[var(--tmpl-accent)] whitespace-nowrap shrink-0 pt-1">
                                        {job.duration}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Detail panel */}
                    <div className="md:col-span-5">
                        <Card className="p-8 h-full md:sticky md:top-32 bg-[var(--tmpl-surface)] border border-[var(--tmpl-border)] rounded-2xl shadow-xl">
                            {selectedJob ? (
                                <div className="space-y-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full border border-[var(--tmpl-border-hi)] flex items-center justify-center bg-[#080808]">
                                            <Briefcase size={13} className="text-[var(--tmpl-accent)]" />
                                        </div>
                                        <span className="font-dm-mono text-[10px] uppercase tracking-[0.2em] text-[var(--tmpl-text-3)]">Role Details</span>
                                    </div>

                                    <div>
                                        <h3 className="font-instrument text-3xl sm:text-4xl text-[var(--tmpl-text)] font-normal leading-[1.2]">{selectedJob.role}</h3>
                                        <p className="font-dm-mono text-[11px] uppercase tracking-[0.1em] text-[var(--tmpl-text-2)] mt-4">
                                            {selectedJob.company} {selectedJob.location && <span className="opacity-50 ml-2">• {selectedJob.location}</span>}
                                        </p>
                                        <p className="font-dm-mono text-[11px] uppercase tracking-[0.1em] text-[var(--tmpl-accent)] mt-2">{selectedJob.duration}</p>
                                    </div>

                                    <ul className="space-y-4">
                                        {selectedJob.bullets?.map((b, i) => (
                                            <li key={i} className="flex gap-4 items-start text-[15px] text-[var(--tmpl-text-2)] leading-[1.8]">
                                                <span className="text-[var(--tmpl-accent)] mt-1.5 opacity-50 text-[10px]">✦</span>
                                                {b}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="pt-6 border-t border-[var(--tmpl-border)]">
                                        <p className="font-dm-mono text-[10px] uppercase tracking-[0.2em] text-[var(--tmpl-text-3)] mb-4">Tech Stack</p>
                                        <div className="flex flex-wrap gap-2.5">
                                            {selectedJob.techStack?.map((tech) => (
                                                <span key={tech} className="px-3 py-1.5 bg-[#080808] border border-[var(--tmpl-border)] rounded-md font-dm-mono text-[10px] uppercase tracking-[0.1em] text-[var(--tmpl-text-2)] hover:border-[var(--tmpl-accent)] hover:text-[var(--tmpl-accent)] transition-colors cursor-default">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="font-dm-mono text-[11px] text-[var(--tmpl-text-3)] text-center uppercase tracking-[0.1em] py-12">Select a job to see details</p>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
