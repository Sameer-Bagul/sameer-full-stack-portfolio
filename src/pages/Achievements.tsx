import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ChevronRight, Search, Folder, FolderOpen, ArrowLeft } from 'lucide-react';
import { Award, Medal, Trophy, GraduationCap, Clock, Calendar, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { AchievementDetailDialog } from '@/components/achievements/AchievementDetailDialog';

// Sample achievements data
const achievements = [
  {
    id: 1,
    title: 'Best Web App Award',
    organization: 'TechCon 2023',
    date: 'November 2023',
    description: 'Awarded for creating an innovative healthcare management application with exceptional UX design.',
    type: 'award',
    icon: Trophy,
    color: 'gold',
    details: 'The project was selected from over 200 entries and recognized for its innovative approach to healthcare management, focusing on patient-centered design and accessibility features that make it easy for users of all abilities to manage their healthcare needs.',
  },
  {
    id: 2,
    title: 'Hackathon 1st Place',
    organization: 'CodeFest',
    date: 'March 2023',
    description: 'Led a team of 4 to build a real-time disaster reporting application in 48 hours.',
    type: 'award',
    icon: Medal,
    color: 'silver',
    details: 'Our team developed a mobile-first application that allows users to report and track natural disasters in real-time. The app includes features like geolocation, offline functionality, and integration with emergency services APIs. The judges were impressed by our solution\'s potential impact on community safety and disaster response.',
  },
  {
    id: 3,
    title: 'Full Stack Developer Certification',
    organization: 'Tech Academy',
    date: 'February 2022',
    description: 'Completed a comprehensive 6-month program covering front-end, back-end, and DevOps skills.',
    type: 'certificate',
    icon: GraduationCap,
    color: 'blue',
    details: 'The certification program included over 500 hours of coursework and hands-on projects, covering modern JavaScript frameworks, database design, API development, and deployment strategies. The capstone project involved building a full-stack e-commerce platform with React, Node.js, and MongoDB.',
  },
  {
    id: 4,
    title: 'Advanced React & Redux Course',
    organization: 'CodeSchool',
    date: 'October 2022',
    description: 'Mastered advanced concepts in React.js, Redux state management, and performance optimization.',
    type: 'certificate',
    icon: GraduationCap,
    color: 'cyan',
    details: 'This intensive course covered advanced React patterns including context API, hooks, code splitting, and server-side rendering. The Redux portion included middleware, thunks, sagas, and state normalization techniques. The final project implemented these concepts in a real-world application with complex state management needs.',
  },
  {
    id: 5,
    title: 'Cloud Architecture Specialist',
    organization: 'AWS Training',
    date: 'April 2023',
    description: 'Gained expertise in designing and implementing scalable, secure cloud solutions.',
    type: 'certificate',
    icon: GraduationCap,
    color: 'orange',
    details: 'This certification validates expertise in designing distributed systems on AWS, implementing security controls, and optimizing for cost and performance. The program included hands-on labs working with services such as EC2, S3, Lambda, ECS, RDS, and more. The final assessment involved designing a highly available, fault-tolerant architecture for a fictional company.',
  },
  {
    id: 6,
    title: 'App Innovation Challenge Runner-up',
    organization: 'DevCon 2023',
    date: 'July 2023',
    description: 'Recognized for developing an AI-powered personal finance management application.',
    type: 'award',
    icon: Award,
    color: 'bronze',
    details: 'The application uses machine learning algorithms to analyze spending patterns and provide personalized financial recommendations. Features include automated categorization of expenses, predictive budgeting, and investment suggestions based on risk tolerance and financial goals. The judges praised the innovative use of AI and the potential to improve financial literacy.',
  },
];

const getIconBgColor = (color: string) => {
  switch (color) {
    case 'gold': return 'bg-amber-500/20 text-amber-500';
    case 'silver': return 'bg-slate-300/20 text-slate-500';
    case 'bronze': return 'bg-orange-300/20 text-orange-600';
    case 'blue': return 'bg-blue-500/20 text-blue-600';
    case 'cyan': return 'bg-cyan-500/20 text-cyan-600';
    case 'orange': return 'bg-orange-500/20 text-orange-600';
    default: return 'bg-primary/10 text-primary';
  }
};

const getTypeBadgeColor = (type: string) => {
  switch (type) {
    case 'award': return 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300';
    case 'certificate': return 'bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300';
    default: return 'bg-muted text-muted-foreground';
  }
};

const AchievementCard = ({ 
  achievement,
  index,
  onClick
}: { 
  achievement: typeof achievements[0];
  index: number;
  onClick: () => void;
}) => {
  const Icon = achievement.icon;
  const iconBgColor = getIconBgColor(achievement.color);
  const typeBadgeColor = getTypeBadgeColor(achievement.type);
  
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
              {achievement.type === 'award' ? 'Award' : 'Certificate'}
            </Badge>
          </div>
          
          <div className="flex items-start gap-4 pt-2">
            <div className={`w-14 h-14 rounded-xl ${iconBgColor} flex items-center justify-center`}>
              <Icon size={28} />
            </div>
            
            <div className="pt-1.5">
              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                {achievement.title}
              </h3>
              
              <div className="flex items-center gap-2 mt-1.5 mb-2 text-sm text-muted-foreground">
                <Building className="w-3.5 h-3.5" />
                <span>{achievement.organization}</span>
                <span className="w-1 h-1 rounded-full bg-border"></span>
                <Calendar className="w-3.5 h-3.5" />
                <span>{achievement.date}</span>
              </div>
              
              <p className="text-muted-foreground">{achievement.description}</p>
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
  filteredAchievements 
}: { 
  filteredAchievements: typeof achievements;
}) => {
  const [selectedAchievement, setSelectedAchievement] = useState<typeof achievements[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleCardClick = (achievement: typeof achievements[0]) => {
    setSelectedAchievement(achievement);
    setIsDialogOpen(true);
  };
  
  const achievementsByYear = filteredAchievements.reduce((acc, achievement) => {
    const year = achievement.date.split(' ')[1];
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(achievement);
    return acc;
  }, {} as Record<string, typeof achievements>);
  
  const sortedYears = Object.keys(achievementsByYear).sort((a, b) => parseInt(b) - parseInt(a));
  
  return (
    <div className="relative mt-8">
      <div className="absolute left-[21px] top-2 bottom-0 w-0.5 bg-border/60 dark:bg-border/30"></div>
      
      {sortedYears.map((year) => (
        <div key={year} className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative z-10 w-10 h-10 rounded-full bg-muted/80 border border-border flex items-center justify-center">
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold">{year}</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4 ml-12">
            {achievementsByYear[year].map((achievement, index) => (
              <AchievementCard 
                key={achievement.id}
                achievement={achievement}
                index={index}
                onClick={() => handleCardClick(achievement)}
              />
            ))}
          </div>
        </div>
      ))}
      
      <AchievementDetailDialog 
        achievement={selectedAchievement} 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

const GridView = ({ 
  filteredAchievements 
}: { 
  filteredAchievements: typeof achievements;
}) => {
  const [selectedAchievement, setSelectedAchievement] = useState<typeof achievements[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const handleCardClick = (achievement: typeof achievements[0]) => {
    setSelectedAchievement(achievement);
    setIsDialogOpen(true);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {filteredAchievements.map((achievement, index) => (
        <AchievementCard 
          key={achievement.id} 
          achievement={achievement} 
          index={index}
          onClick={() => handleCardClick(achievement)}
        />
      ))}
      
      <AchievementDetailDialog 
        achievement={selectedAchievement} 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

const Achievements = () => {
  const [displayMode, setDisplayMode] = useState<'grid' | 'timeline'>('grid');
  const [activeTab, setActiveTab] = useState('all');
  
  const awards = achievements.filter(a => a.type === 'award');
  const certificates = achievements.filter(a => a.type === 'certificate');
  
  const filteredAchievements = activeTab === 'all' 
    ? achievements 
    : activeTab === 'awards' 
      ? awards 
      : certificates;
  
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
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary mb-2 inline-block">ACHIEVEMENTS & RECOGNITION</span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">My Professional Journey</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A showcase of my professional accomplishments, awards, and educational achievements 
              that highlight my expertise and continuous growth.
            </p>
          </motion.div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full sm:max-w-xs"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="awards">Awards</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
            </TabsList>
          </Tabs>
          
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
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">View Options</h4>
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
          <GridView filteredAchievements={filteredAchievements} />
        ) : (
          <TimelineView filteredAchievements={filteredAchievements} />
        )}
      </div>
    </motion.div>
  );
};

export default Achievements;
