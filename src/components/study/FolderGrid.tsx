
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Grid3X3, Rows } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StudyFolder } from '@/data/studyFolders';
import { FolderView } from './FolderView';

interface FolderGridProps {
  folders: StudyFolder[];
  onSelectFolder: (folderId: number) => void;
  currentFolderId: number | null;
  title: string;
  description?: string;
}

export function FolderGrid({ folders, onSelectFolder, currentFolderId, title, description }: FolderGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filter folders based on search
  const filteredFolders = folders.filter(folder => 
    folder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    folder.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">{title}</h2>
          {description && <p className="text-muted-foreground hidden md:block">{description}</p>}
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search folders..."
              className="pl-8 h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center rounded-md border border-input bg-background p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={`h-7 w-7 p-0 ${viewMode === 'grid' ? 'bg-muted' : ''}`}
              aria-label="Grid view"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('list')}
              className={`h-7 w-7 p-0 ${viewMode === 'list' ? 'bg-muted' : ''}`}
              aria-label="List view"
            >
              <Rows className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {description && <p className="text-muted-foreground md:hidden">{description}</p>}
      
      {filteredFolders.length > 0 ? (
        <motion.div layout>
          <FolderView 
            folders={filteredFolders} 
            onSelectFolder={onSelectFolder}
            currentFolderId={currentFolderId}
          />
        </motion.div>
      ) : (
        <div className="py-12 text-center border rounded-lg border-dashed">
          <p className="text-muted-foreground">No folders found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}
