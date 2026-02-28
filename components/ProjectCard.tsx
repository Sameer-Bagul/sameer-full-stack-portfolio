'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProjectTheme } from '@/lib/project-themes';

interface Project {
    id: string;
    _id: string;
    title: string;
    slug?: string;
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
    isFeatured?: boolean;
}

interface ProjectCardProps {
    project: Project;
    isFeatured?: boolean;
}

const ProjectCard = memo(({ project, isFeatured = false }: ProjectCardProps) => {
    const { Icon, gradient } = getProjectTheme(project.techStack, project.title, project.description);
    const href = `/projects/${project.slug || project._id}`;

    return (
        <Link href={href} className="h-full block">
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
        </Link>
    );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
