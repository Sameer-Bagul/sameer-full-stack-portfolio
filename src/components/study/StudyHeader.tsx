
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface StudyHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  viewMode: 'grid' | 'list' | 'table';
  setViewMode: (mode: 'grid' | 'list' | 'table') => void;
}

export function StudyHeader({ searchTerm, setSearchTerm, viewMode, setViewMode }: StudyHeaderProps) {
  return (
    <div className="relative overflow-hidden mb-12 py-12 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Digital Study Library
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg mb-8"
          >
            Access your personal collection of study materials, notes, and resources all in one place
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row items-center gap-4 max-w-2xl mx-auto"
          >
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search for study materials..." 
                className="pl-10 w-full" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`w-9 h-9 flex items-center justify-center rounded ${
                  viewMode === 'grid' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
                aria-label="Grid view"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 1h5v5h-5V1zm7 0h5v5h-5V1zm-7 7h5v5h-5V8zm7 0h5v5h-5V8z" fill="currentColor" fillRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`w-9 h-9 flex items-center justify-center rounded ${
                  viewMode === 'list' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
                aria-label="List view"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 3a.5.5 0 01.5-.5h11a.5.5 0 010 1H2a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h11a.5.5 0 010 1H2a.5.5 0 01-.5-.5zm.5 2.5a.5.5 0 000 1h11a.5.5 0 000-1H2zm0 3a.5.5 0 000 1h11a.5.5 0 000-1H2z" fill="currentColor" fillRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`w-9 h-9 flex items-center justify-center rounded ${
                  viewMode === 'table' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
                aria-label="Table view"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1h13v2H1V1zm0 3h13v3H1V4zm0 4h13v3H1V8zm0 4h13v2H1v-2z" fill="currentColor" fillRule="evenodd" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-40 h-40 md:w-72 md:h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-primary/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-2xl"></div>
    </div>
  );
}
