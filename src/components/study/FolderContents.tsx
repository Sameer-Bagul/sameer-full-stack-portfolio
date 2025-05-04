
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { StudyCard } from './StudyCard';
import { StudyEmptyState } from './StudyEmptyState';
import { 
  StudyFolder,
  getFolderById,
  getFolderMaterials,
} from '@/data/studyFolders';

interface FolderContentsProps {
  folderId: number | null;
  openMaterialId: number | null;
  onOpenMaterial: (id: number) => void;
  onReadMaterial: (id: number) => void;
  onSelectFolder?: (folderId: number) => void;
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
  
  if (materials.length === 0) {
    return <EmptyFolderState />;
  }
  
  return (
    <div className="mt-6">
      {filteredMaterials.length > 0 ? (
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
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No matching materials found.</p>
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
