import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  FolderOpen,
  PlusCircle,
  Home,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { 
  StudyFolder, 
  getFolderById, 
  getRootFolders, 
  getSubfolders,
  getFolderColor,
  getFolderMaterials
} from '@/data/studyFolders';

// Only allow expanding the two top-level root folders, and only show 1 subfolder level deep.

interface FolderSidebarProps {
  onSelectFolder: (folderId: number | null) => void;
  currentFolderId: number | null;
}

export function FolderSidebar({ onSelectFolder, currentFolderId }: FolderSidebarProps) {
  return (
    <div className="w-72 h-full backdrop-blur-md bg-background/60 border-r border-border/40 glass-morphism py-6 px-3">
      <div className="flex items-center justify-between mb-6 px-2">
        <h3 className="font-semibold text-lg text-primary">Folders</h3>
      </div>
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="pr-3 space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start gap-2 font-normal ${
              currentFolderId === null ? 'bg-primary/10 text-primary font-medium' : ''
            }`}
            onClick={() => onSelectFolder(null)}
          >
            <Home size={16} />
            <span>Home</span>
          </Button>
          <FolderTree 
            onSelectFolder={onSelectFolder} 
            currentFolderId={currentFolderId} 
          />
        </div>
      </ScrollArea>
    </div>
  );
}

function FolderTree({ onSelectFolder, currentFolderId }: FolderSidebarProps) {
  const rootFolders = getRootFolders().slice(0,2); // Only allow for 2 root folders
  return (
    <div className="space-y-1">
      {rootFolders.map(folder => (
        <FolderTreeItem 
          key={folder.id}
          folder={folder}
          level={0}
          onSelectFolder={onSelectFolder}
          currentFolderId={currentFolderId}
        />
      ))}
    </div>
  );
}

interface FolderTreeItemProps {
  folder: StudyFolder;
  level: number;
  onSelectFolder: (folderId: number | null) => void;
  currentFolderId: number | null;
}

function FolderTreeItem({ folder, level, onSelectFolder, currentFolderId }: FolderTreeItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Only allow 1 level of subfolder expand (no deep nesting)
  const subfolders = level === 0 ? getSubfolders(folder.id).slice(0,2) : [];
  const hasSubfolders = subfolders.length > 0;
  const materials = getFolderMaterials(folder.id);
  const isActive = currentFolderId === folder.id;
  const colors = getFolderColor(folder.color);

  // When currentFolder is this folder (active), open it
  useEffect(() => {
    // Only auto-expand a root when one of its subfolder is selected
    if (level === 0 && currentFolderId) {
      let current = getFolderById(currentFolderId);
      if (current?.parentId === folder.id) {
        setIsOpen(true);
      }
    }
  }, [currentFolderId, folder.id, level]);

  // Calculate padding based on level
  const paddingLeft = `${level * 16 + 8}px`;

  return (
    <div>
      <div className="flex items-center" style={{ paddingLeft }}>
        {hasSubfolders ? (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 hover:bg-background/80"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Collapse folder" : "Expand folder"}
          >
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </Button>
        ) : (
          <div className="w-6"></div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 gap-2 justify-start font-normal rounded-md hover:bg-background/80 transition-colors ${isActive ? colors.text : ""}`}
          onClick={() => onSelectFolder(folder.id)}
        >
          {isActive ? (
            <FolderOpen size={16} className={colors.text} />
          ) : (
            <Folder size={16} className="text-muted-foreground" />
          )}
          <span className="truncate">{folder.name}</span>
          {materials.length > 0 && (
            <span className="ml-auto text-xs text-muted-foreground bg-background px-1.5 rounded-full">
              {materials.length}
            </span>
          )}
        </Button>
      </div>
      {/* Only top-level folders can expand and show their subfolders */}
      {hasSubfolders && isOpen && (
        <div className="ml-5 pt-1">
          {subfolders.map(subfolder => (
            <FolderTreeItem
              key={subfolder.id}
              folder={subfolder}
              level={level + 1}
              onSelectFolder={onSelectFolder}
              currentFolderId={currentFolderId}
            />
          ))}
        </div>
      )}
      {/* Show notes for this folder right under the folder row */}
      {materials.length > 0 && isOpen && (
        <div className="pl-10 pt-1 space-y-1">
          {materials.map(material => (
            <div 
              key={material.id}
              className="flex items-center text-sm text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={() => {}} // Optionally hookup per-note actions elsewhere
            >
              <FileText size={14} className="mr-2 flex-shrink-0" />
              <span className="truncate">{material.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
