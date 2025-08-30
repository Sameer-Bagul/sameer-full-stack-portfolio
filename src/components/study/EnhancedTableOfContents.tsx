
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, BookOpen, ListOrdered, Hash, Bookmark } from 'lucide-react';
import { APINote } from '@/services/notesApi';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { getCategoryColor } from './noteColors';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

interface EnhancedTableOfContentsProps {
  tableOfContents: { title: string; level: number }[];
  material: APINote;
  toggleSidebar: () => void;
}

export function EnhancedTableOfContents({ tableOfContents, material, toggleSidebar }: EnhancedTableOfContentsProps) {
  const [activeHeading, setActiveHeading] = useState<string | null>(tableOfContents[0]?.title || null);
  const categoryColors = getCategoryColor('notes');
  const isMobile = useIsMobile();
  
  // Track headings visibility based on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const title = id.replace(/-/g, ' ');
            setActiveHeading(title);
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe all heading elements
    setTimeout(() => {
      const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headingElements.forEach((element) => {
        if (element.id) {
          observer.observe(element);
        }
      });
    }, 500);
    
    return () => observer.disconnect();
  }, [material.content]);
  
  const scrollToSection = (title: string) => {
    setActiveHeading(title);
    const element = document.getElementById(title.replace(/\s+/g, '-').toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Calculate estimated reading time (fallback if not provided in the material)
  const estimatedReadTime = material.content ? Math.ceil(material.content.length / 1000) : 5;
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`w-72 border-r border-border/50 flex flex-col sticky top-20 h-[calc(100vh-120px)] ${isMobile ? 'absolute z-50 bg-background/95 backdrop-blur-md' : ''}`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h3 className="font-semibold flex items-center gap-2">
          <ListOrdered size={18} />
          Contents
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <ChevronLeft size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Hide sidebar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={16} className="text-muted-foreground" />
          <h4 className="font-medium text-base line-clamp-2">
            {material.title}
          </h4>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge className={`${categoryColors.bg} ${categoryColors.text} border-notes-300`}>
            notes
          </Badge>
          <span className="text-xs text-muted-foreground">
            {estimatedReadTime} min read
          </span>
        </div>
        <div className="mt-3 text-xs text-muted-foreground">
          {material.tags.map(tag => (
            <Badge key={tag} variant="outline" className="mr-1 mb-1">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="px-4 py-3">
        <h4 className="font-medium text-sm flex items-center gap-1.5 mb-3 text-muted-foreground">
          <Hash size={14} />
          Sections
        </h4>
      </div>
      
      <ScrollArea className="flex-1 px-4 enhanced-scroll-area">
        <div className="space-y-1 pl-1 pb-4">
          {tableOfContents.length > 0 ? (
            tableOfContents.map((heading, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className={`w-full justify-start text-left pl-${heading.level + 1} ${
                  activeHeading === heading.title 
                    ? 'bg-accent text-accent-foreground font-medium' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => scrollToSection(heading.title)}
              >
                <div className="flex items-center gap-2 truncate">
                  <span 
                    className={`inline-block w-1 h-1 rounded-full ${
                      activeHeading === heading.title ? 'bg-primary' : 'bg-muted-foreground'
                    }`}
                  />
                  <span className="truncate">{heading.title}</span>
                </div>
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No sections found</p>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t mt-auto">
        <Button variant="outline" className="w-full flex items-center gap-2" size="sm">
          <Bookmark size={16} />
          Bookmark
        </Button>
      </div>
    </motion.div>
  );
}
