
import { motion } from 'framer-motion';
import { BookOpen, BookmarkIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { StudyMaterial } from '@/data/studyData';

interface StudyListProps {
  materials: StudyMaterial[];
  openMaterialId: number | null;
  onOpenMaterial: (id: number) => void;
  onReadMaterial: (id: number) => void;
}

export function StudyList({ materials, openMaterialId, onOpenMaterial, onReadMaterial }: StudyListProps) {
  return (
    <div className="space-y-4">
      {materials.map((material) => (
        <motion.div
          key={material.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="border rounded-lg overflow-hidden">
            <Accordion 
              type="single" 
              collapsible 
              value={openMaterialId === material.id ? 'content' : undefined}
              onValueChange={(val) => val === 'content' ? onOpenMaterial(material.id) : onOpenMaterial(0)}
            >
              <AccordionItem value="content" className="border-none">
                <div className="flex items-center gap-4 p-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <material.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{material.title}</h3>
                    <p className="text-sm text-muted-foreground">{material.description.substring(0, 60)}...</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="outline" className="capitalize">{material.category}</Badge>
                    <AccordionTrigger className="h-auto p-0 hover:no-underline">
                      <span className="sr-only">Toggle</span>
                    </AccordionTrigger>
                  </div>
                </div>
                
                <AccordionContent className="px-4 pb-4 pt-0">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Content Preview</h4>
                      <div className="prose prose-sm max-w-none">
                        <p>{material.description}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Last updated: {material.date} • {material.fileSize}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between border-t pt-4 mt-4">
                      <div className="flex gap-1 flex-wrap">
                        {material.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <BookmarkIcon size={14} />
                          Save
                        </Button>
                        <Button 
                          size="sm" 
                          className="gap-1"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onReadMaterial(material.id);
                          }}
                        >
                          <BookOpen size={14} />
                          Read
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
