import { Metadata } from 'next';
import ProjectsContent from './ProjectsContent';
import { SITE_NAME, absoluteUrl } from '@/lib/site';

export const revalidate = 300;

export const metadata: Metadata = {
    title: 'Freelance AI & Full Stack Projects',
    description: 'Explore a portfolio of high-performance web applications, AI systems, and production-ready software built by Sameer Bagul. Specializing in MERN and Next.js freelancing services.',
    keywords: ['Freelance Developer', 'AI Portfolio', 'Sameer Bagul', 'Full Stack Projects', 'MERN Expert', 'Next.js Developer'],
    alternates: {
        canonical: absoluteUrl('/projects'),
    },
    openGraph: {
        title: 'Project Portfolio | Sameer Bagul',
        description: 'Discover scalable AI and Full Stack applications built for clients and innovation.',
        url: absoluteUrl('/projects'),
    }
};

export default function ProjectsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'CollectionPage',
                        name: 'Project Portfolio | Sameer Bagul',
                        description: 'Explore a portfolio of high-performance web applications, AI systems, and production-ready software.',
                        url: absoluteUrl('/projects'),
                        author: {
                            '@type': 'Person',
                            name: SITE_NAME,
                        },
                    }),
                }}
            />
            <ProjectsContent />
        </>
    );
}
