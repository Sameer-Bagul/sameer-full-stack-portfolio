import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFolderNotes } from '@/hooks/useNotesAPI';
import { normalizeId, normalizeDate } from '@/services/notesApi';
import { StudyPageLoadingSkeleton } from '@/components/study/LoadingStates';
import { ErrorState } from '@/components/study/ErrorStates';
import { NoteViewer } from '@/components/study/NoteViewer';

const NoteView = () => {
  const { slug, noteId } = useParams<{ slug: string; noteId: string }>();
  const navigate = useNavigate();
  const { folder, loading, error } = useFolderNotes(slug || null);

  const note = folder?.notes.find(n => normalizeId(n._id) === noteId);

  const handleBack = () => {
    navigate(`/study/folder/${slug}`);
  };

  // If we have the note, show it in the material viewer
  if (note) {
    return (
      <NoteViewer 
        note={note} 
        onClose={handleBack} 
      />
    );
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24 pb-80"
      >
        <div className="container px-4 mx-auto">
          <StudyPageLoadingSkeleton />
        </div>
      </motion.div>
    );
  }

  if (error || !note) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24 pb-16"
      >
        <div className="container px-4 mx-auto">
          <ErrorState 
            error={error || 'Note not found'}
            onRetry={() => navigate(`/study/folder/${slug}`)}
          />
        </div>
      </motion.div>
    );
  }
};

export default NoteView;