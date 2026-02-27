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
        alternates: {
            canonical: `https://sameerbagul.me/study/${topicSlug}/${chapterSlug}`,
        },
    };
}

export default async function NotePage({ params }: NotePageProps) {
    const resolvedParams = await params;
    const { topicSlug, chapterSlug } = resolvedParams;

    const topic = studyData.find(item => item.slug === topicSlug);
    const chapter = topic?.chapters.find(c => c.slug === chapterSlug);

    const breadcrumbJsonLd = {
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
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": chapter?.title,
                "item": `https://sameerbagul.me/study/${topicSlug}/${chapterSlug}`
            }
        ]
    };

    const articleJsonLd = {
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <NotePageContent params={resolvedParams} />
        </>
    );
}
