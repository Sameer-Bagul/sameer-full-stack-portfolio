
import { useState, useEffect } from 'react';
import { CodeHighlighter } from './CodeHighlighter';

export function useMarkdownProcessor(content: string | undefined) {
  const [processedContent, setProcessedContent] = useState<string>('');
  
  // Process content to enhance code blocks and apply book styling
  useEffect(() => {
    if (!content) {
      setProcessedContent('');
      return;
    }
    
    // Process content
    let processedMarkdown = content;
    
    // Process code blocks first (before other formatting)
    // This captures code blocks and preserves them as a special token to prevent other formatting inside
    const codeBlocks: string[] = [];
    processedMarkdown = processedMarkdown.replace(/```(\w+)?\n([\s\S]*?)\n```/g, (match, language, code) => {
      const lang = language || 'text';
      // Store the code block and replace with a placeholder
      const token = `__CODE_BLOCK_${codeBlocks.length}__`;
      codeBlocks.push(`<div class="code-wrapper" data-language="${lang}">${code.trim()}</div>`);
      return token;
    });
    
    // Process headings correctly
    processedMarkdown = processedMarkdown.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, title) => {
      const level = hashes.length;
      const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      return `<h${level} id="${id}" class="heading-${level}">${title}</h${level}>`;
    });
    
    // Process inline code - must happen before paragraphs
    processedMarkdown = processedMarkdown.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    
    // Process bold text
    processedMarkdown = processedMarkdown.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Process italic text
    processedMarkdown = processedMarkdown.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Process blockquotes with book-like styling
    processedMarkdown = processedMarkdown.replace(/^>\s+(.+)$/gm, '<blockquote class="book-quote"><p>$1</p></blockquote>');
    
    // Process unordered lists
    processedMarkdown = processedMarkdown.replace(/^(\s*)-\s+(.+)$/gm, '<li class="book-list-item">$2</li>');
    
    // Process ordered lists
    processedMarkdown = processedMarkdown.replace(/^(\s*)\d+\.\s+(.+)$/gm, '<li class="book-list-item ordered">$2</li>');
    
    // Wrap list items in proper list containers
    processedMarkdown = processedMarkdown.replace(/((<li class="book-list-item ordered">.*<\/li>\n)+)/g, '<ol class="book-ordered-list">$1</ol>');
    processedMarkdown = processedMarkdown.replace(/((<li class="book-list-item">.*<\/li>\n)+)/g, '<ul class="book-list">$1</ul>');
    
    // Process paragraphs (lines that aren't headings, lists, blockquotes, or placeholder tokens)
    processedMarkdown = processedMarkdown.replace(/^(?!(#|<h|<li|<blockquote|__CODE_BLOCK))(.+)$/gm, '<p class="book-paragraph">$2</p>');
    
    // Now restore the code blocks
    codeBlocks.forEach((block, i) => {
      processedMarkdown = processedMarkdown.replace(`__CODE_BLOCK_${i}__`, block);
    });
    
    setProcessedContent(processedMarkdown);
  }, [content]);

  // Function to render the current page's content
  const renderPageContent = () => {
    if (!processedContent) return <div className="text-center py-10 text-muted-foreground">No content available</div>;
    
    const parts = processedContent.split('<div class="code-wrapper"');
    
    return (
      <div className="book-content">
        {parts.map((part, index) => {
          if (index === 0) {
            return <div key={index} className="book-text-content" dangerouslySetInnerHTML={{ __html: part }} />;
          }
          
          const endOfDiv = part.indexOf('</div>');
          if (endOfDiv === -1) return null;
          
          const snippetPart = part.substring(0, endOfDiv);
          const restContent = part.substring(endOfDiv + 6); // 6 is the length of '</div>'
          
          const language = snippetPart.match(/data-language="(.*?)"/)?.[1] || 'text';
          // Extract the code directly without parsing HTML
          const code = snippetPart.substring(
            snippetPart.indexOf('>') + 1
          ).trim();
          
          return (
            <div key={index} className="book-section">
              <CodeHighlighter language={language} code={code} />
              <div className="book-text-content" dangerouslySetInnerHTML={{ __html: restContent }} />
            </div>
          );
        })}
      </div>
    );
  };

  return { processedContent, renderPageContent };
}
