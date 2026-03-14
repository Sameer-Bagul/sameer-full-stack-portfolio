import { Metadata } from 'next';
import ProjectsContent from './ProjectsContent';

export const revalidate = 300;

export const metadata: Metadata = {
    title: 'Freelance AI & Full Stack Projects',
    description: 'Explore a portfolio of high-performance web applications, AI systems, and production-ready software built by Sameer Bagul. Specializing in MERN and Next.js freelancing services.',
    keywords: ['Freelance Developer', 'AI Portfolio', 'Sameer Bagul', 'Full Stack Projects', 'MERN Expert', 'Next.js Developer'],
    openGraph: {
        title: 'Project Portfolio | Sameer Bagul',
        description: 'Discover scalable AI and Full Stack applications built for clients and innovation.',
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
                        url: 'https://sameerbagul.me/projects',
                        author: {
                            '@type': 'Person',
                            name: 'Sameer Bagul',
                        },
                    }),
                }}
            />
            <ProjectsContent />
        </>
    );
}
