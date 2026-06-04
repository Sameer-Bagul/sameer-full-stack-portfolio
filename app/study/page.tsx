import { Metadata } from 'next';
import StudyContent from './StudyContent';
import { getPublicFolders } from '@/lib/api';
import { SITE_NAME, absoluteUrl } from '@/lib/site';

export const revalidate = 300;

export const metadata: Metadata = {
    title: 'Study Library | Engineering Vault',
    description: 'An engineering vault for technical research, architectural deep-dives, and coding notes. Technical documentation by Sameer Bagul.',
    keywords: ['Technical Research', 'Coding Notes', 'Software Engineering', 'MERN Docs', 'System Design'],
    openGraph: {
        title: 'Study Library | Sameer Bagul',
        description: 'Explore curated technical notes and research papers.',
        url: absoluteUrl('/study'),
    },
    alternates: {
        canonical: absoluteUrl('/study'),
    },
};

export default async function StudyPage() {
    let folders: any[] = [];
    try {
        const response = await getPublicFolders();
        if (response.success) {
            folders = response.data.folders;
        }
    } catch (error) {
        console.error('Error fetching study folders for Server Component:', error);
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'CollectionPage',
                        name: 'Study Library | Sameer Bagul',
                        description: 'An engineering vault for technical research, architectural deep-dives, and coding notes.',
                        url: absoluteUrl('/study'),
                        author: {
                            '@type': 'Person',
                            name: SITE_NAME,
                        },
                    }),
                }}
            />
            <StudyContent initialFolders={folders} />
        </>
    );
}
