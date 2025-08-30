import { Routes, Route } from 'react-router-dom';
import StudyPage from './StudyPage';
import FolderView from './FolderView';
import NoteView from './NoteView';

export default function StudyRoutes() {
  return (
    <Routes>
      <Route index element={<StudyPage />} />
      <Route path="folder/:slug" element={<FolderView />} />
      <Route path="note/:slug/:noteId" element={<NoteView />} />
    </Routes>
  );
} 