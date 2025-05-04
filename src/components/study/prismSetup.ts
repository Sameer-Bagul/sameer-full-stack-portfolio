
import Prism from 'prismjs';

// Import core styles
import 'prismjs/themes/prism-tomorrow.css';

// Import languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-graphql';

// Initialize Prism
export const initializePrism = () => {
  if (typeof window !== 'undefined') {
    window.Prism = Prism;
    Prism.highlightAll();
  }
};

// Helper function to get display language name
export const getDisplayLanguage = (lang: string): string => {
  const languageMap: Record<string, string> = {
    'js': 'JavaScript',
    'jsx': 'React JSX',
    'ts': 'TypeScript',
    'tsx': 'React TSX',
    'py': 'Python',
    'rb': 'Ruby',
    'java': 'Java',
    'cpp': 'C++',
    'c': 'C',
    'cs': 'C#',
    'go': 'Go',
    'rust': 'Rust',
    'sh': 'Bash',
    'bash': 'Bash',
    'shell': 'Shell',
    'html': 'HTML',
    'css': 'CSS',
    'scss': 'SCSS',
    'sql': 'SQL',
    'graphql': 'GraphQL',
    'json': 'JSON',
    'yaml': 'YAML',
    'yml': 'YAML',
    'md': 'Markdown',
    'xml': 'XML',
    'dockerfile': 'Dockerfile',
    'docker': 'Docker',
  };

  return languageMap[lang] || lang.charAt(0).toUpperCase() + lang.slice(1);
};

// Provide a type definition for the global Prism object
declare global {
  interface Window {
    Prism: typeof Prism;
  }
}

export default Prism;
