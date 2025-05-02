
import { motion } from 'framer-motion';
import { ChevronRight, FolderOpen, Clock, Files, Tag, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { 
  StudyFolder, 
  getFolderColor, 
  getSubfolders,
  getFolderMaterials,
  getFolderTotalSize
} from '@/data/studyFolders';

interface FolderGridItemProps {
  folder: StudyFolder;
  index: number;
  onSelect: () => void;
  isActive: boolean;
}

export function FolderGridItem({ folder, index, onSelect, isActive }: FolderGridItemProps) {
  const Icon = folder.icon;
  const colors = getFolderColor(folder.color);
  const subfolders = getSubfolders(folder.id);
  const materials = getFolderMaterials(folder.id);
  const totalItems = getFolderTotalSize(folder.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -7 }}
      className="h-full group"
    >
      <Card 
        onClick={onSelect}
        className={`h-full overflow-hidden relative cursor-pointer transition-all duration-300 ring-2 ${
          isActive ? `${colors.accent} shadow-xl` : 'ring-transparent group-hover:ring-primary/70'
        } glass-morphism shadow-lg border-none`}
        style={{
          background: 'none'
        }}
      >
        {/* Glass/gradient background */}
        <div className={`absolute inset-0 z-0 opacity-80 ${colors.gradient}`} />
        
        {/* Top accent bar */}
        <div className={`absolute h-1.5 w-full top-0 left-0 z-10 ${colors.accent}`} />
        
        {/* Protected indicator */}
        {folder.isProtected && (
          <div className="absolute top-3 right-3 z-20">
            <Lock size={16} className="text-foreground/70" />
          </div>
        )}
        
        <CardContent className="p-0 z-10 relative">
          <div className="p-6 pt-7">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md border-2 border-white/20 glass-panel bg-white/10 backdrop-blur-md ${colors.text}`}>
                <Icon size={28} />
              </div>
              <Badge className={`rounded-md px-3 ${colors.bg} ${colors.text} border-none backdrop-blur-sm`}>
                {subfolders.length > 0 ? `${subfolders.length} subfolder${subfolders.length > 1 ? 's' : ''}` : 'Folder'}
              </Badge>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{folder.name}</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{folder.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Files size={12} />
                <span>{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={12} />
                <span>{folder.lastViewed ? `Viewed ${folder.lastViewed}` : `Updated ${folder.updatedAt}`}</span>
              </div>
            </div>
            
            {folder.tags && folder.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {folder.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-background/40 text-xs font-normal px-1.5 py-0.5">
                    <Tag size={10} className="mr-1" />
                    {tag}
                  </Badge>
                ))}
                {folder.tags.length > 3 && (
                  <Badge variant="secondary" className="bg-background/40 text-xs font-normal px-1.5 py-0.5">
                    +{folder.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-0 border-t z-10 relative bg-background/80 glass-morphism backdrop-blur-md">
          <div className="w-full p-3 flex justify-end">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 gap-1 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
            >
              <span className="text-xs font-semibold">Open</span>
              <ChevronRight size={14} />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
