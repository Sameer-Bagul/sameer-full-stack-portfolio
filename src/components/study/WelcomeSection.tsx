
import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function WelcomeSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 bg-background/50 backdrop-blur-sm rounded-xl border p-8 text-center relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute w-40 h-40 rounded-full bg-primary/5 top-4 right-4 z-0"></div>
      <div className="absolute w-32 h-32 rounded-full bg-primary/10 -bottom-10 -left-10 z-0"></div>
      
      <div className="relative z-10">
        <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <Book size={32} className="text-primary" />
        </div>
        
        <h2 className="text-3xl font-bold mb-4">Welcome to Your Study Library</h2>
        
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Access all your study materials in one place. Organize your notes, 
          textbooks, and research papers for efficient learning.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button className="gap-2">
            <PlusCircle size={18} />
            Create New Material
          </Button>
          <Button variant="outline">
            Browse All Materials
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Import here to avoid errors in the component
import { PlusCircle } from "lucide-react";
