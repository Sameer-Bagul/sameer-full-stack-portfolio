import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | Tech, AI & Personal Insights',
    description: 'Thoughts, tutorials, and deep-dives on technology, AI, and engineering by Sameer Bagul.',
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
