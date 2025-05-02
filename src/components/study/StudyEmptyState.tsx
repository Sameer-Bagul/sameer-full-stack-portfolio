
import { FileText, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function StudyEmptyState() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-16 text-center"
    >
      <div className="notebook-paper mx-auto max-w-md p-12 rounded-lg">
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-6">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          
          <h3 className="text-xl font-medium mb-4">No study materials found</h3>
          
          <p className="text-muted-foreground mb-6">
            Try adjusting your search or filter criteria
          </p>
          
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Add New Material
          </Button>
          
          <div className="text-sm text-muted-foreground mt-6">
            Or select a different category from the tabs above
          </div>
        </div>
        
        <div className="page-fold"></div>
      </div>
    </motion.div>
  );
}
