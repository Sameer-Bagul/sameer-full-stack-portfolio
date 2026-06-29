import os

components = '/home/sameerbagul/Projects/Github/CV_Projects🤩/Portfolio_CMS/sameer-portfolio/components'

def update(file, replacements):
    path = os.path.join(components, file)
    with open(path, 'r') as f:
        content = f.read()
    for s, r in replacements:
        content = content.replace(s, r)
    with open(path, 'w') as f:
        f.write(content)

# 1. About
update('About.tsx', [
    ('colorClass="bg-[#C5FF41] text-black h-full !p-4"', 'colorClass="bg-[#C5FF41] text-black h-full border-none shadow-[0_0_40px_rgba(197,255,65,0.2)]"'),
    ('colorClass="bg-[#F46C38] text-white h-full"', 'colorClass="bg-[#F46C38] text-white h-full border-none shadow-[0_0_40px_rgba(244,108,56,0.2)]"'),
    ('colorClass="bg-white text-black h-full !p-4"', 'colorClass="bg-white text-black h-full border-none"'),
    ('colorClass="bg-[#C5FF41] text-black h-full shadow-sm"', 'colorClass="bg-white/5 text-white h-full border border-white/10"'),
])

# 2. Skills
update('Skills.tsx', [
    ('<div className="w-full px-0 sm:px-6 max-w-7xl mx-auto">', '<div className="w-full">'),
    ('bg-zinc-50/50 dark:bg-zinc-950/20', 'bg-transparent'),
    ('from-zinc-50 dark:before:from-zinc-950/20', 'from-[#151312]'),
    ('from-zinc-50 dark:after:from-zinc-950/20', 'from-[#151312]'),
    ('bg-white/50 dark:bg-zinc-900/50', 'bg-white/5 border-white/10'),
    ('text-[var(--tmpl-text-3)]', 'text-zinc-500')
])

# 3. Services (completely override CSS variables)
update('Services.tsx', [
    ('bg-[var(--tmpl-surface)]/50', 'bg-white/5'),
    ('bg-[var(--tmpl-surface)]', 'bg-white/5'),
    ('border-[var(--tmpl-border)]', 'border-white/10'),
    ('border-[var(--tmpl-border-hi)]', 'border-white/20'),
    ('bg-[var(--tmpl-accent)]', 'bg-[#C5FF41]'),
    ('text-[var(--tmpl-accent)]', 'text-[#C5FF41]'),
    ('text-[var(--tmpl-text)]', 'text-white'),
    ('text-[var(--tmpl-text-2)]', 'text-zinc-300'),
    ('text-[var(--tmpl-text-3)]', 'text-zinc-500'),
    ('bg-[var(--tmpl-bg)]/50', 'bg-black/20'),
    ('bg-[var(--tmpl-bg)]/30', 'bg-black/10'),
    ('rounded-[1.5rem] lg:rounded-[2rem]', 'rounded-[2rem] lg:rounded-[3rem]'),
    ('font-seona not-italic', 'font-seona uppercase tracking-tighter'),
])

# 4. Featured Projects
update('FeaturedProjects.tsx', [
    ('rounded-[2.5rem] overflow-hidden p-4', 'rounded-[2.5rem] overflow-hidden p-4 md:p-6'),
    ('aspect-[4/3] rounded-[2rem]', 'aspect-[4/3] rounded-[2.5rem]'),
    ('rounded-full bg-white/5', 'rounded-full bg-[#C5FF41] text-black font-bold border-none'),
])

# 5. Experience
update('Experience.tsx', [
    ('font-seona uppercase tracking-tighter', 'font-seona uppercase tracking-tighter text-white'),
    ('rounded-[2rem] p-8 sm:p-10 relative hover:bg-white/10 transition-colors', 'rounded-[2.5rem] p-8 sm:p-10 relative hover:bg-white/10 transition-colors border-white/10 bg-white/5'),
    ('text-primary', 'text-[#F46C38]'),
    ('text-accent', 'text-[#C5FF41]'),
    ('bg-primary/20', 'bg-[#F46C38]/20'),
])

# 6. CTA
update('CTA.tsx', [
    ('bg-[#F46C38] rounded-[3rem] overflow-hidden', 'bg-[#F46C38] rounded-[3.5rem] overflow-hidden p-8 md:p-12'),
    ('className="text-white"', 'className="text-white font-bold"'),
    ('font-seona uppercase tracking-tighter', 'font-seona uppercase tracking-tighter text-[4rem] sm:text-[6rem] leading-none'),
    ('bg-white text-black hover:bg-zinc-100', 'bg-black text-white hover:bg-black/80 font-bold tracking-tight'),
    ('bg-white/10 hover:bg-white/20 text-white', 'bg-white/20 hover:bg-white/30 text-white font-bold tracking-tight'),
])

# 7. Footer
update('Footer.tsx', [
    ('<footer className="w-full bg-[#151312] border-t border-white/10 pt-16 pb-8">', '<footer className="mt-24 mb-6 mx-4 md:mx-10 rounded-[2.5rem] border border-white/10 bg-white/5 overflow-hidden pt-16 pb-8">'),
    ('<footer className="border-t border-white/10 bg-[#151312] mt-24">', '<footer className="mt-24 mb-6 mx-4 md:mx-10 rounded-[2.5rem] border border-white/10 bg-white/5 overflow-hidden">'),
    ('text-primary', 'text-[#C5FF41]'),
])

print("UI refined")
