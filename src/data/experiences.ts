export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string[];
  type: 'full-time' | 'internship' | 'freelance' | 'full-time Internship';
  details: string;
  certificateImage?: string;
  skills?: string[];
}

export const experiences: Experience[] = [
  {
    id: 'exp0',
    title: 'Software Engineer',
    company: 'Bug0 (Hashnode)',
    period: 'Nov 2025 - Present',
    description: [
      'Joined Bug0 full-time as a Software Engineer, working on solving real engineering challenges with innovative solutions',
      'Building meaningful products with focus on creativity and innovation',
      'Collaborating with passionate team members including Fazle Rahman and Sandeep Panda',
      'Contributing to cutting-edge technology solutions and pushing boundaries in software development'
    ],
    type: 'full-time',
    details: 'Excited to be part of Bug0 and Hashnode teams, working on innovative engineering solutions and building impactful products. Focusing on learning, collaboration, and contributing to the company\'s growth journey with modern technologies and creative problem-solving.',
    skills: ['Software Engineering', 'Full Stack Development', 'Innovation', 'Problem Solving', 'Team Collaboration', 'Product Development'],
    certificateImage: ''
  },
  {
    id: 'exp1',
    title: 'Full Stack Software Developer & DevOps Engineer',
    company: 'WyseTree – Business Process Transformation Services, Pune',
    period: 'Aug 2025 - Oct 2025',
    description: [
      'Designed and implemented scalable full-stack systems to optimize business processes across departments',
      'Automated Marketing and Lead operations using an AI agent, handling over 100,000 leads for outreach and follow-ups',
      'Developed an end-to-end medical lab platform, providing price-sorted recommendations and seamless user experience',
      'Deployed applications using Nginx, Docker, Portainer, and CI/CD pipelines, achieving 99% uptime'
    ],
    type: 'full-time Internship',
    details: 'Led development of enterprise-level solutions with focus on automation and scalability',
    certificateImage: '/images/experience1-cert.jpg'
  },
  {
    id: 'exp2',
    title: 'Web Developer Intern',
    company: 'Walnut Solutions, Dhule',
    period: 'Jan 2025 - June 2025',
    description: [
      'Developed and deployed responsive web applications using Next.js, improving SEO and user engagement by 30%',
      'Integrated RESTful APIs and interactive UI components to reduce page load times by 30%',
      'Optimized websites for SEO and accessibility, boosting organic traffic and search rankings',
      'Delivered high-quality web solutions while collaborating with remote teams; recognized for initiative and efficiency'
    ],
    type: 'internship',
    details: 'Focused on front-end development and performance optimization',
    certificateImage: '/images/internship-cert.jpg'
  },
  {
    id: 'exp3',
    title: 'Smart Billing and Inventory System Developer',
    company: 'Hariom Cement Agency Nashik',
    period: 'Apr 2025 - Jun 2025',
    description: [
      'Built a smart billing and inventory system for construction businesses with GST-compliant invoicing and multi-store support',
      'Achieved 70% reduction in manual operations through integrated analytics',
      'Implemented comprehensive billing solutions with automated GST calculations and multi-location inventory tracking'
    ],
    type: 'freelance',
    details: 'Developed a comprehensive business management system that streamlined operations and improved efficiency for construction businesses. The system included GST-compliant invoicing, multi-store inventory management, and integrated analytics dashboard.',
    skills: ['MERN Stack', 'Back-End Web Development', 'GST Integration', 'Inventory Management', 'Analytics', 'Business Process Automation']
  },
  {
    id: 'exp4',
    title: 'MERN Stack Developer',
    company: 'Isha Girl PG',
    period: 'Feb 2024 - Apr 2024',
    description: [
      'Created a MERN-based platform to connect girls with PG accommodations, resulting in a 40% increase in client sign-ups',
      'Designed an SEO-optimized website for premium agro-products, leading to a 30% boost in product inquiries',
      'Developed user-friendly interfaces with responsive design and seamless user experience'
    ],
    type: 'freelance',
    details: 'Built a comprehensive platform connecting accommodation seekers with PG options, featuring advanced search filters, user authentication, and booking management. Also developed an e-commerce website for agricultural products with SEO optimization and modern UI/UX design.',
    skills: ['MERN Stack', 'React.js', 'Node.js', 'MongoDB', 'Express.js', 'SEO Optimization', 'Responsive Design']
  },
  {
    id: 'exp5',
    title: 'E-commerce Platform Developer',
    company: 'Pratham Agro',
    period: 'Jun 2024 - Jun 2024',
    description: [
      'Built an e-commerce website for Pratham Agro to help farmers showcase and sell machinery and hardware products online',
      'Developed with Node.js, HTML, CSS, and JavaScript, ensuring a robust and scalable platform',
      'Used GSAP animations for smooth navigation and visually appealing product displays',
      'Implemented Web3Forms for secure inquiries, allowing potential buyers to connect directly through the website'
    ],
    type: 'freelance',
    details: 'Created a professional e-commerce platform specifically designed for the agricultural community. The website featured smooth GSAP animations, secure contact forms, and an intuitive interface tailored for farmers to showcase and sell their machinery and hardware products. The platform provided a seamless online shopping experience with modern web technologies.',
    skills: ['Node.js', 'HTML', 'CSS', 'JavaScript', 'GSAP', 'Web Development', 'E-commerce', 'User Interface Design', 'Front-End Development', 'Web3Forms']
  }
];