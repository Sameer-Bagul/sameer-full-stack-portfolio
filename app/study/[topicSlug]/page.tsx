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
    };
}

export default async function TopicPage({ params }: TopicPageProps) {
    const resolvedParams = await params;
    return <TopicPageContent params={resolvedParams} />;
}
