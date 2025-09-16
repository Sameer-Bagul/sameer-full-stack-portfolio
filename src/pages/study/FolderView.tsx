import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, SortAsc, SortDesc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFolderNotes } from '@/hooks/useNotesAPI';
import { APINoteCard } from '@/components/study/APINoteCard';
import { NotePagination } from '@/components/study/NotePagination';
import { MaterialLoadingSkeleton } from '@/components/study/LoadingStates';
import { ErrorState } from '@/components/study/ErrorStates';
import { normalizeId } from '@/services/notesApi';

export default function FolderView() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('lastEditedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 12;

  const { folder, loading, error, refetch } = useFolderNotes(slug || null, {
    page: currentPage,
    limit: notesPerPage,
    search: searchTerm,
    sortBy,
    order: sortOrder
  });

  // Reset page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, sortOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate('/study')} className="font-sans">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Study
            </Button>
          </div>
          <MaterialLoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error || !folder) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate('/study')} className="font-sans">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Study
            </Button>
          </div>
          <ErrorState error={error} onRetry={refetch} />
        </div>
      </div>
    );
  }

  const totalNotes = folder.totalNotes || folder.notes.length;
  const totalPages = Math.ceil(totalNotes / notesPerPage);

  return (
    <div className="min-h-screen  pt-20 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" onClick={() => navigate('/study')} className="mb-6 font-sans">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Study
          </Button>
          
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 font-space-grotesk text-foreground">
              {folder.name}
            </h1>
            <p className="text-sm text-muted-foreground mt-2 font-sans">
              {totalNotes} note{totalNotes !== 1 ? 's' : ''}
            </p>
          </div>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 font-sans"
                />
              </div>
            </form>
            
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-40 font-sans">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lastEditedAt" className="font-sans">Last Edited</SelectItem>
                  <SelectItem value="createdAt" className="font-sans">Date Created</SelectItem>
                  <SelectItem value="title" className="font-sans">Title</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" onClick={toggleSortOrder} size="icon">
                {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Notes Grid */}
        {folder.notes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground text-lg font-sans">
              {searchTerm ? 'No notes found matching your search.' : 'No notes in this folder yet.'}
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {folder.notes.map((note, index) => (
                <motion.div
                  key={normalizeId(note._id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <APINoteCard
                    note={note}
                    index={index}
                    onClick={() => navigate(`/study/note/${slug}/${normalizeId(note._id)}`)}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            <NotePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalNotes={totalNotes}
              notesPerPage={notesPerPage}
            />
          </>
        )}
      </div>
    </div>
  );
}