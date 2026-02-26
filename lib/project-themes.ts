import {
    Code2,
    Terminal,
    Cpu,
    Database,
    Shield,
    Zap,
    Server,
    Box,
    Smartphone,
    Atom,
    LucideIcon
} from 'lucide-react';

export interface ProjectTheme {
    Icon: LucideIcon;
    gradient: string;
}

export const getProjectTheme = (techStack: string[] = [], title: string = '', description: string = ''): ProjectTheme => {
    const text = (techStack?.join(' ') + ' ' + title + ' ' + description).toLowerCase();

    if (text.includes('react') || text.includes('native') || text.includes('frontend'))
        return { Icon: Atom, gradient: 'from-blue-600 to-cyan-500' };
    if (text.includes('next') || text.includes('next.js'))
        return { Icon: Zap, gradient: 'from-zinc-700 to-black' };
    if (text.includes('python') || text.includes('ai') || text.includes('machine learning') || text.includes('deep learning'))
        return { Icon: Cpu, gradient: 'from-yellow-500 to-orange-500' };
    if (text.includes('security') || text.includes('cyber') || text.includes('auth'))
        return { Icon: Shield, gradient: 'from-red-600 to-rose-500' };
    if (text.includes('database') || text.includes('sql') || text.includes('mongo') || text.includes('prisma'))
        return { Icon: Database, gradient: 'from-emerald-500 to-teal-400' };
    if (text.includes('cli') || text.includes('tool') || text.includes('git') || text.includes('automation'))
        return { Icon: Terminal, gradient: 'from-slate-700 to-slate-900' };
    if (text.includes('mobile') || text.includes('app') || text.includes('ios') || text.includes('android'))
        return { Icon: Smartphone, gradient: 'from-purple-600 to-indigo-600' };
    if (text.includes('server') || text.includes('api') || text.includes('backend') || text.includes('node'))
        return { Icon: Server, gradient: 'from-blue-700 to-indigo-800' };
    if (text.includes('monorepo') || text.includes('turbo') || text.includes('architecture'))
        return { Icon: Box, gradient: 'from-pink-600 to-rose-600' };

    return { Icon: Code2, gradient: 'from-violet-600 to-purple-600' };
};
