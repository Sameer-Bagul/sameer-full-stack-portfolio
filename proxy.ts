import { NextRequest, NextResponse } from 'next/server';

const CANONICAL_HOST = 'sameerbagul.com';
const REDIRECT_HOSTS = new Set(['sameerbagul.me', 'www.sameerbagul.me']);

export function proxy(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0]?.toLowerCase();

  if (host && REDIRECT_HOSTS.has(host)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.protocol = 'https:';
    redirectUrl.hostname = CANONICAL_HOST;
    redirectUrl.port = '';

    return NextResponse.redirect(redirectUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};