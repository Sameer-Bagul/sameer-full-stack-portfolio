
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
    title: 'E-Commerce Platform',
    description: 'A full-featured online store with payments, admin dashboard, and order management.',
    longDescription: 'This e-commerce platform provides businesses with a complete solution for selling products online. It includes user authentication, product catalog, shopping cart, checkout with Stripe payments, order management, and an admin dashboard for inventory and sales analytics.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?auto=format&fit=crop&q=80&w=800&h=500',
    githubUrl: '/collab',
    liveUrl: '#',
    startDate: 'Jan 2022',
    endDate: 'Mar 2022',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A beautiful and intuitive task manager with team collaboration features.',
    longDescription: 'This task management application helps teams organize their work efficiently. It features drag-and-drop task boards, task assignments, due dates, comments, file attachments, and real-time updates for team collaboration.',
    tags: ['React', 'Firebase', 'Tailwind CSS', 'Redux'],
    image: 'https://images.unsplash.com/photo-1555421689-3f034debb7a6?auto=format&fit=crop&q=80&w=800&h=500',
    githubUrl: '/collab',
    liveUrl: '#',
    startDate: 'Apr 2022',
    endDate: 'Jun 2022',
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Real-time weather information with interactive maps and forecasts.',
    longDescription: 'This weather dashboard provides users with real-time weather data and forecasts. It features location-based weather information, interactive maps, hourly and weekly forecasts, weather alerts, and historical weather data visualizations.',
    tags: ['JavaScript', 'API Integration', 'Chart.js', 'Leaflet'],
    image: 'https://images.unsplash.com/photo-1532178910-7815d6919875?auto=format&fit=crop&q=80&w=800&h=500',
    githubUrl: '/collab',
    liveUrl: '#',
    startDate: 'Jul 2022',
    endDate: 'Aug 2022',
  },
  {
    id: 4,
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media performance tracking.',
    longDescription: 'This social media dashboard allows marketers to track and analyze performance across multiple social media platforms. It provides engagement metrics, audience demographics, content performance analytics, and automated reporting features.',
    tags: ['Vue.js', 'D3.js', 'Node.js', 'Express'],
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800&h=500',
    githubUrl: '/collab',
    liveUrl: '#',
    startDate: 'Sep 2022',
    endDate: 'Nov 2022',
  },
  {
    id: 5,
    title: 'Portfolio Website',
    description: 'A personal portfolio website showcasing projects and skills.',
    longDescription: 'This portfolio website showcases my work, skills, and experience as a developer. It features a responsive design, animated UI elements, dark/light theme, project showcase, and contact form integration.',
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&q=80&w=800&h=500',
    githubUrl: '/collab',
    liveUrl: '#',
    startDate: 'Dec 2022',
    endDate: 'Jan 2023',
  },
  {
    id: 6,
    title: 'Recipe Sharing Platform',
    description: 'A community-driven platform for sharing and discovering recipes.',
    longDescription: 'This recipe sharing platform allows food enthusiasts to share, discover, and save recipes. It features user profiles, recipe uploads with images, ingredient lists, preparation steps, cooking time, difficulty ratings, comments, and favorites functionality.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Express'],
    image: 'https://images.unsplash.com/photo-1540914124281-342587941389?auto=format&fit=crop&q=80&w=800&h=500',
    githubUrl: '/collab',
    liveUrl: '#',
    startDate: 'Feb 2023',
    endDate: 'Apr 2023',
  },
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
      <div className="container max-w-7xl mx-auto px-4">
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
        
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          onClick={onClose}
          className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center border border-border/50"
        >
          <X className="h-5 w-5" />
        </motion.button>
        
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
