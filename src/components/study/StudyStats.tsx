import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Target,
  Calendar,
  Award
} from 'lucide-react';

interface StudyStatsProps {
  totalMaterials: number;
  totalFolders: number;
  totalReadTime: string;
  recentActivity: number;
}

export function StudyStats({ 
  totalMaterials, 
  totalFolders, 
  totalReadTime, 
  recentActivity 
}: StudyStatsProps) {
  const stats = [
    {
      icon: BookOpen,
      label: 'Total Materials',
      value: totalMaterials.toString(),
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      icon: Target,
      label: 'Study Folders',
      value: totalFolders.toString(),
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      icon: Clock,
      label: 'Total Read Time',
      value: totalReadTime,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      icon: TrendingUp,
      label: 'This Week',
      value: `${recentActivity} materials`,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="border-border/40 bg-card/95 backdrop-blur-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", stat.bgColor)}>
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-semibold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}