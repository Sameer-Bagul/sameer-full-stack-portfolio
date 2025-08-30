
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, BookmarkIcon, Download, Share2, 
  Search, ZoomIn, ZoomOut, Menu 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

interface StudyToolbarProps {
  title: string;
  searchText: string;
  setSearchText: (text: string) => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  isBookmarked: boolean;
  toggleBookmark: () => void;
  onClose: () => void;
  handleSearch: (e: React.FormEvent) => void;
  handleDownload: () => void;
  handleShare: () => void;
  isMobile: boolean; // Added this prop to fix the type error
}

export function StudyToolbar({
  title,
  searchText,
  setSearchText,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  isBookmarked,
  toggleBookmark,
  onClose,
  handleSearch,
  handleDownload,
  handleShare,
  isMobile
}: StudyToolbarProps) {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  
  // Handle toolbar visibility on scroll
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollPos = window.scrollY;
      
  //     // Always show toolbar at the top of the page
  //     if (currentScrollPos < 50) {
  //       setVisible(true);
  //       setPrevScrollPos(currentScrollPos);
  //       return;
  //     }
      
  //     // Hide on scroll down, show on scroll up
  //     setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
  //     setPrevScrollPos(currentScrollPos);
  //   };
    
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [prevScrollPos]);
  
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-40 border-b bg-background/95 backdrop-blur"
    >
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <span className="text-lg font-semibold truncate max-w-[300px]">{title}</span>
        </div>
        
        <div className="hidden md:flex items-center gap-2">
          <form onSubmit={handleSearch} className="relative w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search in document..."
              className="pl-8 h-9"
            />
          </form>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom Out</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <span className="text-sm text-muted-foreground">{Math.round(zoomLevel * 100)}%</span>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom In</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Separator orientation="vertical" className="h-6" />
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleBookmark}
            className={isBookmarked ? "text-primary" : ""}
          >
            <BookmarkIcon className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="md:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Options</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 flex flex-col gap-4">
                <form onSubmit={handleSearch}>
                  <Input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search in document..."
                    className="w-full"
                  />
                </form>
                
                <div className="flex items-center justify-between">
                  <span>Zoom</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={onZoomOut}>
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{Math.round(zoomLevel * 100)}%</span>
                    <Button variant="outline" size="icon" onClick={onZoomIn}>
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    onClick={toggleBookmark}
                    className="flex flex-col items-center gap-1 h-auto py-3"
                    variant="outline"
                  >
                    <BookmarkIcon className={`h-5 w-5 ${isBookmarked ? "text-primary" : ""}`} />
                    <span className="text-xs">Bookmark</span>
                  </Button>
                  <Button 
                    onClick={handleDownload}
                    className="flex flex-col items-center gap-1 h-auto py-3"
                    variant="outline"
                  >
                    <Download className="h-5 w-5" />
                    <span className="text-xs">Download</span>
                  </Button>
                  <Button 
                    onClick={handleShare}
                    className="flex flex-col items-center gap-1 h-auto py-3"
                    variant="outline"
                  >
                    <Share2 className="h-5 w-5" />
                    <span className="text-xs">Share</span>
                  </Button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </motion.div>
  );
}
