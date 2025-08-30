import { motion } from 'framer-motion';
import { FileText, Tag, Calendar, Pin, Eye, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { APINote, normalizeId, normalizeDate } from '@/services/notesApi';
import { cn } from '@/lib/utils';

interface APINoteCardProps {
  note: APINote;
  index: number;
  onClick: () => void;
}

const noteColors = {
  blue: 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800',
  green: 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800',
  purple: 'bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-800',
  orange: 'bg-orange-50 border-orange-200 dark:bg-orange-950/30 dark:border-orange-800',
  pink: 'bg-pink-50 border-pink-200 dark:bg-pink-950/30 dark:border-pink-800',
  yellow: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-800',
  default: 'bg-card border-border'
};

export function APINoteCard({ note, index, onClick }: APINoteCardProps) {
  // Get color classes based on note color
  const colorClasses = note.color && noteColors[note.color] 
    ? noteColors[note.color] 
    : noteColors.default;

  // Format the last edited date
  const formattedDate = new Date(normalizeDate(note.lastEditedAt)).toLocaleDateString();
  
  // Create a preview of the content by stripping HTML tags
  const stripHtml = (html: string) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  };
  
  const contentPreview = note.content ? 
    stripHtml(note.content).substring(0, 150) + (stripHtml(note.content).length > 150 ? '...' : '') : 
    'No content';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group h-full"
    >
      <Card className={cn(
        "h-full cursor-pointer transition-all duration-300 hover:shadow-lg border",
        colorClasses
      )}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start space-x-3 flex-1">
              <div className="p-1.5 rounded-md bg-background/80 flex-shrink-0">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                    {note.title}
                  </h3>
                  {note.isPinned && (
                    <Pin className="w-3 h-3 text-amber-500 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {contentPreview}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
          </div>

          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {note.tags.slice(0, 3).map(tag => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="text-xs px-1.5 py-0.5 bg-background/60"
                >
                  <Tag className="w-2 h-2 mr-1" />
                  {tag}
                </Badge>
              ))}
              {note.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-1.5 py-0.5 bg-background/60">
                  +{note.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="h-6 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Eye className="w-3 h-3 mr-1" />
              View
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}