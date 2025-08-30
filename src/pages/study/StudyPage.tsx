import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { normalizeId } from '@/services/notesApi';
import { useNotesAPI } from '@/hooks/useNotesAPI';
import { APIFolderCard } from '@/components/study/APIFolderCard';
import { StudyPageLoadingSkeleton } from '@/components/study/LoadingStates';
import { ErrorState } from '@/components/study/ErrorStates';

const StudyPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { folders, loading, error, refetch } = useNotesAPI();
  
  // Simple validation - just ensure folders is an array
  const validFolders = Array.isArray(folders) ? folders : [];
  
  // Debug logging
  console.log('StudyPage - folders:', folders);
  console.log('StudyPage - validFolders:', validFolders);
  console.log('StudyPage - loading:', loading);
  console.log('StudyPage - error:', error);
  
  // Log detailed folder information
  if (validFolders.length > 0) {
    console.log('First folder details:', validFolders[0]);
    console.log('First folder keys:', Object.keys(validFolders[0]));
    console.log('First folder _id:', validFolders[0]._id);
    console.log('First folder name:', validFolders[0].name);
    console.log('First folder slug:', validFolders[0].slug);
    console.log('First folder noteCount:', validFolders[0].noteCount);
  }
  
  // Handle folder selection
  const handleSelectFolder = (slug: string) => {
    if (slug && typeof slug === 'string') {
      navigate(`/study/folder/${slug}`);
    }
  };

  // Filter folders based on search
  const filteredFolders = searchTerm.trim() === '' 
    ? validFolders 
    : validFolders.filter(folder => 
        folder?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        folder?.slug?.toLowerCase().includes(searchTerm.toLowerCase())
      );

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
              Study Library
            </h1>
            <p className="text-muted-foreground">
              Browse through your study materials and resources
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
        
        {/* Main Content */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-2 font-playfair">Study Folders</h2>
              <p className="text-sm text-muted-foreground">
                {validFolders.length} folders • {validFolders.reduce((acc, folder) => acc + (folder?.noteCount || 0), 0)} notes
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={refetch}
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {loading ? (
            <StudyPageLoadingSkeleton />
          ) : error ? (
            <ErrorState 
              error={error}
              onRetry={refetch}
            />
          ) : validFolders.length === 0 ? (
            <div className="text-center py-16 bg-muted/20 rounded-xl border border-dashed">
              <p className="text-muted-foreground mb-2">No folders found</p>
              <p className="text-sm text-muted-foreground">
                The API might not be returning data or there might be a connection issue.
              </p>
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refetch}
                >
                  Refresh Folders
                </Button>
              </div>
            </div>
          ) : (
            <>
              {filteredFolders.length === 0 && searchTerm ? (
                <div className="text-center py-16 bg-muted/20 rounded-xl border border-dashed">
                  <p className="text-muted-foreground mb-2">No folders match your search</p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search terms
                  </p>
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchTerm('')}
                    >
                      Clear Search
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFolders.map((folder, index) => {
                    const folderId = normalizeId(folder._id);
                    console.log(`Rendering folder ${index}:`, folder.name, 'ID:', folderId);
                    return (
                      <APIFolderCard
                        key={folderId || `folder-${index}`}
                        folder={folder}
                        index={index}
                        onClick={() => handleSelectFolder(folder.slug)}
                      />
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StudyPage; 