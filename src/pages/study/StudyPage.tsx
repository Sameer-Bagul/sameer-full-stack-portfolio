import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAllFolders } from '@/data/studyFolders';
import { WelcomeSection } from '@/components/study/WelcomeSection';
import { FolderView } from '@/components/study/FolderView';

const StudyPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  // Handle folder selection
  const handleSelectFolder = (folderId: number) => {
    navigate(`/study/folder/${folderId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="container px-4 mx-auto">
        {/* Header with Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-violet-400 via-purple-500 to-violet-600 bg-clip-text text-transparent font-playfair">
              Study Library
            </h1>
            <p className="text-muted-foreground">
              Browse through your study materials and resources
            </p>
          </div>
          
          <div className="w-full md:w-auto flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search materials..."
                className="w-full md:w-64 pl-9 bg-background/70 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="mt-6">
          <WelcomeSection />
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-6 font-playfair">Study Folders</h2>
            <FolderView 
              folders={getAllFolders()} 
              onSelectFolder={handleSelectFolder}
              currentFolderId={null}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudyPage; 