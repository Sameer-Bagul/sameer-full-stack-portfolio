import os

files = [
    '/home/sameerbagul/Projects/Github/CV_Projects🤩/Portfolio_CMS/sameer-portfolio/components/Testimonials.tsx',
    '/home/sameerbagul/Projects/Github/CV_Projects🤩/Portfolio_CMS/sameer-portfolio/components/FeaturedProjects.tsx'
]

for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    # Replace ONLY top-level bg-background to bg-transparent
    # Let's just do a naive replace, it's safer if it's just the section wrappers.
    new_content = content.replace('bg-background', 'bg-transparent')
    
    if new_content != content:
        with open(file, 'w') as f:
            f.write(new_content)
        print(f"Updated {os.path.basename(file)}")

