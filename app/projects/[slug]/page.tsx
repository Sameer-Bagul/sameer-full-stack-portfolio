import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProjectBySlug, getProjectById, getProjects } from '@/lib/api';
import { getProjectTheme } from '@/lib/project-themes';
import { SITE_NAME, absoluteUrl } from '@/lib/site';

// CSS for the template
import './project-detail.css';
import ScrollReveal from './ScrollReveal';

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
            <div className="project-detail-theme pb-20">
            <ScrollReveal />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

            {/* HERO */}
            <section className="project-hero">
                <div className="project-wrap">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-[var(--tmpl-border)] bg-[var(--tmpl-surface)] text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--tmpl-text-2)] hover:text-[var(--tmpl-text)] transition-all shadow-sm w-fit"
                    >
                        <ArrowLeft size={13} />
                        All Projects
                    </Link>

                    <div className="hero-top">
                        <div>
                            <p className="hero-category r">{project.category?.replace(/-/g, ' ')} · {year}</p>
                            <h1 className="hero-title r rd1">{project.title}</h1>
                            <p className="hero-desc r rd2">{project.shortDescription}</p>
                        </div>
                        <div className="r rd1 flex items-center gap-3">
                            <span className="status-pill"><i></i> Live</span>
                            {project.isFeatured && (
                                <span className="status-pill !bg-[rgba(196,163,90,0.1)] !border-[rgba(196,163,90,0.3)] !text-[var(--tmpl-accent)]">
                                    <Star size={11} className="fill-[var(--tmpl-accent)] mr-1" /> Featured
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="hero-meta r">
                        <div className="meta-cell">
                            <div className="meta-header">
                                <div className="meta-icon"><User size={14} /></div>
                                <div className="meta-l">Role</div>
                            </div>
                            <div className="meta-v">{(project.contributors && project.contributors.length > 0) ? 'Lead Engineer' : 'Solo Engineer'}</div>
                        </div>
                        {project.techStack && project.techStack.length > 0 && (
                            <div className="meta-cell">
                                <div className="meta-header">
                                    <div className="meta-icon"><Code2 size={14} /></div>
                                    <div className="meta-l">Stack</div>
                                </div>
                                <div className="meta-v">{project.techStack[0]}</div>
                            </div>
                        )}
                        {project.category && (
                            <div className="meta-cell hidden sm:flex">
                                <div className="meta-header">
                                    <div className="meta-icon"><LayoutGrid size={14} /></div>
                                    <div className="meta-l">Type</div>
                                </div>
                                <div className="meta-v capitalize">{project.category.replace(/-/g, ' ')}</div>
                            </div>
                        )}
                        {year && (
                            <div className="meta-cell hidden sm:flex">
                                <div className="meta-header">
                                    <div className="meta-icon"><Calendar size={14} /></div>
                                    <div className="meta-l">Year</div>
                                </div>
                                <div className="meta-v">{year}</div>
                            </div>
                        )}
                    </div>

                    {(project.liveUrl || project.githubUrl || project.videoUrl) && (
                        <div className="hero-ctas r">
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="tmpl-btn btn-solid">
                                    <ExternalLink size={13} /> Live Demo
                                </a>
                            )}
                            {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="tmpl-btn btn-outline">
                                    <Github size={13} /> Source Code
                                </a>
                            )}
                            {project.videoUrl && (
                                <a href="#video" className="tmpl-btn btn-outline">
                                    <Play size={13} /> Watch Demo
                                </a>
                            )}
                        </div>
                    )}
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
                <div className="project-wrap">
                    <div className="screenshot-wrap r">
                        <Image src={safeImageUrl} alt={project.title || "Project preview"} fill className="object-cover" />
                        {project.liveUrl && (
                            <span className="screenshot-label">{new URL(project.liveUrl).hostname}</span>
                        )}
                    </div>
                </div>
                );
            })()}

            {/* ABOUT */}
            {project.description && (
                <section className="tmpl-section">
                    <div className="project-wrap">
                        <p className="sec-label r">About</p>
                        <h2 className="sec-title r rd1">The Project</h2>
                        <div className="r rd2 text-[15px] sm:text-base text-[var(--tmpl-text-2)] leading-[1.9] whitespace-pre-line max-w-[800px]">
                            {project.description}
                        </div>
                    </div>
                </section>
            )}

            {/* CONTRIBUTORS */}
            {project.contributors && project.contributors.length > 0 && (
                <section className="tmpl-section">
                    <div className="project-wrap">
                        <p className="sec-label r">Team</p>
                        <h2 className="sec-title r rd1">Contributors</h2>
                        
                        <div className="r rd2 flex flex-wrap gap-4 mt-6">
                            {project.contributors.map((contributor: string, i: number) => (
                                <div key={i} className="flex items-center gap-3 bg-[var(--tmpl-surface)] border border-[var(--tmpl-border)] p-2 rounded-full pr-5">
                                    <ContributorAvatar contributor={contributor} size={32} />
                                    <span className="font-dm-mono text-xs text-[var(--tmpl-text)] uppercase tracking-wider">{contributor}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* STACK */}
            {((project.techStack && project.techStack.length > 0) || (project.tags && project.tags.length > 0)) && (
                <section className="tmpl-section pt-0 border-none mt-4">
                    <div className="project-wrap">
                        <div className="stack-grid r rd1">
                            {project.techStack && project.techStack.length > 0 && (
                                <div className="stack-group">
                                    <p className="stack-group-label">Core Technologies</p>
                                    <div className="pills">
                                        {project.techStack.map((tech: string) => (
                                            <span className="pill" key={tech}>{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {project.tags && project.tags.length > 0 && (
                                <div className={`stack-group ${project.techStack && project.techStack.length > 0 ? 'border-t md:border-t-0 md:border-l border-[var(--tmpl-border)]' : ''}`}>
                                    <p className="stack-group-label">Keywords & Tags</p>
                                    <div className="pills">
                                        {project.tags.map((tag: string) => (
                                            <span className="pill" key={tag}>#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* VIDEO */}
            {project.videoUrl && (
                <section className="tmpl-section" id="video">
                    <div className="project-wrap">
                        <p className="sec-label r">Demo</p>
                        <h2 className="sec-title r rd1">See it in action</h2>
                        <p className="sec-sub r rd2">A full walkthrough of the core features and UI.</p>

                        <div className="video-shell r">
                            <iframe 
                                src={project.videoUrl.includes('watch?v=') ? project.videoUrl.replace('watch?v=', 'embed/') : project.videoUrl}
                                title={`${project.title} Demo`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full border-none absolute inset-0"
                            ></iframe>
                        </div>
                    </div>
                </section>
            )}

            {/* FEATURES */}
            {project.features && project.features.length > 0 && (
                <section className="tmpl-section">
                    <div className="project-wrap">
                        <p className="sec-label r">What it does</p>
                        <h2 className="sec-title r rd1">Core features</h2>

                        <ul className="r rd2 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-12 md:gap-y-6 mt-6">
                            {project.features.map((feature: string, i: number) => {
                                const parts = feature.split(':');
                                const hasTitle = parts.length > 1;
                                const fTitle = hasTitle ? parts[0] : '';
                                const fDesc = hasTitle ? parts.slice(1).join(':') : feature;

                                return (
                                    <li key={i} className="flex items-start gap-4 text-[var(--tmpl-text-2)] text-[15px] sm:text-base leading-[1.8]">
                                        <span className="text-[var(--tmpl-accent)] mt-1.5 opacity-50 text-xs">✦</span>
                                        <div>
                                            {fTitle && <strong className="text-[var(--tmpl-text)] font-medium mr-2">{fTitle.trim()}:</strong>}
                                            {fDesc.trim()}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>
            )}


        </div>
    );
}
