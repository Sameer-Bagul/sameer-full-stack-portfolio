import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, Grid, List, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ModernStudyCard } from '@/components/study/ModernStudyCard';
import { MaterialLoadingSkeleton } from '@/components/study/LoadingStates';
import { ErrorState, EmptyState } from '@/components/study/ErrorStates';
import { useStudyAPI } from '@/hooks/useStudyAPI';
import { SearchAndFilter } from '@/components/study/SearchAndFilter';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export default function FolderView() {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterBy, setFilterBy] = useState('all');
  
  const { folders, materials, loading, error, refetch, getFolderMaterials } = useStudyAPI();
  
  const currentFolder = folderId ? folders.find(f => f.id === parseInt(folderId)) : null;
  const folderMaterials = folderId ? getFolderMaterials(parseInt(folderId)) : [];
  
  // Get available tags from current folder materials
  const availableTags = Array.from(new Set(folderMaterials.flatMap(m => m.tags)));
  
  // Filter materials if there's a search term
  const filteredMaterials = folderMaterials.filter(material => {
    const matchesSearch = searchTerm.length === 0 || (
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => material.tags.includes(tag));
    
    const matchesCategory = filterBy === 'all' || material.category === filterBy;
    
    return matchesSearch && matchesTags && matchesCategory;
  });
  
  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <MaterialLoadingSkeleton />
        </div>
      </div>
    );
  }
  
  if (!currentFolder) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <EmptyState
            title="Folder not found"
            description="The folder you're looking for doesn't exist or has been moved."
            action={
              <Button onClick={() => navigate('/study')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Study Library
              </Button>
            }
          />
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
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  onClick={() => navigate('/study')}
                  className="cursor-pointer hover:text-primary"
                >
                  Study Library
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{currentFolder.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Folder Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="border-border/40 bg-card/95 backdrop-blur-sm overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-primary/60 via-primary to-primary/60"></div>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <currentFolder.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-1">{currentFolder.name}</h1>
                  <p className="text-muted-foreground">{currentFolder.description}</p>
                </div>
              </div>
              
              {currentFolder.tags && currentFolder.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {currentFolder.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filter for Materials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedTags={selectedTags}
            onTagToggle={(tag) => setSelectedTags(prev => 
              prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
            )}
            availableTags={availableTags}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            filterBy={filterBy}
            onFilterChange={setFilterBy}
          />
        </motion.div>

        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">
              Study Materials
              <span className="text-muted-foreground font-normal ml-2">
                ({filteredMaterials.length})
              </span>
            </h1>
            <p className="text-sm text-muted-foreground">
              {searchTerm || selectedTags.length > 0 || filterBy !== 'all'
                ? `Showing ${filteredMaterials.length} of ${folderMaterials.length} materials`
                : 'All materials in this folder'
              }
            </p>
          </div>
        </div>

        {/* Materials Grid/List */}
        {filteredMaterials.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
            }
          >
            {filteredMaterials.map((material, index) => (
              <ModernStudyCard
                key={material.id} 
                material={material} 
                index={index} 
                onRead={() => navigate(`/study/material/${material.id}`)}
              />
            ))}
          </motion.div>
        ) : (
          <EmptyState
            title="No materials found"
            description={
              searchTerm || selectedTags.length > 0 || filterBy !== 'all'
                ? "Try adjusting your search or filter criteria"
                : "This folder doesn't contain any study materials yet"
            }
            action={
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
                <Button>Add Material</Button>
              </div>
            }
          />
        )}
      </div>
    </motion.div>
  );