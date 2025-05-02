
import { motion } from 'framer-motion';
import { FolderPlus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FolderEmptyState() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-16 text-center"
    >
      <div className="notebook-paper mx-auto max-w-md p-12 rounded-lg">
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <FolderPlus className="h-8 w-8 text-primary" />
          </div>
          
          <h3 className="text-xl font-medium mb-4">Your Study Library</h3>
          
          <p className="text-muted-foreground mb-6">
            Create folders to organize your study materials for a better learning experience
          </p>
          
          <Button className="gap-2">
            <Plus size={16} />
            Create Your First Folder
          </Button>
          
          <div className="page-fold"></div>
        </div>
      </div>
    </motion.div>
  );
}
