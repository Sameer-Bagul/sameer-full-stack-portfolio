import { MetadataRoute } from 'next';
import { getBlogs, getProjects, getPublicFolders, getPublicFolderBySlug } from '@/lib/api';
import { studyData } from '@/data/study-materials';
import { absoluteUrl } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = absoluteUrl();

    // Static routes
    const staticRoutes = [
        '',
        '/projects',
        '/blog',
        '/achievements',
        '/resume',
        '/study',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
        images: route === '' ? [absoluteUrl('/hero.jpg')] : undefined,
    }));

    // Dynamic Blog routes
    let blogRoutes: MetadataRoute.Sitemap = [];
    try {
        const blogs = await getBlogs();
        blogRoutes = blogs
            .filter(blog => blog.isPublished)
            .map((blog) => ({
                url: `${baseUrl}/blog/${blog._id}`,
                lastModified: new Date(blog.publishedAt || new Date()),
                changeFrequency: 'monthly' as const,
                priority: 0.6,
                images: blog.coverImage ? [blog.coverImage] : undefined,
            }));
    } catch (e) {
        console.error('Error fetching blogs for sitemap:', e);
    }

    // Dynamic Project routes (slug-based)
    let projectRoutes: MetadataRoute.Sitemap = [];
    try {
        const projects = await getProjects();
        projectRoutes = projects
            .filter((p) => p.slug)
            .map((p) => ({
                url: `${baseUrl}/projects/${p.slug}`,
                lastModified: new Date(p.projectDate || p.createdAt || new Date()),
                changeFrequency: 'monthly' as const,
                priority: 0.7,
                images: p.image ? [p.image] : undefined,
            }));
    } catch (e) {
        console.error('Error fetching projects for sitemap:', e);
    }

    // Dynamic Study routes (API-based)
    let studyRoutes: MetadataRoute.Sitemap = [];
    try {
        const response = await getPublicFolders();
        if (response.success) {
            for (const folder of response.data.folders) {
                studyRoutes.push({
                    url: `${baseUrl}/study/${folder.slug}`,
                    lastModified: new Date(),
                    changeFrequency: 'monthly' as const,
                    priority: 0.7,
                });
                
                // Fetch notes for each folder
                try {
                    const notesRes = await getPublicFolderBySlug(folder.slug);
                    if (notesRes.success) {
                        for (const note of notesRes.data.notes) {
                            studyRoutes.push({
                                url: `${baseUrl}/study/${folder.slug}/${note.slug}`,
                                lastModified: new Date(),
                                changeFrequency: 'monthly' as const,
                                priority: 0.6,
                            });
                        }
                    }
                } catch (err) {
                    console.error(`Error fetching notes for sitemap folder ${folder.slug}:`, err);
                }
            }
        }
    } catch (e) {
        console.error('Error fetching folders for sitemap:', e);
    }

    return [...staticRoutes, ...blogRoutes, ...projectRoutes, ...studyRoutes];
}
