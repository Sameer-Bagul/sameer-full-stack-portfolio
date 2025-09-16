import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { APINote, normalizeId } from '@/services/notesApi';
import { useTheme } from '@/contexts/ThemeContext';
import { EnhancedTableOfContents } from './EnhancedTableOfContents';
import { NoteContent } from './NoteContent';
import { StudyToolbar } from './StudyToolbar';
import { NoteContentSkeleton } from './LoadingStates';
import { useIsMobile } from '@/hooks/use-mobile';

interface NoteViewerProps {
  note: APINote;
  onClose: () => void;
}

export function NoteViewer({ note, onClose }: NoteViewerProps) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(note?.isPinned || false);
  const [tableOfContents, setTableOfContents] = useState<{title: string; level: number}[]>([]);
  const [isLoading, setIsLoading] = useState(!note);
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  
  // Zoom features removed
  
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

  // Zoom features removed

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
      className="min-h-screen flex flex-col relative overflow-hidden mt-8"
    >
      {/* Enhanced glassmorphic background */}
      <div className="fixed inset-0 -z-10">
        {/* Primary gradient background */}
        <div className={`absolute inset-0 ${theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950' 
          : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
        }`}></div>
        
        {/* Animated gradient orbs */}
        <div className={`absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-purple-600 to-pink-600' 
            : 'bg-gradient-to-br from-purple-400 to-pink-400'
        }`}></div>
        <div className={`absolute bottom-40 left-20 w-80 h-80 rounded-full blur-3xl opacity-15 animate-pulse delay-1000 ${
          theme === 'dark' 
            ? 'bg-gradient-to-tr from-blue-600 to-cyan-600' 
            : 'bg-gradient-to-tr from-blue-400 to-cyan-400'
        }`}></div>
        <div className={`absolute top-1/2 left-1/3 w-64 h-64 rounded-full blur-3xl opacity-10 animate-pulse delay-500 ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-emerald-600 to-teal-600' 
            : 'bg-gradient-to-r from-emerald-400 to-teal-400'
        }`}></div>
        
        {/* Glassmorphic noise pattern */}
        <div className={`absolute inset-0 opacity-30 ${
          theme === 'dark'
            ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.05)_0%,transparent_50%),radial-gradient(circle_at_40%_80%,rgba(255,119,198,0.05)_0%,transparent_50%)]'
            : 'bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.05)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1)_0%,transparent_50%),radial-gradient(circle_at_40%_80%,rgba(147,51,234,0.1)_0%,transparent_50%)]'
        }`}></div>

        {/* Subtle grid pattern */}
        <div 
          className={`absolute inset-0 opacity-[0.03] ${
            theme === 'dark' 
              ? 'bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]' 
              : 'bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)]'
          } bg-[size:50px_50px]`}
        ></div>
      </div>

      {/* Glassmorphic StudyToolbar */}
      <div className="relative z-20">
        <StudyToolbar
          title={note.title} 
          isBookmarked={isBookmarked}
          toggleBookmark={toggleBookmark}
          onClose={onClose}
          handleDownload={handleDownload}
          handleShare={handleShare}
          isMobile={isMobile}
          // Dummy zoom props to maintain interface compatibility
        />
      </div>

      <div className="container pt-16 flex-1 relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          {showSidebar && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="md:w-80 flex-shrink-0"
            >
              {/* Glassmorphic sidebar container */}
              <div className={`backdrop-blur-xl rounded-2xl border p-6 ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 shadow-2xl shadow-black/20'
                  : 'bg-white/40 border-white/20 shadow-2xl shadow-black/5'
              }`}>
                <EnhancedTableOfContents
                  tableOfContents={tableOfContents}
                  material={note}
                  toggleSidebar={toggleSidebar}
                />
              </div>
            </motion.div>
          )}

          <motion.div
            className="flex-1 min-w-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Glassmorphic content container */}
            <div >
              {isLoading || !note ? (
                <div>
                  <NoteContentSkeleton />
                </div>
              ) : (
                <NoteContent
                  note={note}
                  showSidebar={showSidebar}
                  toggleSidebar={toggleSidebar}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}