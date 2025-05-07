
import { motion } from 'framer-motion';
import { BookOpen, Tag, Calendar, FileText, Clock, User, ThumbsUp, MessageSquare, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { StudyMaterial } from '@/data/studyData';
import { getCategoryColor } from './noteColors';
import './studyMaterial.css';

interface StudyCardProps { 
  material: StudyMaterial; 
  index: number;
  isOpen: boolean;
  onOpen: () => void;
  onRead: () => void;
}

export function StudyCard({ material, index, isOpen, onOpen, onRead }: StudyCardProps) {
  const Icon = material.icon;
  const { theme } = useTheme();
  const colors = getCategoryColor(material.category);
  
  // Calculate estimated read time if not provided
  const estimatedReadTime = material.estimatedReadTime || 
    (material.content ? `${Math.ceil(material.content.split(/\s+/).length / 200)} min read` : "5 min read");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Card 
        className={`h-full overflow-hidden border-none shadow-lg study-card ${
          isOpen ? 'ring-2 ring-primary/70' : ''
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/20 backdrop-blur-sm z-0"></div>
        
        <div className="relative z-10">
          <div className="p-5 pb-3">
            <div className="flex items-center justify-between mb-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${colors.bg}`}>
                <Icon size={22} className={colors.text} />
              </div>
              <Badge className={`${colors.bg} border-none`}>
                {material.category}
              </Badge>
            </div>
            
            <h3 className="text-xl font-bold mb-2 font-playfair line-clamp-2">{material.title}</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{material.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {material.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="outline" className="text-xs flex items-center gap-1 bg-background/50">
                  <Tag className="w-3 h-3" />
                  {tag}
                </Badge>
              ))}
              {material.tags.length > 3 && (
                <Badge variant="outline" className="text-xs bg-background/50">
                  +{material.tags.length - 3}
                </Badge>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{material.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="w-3 h-3" />
                <span>{material.fileSize}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{estimatedReadTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{material.author || "Anonymous"}</span>
              </div>
            </div>
            
            {/* Engagement stats */}
            <div className="flex justify-between text-xs text-muted-foreground pb-3 border-b border-dashed">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>248</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" />
                <span>42</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                <span>8</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={
                  material.difficulty === "Beginner" ? "text-green-500" :
                  material.difficulty === "Intermediate" ? "text-blue-500" :
                  material.difficulty === "Advanced" ? "text-purple-500" : "text-muted-foreground"
                }>
                  {material.difficulty || "All levels"}
                </span>
              </div>
            </div>
          </div>
            
          {isOpen && (
            <div className={`px-5 py-4 ${theme === 'dark' ? 'bg-muted/30' : 'bg-muted/40'} transition`}>
              <div className="prose prose-sm max-w-none mb-4">
                <p>{material.description}</p>
                <div className={`text-xs mt-4 p-3 rounded ${colors.bg}`}>
                  <p className="font-semibold mb-1">Content Preview:</p>
                  <p className="line-clamp-3">{material.content?.substring(0, 150)}...</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-end gap-3 p-4 pt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpen}
              className="text-primary p-2 h-auto hover:bg-primary/5"
            >
              {isOpen ? "Close" : "Preview"}
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={onRead}
              className="gap-2 bg-primary/20 hover:bg-primary/30 text-primary"
            >
              <BookOpen className="h-3 w-3" />
              Read
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
