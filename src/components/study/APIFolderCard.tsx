import { motion } from 'framer-motion';
import { FolderOpen, Clock, Eye, ChevronRight } from 'lucide-react';
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
  blue: 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800',
  green: 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800',
  purple: 'bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-800',
  orange: 'bg-orange-50 border-orange-200 dark:bg-orange-950/30 dark:border-orange-800',
  pink: 'bg-pink-50 border-pink-200 dark:bg-pink-950/30 dark:border-pink-800',
  default: 'bg-muted/50 border-border'
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
      <Card className={cn(
        "h-full cursor-pointer transition-all duration-300 hover:shadow-lg border-2",
        colorClass
      )}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-background/80">
                <FolderOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {folder.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {formattedDate}
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>

          {folder.noteCount !== undefined && (
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-background/60">
                {folder.noteCount} {folder.noteCount === 1 ? 'note' : 'notes'}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Eye className="w-4 h-4 mr-1" />
                View
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}