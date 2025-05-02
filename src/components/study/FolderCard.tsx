
import { motion } from 'framer-motion';
import { ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  StudyFolder, 
  getFolderColor, 
  getSubfolders,
  getFolderMaterials
} from '@/data/studyFolders';

interface FolderCardProps {
  folder: StudyFolder;
  index: number;
  onSelect: () => void;
  isActive: boolean;
}

export function FolderCard({ folder, index, onSelect, isActive }: FolderCardProps) {
  const Icon = folder.icon;
  const colors = getFolderColor(folder.color);
  const subfolders = getSubfolders(folder.id);
  const materials = getFolderMaterials(folder.id);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card 
        onClick={onSelect}
        className={`h-full cursor-pointer transition-all duration-300 hover:shadow-md overflow-hidden 
          ${isActive ? `ring-2 ring-${colors.accent} shadow-lg` : ''}`}
      >
        <CardContent className="p-0">
          {/* Folder Header */}
          <div className={`p-4 ${colors.bg} flex items-center justify-between relative overflow-hidden`}>
            <div className="flex items-center gap-3 z-10">
              <div className={`w-10 h-10 rounded-lg ${colors.accent} text-white flex items-center justify-center`}>
                <Icon size={20} />
              </div>
              <h3 className={`font-medium ${colors.text}`}>{folder.name}</h3>
            </div>
            <Button variant="ghost" size="icon" className={colors.text}>
              <ChevronRight size={18} />
            </Button>
            
            {/* Decorative elements */}
            <div className="absolute w-24 h-24 rounded-full bg-white/10 -top-12 -right-12 z-0"></div>
            <div className="absolute w-16 h-16 rounded-full bg-white/5 bottom-0 -left-8 z-0"></div>
          </div>
          
          {/* Folder Content */}
          <div className="p-4">
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {folder.description}
            </p>
            
            <div className="space-y-3">
              {subfolders.length > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <Icon size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {subfolders.length} subfolder{subfolders.length !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-sm">
                <Icon size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">
                  {materials.length} item{materials.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">
                  Updated {folder.updatedAt}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
