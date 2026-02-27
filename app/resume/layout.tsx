import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Resume | Senior Full Stack & AI Developer',
    description: 'Professional experience, education, and technical expertise of Sameer Bagul. Senior Full Stack & AI Developer based in Pune, India.',
};

export default function ResumeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
