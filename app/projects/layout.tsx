import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects | Technical Exploits & Applications',
    description: 'Explore a comprehensive list of my technical exploits, experiments, and production-ready applications across Web, Android, AI, and more.',
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
