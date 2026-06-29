import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProjectBySlug, getProjectById, getProjects } from '@/lib/api';
import { getProjectTheme } from '@/lib/project-themes';
import { SITE_NAME, absoluteUrl } from '@/lib/site';

// No custom CSS, using Tailwind.

// Revalidate every 5 minutes (ISR)
export const revalidate = 300;

import { ArrowLeft, Play, Github, ExternalLink, Star, User, Code2, LayoutGrid, Calendar } from 'lucide-react';
import ContributorAvatar from '@/components/ContributorAvatar';

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

async function resolveProject(slugOrId: string) {
    try {
        return await getProjectBySlug(slugOrId);
    } catch {
        try {
            return await getProjectById(slugOrId);
        } catch {
            return null;
        }
    }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = await resolveProject(slug);
    if (!project) return { title: 'Project Not Found' };
    return {
        title: project.title,
        description: project.shortDescription,
        openGraph: {
            title: project.title,
            description: project.shortDescription,
            images: project.image ? [{ url: project.image, width: 1200, height: 630, alt: project.title }] : [],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: project.title,
            description: project.shortDescription,
            images: project.image ? [project.image] : [],
        },
        alternates: { canonical: absoluteUrl(`/projects/${project.slug || slug}`) },
    };
}

export async function generateStaticParams() {
    try {
        const projects = await getProjects();
        return projects.filter((p) => p.slug).map((p) => ({ slug: p.slug as string }));
    } catch {
        return [];
    }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = await resolveProject(slug);
    if (!project) notFound();

    const displayDate = project.projectDate || project.createdAt?.split('T')[0] || null;
    const year = displayDate ? new Date(displayDate).getFullYear() : '2026';

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl() },
            { '@type': 'ListItem', position: 2, name: 'Projects', item: absoluteUrl('/projects') },
            { '@type': 'ListItem', position: 3, name: project.title, item: absoluteUrl(`/projects/${slug}`) },
        ],
    };

    const softwareJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: project.title,
        description: project.shortDescription,
        image: project.image || undefined,
        url: project.liveUrl || absoluteUrl(`/projects/${slug}`),
        author: { '@type': 'Person', name: SITE_NAME, url: absoluteUrl() },
        applicationCategory: project.category,
        ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
    };

    return (
        <div className="min-h-screen text-white pb-32 selection:bg-[#FF4F00] selection:text-black">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32">
                
                {/* HERO */}
                <section className="mb-20">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 px-6 py-3 mb-12 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-[#FF4F00] hover:border-[#FF4F00]/30 transition-all"
                    >
                        <ArrowLeft size={14} />
                        Back to Projects
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
                        <div className="lg:col-span-8">
                            <p className="text-[#FF4F00] font-dm-mono text-xs uppercase tracking-[0.2em] mb-6">
                                {project.category?.replace(/-/g, ' ')} · {year}
                            </p>
                            <h1 className="font-seona uppercase tracking-tighter text-5xl sm:text-7xl lg:text-8xl leading-[0.9] mb-8">
                                {project.title}
                            </h1>
                            <p className="text-lg sm:text-xl text-zinc-400 font-light leading-relaxed max-w-3xl mb-8">
                                {project.shortDescription}
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-wider text-white">
                                    <div className="w-2 h-2 rounded-full bg-[#C5FF41] shadow-[0_0_10px_#C5FF41]" />
                                    Live Project
                                </span>
                                {project.isFeatured && (
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FF4F00]/30 bg-[#FF4F00]/10 text-xs font-bold uppercase tracking-wider text-[#FF4F00]">
                                        <Star size={14} className="fill-[#FF4F00]" /> 
                                        Featured
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-4 flex flex-col gap-8">
                            <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 border-t border-white/10 lg:border-t-0 pt-8 lg:pt-0">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-zinc-500 font-dm-mono text-[10px] uppercase tracking-widest">
                                        <User size={12} /> Role
                                    </div>
                                    <div className="text-sm font-medium">{(project.contributors && project.contributors.length > 0) ? 'Lead Engineer' : 'Solo Engineer'}</div>
                                </div>
                                {project.techStack && project.techStack.length > 0 && (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-zinc-500 font-dm-mono text-[10px] uppercase tracking-widest">
                                            <Code2 size={12} /> Core Stack
                                        </div>
                                        <div className="text-sm font-medium">{project.techStack[0]}</div>
                                    </div>
                                )}
                                {project.category && (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-zinc-500 font-dm-mono text-[10px] uppercase tracking-widest">
                                            <LayoutGrid size={12} /> Type
                                        </div>
                                        <div className="text-sm font-medium capitalize">{project.category.replace(/-/g, ' ')}</div>
                                    </div>
                                )}
                                {year && (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-zinc-500 font-dm-mono text-[10px] uppercase tracking-widest">
                                            <Calendar size={12} /> Year
                                        </div>
                                        <div className="text-sm font-medium">{year}</div>
                                    </div>
                                )}
                            </div>

                            {(project.liveUrl || project.githubUrl || project.videoUrl) && (
                                <div className="flex flex-col gap-3 pt-6 lg:border-t border-white/10">
                                    {project.liveUrl && (
                                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="w-full group relative px-6 py-4 rounded-full bg-[#0A0A0A] border border-white/20 text-white font-dm-mono text-xs uppercase tracking-widest hover:border-[#FF4F00] transition-all duration-300 shadow-xl overflow-hidden text-center flex items-center justify-center gap-3">
                                            <ExternalLink size={14} className="group-hover:text-[#FF4F00] transition-colors" />
                                            <span className="group-hover:text-[#FF4F00] transition-colors">Live Demo</span>
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="w-full group relative px-6 py-4 rounded-full bg-[#0A0A0A] border border-white/10 text-white font-dm-mono text-xs uppercase tracking-widest hover:border-white/30 transition-all duration-300 shadow-xl overflow-hidden text-center flex items-center justify-center gap-3">
                                            <Github size={14} />
                                            <span>Source Code</span>
                                        </a>
                                    )}
                                    {project.videoUrl && (
                                        <a href="#video" className="w-full group relative px-6 py-4 rounded-full bg-[#0A0A0A] border border-white/10 text-white font-dm-mono text-xs uppercase tracking-widest hover:border-[#FF4F00] transition-all duration-300 shadow-xl overflow-hidden text-center flex items-center justify-center gap-3">
                                            <Play size={14} className="group-hover:text-[#FF4F00] transition-colors" />
                                            <span className="group-hover:text-[#FF4F00] transition-colors">Watch Demo</span>
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* SCREENSHOT */}
                {project.image && (() => {
                    const getSafeImageUrl = (url: string) => {
                        if (url.includes('github.com') && url.includes('/blob/')) {
                            return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
                        }
                        return url;
                    };
                    const safeImageUrl = getSafeImageUrl(project.image);
                    return (
                        <div className="mb-24 md:mb-32">
                            <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-black border border-white/10 rounded-[2rem] md:rounded-[3rem] p-2 md:p-4 overflow-hidden group">
                                <div className="relative w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/5">
                                    <Image src={safeImageUrl} alt={project.title || "Project preview"} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60 pointer-events-none" />
                                </div>
                                {project.liveUrl && (
                                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full text-xs font-dm-mono tracking-widest text-zinc-300 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                        {new URL(project.liveUrl).hostname}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })()}

                <div className="max-w-4xl mx-auto space-y-24 md:space-y-32">
                    {/* ABOUT */}
                    {project.description && (
                        <section>
                            <p className="text-[#FF4F00] font-dm-mono text-[10px] uppercase tracking-[0.2em] mb-4">About</p>
                            <h2 className="font-seona uppercase tracking-tighter text-3xl sm:text-5xl mb-8">The Project</h2>
                            <div className="text-sm sm:text-base text-zinc-400 leading-[1.9] whitespace-pre-line">
                                {project.description}
                            </div>
                        </section>
                    )}

                    {/* CONTRIBUTORS */}
                    {project.contributors && project.contributors.length > 0 && (
                        <section className="border-t border-white/10 pt-16">
                            <p className="text-[#FF4F00] font-dm-mono text-[10px] uppercase tracking-[0.2em] mb-4">Team</p>
                            <h2 className="font-seona uppercase tracking-tighter text-3xl sm:text-5xl mb-8">Contributors</h2>
                            
                            <div className="flex flex-wrap gap-4 mt-6">
                                {project.contributors.map((contributor: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 p-2 rounded-full pr-6 hover:border-white/30 transition-colors">
                                        <ContributorAvatar contributor={contributor} size={36} />
                                        <span className="font-dm-mono text-xs text-white uppercase tracking-wider">{contributor}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* STACK */}
                    {((project.techStack && project.techStack.length > 0) || (project.tags && project.tags.length > 0)) && (
                        <section className="border-t border-white/10 pt-16">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {project.techStack && project.techStack.length > 0 && (
                                    <div>
                                        <p className="text-[#FF4F00] font-dm-mono text-[10px] uppercase tracking-[0.2em] mb-6">Core Technologies</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.techStack.map((tech: string) => (
                                                <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-wider text-white" key={tech}>{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {project.tags && project.tags.length > 0 && (
                                    <div className={`${project.techStack && project.techStack.length > 0 ? 'md:pl-12 md:border-l border-white/10' : ''}`}>
                                        <p className="text-zinc-500 font-dm-mono text-[10px] uppercase tracking-[0.2em] mb-6">Keywords & Tags</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag: string) => (
                                                <span className="px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] text-xs font-mono text-zinc-400" key={tag}>#{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* FEATURES */}
                    {project.features && project.features.length > 0 && (
                        <section className="border-t border-white/10 pt-16">
                            <p className="text-[#FF4F00] font-dm-mono text-[10px] uppercase tracking-[0.2em] mb-4">What it does</p>
                            <h2 className="font-seona uppercase tracking-tighter text-3xl sm:text-5xl mb-12">Core features</h2>

                            <ul className="grid grid-cols-1 gap-8">
                                {project.features.map((feature: string, i: number) => {
                                    const parts = feature.split(':');
                                    const hasTitle = parts.length > 1;
                                    const fTitle = hasTitle ? parts[0] : '';
                                    const fDesc = hasTitle ? parts.slice(1).join(':') : feature;

                                    return (
                                        <li key={i} className="flex items-start gap-6 group">
                                            <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-[#FF4F00]/10 group-hover:border-[#FF4F00]/30 transition-colors">
                                                <span className="text-[#FF4F00] font-black text-xs">{(i+1).toString().padStart(2, '0')}</span>
                                            </div>
                                            <div>
                                                {fTitle && <h3 className="text-white font-bold tracking-tight text-lg mb-2">{fTitle.trim()}</h3>}
                                                <p className="text-zinc-400 text-sm leading-relaxed">
                                                    {fDesc.trim()}
                                                </p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    )}

                    {/* METRICS */}
                    {project.metrics && project.metrics.length > 0 && (
                        <section className="border-t border-white/10 pt-16">
                            <p className="text-[#C5FF41] font-dm-mono text-[10px] uppercase tracking-[0.2em] mb-4">Impact</p>
                            <h2 className="font-seona uppercase tracking-tighter text-3xl sm:text-5xl mb-12">Key Metrics</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {project.metrics.map((metric: string, i: number) => (
                                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-[#C5FF41]/30 transition-colors">
                                        <p className="text-white font-bold text-xl">{metric}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* CHALLENGES & LEARNINGS */}
                    {((project.challenges && project.challenges.length > 0) || (project.learnings && project.learnings.length > 0)) && (
                        <section className="border-t border-white/10 pt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
                            {project.challenges && project.challenges.length > 0 && (
                                <div>
                                    <p className="text-red-400 font-dm-mono text-[10px] uppercase tracking-[0.2em] mb-4">Obstacles</p>
                                    <h2 className="font-seona uppercase tracking-tighter text-3xl sm:text-4xl mb-8">Challenges</h2>
                                    <ul className="space-y-4">
                                        {project.challenges.map((challenge: string, i: number) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <div className="mt-1 w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                                                <p className="text-zinc-400 text-sm leading-relaxed">{challenge}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {project.learnings && project.learnings.length > 0 && (
                                <div>
                                    <p className="text-blue-400 font-dm-mono text-[10px] uppercase tracking-[0.2em] mb-4">Takeaways</p>
                                    <h2 className="font-seona uppercase tracking-tighter text-3xl sm:text-4xl mb-8">Learnings</h2>
                                    <ul className="space-y-4">
                                        {project.learnings.map((learning: string, i: number) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <div className="mt-1 w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                                                <p className="text-zinc-400 text-sm leading-relaxed">{learning}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </section>
                    )}

                    {/* CLIENT TESTIMONIAL */}
                    {project.clientTestimonial && project.clientTestimonial.quote && (
                        <section className="border-t border-white/10 pt-16">
                            <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5FF41]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                                <svg className="w-12 h-12 text-[#FF4F00]/20 mb-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                <p className="text-xl md:text-2xl font-light text-zinc-300 leading-relaxed mb-8 italic">"{project.clientTestimonial.quote}"</p>
                                <div>
                                    <p className="text-white font-bold tracking-tight">{project.clientTestimonial.name}</p>
                                    <p className="text-[#FF4F00] font-dm-mono text-[10px] uppercase tracking-widest">{project.clientTestimonial.role}</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* VIDEO */}
                    {project.videoUrl && (
                        <section className="border-t border-white/10 pt-16" id="video">
                            <p className="text-[#FF4F00] font-dm-mono text-[10px] uppercase tracking-[0.2em] mb-4">Demo</p>
                            <h2 className="font-seona uppercase tracking-tighter text-3xl sm:text-5xl mb-4">See it in action</h2>
                            <p className="text-zinc-400 mb-12">A full walkthrough of the core features and UI.</p>

                            <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 bg-black">
                                <iframe 
                                    src={project.videoUrl.includes('watch?v=') ? project.videoUrl.replace('watch?v=', 'embed/') : project.videoUrl}
                                    title={`${project.title} Demo`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full border-none absolute inset-0"
                                ></iframe>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
