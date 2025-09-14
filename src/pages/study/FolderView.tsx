import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, RefreshCw, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFolderNotes } from '@/hooks/useNotesAPI';
import { APINoteCard } from '@/components/study/APINoteCard';
import { normalizeId, normalizeDate } from '@/services/notesApi';
import { MaterialLoadingSkeleton } from '@/components/study/LoadingStates';
import { ErrorState } from '@/components/study/ErrorStates';

export default function FolderView() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  // Use the new API hook
  const { folder, loading, error, refetch } = useFolderNotes(slug || null, {
    search: searchTerm || undefined,
    limit: 50
  });

  // Handle back navigation
  const handleBack = () => {
    navigate('/study');
  };

  // Handle note click
  const handleNoteClick = (noteId: string) => {
    navigate(`/study/note/${slug}/${noteId}`);
  };

  if (!slug) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="text-center py-16">
            <p className="text-muted-foreground">Invalid folder</p>
            <Button onClick={handleBack} className="mt-4">
              Back to Study Library
            </Button>
          </div>
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
      className="pt-24 pb-80"
    >
      <div className="container px-4 mx-auto">
        {/* Enhanced Header */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-violet-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="flex items-center gap-2 bg-background/70 backdrop-blur-sm border border-white/20 hover:bg-violet-50/50 dark:hover:bg-violet-950/50 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-violet-400 via-purple-500 to-violet-600 bg-clip-text text-transparent font-playfair">
                    {folder?.name || 'Loading...'}
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    {folder ? `${folder.totalNotes} notes in this folder` : 'Loading folder details...'}
                  </p>
                  {folder && (
                    <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                        <span>{folder.totalNotes} notes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Last updated {new Date(normalizeDate(folder.updatedAt)).toLocaleDateString()}</span>
                      </div>
                    </div>
                  )}
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
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-lg">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search notes in this folder..."
              className="pl-12 h-12 bg-background/70 backdrop-blur-sm border-white/20 focus:border-violet-400/50 transition-colors text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <MaterialLoadingSkeleton />
        ) : error ? (
          <ErrorState 
            error={error}
            onRetry={refetch}
          />
        ) : !folder ? (
          <div className="text-center py-16 bg-muted/20 rounded-xl border border-dashed">
            <p className="text-muted-foreground">Folder not found</p>
          </div>
        ) : folder.notes.length === 0 ? (
          <div className="relative text-center py-20">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 rounded-2xl"></div>
            <div className="relative bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm border border-white/20 rounded-2xl p-12 shadow-xl">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-violet-100/80 to-purple-100/60 dark:from-violet-900/40 dark:to-purple-900/20 rounded-2xl flex items-center justify-center">
                <FileText className="w-10 h-10 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                {searchTerm ? 'No notes found' : 'No notes in this folder'}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {searchTerm ? 'Try adjusting your search terms or browse all notes in this folder' : 'This folder is empty. Add some notes to get started!'}
              </p>
              {searchTerm && (
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm('')}
                  className="bg-background/70 backdrop-blur-sm border-white/20 hover:bg-violet-50/50 dark:hover:bg-violet-950/50 transition-all duration-300"
                >
                  Clear Search
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {folder.notes.map((note, index) => (
                <APINoteCard
                  key={normalizeId(note._id)}
                  note={note}
                  index={index}
                  onClick={() => handleNoteClick(normalizeId(note._id))}
                />
              ))}
            </div>

            {/* Background decoration */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-purple-500/10 to-violet-500/10 rounded-full blur-2xl pointer-events-none"></div>
          </div>
        )}
      </div>
    </motion.div>
  );
}