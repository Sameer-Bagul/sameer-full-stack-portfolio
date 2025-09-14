import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { APINote, normalizeId } from '@/services/notesApi';
import { useTheme } from '@/contexts/ThemeContext';
import { EnhancedTableOfContents } from './EnhancedTableOfContents';
import { EnhancedMaterialContent } from './EnhancedMaterialContent';
import { StudyToolbar } from './StudyToolbar';
import { NoteContentSkeleton } from './LoadingStates';
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
  const [isBookmarked, setIsBookmarked] = useState(note?.isPinned || false);
  const [tableOfContents, setTableOfContents] = useState<{title: string; level: number}[]>([]);
  const [isLoading, setIsLoading] = useState(!note);
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
    if (note?.content) {
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
      setIsLoading(false);
    } else if (note) {
      setIsLoading(false);
    }
  }, [note]);

  // Handle loading state when note changes
  useEffect(() => {
    if (!note) {
      setIsLoading(true);
    }
  }, [note]);

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
    // Create a downloadable HTML file with theme-aware styling
    const isDark = theme === 'dark';
    const htmlContent = `
      <!DOCTYPE html>
      <html class="${isDark ? 'dark' : ''}">
        <head>
          <title>${note.title}</title>
          <meta charset="UTF-8">
          <style>
            :root {
              --background: ${isDark ? '#1a1a1a' : '#ffffff'};
              --foreground: ${isDark ? '#e9ecef' : '#1a1a1a'};
              --muted: ${isDark ? '#a0aec0' : '#6b7280'};
              --border: ${isDark ? '#4a5568' : '#e5e7eb'};
              --code-bg: ${isDark ? '#2d3748' : '#f8f9fa'};
              --inline-code-bg: ${isDark ? '#4a5568' : '#f1f3f4'};
            }
            body {
              font-family: 'Noto Sans', sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              color: var(--foreground);
              background: var(--background);
              line-height: 1.6;
            }
            h1, h2, h3, h4, h5, h6 {
              color: var(--foreground);
              margin: 1.5em 0 0.5em 0;
            }
            h1 { font-size: 2em; }
            h2 { font-size: 1.5em; }
            h3 { font-size: 1.25em; }
            p { margin: 1em 0; }
            pre {
              background: var(--code-bg);
              padding: 15px;
              border-radius: 8px;
              overflow-x: auto;
              border: 1px solid var(--border);
              margin: 1em 0;
              font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
              font-size: 0.9em;
            }
            code {
              background: var(--inline-code-bg);
              padding: 2px 4px;
              border-radius: 4px;
              font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
              font-size: 0.85em;
            }
            blockquote {
              border-left: 4px solid #8b5cf6;
              padding-left: 16px;
              margin: 1em 0;
              color: var(--muted);
              font-style: italic;
            }
            strong { font-weight: 600; }
            em { font-style: italic; }
            ul, ol { margin: 1em 0; padding-left: 2em; }
            li { margin: 0.5em 0; }
            a { color: #8b5cf6; text-decoration: underline; }
            hr { border: none; border-top: 1px solid var(--border); margin: 2em 0; }
            table { width: 100%; border-collapse: collapse; margin: 1em 0; }
            th, td { border: 1px solid var(--border); padding: 8px; text-align: left; }
            th { background: var(--code-bg); font-weight: 600; }
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
        while ((node = walker.nextNode())) {
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
      className="flex flex-col bg-gradient-to-br from-background via-background/95 to-background/90 pb-40 study-viewer-container"
    >
      {/* Background decorations with notebook theme */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl ${theme === 'dark' ? 'bg-gradient-to-br from-amber-500/5 to-orange-500/5' : 'bg-gradient-to-br from-amber-500/8 to-orange-500/8'}`}></div>
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl ${theme === 'dark' ? 'bg-gradient-to-tr from-violet-500/5 to-purple-500/5' : 'bg-gradient-to-tr from-violet-500/8 to-purple-500/8'}`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl ${theme === 'dark' ? 'bg-gradient-to-r from-violet-500/2 via-transparent to-purple-500/2' : 'bg-gradient-to-r from-violet-500/3 via-transparent to-purple-500/3'}`}></div>
        {/* Subtle ruled paper background */}
        <div className={`absolute inset-0 opacity-[0.02] ${theme === 'dark' ? 'bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]' : 'bg-[linear-gradient(rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.3)_1px,transparent_1px)]'} bg-[size:100%_24px,24px_100%]`}></div>
      </div>

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

      <div className="container pt-16 flex-1 relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          {showSidebar && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <EnhancedTableOfContents
                tableOfContents={tableOfContents}
                material={note}
                toggleSidebar={toggleSidebar}
              />
            </motion.div>
          )}

          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {isLoading || !note ? (
              <NoteContentSkeleton />
            ) : (
              <EnhancedMaterialContent
                note={note}
                showSidebar={showSidebar}
                toggleSidebar={toggleSidebar}
                zoomLevel={zoomLevel}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
              />
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}