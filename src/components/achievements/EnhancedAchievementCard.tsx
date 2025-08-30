
import { motion } from 'framer-motion';
import { Calendar, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Achievement {
  id: number;
  title: string;
  organization: string;
  date: string;
  description: string;
  type: string;
  icon: any;
  color: string;
  details: string;
  image?: string;
}

interface EnhancedAchievementCardProps {
  achievement: Achievement;
  index: number;
  onClick: () => void;
}

export function EnhancedAchievementCard({ 
  achievement, 
  index, 
  onClick 
}: EnhancedAchievementCardProps) {
  const Icon = achievement.icon;
  
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
  
  const iconBgColor = getIconBgColor(achievement.color);
  const typeBadgeColor = getTypeBadgeColor(achievement.type);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group cursor-pointer h-full"
      onClick={onClick}
    >
      <Card className="h-full overflow-hidden border-border/40 backdrop-blur-sm bg-card/95 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-primary/20">
        <div className="relative h-40 overflow-hidden">
          <img
            src={achievement.image || `https://source.unsplash.com/random/800x600?${achievement.type}`}
            alt={achievement.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-0 right-0 m-3">
            <Badge className={typeBadgeColor}>
              {achievement.type === 'award' ? 'Award' : 'Certificate'}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <div className="flex items-center gap-1 text-xs opacity-80">
              <Building size={12} />
              <span>{achievement.organization}</span>
              <span className="mx-1">•</span>
              <Calendar size={12} />
              <span>{achievement.date}</span>
            </div>
          </div>
        </div>
        
        <CardContent className="p-5 relative">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl ${iconBgColor} flex items-center justify-center`}>
              <Icon size={24} />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                {achievement.title}
              </h3>
              
              <p className="text-muted-foreground mt-2 line-clamp-2">{achievement.description}</p>
            </div>
          </div>
          
          <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
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
}
