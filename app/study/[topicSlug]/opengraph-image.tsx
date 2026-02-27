import { ImageResponse } from 'next/og';
import { studyData } from '@/data/study-materials';

export const runtime = 'edge';

export const alt = 'Study Topic';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { topicSlug: string } }) {
    const topic = studyData.find((t) => t.slug === params.topicSlug);

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #000000, #111827)',
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
                    <div
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: '#10b981',
                            marginRight: '15px',
                        }}
                    />
                    <span style={{ color: '#9ca3af', fontSize: '24px', fontWeight: '500' }}>
                        sameerbagul.me / library
                    </span>
                </div>
                <h1
                    style={{
                        fontSize: '84px',
                        fontWeight: 'bold',
                        color: 'white',
                        lineHeight: 1.1,
                        marginBottom: '20px',
                    }}
                >
                    {topic?.topic || 'Study Archive'}
                </h1>
                <p style={{ color: '#10b981', fontSize: '32px', fontWeight: '500' }}>
                    {topic?.chapters.length || 0} Research Chapters
                </p>
            </div>
        ),
        {
            ...size,
        }
    );
}
