import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export const ProjectCard = ({ project, index, onClick }: ProjectCardProps) => {
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
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {project.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-3 text-sm flex-grow">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.slice(0, 3).map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs px-2 py-0.5"
              >
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                +{project.tags.length - 3}
              </Badge>
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