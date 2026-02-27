import Image from 'next/image';
import { getBlogs } from '@/lib/api';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface BlogPageProps {
    params: Promise<{ blogId: string }>;
}

export async function generateMetadata(
    { params }: BlogPageProps
): Promise<Metadata> {
    const { blogId } = await params;
    const blogs = await getBlogs();
    const blog = blogs.find(b => b._id === blogId);

    if (!blog) return { title: 'Blog Post Not Found' };

    return {
        title: `${blog.title} | Technical Coding Blog`,
        description: blog.shortDescription,
        openGraph: {
            title: `${blog.title} | Sameer Bagul Engineering Blog`,
            description: blog.shortDescription,
            images: [blog.coverImage],
        },
        alternates: {
            canonical: `https://sameerbagul.me/blog/${blogId}`,
        },
    };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
    const { blogId } = await params;
    const blogs = await getBlogs();
    const blog = blogs.find(b => b._id === blogId);

    if (!blog) notFound();

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://sameerbagul.me"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://sameerbagul.me/blog"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": blog.title,
                "item": `https://sameerbagul.me/blog/${blogId}`
            }
        ]
    };

    const blogPostingJsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "description": blog.shortDescription,
        "image": blog.coverImage,
        "author": {
            "@type": "Person",
            "name": blog.author || "Sameer Bagul",
            "url": "https://sameerbagul.me"
        },
        "datePublished": blog.publishedAt,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://sameerbagul.me/blog/${blogId}`
        }
    };

    return (
        <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
            />
            <article className="prose prose-lg dark:prose-invert max-w-none">
                <h1 className="text-5xl font-black tracking-tighter mb-8">{blog.title}</h1>
                <div className="flex items-center gap-4 text-muted-foreground mb-12">
                    <span>{blog.author}</span>
                    <span>•</span>
                    <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{blog.readingTime}</span>
                </div>
                <div className="mb-12 relative h-[400px]">
                    <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        className="rounded-3xl object-cover shadow-2xl"
                        priority
                    />
                </div>
                <div dangerouslySetInnerHTML={{ __html: blog.longContent }} />
            </article>
        </div>
    );
}
