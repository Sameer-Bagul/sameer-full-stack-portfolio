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
  blue: 'bg-gradient-to-br from-blue-50/80 to-blue-100/60 border-blue-200/50 dark:from-blue-950/40 dark:to-blue-900/20 dark:border-blue-800/30',
  green: 'bg-gradient-to-br from-green-50/80 to-green-100/60 border-green-200/50 dark:from-green-950/40 dark:to-green-900/20 dark:border-green-800/30',
  purple: 'bg-gradient-to-br from-purple-50/80 to-purple-100/60 border-purple-200/50 dark:from-purple-950/40 dark:to-purple-900/20 dark:border-purple-800/30',
  orange: 'bg-gradient-to-br from-orange-50/80 to-orange-100/60 border-orange-200/50 dark:from-orange-950/40 dark:to-orange-900/20 dark:border-orange-800/30',
  pink: 'bg-gradient-to-br from-pink-50/80 to-pink-100/60 border-pink-200/50 dark:from-pink-950/40 dark:to-pink-900/20 dark:border-pink-800/30',
  yellow: 'bg-gradient-to-br from-yellow-50/80 to-yellow-100/60 border-yellow-200/50 dark:from-yellow-950/40 dark:to-yellow-900/20 dark:border-yellow-800/30',
  default: 'bg-gradient-to-br from-card/80 to-card/60 border-border/50 dark:from-card/20 dark:to-card/10'
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
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group h-full"
    >
      <Card
        className={cn(
          "h-full cursor-pointer transition-all duration-500 hover:shadow-2xl border backdrop-blur-sm hover:backdrop-blur-md study-card-hover",
          "hover:border-violet-300/60 dark:hover:border-violet-400/40",
          "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/5 before:via-violet-50/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
          "after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-t after:from-black/5 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500",
          "relative overflow-hidden group/card shadow-lg hover:shadow-xl",
          colorClasses
        )}
        onClick={onClick}
      >
        <CardContent className="p-5 relative">
          {/* Enhanced paper texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.2)_1px,transparent_0)] bg-[length:20px_20px] rounded-lg pointer-events-none"></div>

          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500/60 via-purple-500/60 to-pink-500/60 rounded-t-lg"></div>

          <div className="flex items-start justify-between mb-4 relative z-10">
            <div className="flex items-start space-x-4 flex-1">
              <div className="p-3 rounded-xl bg-gradient-to-br from-violet-100/90 to-violet-200/70 dark:from-violet-900/50 dark:to-violet-800/30 border border-violet-200/40 dark:border-violet-700/30 flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <FileText className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-semibold text-base group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300 line-clamp-1 leading-tight">
                    {note.title}
                  </h3>
                  {note.isPinned && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex-shrink-0"
                    >
                      <Pin className="w-4 h-4 text-amber-500 drop-shadow-sm" />
                    </motion.div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed font-normal">
                  {contentPreview}
                </p>
              </div>
            </div>
            <motion.div
              whileHover={{ x: 2 }}
              className="flex-shrink-0"
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-violet-500 transition-all duration-300" />
            </motion.div>
          </div>

          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {note.tags.slice(0, 3).map((tag, tagIndex) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.08 + tagIndex * 0.05 }}
                >
                  <Badge
                    variant="outline"
                    className="text-xs px-3 py-1.5 bg-gradient-to-r from-violet-50/70 to-violet-100/50 dark:from-violet-900/40 dark:to-violet-800/30 border-violet-200/50 dark:border-violet-700/40 text-violet-700 dark:text-violet-300 font-medium hover:bg-violet-100/80 dark:hover:bg-violet-900/60 transition-colors duration-200"
                  >
                    <Tag className="w-3 h-3 mr-1.5" />
                    {tag}
                  </Badge>
                </motion.div>
              ))}
              {note.tags.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs px-3 py-1.5 bg-gradient-to-r from-gray-50/70 to-gray-100/50 dark:from-gray-900/40 dark:to-gray-800/30 border-gray-200/50 dark:border-gray-700/40 font-medium"
                >
                  +{note.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/20">
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 px-3 py-2 rounded-lg border border-border/20 backdrop-blur-sm">
              <Calendar className="w-3.5 h-3.5" />
              <span className="font-medium">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Eye className="w-3.5 h-3.5" />
              <span>View</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}