import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Tag, 
  Calendar, 
  Clock, 
  User, 
  Eye,
  ChevronRight,
  Star,
  Download
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StudyMaterial } from '@/data/studyData';
import { getCategoryColor } from './noteColors';
import { cn } from '@/lib/utils';

interface ModernStudyCardProps {
  material: StudyMaterial;
  index: number;
  onRead: () => void;
  onPreview?: () => void;
  isPreviewMode?: boolean;
}

export function ModernStudyCard({ 
  material, 
  index, 
  onRead, 
  onPreview,
  isPreviewMode = false 
}: ModernStudyCardProps) {
  const colors = getCategoryColor(material.category);
  const estimatedReadTime = material.estimatedReadTime || "5 min read";

  const difficultyColors = {
    'Beginner': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    'Intermediate': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    'Advanced': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group h-full"
    >
      <Card className="h-full overflow-hidden border border-border/40 bg-card/95 backdrop-blur-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300">
        {/* Header with category and difficulty */}
        <div className={cn("p-4 border-b border-border/30", colors.bg)}>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-background/80 border-background/60">
              {material.category}
            </Badge>
            {material.difficulty && (
              <Badge className={cn("text-xs", difficultyColors[material.difficulty as keyof typeof difficultyColors])}>
                {material.difficulty}
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-6 flex flex-col h-full">
          {/* Title and description */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {material.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-3">
              {material.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {material.tags.slice(0, 3).map(tag => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs px-2 py-0.5 bg-background/50"
              >
                <Tag className="w-2.5 h-2.5 mr-1" />
                {tag}
              </Badge>
            ))}
            {material.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-0.5 bg-background/50">
                +{material.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground mb-6">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{material.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{estimatedReadTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>{material.author || "Anonymous"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>{Math.floor(Math.random() * 500) + 50} views</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-muted-foreground hover:text-foreground"
              >
                <Star className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-muted-foreground hover:text-foreground"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex gap-2">
              {onPreview && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onPreview}
                  className="h-8 px-3 text-xs"
                >
                  Preview
                </Button>
              )}
              <Button
                onClick={onRead}
                size="sm"
                className="h-8 px-3 text-xs bg-primary/90 hover:bg-primary"
              >
                <BookOpen className="w-3.5 h-3.5 mr-1" />
                Read
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}