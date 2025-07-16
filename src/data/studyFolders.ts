// DATA: Simple folders with notes
import { Folder, FileText, Book, NotebookPen, BookOpen } from "lucide-react";
import { StudyMaterial, studyMaterials } from './studyData';

// FOLDER TYPE
export type StudyFolder = {
  id: number; 
  name: string;
  description: string;
  icon: any;
  color: string;
  materials: number[];
  updatedAt?: string;
  lastViewed?: string;
  isProtected?: boolean;
  tags?: string[];
};

// Define folders that match the content from studyData.ts
export let studyFolders: StudyFolder[] = [
  {
    id: 1,
    name: "React Development",
    description: "Modern React development guides and best practices",
    icon: Book,
    color: "blue",
    // Contains "Introduction to React Hooks" (ID: 1)
    materials: [1],
    updatedAt: "2 days ago",
    lastViewed: "1 hour ago",
    tags: ["react", "frontend", "hooks"],
  },
  {
    id: 2,
    name: "TypeScript Guide",
    description: "Advanced TypeScript features and patterns",
    icon: NotebookPen,
    color: "purple",
    // Contains "Advanced TypeScript Features" (ID: 2)
    materials: [2],
    updatedAt: "1 day ago",
    lastViewed: "5 hours ago",
    tags: ["typescript", "javascript"],
  },
  {
    id: 3,
    name: "JavaScript Concepts",
    description: "Core JavaScript concepts and patterns",
    icon: BookOpen,
    color: "orange",
    // Contains "Understanding Closures in JavaScript" (ID: 3)
    materials: [3],
    updatedAt: "3 days ago",
    lastViewed: "2 days ago",
    tags: ["javascript", "closures", "fundamentals"],
  },
  {
    id: 4,
    name: "CSS & Layout",
    description: "Modern CSS techniques and layouts",
    icon: Book,
    color: "green",
    // Contains "CSS Grid Layout: Complete Guide" (ID: 4)
    materials: [4],
    updatedAt: "4 days ago",
    lastViewed: "1 day ago",
    tags: ["css", "layout", "frontend"],
  },
  {
    id: 5,
    name: "Data Structures & Algorithms",
    description: "Implementation and analysis of common algorithms",
    icon: Book,
    color: "magenta",
    // Contains "Algorithms: Binary Search Tree Implementation" (ID: 5)
    materials: [5],
    updatedAt: "5 days ago",
    lastViewed: "3 days ago",
    tags: ["algorithms", "data-structures", "computer-science"],
  },
  {
    id: 6,
    name: "Backend Development",
    description: "Server-side development and API design",
    icon: Book,
    color: "cyan",
    // Contains "Node.js: Build a RESTful API" (ID: 6)
    materials: [6],
    updatedAt: "6 days ago",
    lastViewed: "4 days ago",
    tags: ["nodejs", "api", "backend"],
  },
  {
    id: 7,
    name: "Version Control",
    description: "Git and GitHub workflows and best practices",
    icon: Book,
    color: "blue",
    // Contains "Git and GitHub Workflow" (ID: 7)
    materials: [7],
    updatedAt: "7 days ago",
    lastViewed: "2 days ago",
    tags: ["git", "github", "version-control"],
  },
  {
    id: 8,
    name: "Rt Camp Interview Questions",
    description: "Best practices and common interview questions",
    icon: Book,
    color: "red",
    materials: [8],
    updatedAt: "1 day ago",
    lastViewed: "1 hour ago",
    tags: ["rtCamp", "Placement", "interview"],
  }
];

// Helper function to generate a new ID for materials
function getNextMaterialId(): number {
  return Math.max(...studyMaterials.map(m => m.id), 0) + 1;
}

// Helper function to generate a new ID for folders
function getNextFolderId(): number {
  return Math.max(...studyFolders.map(f => f.id), 0) + 1;
}

// Helper function to format date
function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  return `${hours} hour${hours > 1 ? 's' : ''} ago`;
}

// Function to add a new material
export function addMaterial(material: Omit<StudyMaterial, 'id'>): StudyMaterial {
  const newMaterial = {
    ...material,
    id: getNextMaterialId(),
  };
  
  studyMaterials.push(newMaterial);
  return newMaterial;
}

// Function to add a new folder
export function addFolder(folder: Omit<StudyFolder, 'id' | 'updatedAt' | 'lastViewed'>): StudyFolder {
  const newFolder = {
    ...folder,
    id: getNextFolderId(),
    updatedAt: formatDate(new Date()),
    lastViewed: formatDate(new Date()),
  };
  
  studyFolders.push(newFolder);
  return newFolder;
}

// Function to add material to a folder
export function addMaterialToFolder(folderId: number, materialId: number): boolean {
  const folder = getFolderById(folderId);
  if (!folder) return false;
  
  if (!folder.materials.includes(materialId)) {
    folder.materials.push(materialId);
    folder.updatedAt = formatDate(new Date());
    return true;
  }
  return false;
}

// Function to remove material from a folder
export function removeMaterialFromFolder(folderId: number, materialId: number): boolean {
  const folder = getFolderById(folderId);
  if (!folder) return false;
  
  const index = folder.materials.indexOf(materialId);
  if (index > -1) {
    folder.materials.splice(index, 1);
    folder.updatedAt = formatDate(new Date());
    return true;
  }
  return false;
}

// Function to delete a material
export function deleteMaterial(materialId: number): boolean {
  const index = studyMaterials.findIndex(m => m.id === materialId);
  if (index > -1) {
    // Remove the material from all folders first
    studyFolders.forEach(folder => {
      removeMaterialFromFolder(folder.id, materialId);
    });
    
    // Then remove the material itself
    studyMaterials.splice(index, 1);
    return true;
  }
  return false;
}

// Function to delete a folder
export function deleteFolder(folderId: number): boolean {
  const index = studyFolders.findIndex(f => f.id === folderId);
  if (index > -1) {
    studyFolders.splice(index, 1);
    return true;
  }
  return false;
}

// --- Existing helper functions ---
export function getFolderById(id: number): StudyFolder | undefined {
  return studyFolders.find((folder) => folder.id === id);
}

export function getAllFolders(): StudyFolder[] {
  return studyFolders;
}

export function getFolderMaterials(folderId: number): StudyMaterial[] {
  const folder = getFolderById(folderId);
  if (!folder) return [];
  
  // This now directly uses the materials from studyData.ts
  return folder.materials.map(id => {
    const material = studyMaterials.find(m => m.id === id);
    if (!material) {
      return {
        id: -1,
        title: "Not Found",
        description: "This material could not be found",
        category: "notes",
        tags: [],
        date: "Unknown",
        fileSize: "0 KB",
        icon: FileText,
        content: ""
      } as StudyMaterial;
    }
    return material;
  });
}

// Function to calculate total items in a folder
export function getFolderTotalSize(folderId: number): number {
  const folder = getFolderById(folderId);
  return folder ? folder.materials.length : 0;
}

// Function to get materials by tag
export function getMaterialsByTag(tag: string): StudyMaterial[] {
  return studyMaterials.filter(material => 
    material.tags.includes(tag.toLowerCase())
  );
}

// Function to get folders by tag
export function getFoldersByTag(tag: string): StudyFolder[] {
  return studyFolders.filter(folder => 
    folder.tags?.includes(tag.toLowerCase())
  );
}

// Function to get related materials
export function getRelatedMaterials(materialId: number): StudyMaterial[] {
  const material = studyMaterials.find(m => m.id === materialId);
  if (!material) return [];
  
  return studyMaterials.filter(m => 
    m.id !== materialId && // Don't include the current material
    m.tags.some(tag => material.tags.includes(tag)) // Has at least one matching tag
  );
}

// Minimal color style for folders
export function getFolderColor(colorName: string) {
  const fallback = { 
    text: "text-primary", 
    accent: "ring-primary", 
    bg: "bg-primary/5",
    hover: "hover:bg-primary/10",
    gradient: "bg-gradient-to-br from-slate-50 to-slate-100/80 dark:from-slate-800/50 dark:to-slate-900/60"
  };
  
  const colors = {
    blue: {
      text: "text-blue-600 dark:text-blue-400",
      accent: "ring-blue-400",
      bg: "bg-blue-50/80 dark:bg-blue-900/20",
      hover: "hover:bg-blue-100 dark:hover:bg-blue-800/30",
      gradient: "bg-gradient-to-br from-blue-50 to-indigo-100/80 dark:from-blue-900/50 dark:to-indigo-900/60"
    },
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      accent: "ring-purple-400",
      bg: "bg-purple-50/80 dark:bg-purple-900/20",
      hover: "hover:bg-purple-100 dark:hover:bg-purple-800/30",
      gradient: "bg-gradient-to-br from-purple-50 to-pink-100/80 dark:from-purple-900/50 dark:to-pink-900/60"
    },
    green: {
      text: "text-emerald-600 dark:text-emerald-400",
      accent: "ring-emerald-400",
      bg: "bg-emerald-50/80 dark:bg-emerald-900/20",
      hover: "hover:bg-emerald-100 dark:hover:bg-emerald-800/30",
      gradient: "bg-gradient-to-br from-emerald-50 to-teal-100/80 dark:from-emerald-900/50 dark:to-teal-900/60"
    },
    orange: {
      text: "text-orange-600 dark:text-orange-400",
      accent: "ring-orange-400",
      bg: "bg-orange-50/80 dark:bg-orange-900/20",
      hover: "hover:bg-orange-100 dark:hover:bg-orange-800/30",
      gradient: "bg-gradient-to-br from-orange-50 to-amber-100/80 dark:from-orange-900/50 dark:to-amber-900/60"
    },
    magenta: {
      text: "text-pink-600 dark:text-pink-400",
      accent: "ring-pink-400",
      bg: "bg-pink-50/80 dark:bg-pink-900/20",
      hover: "hover:bg-pink-100 dark:hover:bg-pink-800/30",
      gradient: "bg-gradient-to-br from-pink-50 to-rose-100/80 dark:from-pink-900/50 dark:to-pink-900/60"
    },
    cyan: {
      text: "text-cyan-600 dark:text-cyan-400",
      accent: "ring-cyan-400",
      bg: "bg-cyan-50/80 dark:bg-cyan-900/20",
      hover: "hover:bg-cyan-100 dark:hover:bg-cyan-800/30",
      gradient: "bg-gradient-to-br from-cyan-50 to-sky-100/80 dark:from-cyan-900/50 dark:to-sky-900/60"
    }
  };
  
  return colors[colorName as keyof typeof colors] || fallback;
}
