import os
import glob

components_dir = '/home/sameerbagul/Projects/Github/CV_Projects🤩/Portfolio_CMS/sameer-portfolio/components'
files = glob.glob(os.path.join(components_dir, '*.tsx'))

for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    # We want to remove bg-[#151312] from section tags and general wrappers, but keep it for card backgrounds if they need it.
    # Actually, the user says "the website have a black bg which is stoppign the glow".
    # The glow is in layout.tsx behind <main>.
    # So we need to remove bg-[#151312] from the top-level <section> or <div>.
    # Let's just replace all instances of "bg-[#151312]" with "bg-transparent" ONLY in the top level wrappers,
    # or just replace all instances of "bg-[#151312]" with "bg-transparent" EXCEPT when it's specifically for a card inside.
    
    new_content = content.replace('bg-[#151312]', 'bg-transparent')
    
    if new_content != content:
        with open(file, 'w') as f:
            f.write(new_content)
        print(f"Updated {os.path.basename(file)}")

