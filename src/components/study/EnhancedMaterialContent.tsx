
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, AlignLeft } from 'lucide-react';
import { StudyMaterial } from '@/data/studyData';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CodeSnippet } from './CodeSnippet';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface EnhancedMaterialContentProps {
  material: StudyMaterial;
  showSidebar: boolean;
  toggleSidebar: () => void;
  zoomLevel: number;
  currentPage: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

export function EnhancedMaterialContent({
  material,
  showSidebar,
  toggleSidebar,
  zoomLevel,
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage
}: EnhancedMaterialContentProps) {
  const [processedContent, setProcessedContent] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [contentPages, setContentPages] = useState<string[]>([]);
  const isMobile = useIsMobile();
  
  // Detect theme from the document
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
    
    const observer = new MutationObserver(() => {
      const isDarkNow = document.documentElement.classList.contains('dark');
      setTheme(isDarkNow ? 'dark' : 'light');
    });
    
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);
  
  // Process content to enhance code blocks and split into pages
  useEffect(() => {
    if (!material.content) return;
    
    // Process content
    let processedMarkdown = material.content;
    
    // Process headings correctly - replace #s with proper HTML elements
    processedMarkdown = processedMarkdown.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, title) => {
      const level = hashes.length;
      const id = title.toLowerCase().replace(/\s+/g, '-');
      return `<h${level} id="${id}">${title}</h${level}>`;
    });
    
    // Process code blocks
    processedMarkdown = processedMarkdown.replace(/```(\w+)?\n([\s\S]*?)\n```/g, (match, language, code) => {
      const lang = language || 'text';
      const filename = code.match(/\/\/\s*filename:\s*(.*?)$/m)?.[1] || '';
      return `<div class="code-snippet" data-language="${lang}" data-filename="${filename}">${code}</div>`;
    });
    
    // Process inline code
    processedMarkdown = processedMarkdown.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Process bold text
    processedMarkdown = processedMarkdown.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Process italic text
    processedMarkdown = processedMarkdown.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Process lists
    processedMarkdown = processedMarkdown.replace(/^(\s*)-\s+(.+)$/gm, '<li>$2</li>');
    processedMarkdown = processedMarkdown.replace(/^(\s*)\d+\.\s+(.+)$/gm, '<li>$2</li>');
    
    // Process paragraphs (lines that aren't headings or list items)
    processedMarkdown = processedMarkdown.replace(/^(?!(#|<h|<li|<div class="code-snippet"))(.+)$/gm, '<p>$2</p>');
    
    setProcessedContent(processedMarkdown);
    
    // Split content into pages based on content length
    // Roughly 3000 chars per page (adjust based on actual content)
    const contentChars = material.content.length;
    const charsPerPage = isMobile ? 1500 : 3000;
    const calculatedPages = Math.max(1, Math.ceil(contentChars / charsPerPage));
    
    // Create an array of page content
    const pages = [];
    for (let i = 0; i < calculatedPages; i++) {
      const start = i * charsPerPage;
      const end = Math.min(start + charsPerPage, contentChars);
      pages.push(material.content.substring(start, end));
    }
    
    setContentPages(pages);
  }, [material.content, isMobile]);

  // Function to render the current page's content
  const renderPageContent = () => {
    if (!processedContent) return <div>No content available</div>;
    
    const parts = processedContent.split('<div class="code-snippet"');
    
    return (
      <>
        {parts.map((part, index) => {
          if (index === 0) {
            return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
          }
          
          const [snippetPart, restContent] = part.split('</div>');
          const language = snippetPart.match(/data-language="(.*?)"/)?.[1] || 'text';
          const filename = snippetPart.match(/data-filename="(.*?)"/)?.[1] || '';
          const code = snippetPart.substring(
            snippetPart.indexOf('>') + 1,
          ).trim();
          
          return (
            <div key={index}>
              <CodeSnippet language={language} code={code} filename={filename} />
              <div dangerouslySetInnerHTML={{ __html: restContent }} />
            </div>
          );
        })}
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex-1 ${showSidebar ? 'ml-3 md:ml-6' : ''} px-4 md:px-0`}
    >
      {!showSidebar && (
        <Button
          variant="outline"
          size="sm"
          onClick={toggleSidebar}
          className="mb-4 flex items-center gap-1"
        >
          <AlignLeft size={16} />
          <span>Show Contents</span>
        </Button>
      )}
      
      <div 
        className={`notebook-paper rounded-xl shadow-lg overflow-hidden ${
          theme === 'dark' ? 'paper-lines-dark' : 'paper-lines-light'
        }`}
        style={{ 
          padding: isMobile ? '1.5rem' : '3rem', 
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'top left', 
        }}
      >
        <article className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none">
          <h1 className="text-primary font-bold">{material.title}</h1>
          
          {renderPageContent()}
          
          <div className="page-fold"></div>
        </article>
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={handlePrevPage}
                  className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink 
                      isActive={pageNum === currentPage}
                      onClick={() => {}}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={handleNextPage}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </motion.div>
  );
}
