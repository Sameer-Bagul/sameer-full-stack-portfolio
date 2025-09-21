import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, RefreshCw, BookOpen } from 'lucide-react';
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
    navigate(`/study/folder/${slug}`);
  };

  // Filter folders based on search
  const filteredFolders = searchTerm.trim() === ''
    ? validFolders
    : validFolders.filter(folder =>
        folder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        folder.slug.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-24 pb-80"
    >
      <div className="container px-4 mx-auto mt-12">
        {/* Enhanced Header with Search Bar */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-violet-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-violet-400 via-purple-500 to-violet-600 bg-clip-text text-transparent font-playfair">
                  Study Library
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Browse through your study materials and resources
                </p>
                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                    <span>{validFolders.length} folders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>{validFolders.reduce((acc, folder) => acc + (folder?.noteCount || 0), 0)} notes</span>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-auto flex gap-3">
                <div className="relative flex-grow lg:flex-grow-0">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search materials..."
                    className="w-full lg:w-72 pl-10 h-12 bg-background/70 backdrop-blur-sm border-white/20 focus:border-violet-400/50 transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Main Content */}
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-1 h-12 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
              <div>
                <h2 className="text-2xl font-semibold mb-1 font-playfair bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Study Folders
                </h2>
                <p className="text-sm text-muted-foreground">
                  {validFolders.length} folders • {validFolders.reduce((acc, folder) => acc + (folder?.noteCount || 0), 0)} notes
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={refetch}
              disabled={loading}
              className="bg-background/70 backdrop-blur-sm border-white/20 hover:bg-violet-50/50 dark:hover:bg-violet-950/50 transition-all duration-300"
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
            <div className="relative text-center py-20">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 rounded-2xl"></div>
              <div className="relative bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm border border-white/20 rounded-2xl p-12 shadow-xl">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-violet-100/80 to-purple-100/60 dark:from-violet-900/40 dark:to-purple-900/20 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  No folders found
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  The API might not be returning data or there might be a connection issue.
                </p>
                <Button
                  variant="outline"
                  onClick={refetch}
                  className="bg-background/70 backdrop-blur-sm border-white/20 hover:bg-violet-50/50 dark:hover:bg-violet-950/50 transition-all duration-300"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Folders
                </Button>
              </div>
            </div>
          ) : (
            <>
              {filteredFolders.length === 0 && searchTerm ? (
                <div className="relative text-center py-16">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 rounded-2xl"></div>
                  <div className="relative bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm border border-white/20 rounded-2xl p-10 shadow-xl">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-100/80 to-purple-100/60 dark:from-violet-900/40 dark:to-purple-900/20 rounded-xl flex items-center justify-center">
                      <Search className="w-8 h-8 text-violet-600 dark:text-violet-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                      No folders match your search
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search terms or browse all folders
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSearchTerm('')}
                      className="bg-background/70 backdrop-blur-sm border-white/20 hover:bg-violet-50/50 dark:hover:bg-violet-950/50 transition-all duration-300"
                    >
                      Clear Search
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="relative mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

                  {/* Background decoration */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-purple-500/10 to-violet-500/10 rounded-full blur-2xl pointer-events-none"></div>
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