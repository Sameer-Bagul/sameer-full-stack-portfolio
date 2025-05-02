import { motion } from 'framer-motion';
import { BookOpen, Tag, Calendar, FileText } from 'lucide-react';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Card className={`h-full overflow-hidden border-none shadow-xl notebook-paper glass-morphism ring-1 ring-primary/10 relative transition-all duration-300 ${
          isOpen ? 'ring-2 ring-primary' : 'hover:shadow-2xl hover:ring-2 hover:ring-accent/60'
        }`}
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(125deg, rgba(40,50,82,0.50) 45%, rgba(79,101,255,0.11) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.92) 70%, rgba(155,185,255,0.22) 100%)',
        }}
      >
        <div className="page-fold"></div>
        <CardContent className="p-0">
          <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white/40 ${categoryGradient} glass-panel`}
                style={{
                  boxShadow: '0 4px 36px 0 rgba(79, 101, 255, 0.12)',
                  background:
                    material.category.toLowerCase() === "notes"
                      ? "linear-gradient(145deg, #dbeafe 60%, #6366f1 100%)"
                      : material.category.toLowerCase() === "cheatsheet"
                      ? "linear-gradient(135deg, #fff7ae 60%, #fbbf24 100%)"
                      : material.category.toLowerCase() === "lecture"
                      ? "linear-gradient(135deg, #bbf7d0 60%, #10b981 100%)"
                      : material.category.toLowerCase() === "textbook"
                      ? "linear-gradient(135deg, #ede9fe 60%, #7c3aed 100%)"
                      : "linear-gradient(135deg, #e0e7ef 50%, #cbd5e1 100%)",
                }}
              >
                <Icon size={26} />
              </div>
              <div>
                <Badge variant="outline" className={`capitalize !border-none ${categoryGradient}`}>
                  {material.category}
                </Badge>
              </div>
            </div>
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
            <div className="flex items-center text-xs text-muted-foreground gap-2">
              <Calendar className="w-3 h-3" />
              <span>{material.date}</span>
              <span>•</span>
              <FileText className="w-3 h-3" />
              <span>{material.fileSize}</span>
            </div>
          </div>
          {isOpen && (
            <div className={`px-6 py-4 border-t ${theme === 'dark' ? 'bg-muted/20' : 'bg-muted/30'} transition`}>
              <div className="prose prose-sm max-w-none mb-4">
                <p>{material.description}</p>
                <div className={`text-xs mt-4 p-3 rounded ${colors.bg}`}>
                  <p className="font-semibold mb-1">Content Preview:</p>
                  <p className="line-clamp-3">{material.content?.substring(0, 150)}...</p>
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between gap-2 p-4 border-t bg-background/20 glass-morphism">
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
              Read
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
