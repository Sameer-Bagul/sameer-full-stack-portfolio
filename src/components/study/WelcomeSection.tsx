
import { Book, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function WelcomeSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 rounded-2xl border p-8 relative overflow-hidden welcome-card"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm z-0"></div>
      <div className="absolute w-40 h-40 rounded-full bg-primary/5 top-4 right-4 z-0"></div>
      <div className="absolute w-32 h-32 rounded-full bg-primary/10 -bottom-10 -left-10 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-violet-400 via-purple-500 to-violet-600 z-10"></div>
      
      <div className="relative z-10">
        <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <Book size={32} className="text-primary" />
        </div>
        
        <h2 className="text-3xl font-bold mb-4 font-playfair">Study Library</h2>
        
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Browse through this collection of study materials, notes, and resources. 
          Select a folder to explore its contents or use the search function to find specific materials.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" className="gap-2">
            <Search size={16} />
            Browse Library
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
