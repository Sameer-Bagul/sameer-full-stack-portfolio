export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string[];
  type: 'full-time' | 'internship' | 'freelance';
  details: string;
  certificateImage?: string;
}

export const experiences: Experience[] = [
  {
    id: 'exp1',
    title: 'Full Stack Software Developer & DevOps Engineer',
    company: 'WyseTree – Business Process Transformation Services, Pune',
    period: 'Aug 2025 - Present',
    description: [
      'Designed and implemented scalable full-stack systems to optimize business processes across departments',
      'Automated Marketing and Lead operations using an AI agent, handling over 100,000 leads for outreach and follow-ups',
      'Developed an end-to-end medical lab platform, providing price-sorted recommendations and seamless user experience',
      'Deployed applications using Nginx, Docker, Portainer, and CI/CD pipelines, achieving 99% uptime'
    ],
    type: 'full-time',
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
  }
];