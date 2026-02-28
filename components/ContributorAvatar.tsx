'use client';

import React from 'react';
import Image from 'next/image';
import { Github, Linkedin, Instagram, Twitter, ExternalLink } from 'lucide-react';

// ─── Platform detection ────────────────────────────────────────────────────

type Platform = 'github' | 'linkedin' | 'instagram' | 'twitter' | 'other-url' | 'initials';

interface ContributorInfo {
    platform: Platform;
    username: string | null;
    profileUrl: string | null;
    avatarUrl: string | null;
    displayName: string;
}

function parseContributor(raw: string): ContributorInfo {
    const trimmed = raw.trim();

    const isUrl = /^https?:\/\//i.test(trimmed);
    if (!isUrl) {
        // treat as a plain name — initials
        return { platform: 'initials', username: null, profileUrl: null, avatarUrl: null, displayName: trimmed };
    }

    let url: URL;
    try {
        url = new URL(trimmed);
    } catch {
        return { platform: 'initials', username: null, profileUrl: null, avatarUrl: null, displayName: trimmed };
    }

    const hostname = url.hostname.replace(/^www\./, '');
    const pathname = url.pathname.replace(/^\//, '').replace(/\/$/, '');
    const username = pathname.split('/')[0] || null;

    if (hostname === 'github.com' && username) {
        return {
            platform: 'github',
            username,
            profileUrl: trimmed,
            avatarUrl: `https://avatars.githubusercontent.com/${username}`,
            displayName: username,
        };
    }

    if (hostname === 'linkedin.com' && pathname.startsWith('in/')) {
        const linkedinUsername = pathname.replace('in/', '').split('/')[0];
        return {
            platform: 'linkedin',
            username: linkedinUsername,
            profileUrl: trimmed,
            avatarUrl: null,
            displayName: linkedinUsername,
        };
    }

    if (hostname === 'instagram.com' && username) {
        return {
            platform: 'instagram',
            username,
            profileUrl: trimmed,
            avatarUrl: null,
            displayName: username,
        };
    }

    if ((hostname === 'twitter.com' || hostname === 'x.com') && username) {
        return {
            platform: 'twitter',
            username,
            profileUrl: trimmed,
            avatarUrl: null,
            displayName: username,
        };
    }

    return {
        platform: 'other-url',
        username: null,
        profileUrl: trimmed,
        avatarUrl: null,
        displayName: hostname,
    };
}

// ─── Colour from string (for initials avatars) ─────────────────────────────

function stringToHsl(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 65%, 52%)`;
}

function getInitials(name: string): string {
    return name
        .split(/[\s-_]+/)
        .map((p) => p[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

// ─── Platform icon overlay ─────────────────────────────────────────────────

const PlatformBadge = ({ platform }: { platform: Platform }) => {
    const base = 'absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center shadow-md ring-1 ring-white dark:ring-zinc-900';

    switch (platform) {
        case 'github':
            return (
                <span className={`${base} bg-zinc-900`}>
                    <Github className="w-2.5 h-2.5 text-white" />
                </span>
            );
        case 'linkedin':
            return (
                <span className={`${base} bg-[#0A66C2]`}>
                    <Linkedin className="w-2.5 h-2.5 text-white" />
                </span>
            );
        case 'instagram':
            return (
                <span className={`${base} bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400`}>
                    <Instagram className="w-2.5 h-2.5 text-white" />
                </span>
            );
        case 'twitter':
            return (
                <span className={`${base} bg-black`}>
                    <Twitter className="w-2.5 h-2.5 text-white" />
                </span>
            );
        case 'other-url':
            return (
                <span className={`${base} bg-zinc-500`}>
                    <ExternalLink className="w-2 h-2 text-white" />
                </span>
            );
        default:
            return null;
    }
};

// ─── Main avatar component ─────────────────────────────────────────────────

interface ContributorAvatarProps {
    contributor: string;
    size?: number; // px — default 40
}

const ContributorAvatar = ({ contributor, size = 40 }: ContributorAvatarProps) => {
    const info = parseContributor(contributor);
    const [imgError, setImgError] = React.useState(false);

    const wrapperStyle: React.CSSProperties = { width: size, height: size };

    const avatarNode =
        info.avatarUrl && !imgError ? (
            <Image
                src={info.avatarUrl}
                alt={info.displayName}
                width={size}
                height={size}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
                unoptimized // avatars from github CDN, not next/image domain
            />
        ) : (
            <span
                className="w-full h-full flex items-center justify-center text-white font-bold select-none"
                style={{
                    fontSize: size * 0.35,
                    backgroundColor:
                        info.platform === 'linkedin'
                            ? '#0A66C2'
                            : info.platform === 'instagram'
                                ? '#E1306C'
                                : info.platform === 'twitter'
                                    ? '#1DA1F2'
                                    : stringToHsl(info.displayName),
                }}
            >
                {getInitials(info.displayName)}
            </span>
        );

    const inner = (
        <div className="relative inline-block" style={wrapperStyle} title={info.displayName}>
            <div
                className="rounded-full overflow-hidden ring-2 ring-white dark:ring-zinc-800 shadow-md"
                style={wrapperStyle}
            >
                {avatarNode}
            </div>
            <PlatformBadge platform={info.platform} />
        </div>
    );

    if (info.profileUrl) {
        return (
            <a
                href={info.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105 hover:z-10 relative"
                title={`@${info.displayName}`}
            >
                {inner}
            </a>
        );
    }

    return inner;
};

export default ContributorAvatar;
