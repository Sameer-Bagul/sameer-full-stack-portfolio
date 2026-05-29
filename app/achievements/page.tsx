import { Metadata } from 'next';
import AchievementsContent from './AchievementsContent';
import { SITE_NAME, absoluteUrl } from '@/lib/site';

export const revalidate = 300;

export const metadata: Metadata = {
    title: 'Professional Milestones & Achievements',
    description: 'A curated timeline of professional milestones, academic excellence, and technical certifications by Sameer Bagul, Freelance AI Developer.',
    keywords: ['Sameer Bagul', 'Achievements', 'Certifications', 'Milestones', 'AI Developer', 'Software Engineering'],
    alternates: {
        canonical: absoluteUrl('/achievements'),
    },
    openGraph: {
        title: 'Professional Milestones | Sameer Bagul',
        description: 'Awards, certifications, and key career achievements of Sameer Bagul.',
        url: absoluteUrl('/achievements'),
    }
};

export default async function AchievementsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'CollectionPage',
                        name: 'Professional Milestones | Sameer Bagul',
                        description: 'A curated timeline of professional milestones, academic excellence, and technical certifications.',
                        url: absoluteUrl('/achievements'),
                        author: {
                            '@type': 'Person',
                            name: SITE_NAME,
                        },
                    }),
                }}
            />
            <AchievementsContent />
        </>
    );
}
