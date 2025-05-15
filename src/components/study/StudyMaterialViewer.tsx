import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { StudyMaterial } from '@/data/studyData';
import { useTheme } from '@/contexts/ThemeContext';
import { EnhancedTableOfContents } from './EnhancedTableOfContents';
import { EnhancedMaterialContent } from './EnhancedMaterialContent';
import { StudyToolbar } from './StudyToolbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMarkdownProcessor } from './useMarkdownProcessor';
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
  
  // Get total pages from the markdown processor
  const { totalPages } = useMarkdownProcessor(material.content);
  
  // Automatically hide sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setShowSidebar(false);
    }
  }, [isMobile]);

  useEffect(() => {
    // Extract headings for table of contents
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
  }, [material.content]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.7));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
          />
        </div>
      </div>
    </motion.div>
  );
}
