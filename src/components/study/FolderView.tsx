
import { motion } from 'framer-motion';
import { FolderGridItem } from './FolderGridItem';
import { StudyFolder } from '@/data/studyFolders';

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
    </div>
  );
}
