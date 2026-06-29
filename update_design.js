const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');
const filesToUpdate = [
    'About.tsx',
    'Skills.tsx',
    'Services.tsx',
    'FeaturedProjects.tsx',
    'Testimonials.tsx',
    'Experience.tsx',
    'CTA.tsx'
];

filesToUpdate.forEach(file => {
    const filePath = path.join(componentsDir, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // Typography
    content = content.replace(/font-instrument/g, 'font-seona uppercase tracking-tighter');
    
    // Backgrounds & Cards
    // Replace light/dark combos with a sleek transparent card
    content = content.replace(/bg-zinc-100\/50 dark:bg-zinc-900\/50/g, 'bg-white/5 border border-white/10');
    content = content.replace(/bg-zinc-50 dark:bg-zinc-900/g, 'bg-white/5 border border-white/10');
    content = content.replace(/bg-zinc-100 dark:bg-zinc-900/g, 'bg-white/5 border border-white/10');
    content = content.replace(/bg-zinc-50 dark:bg-zinc-950/g, 'bg-white/5 border border-white/10');
    content = content.replace(/bg-zinc-100\/80 dark:bg-zinc-900\/80/g, 'bg-white/5 border border-white/10');
    content = content.replace(/bg-white dark:bg-zinc-900/g, 'bg-white/5 border border-white/10');
    content = content.replace(/bg-white dark:bg-zinc-800/g, 'bg-white/10 border border-white/10');
    content = content.replace(/bg-zinc-200\/50 dark:bg-zinc-800\/50/g, 'bg-white/5 border border-white/10');

    // Borders
    content = content.replace(/border-zinc-200\/50 dark:border-zinc-800\/50/g, 'border-white/10');
    content = content.replace(/border-zinc-200 dark:border-zinc-800/g, 'border-white/10');

    // Text colors
    content = content.replace(/text-foreground/g, 'text-white');
    content = content.replace(/text-zinc-900 dark:text-zinc-100/g, 'text-white');
    content = content.replace(/text-muted-foreground/g, 'text-zinc-400');

    // Primary/Accent Colors
    content = content.replace(/text-primary/g, 'text-[#C5FF41]');
    content = content.replace(/bg-primary\/10/g, 'bg-[#C5FF41]/10');
    content = content.replace(/bg-primary\/5/g, 'bg-[#C5FF41]/5');
    content = content.replace(/text-accent/g, 'text-[#F46C38]');

    fs.writeFileSync(filePath, content);
    console.log('Updated ' + file);
});
