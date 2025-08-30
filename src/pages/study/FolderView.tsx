import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFolderNotes } from '@/hooks/useNotesAPI';
import { APINoteCard } from '@/components/study/APINoteCard';
import { normalizeId } from '@/services/notesApi';
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
      className="min-h-screen pt-24 pb-16"
    >
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-violet-400 via-purple-500 to-violet-600 bg-clip-text text-transparent font-playfair">
                {folder?.name || 'Loading...'}
              </h1>
              <p className="text-muted-foreground">
                {folder ? `${folder.totalNotes} notes in this folder` : 'Loading folder details...'}
              </p>
            </div>
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

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search notes..."
              className="pl-9 bg-background/70 backdrop-blur-sm"
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
          <div className="text-center py-16 bg-muted/20 rounded-xl border border-dashed">
            <p className="text-muted-foreground mb-2">
              {searchTerm ? 'No notes found matching your search' : 'No notes in this folder yet'}
            </p>
            {searchTerm && (
              <p className="text-sm text-muted-foreground">
                Try adjusting your search terms
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {folder.notes.map((note, index) => (
              <APINoteCard
                key={normalizeId(note._id)}
                note={note}
                index={index}
                onClick={() => handleNoteClick(normalizeId(note._id))}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}