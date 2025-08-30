import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const projects = [
  {
    id: 1,
    title: 'Hire Me',
    description: 'National Hackathon Runner Up (Smart India Hackathon 2024, Top 2). MERN stack web app for hiring and upskilling, featuring Gen AI-powered study content, 4+ resume/cover letter/job description/interview tools, Tailwind CSS, and advanced authentication.',
    tags: ['MERN', 'AI', 'Hiring', 'Resume Builder'],
    image: 'https://res.cloudinary.com/dceysplwm/image/upload/v1746988895/hire-me_2_b6mmuv.png',
    githubUrl: '',
    liveUrl: '',
    startDate: 'Jan 2024',
    endDate: 'Present',
  },
  {
    id: 2,
    title: "Skillify - National Hackathon 1st Prize Winner",
    description: "Skill development app with 5+ AI agents as teachers, roadmap and study material generation, and a complete learning environment.",
    tags: ["MERN", "Tailwind CSS", "AI", "JWT Authentication", "LLM", "MongoDB"],
    image: "https://res.cloudinary.com/dceysplwm/image/upload/v1746988921/skillify_1_q91pxm.png",
    githubUrl: "",
    liveUrl: "",
    startDate: "Nov 2023",
    endDate: "Dec 2023"
  },
  {
    id: 3,
    title: "Anonymous-mern-chat-app",
    description: "Anonymous chat app for college students to connect and make new friends. 1000+ messages exchanged.",
    tags: ["MERN", "Tailwind CSS", "JWT authentication", "Chat app", "College app"],
    image: "https://res.cloudinary.com/dceysplwm/image/upload/v1746988882/Anonymous-mern-chat-app_2_bsk1sc.png",
    githubUrl: "https://github.com/your-github/anonymous-mern-chat-app",
    liveUrl: "https://your-live-url.com",
    startDate: "Oct 2023",
    endDate: "Nov 2023"
  },
];

// Tag color mapping for consistency
const tagColors: Record<string, string> = {
  'MERN': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'AI': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  'Hiring': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'Resume Builder': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
  'Tailwind CSS': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
  'JWT Authentication': 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300',
  'LLM': 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300',
  'MongoDB': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
  'Chat app': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  'College app': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
};

export const SelectedWork = () => {
  const isMobile = useIsMobile();

  return (
    <section id="work" className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Featured Projects</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Selected Work
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Here are some of my recent projects that showcase my skills and experience
          </motion.p>
        </div>
        
        {isMobile ? (
          // Mobile Carousel View
          <div className="mt-8">
            <Carousel className="w-full">
              <CarouselContent>
                {projects.map((project, index) => (
                  <CarouselItem key={project.id}>
                    <div className="px-2">
                      <ProjectCard project={project} index={index} tagColors={tagColors} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-8">
                <CarouselPrevious className="relative h-10 w-10 translate-y-0 bg-background border-primary/20 hover:bg-primary/5" />
                <CarouselNext className="relative h-10 w-10 translate-y-0 bg-background border-primary/20 hover:bg-primary/5" />
              </div>
            </Carousel>
          </div>
        ) : (
          // Desktop Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} tagColors={tagColors} />
            ))}
          </div>
        )}
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-16 text-center"
        >
          <Link to="/projects">
            <Button
              size="lg"
              variant="outline"
              className="group border-primary/30 hover:bg-primary/5 h-12 px-8"
            >
              View All Projects
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  tagColors: Record<string, string>;
}

const ProjectCard = ({ project, index, tagColors }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{ y: -8 }}
      className="group h-full"
    >
      <div className="h-full rounded-xl border border-border/40 bg-card overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:border-primary/30">
        <div className="relative overflow-hidden aspect-video">
          <img 
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className="text-xs text-white/80 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {project.startDate} - {project.endDate}
            </span>
          </div>
          
          <div className="absolute top-3 right-3 flex gap-2">
            {project.githubUrl && (
              <motion.a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
              >
                <Github size={16} />
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
              >
                <ExternalLink size={16} />
              </motion.a>
            )}
          </div>
        </div>
        
        <div className="flex flex-col flex-grow p-6">
          <h3 className="text-xl font-semibold mb-3 line-clamp-2">{project.title}</h3>
          <p className="text-muted-foreground mb-6 line-clamp-3 text-sm">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className={cn(
                  "px-2.5 py-1 text-xs rounded-full font-medium", 
                  tagColors[tag] || "bg-secondary text-secondary-foreground"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
          
          <Link 
            to={`/projects`}
            className="mt-6 text-sm text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            View details <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
