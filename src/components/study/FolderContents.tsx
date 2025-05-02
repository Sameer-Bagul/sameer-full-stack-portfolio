
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react'; // Added missing import
import { StudyCard } from './StudyCard';
import { StudyEmptyState } from './StudyEmptyState';
import { NestedFolderView } from './NestedFolderView';
import { 
  StudyFolder,
  getFolderById,
  getFolderMaterials,
  getSubfolders
} from '@/data/studyFolders';

interface FolderContentsProps {
  folderId: number | null;
  openMaterialId: number | null;
  onOpenMaterial: (id: number) => void;
  onReadMaterial: (id: number) => void;
  onSelectFolder: (folderId: number) => void;
  searchTerm: string;
}

export function FolderContents({ 
  folderId, 
  openMaterialId, 
  onOpenMaterial,
  onReadMaterial,
  onSelectFolder,
  searchTerm
}: FolderContentsProps) {
  const [openFolders, setOpenFolders] = useState<Set<number>>(new Set([folderId].filter(Boolean)));

  const handleToggleFolder = (id: number) => {
    setOpenFolders(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  useEffect(() => {
    if (folderId) {
      setOpenFolders(new Set([folderId]));
    }
  }, [folderId]);

  if (folderId === null) {
    return null;
  }
  
  const folder = getFolderById(folderId);
  if (!folder) {
    return <EmptyFolderState />;
  }
  
  const materials = getFolderMaterials(folderId);
  
  const filteredMaterials = materials.filter(material => 
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  if (materials.length === 0 && getSubfolders(folderId).length === 0) {
    return <EmptyFolderState />;
  }
  
  return (
    <div className="mt-6 space-y-6">
      <div className="border rounded-lg bg-background/50 backdrop-blur-sm shadow-sm">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Folder Explorer</h2>
          <NestedFolderView
            folder={folder}
            level={0}
            openFolders={openFolders}
            onToggleFolder={handleToggleFolder}
            onSelectFolder={onSelectFolder}
            onOpenMaterial={onOpenMaterial}
            onReadMaterial={onReadMaterial}
            currentFolderId={folderId}
            openMaterialId={openMaterialId}
          />
        </div>
      </div>

      {filteredMaterials.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Materials in Current Folder</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material, index) => (
              <StudyCard 
                key={material.id} 
                material={material} 
                index={index} 
                isOpen={material.id === openMaterialId}
                onOpen={() => onOpenMaterial(material.id)}
                onRead={() => onReadMaterial(material.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyFolderState() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-16 text-center"
    >
      <div className="notebook-paper mx-auto max-w-md p-12 rounded-lg">
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-6">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          
          <h3 className="text-xl font-medium mb-4">This folder is empty</h3>
          
          <p className="text-muted-foreground mb-6">
            There are no study materials in this folder yet
          </p>
          
          <div className="page-fold"></div>
        </div>
      </div>
    </motion.div>
  );
}
