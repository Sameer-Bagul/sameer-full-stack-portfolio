import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Sparkles, Plus, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStudyAPI } from '@/hooks/useStudyAPI';
import { ModernFolderCard } from '@/components/study/ModernFolderCard';
import { StudyStats } from '@/components/study/StudyStats';
import { SearchAndFilter } from '@/components/study/SearchAndFilter';
import { StudyPageLoadingSkeleton } from '@/components/study/LoadingStates';
import { ErrorState, OfflineBanner } from '@/components/study/ErrorStates';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';

const StudyPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterBy, setFilterBy] = useState('all');
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const { folders, materials, loading, error, refetch, getFolderMaterials } = useStudyAPI();
  
  // Get all available tags from folders and materials
  const availableTags = useMemo(() => {
    const folderTags = folders.flatMap(f => f.tags || []);
    const materialTags = materials.flatMap(m => m.tags);
    return Array.from(new Set([...folderTags, ...materialTags]));
  }, [folders, materials]);
  
  // Filter and sort folders
  const filteredFolders = useMemo(() => {
    let filtered = folders.filter(folder => {
      const matchesSearch = folder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           folder.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => folder.tags?.includes(tag));
      
      return matchesSearch && matchesTags;
    });

    // Sort folders
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'date':
        filtered.sort((a, b) => new Date(b.updatedAt || '').getTime() - new Date(a.updatedAt || '').getTime());
        break;
      case 'size':
        filtered.sort((a, b) => b.materials.length - a.materials.length);
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => new Date(b.lastViewed || '').getTime() - new Date(a.lastViewed || '').getTime());
        break;
    }

    return filtered;
  }, [folders, searchTerm, selectedTags, sortBy]);
  
  // Calculate stats
  const stats = useMemo(() => {
    const totalMaterials = materials.length;
    const totalFolders = folders.length;
    const totalReadTime = `${Math.floor(totalMaterials * 7.5)} mins`;
    const recentActivity = Math.floor(totalMaterials * 0.3);
    
    return { totalMaterials, totalFolders, totalReadTime, recentActivity };
  }, [materials, folders]);
  
  // Handle folder selection
  const handleSelectFolder = (folderId: number) => {
    navigate(`/study/folder/${folderId}`);
  };
  
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Show loading state
  if (loading) {
    return <StudyPageLoadingSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-24 pb-16"
    >
      {/* Offline banner */}
      <OfflineBanner isVisible={!!error} />
      
      <div className="container px-4 mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Knowledge Base</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Study Library
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Organize, explore, and master your learning materials with our intelligent study system
            </p>
          </motion.div>
        </div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <StudyStats {...stats} />
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            availableTags={availableTags}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            filterBy={filterBy}
            onFilterChange={setFilterBy}
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <Card className="border-border/40 bg-card/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Quick Actions</h3>
                    <p className="text-sm text-muted-foreground">Manage your study materials</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Folder
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Study Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">
              Study Folders
              <span className="text-muted-foreground font-normal ml-2">
                ({filteredFolders.length})
              </span>
            </h2>
            <p className="text-sm text-muted-foreground">
              {searchTerm || selectedTags.length > 0 || filterBy !== 'all' 
                ? `Showing ${filteredFolders.length} of ${folders.length} folders`
                : 'All your study folders'
              }
            </p>
          </div>
        </div>

        {/* Main Content */}
        {filteredFolders.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
            }
          >
            {filteredFolders.map((folder, index) => (
              <ModernFolderCard
                key={folder.id}
                folder={folder}
                index={index}
                materialCount={getFolderMaterials(folder.id).length}
                onSelect={() => handleSelectFolder(folder.id)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-muted/20 rounded-xl border border-dashed"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No folders found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {searchTerm || selectedTags.length > 0 || filterBy !== 'all'
                ? "Try adjusting your search or filter criteria"
                : "Create your first study folder to get started"
              }
            </p>
            <div className="flex justify-center gap-4">
              {(searchTerm || selectedTags.length > 0 || filterBy !== 'all') && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedTags([]);
                    setFilterBy('all');
                  }}
                >
                  Clear Filters
                </Button>
              )}
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Folder
              </Button>
            </div>
          </motion.div>
        )}

        {/* Error handling */}
        {error && error !== 'Using offline data' && (
          <div>
            <ErrorState 
              error={error} 
              onRetry={refetch}
              type={error.includes('network') ? 'network' : 'server'}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StudyPage;