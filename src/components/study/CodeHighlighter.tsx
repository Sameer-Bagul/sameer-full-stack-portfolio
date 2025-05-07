
import { useState } from 'react';
import { Check, Copy, FileCode } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getDisplayLanguage } from './prismSetup';

interface CodeHighlighterProps {
  language: string;
  code: string;
  filename?: string;
}

export function CodeHighlighter({ language, code, filename }: CodeHighlighterProps) {
  const [copied, setCopied] = useState(false);
  const normalizedLang = language === 'js' ? 'javascript' : language;
  const displayLang = getDisplayLanguage(normalizedLang);
  
  // Ensure code highlighting gets applied
  setTimeout(() => {
    if (typeof window !== 'undefined' && window.Prism) {
      window.Prism.highlightAll();
    }
  }, 10);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(cleanedCode);
    setCopied(true);
    toast.success('Code copied to clipboard');
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  // Clean code by removing any HTML tags or paragraph wrappers
  const cleanedCode = code
    .replace(/^```\w*\n|```$/g, '')
    .replace(/<\/?pre>|<\/?code[^>]*>/g, '')
    .replace(/<p class="book-paragraph">|<\/p>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
  
  return (
    <div className="relative my-8 rounded-xl overflow-hidden border border-border/60 bg-muted/30 shadow-md book-code-block">
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/50 border-b border-border/50">
        <div className="flex items-center gap-2">
          <FileCode size={16} className="text-primary/80" />
          <span className="text-xs font-mono font-medium">
            {filename || displayLang}
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-7 gap-1.5 text-xs hover:bg-muted"
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
      
      <div className="p-5 max-h-[500px] overflow-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent code-content">
        <pre className={cn("m-0 p-0 bg-transparent text-sm font-mono tab-size-2")}>
          <code className={`language-${normalizedLang}`}>{cleanedCode}</code>
        </pre>
      </div>
    </div>
  );
}
