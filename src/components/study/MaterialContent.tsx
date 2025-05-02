
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, PanelLeft, Calendar, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { StudyMaterial } from "@/data/studyData";
import { useTheme } from "@/contexts/ThemeContext";
import { getCategoryColor } from "./noteColors";

interface MaterialContentProps {
  material: StudyMaterial;
  showSidebar: boolean;
  toggleSidebar: () => void;
  zoomLevel: number;
  currentPage: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

export function MaterialContent({ 
  material,
  showSidebar,
  toggleSidebar,
  zoomLevel,
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage
}: MaterialContentProps) {
  const { theme } = useTheme();
  const colors = getCategoryColor(material.category);

  return (
    <div className={`flex-1 ${!showSidebar ? 'container' : ''}`}>
      {!showSidebar && (
        <Button
          variant="outline" 
          size="sm"
          className="mb-4 hidden md:flex items-center"
          onClick={toggleSidebar}
        >
          <PanelLeft className="h-4 w-4 mr-2" />
          Show Table of Contents
        </Button>
      )}
      
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8 pt-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className={`${colors.bg} ${colors.text} border-none capitalize`}>
              {material.category}
            </Badge>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {material.date}
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {Math.ceil(material.content?.length || 0 / 1000)} min read
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{material.title}</h1>
          
          <p className="text-muted-foreground mb-4 text-lg">
            {material.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {material.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <div 
          className="notebook-paper min-h-[70vh] mb-8 relative"
          style={{ 
            transform: `scale(${zoomLevel})`, 
            transformOrigin: 'top center',
            transition: 'transform 0.2s ease-in-out'
          }}
        >
          <div className={`border rounded-lg shadow-sm p-8 relative z-10 ${
            theme === 'dark' ? 'paper-lines-dark' : 'paper-lines-light'
          }`}>
            <div className="prose prose-blue dark:prose-invert max-w-none">
              {material.content ? (
                <ReactMarkdown>{material.content}</ReactMarkdown>
              ) : (
                <p className="text-muted-foreground italic">
                  No content available for this material.
                </p>
              )}
            </div>
          </div>
          
          <div className="page-fold"></div>
        </div>
        
        <div className="flex items-center justify-between mb-12">
          <Button 
            variant="outline" 
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          
          <Button 
            variant="outline"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="gap-2"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
