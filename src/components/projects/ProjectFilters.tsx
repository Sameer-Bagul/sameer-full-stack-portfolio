import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ProjectFiltersProps {
  activeFilter: 'all' | 'freelance' | 'hackathon' | 'personal';
  searchQuery: string;
  onFilterChange: (filter: 'all' | 'freelance' | 'hackathon' | 'personal') => void;
  onSearchChange: (query: string) => void;
}

export const ProjectFilters = ({
  activeFilter,
  searchQuery,
  onFilterChange,
  onSearchChange
}: ProjectFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Segmented Filter Buttons */}
      <div className="flex items-center bg-muted/50 rounded-lg p-1 border border-border/40">
        <button
          onClick={() => onFilterChange('all')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            activeFilter === 'all'
              ? 'bg-background text-foreground shadow-sm border border-border/40'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          All
        </button>
        <div className="w-px h-4 bg-border/40 mx-1"></div>
        <button
          onClick={() => onFilterChange('freelance')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            activeFilter === 'freelance'
              ? 'bg-background text-foreground shadow-sm border border-border/40'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Freelancing work
        </button>
        <div className="w-px h-4 bg-border/40 mx-1"></div>
        <button
          onClick={() => onFilterChange('hackathon')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            activeFilter === 'hackathon'
              ? 'bg-background text-foreground shadow-sm border border-border/40'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Hackathon projects
        </button>
        <div className="w-px h-4 bg-border/40 mx-1"></div>
        <button
          onClick={() => onFilterChange('personal')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            activeFilter === 'personal'
              ? 'bg-background text-foreground shadow-sm border border-border/40'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Personal projects
        </button>
      </div>
    </div>
  );
};