import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects | Technical Exploits & Applications',
    description: 'Explore a comprehensive list of my technical exploits, experiments, and production-ready applications across Web, Android, AI, and more.',
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Sameer Bagul's Software Portfolio",
        "operatingSystem": "Web, Android, iOS, CLI",
        "applicationCategory": "DeveloperApplication",
        "author": {
            "@type": "Person",
            "name": "Sameer Bagul"
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
