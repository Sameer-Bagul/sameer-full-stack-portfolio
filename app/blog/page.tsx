import { Metadata } from 'next';
import BlogContent from './BlogContent';
import { getBlogs, getPublicFolders } from '@/lib/api';

export const revalidate = 300;

export const metadata: Metadata = {
    title: 'Technical Blog & Engineering Insights',
    description: 'Deep dives into AI, MERN stack, Next.js, and software architecture. Read technical articles and tutorials by Sameer Bagul.',
    keywords: ['Engineering Blog', 'AI Tutorials', 'React Tips', 'Software Architecture', 'Full Stack Development'],
    openGraph: {
        title: 'Technical Blog | Sameer Bagul',
        description: 'Sharing knowledge on cutting-edge technology and AI development.',
    }
};

export default async function BlogPage() {
    let folders: any[] = [];
    try {
        const response = await getPublicFolders();
        if (response.success) {
            folders = response.data.folders;
        }
    } catch (error) {
        console.error('Error fetching study folders for Server Component:', error);
    }

    let blogs: any[] = [];
    try {
        blogs = await getBlogs();
    } catch (error) {
        console.error('Error fetching blogs for Server Component:', error);
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'CollectionPage',
                        name: 'Technical Blog | Sameer Bagul',
                        description: 'Deep dives into AI, MERN stack, Next.js, and software architecture.',
                        url: 'https://sameerbagul.me/blog',
                        author: {
                            '@type': 'Person',
                            name: 'Sameer Bagul',
                        },
                    }),
                }}
            />
            <BlogContent initialBlogs={blogs} />
        </>
    );
}
