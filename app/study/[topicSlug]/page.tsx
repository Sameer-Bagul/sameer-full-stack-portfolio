import { getPublicFolderBySlug } from '@/lib/api';
import { Metadata } from 'next';
import TopicPageContent from '@/app/study/[topicSlug]/TopicPageContent';

interface TopicPageProps {
    params: Promise<{ topicSlug: string }>;
}

export async function generateMetadata(
    { params }: TopicPageProps
): Promise<Metadata> {
    const { topicSlug } = await params;
    
    try {
        const response = await getPublicFolderBySlug(topicSlug);
        if (!response.success) return { title: 'Topic Not Found' };
        
        const folder = response.data.folder;

        return {
            title: `${folder.name} | Advanced Coding Notes & Technical Research`,
            description: folder.description || `In-depth coding notes, research, and technical guides on ${folder.name}. Part of Sameer Bagul's engineering knowledge base.`,
            openGraph: {
                title: `${folder.name} Technical Notes | Sameer Bagul`,
                description: `Professional research and developer notes on ${folder.name}.`,
                images: [], // Can add a default or dynamic image here
            },
            alternates: {
                canonical: `https://sameerbagul.me/study/${topicSlug}`,
            },
        };
    } catch (error) {
        return { title: 'Study Library' };
    }
}

export default async function TopicPage({ params }: TopicPageProps) {
    const resolvedParams = await params;
    const { topicSlug } = resolvedParams;
    
    let folder = null;
    try {
        const response = await getPublicFolderBySlug(topicSlug);
        if (response.success) {
            folder = response.data.folder;
        }
    } catch (e) {}

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://sameerbagul.me"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Study Library",
                "item": "https://sameerbagul.me/study"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": folder?.name || 'Topic',
                "item": `https://sameerbagul.me/study/${topicSlug}`
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <TopicPageContent params={resolvedParams} initialFolder={folder} />
        </>
    );
}
