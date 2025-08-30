
// Color palette for study notes based on categories
export const getCategoryColor = (category: string): { bg: string; border: string; text: string } => {
  switch (category.toLowerCase()) {
    case 'notes':
      return {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        border: 'border-blue-300 dark:border-blue-700',
        text: 'text-blue-800 dark:text-blue-100'
      };
    case 'cheatsheet':
      return {
        bg: 'bg-amber-100 dark:bg-amber-900/30',
        border: 'border-amber-300 dark:border-amber-700',
        text: 'text-amber-800 dark:text-amber-100'
      };
    case 'lecture':
      return {
        bg: 'bg-emerald-100 dark:bg-emerald-900/30',
        border: 'border-emerald-300 dark:border-emerald-700',
        text: 'text-emerald-800 dark:text-emerald-100'
      };
    case 'textbook':
      return {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        border: 'border-purple-300 dark:border-purple-700',
        text: 'text-purple-800 dark:text-purple-100'
      };
    default:
      return {
        bg: 'bg-slate-100 dark:bg-slate-800/30',
        border: 'border-slate-300 dark:border-slate-700',
        text: 'text-slate-800 dark:text-slate-100'
      };
  }
};

// Get badge variant based on category
export const getBadgeVariant = (category: string): 
  'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (category.toLowerCase()) {
    case 'notes':
      return 'default';
    case 'cheatsheet':
      return 'outline';
    case 'lecture':
      return 'destructive';
    case 'textbook':
      return 'secondary';
    default:
      return 'outline';
  }
};
