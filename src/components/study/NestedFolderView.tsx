
import { useState } from 'react';
import { ChevronDown, ChevronRight, Folder, FolderOpen, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  StudyFolder,
  getSubfolders,
  getFolderMaterials,
  getFolderColor
} from '@/data/studyFolders';

interface NestedFolderViewProps {
  folder: StudyFolder;
  level: number;
  openFolders: Set<number>;
  onToggleFolder: (folderId: number) => void;
  onSelectFolder: (folderId: number) => void;
  onOpenMaterial: (id: number) => void;
  onReadMaterial: (id: number) => void;
  currentFolderId: number;
  openMaterialId: number | null;
}

export function NestedFolderView({ 
  folder, 
  level, 
  openFolders, 
  onToggleFolder,
  onSelectFolder,
  onOpenMaterial,
  onReadMaterial,
  currentFolderId,
  openMaterialId
}: NestedFolderViewProps) {
  const isOpen = openFolders.has(folder.id);
  const subfolders = getSubfolders(folder.id);
  const materials = getFolderMaterials(folder.id);
  const colors = getFolderColor(folder.color);
  const paddingLeft = `${level * 20}px`;
  const isActive = currentFolderId === folder.id;
  
  return (
    <div className="transition-all duration-200">
      <div 
        className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-colors hover:bg-accent/50 ${
          isActive ? 'bg-accent' : ''
        }`}
        style={{ paddingLeft }}
      >
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => onToggleFolder(folder.id)}
        >
          {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-2 h-8 ${colors.text}`}
          onClick={() => onSelectFolder(folder.id)}
        >
          {isActive ? <FolderOpen size={18} /> : <Folder size={18} />}
          <span className="font-medium">{folder.name}</span>
          {materials.length > 0 && (
            <span className="ml-2 text-xs text-muted-foreground">
              {materials.length} item{materials.length !== 1 ? 's' : ''}
            </span>
          )}
        </Button>
      </div>

      {isOpen && (
        <div className="space-y-2 animate-accordion-down">
          {subfolders.map(subfolder => (
            <NestedFolderView
              key={subfolder.id}
              folder={subfolder}
              level={level + 1}
              openFolders={openFolders}
              onToggleFolder={onToggleFolder}
              onSelectFolder={onSelectFolder}
              onOpenMaterial={onOpenMaterial}
              onReadMaterial={onReadMaterial}
              currentFolderId={currentFolderId}
              openMaterialId={openMaterialId}
            />
          ))}
          
          {level > 0 && materials.length > 0 && (
            <div style={{ paddingLeft: `${(level + 1) * 20}px` }}>
              {materials.map((material) => (
                <div 
                  key={material.id}
                  className={`flex items-center gap-2 py-1.5 px-3 rounded-lg hover:bg-accent/50 transition-all ${
                    material.id === openMaterialId ? 'bg-accent/70' : ''
                  }`}
                >
                  <FileText size={16} className="text-muted-foreground" />
                  <button
                    onClick={() => onOpenMaterial(material.id)}
                    className="text-sm text-foreground hover:text-primary transition-colors"
                  >
                    {material.title}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
