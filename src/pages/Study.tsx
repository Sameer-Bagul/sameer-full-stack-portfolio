import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, ChevronRight, Search, Folder, FolderOpen, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { studyMaterials } from '@/data/studyData';
import { 
  getRootFolders, 
  getFolderById, 
  StudyFolder, 
  getFolderPath,
  getSubfolders 
} from '@/data/studyFolders';
import { StudyMaterialViewer } from '@/components/study/StudyMaterialViewer';
import { StudyEmptyState } from '@/components/study/StudyEmptyState';
import { FolderView } from '@/components/study/FolderView';
import { FolderBreadcrumb } from '@/components/study/FolderBreadcrumb';
import { FolderContents } from '@/components/study/FolderContents';
import { FolderEmptyState } from '@/components/study/FolderEmptyState';
import { FolderGrid } from '@/components/study/FolderGrid';
import { FolderSidebar } from '@/components/study/FolderSidebar';

const Study = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');
  const [currentFolderId, setCurrentFolderId] = useState<number | null>(null);
  const [openMaterialId, setOpenMaterialId] = useState<number | null>(null);
  const [folderHistory, setFolderHistory] = useState<(number | null)[]>([null]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

  // Get root folders
  const rootFolders = getRootFolders();
  
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
  
  const navigateForward = () => {
    if (currentHistoryIndex < folderHistory.length - 1) {
      setCurrentHistoryIndex(currentHistoryIndex + 1);
      setCurrentFolderId(folderHistory[currentHistoryIndex + 1]);
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

  // Get current folder details for the header
  const currentFolder = currentFolderId ? getFolderById(currentFolderId) : null;
  const folderPath = currentFolderId ? getFolderPath(currentFolderId) : [];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="container px-4 mx-auto">
        {/* Header and Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-1">
              {currentFolder ? currentFolder.name : 'Study Library'}
            </h2>
            <p className="text-muted-foreground">
              {currentFolder ? currentFolder.description : 'Browse your study materials and notes'}
            </p>
          </div>
          
          <div className="w-full md:w-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search materials..."
              className="w-full md:w-64 pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Navigation Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={navigateBack}
              disabled={currentHistoryIndex <= 0}
              className="h-9 w-9"
            >
              <ArrowLeft size={16} />
            </Button>
            <FolderBreadcrumb 
              currentFolderId={currentFolderId}
              onNavigate={navigateToFolder}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setViewMode('grid')}
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              className="h-9 w-9 p-0"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 1h5v5h-5V1zm7 0h5v5h-5V1zm-7 7h5v5h-5V8zm7 0h5v5h-5V8z" fill="currentColor" fillRule="evenodd" />
              </svg>
            </Button>
            <Button
              onClick={() => setViewMode('list')}
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              className="h-9 w-9 p-0"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 3a.5.5 0 01.5-.5h11a.5.5 0 010 1H2a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h11a.5.5 0 010 1H2a.5.5 0 01-.5-.5zm.5 2.5a.5.5 0 000 1h11a.5.5 0 000-1H2zm0 3a.5.5 0 000 1h11a.5.5 0 000-1H2z" fill="currentColor" fillRule="evenodd" />
              </svg>
            </Button>
          </div>
        </div>
        
        {/* Main Content with optional sidebar */}
        <div className="flex gap-6 mb-12">
          {/* Sidebar - Only on larger screens */}
          <div className="hidden lg:block border rounded-lg">
            <FolderSidebar 
              onSelectFolder={navigateToFolder}
              currentFolderId={currentFolderId}
            />
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1">
            {currentFolderId === null && (
              rootFolders.length > 0 ? (
                <FolderGrid
                  folders={rootFolders}
                  onSelectFolder={handleSelectFolder}
                  currentFolderId={currentFolderId}
                  title="Study Folders"
                  description="Select a folder to view its contents"
                />
              ) : (
                <FolderEmptyState />
              )
            )}
            
            {currentFolderId !== null && (
              <FolderContents 
                folderId={currentFolderId}
                openMaterialId={openMaterialId}
                onOpenMaterial={handleOpenMaterial}
                onReadMaterial={handleReadMaterial}
                onSelectFolder={handleSelectFolder}
                searchTerm={searchTerm}
              />
            )}
          </div>
        </div>

        {/* Request New Material */}
        <div className="mt-16 py-8 px-6 rounded-2xl" 
             style={{ 
               backgroundImage: 'linear-gradient(to right bottom, hsl(var(--background)), hsl(var(--primary) / 0.05))' 
             }}>
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              <h3 className="text-2xl font-semibold mb-2">Need specific study material?</h3>
              <p className="text-muted-foreground mb-4">
                Can't find what you're looking for? Request new study materials or suggest topics for future additions.
              </p>
              <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-sm">
                Request Material <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="md:col-span-2 flex justify-center">
              <Users className="w-32 h-32 text-primary/10" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Study;
