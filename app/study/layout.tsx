import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Study Library | Engineering Vault',
    description: 'A structured engineering vault for technical research, architectural deep-dives, and academic notes.',
};

export default function StudyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
