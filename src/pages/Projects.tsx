import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { projectsData } from '@/data/projects';
import type { Project } from '@/data/projects';
import { Search, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'freelance' | 'hackathon' | 'personal'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    let filtered = projectsData;

    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(project => project.category === activeFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [activeFilter, searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when filters change
  const handleFilterChange = (filter: 'all' | 'freelance' | 'hackathon' | 'personal') => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-20 pb-16"
    >
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-16 h-16 mb-4 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <span className="text-sm font-medium text-primary mb-2 inline-block">MY PROJECTS</span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Portfolio Showcase</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A collection of projects spanning freelancing work, hackathon achievements, and personal development initiatives.
            </p>
          </motion.div>
        </div>

        {/* Search and Filters Container */}
        <div className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl p-6 mb-8 shadow-sm">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search projects by title, description, or technology..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-12 pr-10 h-12 text-base border-border/60 bg-background/80 focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground/70"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground mr-2">Filter by:</span>
              <div className="flex flex-wrap items-center gap-1 bg-muted/60 rounded-lg p-1 border border-border/30">
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeFilter === 'all'
                      ? 'bg-primary text-primary-foreground shadow-md transform scale-105'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => handleFilterChange('freelance')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeFilter === 'freelance'
                      ? 'bg-primary text-primary-foreground shadow-md transform scale-105'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  }`}
                >
                  Freelancing
                </button>
                <button
                  onClick={() => handleFilterChange('hackathon')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeFilter === 'hackathon'
                      ? 'bg-primary text-primary-foreground shadow-md transform scale-105'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  }`}
                >
                  Hackathons
                </button>
                <button
                  onClick={() => handleFilterChange('personal')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeFilter === 'personal'
                      ? 'bg-primary text-primary-foreground shadow-md transform scale-105'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  }`}
                >
                  Personal
                </button>
              </div>
            </div>

            {/* Active Filter Indicator */}
            <div className="text-sm text-muted-foreground">
              {activeFilter === 'all' ? 'Showing all projects' :
               activeFilter === 'freelance' ? 'Freelancing projects' :
               activeFilter === 'hackathon' ? 'Hackathon projects' :
               'Personal projects'}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {paginatedProjects.length} of {filteredProjects.length} projects
          </p>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          <AnimatePresence mode="popLayout">
            {paginatedProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => handleCardClick(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Project Detail Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
            {selectedProject && (
              <ProjectDetail
                project={selectedProject}
                onClose={() => setIsDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};

// Project Card Component
const ProjectCard = ({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <Card className="h-full overflow-hidden border-border/40 backdrop-blur-sm bg-card/95 hover:shadow-xl transition-all duration-300 hover:border-primary/30">
        <CardContent className="p-0">
          {/* Project Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            {/* Links */}
            <div className="absolute top-3 right-3 flex gap-2">
              {project.githubUrl && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center shadow-md"
                >
                  <Github className="h-4 w-4 text-foreground" />
                </motion.div>
              )}
              {project.liveUrl && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center shadow-md"
                >
                  <ExternalLink className="h-4 w-4 text-foreground" />
                </motion.div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{project.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Project Detail Component
const ProjectDetail = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-h-[80vh] overflow-y-auto"
    >
      <div className="relative h-64 md:h-80">
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
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h1>
            <p className="text-white/80 text-sm">{project.description}</p>
          </motion.div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-3">About this project</h2>
          <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <h3 className="font-medium mb-3">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
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

export default Projects;
