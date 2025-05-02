
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { StudyMaterial } from '@/data/studyData';
import { useTheme } from '@/contexts/ThemeContext';
import { EnhancedTableOfContents } from './EnhancedTableOfContents';
import { EnhancedMaterialContent } from './EnhancedMaterialContent';
import { StudyToolbar } from './StudyToolbar';
import { initializePrism } from './prismSetup';
import { useIsMobile } from '@/hooks/use-mobile';
import './studyMaterial.css';

interface StudyMaterialViewerProps {
  material: StudyMaterial;
  onClose: () => void;
}

export function StudyMaterialViewer({ material, onClose }: StudyMaterialViewerProps) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [tableOfContents, setTableOfContents] = useState<{title: string; level: number}[]>([]);
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  
  // Automatically hide sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setShowSidebar(false);
    }
  }, [isMobile]);

  useEffect(() => {
    // Initialize Prism for code highlighting
    initializePrism();
    
    if (material.content) {
      const headings: {title: string; level: number}[] = [];
      const lines = material.content.split('\n');
      
      lines.forEach(line => {
        const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
        if (headingMatch) {
          headings.push({
            level: headingMatch[1].length,
            title: headingMatch[2].trim()
          });
        }
      });
      
      setTableOfContents(headings);
    }
    
    // Initialize code highlighting
    if (typeof window !== 'undefined' && (window as any).Prism) {
      setTimeout(() => {
        (window as any).Prism.highlightAll();
      }, 100);
    }
  }, [material.content]);

  // Calculate total pages based on content length - more sophisticated calculation
  const calculateTotalPages = () => {
    if (!material.content) return 1;
    
    // Calculate based on content length
    const contentChars = material.content.length;
    const charsPerPage = isMobile ? 1500 : 3000; // Fewer characters per page on mobile
    
    return Math.max(1, Math.ceil(contentChars / charsPerPage));
  };

  const totalPages = calculateTotalPages();

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.7));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const toggleBookmark = () => {
    setIsBookmarked(prev => !prev);
    toast.success(isBookmarked ? "Bookmark removed" : "Bookmark added");
  };

  const handleDownload = () => {
    toast.success("Downloading material...");
    // Actual download functionality would be implemented here
  };

  const handleShare = () => {
    toast.success("Share link copied to clipboard");
    // Actual share functionality would be implemented here
  };

  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      toast.success(`Searching for: ${searchText}`);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16 pb-8 bg-background"
    >
      <StudyToolbar
        title={material.title}
        searchText={searchText}
        setSearchText={setSearchText}
        zoomLevel={zoomLevel}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        isBookmarked={isBookmarked}
        toggleBookmark={toggleBookmark}
        onClose={onClose}
        handleSearch={handleSearch}
        handleDownload={handleDownload}
        handleShare={handleShare}
        isMobile={isMobile}
      />

      <div className="container pt-16">
        <div className="flex flex-col md:flex-row">
          {showSidebar && (
            <EnhancedTableOfContents 
              tableOfContents={tableOfContents}
              material={material}
              toggleSidebar={toggleSidebar}
            />
          )}

          <EnhancedMaterialContent
            material={material}
            showSidebar={showSidebar}
            toggleSidebar={toggleSidebar}
            zoomLevel={zoomLevel}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        </div>
      </div>
    </motion.div>
  );
}
