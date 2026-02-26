'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HeaderContextType {
    title: string;
    setTitle: (title: string) => void;
    actions: React.ReactNode | null;
    setActions: (actions: React.ReactNode | null) => void;
    clearHeader: () => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [title, setTitle] = useState<string>('');
    const [actions, setActions] = useState<React.ReactNode | null>(null);

    const clearHeader = React.useCallback(() => {
        setTitle('');
        setActions(null);
    }, []);

    const value = React.useMemo(() => ({
        title,
        setTitle,
        actions,
        setActions,
        clearHeader
    }), [title, actions, clearHeader]);

    return (
        <HeaderContext.Provider value={value}>
            {children}
        </HeaderContext.Provider>
    );
};

export function useHeader() {
    const context = useContext(HeaderContext);
    if (context === undefined) {
        throw new Error('useHeader must be used within a HeaderProvider');
    }
    return context;
}
