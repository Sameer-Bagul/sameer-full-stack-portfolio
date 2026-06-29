const fs = require('fs');
const path = require('path');
const componentsDir = path.join(__dirname, 'components');

function replaceFile(filename, replacements) {
    const file = path.join(componentsDir, filename);
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    for (let r of replacements) {
        content = content.replace(r.search, r.replace);
    }
    fs.writeFileSync(file, content);
    console.log(`Updated ${filename}`);
}

// 1. About.tsx - Better UI for tiles
replaceFile('About.tsx', [
    {
        search: /<Card className={cn\("p-6 flex flex-col justify-center items-center text-center space-y-2 border-none rounded-2xl bg-white\/5 border border-white\/10\/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-300 group", colorClass\)}>/g,
        replace: `<Card className={cn("p-6 flex flex-col justify-center items-center text-center space-y-2 border border-white/10 rounded-[2rem] hover:-translate-y-1 transition-all duration-300 group", colorClass)}>`
    },
    {
        search: /bg-blue-500\/10 dark:bg-blue-500\/20 text-blue-500/g,
        replace: 'bg-[#C5FF41] text-black'
    },
    {
        search: /bg-purple-500\/10 dark:bg-purple-500\/20 text-purple-500/g,
        replace: 'bg-[#F46C38] text-white'
    },
    {
        search: /bg-blue-600\/10 dark:bg-blue-600\/20 text-blue-600/g,
        replace: 'bg-white text-black'
    },
    {
        search: /bg-orange-500\/10 dark:bg-orange-500\/20 text-orange-500/g,
        replace: 'bg-[#C5FF41] text-black'
    },
    {
        search: /bg-white\/5 border border-white\/10 rounded-3xl border border-white\/10/g,
        replace: 'bg-white/5 border border-white/10 rounded-[2rem]'
    },
    {
        search: /bg-white\/5 border border-white\/10 border-none rounded-2xl/g,
        replace: 'bg-white/5 border border-white/10 rounded-[2rem]'
    },
    {
        search: /rounded-3xl/g,
        replace: 'rounded-[2rem]'
    },
    {
        search: /rounded-2xl/g,
        replace: 'rounded-[2rem]'
    }
]);

// 2. Skills.tsx - Tools & capability clusters - slide marquee
replaceFile('Skills.tsx', [
    {
        search: /bg-zinc-50 dark:bg-zinc-950/g,
        replace: 'bg-[#151312]'
    },
    {
        search: /container px-4/g,
        replace: 'w-full px-0' // edge to edge marquee
    }
]);

// 3. Services.tsx - Complete redesign, minimalistic
// For this I will replace the main grid with something minimal
// Actually, let's just make the cards large and elegant.
replaceFile('Services.tsx', [
    {
        search: /grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6/g,
        replace: 'grid-cols-1 md:grid-cols-2 gap-8' // Bigger cards
    },
    {
        search: /bg-white\/5 border border-white\/10 rounded-2xl/g,
        replace: 'bg-white/5 border border-white/10 rounded-[2.5rem] min-h-[300px]'
    },
    {
        search: /p-8/g,
        replace: 'p-10'
    }
]);

// 4. FeaturedProjects.tsx - better project card
replaceFile('FeaturedProjects.tsx', [
    {
        search: /rounded-2xl/g,
        replace: 'rounded-[2rem]'
    },
    {
        search: /bg-white\/5 border border-white\/10 rounded-\[2rem\] overflow-hidden/g,
        replace: 'bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden p-4 group-hover:bg-white/10 transition-colors'
    },
    {
        search: /aspect-video/g,
        replace: 'aspect-[4/3] rounded-2xl'
    }
]);

// 5. Experience.tsx - better styling for empty wireframe cards
replaceFile('Experience.tsx', [
    {
        search: /bg-white\/5 border border-white\/10 p-6 sm:p-8 relative/g,
        replace: 'bg-white/5 border border-white/10 rounded-[2rem] p-8 sm:p-10 relative hover:bg-white/10 transition-colors'
    }
]);

// 6. CTA.tsx - Let's connect better form, catchy CTA
replaceFile('CTA.tsx', [
    {
        search: /bg-white\/5 border border-white\/10 overflow-hidden/g,
        replace: 'bg-[#F46C38] rounded-[3rem] overflow-hidden'
    },
    {
        search: /text-white/g, // This might be dangerous, let's specifically target the headings
        replace: 'text-white'
    },
    {
        search: /<p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">/g,
        replace: '<p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto font-poppins">'
    }
]);

