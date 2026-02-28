import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProjectBySlug, getProjectById, getProjects } from '@/lib/api';
import { getProjectTheme } from '@/lib/project-themes';
import ContributorAvatar from '@/components/ContributorAvatar';
import {
    ArrowLeft,
    Github,
    ExternalLink,
    Play,
    Calendar,
    Tag,
    Layers,
    Zap,
    Users,
} from 'lucide-react';

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

// Helper: resolve a project by slug OR by _id (for pre-migration fallback)
async function resolveProject(slugOrId: string) {
    try {
        return await getProjectBySlug(slugOrId);
    } catch {
        // If slug lookup fails, try by MongoDB _id (pre-migration fallback)
        try {
            return await getProjectById(slugOrId);
        } catch {
            return null;
        }
    }
}

// ─── Metadata ────────────────────────────────────────────────────────────────

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
        alternates: {
            canonical: `https://sameerbagul.me/projects/${project.slug || slug}`,
        },
    };
}

// ─── Static paths ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
    try {
        const projects = await getProjects();
        return projects
            .filter((p) => p.slug)
            .map((p) => ({ slug: p.slug as string }));
    } catch {
        return [];
    }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;

    const project = await resolveProject(slug);
    if (!project) notFound();

    const { Icon, gradient } = getProjectTheme(
        project.techStack || [],
        project.title,
        project.description || ''
    );

    const displayDate = project.projectDate || project.createdAt?.split('T')[0] || null;

    // ─── JSON-LD ────────────────────────────────────────────────────────────

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sameerbagul.me' },
            { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://sameerbagul.me/projects' },
            { '@type': 'ListItem', position: 3, name: project.title, item: `https://sameerbagul.me/projects/${slug}` },
        ],
    };

    const softwareJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: project.title,
        description: project.shortDescription,
        image: project.image || undefined,
        url: project.liveUrl || `https://sameerbagul.me/projects/${slug}`,
        author: { '@type': 'Person', name: 'Sameer Bagul', url: 'https://sameerbagul.me' },
        applicationCategory: project.category,
        ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
    };

    return (
        <div className="min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <div className="relative w-full h-[60vh] min-h-[400px] max-h-[650px] flex items-end">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="absolute inset-0 object-cover"
                        priority
                        sizes="100vw"
                    />
                ) : (
                    <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${gradient}`}>
                        <Icon className="h-32 w-32 text-white/30" strokeWidth={0.5} />
                    </div>
                )}

                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

                {/* Back link */}
                <div className="absolute top-6 left-6 z-10">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold hover:bg-white/20 transition-all"
                    >
                        <ArrowLeft size={14} /> Back to Projects
                    </Link>
                </div>

                {/* Hero text */}
                <div className="relative z-10 p-8 sm:p-12 md:p-16 w-full max-w-5xl mx-auto">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
                            {project.category}
                        </span>
                        {displayDate && (
                            <span className="flex items-center gap-1.5 text-xs text-white/60 font-medium">
                                <Calendar size={12} /> {displayDate}
                            </span>
                        )}
                    </div>
                    <h1 className="font-seona text-4xl sm:text-6xl md:text-7xl font-black lowercase tracking-tight text-white drop-shadow-2xl leading-none mb-4">
                        {project.title}
                    </h1>
                    <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
                        {project.shortDescription}
                    </p>
                </div>
            </div>

            {/* ── Body ─────────────────────────────────────────────────────── */}
            <div className="max-w-5xl mx-auto px-6 sm:px-8 py-14 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* ── Left: main content ─────────────────────────────────── */}
                <div className="lg:col-span-2 space-y-10">

                    {/* Description */}
                    {project.description && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">
                                About this project
                            </h2>
                            <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line font-seona">
                                {project.description}
                            </p>
                        </section>
                    )}

                    {/* Features */}
                    {project.features && project.features.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2">
                                <Zap size={14} /> Key Features
                            </h2>
                            <ul className="space-y-2.5">
                                {project.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Tech Stack */}
                    {project.techStack && project.techStack.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2">
                                <Layers size={14} /> Tech Stack
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2">
                                <Tag size={14} /> Tags
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1.5 rounded-full bg-primary/10 text-xs font-semibold text-primary border border-primary/20"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* ── Right: sidebar ─────────────────────────────────────── */}
                <div className="space-y-8">

                    {/* Action links */}
                    <section className="space-y-3">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
                            >
                                <ExternalLink size={16} /> View Live
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-sm hover:opacity-90 transition-all"
                            >
                                <Github size={16} /> GitHub Repo
                            </a>
                        )}
                        {project.videoUrl && (
                            <a
                                href={project.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-sm hover:opacity-90 transition-all border border-zinc-200 dark:border-zinc-700"
                            >
                                <Play size={16} /> Watch Demo
                            </a>
                        )}
                    </section>

                    {/* Contributors */}
                    {project.contributors && project.contributors.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2">
                                <Users size={14} /> Contributors
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {project.contributors.map((contributor, i) => (
                                    <ContributorAvatar key={i} contributor={contributor} size={44} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Meta box */}
                    <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-4 bg-zinc-50 dark:bg-zinc-900/50">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Category</p>
                            <p className="text-sm font-semibold capitalize text-zinc-800 dark:text-zinc-200">{project.category?.replace('-', ' ')}</p>
                        </div>
                        {displayDate && (
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Date</p>
                                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{displayDate}</p>
                            </div>
                        )}
                        {project.techStack && project.techStack.length > 0 && (
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Stack Size</p>
                                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{project.techStack.length} technologies</p>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}
