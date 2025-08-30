import { useState, useEffect } from 'react';
import { StudyMaterial } from '@/data/studyData';
import { StudyFolder } from '@/data/studyFolders';

interface APIResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

interface UseStudyAPIReturn {
  folders: StudyFolder[];
  materials: StudyMaterial[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  getFolderMaterials: (folderId: number) => StudyMaterial[];
}

// Dummy data for fallback
const dummyFolders: StudyFolder[] = [
  {
    id: 1,
    name: "Frontend Development",
    description: "Modern frontend technologies and frameworks",
    icon: "Layout",
    color: "blue",
    materials: [1, 2],
    updatedAt: "2 days ago",
    lastViewed: "1 hour ago",
    tags: ["react", "javascript", "css"]
  },
  {
    id: 2,
    name: "Backend Development", 
    description: "Server-side development and APIs",
    icon: "Server",
    color: "green",
    materials: [3, 4],
    updatedAt: "1 day ago",
    lastViewed: "3 hours ago",
    tags: ["nodejs", "api", "database"]
  },
  {
    id: 3,
    name: "Data Structures & Algorithms",
    description: "Core computer science concepts",
    icon: "Brain",
    color: "purple",
    materials: [5],
    updatedAt: "3 days ago",
    lastViewed: "2 days ago",
    tags: ["algorithms", "data-structures"]
  }
];

const dummyMaterials: StudyMaterial[] = [
  {
    id: 1,
    title: "React Hooks Fundamentals",
    description: "Learn the basics of React hooks and state management",
    category: "notes",
    tags: ["react", "hooks", "javascript"],
    date: "Dec 15, 2024",
    fileSize: "45 KB",
    icon: "BookOpen",
    difficulty: "Beginner",
    estimatedReadTime: "12 mins",
    content: "# React Hooks Fundamentals\n\nReact hooks are functions that let you use state and other React features..."
  },
  {
    id: 2,
    title: "Advanced CSS Grid",
    description: "Master CSS Grid layout for complex designs",
    category: "cheatsheet",
    tags: ["css", "grid", "layout"],
    date: "Dec 10, 2024",
    fileSize: "32 KB",
    icon: "FileText",
    difficulty: "Intermediate",
    estimatedReadTime: "8 mins"
  }
];

export function useStudyAPI(): UseStudyAPIReturn {
  const [folders, setFolders] = useState<StudyFolder[]>([]);
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate random API failure (20% chance)
      if (Math.random() < 0.2) {
        throw new Error('API server unavailable');
      }

      // In real implementation, this would be actual API calls
      const foldersResponse: APIResponse<StudyFolder[]> = {
        success: true,
        data: dummyFolders
      };

      const materialsResponse: APIResponse<StudyMaterial[]> = {
        success: true,
        data: dummyMaterials
      };

      if (foldersResponse.success && materialsResponse.success) {
        setFolders(foldersResponse.data);
        setMaterials(materialsResponse.data);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (err) {
      console.warn('API failed, using fallback data:', err);
      setError('Using offline data');
      // Use fallback data
      setFolders(dummyFolders);
      setMaterials(dummyMaterials);
    } finally {
      setLoading(false);
    }
  };

  const getFolderMaterials = (folderId: number): StudyMaterial[] => {
    const folder = folders.find(f => f.id === folderId);
    if (!folder) return [];
    
    return folder.materials.map(materialId => 
      materials.find(m => m.id === materialId)
    ).filter(Boolean) as StudyMaterial[];
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    folders,
    materials,
    loading,
    error,
    refetch: fetchData,
    getFolderMaterials
  };
}