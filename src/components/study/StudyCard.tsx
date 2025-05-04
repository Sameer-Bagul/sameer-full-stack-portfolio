
import { motion } from 'framer-motion';
import { BookOpen, Tag, Calendar, FileText, Clock, User, ThumbsUp, MessageSquare, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { StudyMaterial } from '@/data/studyData';
import { getCategoryColor } from './noteColors';
import './studyMaterial.css';

const categoryBadgeGradients: Record<string, string> = {
  notes: "bg-gradient-to-br from-blue-300/60 to-blue-600/70 text-white",
  cheatsheet: "bg-gradient-to-br from-amber-200/70 to-amber-400/70 text-amber-900",
  lecture: "bg-gradient-to-br from-emerald-200/60 to-emerald-500/80 text-white",
  textbook: "bg-gradient-to-br from-purple-200/70 to-purple-500/70 text-white",
  default: "bg-slate-300/70 text-slate-800"
};

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
  const categoryGradient =
    categoryBadgeGradients[material.category.toLowerCase()] ?? categoryBadgeGradients.default;
    
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
      <Card className={`h-full overflow-hidden border shadow-xl gfg-card ${
          isOpen ? 'ring-2 ring-primary' : ''
        }`}
      >
        <div className="gfg-card-header">
          <div className="flex items-center justify-between gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white/40 ${categoryGradient} glass-panel`}
            >
              <Icon size={26} />
            </div>
            <div>
              <Badge variant="outline" className={`capitalize !border-none ${categoryGradient}`}>
                {material.category}
              </Badge>
            </div>
          </div>
        </div>
        
        <CardContent className="p-4 pt-6">
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{material.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{material.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {material.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs flex items-center gap-1 bg-background/70">
                <Tag className="w-3 h-3" />
                {tag}
              </Badge>
            ))}
            {material.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-background/70">
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
        </CardContent>
          
        {isOpen && (
          <div className={`px-6 py-4 ${theme === 'dark' ? 'bg-muted/20' : 'bg-muted/30'} transition`}>
            <div className="prose prose-sm max-w-none mb-4">
              <p>{material.description}</p>
              <div className={`text-xs mt-4 p-3 rounded ${colors.bg}`}>
                <p className="font-semibold mb-1">Content Preview:</p>
                <p className="line-clamp-3">{material.content?.substring(0, 150)}...</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between gap-2 p-4 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpen}
            className={`text-primary p-2 h-auto hover:bg-transparent hover:text-primary`}
          >
            {isOpen ? "Close" : "Preview"}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onRead}
            className={`gap-2 font-semibold text-primary bg-background/70 hover:bg-accent`}
          >
            <BookOpen className="h-3 w-3" />
            Read Now
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
