import { MetadataRoute } from 'next';
import { getBlogs, getProjects } from '@/lib/api';
import { studyData } from '@/data/study-materials';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://sameerbagul.me';

    // Static routes
    const staticRoutes = [
        '',
        '/projects',
        '/blog',
        '/resume',
        '/study',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
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
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.7,
            }));
    } catch (e) {
        console.error('Error fetching projects for sitemap:', e);
    }

    // Dynamic Study routes
    const studyRoutes: MetadataRoute.Sitemap = [];
    studyData.forEach((topic) => {
        studyRoutes.push({
            url: `${baseUrl}/study/${topic.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        });

        topic.chapters.forEach((chapter) => {
            studyRoutes.push({
                url: `${baseUrl}/study/${topic.slug}/${chapter.slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.6,
            });
        });
    });

    return [...staticRoutes, ...blogRoutes, ...projectRoutes, ...studyRoutes];
}
