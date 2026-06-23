import { getPublicFolderBySlug } from '@/lib/api';
import { Metadata } from 'next';
import TopicPageContent from '@/app/study/[topicSlug]/TopicPageContent';
import { SITE_NAME, absoluteUrl } from '@/lib/site';

interface TopicPageProps {
    params: Promise<{ topicSlug: string }>;
}

export async function generateMetadata(
    { params }: TopicPageProps
): Promise<Metadata> {
    const { topicSlug } = await params;
    
    try {
        const response = await getPublicFolderBySlug(topicSlug);
        if (!response.success || !response.data?.folder) return { title: 'Topic Not Found' };
        
        const folder = response.data.folder;

        return {
            title: `${folder.name} | Advanced Coding Notes & Technical Research`,
            description: folder.description || `In-depth coding notes, research, and technical guides on ${folder.name}. Part of Sameer Bagul's engineering knowledge base.`,
            openGraph: {
                title: `${folder.name} Technical Notes | Sameer Bagul`,
                description: `Professional research and developer notes on ${folder.name}.`,
                images: [], // Can add a default or dynamic image here
                url: absoluteUrl(`/study/${topicSlug}`),
            },
            alternates: {
                canonical: absoluteUrl(`/study/${topicSlug}`),
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
                "item": absoluteUrl()
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Study Library",
                "item": absoluteUrl('/study')
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": folder?.name || 'Topic',
                "item": absoluteUrl(`/study/${topicSlug}`)
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
