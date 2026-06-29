import os
import glob
import re

components_dir = '/home/sameerbagul/Projects/Github/CV_Projects🤩/Portfolio_CMS/sameer-portfolio/components'
files = glob.glob(os.path.join(components_dir, '*.tsx'))

# Remove bg-* from section tags, and remove overflow-hidden so blurs aren't clipped
for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    # We want to remove 'bg-transparent', 'bg-[#151312]', 'bg-background', 'bg-zinc-950', 'bg-white/5' 
    # but ONLY from the top-level <section> or <div className="... w-full ..."> wrappers.
    # It's safer to just remove `overflow-hidden` from <section> tags.
    # And remove any bg- styles from <section className="...">
    
    # Let's target <section className="..."> specifically
    def replacer(match):
        cls = match.group(1)
        cls = re.sub(r'\bbg-transparent\b', '', cls)
        cls = re.sub(r'\bbg-\[#151312\]\b', '', cls)
        cls = re.sub(r'\bbg-background\b', '', cls)
        cls = re.sub(r'\bbg-zinc-950\b', '', cls)
        cls = re.sub(r'\boverflow-hidden\b', '', cls)
        cls = re.sub(r'\boverflow-x-hidden\b', '', cls)
        cls = re.sub(r'\boverflow-x-clip\b', '', cls)
        cls = ' '.join(cls.split()) # clean up extra spaces
        return f'<section className="{cls}"'
        
    new_content = re.sub(r'<section className="([^"]+)"', replacer, content)
    
    # Let's also do it for any root divs that act as sections if they exist
    if new_content != content:
        with open(file, 'w') as f:
            f.write(new_content)
        print(f"Cleaned section in {os.path.basename(file)}")

