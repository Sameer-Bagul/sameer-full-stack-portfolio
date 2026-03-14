import { Metadata } from 'next';
import AchievementsContent from './AchievementsContent';

export const revalidate = 300;

export const metadata: Metadata = {
    title: 'Professional Milestones & Achievements',
    description: 'A curated timeline of professional milestones, academic excellence, and technical certifications by Sameer Bagul, Freelance AI Developer.',
    keywords: ['Sameer Bagul', 'Achievements', 'Certifications', 'Milestones', 'AI Developer', 'Software Engineering'],
    openGraph: {
        title: 'Professional Milestones | Sameer Bagul',
        description: 'Awards, certifications, and key career achievements of Sameer Bagul.',
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
                        url: 'https://sameerbagul.me/achievements',
                        author: {
                            '@type': 'Person',
                            name: 'Sameer Bagul',
                        },
                    }),
                }}
            />
            <AchievementsContent />
        </>
    );
}
