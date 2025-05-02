// DATA: 2 folders, each with 2 subfolders, and each (folder AND subfolder) has 2 notes
import { Folder, FileText, Book } from "lucide-react";
import { StudyMaterial as FullStudyMaterial } from './studyData';

// Simple Material type for internal use
type SimpleMaterial = {
  id: number;
  title: string;
  description: string;
  content: string;
  tags: string[];
};

export const studyMaterials: SimpleMaterial[] = [
  // Main Folder 1 materials
  {
    id: 1,
    title: "Introduction to React",
    description: "Core concepts and fundamentals of React development",
    content: "Content for React introduction",
    tags: ["react", "frontend", "basics"],
  },
  {
    id: 2,
    title: "React Hooks Deep Dive",
    description: "Advanced usage of React hooks and state management",
    content: "Content for React hooks",
    tags: ["react", "hooks", "advanced"],
  },
  // Subfolder 1.1
  {
    id: 3,
    title: "Component Lifecycle",
    description: "Understanding React component lifecycle methods",
    content: "Content for component lifecycle",
    tags: ["react", "components", "lifecycle"],
  },
  {
    id: 4,
    title: "State Management",
    description: "Different approaches to managing state in React",
    content: "Content for state management",
    tags: ["react", "state", "management"],
  },
  // Subfolder 1.2
  {
    id: 5,
    title: "Performance Optimization",
    description: "Tips and tricks for optimizing React applications",
    content: "Content for performance optimization",
    tags: ["react", "performance", "optimization"],
  },
  {
    id: 6,
    title: "Testing Strategies",
    description: "Best practices for testing React components",
    content: "Content for testing strategies",
    tags: ["react", "testing", "jest"],
  },

  // Main Folder 2 materials
  {
    id: 7,
    title: "TypeScript Basics",
    description: "Introduction to TypeScript fundamentals",
    content: "Content for TypeScript basics",
    tags: ["typescript", "basics"],
  },
  {
    id: 8,
    title: "Advanced Types",
    description: "Advanced TypeScript types and type manipulation",
    content: "Content for advanced types",
    tags: ["typescript", "advanced"],
  },
  // Subfolder 2.1
  {
    id: 9,
    title: "Type Inference",
    description: "Understanding TypeScript type inference",
    content: "Content for type inference",
    tags: ["typescript", "types"],
  },
  {
    id: 10,
    title: "Generics",
    description: "Working with TypeScript generics",
    content: "Content for generics",
    tags: ["typescript", "generics"],
  },
  // Subfolder 2.2
  {
    id: 11,
    title: "Project Configuration",
    description: "Setting up TypeScript projects",
    content: "Content for project configuration",
    tags: ["typescript", "config"],
  },
  {
    id: 12,
    title: "Integration Guide",
    description: "Integrating TypeScript with other tools",
    content: "Content for integration guide",
    tags: ["typescript", "integration"],
  },
];

// FOLDER TYPE
export type StudyFolder = {
  id: number;
  name: string;
  description: string;
  icon: any;
  color: string;
  materials: number[];
  subfolders?: number[];
  parentId?: number;
  updatedAt?: string;
  lastViewed?: string;
  isProtected?: boolean;
  tags?: string[];
};

export const studyFolders: StudyFolder[] = [
  // ROOT 1
  {
    id: 1,
    name: "React Mastery",
    description: "Complete guide to modern React development",
    icon: Book,
    color: "blue",
    materials: [1, 2],
    subfolders: [3, 4],
    updatedAt: "2 days ago",
    lastViewed: "1 hour ago",
    tags: ["react", "frontend", "web"],
  },
  {
    id: 3,
    name: "Core Concepts",
    description: "Essential React concepts and patterns",
    icon: Book,
    color: "purple",
    materials: [3, 4],
    parentId: 1,
    updatedAt: "1 week ago",
    lastViewed: "3 hours ago",
    tags: ["fundamentals", "components"],
  },
  {
    id: 4,
    name: "Advanced Topics",
    description: "Advanced React development techniques",
    icon: Book,
    color: "green",
    materials: [5, 6],
    parentId: 1,
    updatedAt: "5 days ago",
    lastViewed: "2 days ago",
    tags: ["advanced", "optimization"],
  },

  // ROOT 2
  {
    id: 2,
    name: "TypeScript Journey",
    description: "Comprehensive TypeScript learning path",
    icon: Book,
    color: "orange",
    materials: [7, 8],
    subfolders: [5, 6],
    updatedAt: "1 day ago",
    lastViewed: "5 hours ago",
    tags: ["typescript", "javascript"],
  },
  {
    id: 5,
    name: "Type System",
    description: "Deep dive into TypeScript's type system",
    icon: Book,
    color: "magenta",
    materials: [9, 10],
    parentId: 2,
    updatedAt: "3 days ago",
    lastViewed: "1 day ago",
    tags: ["types", "inference"],
  },
  {
    id: 6,
    name: "Project Setup",
    description: "TypeScript project setup and tooling",
    icon: Book,
    color: "cyan",
    materials: [11, 12],
    parentId: 2,
    updatedAt: "4 days ago",
    lastViewed: "2 days ago",
    tags: ["configuration", "tools"],
  }
];

// --- Helper functions ---
export function getFolderById(id: number): StudyFolder | undefined {
  return studyFolders.find((folder) => folder.id === id);
}
export function getRootFolders(): StudyFolder[] {
  return studyFolders.filter((folder) => !folder.parentId);
}
export function getSubfolders(folderId: number): StudyFolder[] {
  return studyFolders.filter((folder) => folder.parentId === folderId);
}
export function getFolderMaterials(folderId: number): FullStudyMaterial[] {
  const folder = getFolderById(folderId);
  if (!folder) return [];
  return folder.materials.map(
    (id) => {
      const simpleMaterial = studyMaterials.find((material) => material.id === id);
      if (!simpleMaterial) {
        // Provide a default material object in case the ID isn't found
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
        };
      }
      
      // Convert simple material to full material
      return {
        ...simpleMaterial,
        category: "notes",
        date: "Jan 1, 2023",
        fileSize: "1 KB",
        icon: FileText
      };
    }
  );
}
// Function to get the path from root to a folder
export function getFolderPath(folderId: number): StudyFolder[] {
  const path: StudyFolder[] = [];
  let currentFolder = getFolderById(folderId);
  
  // Build path from current folder up to root
  while (currentFolder) {
    path.unshift(currentFolder); // Add to beginning of array
    
    // Stop if we've reached a root folder (no parent)
    if (!currentFolder.parentId) break;
    
    // Move up to parent folder
    currentFolder = getFolderById(currentFolder.parentId);
  }
  
  return path;
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
      gradient: "bg-gradient-to-br from-pink-50 to-rose-100/80 dark:from-pink-900/50 dark:to-rose-900/60"
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

// Function to calculate total items in a folder including subfolders
export function getFolderTotalSize(folderId: number): number {
  // Get direct materials in this folder
  const folder = getFolderById(folderId);
  if (!folder) return 0;
  
  let totalCount = folder.materials.length;
  
  // Add materials from all subfolders recursively
  const subfolders = getSubfolders(folderId);
  for (const subfolder of subfolders) {
    totalCount += getFolderTotalSize(subfolder.id);
  }
  
  return totalCount;
}
