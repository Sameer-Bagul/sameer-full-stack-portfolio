import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ChevronRight, Search, Folder, FolderOpen, ArrowLeft } from 'lucide-react';
import { Briefcase, Building, Calendar, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { ExperienceDetailDialog } from '@/components/experience/ExperienceDetailDialog';
import { experiences } from '@/data/experiences';
import type { Experience } from '@/data/experiences';

const getTypeBadgeColor = (type: string) => {
  switch (type) {
    case 'full-time': return 'bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300';
    case 'internship': return 'bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300';
    case 'freelance': return 'bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300';
    default: return 'bg-muted text-muted-foreground';
  }
};

const ExperienceCard = ({
  experience,
  index,
  onClick
}: {
  experience: Experience;
  index: number;
  onClick: () => void;
}) => {
  const typeBadgeColor = getTypeBadgeColor(experience.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <Card className="h-full overflow-hidden border-border/40 backdrop-blur-sm bg-card/95 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-primary/20">
        <CardContent className="p-6 relative">
          <div className="absolute top-0 right-0 mt-4 mr-4">
            <Badge className={typeBadgeColor}>
              {experience.type === 'full-time' ? 'Full-Time' : experience.type === 'internship' ? 'Internship' : 'Freelance'}
            </Badge>
          </div>

          <div className="flex items-start gap-4 pt-2">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Briefcase size={28} className="text-primary" />
            </div>

            <div className="pt-1.5">
              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                {experience.title}
              </h3>

              <div className="flex items-center gap-2 mt-1.5 mb-2 text-sm text-muted-foreground">
                <Building className="w-3.5 h-3.5" />
                <span>{experience.company}</span>
                <span className="w-1 h-1 rounded-full bg-border"></span>
                <Calendar className="w-3.5 h-3.5" />
                <span>{experience.period}</span>
              </div>

              <p className="text-muted-foreground line-clamp-2">
                {experience.description[0]}
              </p>
            </div>
          </div>

          <div className="absolute bottom-2 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs text-muted-foreground font-medium flex items-center">
              View details
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const TimelineView = ({
  filteredExperiences
}: {
  filteredExperiences: Experience[];
}) => {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleCardClick = (experience: Experience) => {
    setSelectedExperience(experience);
    setIsDialogOpen(true);
  };

  // Sort experiences by start date (most recent first)
  const sortedExperiences = [...filteredExperiences].sort((a, b) => {
    const getDateValue = (period: string) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const match = period.match(/^(\w{3}) (\d{4})/);
      if (match) {
        const month = months.indexOf(match[1]);
        const year = parseInt(match[2]);
        return year * 12 + month;
      }
      return 0; // Default for "Present"
    };

    return getDateValue(b.period) - getDateValue(a.period);
  });

  return (
    <div className="relative mt-8">
      {/* Timeline line - positioned differently for mobile vs desktop */}
      <div className={`absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/20 ${
        isMobile ? 'left-6' : 'left-1/2 transform -translate-x-1/2'
      }`}></div>

      <div className={`space-y-8 ${isMobile ? 'ml-16' : ''}`}>
        {sortedExperiences.map((experience, index) => {
          const isLeft = !isMobile && index % 2 === 0; // Only alternate on desktop
          const typeBadgeColor = getTypeBadgeColor(experience.type);

          return (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: isMobile ? 0 : (isLeft ? -50 : 50) }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center ${isMobile ? 'justify-start' : (isLeft ? 'justify-start' : 'justify-end')} w-full`}
            >
              {/* Timeline dot */}
              <div className={`absolute w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg z-10 ${
                isMobile ? 'left-[-28px]' : 'left-1/2 transform -translate-x-1/2'
              }`}></div>

              {/* Connecting line - only show on desktop */}
              {!isMobile && (
                <div
                  className={`absolute top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-primary/40 ${isLeft ? 'left-1/2 -translate-x-4' : 'right-1/2 translate-x-4'}`}
                ></div>
              )}

              {/* Experience card */}
              <div className={`w-full ${isMobile ? 'max-w-none' : `max-w-md ${isLeft ? 'pr-8' : 'pl-8'}`}`}>
                <motion.div
                  className="group cursor-pointer"
                  onClick={() => handleCardClick(experience)}
                  whileHover={{ scale: isMobile ? 1.01 : 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="overflow-hidden border-border/40 backdrop-blur-sm bg-card/95 hover:shadow-xl transition-all duration-300 hover:border-primary/30">
                    <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
                      {/* Header with period */}
                      <div className={`flex items-center justify-between mb-4 ${isMobile ? 'mb-3' : 'mb-4'}`}>
                        <div className="flex items-center gap-2">
                          <Calendar className={`text-primary ${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
                          <span className={`font-medium text-primary ${isMobile ? 'text-xs' : 'text-sm'}`}>{experience.period}</span>
                        </div>
                        <Badge className={`${typeBadgeColor} ${isMobile ? 'text-xs px-2 py-0.5' : ''}`}>
                          {experience.type === 'full-time' ? 'Full-Time' : experience.type === 'internship' ? 'Internship' : 'Freelance'}
                        </Badge>
                      </div>

                      {/* Content */}
                      <div className={`space-y-3 ${isMobile ? 'space-y-2' : 'space-y-3'}`}>
                        <div className="flex items-start gap-3">
                          <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0`}>
                            <Briefcase size={isMobile ? 16 : 20} className="text-primary" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold group-hover:text-primary transition-colors line-clamp-2`}>
                              {experience.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <Building className="w-3.5 h-3.5" />
                              <span className="truncate">{experience.company}</span>
                            </div>
                          </div>
                        </div>

                        <p className={`text-muted-foreground leading-relaxed ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          {experience.description[0]}
                        </p>

                        {/* Hover indicator */}
                        <div className="flex items-center justify-end pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className={`text-primary font-medium flex items-center ${isMobile ? 'text-xs' : 'text-xs'}`}>
                            View details
                            <ChevronRight className={`${isMobile ? 'w-2.5 h-2.5' : 'w-3 h-3'} ml-1`} />
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <ExperienceDetailDialog
        experience={selectedExperience}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

const GridView = ({
  filteredExperiences
}: {
  filteredExperiences: Experience[];
}) => {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleCardClick = (experience: Experience) => {
    setSelectedExperience(experience);
    setIsDialogOpen(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {filteredExperiences.map((experience, index) => (
        <ExperienceCard
          key={experience.id}
          experience={experience}
          index={index}
          onClick={() => handleCardClick(experience)}
        />
      ))}

      <ExperienceDetailDialog
        experience={selectedExperience}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

const Experience = () => {
  const [displayMode, setDisplayMode] = useState<'grid' | 'timeline'>('timeline');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredExperiences = activeFilter === 'all'
    ? experiences
    : activeFilter === 'jobs'
      ? experiences.filter(e => e.type === 'full-time' || e.type === 'internship')
      : experiences.filter(e => e.type === 'freelance');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-20 pb-16"
    >
      <div className="container max-w-5xl mt-12">
        <div className="flex flex-col items-center mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-16 h-16 mb-4 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary mb-2 inline-block">PROFESSIONAL EXPERIENCE</span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">My Career Journey</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of my professional experience, showcasing my growth and expertise
              across different roles and industries.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          {/* Custom Segmented Filter */}
          <div className="flex items-center bg-muted/50 rounded-lg p-1 border border-border/40">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeFilter === 'all'
                  ? 'bg-background text-foreground shadow-sm border border-border/40'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              ALL
            </button>
            <div className="w-px h-4 bg-border/40 mx-1"></div>
            <button
              onClick={() => setActiveFilter('jobs')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeFilter === 'jobs'
                  ? 'bg-background text-foreground shadow-sm border border-border/40'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Job / Internship
            </button>
            <div className="w-px h-4 bg-border/40 mx-1"></div>
            <button
              onClick={() => setActiveFilter('freelance')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeFilter === 'freelance'
                  ? 'bg-background text-foreground shadow-sm border border-border/40'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Freelancing
            </button>
          </div>

          <div className="flex items-center justify-end space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs px-2.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                  </svg>
                  View
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Display Options</h4>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant={displayMode === 'grid' ? 'default' : 'outline'}
                        onClick={() => setDisplayMode('grid')}
                        className="w-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                          <rect x="3" y="3" width="7" height="7" />
                          <rect x="14" y="3" width="7" height="7" />
                          <rect x="3" y="14" width="7" height="7" />
                          <rect x="14" y="14" width="7" height="7" />
                        </svg>
                        Grid
                      </Button>
                      <Button
                        size="sm"
                        variant={displayMode === 'timeline' ? 'default' : 'outline'}
                        onClick={() => setDisplayMode('timeline')}
                        className="w-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <circle cx="12" cy="5" r="2" />
                          <circle cx="12" cy="12" r="2" />
                          <circle cx="12" cy="19" r="2" />
                        </svg>
                        Timeline
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {displayMode === 'grid' ? (
          <GridView filteredExperiences={filteredExperiences} />
        ) : (
          <TimelineView filteredExperiences={filteredExperiences} />
        )}
      </div>
    </motion.div>
  );
};

export default Experience;