
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  AlignLeft, ZoomIn, ZoomOut, Copy, Check,
  Clock, Calendar, BookOpen, Tag, User, Share, Download, ThumbsUp, 
  Bookmark, Eye, MessageSquare
} from 'lucide-react';
import { StudyMaterial } from '@/data/studyData';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { useMarkdownProcessor } from './useMarkdownProcessor';
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
  const { processedContent, renderPageContent } = useMarkdownProcessor(material.content);
  
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
    <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm border-b pb-4 mb-4">
      {material.author && (
        <div className="flex items-center gap-1">
          <User size={14} />
          <span>{material.author}</span>
        </div>
      )}
      <div className="flex items-center gap-1">
        <Calendar size={14} />
        <span>{material.date}</span>
      </div>
      <div className="flex items-center gap-1">
        <Clock size={14} />
        <span>{material.estimatedReadTime || estimatedReadTime}</span>
      </div>
      <div className="flex items-center gap-1">
        <BookOpen size={14} />
        <span>{material.fileSize}</span>
      </div>
      <div className="flex items-center gap-1">
        <Eye size={14} />
        <span>426 views</span>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleCopyContent}
          className="h-8 w-8"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8"
          onClick={() => toast.success("Material bookmarked!")}
        >
          <Bookmark size={16} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8"
          onClick={() => toast.success("Sharing link copied!")}
        >
          <Share size={16} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8"
          onClick={() => toast.success("Downloading material...")}
        >
          <Download size={16} />
        </Button>
      </div>
    </div>
  );
  
  const renderTags = () => (
    <div className="flex flex-wrap gap-2 mb-5">
      {material.tags.map(tag => (
        <Badge key={tag} variant="outline" className="py-1">
          <Tag className="w-3 h-3 mr-1" />
          {tag}
        </Badge>
      ))}
    </div>
  );

  const renderZoomControls = () => (
    <div className="flex items-center gap-1 mt-4 mb-2 justify-end">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onZoomOut} 
        className="h-8 w-8"
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
        className="h-8 w-8"
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
      <div className="mt-6 p-4 border rounded-lg bg-muted/30">
        <h4 className="text-sm font-semibold mb-2">Prerequisites</h4>
        <ul className="list-disc list-inside space-y-1">
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
      
      {renderZoomControls()}
      
      <div 
        ref={contentRef}
        className={`article-container notebook-paper rounded-xl shadow-md overflow-hidden ${
          theme === 'dark' ? 'paper-lines-dark' : 'paper-lines-light'
        }`}
        style={{ 
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'top left', 
        }}
      >
        <article className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none enhanced-note">
          <div className="article-header">
            <div className="flex justify-between items-start">
              <h1 className="text-primary font-bold mb-1">{material.title}</h1>
              {renderDifficultyBadge()}
            </div>
            
            <p className="text-muted-foreground">{material.description}</p>
            
            {renderTags()}
            {renderMetadata()}
          </div>
          
          {renderPageContent()}
          {renderPrerequisites()}
          
          <div className="mt-8 pt-4 border-t flex justify-between items-center">
            <div className="flex items-center gap-6">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => toast.success("Liked!")}
              >
                <ThumbsUp size={16} />
                <span>Like</span>
              </Button>
              <Button
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => toast.success("Comment submitted!")}
              >
                <MessageSquare size={16} />
                <span>Comment</span>
              </Button>
            </div>
            <Button
              variant="outline" 
              size="sm"
              onClick={() => window.print()}
            >
              Print
            </Button>
          </div>
          
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
              
              {currentPage > 2 && (
                <PaginationItem>
                  <PaginationLink>1</PaginationLink>
                </PaginationItem>
              )}
              
              {currentPage > 3 && (
                <PaginationItem>
                  <span className="flex h-9 w-9 items-center justify-center">...</span>
                </PaginationItem>
              )}
              
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationLink onClick={handlePrevPage}>
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              
              <PaginationItem>
                <PaginationLink isActive>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationLink onClick={handleNextPage}>
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              
              {currentPage < totalPages - 2 && (
                <PaginationItem>
                  <span className="flex h-9 w-9 items-center justify-center">...</span>
                </PaginationItem>
              )}
              
              {currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}
              
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
