
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { StudyMaterial, studyMaterials } from '@/data/studyData';
import { getRootFolders, getFolderById, getFolderMaterials } from '@/data/studyFolders';
import { StudyMaterialViewer } from '@/components/study/StudyMaterialViewer';
import { FolderBreadcrumb } from '@/components/study/FolderBreadcrumb';
import { StudyCard } from '@/components/study/StudyCard';
import { WelcomeSection } from '@/components/study/WelcomeSection';
import { FolderView } from '@/components/study/FolderView';

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
    <div className="flex items-center justify-between mb-6 bg-background/70 backdrop-blur-sm p-3 rounded-xl border shadow-sm">
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
        <h2 className="text-xl font-semibold mb-6 font-playfair">Study Materials</h2>
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
          <div className="text-center py-10 bg-muted/20 rounded-xl border border-dashed">
            <p className="text-muted-foreground">No study materials found.</p>
          </div>
        )}
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
        {/* Header with Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-violet-400 via-purple-500 to-violet-600 bg-clip-text text-transparent font-playfair">
              {currentFolder ? currentFolder.name : 'Study Library'}
            </h1>
            <p className="text-muted-foreground">
              {currentFolder ? currentFolder.description : 'Browse through your study materials and resources'}
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
        
        {/* Navigation bar */}
        {currentFolderId !== null && <SimpleNavigation />}
        
        {/* Main Content */}
        <div className="mt-6">
          {currentFolderId === null ? (
            <div>
              <WelcomeSection />
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-6 font-playfair">Categories</h2>
                <FolderView 
                  folders={getRootFolders()} 
                  onSelectFolder={handleSelectFolder}
                  currentFolderId={currentFolderId}
                />
              </div>
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
