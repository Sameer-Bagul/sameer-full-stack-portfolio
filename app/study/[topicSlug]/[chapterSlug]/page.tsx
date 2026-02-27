import { studyData } from '@/data/study-materials';
import { Metadata } from 'next';
import NotePageContent from '@/app/study/[topicSlug]/[chapterSlug]/NotePageContent';


interface NotePageProps {
    params: Promise<{ topicSlug: string; chapterSlug: string }>;
}

export async function generateMetadata(
    { params }: NotePageProps
): Promise<Metadata> {
    const { topicSlug, chapterSlug } = await params;
    const topic = studyData.find(item => item.slug === topicSlug);
    if (!topic) return { title: 'Topic Not Found' };

    const chapter = topic.chapters.find(c => c.slug === chapterSlug);
    if (!chapter) return { title: 'Chapter Not Found' };

    return {
        title: `${chapter.title} | ${topic.topic}`,
        description: `Read "${chapter.title}" in the ${topic.topic} archive. Part of Sameer Bagul's engineering study library.`,
        openGraph: {
            title: `${chapter.title} | ${topic.topic}`,
            description: `Technical notes on ${topic.topic} - ${chapter.title}`,
            images: [topic.image],
        },
    };
}

export default async function NotePage({ params }: NotePageProps) {
    const resolvedParams = await params;
    const { topicSlug, chapterSlug } = resolvedParams;

    const topic = studyData.find(item => item.slug === topicSlug);
    const chapter = topic?.chapters.find(c => c.slug === chapterSlug);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": chapter?.title,
        "description": `Research notes on ${topic?.topic}: ${chapter?.title}`,
        "image": topic?.image,
        "author": {
            "@type": "Person",
            "name": "Sameer Bagul",
            "url": "https://sameerbagul.me"
        },
        "publisher": {
            "@type": "Person",
            "name": "Sameer Bagul"
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://sameerbagul.me/study/${topicSlug}/${chapterSlug}`
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <NotePageContent params={resolvedParams} />
        </>
    );
}
