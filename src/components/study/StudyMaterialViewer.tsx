import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { APINote, normalizeId } from '@/services/notesApi';
import { useTheme } from '@/contexts/ThemeContext';
import { EnhancedTableOfContents } from './EnhancedTableOfContents';
import { EnhancedMaterialContent } from './EnhancedMaterialContent';
import { StudyToolbar } from './StudyToolbar';
import { useIsMobile } from '@/hooks/use-mobile';
import './studyMaterial.css';

interface StudyMaterialViewerProps {
  note: APINote;
  onClose: () => void;
}

export function StudyMaterialViewer({ note, onClose }: StudyMaterialViewerProps) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(note.isPinned);
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
    // Extract headings from HTML content for table of contents
    if (note.content) {
      const headings: {title: string; level: number}[] = [];
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = note.content;
      
      const headingElements = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headingElements.forEach(heading => {
        const level = parseInt(heading.tagName.charAt(1));
        const title = heading.textContent?.trim() || '';
        if (title) {
          headings.push({ level, title });
        }
      });
      
      setTableOfContents(headings);
    }
  }, [note.content]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.7));
  };

  const toggleBookmark = () => {
    setIsBookmarked(prev => !prev);
    toast.success(isBookmarked ? "Bookmark removed" : "Bookmark added");
  };

  const handleDownload = () => {
    // Create a downloadable HTML file
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${note.title}</title>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            h1, h2, h3, h4, h5, h6 { color: #333; }
            pre { background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto; }
            code { background: #f0f0f0; padding: 2px 4px; border-radius: 3px; }
          </style>
        </head>
        <body>
          <h1>${note.title}</h1>
          <p><strong>Created:</strong> ${formatDate(note.createdAt)}</p>
          <p><strong>Last edited:</strong> ${formatDate(note.lastEditedAt)}</p>
          ${note.tags.length > 0 ? `<p><strong>Tags:</strong> ${note.tags.join(', ')}</p>` : ''}
          <hr>
          ${note.content}
        </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Note downloaded successfully");
  };

  const handleShare = () => {
    const shareData = {
      title: note.title,
      text: `Check out this note: ${note.title}`,
      url: window.location.href
    };
    
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Share link copied to clipboard");
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      // Simple search highlighting
      const content = document.querySelector('.prose');
      if (content) {
        const walker = document.createTreeWalker(
          content,
          NodeFilter.SHOW_TEXT,
          null
        );
        
        let node;
        while (node = walker.nextNode()) {
          if (node.textContent?.toLowerCase().includes(searchText.toLowerCase())) {
            const parent = node.parentElement;
            if (parent) {
              parent.scrollIntoView({ behavior: 'smooth', block: 'center' });
              break;
            }
          }
        }
      }
      toast.success(`Searching for: ${searchText}`);
    }
  };

  // Helper to handle MongoDB date format
  function formatDate(date: string | { $date: string } | undefined): string {
    if (!date) return '';
    if (typeof date === 'string') return new Date(date).toLocaleDateString();
    if (typeof date === 'object' && '$date' in date) return new Date(date.$date).toLocaleDateString();
    return '';
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col"
      style={{ minHeight: '100vh' }}
    >
      <StudyToolbar
        title={note.title}
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

      <div className="container pt-16 flex-1">
        <div className="flex flex-col md:flex-row">
          {showSidebar && (
            <EnhancedTableOfContents 
              tableOfContents={tableOfContents}
              material={note}
              toggleSidebar={toggleSidebar}
            />
          )}

          <EnhancedMaterialContent
            note={note}
            showSidebar={showSidebar}
            toggleSidebar={toggleSidebar}
            zoomLevel={zoomLevel}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
          />
        </div>
      </div>
    </motion.div>
  );
}