import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, FileText } from 'lucide-react';
import { StudyFolder, getFolderColor, getFolderMaterials } from '@/data/studyFolders';

interface FolderViewProps {
  folders: StudyFolder[];
  onSelectFolder: (folderId: number) => void;
  currentFolderId: number | null;
}

export function FolderView({ folders, onSelectFolder, currentFolderId }: FolderViewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {folders.map((folder, index) => {
        const Icon = folder.icon;
        const colors = getFolderColor(folder.color);
        const materials = getFolderMaterials(folder.id);
        
        return (
          <motion.div
            key={folder.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card 
              onClick={() => onSelectFolder(folder.id)}
              className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                currentFolderId === folder.id ? `ring-2 ${colors.accent} shadow-lg` : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.bg}`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className={colors.text} />
                  </Button>
                </div>
                
                <h3 className={`text-lg font-semibold mb-2 ${colors.text}`}>
                  {folder.name}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {folder.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText size={16} />
                  <span>{materials.length} material{materials.length !== 1 ? 's' : ''}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
