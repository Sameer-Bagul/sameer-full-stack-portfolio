'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
    const pathname = usePathname();

    // Hide footer on study notes pages
    const isStudyPage = pathname.startsWith('/study');

    if (isStudyPage) return null;

    return <Footer />;
}
