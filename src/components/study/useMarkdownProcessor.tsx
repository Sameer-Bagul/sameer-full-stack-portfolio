import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { CodeSnippet } from './CodeSnippet';

export function useMarkdownProcessor(content: string | undefined) {
  // Split content into pages
  const pages = useMemo(() => {
    if (!content) return [];
    
    // Split by headers (# or ## or ###)
    const sections = content.split(/(?=^#{1,3}\s)/m);
    const pagesArray: string[] = [];
    let currentPage = '';
    
    sections.forEach((section) => {
      // If adding this section would make the page too long, start a new page
      if ((currentPage + section).length > 3000) {
        if (currentPage) {
          pagesArray.push(currentPage);
        }
        currentPage = section;
      } else {
        currentPage += section;
      }
    });
    
    // Add the last page
    if (currentPage) {
      pagesArray.push(currentPage);
    }
    
    return pagesArray;
  }, [content]);

  // Custom renderers for markdown components
  const renderers = {
    code: ({node, inline, className, children, ...props}: any) => {
      if (inline) {
        return (
          <code className="px-1.5 py-0.5 rounded-sm bg-muted font-mono text-sm" {...props}>
            {children}
          </code>
        );
      }

      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : 'text';
      const codeContent = String(children).replace(/\n$/, '');
      
      return <CodeSnippet language={language} code={codeContent} />;
    }
  };

  // Function to render content for current page
  const renderPageContent = (pageIndex: number = 0) => {
    if (!content || !pages[pageIndex]) return null;
    
    return (
      <div className="prose prose-blue dark:prose-invert max-w-none">
        <ReactMarkdown components={renderers}>
          {pages[pageIndex]}
        </ReactMarkdown>
      </div>
    );
  };

  return {
    processedContent: content,
    renderPageContent,
    totalPages: pages.length
  };
}
