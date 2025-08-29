import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StudyCard } from '@/components/study/StudyCard';
import { getFolderById, getFolderMaterials } from '@/data/studyFolders';

export default function FolderView() {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const currentFolder = folderId ? getFolderById(parseInt(folderId)) : null;
  const materials = folderId ? getFolderMaterials(parseInt(folderId)) : [];
  
  // Filter materials if there's a search term
  const filteredMaterials = searchTerm.length > 0
    ? materials.filter(material => 
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : materials;
  
  if (!currentFolder) {
    return (
      <div className="container px-4 pt-24">
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold mb-4">Folder not found</h2>
          <Button onClick={() => navigate('/study')}>Back to Study Library</Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="container px-4 mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/study')}
          className="mb-6"
        >
          ← Back to Folders
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-violet-400 via-purple-500 to-violet-600 bg-clip-text text-transparent font-playfair">
              {currentFolder.name}
            </h1>
            <p className="text-muted-foreground">
              {currentFolder.description}
            </p>
          </div>
          
          <div className="w-full md:w-auto flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search materials..."
                className="w-full md:w-64 pl-9 bg-background/70 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {filteredMaterials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material, index) => (
              <StudyCard 
                key={material.id} 
                material={material} 
                index={index} 
                isOpen={false}
                onOpen={() => {}}
                onRead={() => navigate(`/study/material/${material.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-muted/20 rounded-xl border border-dashed">
            <p className="text-muted-foreground">No study materials found.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
} 