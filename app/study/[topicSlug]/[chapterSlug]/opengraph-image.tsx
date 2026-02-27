import { ImageResponse } from 'next/og';
import { studyData } from '@/data/study-materials';

export const runtime = 'edge';

export const alt = 'Study Note';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { topicSlug: string; chapterSlug: string } }) {
    const topic = studyData.find((t) => t.slug === params.topicSlug);
    const chapter = topic?.chapters.find((c) => c.slug === params.chapterSlug);

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #050505, #111111)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    padding: '80px',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                    }}
                >
                    <span style={{ color: '#6366f1', fontSize: '24px', fontWeight: 'bold', marginRight: '10px' }}>
                        {topic?.topic.toUpperCase()}
                    </span>
                    <span style={{ color: '#4b5563', fontSize: '24px' }}>/</span>
                    <span style={{ color: '#9ca3af', fontSize: '24px', marginLeft: '10px' }}>
                        Technical Notes
                    </span>
                </div>
                <h1
                    style={{
                        fontSize: '64px',
                        fontWeight: 'bold',
                        color: 'white',
                        lineHeight: 1.2,
                        marginBottom: '40px',
                        maxWidth: '1000px',
                    }}
                >
                    {chapter?.title || 'Research Note'}
                </h1>
                <div
                    style={{
                        display: 'flex',
                        padding: '12px 24px',
                        borderRadius: '100px',
                        background: 'rgba(99, 102, 241, 0.1)',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                    }}
                >
                    <span style={{ color: '#818cf8', fontSize: '20px', fontWeight: '500' }}>
                        Read full analysis at sameerbagul.me
                    </span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
