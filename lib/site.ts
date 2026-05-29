export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sameerbagul.com';

export const SITE_NAME = 'Sameer Bagul';

export const absoluteUrl = (path = '') => new URL(path, SITE_URL).toString();