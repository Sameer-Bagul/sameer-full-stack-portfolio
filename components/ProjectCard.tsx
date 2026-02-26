'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from '@/components/ui/dialog';
import {
    Github,
    ExternalLink,
    ArrowUpRight,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProjectTheme } from '@/lib/project-themes';

interface Project {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
    category: string;
    techStack: string[];
    tags?: string[];
    liveUrl: string;
    githubUrl: string;
    image?: string;
    videoUrl?: string;
    projectDate?: string;
    createdAt?: string;
    features?: string[];
    contributors?: string[];
}

interface ProjectCardProps {
    project: Project;
    isFeatured?: boolean;
}

const ProjectCard = memo(({ project, isFeatured = false }: ProjectCardProps) => {
    const { Icon, gradient } = getProjectTheme(project.techStack, project.title, project.description);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <motion.div
                    className="h-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <Card
                        className={cn(
                            "group relative flex flex-col h-full overflow-hidden rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border-none cursor-pointer hover:shadow-2xl transition-all active:scale-[0.98] shadow-sm"
                        )}
                    >
                        {/* Image Area */}
                        <div className="relative h-64 w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                            <div className="h-full w-full">
                                {project.image ? (
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        priority={isFeatured}
                                    />
                                ) : (
                                    <div className={cn('h-full w-full flex items-center justify-center bg-linear-to-br transition-transform duration-700 group-hover:scale-110', gradient)}>
                                        <Icon className="h-20 w-20 text-white/90 drop-shadow-2xl" strokeWidth={1} />
                                    </div>
                                )}
                            </div>

                            <div className="absolute top-6 right-6 p-3 rounded-full bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20 -translate-y-2 group-hover:translate-y-0">
                                <ArrowUpRight className="h-6 w-6 text-white drop-shadow-sm" />
                            </div>

                            {isFeatured && (
                                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-foreground">Selected Work</span>
                                </div>
                            )}
                        </div>

                        <div className="p-8 flex flex-col grow space-y-4">
                            <div>
                                <h3 className="text-2xl font-black lowercase tracking-tighter text-zinc-900 dark:text-zinc-100 mb-2 leading-none font-seona not-italic">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed opacity-80 not-italic">
                                    {project.shortDescription}
                                </p>
                            </div>

                            <div className="mt-auto pt-4 flex gap-2 flex-wrap">
                                {(project.techStack || []).slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] uppercase font-black tracking-wider text-muted-foreground bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {(project.techStack || []).length > 3 && (
                                    <span className="text-[10px] font-black text-muted-foreground self-center ml-1">+{(project.techStack || []).length - 3} More</span>
                                )}
                            </div>
                        </div>
                    </Card>
                </motion.div>

            </DialogTrigger>

            <DialogContent showCloseButton={false} className="max-w-lg w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[90vh] p-0 rounded-2xl overflow-hidden flex flex-col">
                {/* Visually hidden DialogTitle for accessibility */}
                <DialogTitle className="sr-only">{project.title}</DialogTitle>
                <div className="relative w-full h-56 sm:h-64 md:h-80 lg:h-96 flex items-end justify-start">
                    {project.image && (
                        <Image src={project.image} alt={project.title} fill className="absolute inset-0 w-full h-full object-cover z-0" sizes="(max-width: 768px) 100vw, 50vw" />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/60 to-transparent z-10" />
                    <div className="relative z-20 p-6 sm:p-10">
                        <h2 className="font-seona text-3xl sm:text-5xl md:text-6xl font-black lowercase tracking-tight text-white drop-shadow-lg mb-2">{project.title}</h2>
                        <p className="text-sm sm:text-base text-zinc-200 font-seona max-w-2xl mb-2">{project.shortDescription}</p>
                        <div className="flex gap-4 text-xs text-zinc-300">
                            <span>{project.projectDate || project.createdAt?.split('T')[0] || "2024"}</span>
                            <span className="px-2">|</span>
                            <span>{project.category}</span>
                        </div>
                    </div>
                    <DialogClose className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-all">
                        <X size={18} />
                    </DialogClose>
                </div>
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 bg-white dark:bg-zinc-950 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-3">
                        <div className="mb-4">
                            <div className="text-xs font-semibold mb-1 text-zinc-600">Description</div>
                            <p className="text-base text-zinc-800 dark:text-zinc-200 whitespace-pre-line font-seona">{project.description}</p>
                        </div>
                        {project.techStack && project.techStack.length > 0 && (
                            <div className="mb-4">
                                <div className="text-xs font-semibold mb-1 text-zinc-600">Tech Stack</div>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <span key={tech} className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-200">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {project.tags && project.tags.length > 0 && (
                            <div className="mb-4">
                                <div className="text-xs font-semibold mb-1 text-zinc-600">Tags</div>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag: string) => (
                                        <span key={tag} className="px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-700 text-xs text-zinc-700 dark:text-zinc-200">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="md:col-span-1">
                        {project.features && project.features.length > 0 && (
                            <div className="mb-4">
                                <div className="text-xs font-semibold mb-1 text-zinc-600">Features</div>
                                <ul className="list-disc list-inside space-y-1">
                                    {project.features.map((feature, i) => (
                                        <li key={i} className="text-xs text-zinc-700 dark:text-zinc-200">{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {project.contributors && project.contributors.length > 0 && (
                            <div className="mb-4">
                                <div className="text-xs font-semibold mb-1 text-zinc-600">Contributors</div>
                                <div className="flex flex-wrap gap-2">
                                    {project.contributors.map((contributor, i) => (
                                        <span key={i} className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-200">{contributor}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="flex gap-2 mt-4 flex-wrap">
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-2 rounded bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition">
                                    <ExternalLink size={14} /> Live
                                </a>
                            )}
                            {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-2 rounded bg-zinc-800 text-white text-xs font-semibold hover:bg-zinc-700 transition">
                                    <Github size={14} /> GitHub
                                </a>
                            )}
                            {project.videoUrl && (
                                <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-2 rounded bg-zinc-200 text-zinc-800 text-xs font-semibold hover:bg-zinc-300 transition">
                                    <ArrowUpRight size={14} /> Video
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
