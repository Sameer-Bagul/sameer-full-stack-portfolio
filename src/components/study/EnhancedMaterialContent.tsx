import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  AlignLeft, ZoomIn, ZoomOut, Copy, Check,
  Clock, Calendar, BookOpen, Tag, User 
} from 'lucide-react';
import { StudyMaterial } from '@/data/studyData';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { useMarkdownProcessor } from './useMarkdownProcessor';
import { ScrollArea } from '../ui/scroll-area';
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
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function EnhancedMaterialContent({
  material,
  showSidebar,
  toggleSidebar,
  zoomLevel,
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
  onZoomIn,
  onZoomOut
}: EnhancedMaterialContentProps) {
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [estimatedReadTime, setEstimatedReadTime] = useState('10 min read');
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Use the custom hook for markdown processing
  const { renderPageContent, totalPages: calculatedTotalPages } = useMarkdownProcessor(material.content);
  
  // Calculate estimated read time 
  if (material.content) {
    const wordsPerMinute = 200;
    const wordCount = material.content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    if (readTime !== parseInt(estimatedReadTime)) {
      setEstimatedReadTime(`${readTime} min read`);
    }
  }
  
  // Detect theme from the document
  useState(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
    
    const observer = new MutationObserver(() => {
      const isDarkNow = document.documentElement.classList.contains('dark');
      setTheme(isDarkNow ? 'dark' : 'light');
    });
    
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  });
  
  // Handle copy content functionality
  const handleCopyContent = () => {
    if (material.content) {
      navigator.clipboard.writeText(material.content);
      setCopied(true);
      toast.success("Content copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderMetadata = () => (
    <div className="material-meta">
      {material.author && (
        <div className="meta-item">
          <User size={16} />
          <span>{material.author}</span>
        </div>
      )}
      <div className="meta-item">
        <Calendar size={16} />
        <span>{material.date}</span>
      </div>
      <div className="meta-item">
        <Clock size={16} />
        <span>{material.estimatedReadTime || estimatedReadTime}</span>
      </div>
      <div className="meta-item">
        <BookOpen size={16} />
        <span>{material.fileSize || '32 KB'}</span>
      </div>
      <div className="ml-auto">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleCopyContent}
          className="h-8 hover:bg-muted"
        >
          {copied ? <Check size={16} className="text-green-500 mr-2" /> : <Copy size={16} className="mr-2" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
  
  const renderTags = () => (
    <div className="flex flex-wrap gap-2 mb-5">
      {material.tags.map(tag => (
        <Badge key={tag} variant="outline" className="py-1 font-normal">
          <Tag className="w-3 h-3 mr-1" />
          {tag}
        </Badge>
      ))}
    </div>
  );

  const renderZoomControls = () => (
    <div className="flex items-center gap-1 mt-6 mb-4 justify-end">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onZoomOut} 
        className="h-8 w-8 rounded-full"
      >
        <ZoomOut size={15} />
      </Button>
      <span className="text-sm text-muted-foreground w-16 text-center">
        {Math.round(zoomLevel * 100)}%
      </span>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onZoomIn}
        className="h-8 w-8 rounded-full"
      >
        <ZoomIn size={15} />
      </Button>
    </div>
  );
  
  const renderDifficultyBadge = () => {
    if (!material.difficulty) return null;
    
    const difficultyColors = {
      'Beginner': 'bg-green-100 text-green-800 border-green-200',
      'Intermediate': 'bg-blue-100 text-blue-800 border-blue-200',
      'Advanced': 'bg-purple-100 text-purple-800 border-purple-200',
    };
    
    const colorClass = difficultyColors[material.difficulty as keyof typeof difficultyColors] || '';
    
    return (
      <div className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${colorClass}`}>
        {material.difficulty}
      </div>
    );
  };

  const renderPrerequisites = () => {
    if (!material.prerequisites || material.prerequisites.length === 0) return null;
    
    return (
      <div className="mt-8 p-5 border rounded-lg bg-muted/30">
        <h4 className="text-sm font-semibold mb-3 font-playfair">Prerequisites</h4>
        <ul className="list-disc list-inside space-y-1.5">
          {material.prerequisites.map((prerequisite, index) => (
            <li key={index} className="text-sm text-muted-foreground">{prerequisite}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex-1 ${showSidebar ? 'ml-6 md:ml-8' : ''} px-4 md:px-0 pb-12`}
    >
      {!showSidebar && (
        <Button
          variant="outline"
          size="sm"
          onClick={toggleSidebar}
          className="mb-6 flex items-center gap-1.5 shadow-sm"
        >
          <AlignLeft size={16} />
          <span>Show Contents</span>
        </Button>
      )}
      
      {renderZoomControls()}
      
      <div 
        ref={contentRef}
        className={`notebook-paper rounded-xl shadow-lg overflow-hidden ${
          theme === 'dark' ? 'paper-lines-dark' : 'paper-lines-light'
        }`}
        style={{ 
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'top left', 
        }}
      >
        <article className="font-playfair">
          <div className="material-header">
            <h1 className="material-title text-3xl md:text-4xl">{material.title}</h1>
            <p className="material-description">{material.description}</p>
            
            {renderTags()}
            {renderMetadata()}
          </div>
          
          <div className="px-6 md:px-10 pb-12">
            {renderPageContent(currentPage - 1)}
            {renderPrerequisites()}
          </div>
          
          <div className="page-fold"></div>
        </article>
      </div>
      
      {calculatedTotalPages > 1 && (
        <div className="flex items-center justify-center mt-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={handlePrevPage}
                  className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {currentPage > 2 && (
                <PaginationItem>
                  <PaginationLink onClick={() => handlePrevPage()}>1</PaginationLink>
                </PaginationItem>
              )}
              
              {currentPage > 3 && (
                <PaginationItem>
                  <span className="flex h-9 w-9 items-center justify-center">...</span>
                </PaginationItem>
              )}
              
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationLink onClick={() => handlePrevPage()}>
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              
              <PaginationItem>
                <PaginationLink isActive>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
              
              {currentPage < calculatedTotalPages && (
                <PaginationItem>
                  <PaginationLink onClick={() => handleNextPage()}>
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              
              {currentPage < calculatedTotalPages - 2 && (
                <PaginationItem>
                  <span className="flex h-9 w-9 items-center justify-center">...</span>
                </PaginationItem>
              )}
              
              {currentPage < calculatedTotalPages - 1 && (
                <PaginationItem>
                  <PaginationLink onClick={() => handleNextPage()}>
                    {calculatedTotalPages}
                  </PaginationLink>
                </PaginationItem>
              )}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={handleNextPage}
                  className={currentPage >= calculatedTotalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </motion.div>
  );
}
