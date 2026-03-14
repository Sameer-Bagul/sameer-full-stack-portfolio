import { getPublicFolderBySlug, getPublicNoteBySlug } from '@/lib/api';
import { Metadata } from 'next';
import NotePageContent from '@/app/study/[topicSlug]/[chapterSlug]/NotePageContent';

interface NotePageProps {
    params: Promise<{ topicSlug: string; chapterSlug: string }>;
}

export async function generateMetadata(
    { params }: NotePageProps
): Promise<Metadata> {
    const { topicSlug, chapterSlug } = await params;
    
    try {
        const response = await getPublicNoteBySlug(chapterSlug);
        if (!response.success) return { title: 'Note Not Found' };
        
        const note = response.data.note;

        return {
            title: `${note.title} | Technical Research`,
            description: note.description || `Read "${note.title}" in the archive. Part of Sameer Bagul's engineering study library.`,
            openGraph: {
                title: `${note.title} | Sameer Bagul`,
                description: note.description || `Technical notes on ${note.title}`,
                images: [],
            },
            alternates: {
                canonical: `https://sameerbagul.me/study/${topicSlug}/${chapterSlug}`,
            },
        };
    } catch (error) {
        return { title: 'Technical Notes' };
    }
}

export default async function NotePage({ params }: NotePageProps) {
    const resolvedParams = await params;
    const { topicSlug, chapterSlug } = resolvedParams;

    let note = null;
    let folder = null;
    try {
        const [noteRes, folderRes] = await Promise.all([
            getPublicNoteBySlug(chapterSlug),
            getPublicFolderBySlug(topicSlug)
        ]);
        if (noteRes.success) note = noteRes.data.note;
        if (folderRes.success) folder = folderRes.data.folder;
    } catch (e) {}

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
                "name": folder?.name || 'Topic',
                "item": `https://sameerbagul.me/study/${topicSlug}`
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": note?.title || 'Note',
                "item": `https://sameerbagul.me/study/${topicSlug}/${chapterSlug}`
            }
        ]
    };

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": note?.title,
        "description": note?.description || `Research notes on ${folder?.name}: ${note?.title}`,
        "image": "",
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
            <NotePageContent params={resolvedParams} initialNote={note} initialFolder={folder} />
        </>
    );
}
