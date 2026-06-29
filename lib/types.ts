export interface Blog {
    _id: string;
    title: string;
    shortDescription: string;
    longContent: string;
    coverImage: string;
    category: string;
    author: string;
    readingTime: string;
    tags: string[];
    githubLink: string;
    blogLink: string;
    publishedAt: string;
    isPublished: boolean;
}

export interface Project {
    _id: string;
    title: string;
    slug?: string;
    shortDescription: string;
    description: string;
    tags: string[];
    techStack: string[];
    category: string;
    isFeatured: boolean;
    image: string;
    projectDate?: string;
    createdAt?: string;
    videoUrl: string;
    githubUrl: string;
    liveUrl: string;
    contributors: string[];
    features: string[];
    status?: string;
    role?: string;
    clientOrCompany?: string;
    duration?: string;
    targetAudience?: string;
    techStackBreakdown?: {
        frontend?: string[];
        backend?: string[];
        infrastructure?: string[];
    };
    myContributions?: string[];
    gallery?: { url: string; caption?: string }[];
    architectureDiagram?: string;
    apiDocsUrl?: string;
    figmaUrl?: string;
    challenges?: string[];
    learnings?: string[];
    metrics?: string[];
    clientTestimonial?: {
        name: string;
        role: string;
        quote: string;
    };
    relatedBlogs?: {
        title: string;
        slug: string;
    }[];
    futureRoadmap?: string[];
}

export interface Skill {
    _id: string;
    name: string;
    icon: string;
    category?: string;
    row?: number;
}

export interface Experience {
    _id: string;
    id: string;
    role: string;
    company: string;
    location?: string;
    startDate: string;
    endDate?: string;
    duration: string;
    current: boolean;
    bullets: string[];
    techStack: string[];
}

export interface Testimonial {
    _id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    avatar: string;
}

export interface Achievement {
    _id: string;
    title: string;
    organization: string;
    description: string;
    date: string;
    image?: string;
    type: 'award' | 'certification';
}

export interface NoteFolder {
    _id: string;
    name: string;
    slug: string;
    color?: string;
    description?: string;
    noteCount?: number;
    updatedAt: string;
}

export interface Note {
    _id: string;
    title: string;
    content: string;
    content_html?: string;
    description?: string;
    slug: string;
    tags: string[];
    order?: number;
    updatedAt: string;
}

export interface Pin {
    _id: string;
    title: string;
    description: string;
    link: string;
    icon?: string;
}

export interface Board {
    _id: string;
    title: string;
    description?: string;
    link: string;
}

export interface CodingPlatform {
    _id: string;
    platform: string;
    username: string;
    rating?: string;
    link: string;
    icon?: string;
}

export interface PortfolioData {
    experience: Experience[];
    projects: Project[];
    blogs: Blog[];
    skills: Skill[];
    testimonials: Testimonial[];
    achievements: Achievement[];
}
