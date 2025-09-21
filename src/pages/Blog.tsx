
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, ArrowRight, X, ChevronDown, Search, Tag, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTheme } from "@/contexts/ThemeContext";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Filter } from 'lucide-react';

// Sample blog posts
const blogPosts = [
  {
    id: 1,
    title: 'Building Responsive UIs with Tailwind CSS',
    excerpt: 'Learn how to create beautiful, responsive user interfaces using Tailwind CSS utility classes.',
    content: `
      <p>Tailwind CSS has revolutionized the way developers approach UI design. Instead of writing custom CSS, you can use utility classes directly in your HTML to create responsive and beautiful interfaces.</p>
      
      <h3>Why Tailwind?</h3>
      <p>Tailwind provides several advantages over traditional CSS frameworks:</p>
      <ul>
        <li>No more naming CSS classes</li>
        <li>Consistent design system</li>
        <li>Highly customizable</li>
        <li>Built-in responsive design</li>
      </ul>
      
      <h3>Getting Started</h3>
      <p>To begin using Tailwind in your project, you'll need to install it via npm:</p>
      <pre><code>npm install tailwindcss</code></pre>
      
      <p>Then create a configuration file:</p>
      <pre><code>npx tailwindcss init</code></pre>
      
      <h3>Responsive Design with Tailwind</h3>
      <p>Tailwind makes responsive design incredibly straightforward with its built-in breakpoint prefixes:</p>
      <ul>
        <li><code>sm:</code> - Small screens (640px and up)</li>
        <li><code>md:</code> - Medium screens (768px and up)</li>
        <li><code>lg:</code> - Large screens (1024px and up)</li>
        <li><code>xl:</code> - Extra large screens (1280px and up)</li>
        <li><code>2xl:</code> - 2X Large screens (1536px and up)</li>
      </ul>
      
      <p>For example, to create a card that's full width on mobile but only takes up half the screen on larger displays:</p>
      <pre><code>&lt;div class="w-full md:w-1/2 p-4 bg-white rounded shadow"&gt;
        Card content goes here
      &lt;/div&gt;</code></pre>
      
      <h3>Conclusion</h3>
      <p>By adopting Tailwind CSS, you can significantly speed up your development process while maintaining a consistent design system. The utility-first approach might take some getting used to, but the productivity benefits make it well worth the learning curve.</p>
    `,
    date: 'Nov 15, 2023',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&q=80&w=800&h=500',
    tags: ['Tailwind CSS', 'UI Design', 'Web Development']
  },
  {
    id: 2,
    title: 'Getting Started with React Hooks',
    excerpt: 'A comprehensive guide to using React Hooks for state management and side effects in functional components.',
    content: `
      <p>React Hooks have transformed how we build React components. With Hooks, you can use state and other React features without writing a class.</p>
      
      <h3>The Core Hooks</h3>
      <p>React provides several built-in Hooks:</p>
      <ul>
        <li><code>useState</code> - For managing state in functional components</li>
        <li><code>useEffect</code> - For handling side effects</li>
        <li><code>useContext</code> - For consuming context</li>
        <li><code>useReducer</code> - For more complex state logic</li>
        <li><code>useCallback</code> - For memoizing functions</li>
        <li><code>useMemo</code> - For memoizing values</li>
        <li><code>useRef</code> - For persistent mutable values</li>
      </ul>
      
      <h3>Using useState</h3>
      <p>The <code>useState</code> Hook allows you to add state to functional components:</p>
      <pre><code>import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    &lt;div&gt;
      &lt;p&gt;You clicked {count} times&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
      
      <h3>Side Effects with useEffect</h3>
      <p>The <code>useEffect</code> Hook lets you perform side effects in function components:</p>
      <pre><code>import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = \`You clicked \${count} times\`;
  });

  return (
    &lt;div&gt;
      &lt;p&gt;You clicked {count} times&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
      
      <h3>Custom Hooks</h3>
      <p>You can also create your own Hooks to reuse stateful logic between different components:</p>
      <pre><code>function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return width;
}</code></pre>
      
      <h3>Conclusion</h3>
      <p>React Hooks provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle. They provide a way to reuse stateful logic without changing your component hierarchy.</p>
    `,
    date: 'Oct 28, 2023',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800&h=500',
    tags: ['React', 'Hooks', 'JavaScript']
  },
  {
    id: 3,
    title: 'Optimizing API Calls in JavaScript Applications',
    excerpt: 'Best practices and techniques for efficient API calls in modern JavaScript applications.',
    content: `
      <p>Making efficient API calls is crucial for creating responsive web applications. This article covers strategies to optimize your API interactions.</p>
      
      <h3>Common API Call Issues</h3>
      <p>Before optimizing, let's identify common problems:</p>
      <ul>
        <li>Too many requests</li>
        <li>Redundant data fetching</li>
        <li>Poor error handling</li>
        <li>Inadequate caching</li>
      </ul>
      
      <h3>Implementing Caching</h3>
      <p>Client-side caching can significantly reduce unnecessary network requests:</p>
      <pre><code>const cache = new Map();

async function fetchWithCache(url) {
  if (cache.has(url)) {
    return cache.get(url);
  }
  
  const response = await fetch(url);
  const data = await response.json();
  
  cache.set(url, data);
  return data;
}</code></pre>
      
      <h3>Debouncing API Calls</h3>
      <p>For input-triggered API calls, implement debouncing:</p>
      <pre><code>function debounce(func, wait) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}</code></pre>
      
      <h3>Conclusion</h3>
      <p>By implementing these strategies, you can create more efficient and responsive applications that make better use of network resources and provide a smoother user experience.</p>
    `,
    date: 'Sep 12, 2023',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800&h=500',
    tags: ['JavaScript', 'API', 'Performance']
  },
  {
    id: 4,
    title: 'Responsive Design Principles for Modern Websites',
    excerpt: 'Core principles and best practices for creating responsive designs that work across all devices.',
    date: 'Aug 25, 2023',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=800&h=500',
    tags: ['CSS', 'Responsive Design', 'Web Development'],
    content: `<p>This is placeholder content for the responsive design article. It would contain detailed information about responsive design principles and best practices.</p>`
  },
  {
    id: 5,
    title: 'Introduction to State Management with Redux',
    excerpt: 'A beginner-friendly guide to understanding and implementing Redux for state management in React applications.',
    date: 'Jul 14, 2023',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800&h=500',
    tags: ['Redux', 'React', 'State Management'],
    content: `<p>This is placeholder content for the Redux article. It would contain detailed information about Redux state management concepts and implementation guidelines.</p>`
  },
  {
    id: 6,
    title: 'Creating Accessible Web Forms',
    excerpt: 'Guidelines and techniques for building web forms that are accessible to all users, including those with disabilities.',
    date: 'Jun 30, 2023',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?auto=format&fit=crop&q=80&w=800&h=500',
    tags: ['Accessibility', 'Web Forms', 'HTML'],
    content: `<p>This is placeholder content for the accessibility article. It would contain detailed information about creating accessible web forms and following WCAG guidelines.</p>`
  },
];

const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

// Tag color mapping for consistency
const tagColors: Record<string, string> = {
  'React': 'bg-blue-100 text-blue-800 dark:bg-blue-900/70 dark:text-blue-300',
  'JavaScript': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/70 dark:text-yellow-300',
  'Hooks': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/70 dark:text-indigo-300',
  'API': 'bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-300',
  'Performance': 'bg-orange-100 text-orange-800 dark:bg-orange-900/70 dark:text-orange-300',
  'CSS': 'bg-pink-100 text-pink-800 dark:bg-pink-900/70 dark:text-pink-300',
  'Responsive Design': 'bg-purple-100 text-purple-800 dark:bg-purple-900/70 dark:text-purple-300',
  'Web Development': 'bg-sky-100 text-sky-800 dark:bg-sky-900/70 dark:text-sky-300',
  'Redux': 'bg-violet-100 text-violet-800 dark:bg-violet-900/70 dark:text-violet-300',
  'State Management': 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/70 dark:text-fuchsia-300',
  'Accessibility': 'bg-rose-100 text-rose-800 dark:bg-rose-900/70 dark:text-rose-300',
  'Web Forms': 'bg-amber-100 text-amber-800 dark:bg-amber-900/70 dark:text-amber-300',
  'HTML': 'bg-lime-100 text-lime-800 dark:bg-lime-900/70 dark:text-lime-300',
  'UI Design': 'bg-teal-100 text-teal-800 dark:bg-teal-900/70 dark:text-teal-300',
  'Tailwind CSS': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/70 dark:text-cyan-300',
};

const Blog = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [openPostId, setOpenPostId] = useState<number | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Handle scroll position for the blog post modal
  useEffect(() => {
    if (openPostId !== null) {
      // Save current scroll position when opening a post
      setScrollPosition(window.scrollY);
      // Prevent body scrolling when the modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable body scrolling when the modal is closed
      document.body.style.overflow = 'auto';
      // Restore scroll position when closing a post
      window.scrollTo(0, scrollPosition);
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openPostId]);
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  // Function to handle opening a blog post
  const handleOpenPost = (postId: number) => {
    setOpenPostId(postId);
  };

  // Function to handle closing a blog post
  const handleClosePost = () => {
    setOpenPostId(null);
  };

  // Function to toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTag(prev => prev === tag ? null : tag);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-20 pb-16"
    >
      <div className="container mt-12">
        {/* Blog Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center mb-12 text-center"
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
            LATEST INSIGHTS
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Thoughts & Articles
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Exploring ideas, sharing knowledge, and documenting my journey through web development and design.
          </p>
        </motion.div>
        
        {/* Search and Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 bg-secondary/50 border-secondary"
              />
            </div>
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 bg-secondary/50 border-secondary h-12">
                  <Filter className="h-4 w-4" />
                  Filter by tag
                  {selectedTag && (
                    <Badge variant="secondary" className="ml-1">
                      1
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[320px] p-5">
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Filter by Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <Button
                        key={tag}
                        variant={selectedTag === tag ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleTag(tag)}
                        className="text-xs h-7"
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-between pt-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedTag(null)}
                      disabled={!selectedTag}
                      size="sm"
                    >
                      Clear Filter
                    </Button>
                    <Button
                      size="sm" 
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Active filters */}
          {selectedTag && (
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">Active filter:</span>
              <Badge className="flex items-center gap-1">
                {selectedTag}
                <button onClick={() => setSelectedTag(null)} className="ml-1 hover:text-primary-foreground">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            </div>
          )}
        </motion.div>
        
        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <Card 
                  className="h-full overflow-hidden border-border/40 bg-card hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleOpenPost(post.id)}
                >
                  <div className="relative overflow-hidden aspect-[16/9]">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70"></div>
                    
                    <div className="absolute inset-x-0 bottom-0 p-4 flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map(tag => (
                        <Badge 
                          key={tag} 
                          className={`${tagColors[tag] || "bg-secondary text-secondary-foreground"} text-xs`}
                        >
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs bg-black/40 text-white border-white/20">
                          +{post.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-0 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="col-span-full text-center py-16 bg-secondary/20 rounded-lg border border-border/50">
            <h3 className="text-2xl font-medium mb-3">No articles found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Try adjusting your search or filter criteria to find the content you're looking for.
            </p>
            <div className="flex justify-center gap-4">
              {searchTerm && (
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm('')}
                  className="border-primary/30"
                >
                  Clear Search
                </Button>
              )}
              {selectedTag && (
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedTag(null)}
                  className="border-primary/30"
                >
                  Clear Filter
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {openPostId !== null && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={handleClosePost}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-4 z-50 rounded-xl overflow-hidden bg-background border shadow-2xl flex flex-col max-w-5xl mx-auto"
            >
              {blogPosts.filter(post => post.id === openPostId).map(post => (
                <div key={post.id} className="flex flex-col h-full">
                  {/* Post header with navigation */}
                  <div className="flex items-center justify-between p-4 border-b backdrop-blur-md bg-background/90 sticky top-0 z-10">
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="mr-2"
                        onClick={handleClosePost}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <h2 className="text-lg font-semibold line-clamp-1">{post.title}</h2>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={handleClosePost}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex-1 overflow-auto">
                    {/* Hero image with gradient overlay */}
                    <div className="relative h-[30vh] md:h-[40vh]">
                      <img 
                        src={post.image}
                        alt={post.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                      
                      {/* Post title overlay positioned at bottom of hero image */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="max-w-4xl mx-auto">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map(tag => (
                              <Badge 
                                key={tag}
                                className={`${tagColors[tag] || "bg-secondary text-secondary-foreground"}`}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 drop-shadow-md">
                            {post.title}
                          </h1>
                          <div className="flex items-center gap-4 text-sm text-white/90">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Main content with improved styling */}
                    <div className="p-6 md:p-10">
                      <div className="max-w-4xl mx-auto">
                        <div 
                          className={`prose ${theme === 'dark' ? 'prose-invert' : ''} max-w-none 
                            prose-headings:font-medium prose-headings:tracking-tight prose-headings:mb-4 prose-headings:mt-8 
                            prose-h3:text-xl prose-h3:font-semibold
                            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                            prose-p:text-base prose-p:leading-relaxed
                            prose-li:text-base prose-li:my-1
                            prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-normal
                            prose-pre:bg-secondary/50 prose-pre:border prose-pre:border-border/50 prose-pre:rounded-xl prose-pre:p-4 prose-pre:shadow-sm 
                            prose-pre:overflow-x-auto prose-pre:my-6 prose-pre:text-sm
                            prose-img:rounded-xl prose-img:shadow-md prose-img:my-8
                            prose-img:mx-auto prose-img:max-h-[50vh] prose-img:object-contain`} 
                          dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                        
                        {/* Table of Contents */}
                        <div className="mt-12 border-t pt-8">
                          <h3 className="text-xl font-semibold mb-6">Table of Contents</h3>
                          <div className="bg-secondary/30 rounded-xl p-1 border border-border/40">
                            <Accordion
                              type="single"
                              collapsible
                              value={activeAccordion}
                              onValueChange={setActiveAccordion}
                              className="w-full"
                            >
                              <AccordionItem value="key-concepts" className="border-b-0 last:border-0">
                                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-secondary/60 rounded-lg">
                                  <span className="font-medium">Key Concepts</span>
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pb-3 pt-1">
                                  <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-center gap-2 hover:text-primary transition-colors">
                                      <div className="w-1 h-1 rounded-full bg-primary"></div>
                                      <a href="#" className="hover:underline">Introduction</a>
                                    </li>
                                    <li className="flex items-center gap-2 hover:text-primary transition-colors">
                                      <div className="w-1 h-1 rounded-full bg-primary"></div>
                                      <a href="#" className="hover:underline">Core Principles</a>
                                    </li>
                                    <li className="flex items-center gap-2 hover:text-primary transition-colors">
                                      <div className="w-1 h-1 rounded-full bg-primary"></div>
                                      <a href="#" className="hover:underline">Getting Started</a>
                                    </li>
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="implementation" className="border-b-0 last:border-0">
                                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-secondary/60 rounded-lg">
                                  <span className="font-medium">Implementation Guide</span>
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pb-3 pt-1">
                                  <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-center gap-2 hover:text-primary transition-colors">
                                      <div className="w-1 h-1 rounded-full bg-primary"></div>
                                      <a href="#" className="hover:underline">Setup Instructions</a>
                                    </li>
                                    <li className="flex items-center gap-2 hover:text-primary transition-colors">
                                      <div className="w-1 h-1 rounded-full bg-primary"></div>
                                      <a href="#" className="hover:underline">Code Examples</a>
                                    </li>
                                    <li className="flex items-center gap-2 hover:text-primary transition-colors">
                                      <div className="w-1 h-1 rounded-full bg-primary"></div>
                                      <a href="#" className="hover:underline">Best Practices</a>
                                    </li>
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="resources" className="border-b-0 last:border-0">
                                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-secondary/60 rounded-lg">
                                  <span className="font-medium">Additional Resources</span>
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pb-3 pt-1">
                                  <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-center gap-2 hover:text-primary transition-colors">
                                      <div className="w-1 h-1 rounded-full bg-primary"></div>
                                      <a href="#" className="hover:underline">Documentation</a>
                                    </li>
                                    <li className="flex items-center gap-2 hover:text-primary transition-colors">
                                      <div className="w-1 h-1 rounded-full bg-primary"></div>
                                      <a href="#" className="hover:underline">Related Articles</a>
                                    </li>
                                    <li className="flex items-center gap-2 hover:text-primary transition-colors">
                                      <div className="w-1 h-1 rounded-full bg-primary"></div>
                                      <a href="#" className="hover:underline">Community</a>
                                    </li>
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </div>
                          
                          {/* Share and navigation buttons */}
                          <div className="mt-8 flex flex-col md:flex-row items-center gap-4 justify-between">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">Share</Button>
                              <Button variant="outline" size="sm">Bookmark</Button>
                            </div>
                            
                            <div className="flex gap-2">
                              {post.id > 1 && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setOpenPostId(post.id - 1)}
                                  className="flex items-center gap-1"
                                >
                                  <ChevronLeft className="h-4 w-4" /> Previous
                                </Button>
                              )}
                              
                              {post.id < blogPosts.length && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setOpenPostId(post.id + 1)}
                                  className="flex items-center gap-1"
                                >
                                  Next <ArrowRight className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Blog;
