import { motion } from 'framer-motion';
import { ExternalLink, Github, Code } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import type { Project } from '@/data/projects';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export const ProjectDetail = ({ project, onClose }: ProjectDetailProps) => {
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

        <div className="absolute bottom-4 left-6 right-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h1>
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
                <Badge
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </Badge>
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
              href={project.githubUrl}
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