import { ImageResponse } from 'next/og';
import { getBlogs } from '@/lib/api';

export const runtime = 'edge';

export const alt = 'Blog Post';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { blogId: string } }) {
    const blogs = await getBlogs();
    const blog = blogs.find((b) => b._id === params.blogId);

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #000000, #1a1a1a)',
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
                            background: '#3b82f6',
                            marginRight: '15px',
                        }}
                    />
                    <span style={{ color: '#94a3b8', fontSize: '24px', fontWeight: '500' }}>
                        sameerbagul.me / blog
                    </span>
                </div>
                <h1
                    style={{
                        fontSize: '72px',
                        fontWeight: 'bold',
                        color: 'white',
                        lineHeight: 1.1,
                        marginBottom: '30px',
                        maxWidth: '900px',
                    }}
                >
                    {blog?.title || 'Blog Post'}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#3b82f6', fontSize: '28px', fontWeight: 'bold' }}>
                        {blog?.author || 'Sameer Bagul'}
                    </span>
                    <span style={{ color: '#475569', margin: '0 15px', fontSize: '28px' }}>•</span>
                    <span style={{ color: '#94a3b8', fontSize: '28px' }}>
                        {blog ? new Date(blog.publishedAt).toLocaleDateString() : ''}
                    </span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
