
import { ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StudyFolder, getFolderPath } from '@/data/studyFolders';

interface FolderBreadcrumbProps {
  currentFolderId: number | null;
  onNavigate: (folderId: number | null) => void;
}

export function FolderBreadcrumb({ currentFolderId, onNavigate }: FolderBreadcrumbProps) {
  if (!currentFolderId) {
    return (
      <div className="flex items-center py-2 mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground font-medium"
          disabled
        >
          <Home size={16} className="mr-1" />
          Home
        </Button>
      </div>
    );
  }
  
  const path = getFolderPath(currentFolderId);
  
  return (
    <div className="flex items-center flex-wrap py-2 mb-4 gap-1">
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-muted-foreground hover:text-foreground"
        onClick={() => onNavigate(null)}
      >
        <Home size={16} className="mr-1" />
        Home
      </Button>
      
      {path.map((folder, index) => (
        <div key={folder.id} className="flex items-center">
          <ChevronRight size={16} className="text-muted-foreground mx-1" />
          <Button 
            variant="ghost" 
            size="sm" 
            className={`${
              index === path.length - 1 
                ? 'font-medium pointer-events-none text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => index !== path.length - 1 && onNavigate(folder.id)}
            disabled={index === path.length - 1}
          >
            {folder.name}
          </Button>
        </div>
      ))}
    </div>
  );
}
