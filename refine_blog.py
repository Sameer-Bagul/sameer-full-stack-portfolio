import os

components = '/home/sameerbagul/Projects/Github/CV_Projects🤩/Portfolio_CMS/sameer-portfolio/components'
app_blog = '/home/sameerbagul/Projects/Github/CV_Projects🤩/Portfolio_CMS/sameer-portfolio/app/blog'

def update(path, replacements):
    if not os.path.exists(path):
        return
    with open(path, 'r') as f:
        content = f.read()
    for s, r in replacements:
        content = content.replace(s, r)
    with open(path, 'w') as f:
        f.write(content)

# 1. BlogCard.tsx
update(os.path.join(components, 'BlogCard.tsx'), [
    ('rounded-2xl', 'rounded-[2.5rem]'),
    ('bg-zinc-50 dark:bg-zinc-900/40 border-none', 'bg-white/5 border border-white/10'),
    ('text-2xl font-black lowercase tracking-tighter text-zinc-900 dark:text-zinc-100 mb-2 leading-none font-seona not-italic', 'text-2xl font-seona uppercase tracking-tighter text-white mb-2 leading-none'),
    ('text-zinc-900 dark:text-zinc-100', 'text-white'),
    ('text-zinc-600 dark:text-zinc-400', 'text-zinc-400'),
    ('bg-zinc-100 dark:bg-zinc-800', 'bg-white/10 border border-white/10 text-white'),
    ('bg-primary/20 backdrop-blur-md border border-primary/30', 'bg-[#F46C38] border border-[#F46C38]'),
    ('text-primary-foreground', 'text-white font-bold'),
])

# 2. BlogContent.tsx
update(os.path.join(app_blog, 'BlogContent.tsx'), [
    ('text-5xl md:text-7xl font-black tracking-tighter leading-none mb-5 font-seona', 'text-[4rem] sm:text-[6rem] font-seona uppercase tracking-tighter leading-none mb-5 text-white'),
    ('text-zinc-500 dark:text-zinc-400', 'text-zinc-400'),
    ('bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md', 'bg-[#F46C38] text-white shadow-[0_0_20px_rgba(244,108,56,0.2)] font-bold'),
    ('bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-primary/50 hover:text-primary', 'bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white transition-all'),
    ('bg-zinc-100 dark:bg-zinc-900 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800', 'bg-white/5 px-6 py-3 rounded-full border border-white/10 text-white focus-within:border-white/30 transition-colors'),
    ('text-muted-foreground', 'text-zinc-500'),
])

print("Blog refined")
