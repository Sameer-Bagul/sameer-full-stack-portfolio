import { useParams, useNavigate } from 'react-router-dom';
import { useStudyAPI } from '@/hooks/useStudyAPI';
import { StudyMaterialViewer } from '@/components/study/StudyMaterialViewer';
import { Button } from '@/components/ui/button';
import { StudyPageLoadingSkeleton } from '@/components/study/LoadingStates';
import { EmptyState } from '@/components/study/ErrorStates';
import { ArrowLeft } from 'lucide-react';

export default function MaterialView() {
  const { materialId } = useParams();
  const navigate = useNavigate();
  const { materials, loading } = useStudyAPI();
  
  const material = materialId ? materials.find(m => m.id === parseInt(materialId)) : null;
  
  if (loading) {
    return <StudyPageLoadingSkeleton />;
  }
  
  if (!material) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <EmptyState
            title="Material not found"
            description="The study material you're looking for doesn't exist or has been moved."
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
    <StudyMaterialViewer 
      material={material} 
      onClose={() => navigate(-1)} 
    />
  );