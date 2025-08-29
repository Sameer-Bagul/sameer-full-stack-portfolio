import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  FileText, 
  Clock, 
  MoreVertical,
  Star,
  Download,
  Share2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StudyFolder, getFolderColor } from '@/data/studyFolders';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ModernFolderCardProps {
  folder: StudyFolder;
  index: number;
  materialCount: number;
  onSelect: () => void;
  isSelected?: boolean;
}

export function ModernFolderCard({ 
  folder, 
  index, 
  materialCount, 
  onSelect,
  isSelected = false 
}: ModernFolderCardProps) {
  const Icon = folder.icon;
  const colors = getFolderColor(folder.color);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group h-full"
    >
      <Card 
        className={cn(
          "h-full cursor-pointer transition-all duration-300 hover:shadow-xl border-border/40 bg-card/95 backdrop-blur-sm",
          isSelected && "ring-2 ring-primary/50 shadow-lg",
          "hover:border-primary/30"
        )}
        onClick={onSelect}
      >
        <CardContent className="p-0">
          {/* Header with gradient background */}
          <div className={cn("p-6 pb-4 relative overflow-hidden", colors.gradient)}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", colors.bg)}>
                <Icon className={cn("w-7 h-7", colors.text)} />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Star className="w-4 h-4 mr-2" />
                    Add to favorites
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="w-4 h-4 mr-2" />
                    Download folder
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share folder
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 pt-2">
            <h3 className={cn("text-xl font-semibold mb-2 group-hover:text-primary transition-colors", colors.text)}>
              {folder.name}
            </h3>
            
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {folder.description}
            </p>

            {/* Tags */}
            {folder.tags && folder.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {folder.tags.slice(0, 3).map(tag => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="text-xs px-2 py-0.5 bg-background/50"
                  >
                    {tag}
                  </Badge>
                ))}
                {folder.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs px-2 py-0.5 bg-background/50">
                    +{folder.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>{materialCount} material{materialCount !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{folder.updatedAt}</span>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
              >
                <ChevronRight className={cn("w-4 h-4", colors.text)} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}