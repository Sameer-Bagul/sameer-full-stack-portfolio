
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={toggleTheme}
          className="rounded-full p-2.5 bg-primary/10 hover:bg-primary/20 text-primary backdrop-blur-sm transition-all hover:scale-110 active:scale-95 duration-200"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Toggle {theme === 'dark' ? 'light' : 'dark'} mode</p>
      </TooltipContent>
    </Tooltip>
  );
};
