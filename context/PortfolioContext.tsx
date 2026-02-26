'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
    getExperience,
    getProjects,
    getBlogs,
    getSkills,
    getTestimonials,
    getAchievements,
    type Experience,
    type Project,
    type Blog,
    type Skill,
    type Testimonial,
    type Achievement
} from '@/lib/api';

interface PortfolioData {
    experience: Experience[];
    projects: Project[];
    blogs: Blog[];
    skills: Skill[];
    testimonials: Testimonial[];
    achievements: Achievement[];
}

interface PortfolioContextType extends PortfolioData {
    loading: boolean;
    error: string | null;
    refreshData: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<PortfolioData>({
        experience: [],
        projects: [],
        blogs: [],
        skills: [],
        testimonials: [],
        achievements: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [exp, proj, blg, skl, tst, ach] = await Promise.all([
                getExperience(),
                getProjects(),
                getBlogs(),
                getSkills(),
                getTestimonials(),
                getAchievements()
            ]);

            setData({
                experience: exp,
                projects: proj,
                blogs: blg,
                skills: skl,
                testimonials: tst,
                achievements: ach
            });
            setError(null);
        } catch (err: any) {
            console.error('Error fetching portfolio data:', err);
            setError(err.message || 'Failed to fetch portfolio data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <PortfolioContext.Provider value={{ ...data, loading, error, refreshData: fetchData }}>
            {children}
        </PortfolioContext.Provider>
    );
};

export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (context === undefined) {
        throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
};
