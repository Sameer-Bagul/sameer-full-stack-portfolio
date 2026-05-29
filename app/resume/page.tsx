import { Metadata } from 'next';
import ResumeContent from './ResumeContent';
import { SITE_NAME, absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
    title: 'Professional Resume | Sameer Bagul - Full Stack & AI Developer',
    description: 'Explore the professional journey, technical expertise, and academic background of Sameer Bagul. Senior Full Stack & AI Developer specializing in scalable MERN and Next.js systems.',
    keywords: ['Sameer Bagul', 'Resume', 'CV', 'Full Stack Developer', 'AI Engineer', 'Portfolio India', 'MERN Specialist'],
    alternates: {
        canonical: absoluteUrl('/resume'),
    },
    openGraph: {
        title: 'Professional Resume | Sameer Bagul',
        description: 'Detailed professional background and technical skills of Sameer Bagul.',
        url: absoluteUrl('/resume'),
    }
};

export default function ResumePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Person',
                        name: SITE_NAME,
                        jobTitle: 'Full Stack & AI Developer',
                        url: absoluteUrl('/resume'),
                        sameAs: [
                            'https://linkedin.com/in/sameer-bagul',
                            'https://github.com/Sameer-Bagul'
                        ],
                        description: 'Senior Full Stack & AI Developer specializing in scalable MERN, Next.js, and AI systems.',
                    }),
                }}
            />
            <ResumeContent />
        </>
    );
}
