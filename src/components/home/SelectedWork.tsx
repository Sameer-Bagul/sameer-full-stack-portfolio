
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured online store with payments, admin dashboard, and order management.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?auto=format&fit=crop&q=80&w=800&h=500',
    githubUrl: '#',
    liveUrl: '#',
    startDate: 'Jan 2022',
    endDate: 'Mar 2022',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A beautiful and intuitive task manager with team collaboration features.',
    tags: ['React', 'Firebase', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1555421689-3f034debb7a6?auto=format&fit=crop&q=80&w=800&h=500',
    githubUrl: '#',
    liveUrl: '#',
    startDate: 'Apr 2022',
    endDate: 'Jun 2022',
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Real-time weather information with interactive maps and forecasts.',
    tags: ['JavaScript', 'API Integration', 'Chart.js'],
    image: 'https://images.unsplash.com/photo-1532178910-7815d6919875?auto=format&fit=crop&q=80&w=800&h=500',
    githubUrl: '#',
    liveUrl: '#',
    startDate: 'Jul 2022',
    endDate: 'Aug 2022',
  },
];

// Tag color mapping for consistency
const tagColors: Record<string, string> = {
  'React': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'Node.js': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'MongoDB': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
  'Stripe': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  'Firebase': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
  'Tailwind CSS': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
  'JavaScript': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'API Integration': 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300',
  'Chart.js': 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300',
};

export const SelectedWork = () => {
  const isMobile = useIsMobile();

  return (
    <section id="projects" className="py-24 bg-secondary/5">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium text-primary mb-2 block">SELECTED WORK</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent development work, highlighting key projects and technical achievements.
            </p>
          </motion.div>
        </div>
        
        {isMobile ? (
          // Mobile Carousel View
          <div className="mt-8">
            <Carousel>
              <CarouselContent>
                {projects.map((project, index) => (
                  <CarouselItem key={project.id}>
                    <div className="px-2">
                      <ProjectCard project={project} index={index} tagColors={tagColors} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-6">
                <CarouselPrevious className="relative static h-8 w-8 translate-y-0" />
                <CarouselNext className="relative static h-8 w-8 translate-y-0" />
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
              className="group border-primary/30 hover:bg-primary/5"
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
      <div className="h-full rounded-xl border border-border/40 bg-card overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:border-primary/30 relative">
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
        
        <div className="flex flex-col flex-grow p-5">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag) => (
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
          </div>
          
          <Link 
            to={`/projects`}
            className="mt-4 text-sm text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            View details <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
