// src/data/project.ts

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  startDate: string;
  endDate: string;
}

export const projects: Project[] = 
[
 {
    "id": 1,
    "title": "Agrotech-Pratham",
    "description": "Freelancing project for an Agrotech shop. Built with Next.js, SEO, and Tailwind CSS.",
    "longDescription": "Agrotech-Pratham is a bespoke web solution developed for a local Agrotech shop aiming to enhance its online presence. Utilizing Next.js for server-side rendering and Tailwind CSS for responsive design, the platform ensures optimal performance and user experience. SEO best practices were implemented to increase visibility on search engines, driving more traffic to the site. The project involved close collaboration with the client to understand their specific needs, resulting in a tailored solution that showcases their products and services effectively. Features include a dynamic product catalog, contact forms, and integration with social media platforms. The responsive design ensures accessibility across various devices, catering to a broader audience. The deployment process included rigorous testing to ensure functionality and performance. Post-launch, the client reported increased customer engagement and inquiries, attributing the growth to the enhanced online platform. The project stands as a testament to delivering customized web solutions that align with client objectives and market demands.",
    "tags": ["Next.js", "Tailwind CSS", "SEO"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988916/pratham-agro_2_ynzdzf.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Jan 2023",
    "endDate": "Feb 2023"
  },
  {
    "id": 2,
    "title": "App Club Landing Page",
    "description": "Landing page for the App Club at my college, mentoring 200+ students and assisting with 50+ projects.",
    "longDescription": "The App Club Landing Page serves as the digital front for the college's App Club, a hub for innovation and collaboration among students. Designed with a focus on user engagement, the landing page provides information about the club's mission, ongoing projects, and mentorship programs. Built using modern web technologies, the page features interactive elements that highlight student achievements and upcoming events. The design emphasizes accessibility and responsiveness, ensuring a seamless experience across devices. As a mentor to over 200 students, the platform also includes resources and links to support materials, fostering a learning environment. The project involved coordinating with club members to gather content and feedback, ensuring the page accurately represents the club's dynamic nature. The successful deployment of the landing page has led to increased membership and participation in club activities, showcasing the impact of effective digital communication in academic settings.",
    "tags": ["HTML", "CSS", "JavaScript"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988885/app-club-landing-page_2_lfrag5.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Mar 2023",
    "endDate": "Apr 2023"
  },
  {
    "id": 3,
    "title": "Best MERN Auth",
    "description": "Advanced MERN stack authentication system featuring multiple security features.",
    "longDescription": "Best MERN Auth is a comprehensive authentication system built using the MERN stack, focusing on robust security measures. The application incorporates features such as email verification through OTP, JWT-based authentication, two-factor authentication (2FA), and password reset functionality. Designed to be modular and scalable, the system ensures secure user management for various applications. The backend, developed with Node.js and Express, handles authentication logic and integrates with MongoDB for data persistence. The frontend, built with React, provides a user-friendly interface for registration, login, and account management. Security best practices, including hashing passwords and implementing secure token storage, were followed meticulously. The project also includes thorough documentation to assist developers in integrating the authentication system into their applications. By addressing common security concerns, Best MERN Auth serves as a reliable foundation for applications requiring secure user authentication.",
    "tags": ["MongoDB", "Express", "React", "Node.js", "JWT", "2FA"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988911/mern-authentication-system_3_bok1sh.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "May 2023",
    "endDate": "Jun 2023"
  },
  {
    "id": 4,
    "title": "Business Billing Suite",
    "description": "Freelancing project: Billing system for a cement business in Nashik with 12+ shops.",
    "longDescription": "The Business Billing Suite is a tailored billing system developed for a cement business operating across 12+ shops in Nashik, Maharashtra. Aimed at streamlining operations, the application automates invoice generation, inventory management, and sales tracking. Built using the MERN stack, the system ensures real-time data synchronization across all branches. Key features include user authentication with JWT, email OTP verification, two-factor authentication, and password reset capabilities, enhancing security. The intuitive dashboard provides insights into sales metrics and inventory levels, aiding decision-making. The implementation of this system led to a 50% improvement in operational efficiency and saved approximately 2 hours of manual work daily. The project involved close collaboration with the business stakeholders to understand their workflow and customize the solution accordingly. Post-deployment support ensured smooth adoption and addressed any operational challenges, solidifying the suite's role in the business's digital transformation.",
    "tags": ["MongoDB", "Express", "React", "Node.js", "JWT", "2FA"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988916/pratham-agro_2_ynzdzf.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Jul 2023",
    "endDate": "Sep 2023"
  },
  {
    "id": 5,
    "title": "Dev Library",
    "description": "Personal library containing 1000+ notes on 15+ topics.",
    "longDescription": "Dev Library is a comprehensive personal knowledge base designed to organize and access over 1000 notes spanning more than 15 topics, including Web Development, MERN, Next.js, React, JavaScript, Python, C++, C, Data Structures & Algorithms, Gen AI, AI/ML, ML/DL, Cloud Computing, Cyber Security, Blockchain, and Web 3.0. The platform offers a structured interface for categorizing and retrieving notes efficiently. Built with a focus on scalability and user experience, it employs modern web technologies to ensure responsiveness and performance. Features include search functionality, tagging, and the ability to add or edit notes seamlessly. The project serves as a valuable resource for continuous learning and quick reference, reflecting a commitment to personal and professional development. By centralizing diverse topics, Dev Library facilitates interdisciplinary learning and supports ongoing skill enhancement.",
    "tags": ["React", "Tailwind CSS", "JavaScript"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988889/dev-lib_1_koknyj.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Oct 2023",
    "endDate": "Nov 2023"
  },
  {
    "id": 6,
    "title": "DSA Tracker",
    "description": "Interactive web app to track DSA progress across 450+ questions.",
    "longDescription": "The DSA Tracker is a productivity-focused web app created to help learners and aspiring developers systematically track their progress across 450+ Data Structures and Algorithms problems. Inspired by the popular Love Babbar DSA Sheet, this project categorizes problems by topics such as Arrays, Strings, Trees, Graphs, and Dynamic Programming. Users can mark problems as solved, bookmark them for revision, and monitor their stats through a progress dashboard. It includes filters to view unsolved or bookmarked problems and offers quick links to platform-specific problems (like LeetCode, GeeksforGeeks). Built using React and Firebase, it supports persistent user sessions and real-time data sync. This tool empowers students preparing for tech interviews or competitive programming by giving them a structured way to practice consistently and track their learning outcomes.",
    "tags": ["React", "Firebase", "Tailwind CSS", "JavaScript"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988891/dsa-tracker_1_ublbm6.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Dec 2023",
    "endDate": "Jan 2024"
  },
  {
    "id": 7,
    "title": "eBook Web App",
    "description": "An interactive MERN-based eBook reading and writing platform.",
    "longDescription": "The eBook Web App is a full-featured digital reading and writing platform that empowers users to create, share, and read eBooks. Built using the MERN stack, the app allows authors to write chapters using a rich text editor, manage book metadata, and publish their works to the community. Readers can browse categories, bookmark chapters, leave feedback, and follow authors. The backend handles user authentication (with JWT), role-based permissions (reader/writer/admin), and cloud-based image upload for book covers. The interface is designed with Tailwind CSS and optimized for readability across devices. The app also supports markdown rendering and dark/light mode toggling. Whether you're a reader looking to discover indie content or a writer building your portfolio, this project provides a dynamic space for literary creativity.",
    "tags": ["MongoDB", "Express", "React", "Node.js", "MERN", "Rich Editor"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988893/ebook-webapp_1_p1hkhk.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Jan 2024",
    "endDate": "Feb 2024"
  },
  {
    "id": 8,
    "title": "Event Management System",
    "description": "Full-stack event registration and payment system with dashboard.",
    "longDescription": "This Event Management System is a comprehensive MERN application designed to manage online registrations, ticketing, and payments for events such as hackathons, seminars, and cultural festivals. The platform features event listing, user registration, real-time seat tracking, and payment integration with Razorpay/Stripe. Admins can create events, manage participant data, and download attendance reports from a clean dashboard. Built with React for the frontend, Node.js/Express for the backend, and MongoDB for data storage, the app is both scalable and secure. Role-based access control ensures that only organizers can manage event logistics. It includes email notifications for registrations and reminders, responsive design for mobile users, and QR code generation for entry verification. The system was tested in a real college hackathon with over 500 participants.",
    "tags": ["MongoDB", "Express", "React", "Node.js", "Payment Gateway"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988886/event-system_1_a5bibi.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Feb 2024",
    "endDate": "Mar 2024"
  },
  {
    "id": 9,
    "title": "Feedback Management App",
    "description": "App for collecting and visualizing feedback using charts and dashboards.",
    "longDescription": "The Feedback Management App is a lightweight but powerful tool designed to collect structured feedback from students, users, or customers and visualize it using modern data-driven dashboards. Built using React and Chart.js, it features customizable feedback forms, submission storage with MongoDB, and automated response aggregation. The backend, powered by Express and Node.js, handles secure API endpoints and user authentication. The admin panel provides graphical insights (bar, pie, radar charts) to easily spot trends and make decisions. This app has been used in internal college events and educational projects to gather user responses and drive improvements. The UI is mobile-first and intuitive, making it easy for participants to share their opinions quickly.",
    "tags": ["React", "Node.js", "Chart.js", "MongoDB", "Data Visualization"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988892/feedback-app_1_wjpxrb.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Mar 2024",
    "endDate": "Apr 2024"
  },
  {
    "id": 10,
    "title": "Hackathon Website",
    "description": "Official website for a national-level 24hr hackathon hosted in Pune.",
    "longDescription": "The Hackathon Website was built for a 24+ hour national-level hackathon hosted in Pune, aimed at showcasing event details, team registration, and participant guidelines. This sleek, animated site includes sections for problem statements, prize pool info, mentors/judges, and FAQs. Using Next.js for fast rendering and Framer Motion for subtle animations, it delivers a premium experience. Teams can register with details like team name, members, college, and contact. The backend supports email confirmation and automated reminders. Built for scalability and tested under high traffic loads, the site supported over 1000+ visits per day during the registration period. It also includes a live countdown timer and sponsor section. The site was praised for its UI and was an important face of the event’s digital marketing efforts.",
    "tags": ["Next.js", "Framer Motion", "Tailwind CSS", "Hackathon"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988891/hackathon-website_1_cyzufx.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Apr 2024",
    "endDate": "May 2024"
  },
  {
    "id": 11,
    "title": "Hackathon Judge Panel",
    "description": "A web app for judges to score, rank, and review hackathon projects.",
    "longDescription": "The Hackathon Judge Panel is a specialized scoring platform developed for real-time hackathon judging. Built with React and Node.js, this app enables event judges to log in securely, view all submitted projects, evaluate them across custom criteria (like Innovation, Design, Feasibility), and provide qualitative feedback. Each judge's scores are stored individually and then averaged across all judges to calculate final rankings. The admin panel allows organizers to assign judges, set judging rubrics, and export results. With a responsive design, judges can use tablets or laptops seamlessly. The application minimizes manual errors and provides transparency in scoring. It was successfully deployed in a large-scale national-level hackathon, with over 100 projects reviewed using the platform.",
    "tags": ["React", "Node.js", "MongoDB", "Scoring System", "Hackathon"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988891/judge-panel_1_q9xvzy.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Apr 2024",
    "endDate": "May 2024"
  },
  {
    "id": 12,
    "title": "Interview Management System",
    "description": "App to schedule, evaluate, and track interviews in an organization.",
    "longDescription": "The Interview Management System is a full-stack application designed for HR teams, colleges, or startups to streamline interview scheduling, evaluation, and feedback. Candidates can register for interview slots, while interviewers are provided with structured feedback forms post-interview. Admins can monitor all sessions via a dashboard, check interviewer feedback, and generate reports. The frontend, developed using React and Tailwind, provides role-specific UIs for candidates, interviewers, and admins. The backend uses Node.js, Express, and MongoDB for robust data handling. Features include email notifications, candidate status tracking, multi-round interview support, and interviewer analytics. This system was used in mock interview drives at a college tech club and proved effective in organizing the process end-to-end.",
    "tags": ["React", "Node.js", "MongoDB", "Express", "Tailwind"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988892/interview-panel_1_pdpbws.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Mar 2024",
    "endDate": "Apr 2024"
  },
  {
    "id": 13,
    "title": "IT Services Website",
    "description": "Company portfolio site with animations and service showcase.",
    "longDescription": "The IT Services Website is a modern business portfolio for an IT consultancy agency, built using React and GSAP for animations. It features sections for services (web development, app development, cloud solutions), testimonials, project showcases, pricing plans, and a contact form. The layout emphasizes clarity and responsiveness, tailored for startups and B2B companies. Glassmorphism and floating cards create a futuristic look, while Framer Motion adds interactive elements on scroll and hover. The site is deployed with optimized SEO and is responsive across devices. Built to serve as a digital business card, it also includes a custom CMS to manage content dynamically. The design conveys trust, innovation, and professionalism—making it ideal for client acquisition.",
    "tags": ["React", "Tailwind CSS", "GSAP", "Framer Motion", "SEO"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988892/it-services_1_a6dxrn.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "May 2024",
    "endDate": "June 2024"
  },
  {
    "id": 14,
    "title": "JARVIS Web Assistant",
    "description": "Voice-command based assistant with task automation and chatbot UI.",
    "longDescription": "The JARVIS Web Assistant is a voice-enabled digital assistant accessible via any browser. Built using JavaScript’s Web Speech API and React, JARVIS can respond to commands like setting reminders, fetching weather, answering general queries, and even opening web apps. The assistant features a visually interactive chatbot interface with animated expressions and sound cues. Users can speak or type commands. Modular Node.js scripts handle backend automation tasks such as sending emails or setting to-do reminders. Future integrations include smart device control and OpenAI GPT-based conversations. The UI mimics a sci-fi assistant with animated UI components and a dark neon theme. The project serves as a base for building smart home or productivity tools.",
    "tags": ["React", "JavaScript", "Web Speech API", "Node.js", "AI Assistant"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988893/jarvis_1_kxw7kj.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "June 2024",
    "endDate": "July 2024"
  },
  {
    "id": 15,
    "title": "Learning Assistant AI",
    "description": "MERN app that fetches topic data and creates learning material.",
    "longDescription": "The Learning Assistant AI is a self-study tool that fetches information about a topic from trusted web sources and generates a comprehensive learning package. This includes summaries, bullet points, Q&A flashcards, and flowcharts using libraries like mermaid.js. Built without any OpenAI API, it uses web scraping (puppeteer), NLP with natural.js, and visualization libraries to process and present content effectively. Users enter a topic and receive structured data in a UI optimized for learners, with pagination, TOC, and bookmarking. Designed using React with Tailwind, and powered by Express, it aims to democratize learning by generating custom, offline-accessible content. It’s ideal for students or curious minds learning new subjects without relying on commercial APIs.",
    "tags": ["React", "Node.js", "MERN", "NLP", "Web Scraping", "Mermaid.js"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988894/learning-ai_1_hwvoca.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "July 2024",
    "endDate": "Aug 2024"
  },
  {
    "id": 16,
    "title": "SkillUp Study Platform",
    "description": "A platform providing study notes categorized by domain with an elegant UI.",
    "longDescription": "SkillUp is a modern educational platform that offers curated study materials across various domains like Web Development, DSA, ML, and more. Built using Vite + React, it features a markdown-powered content system with dynamic routing for each subject. The home page showcases user info and navigation cards to different categories. Each note page includes a table of contents, subtopic pagination, and a sidebar with search. The layout mimics documentation-style platforms like W3Schools but with a sleek, animated interface using Tailwind and Framer Motion. Designed to host self-written notes in `.md` format, SkillUp aims to be an all-in-one personal knowledge hub. It's optimized for both desktop and mobile, and is perfect for learners building structured roadmaps.",
    "tags": ["React", "Vite", "Tailwind", "Markdown", "Framer Motion"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988895/skillup_1_qihzkw.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Aug 2024",
    "endDate": "Sept 2024"
  },
  {
    "id": 17,
    "title": "Modern Notes App (MERN)",
    "description": "Digital notebook with folder structure, version control, and rich editor.",
    "longDescription": "This Notes App is a full-stack productivity platform designed for developers, writers, and students. It features a file-manager-like folder structure with customizable notebooks and notes. Notes support markdown, code snippets with syntax highlighting, LaTeX equations, and mermaid.js diagrams. The rich text editor supports voice-to-text input, autosave, tagging, version history, and collaborative editing. A 'Public Notes' section allows users to share resources, while private folders are secured with user-based access. Built using MERN (MongoDB, Express, React, Node.js), it also supports offline syncing and dark/light themes. It mimics GitHub in design philosophy—simple, fast, coder-friendly, and powerful. Aimed to replace both Notion and Google Docs for dev-focused workflows.",
    "tags": ["MERN", "Rich Editor", "Markdown", "Collaboration", "Version Control"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988895/notes-app_1_vkjfsb.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Sept 2024",
    "endDate": "Oct 2024"
  },
  {
    "id": 18,
    "title": "Real-time Translation Earbuds",
    "description": "Concept UI and backend logic for earbuds that translate speech live.",
    "longDescription": "This project envisions a smart wearable device—translation earbuds that can interpret foreign languages in real-time. The prototype includes a React Native-based mobile UI and a Node.js backend that uses open-source speech recognition and translation libraries. Users speak into the mic, and the translated output is played back in their selected language. Features include multi-language support, offline mode (with limited vocab), latency optimization, and sentence-by-sentence playback. Though hardware integration was mocked, the logic was successfully tested on Android devices. The UI simulates audio waveforms, subtitle-style transcription, and control toggles. Ideal for travel, international events, or language learning. The goal is to eventually integrate this into wearable devices.",
    "tags": ["React Native", "Node.js", "Speech Recognition", "Translation", "IoT"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988896/translation_earbuds_1_xm4zm4.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Oct 2024",
    "endDate": "Nov 2024"
  },
  {
    "id": 19,
    "title": "Payment Gateway for Events",
    "description": "Integrated payment options for event registrations with confirmation system.",
    "longDescription": "This project adds a secure and user-friendly payment system to an event registration portal. Users can browse events, register, and complete payment using integrated Razorpay and Stripe gateways. Upon payment success, confirmation emails with tickets and unique QR codes are sent using NodeMailer. The backend verifies payment signatures and records transaction logs in MongoDB. The UI is styled with React and Tailwind for a seamless experience. Admins can view payment statuses, download participant data, and issue refunds. Designed for college fests and hackathons, it supports multiple ticket tiers, coupon codes, and early-bird logic. The payment flow is mobile-optimized and follows standard fintech UI practices for trust and clarity.",
    "tags": ["React", "Node.js", "Stripe", "Razorpay", "Event System"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988896/event-payment_1_opvsfs.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Nov 2024",
    "endDate": "Dec 2024"
  },
  {
    "id": 20,
    "title": "Hackathon Organizer Dashboard",
    "description": "Admin dashboard to manage hackathon submissions, teams, and schedule.",
    "longDescription": "The Hackathon Organizer Dashboard is an all-in-one admin portal to oversee large hackathon events. Built using Next.js and Tailwind, the dashboard enables event managers to review team submissions, assign mentors, update schedules, and monitor judging progress. Teams are auto-grouped based on domain, and mentors can be assigned accordingly. The system also supports document uploads, live project links, and a chat window for mentor support. Admins can export participant data, send event-wide updates, and manage announcements. It was tested during a 36-hour hackathon with over 250 participants. Security measures include role-based access, rate limiting, and secure file uploads. It streamlines hackathon logistics, allowing organizers to focus on creativity, not chaos.",
    "tags": ["Next.js", "Tailwind", "Admin Dashboard", "Hackathon Management", "MongoDB"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988897/hackathon-admin_1_dmn4lw.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Dec 2024",
    "endDate": "Jan 2025"
  },
  {
    "id": 21,
    "title": "Skillify",
    "description": "Hackathon-winning app for skill development with Gen AI agents and roadmaps.",
    "longDescription": "Skillify is an AI-powered skill development platform that won 1st prize in a national-level hackathon. It features 5+ AI mentors that guide users through personalized learning roadmaps in tech domains like Web Dev, ML, Cybersecurity, and more. Built with the MERN stack, the app also integrates an LLM server to generate real-time content, recommend resources, and summarize study material. A central dashboard shows roadmap progress, completed modules, and AI feedback. Each user gets a unique path based on their profile, test results, and interest areas. Features include AI chat assistant, document summarization, content generation, and a resource explorer. Secure login with JWT, email OTP, and 2FA ensures account safety. Designed to make self-learning faster, smarter, and tailored.",
    "tags": ["MERN", "LLM", "Tailwind", "AI", "Roadmap Generator", "JWT", "2FA"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988921/skillify_1_q91pxm.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Jan 2025",
    "endDate": "Feb 2025"
  },
  {
    "id": 22,
    "title": "TheAviator Master",
    "description": "3D airplane flying game built with Three.js and Vite.",
    "longDescription": "TheAviator Master is a browser-based 3D game where players pilot a stylized plane across dynamic environments to collect points and dodge obstacles. Built using Three.js and Vite, the game features smooth animations, real-time lighting, skyboxes, and responsive controls. Players unlock 50+ levels, with each introducing new difficulty elements such as speed boosts, wind resistance, and bonus zones. Designed with a minimalistic yet engaging UI, the game includes a scoring system, sound effects, pause/resume functionality, and performance optimization for low-end devices. It was built as a fun side project to explore 3D graphics in JavaScript and game physics simulation.",
    "tags": ["Three.js", "Vite", "JavaScript", "WebGL", "3D Game"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988881/airoplane-three.js-game_1_n1egmo.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Feb 2025",
    "endDate": "Feb 2025"
  },
  {
    "id": 23,
    "title": "Todo MERN App",
    "description": "Advanced to-do list with CRUD, user login, and productivity stats.",
    "longDescription": "The Todo MERN App is a full-stack productivity tool for tracking personal and professional tasks. Users can create an account, manage multiple task lists, and mark tasks as complete or pending. It features CRUD functionality, JWT-based authentication, and MongoDB for persistent storage. The UI is built with React and Tailwind for clean and responsive design. Each user gets a productivity dashboard showing daily task completion stats and upcoming deadlines. Notifications and reminders are planned for future updates. The app handles 100+ tasks efficiently and includes filtering, tagging, and color-coded priorities to streamline task management.",
    "tags": ["MERN", "React", "Tailwind", "JWT", "Todo App"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988912/mern-todo_2_h7n2tc.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Feb 2025",
    "endDate": "Feb 2025"
  },
  {
    "id": 24,
    "title": "Web MineCraft",
    "description": "Web-based Minecraft replica using 3D blocks and voxel terrain logic.",
    "longDescription": "Web MineCraft is a browser game that recreates the Minecraft-style building experience using Three.js and voxel rendering logic. Players can place or remove blocks in a 3D world, explore terrain, and create custom environments. The game includes block types (grass, stone, water, wood), day-night cycles, and WASD controls for movement. Built with Vite and Three.js, the game engine supports real-time rendering and optimized performance even with 1000+ blocks placed. Designed for fun and educational purposes, it demonstrates physics, raycasting, and camera logic in 3D games. The game interface is smooth and suitable for both desktop and mobile platforms.",
    "tags": ["Three.js", "JavaScript", "Voxel Engine", "Vite", "Game Dev"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988928/web-mine-craft_2_vvjio2.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Feb 2025",
    "endDate": "Feb 2025"
  },
  {
    "id": 25,
    "title": "GEN AI Roadmap Maker",
    "description": "AI-powered skill roadmap generator using React Flow and LLMs.",
    "longDescription": "The GEN AI Roadmap Maker is an intelligent tool that helps users generate career or learning roadmaps in seconds. Users input a goal like 'Full Stack Developer' or 'Data Scientist,' and the tool fetches and arranges steps using AI prompts, visualized via React Flow. Built using the MERN stack and LLM integration, it shows skills to learn, resources to use, and their logical sequence. The UI supports drag-and-drop nodes, zoom controls, and download options. JWT, OTP, and 2FA secure access. This tool eliminates guesswork from career planning and gives users a visual roadmap they can act on. Integrated with Gemini or other LLMs without relying on OpenAI APIs.",
    "tags": ["MERN", "React Flow", "LLM", "Tailwind", "JWT", "AI Tools"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988878/ai-road-map_1_tgwqeb.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Feb 2025",
    "endDate": "Mar 2025"
  },
  {
    "id": 26,
    "title": "3D JS Portfolio",
    "description": "Animated 3D developer portfolio with Three.js, GSAP, and smooth scroll effects.",
    "longDescription": "The 3D JS Portfolio is a visually captivating developer portfolio website built with Three.js and GSAP animations. It includes interactive 3D objects, parallax effects, and scroll-triggered transitions to showcase projects, skills, and contact information in an immersive format. The landing section features a rotating 3D logo, while project cards animate into view as users scroll. Designed with a responsive layout, the site adapts beautifully to both desktop and mobile devices. Code splitting and lazy loading ensure optimal performance. This portfolio serves as a creative showcase of technical skills and is often used in resumes and developer demos.",
    "tags": ["Three.js", "GSAP", "JavaScript", "3D Web", "Portfolio"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988931/3djs-portfolio_2_syfpig.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Mar 2025",
    "endDate": "Mar 2025"
  },
  {
    "id": 27,
    "title": "React Netflix Clone",
    "description": "A full-featured Netflix UI clone with API integration and video previews.",
    "longDescription": "The React Netflix Clone replicates the popular streaming platform's interface with React and TMDB API. Users can browse trending movies and shows, watch trailers via embedded YouTube previews, and explore categories like Top Rated, Action, Comedy, etc. The layout mimics Netflix’s carousel design with hover animations and dynamic banners. Firebase authentication allows user login and watchlist saving. Built with React, Firebase, TMDB API, and styled with Tailwind CSS, this project demonstrates API integration, user state management, and responsive design. Ideal for learning frontend-backend communication and building real-world UI clones.",
    "tags": ["React", "TMDB API", "Firebase", "Tailwind", "Netflix Clone"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988908/netflix-clone_1_ushdv4.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Mar 2025",
    "endDate": "Mar 2025"
  },
  {
    "id": 28,
    "title": "OpenAI Projects Collection",
    "description": "A suite of 20+ mini apps made with OpenAI APIs including summarizer, translator, chat, and more.",
    "longDescription": "This is a mega repository of 20+ small-scale OpenAI-powered applications built using React, Node.js, and OpenAI API. The suite includes tools like text summarizer, paraphraser, Q&A bot, translator, code debugger, writing assistant, image captioner, and more. Each mini app has a clean UI and is optimized for specific tasks with adjustable temperature, max tokens, and prompt templates. JWT-based login ensures secure access. This collection showcases how LLMs can be modularized and integrated into various workflows. It's also a playground to experiment with AI creativity, productivity, and development support in real-time.",
    "tags": ["React", "Node.js", "OpenAI", "Tailwind", "Mini Apps"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988902/openai-20-mini-tools_1_c9clbx.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Apr 2025",
    "endDate": "Apr 2025"
  },
  {
    "id": 29,
    "title": "React Admin Panel",
    "description": "Customizable admin dashboard with charts, user management, and analytics.",
    "longDescription": "The React Admin Panel is a fully responsive dashboard template featuring user management, order tracking, and analytics. Built with React, Chart.js, and Tailwind CSS, it includes data visualizations like bar charts, pie charts, and line graphs to help admins monitor KPIs. Modular components such as sidebar navigation, tables, and forms are included. JWT authentication restricts access to authorized users. It supports role-based permissions and live theme switching (dark/light mode). Ideal for e-commerce, CMS, or SaaS admin setups, this panel is built to be scalable, maintainable, and fast.",
    "tags": ["React", "Chart.js", "Tailwind", "Admin Dashboard", "JWT"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988893/react-admin-panel_1_l6x4ji.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Apr 2025",
    "endDate": "Apr 2025"
  },
  {
    "id": 30,
    "title": "Portfolio Builder SaaS",
    "description": "A SaaS platform to build custom dev portfolios with drag-drop blocks and hosting.",
    "longDescription": "Portfolio Builder SaaS is a platform where developers can create and host their personal portfolios without coding. Users sign up, select a template, drag and drop sections like Projects, Skills, Blogs, and Contact, then publish with a custom domain. Built using the MERN stack, Tailwind CSS, and React Hook Form, it also offers PDF export and SEO optimization. The backend manages multiple user sites with authentication, cloud deployment, and content autosave. Stripe integration handles premium templates and hosting tiers. Aimed at freelancers, students, and tech professionals who need a quick and clean online presence.",
    "tags": ["MERN", "SaaS", "Stripe", "React", "Tailwind", "Portfolio Builder"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988899/portfolio-builder-saas_1_gjtynd.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "Apr 2025",
    "endDate": "May 2025"
  },
  {
    "id": 31,
    "title": "Real-Time Chat App",
    "description": "End-to-end encrypted real-time chat app using Socket.io and MongoDB.",
    "longDescription": "This Real-Time Chat App allows users to communicate instantly in private or group chats. Built using Node.js, Express, MongoDB, React, and Socket.io, the app supports real-time messaging, typing indicators, emojis, and file sharing. Users can register, create chat rooms, and invite others securely with JWT-based auth and optional 2FA. Messages are encrypted and stored in MongoDB. The frontend uses Tailwind for a sleek, modern chat UI with dark mode and mobile responsiveness. A notification system and online user indicators enhance the UX. Ideal for real-time communication systems and a demo of full-duplex web sockets.",
    "tags": ["MERN", "Socket.io", "Chat App", "JWT", "MongoDB", "Encryption"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988889/socket-chat-app_1_cqszlz.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "May 2025",
    "endDate": "May 2025"
  },
  {
    "id": 32,
    "title": "Animated Modern UI Cards",
    "description": "Collection of modern animated cards with Glassmorphism and hover effects.",
    "longDescription": "Animated Modern UI Cards is a design project showcasing aesthetic card components using CSS animations, Glassmorphism, and Tailwind CSS. The cards are interactive with hover flip, scale, glow, and depth effects. They're built to be reused in portfolios, blogs, dashboards, and product showcases. The component library includes profile cards, project cards, pricing cards, and article previews. Each card is optimized for performance and accessibility. The responsive grid layout adapts to screen sizes, and dark mode is fully supported. The project emphasizes creativity in frontend design and serves as a UI/UX inspiration set for developers.",
    "tags": ["Tailwind", "Glassmorphism", "UI Cards", "CSS Animation", "Frontend"],
    "image": "https://res.cloudinary.com/dceysplwm/image/upload/v1746988874/cards-animated_1_mjlzpi.png",
    "githubUrl": "/collab",
    "liveUrl": "#",
    "startDate": "May 2025",
    "endDate": "May 2025"
  }

];
