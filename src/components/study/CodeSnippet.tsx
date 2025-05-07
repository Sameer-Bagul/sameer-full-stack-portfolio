
import { useState, useEffect } from 'react';
import { Check, Copy, Terminal, FileCode } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getDisplayLanguage } from './prismSetup';

interface CodeSnippetProps {
  language: string;
  code: string;
  filename?: string;
}

export function CodeSnippet({ language, code, filename }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);
  // Normalize language identifier
  const normalizedLang = language === 'js' ? 'javascript' : language;
  const displayLang = getDisplayLanguage(normalizedLang);
  
  useEffect(() => {
    // Highlight code when component mounts or code changes
    if (typeof window !== 'undefined' && window.Prism) {
      setTimeout(() => {
        window.Prism.highlightAll();
      }, 10);
    }
  }, [code, language]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(cleanCode);
    setCopied(true);
    toast.success('Code copied to clipboard');
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  // Clean code by removing unnecessary paragraph tags and HTML tags
  const cleanCode = code
    .replace(/^```\w*\n|```$/g, '')
    .replace(/<pre><code[^>]*>/g, '')
    .replace(/<\/code><\/pre>/g, '')
    .replace(/<p class="book-paragraph">|<\/p>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
  
  return (
    <div className="relative my-8 rounded-xl overflow-hidden border border-border/60 bg-muted/30 shadow-md hover:shadow-lg transition-shadow book-code-block">
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/50 border-b border-border/50">
        <div className="flex items-center gap-2">
          {filename ? (
            <FileCode size={16} className="text-primary/80" />
          ) : (
            <Terminal size={16} className="text-primary/80" />
          )}
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
      
      <div className="p-5 max-h-[500px] overflow-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
        <pre className={cn("m-0 p-0 bg-transparent text-sm font-mono")}>
          <code className={`language-${normalizedLang}`}>{cleanCode}</code>
        </pre>
      </div>
    </div>
  );
}
