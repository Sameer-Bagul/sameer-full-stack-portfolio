import { Routes, Route } from 'react-router-dom';
import StudyPage from './StudyPage';
import FolderView from './FolderView';
import MaterialView from './MaterialView';

export default function StudyRoutes() {
  return (
    <Routes>
      <Route index element={<StudyPage />} />
      <Route path="folder/:folderId" element={<FolderView />} />
      <Route path="material/:materialId" element={<MaterialView />} />
    </Routes>
  );
} 