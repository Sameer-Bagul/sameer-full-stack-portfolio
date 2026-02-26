## What we are building : 
This is a modern, full-stack developer portfolio built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui, powered by a MongoDB Atlas backend using Mongoose. Unlike a static portfolio, this platform is dynamically driven by a structured database, allowing projects, blogs, and study materials to be managed through a separate content system and rendered through secure API routes. The architecture follows a headless CMS approach, making the website scalable, maintainable, and production-ready while showcasing both frontend design capability and backend engineering expertise.

## Portfolio Layout and sections:
- home page : 
    1. Hero — Identity & Positioning
    2. Intro Video — Human connection
    3. About — Mindset & engineering philosophy
    4. Skills — Tools & capability clusters
    5. Services — What I build
    6. Featured Projects — Proof of execution
    7. Experience — Professional authority
    8. Strong CTA — Conversion
    9. Footer — Minimal professional links 
- All Product page 
- Blog page
- Study Material page
- Resume page

## theme and design styles and Content : 

> In whole websote we are going to use the multishaped tiles bento grid and lot of interted border radius

1. Hero section: 
    - the navbar with option - all project | blog | study material | resume | contact me 
    - Navbar should not have borders and popup beahviour until we scroll , as soon as we scroll down it should popup and border should come when we scroll up it should go back to original state
    - 70% left side content and 30% right side png transparent bg image
    - [main bold text] Hi, I'm Sameer Bagul
    - [sub text] I build cross platform software and AI based applications.
    - [then a tag line] Any stack . Any platform . I Deliver .
    - [then 2 buttons] View My Work | Contact Me
    - [image] [on right 30%]
    - whole hero page is in the dark , the image looks like the part of the image 

2. Intro Video section:
    - a title "know more about me"
    - centered video with play button [youtube video]
    - video should be in the center and it should be in the bento grid style 
    - video should have a border.

3. About — Mindset & engineering philosophy
    - 30% right side Image and 70% left side content 
    - image is tilt or rotated types by a small angle 
    - [heading text] A bit more about me 
    - [sub text]  [3-4 lines]
    - bento grid with tiles like 
        1. 150+ Projects Built
        2. 2+ Years of Experience
        3. 3200+ LinkedIn Connections
        4. IST (UTC+5:30)
        5. GitHub Contribution Graph
        6. spotify currently playing
        7. 
        

4. Skills — Tools & capability clusters
    - [heading text] Tools & capability clusters
    - [sub text] [1 line]
    - it will be 2 row caurosel of skills 
    - 1st row - languages + framworks + libraries  etc [left to right]  
    - 2nd row - tools + databases + cloud + ai  etc [right to left]
    - each skill should have a small icon [use icons from https://skillicons.dev/]
    
5. Services — What I build
    - [heading text] Services — What I build
    - [sub text] [1 line]
    - this sections will have the bento of various services 
    - 1. AI & ML Solutions
    - 2. Web & Mobile Applications
    - 3. Cloud & DevOps
    - 4. UI/UX Design
    - 5. Technical Consulting
    - 6. API Development
    - 7. QA Testing [playwright]
    - 8. cross platform development 
    - 9. Desktop Application Development
    - 10. SAAS tools 
    
6. Featured Projects — Proof of execution
    - [heading text] Featured Projects — Proof of execution
    - [sub text] [1 line]
    - this will have 3 cards, clicking on the cards will open a popup with all the details 
    - collapsed card will have - project image , project title , short project description , project link and github link
    - expanded card will have - project image , project title , project description , project link and github link and live link and all the details, youtube video url, Tech stack etc
    - hovering on the project image a youtube vieo will be played about the project 
    
7. Experience — Professional authority
    - [heading text] Experience — Professional authority
    - [sub text] [1 line]
    - 30% left side will have a box with the current job details 
    - 70% right side will have a timeline of all the previous jobs
    - on clicking any job in the timeline the 30% right container will show the details regardign my roll in that particular job
    
8. Strong CTA — Conversion
    - [heading text] Strong CTA — Conversion
    - [sub text] [1 line]
    - a bento like CTA with catchy GenZ lines and 2 buttons [contact me | view my work]
    - it will have my email, and a message box also.
    
9. Footer — Minimal professional links 
    - Footer will have 4 columns 
    - 1st column - logo and name
    - 2nd column - quick links [home, all projects, blog, study material, resume, contact me]
    - 3rd column - social links [github, linkedin, twitter, instagram, youtube]
    - 4th column - contact info [email, phone, address]

10. all Project page 
    - [heading text] All Projects
    - [sub text] [1 line]
    - this will have all the projects in a grid 
    - this page will have filters like web , mobile, AI, UI UX etc 
    - the project card component will be same as the featured project card component with the popup. 

11. Blog page 
    - [heading text] Blog
    - [sub text] [1 line]
    - this will have all the blogs in a grid 
    - blog page will have filters too like tech, health, poetry, life etc 
    - each blog will have a card with blog image , blog title , short blog description , blog link and github link
    - clicking on the blog card will open a popup with all the details 
    - users can comments on the blog and like the blog and share the blog 
    - blog will help to get SEO 
    
12. Study Material page 
    - [heading text] Study Material
    - [sub text] [1 line]
    - here the main focus is to provide the study material to the users 
    - The UI for the Study page wil looks like a course website. will have Topic-cards with the Topics like Javascript, HTML+CSS, React, Node, Python, AI, ML, Git, Github, DSA etc 
    - each topic card will have a popup with all the details 
    - each topic card will have a youtube video link and a github link 
    - each topic card will have a like button and a share button 
    - each topic card will have a rating system 
    - on clicking the the card we can see the notes for the parent topic-card, example uesr clicked on the Javascript card then we can see the notes for the Javascript as chapters in Js in a sequence, the notes for each chapter can be opened and will have the UI like kindle book 
    - the UI for the chapters : it will be like a digital Ebook but for coding notes. 
    - styling for codesnippets , formulas , etc 

## styling and theme : 
    - the whole website will have light and dark theme [default dark] 
    - wil have a minimalistic non icon theme toggle button
    - the portfolio will have the glassy theme with the apple Iphone like UI styles and minimal animations and transitions.
    - the UI will be very smooth and responsive.
    - The UI will be mobile responsive too
    - The UI will be optimized for the desktop, tablet, and mobile devices.
    - Bento grids
    - Inverted border radius
    - Subtle glass (very light)
    - Smooth motion
    - No heavy blur everywhere.
    - for the colors and other details regarding the custom cursor check the /home/sameerbagul/Projects/Github/personal-notes-taking/portfolio/mannu-portfolio
    - we will use the similar colors from the mannu portfolio

## SEO : 
    -  the all pages on the websote are contentful and have proper meta tags and schema markup. 
    - the all content like study pages , blogs and other data will have the URLs appropriate for SEO , 
    - optimise the portfolio for the search engines for words like freelance, freelancer etc
    - even if someone searches for the notes , blogs, etc the site should rank on the first page of google. 
    - we are using Next.js so use its SEO properties on peak to make the websote rank 1st in all type of tech shit and for my names too 

