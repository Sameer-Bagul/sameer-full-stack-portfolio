import { useParams, useNavigate } from 'react-router-dom';
import { studyMaterials } from '@/data/studyData';
import { StudyMaterialViewer } from '@/components/study/StudyMaterialViewer';
import { Button } from '@/components/ui/button';

export default function MaterialView() {
  const { materialId } = useParams();
  const navigate = useNavigate();
  
  const material = materialId ? studyMaterials.find(m => m.id === parseInt(materialId)) : null;
  
  if (!material) {
    return (
      <div className="container px-4 pt-24">
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold mb-4">Material not found</h2>
          <Button onClick={() => navigate('/study')}>Back to Study Library</Button>
        </div>
      </div>
    );
  }

  return (
    <StudyMaterialViewer 
      material={material} 
      onClose={() => navigate(-1)} 
    />
  );
} 