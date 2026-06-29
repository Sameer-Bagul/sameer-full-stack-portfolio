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

    // Helper to convert github blob URLs to raw image URLs so Next.js Image component can optimize them
    const getSafeImageUrl = (url: string | undefined) => {
        if (!url) return '';
        if (url.includes('github.com') && url.includes('/blob/')) {
            return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
        }
        return url;
    };
    const safeImageUrl = getSafeImageUrl(project.image);

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
                        "group relative flex flex-col h-full overflow-hidden rounded-[2.5rem] bg-[#0A0A0A] border border-white/10 cursor-pointer transition-all duration-500 active:scale-[0.98] shadow-2xl hover:-translate-y-2 hover:border-[#FF4F00]/50 hover:shadow-[0_0_40px_rgba(255,79,0,0.15)] p-6 sm:p-8"
                    )}
                >
                    {/* Image Area */}
                    <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-black mb-8 shrink-0 border border-white/5">
                        <div className="h-full w-full">
                            {safeImageUrl ? (
                                <Image
                                    src={safeImageUrl}
                                    alt={project.title || 'Project thumbnail'}
                                    fill
                                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    priority={isFeatured}
                                />
                            ) : (
                                <div className={cn('h-full w-full flex items-center justify-center transition-transform duration-700 group-hover:scale-105', gradient)}>
                                    <Icon className="h-24 w-24 text-white drop-shadow-2xl" strokeWidth={1} />
                                </div>
                            )}
                        </div>

                        {/* Top Right Action Button */}
                        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:bg-[#FF4F00] group-hover:border-[#FF4F00] transition-all duration-300">
                            <ArrowUpRight className="h-5 w-5 text-white" />
                        </div>

                        {isFeatured && (
                            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#FF4F00] shadow-[0_4px_20px_rgba(255,79,0,0.5)]">
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white font-dm-mono">Selected Work</span>
                            </div>
                        )}
                        
                        {/* Dark Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none opacity-60" />
                    </div>

                    <div className="flex flex-col grow justify-between relative z-10 w-full">
                        <div className="mb-6">
                            <h3 className="text-3xl font-seona uppercase tracking-tighter text-white group-hover:text-[#FF4F00] transition-colors duration-500 leading-none mb-3">
                                {project.title}
                            </h3>
                            <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed font-light">
                                {project.shortDescription}
                            </p>
                        </div>

                        <div className="flex gap-2 flex-wrap mt-auto w-full">
                            {(project.techStack || []).slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[9px] uppercase font-bold tracking-widest bg-white/5 border border-white/10 text-zinc-300 px-3 py-1.5 rounded-xl font-dm-mono group-hover:border-white/20 transition-colors"
                                >
                                    {tag}
                                </span>
                            ))}
                            {(project.techStack || []).length > 3 && (
                                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 self-center ml-1 font-dm-mono">
                                    +{(project.techStack || []).length - 3}
                                </span>
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
