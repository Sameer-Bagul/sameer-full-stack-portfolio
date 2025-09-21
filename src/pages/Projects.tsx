
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ExternalLink, Github, X, Code, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

// Sample projects data 
const projectsData = [
  {
    id: 1,
    title: 'Agrotech-Pratham',
    description: 'Freelancing project for an Agrotech shop. Built with Next.js, SEO, and Tailwind CSS.',
    longDescription: 'A freelancing project for an Agrotech shop, built using Next.js, with SEO optimizations and styled using Tailwind CSS to create an efficient online presence.',
    tags: ['Next.js', 'SEO', 'Tailwind CSS'],
    image: 'https://res.cloudinary.com/dceysplwm/image/upload/v1746988916/pratham-agro_2_ynzdzf.png',
    githubUrl: '',
    liveUrl: 'https://agrotech-pratham.vercel.app/',
    startDate: '',
    endDate: '',
  },
  {
    id: 2,
    title: 'app-club-landing-page',
    description: 'Landing page for the App Club at my college, where I mentor 200+ students and assist with 50+ projects.',
    longDescription: 'A landing page designed for the App Club at my college, showcasing the club\'s projects and activities. I mentor 200+ students and assist in various projects.',
    tags: ['Landing Page', 'Next.js', 'Tailwind CSS'],
    image: 'https://res.cloudinary.com/dceysplwm/image/upload/v1746988885/app-club-landing-page_2_lfrag5.png',
    githubUrl: '',
    liveUrl: 'https://app-club-landingpage.vercel.app/',
    startDate: '',
    endDate: '',
  },
  {
    id: 3,
    title: 'best-mern-auth',
    description: 'Advanced MERN stack authentication system featuring 5+ security features: email verification (OTP), JWT-based authentication, 2FA, and password reset functionality.',
    longDescription: 'A secure authentication system built with the MERN stack, offering multiple layers of security including email OTP, JWT-based authentication, 2FA, and password reset functionality.',
    tags: ['MERN', 'Authentication', 'JWT', '2FA'],
    image: 'https://res.cloudinary.com/dceysplwm/image/upload/v1746988911/mern-authentication-system_3_bok1sh.png',
    githubUrl: 'https://github.com/Sameer-Bagul/best-mern-auth.git',
    liveUrl: '',
    startDate: '',
    endDate: '',
  },
  {
    id: 4,
    title: 'business-billing-suite',
    description: 'Freelancing project: Billing system for a cement business in Nashik (Maharashtra) with 12+ shops. Improved efficiency by 50% and saved 2 hours of work daily. Built with MERN stack, Tailwind CSS, JWT authentication, email OTP, 2FA, and password reset.',
    longDescription: 'A billing system for a cement business that improved operational efficiency by 50%. The system was built with MERN stack, featuring advanced security measures like JWT authentication, email OTP, 2FA, and password reset.',
    tags: ['MERN', 'Billing System', 'JWT', '2FA'],
    image: 'https://res.cloudinary.com/dceysplwm/image/upload/v1747075474/billing_4_qz24v5.png',
    githubUrl: '',
    liveUrl: 'https://business-billing-suite.vercel.app/',
    startDate: '',
    endDate: '',
  },
  {
    id: 5,
    title: 'dev-library',
    description: 'Personal library containing 1000+ notes on 15+ topics such as Web Development, MERN, Next.js, React, JavaScript, Python, C++, C, Data Structures & Algorithms, Gen AI, AI/ML, ML/DL, Cloud Computing, Cyber Security, Blockchain, Web 3.0, and more.',
    longDescription: 'A personal library for storing and organizing notes across 15+ topics including Web Development, MERN, AI/ML, and more. The platform helps to efficiently access and learn across a wide range of topics.',
    tags: ['Library', 'Notes', 'Web Development', 'MERN', 'AI/ML'],
    image: 'https://res.cloudinary.com/dceysplwm/image/upload/v1746988889/dev-lib_1_koknyj.png',
    githubUrl: '',
    liveUrl: 'https://developers-library.vercel.app/',
    startDate: '',
    endDate: '',
  },
  {
    id: 6,
    title: 'event-management-application',
    description: 'Event management app for my college, allowing 100+ event creations and management with payment integration. Built with Next.js, Tailwind CSS, JWT authentication, email OTP, 2FA, password reset, MongoDB, and Razorpay.',
    longDescription: 'An event management platform built to streamline event creation, management, and payments. The platform supports JWT authentication, payment via Razorpay, and a user-friendly UI.',
    tags: ['Next.js', 'Event Management', 'JWT', 'Razorpay', 'MongoDB'],
    image: 'https://res.cloudinary.com/dceysplwm/image/upload/v1746988892/evento_1_tc9m73.png',
    githubUrl: '',
    liveUrl: 'https://appclub-evento.vercel.app/',
    startDate: '',
    endDate: '',
  },
  {
    id: 7,
    title: 'gita-react-app-2-languages',
    description: 'Gita app to read the Bhagavad Gita in 2 languages (Hindi & English). Built with React, Tailwind CSS, JWT authentication, email OTP, 2FA, and password reset.',
    longDescription: 'A React-based app for reading the Bhagavad Gita in both Hindi and English. It includes JWT authentication, email OTP, and other security features for a seamless user experience.',
    tags: ['React', 'Gita', 'JWT', 'Authentication'],
    image: 'https://res.cloudinary.com/dceysplwm/image/upload/v1747075622/gfa-v1_2_ypfgfq.png',
    githubUrl: '',
    liveUrl: 'https://bhagwat-geeta-for-all.vercel.app/',
    startDate: '',
    endDate: '',
  },
  {
    id: 8,
    title: 'krishnvani',
    description: 'Gita app to read the Bhagavad Gita in Hindi and English, with daily email delivery of 1 shloka and meaning. Built with React, Tailwind CSS, JWT authentication, email OTP, 2FA, and password reset.',
    longDescription: 'A unique app for reading the Bhagavad Gita with the convenience of daily email delivery for a verse and its meaning. Built using React and equipped with various security measures.',
    tags: ['React', 'Gita', 'Daily Shloka', 'JWT'],
    image: 'https://res.cloudinary.com/dceysplwm/image/upload/v1746988878/advanced-geeta-for-all_4_zdtstb.png',
    githubUrl: '',
    liveUrl: 'https://krishnvani.vercel.app/',
    startDate: '',
    endDate: '',
  },
  {
    id: 9,
    title: 'Hire Me',
    description: 'National Hackathon Runner Up (Smart India Hackathon 2024, Top 2). MERN stack web app for hiring and upskilling, featuring Gen AI-powered study content, 4+ resume/cover letter/job description/interview tools, Tailwind CSS, and advanced authentication.',
    longDescription: 'A MERN stack web app for hiring and upskilling, featuring AI-powered tools for resume building, job descriptions, and mock interviews. It integrates advanced authentication and a rich UI.',
    tags: ['MERN', 'AI', 'Hiring', 'Resume Builder'],
    image: 'https://res.cloudinary.com/dceysplwm/image/upload/v1746988895/hire-me_2_b6mmuv.png',
    githubUrl: 'https://github.com/Sameer-Bagul/HireMe-Modules',
    liveUrl: '',
    startDate: '',
    endDate: '',
  },
  {
    id: 10,
    title: 'isha Girl PG',
    description: 'Freelancing project: Home stay website for a property in Dhule (Maharashtra). Built with Next.js, Tailwind CSS, JWT authentication, email OTP, 2FA, password reset, and MongoDB.',
    longDescription: 'A home stay website for a property in Dhule, Maharashtra, featuring JWT authentication, email OTP, and other advanced security measures. Built using Next.js and styled with Tailwind CSS.',
    tags: ['Next.js', 'Freelancing', 'JWT', 'MongoDB'],
    image: 'https://res.cloudinary.com/dceysplwm/image/upload/v1746988899/isha-pg_2_whs7u2.png',
    githubUrl: '',
    liveUrl: 'https://isha-girls-pg.vercel.app/',
    startDate: '',
    endDate: '',
  },
  {
    id: 11,
    title: "Anonymous-mern-chat-app",
    description: "Anonymous chat app for college students to connect and make new friends. 1000+ messages exchanged.",
    longDescription: "A chat application allowing college students to communicate anonymously, encouraging socializing and making new connections. It includes essential features like real-time messaging and authentication.",
    tags: ["MERN", "Tailwind CSS", "JWT authentication", "Chat app", "College app"],
    image: "https://res.cloudinary.com/dceysplwm/image/upload/v1746988882/Anonymous-mern-chat-app_2_bsk1sc.png",
    githubUrl: "https://github.com/Sameer-Bagul/mern-chat-app.git",
    liveUrl: "https://anonymous-chatters.onrender.com/",
    startDate: "2024-03-01",
    endDate: "2024-04-01"
  },
  {
    id: 12,
    title: "Ninja-block-Slicer-Game",
    description: "Ninja block slicer game where players slice 100+ blocks to earn points.",
    longDescription: "A fun and engaging game where players need to slice blocks to gain points. It keeps track of the player's score and features a clean UI built with the MERN stack.",
    tags: ["MERN", "Tailwind CSS", "Game"],
    image: "https://res.cloudinary.com/dceysplwm/image/upload/v1746988913/ninja-block-slice_1_nsc12v.png",
    githubUrl: "https://github.com/Sameer-Bagul/Ninja-block-Slicer-Game.git",
    liveUrl: "https://sameer-bagul.github.io/Ninja-block-Slicer-Game/",
    startDate: "2024-04-10",
    endDate: "2024-04-20"
  },
  {
    id: 13,
    title: "password_manager",
    description: "Password manager app for storing 100+ passwords and notes.",
    longDescription: "A secure and encrypted password manager where users can store and retrieve their passwords and related notes. It features robust authentication and data protection mechanisms.",
    tags: ["MERN", "Tailwind CSS", "JWT authentication", "Password manager"],
    image: "https://res.cloudinary.com/dceysplwm/image/upload/v1747075804/Screenshot_2025-05-13_001949_bbpjvv.png",
    githubUrl: "https://github.com/Sameer-Bagul/password_manager.git",
    liveUrl: "https://pes-hacks.vercel.app/",
    startDate: "2024-05-01",
    endDate: "2024-05-10"
  },
  {
    id: 14,
    title: "pes_mcoe-hack",
    description: "Hackathon launching website for my college hackathon (500+ participants).",
    longDescription: "A website designed for the PES MCOE college hackathon to facilitate event registration, participant management, and event updates for over 500 participants.",
    tags: ["Web Development", "Hackathon", "Event Management", "MERN", "Tailwind CSS"],
    image: "https://res.cloudinary.com/dceysplwm/image/upload/v1747075981/pes-hack_1_pjjzrv.png",
    githubUrl: "https://github.com/Sameer-Bagul/pes_mcoe-hack.git",
    liveUrl: "https://pes-hacks.vercel.app/",
    startDate: "2024-01-01",
    endDate: "2024-02-01"
  },
  {
    id: 15,
    title: "quotehub",
    description: "Quote hub app for reading and sharing 1000+ quotes with friends.",
    longDescription: "A platform for reading and sharing a large collection of quotes. The app allows users to browse quotes by category and share them with friends through social media.",
    tags: ["MERN", "Tailwind CSS", "JWT authentication", "Quotes app"],
    image: "https://res.cloudinary.com/dceysplwm/image/upload/v1746988918/quote-hub_2_l8f0oo.png",
    githubUrl: "https://github.com/Sameer-Bagul/quotehub.git",
    liveUrl: "",
    startDate: "2024-03-01",
    endDate: "2024-04-01"
  },
  {
    id: 16,
    title: "shayari-react-app",
    description: "Shayari app for reading and sharing 500+ shayari with friends.",
    longDescription: "An app for reading and sharing a collection of 500+ shayari, allowing users to explore and share poetic verses with others. Built with a sleek UI for a delightful experience.",
    tags: ["MERN", "Tailwind CSS", "Shayari", "Poetry app"],
    image: "https://res.cloudinary.com/dceysplwm/image/upload/v1746988918/shayaripage_1_axgw1t.png",
    githubUrl: "https://github.com/Sameer-Bagul/shayari-react-app.git",
    liveUrl: "",
    startDate: "2024-04-01",
    endDate: "2024-05-01"
  },
  {
    id: 17,
    title: "react-admin-dashboard",
    description: "Admin dashboard UI template built with React and Tailwind CSS.",
    longDescription: "A fully functional admin dashboard UI template featuring various charts and data management pages. This template helps in managing and visualizing important data for web apps.",
    tags: ["React", "Tailwind CSS", "Admin dashboard", "UI template"],
    image: "https://res.cloudinary.com/dceysplwm/image/upload/v1746988876/admin-panel_4_wuvden.png",
    githubUrl: "https://github.com/Sameer-Bagul/react-admin-dashboard.git",
    liveUrl: "https://react-admin-dashboard-nine-eta.vercel.app/",
    startDate: "2024-02-01",
    endDate: "2024-02-10"
  },
  {
    id: 18,
    title: "react-local-storage-todo-list-app",
    description: "Todo list app with add, edit, delete, and mark-as-done features.",
    longDescription: "A simple yet efficient todo list app built with React and Tailwind CSS, where tasks are stored in the local storage. It allows users to add, edit, delete, and mark tasks as done.",
    tags: ["React", "Tailwind CSS", "Todo list", "Local storage"],
    image: "https://res.cloudinary.com/dceysplwm/image/upload/v1747076125/local-todo_2_v5t52b.png",
    githubUrl: "https://github.com/Sameer-Bagul/react-local-storage-todo-list-app.git",
    liveUrl: "",
    startDate: "2024-05-05",
    endDate: "2024-05-10"
  },
  {
    id: 19,
    title: "resume-builder",
    description: "Resume builder app for creating and downloading 100+ resumes.",
    longDescription: "A resume builder app that helps users create professional resumes easily. It allows customization of resume formats and downloading the generated resumes in PDF format.",
    tags: ["MERN", "Tailwind CSS", "JWT authentication", "Resume builder"],
    image: "https://res.cloudinary.com/dceysplwm/image/upload/v1746988918/resume-builder_2_twp32a.png",
    githubUrl: "https://github.com/Sameer-Bagul/resume-builder.git",
    liveUrl: "https://resume-builder-xi-lake.vercel.app/",
    startDate: "2024-03-15",
    endDate: "2024-03-25"
  },
  {
    id: 20,
    title: "sam-link",
    description: "Link shortener built with Next.js, Tailwind CSS, JWT authentication, email OTP, 2FA, password reset, and MongoDB.",
    longDescription: "A link shortener application allowing users to shorten, track, and manage URLs. It includes security features such as email OTP, 2FA, and password reset for authentication.",
    tags: ["Next.js", "Tailwind CSS", "JWT authentication", "Link shortener"],
    image: "https://res.cloudinary.com/dceysplwm/image/upload/v1746988909/link-shortner_2_muiwzy.png",
    githubUrl: "https://github.com/Sameer-Bagul/sam-link.git",
    liveUrl: "",
    startDate: "2024-04-01",
    endDate: "2024-04-15"
  },
  {
    id: 21,
    title: "Skillify - National Hackathon 1st Prize Winner (Top 1)",
    description: "Skill development app with 5+ AI agents as teachers, roadmap and study material generation, and a complete learning environment.",
    longDescription: "Skill development app with 5+ AI agents as teachers, roadmap and study material generation, and a complete learning environment. Built with MERN stack, Tailwind CSS, JWT authentication, email OTP, 2FA, password reset, MongoDB, and LLM server (Python/Node.js).",
    tags: ["MERN", "Tailwind CSS", "AI", "JWT Authentication", "LLM", "MongoDB"],
    image: "https://res.cloudinary.com/dceysplwm/image/upload/v1746988921/skillify_1_q91pxm.png",
    githubUrl: "https://github.com/Sameer-Bagul/skillify.git",
    liveUrl: "",
    startDate: "",
    endDate: ""
  },
  {
    id: 23,
    title: "TheAviator-master",
    description: "A Three.js game where players fly a plane and earn points.",
    longDescription: "A Three.js game where players fly a plane and earn points. Built with Vite, Three.js, and Tailwind CSS. 50+ levels.",
    tags: ["Three.js", "Vite", "Tailwind CSS", "Game"],
    image: "https://res.cloudinary.com/dceysplwm/image/upload/v1746988881/airoplane-three.js-game_1_n1egmo.png",
    githubUrl: "https://github.com/Sameer-Bagul/TheAviator-master.git",
    liveUrl: "",
    startDate: "",
    endDate: ""
  },
  {
    id: 24,
    title: "Todo-MERN-App",
    description: "A todo list app with add, edit, delete, and mark-as-done features.",
    longDescription: "A todo list app with add, edit, delete, and mark-as-done features. Built with MERN stack, React, and Tailwind CSS. 100+ tasks managed.",
    tags: ["MERN", "React", "Tailwind CSS", "Todo App"],
    image: "https://res.cloudinary.com/dceysplwm/image/upload/v1746988912/mern-todo_2_h7n2tc.png",
    githubUrl: "https://github.com/Sameer-Bagul/todo-mern-app.git",
    liveUrl: "",
    startDate: "",
    endDate: ""
  },
  {
    id: 25,
    title: "Web-Mine-Craft",
    description: "A web-based Minecraft replica game, recreating the physics and mechanics of the original.",
    longDescription: "A web-based Minecraft replica game, recreating the physics and mechanics of the original. Built with Three.js and Vite. 1000+ blocks placed.",
    tags: ["Three.js", "Vite", "Game", "Minecraft"],
    image: "https://res.cloudinary.com/dceysplwm/image/upload/v1746988928/web-mine-craft_2_vvjio2.png",
    githubUrl: "https://github.com/Sameer-Bagul/web-mine-craft.git",
    liveUrl: "https://web-mine-craft.vercel.app/",
    startDate: "",
    endDate: ""
  },
  {
    id: 26,
    title: "GEN AI Roadmap Maker",
    description: "GEN AI tool for generating 10+ skill roadmaps.",
    longDescription: "GEN AI tool for generating 10+ skill roadmaps using MERN stack, React Flow, Tailwind CSS, JWT authentication, and integration with Gemini API, LLM, or other AI providers.",
    tags: ["MERN", "React Flow", "Tailwind CSS", "AI", "Roadmap", "JWT Authentication"],
    image: "https://res.cloudinary.com/dceysplwm/image/upload/v1746988878/ai-road-map_1_tgwqeb.png",
    githubUrl: "",
    liveUrl: "",
    startDate: "",
    endDate: ""
  },
  {
    id: 27,
    title: "Digital Board for Performing Electric Lab",
    description: "Digital board for performing 20+ electric lab experiments.",
    longDescription: "Digital board for performing 20+ electric lab experiments, demonstrating basic electricity and electronics concepts. Built with MERN stack, Tailwind CSS, and React Flow.",
    tags: ["MERN", "Tailwind CSS", "Electric Lab", "React Flow"],
    image: "https://res.cloudinary.com/dceysplwm/image/upload/v1746988891/e-lab_2_mbn5uu.png",
    githubUrl: "",
    liveUrl: "",
    startDate: "",
    endDate: ""
  },
  {
    id: 28,
    title: "Gen AI Database Schema Generator",
    description: "GEN AI tool for generating 10+ database schemas.",
    longDescription: "GEN AI tool for generating 10+ database schemas using MERN stack, React Flow, Tailwind CSS, JWT authentication, and integration with Gemini API, LLM, or other AI providers.",
    tags: ["MERN", "React Flow", "Tailwind CSS", "AI", "Database Schema", "JWT Authentication"],
    image: "https://res.cloudinary.com/dceysplwm/image/upload/v1746988886/database-visu_1_iehtuq.png",
    githubUrl: "",
    liveUrl: "",
    startDate: "",
    endDate: ""
  },
  // {
  //   id: 29,
  //   title: "MERN Finance Tracker",
  //   description: "Finance tracker app for monitoring 100+ expenses and income entries.",
  //   longDescription: "Finance tracker app for monitoring 100+ expenses and income entries. Built with MERN stack, Tailwind CSS, and JWT authentication.",
  //   tags: ["MERN", "Tailwind CSS", "Finance Tracker", "JWT Authentication"],
  //   image: "",
  //   githubUrl: "",
  //   liveUrl: "",
  //   startDate: "",
  //   endDate: ""
  // },
  {
    id: 30,
    title: "Drag-Drop-JS-Main",
    description: "Drag-and-drop todo list board.",
    longDescription: "Drag-and-drop todo list board. 50+ tasks managed.",
    tags: ["JavaScript", "Drag-and-Drop", "Todo App"],
    image: "https://res.cloudinary.com/dceysplwm/image/upload/v1746988890/drag-and-drop-todo-wall_a6v7zy.png",
    githubUrl: "",
    liveUrl: "",
    startDate: "",
    endDate: ""
  },
  {
    id: 31,
    title: "Fruit Ninja Game",
    description: "Fruit Ninja-style game where players slice 100+ fruits to earn points.",
    longDescription: "Fruit Ninja-style game where players slice 100+ fruits to earn points. Built with MERN stack and Tailwind CSS.",
    tags: ["MERN", "Tailwind CSS", "Fruit Ninja Game"],
    image: "https://res.cloudinary.com/dceysplwm/image/upload/v1746988913/ninja-block-slice_1_nsc12v.png",
    githubUrl: "",
    liveUrl: "",
    startDate: "",
    endDate: ""
  },
  {
    id: 32,
    title: "SAAS Landing Page Frontend",
    description: "SaaS landing page frontend template.",
    longDescription: "SaaS landing page frontend template built with React and Tailwind CSS. Features 10+ sections, 5+ components, and a user-friendly interface.",
    tags: ["React", "Tailwind CSS", "SaaS", "Landing Page"],
    image: "https://res.cloudinary.com/dceysplwm/image/upload/v1746988909/landing-page_2_a0df10.png",
    githubUrl: "",
    liveUrl: "",
    startDate: "",
    endDate: ""
  }


];
// Get all unique tags
const allTags = Array.from(new Set(projectsData.flatMap(project => project.tags)));

// Tag color mapping for consistency
const tagColors: Record<string, string> = {
  'React': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'Node.js': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'MongoDB': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
  'Express': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  'Stripe': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  'Firebase': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
  'Tailwind CSS': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
  'Redux': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  'JavaScript': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'API Integration': 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300',
  'Chart.js': 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300',
  'Leaflet': 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300',
  'Vue.js': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
  'D3.js': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  'PostgreSQL': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'Framer Motion': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
};

const Projects = () => {

  const navigate = useNavigate(); 

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter projects based on search query and selected tags
  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => project.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };


  return (
    // Main container with motion effects
      // This container wraps the entire projects page
      // It uses Framer Motion for animation effects on entry and exit
      // The className applies styles for minimum height and padding 
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen py-20"
    >
      <div className="container max-w-7xl mx-auto px-4 mt-12">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <span className="text-sm font-medium text-primary mb-2 block">MY WORK</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Projects Showcase
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Explore my collection of projects spanning web applications, design systems, and interactive experiences.
            </p>
          </motion.div>
        </div>
        
        {/* Search and filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-10 glass-panel p-6 rounded-xl backdrop-blur-sm border border-border/30 shadow-lg"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-border/50 bg-background/60 focus:bg-background/80"
              />
            </div>
            
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 bg-background/60">
                  <Filter className="h-4 w-4" />
                  Filter
                  {selectedTags.length > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {selectedTags.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[320px] p-5">
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Filter by Technology</h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <Button
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleTag(tag)}
                        className="text-xs h-7"
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-between pt-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedTags([])}
                      disabled={selectedTags.length === 0}
                      size="sm"
                    >
                      Clear Filters
                    </Button>
                    <Button
                      size="sm" 
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Active filters */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedTags.map(tag => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="cursor-pointer py-1 px-2"
                  onClick={() => toggleTag(tag)}
                >
                  {tag} <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedTags([])}
                className="text-xs h-7"
              >
                Clear all
              </Button>
            </div>
          )}
        </motion.div>
        
        {/* Results count */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-6 text-muted-foreground"
        >
          Showing {filteredProjects.length} of {projectsData.length} projects
        </motion.div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
              tagColors={tagColors}
            />
          ))}
        </div>
        
        {/* No results message */}
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-secondary/20 rounded-xl"
          >
            <h3 className="text-lg font-medium mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setSelectedTags([]);
              }}
            >
              Reset filters
            </Button>
          </motion.div>
        )}
        
        {/* Project detail dialog */}
        <AnimatePresence>
          {selectedProject && (
            <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
              <DialogContent className="max-w-4xl p-0 overflow-hidden border border-border/50 bg-background/95 backdrop-blur-md">
                <ProjectDetail project={selectedProject} tagColors={tagColors} onClose={() => setSelectedProject(null)} />
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Project Card Component
interface ProjectCardProps {
  project: typeof projectsData[0];
  index: number;
  onClick: () => void;
  tagColors: Record<string, string>;
}

const ProjectCard = ({ project, index, onClick, tagColors }: ProjectCardProps) => {

  // Card animation and hover effects
  // The card uses Framer Motion for animations and hover effects
  // The card has a gradient overlay and a button to view details
  // The card also displays the project image, title, description, and tags
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group h-full"
    >
      <div 
        onClick={onClick}
        className="h-full rounded-xl border border-border/40 bg-card overflow-hidden cursor-pointer flex flex-col transition-all duration-300 hover:shadow-xl hover:border-primary/30 relative"
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className="text-xs text-white/70 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {project.startDate} - {project.endDate}
            </span>
          </div>
          
          <div className="absolute top-3 right-3 flex gap-2">
            {project.liveUrl && (
              <motion.div 
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center shadow-md"
              >
                <ExternalLink className="h-4 w-4 text-foreground" />
              </motion.div>
            )}
            {project.githubUrl && (
              <motion.div 
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center shadow-md"
              >
                <Github className="h-4 w-4 text-foreground" />
              </motion.div>
            )}
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-3 text-sm flex-grow">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.slice(0, 3).map(tag => (
              <span 
                key={tag} 
                className={cn(
                  "px-2 py-0.5 text-xs rounded-full", 
                  tagColors[tag] || "bg-secondary text-secondary-foreground"
                )}
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-0.5 bg-secondary/30 text-secondary-foreground text-xs rounded-full">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
          
          <button className="mt-4 text-sm text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            View details <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Project Detail Component
interface ProjectDetailProps {
  project: typeof projectsData[0];
  tagColors: Record<string, string>;
  onClose: () => void;
}

const ProjectDetail = ({ project, tagColors, onClose }: ProjectDetailProps) => {

  // Project detail dialog with animations
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-h-[80vh] overflow-y-auto"
    >
      <div className="relative h-72 md:h-80">
        <img 
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        
        {/* Only one close button is rendered here */}
        {/* <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          onClick={onClose}
          className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center border border-border/50"
        >
          <X className="h-5 w-5" />
        </motion.button> */}
        
        <div className="absolute bottom-4 left-6 right-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h1>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Calendar className="h-4 w-4" />
              <span>{project.startDate} - {project.endDate}</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="p-6 space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="space-y-4"
        >
          <div>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" /> About this project
            </h2>
            <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
          </div>
          
          <div>
            <h3 className="font-medium mb-3 text-lg">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span 
                  key={tag} 
                  className={cn(
                    "px-3 py-1 rounded-full text-sm", 
                    tagColors[tag] || "bg-secondary text-secondary-foreground"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {project.githubUrl && (
            <a 
              // href={project.githubUrl}
              // onClick={() => navigate("/collab")}
              onClick={() => navigate(project.githubUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-card border border-border/50 text-foreground hover:bg-secondary/10 transition-colors"
            >
              <Github className="h-5 w-5" />
              GitHub Repository
            </a>
          )}
          
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
              Live Demo
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;
