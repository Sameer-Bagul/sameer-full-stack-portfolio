import { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
    return {
        host: absoluteUrl(),
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/api/',
        },
        sitemap: absoluteUrl('/sitemap.xml'),
    };
}
