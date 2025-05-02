
import { motion } from 'framer-motion';
import { FolderOpen, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { StudyFolder } from '@/data/studyFolders';
import { FolderGridItem } from './FolderGridItem';

interface FolderViewProps {
  folders: StudyFolder[];
  onSelectFolder: (folderId: number) => void;
  currentFolderId: number | null;
}

export function FolderView({ folders, onSelectFolder, currentFolderId }: FolderViewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {folders.map((folder, index) => (
        <FolderGridItem
          key={folder.id} 
          folder={folder} 
          index={index} 
          onSelect={() => onSelectFolder(folder.id)}
          isActive={currentFolderId === folder.id}
        />
      ))}
      
      {/* Add Folder Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: folders.length * 0.05 }}
        className="h-full"
      >
        <Card className="h-full border-dashed hover:border-primary/50 transition-colors group cursor-pointer">
          <CardContent className="p-0 h-full">
            <div className="flex flex-col items-center justify-center h-full p-8 text-muted-foreground group-hover:text-primary transition-colors">
              <div className="w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center mb-4 group-hover:border-primary transition-colors">
                <Plus size={24} className="group-hover:scale-110 transition-transform" />
              </div>
              <p className="font-medium">Create New Folder</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
