
import { ChevronDown, ChevronRight, Folder, FolderOpen, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  StudyFolder,
  getFolderMaterials,
} from '@/data/studyFolders';

interface NestedFolderViewProps {
  folder: StudyFolder;
  onOpenMaterial: (id: number) => void;
  currentFolderId: number;
  openMaterialId: number | null;
}

export function NestedFolderView({ 
  folder, 
  onOpenMaterial,
  currentFolderId,
  openMaterialId
}: NestedFolderViewProps) {
  const materials = getFolderMaterials(folder.id);
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium mb-4">Materials in {folder.name}</h2>
      
      {materials.length > 0 ? (
        <div className="space-y-2">
          {materials.map((material) => (
            <div 
              key={material.id}
              className={`flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-accent/50 transition-all cursor-pointer ${
                material.id === openMaterialId ? 'bg-accent/70' : ''
              }`}
              onClick={() => onOpenMaterial(material.id)}
            >
              <FileText size={18} className="text-muted-foreground" />
              <div>
                <div className="text-foreground">{material.title}</div>
                <div className="text-xs text-muted-foreground">
                  {material.category} • {material.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No study materials available in this folder
        </div>
      )}
    </div>
  );
}
