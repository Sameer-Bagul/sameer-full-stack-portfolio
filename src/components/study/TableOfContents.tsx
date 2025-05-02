
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { StudyMaterial } from "@/data/studyData";

interface TableOfContentsProps {
  tableOfContents: { title: string; level: number }[];
  material: StudyMaterial;
  toggleSidebar: () => void;
}

export function TableOfContents({ tableOfContents, material, toggleSidebar }: TableOfContentsProps) {
  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      className="hidden md:block w-64 shrink-0 border-r pr-4"
    >
      <div className="sticky top-20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Table of Contents</h3>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={toggleSidebar}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-10rem)] hide-scrollbar">
          <div className="space-y-1 pr-4">
            {tableOfContents.length > 0 ? (
              tableOfContents.map((heading, index) => (
                <Button 
                  key={index}
                  variant="ghost"
                  className={`justify-start text-left w-full hover:bg-muted/50 transition-colors`}
                  style={{ paddingLeft: `${heading.level * 0.5}rem` }}
                >
                  <span className="truncate">{heading.title}</span>
                </Button>
              ))
            ) : (
              <p className="text-sm text-muted-foreground p-2">
                No table of contents available
              </p>
            )}
          </div>
        </ScrollArea>
        
        <div className="mt-6 space-y-4">
          <div>
            <span className="text-sm font-medium">Last Updated</span>
            <p className="text-sm text-muted-foreground">{material.date}</p>
          </div>
          
          <div>
            <span className="text-sm font-medium">Tags</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {material.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
