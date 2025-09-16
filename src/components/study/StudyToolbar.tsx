import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, BookmarkIcon, Download, Share2, 
  Menu 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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
  isBookmarked: boolean;
  toggleBookmark: () => void;
  onClose: () => void;
  handleDownload: () => void;
  handleShare: () => void;
  isMobile: boolean;
}

export function StudyToolbar({
  title,
  isBookmarked,
  toggleBookmark,
  onClose,
  handleDownload,
  handleShare,
  isMobile
}: StudyToolbarProps) {
  const [visible, setVisible] = useState(true);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 backdrop-blur-2xl shadow-2xl bg-white/10 dark:bg-black/10"
    >
      <div className="container flex items-center justify-between h-16 px-4">
        {/* Left section */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full shadow-lg shadow-violet-500/25"></div>
            <span className="text-lg font-semibold truncate max-w-[300px] bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {title}</span>
          </div>
        </div>
        
        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          <Separator orientation="vertical" className="h-6 mx-2 bg-white/20" />

          {/* Bookmark */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleBookmark}
                  className={`hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 ${isBookmarked ? "text-violet-400 bg-violet-500/20" : ""}`}
                >
                  <BookmarkIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bookmark</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Download */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDownload}
                  className="hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Share */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleShare}
                  className="hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {/* Mobile Drawer */}
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
