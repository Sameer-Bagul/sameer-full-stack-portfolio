import { motion } from 'framer-motion';
import { FolderOpen, Clock, Eye, ChevronRight, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { APIFolder, normalizeDate } from '@/services/notesApi';
import { cn } from '@/lib/utils';

interface APIFolderCardProps {
  folder: APIFolder;
  index: number;
  onClick: () => void;
}

const folderColors = {
  blue: 'bg-gradient-to-br from-blue-50/80 to-blue-100/60 border-blue-200/50 dark:from-blue-950/40 dark:to-blue-900/20 dark:border-blue-800/30',
  green: 'bg-gradient-to-br from-green-50/80 to-green-100/60 border-green-200/50 dark:from-green-950/40 dark:to-green-900/20 dark:border-green-800/30',
  purple: 'bg-gradient-to-br from-purple-50/80 to-purple-100/60 border-purple-200/50 dark:from-purple-950/40 dark:to-purple-900/20 dark:border-purple-800/30',
  orange: 'bg-gradient-to-br from-orange-50/80 to-orange-100/60 border-orange-200/50 dark:from-orange-950/40 dark:to-orange-900/20 dark:border-orange-800/30',
  pink: 'bg-gradient-to-br from-pink-50/80 to-pink-100/60 border-pink-200/50 dark:from-pink-950/40 dark:to-pink-900/20 dark:border-pink-800/30',
  default: 'bg-gradient-to-br from-muted/60 to-muted/40 border-border/50 dark:from-muted/20 dark:to-muted/10'
};

export function APIFolderCard({ folder, index, onClick }: APIFolderCardProps) {
  const colorClass = folderColors[folder.color as keyof typeof folderColors] || folderColors.default;
  const formattedDate = new Date(normalizeDate(folder.updatedAt)).toLocaleDateString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group h-full"
    >
      <Card
        className={cn(
          "h-full cursor-pointer transition-all duration-500 hover:shadow-2xl border-2 backdrop-blur-sm hover:backdrop-blur-md study-card-hover",
          "hover:border-violet-300/50 dark:hover:border-violet-400/30 hover:scale-[1.02]",
          "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
          "relative overflow-hidden group/card",
          colorClass
        )}
        onClick={onClick}
      >
        <CardContent className="p-6 relative">
          {/* Subtle paper texture overlay */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] bg-[length:20px_20px] rounded-lg pointer-events-none"></div>

          <div className="flex items-start justify-between mb-4 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-violet-100/80 to-violet-200/60 dark:from-violet-900/40 dark:to-violet-800/20 border border-violet-200/30 dark:border-violet-700/20 shadow-sm">
                <FolderOpen className="w-7 h-7 text-violet-600 dark:text-violet-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300 line-clamp-1">
                  {folder.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Clock className="w-3 h-3" />
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1" />
          </div>

          {folder.noteCount !== undefined && (
            <div className="flex items-center justify-center mt-4">
              <Badge variant="secondary" className="bg-gradient-to-r from-violet-100/80 to-violet-200/60 dark:from-violet-900/40 dark:to-violet-800/20 text-violet-700 dark:text-violet-300 border-violet-200/50 dark:border-violet-700/30 px-4 py-2 text-sm font-medium shadow-sm">
                <BookOpen className="w-4 h-4 mr-2" />
                {folder.noteCount} {folder.noteCount === 1 ? 'note' : 'notes'}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}