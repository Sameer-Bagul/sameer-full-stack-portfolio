'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="w-14 h-8" />;

    const isDark = theme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={cn(
                "relative w-14 h-8 rounded-full transition-all duration-500 ease-in-out px-1 flex items-center shadow-inner overflow-hidden border border-white/10",
                isDark ? "bg-zinc-800" : "bg-zinc-100"
            )}
            aria-label="Toggle theme"
        >
            <div
                className={cn(
                    "absolute w-6 h-6 rounded-full bg-white dark:bg-zinc-950 shadow-md transform transition-all duration-500 ease-in-out",
                    isDark ? "translate-x-6" : "translate-x-0"
                )}
            />
        </button>
    );
}
