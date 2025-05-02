
import { useState, useEffect } from 'react';
import { Check, Copy, Terminal, File } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface CodeSnippetProps {
  language: string;
  code: string;
  filename?: string;
}

export function CodeSnippet({ language, code, filename }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const displayLang = language === 'js' ? 'javascript' : language;
  
  useEffect(() => {
    // Highlight code when component mounts or code changes
    if (typeof window !== 'undefined' && (window as any).Prism) {
      setTimeout(() => {
        (window as any).Prism.highlightAll();
      }, 10);
    }
  }, [code, language]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied to clipboard');
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <div className="relative my-6 rounded-md overflow-hidden border border-border/70 bg-muted/30 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/80 border-b border-border/70">
        <div className="flex items-center gap-2">
          {filename ? (
            <File size={14} className="text-muted-foreground" />
          ) : (
            <Terminal size={14} className="text-muted-foreground" />
          )}
          <span className="text-xs font-mono font-medium text-muted-foreground">
            {filename || displayLang}
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-7 gap-1.5 text-xs"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-500" />
              <span className="text-green-500">Copied</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>
      
      <div className="p-4 max-h-[500px] overflow-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
        <pre className={cn(
          "text-sm font-mono tab-size-2",
          `language-${language}`
        )}>
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
}
