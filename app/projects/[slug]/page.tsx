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
    ArrowUpRight,
} from 'lucide-react';

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

// ── Resolve by slug OR _id (pre-migration fallback) ───────────────────────
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

// ── Metadata ──────────────────────────────────────────────────────────────

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

// ── Static paths ──────────────────────────────────────────────────────────

export async function generateStaticParams() {
    try {
        const projects = await getProjects();
        return projects.filter((p) => p.slug).map((p) => ({ slug: p.slug as string }));
    } catch {
        return [];
    }
}

// ── Page ──────────────────────────────────────────────────────────────────

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

    // ── JSON-LD ────────────────────────────────────────────────────────────
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
        <div className="min-h-screen pt-20">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

            {/* ── Hero ────────────────────────────────────────────────── */}
            <div className="relative w-full h-[55vh] min-h-[360px] max-h-[580px] overflow-hidden">
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
                        <Icon className="h-40 w-40 text-white/20" strokeWidth={0.5} />
                    </div>
                )}
                {/* gradient overlay — bottom to top */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />

                {/* Hero text — anchored to bottom */}
                <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-8 max-w-[1400px] mx-auto w-full">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
                            {project.category?.replace('-', ' ')}
                        </span>
                        {displayDate && (
                            <span className="flex items-center gap-1.5 text-xs text-white/50 font-medium">
                                <Calendar size={11} /> {displayDate}
                            </span>
                        )}
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-black lowercase tracking-tighter text-white drop-shadow-2xl leading-[0.95] mb-3">
                        {project.title}
                    </h1>
                    <p className="text-sm sm:text-base text-white/60 max-w-2xl leading-relaxed">
                        {project.shortDescription}
                    </p>
                </div>
            </div>

            {/* ── Page body ────────────────────────────────────────────── */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10">

                {/* Back link - clearly visible below hero */}
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors mb-8 group"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    All Projects
                </Link>

                {/* ── BENTO GRID — 12 columns ────────────────────────── */}
                <div className="grid grid-cols-12 gap-4 sm:gap-5">

                    {/* CELL 1: About — col-span-8 */}
                    {project.description && (
                        <div className="col-span-12 lg:col-span-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-7 sm:p-9">
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-5">
                                About this project
                            </p>
                            <p className="text-base sm:text-[17px] text-zinc-700 dark:text-zinc-300 leading-[1.85] whitespace-pre-line tracking-[-0.01em]">
                                {project.description}
                            </p>
                        </div>
                    )}

                    {/* CELL 2: Actions & Meta sidebar — col-span-4 */}
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">

                        {/* Action links bento card */}
                        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 space-y-3">
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-1">Links</p>
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:opacity-90 transition-all group"
                                >
                                    <span className="flex items-center gap-2"><ExternalLink size={15} /> View Live</span>
                                    <ArrowUpRight size={15} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            )}
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-sm hover:opacity-90 transition-all group"
                                >
                                    <span className="flex items-center gap-2"><Github size={15} /> GitHub Repo</span>
                                    <ArrowUpRight size={15} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            )}
                            {project.videoUrl && (
                                <a
                                    href={project.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all group"
                                >
                                    <span className="flex items-center gap-2"><Play size={15} /> Watch Demo</span>
                                    <ArrowUpRight size={15} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            )}
                            {!project.liveUrl && !project.githubUrl && !project.videoUrl && (
                                <p className="text-sm text-muted-foreground italic">No links available</p>
                            )}
                        </div>

                        {/* Meta info bento card */}
                        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Category</p>
                                <p className="text-sm font-bold capitalize text-zinc-800 dark:text-zinc-200">{project.category?.replace('-', ' ')}</p>
                            </div>
                            {displayDate && (
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Year</p>
                                    <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{displayDate}</p>
                                </div>
                            )}
                            {project.techStack?.length > 0 && (
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Stack</p>
                                    <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{project.techStack.length} tech</p>
                                </div>
                            )}
                            {project.features?.length > 0 && (
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Features</p>
                                    <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{project.features.length} listed</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CELL 3: Tech Stack — col-span-6 */}
                    {project.techStack && project.techStack.length > 0 && (
                        <div className="col-span-12 sm:col-span-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 sm:p-7">
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-5 flex items-center gap-2">
                                <Layers size={12} /> Tech Stack
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 hover:border-primary/50 transition-colors"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CELL 4: Features — col-span-6 */}
                    {project.features && project.features.length > 0 && (
                        <div className="col-span-12 sm:col-span-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 sm:p-7">
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-5 flex items-center gap-2">
                                <Zap size={12} /> Key Features
                            </p>
                            <ul className="space-y-2.5">
                                {project.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                        <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* CELL 5: Tags — col-span-6 */}
                    {project.tags && project.tags.length > 0 && (
                        <div className="col-span-12 sm:col-span-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-5 flex items-center gap-2">
                                <Tag size={12} /> Tags
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1.5 rounded-full bg-primary/8 text-xs font-semibold text-primary border border-primary/20 hover:bg-primary/15 transition-colors"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CELL 6: Contributors — col-span-6 */}
                    {project.contributors && project.contributors.length > 0 && (
                        <div className="col-span-12 sm:col-span-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-5 flex items-center gap-2">
                                <Users size={12} /> Contributors
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {project.contributors.map((contributor, i) => (
                                    <ContributorAvatar key={i} contributor={contributor} size={44} />
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
