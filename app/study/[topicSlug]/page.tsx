import { studyData } from '@/data/study-materials';
import { Metadata } from 'next';
import TopicPageContent from '@/app/study/[topicSlug]/TopicPageContent';


interface TopicPageProps {
    params: Promise<{ topicSlug: string }>;
}

export async function generateMetadata(
    { params }: TopicPageProps
): Promise<Metadata> {
    const { topicSlug } = await params;
    const topic = studyData.find(item => item.slug === topicSlug);

    if (!topic) return { title: 'Topic Not Found' };

    return {
        title: `${topic.topic} | Engineering Study Notes`,
        description: topic.description || `In-depth engineering research and study notes on ${topic.topic}.`,
        openGraph: {
            title: `${topic.topic} | Sameer Bagul`,
            description: topic.description,
            images: [topic.image],
        },
        alternates: {
            canonical: `https://sameerbagul.me/study/${topicSlug}`,
        },
    };
}

export default async function TopicPage({ params }: TopicPageProps) {
    const resolvedParams = await params;
    const { topicSlug } = resolvedParams;
    const topic = studyData.find(item => item.slug === topicSlug);

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
                "name": topic?.topic,
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
            <TopicPageContent params={resolvedParams} />
        </>
    );
}
