
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Building, ExternalLink, Download, Share2, ZoomIn, ZoomOut } from 'lucide-react';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Achievement {
  id: number;
  title: string;
  organization: string;
  date: string;
  description: string;
  type: string;
  icon: React.ComponentType;
  color: string;
  details: string;
  image?: string;
}

interface AchievementDetailDialogProps {
  achievement: Achievement | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AchievementDetailDialog({ 
  achievement, 
  isOpen, 
  onClose 
}: AchievementDetailDialogProps) {
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  
  if (!achievement) return null;
  
  const handleDownload = () => {
    toast.success('Achievement certificate downloaded');
  };
  
  const handleShare = () => {
    toast.success('Share link copied to clipboard');
  };
  
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'award': return 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300';
      case 'certificate': return 'bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300';
      default: return 'bg-muted text-muted-foreground';
    }
  };
  
  const toggleZoom = () => {
    setIsImageZoomed(!isImageZoomed);
  };
  
  const typeBadgeColor = getTypeBadgeColor(achievement.type);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl">{achievement.title}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[80vh]">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className={typeBadgeColor}>
                  {achievement.type === 'award' ? 'Award' : 'Certificate'}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Building className="w-3.5 h-3.5" />
                <span className="mr-2">{achievement.organization}</span>
                <Calendar className="w-3.5 h-3.5" />
                <span>{achievement.date}</span>
              </div>
            </div>
            
            <div
              className={`relative transition-all duration-300 ${
                isImageZoomed ? 'z-50 fixed inset-0 bg-black/80 flex items-center justify-center' : 'w-full rounded-lg overflow-hidden'
              }`}
            >
              <img
                src={achievement.image || `https://source.unsplash.com/random/800x600?${achievement.type}`}
                alt={achievement.title}
                className={`object-cover transition-all duration-300 ${
                  isImageZoomed 
                    ? 'max-h-[90vh] max-w-[90vw] object-contain cursor-zoom-out' 
                    : 'h-48 sm:h-64 w-full cursor-zoom-in hover:opacity-95 hover:shadow-lg'
                }`}
                onClick={toggleZoom}
              />
              
              {isImageZoomed ? (
                <button 
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  onClick={toggleZoom}
                >
                  <ZoomOut size={20} />
                </button>
              ) : (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="p-2 bg-black/50 rounded-full">
                    <ZoomIn className="text-white w-6 h-6" />
                  </div>
                </div>
              )}
            </div>
            
            <p className="text-foreground">{achievement.details}</p>
            
            <div className="flex items-center gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center gap-1.5">
                <Share2 size={16} />
                Share
              </Button>
              <Button size="sm" onClick={handleDownload} className="flex items-center gap-1.5">
                <Download size={16} />
                Download Certificate
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
