
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, PlusCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { StudyMaterial, studyMaterials } from '@/data/studyData';
import { getRootFolders, getFolderById, getFolderMaterials } from '@/data/studyFolders';
import { StudyMaterialViewer } from '@/components/study/StudyMaterialViewer';
import { FolderBreadcrumb } from '@/components/study/FolderBreadcrumb';
import { Card } from '@/components/ui/card';
import { StudyCard } from '@/components/study/StudyCard';
import { WelcomeSection } from '@/components/study/WelcomeSection';

const StudyPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFolderId, setCurrentFolderId] = useState<number | null>(null);
  const [openMaterialId, setOpenMaterialId] = useState<number | null>(null);
  const [folderHistory, setFolderHistory] = useState<(number | null)[]>([null]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

  // Get current folder details for the header
  const currentFolder = currentFolderId ? getFolderById(currentFolderId) : null;
  
  // Handle folder selection with history tracking
  const handleSelectFolder = (folderId: number) => {
    // Add to history, removing any "forward" history
    const newHistory = folderHistory.slice(0, currentHistoryIndex + 1);
    newHistory.push(folderId);
    setFolderHistory(newHistory);
    setCurrentHistoryIndex(newHistory.length - 1);
    setCurrentFolderId(folderId);
    setOpenMaterialId(null);
  };
  
  // Navigate through history
  const navigateBack = () => {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex(currentHistoryIndex - 1);
      setCurrentFolderId(folderHistory[currentHistoryIndex - 1]);
      setOpenMaterialId(null);
    }
  };
  
  // Direct navigation (breadcrumb)
  const navigateToFolder = (folderId: number | null) => {
    // Add to history
    const newHistory = folderHistory.slice(0, currentHistoryIndex + 1);
    newHistory.push(folderId);
    setFolderHistory(newHistory);
    setCurrentHistoryIndex(newHistory.length - 1);
    setCurrentFolderId(folderId);
    setOpenMaterialId(null);
  };

  // Handle material preview
  const handleOpenMaterial = (id: number) => {
    if (openMaterialId === id) {
      setOpenMaterialId(null);
    } else {
      setOpenMaterialId(id);
    }
  };

  // Handle material read
  const handleReadMaterial = (id: number) => {
    setOpenMaterialId(id);
    toast.success("Opening study material...");
  };

  // Get the opened study material
  const openedMaterial = openMaterialId ? studyMaterials.find(m => m.id === openMaterialId) : null;

  // If a material is fully opened for reading, show the notebook viewer
  if (openedMaterial?.content) {
    return (
      <StudyMaterialViewer 
        material={openedMaterial} 
        onClose={() => setOpenMaterialId(null)} 
      />
    );
  }

  // Simplified navigation bar
  const SimpleNavigation = () => (
    <div className="flex items-center justify-between mb-6 bg-background/70 backdrop-blur-sm p-2 rounded-lg border shadow-sm">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={navigateBack}
          disabled={currentHistoryIndex <= 0}
          className="text-muted-foreground h-9 w-9 p-0"
        >
          <ArrowLeft size={16} />
        </Button>
        <FolderBreadcrumb
          currentFolderId={currentFolderId}
          onNavigate={navigateToFolder}
        />
      </div>
    </div>
  );

  // Function to render folder content
  const renderFolderContent = () => {
    if (!currentFolderId) return null;
    
    const materials = getFolderMaterials(currentFolderId);
    
    // Filter materials if there's a search term
    const filteredMaterials = searchTerm.length > 0
      ? materials.filter(material => 
          material.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      : materials;
    
    return (
      <div>
        <h2 className="text-xl font-semibold mb-6">Study Materials</h2>
        {filteredMaterials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material, index) => (
              <StudyCard 
                key={material.id} 
                material={material} 
                index={index} 
                isOpen={material.id === openMaterialId}
                onOpen={() => handleOpenMaterial(material.id)}
                onRead={() => handleReadMaterial(material.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No study materials found.</p>
          </div>
        )}
      </div>
    );
  };

  // Render folder grid
  const renderFolderGrid = () => {
    const rootFolders = getRootFolders();
    
    return (
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rootFolders.map((folder, index) => (
            <Card 
              key={folder.id}
              onClick={() => handleSelectFolder(folder.id)}
              className="p-6 cursor-pointer hover:shadow-md transition-all border-none bg-background/50 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <folder.icon size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{folder.name}</h3>
                  <p className="text-sm text-muted-foreground">{folder.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="container px-4 mx-auto">
        {/* Simplified Header with Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gradient-primary">
              {currentFolder ? currentFolder.name : 'Study Library'}
            </h1>
            <p className="text-muted-foreground">
              {currentFolder ? currentFolder.description : 'Browse your study materials and notes'}
            </p>
          </div>
          
          <div className="w-full md:w-auto flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search materials..."
                className="w-full md:w-64 pl-9 minimalist-input bg-background/70 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="secondary" className="flex-shrink-0">
              <PlusCircle size={18} className="mr-2" />
              New
            </Button>
          </div>
        </div>
        
        {/* Navigation bar */}
        {currentFolderId !== null && <SimpleNavigation />}
        
        {/* Main Content */}
        <div className="mt-6">
          {currentFolderId === null ? (
            <div>
              <WelcomeSection />
              {renderFolderGrid()}
            </div>
          ) : (
            renderFolderContent()
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StudyPage;
