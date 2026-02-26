export interface Chapter {
    id: string;
    slug: string;
    title: string;
    content: string;
}

export interface StudyMaterial {
    id: string;
    slug: string;
    topic: string;
    title: string;
    image: string;
    videoUrl: string;
    githubLink: string;
    rating: number;
    difficulty?: string;
    estimatedTime?: string;
    description?: string;
    tags?: string[];
    chapters: Chapter[];
}

export const studyData: StudyMaterial[] = [
    {
        id: "1",
        slug: "javascript",
        topic: "Javascript",
        title: "Javascript Mastery",
        description: "Comprehensive guide to modern Javascript from V8 internals to async patterns.",
        image: "https://images.unsplash.com/photo-1579403124614-197f69d8187b?q=80&w=1000&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        githubLink: "https://github.com/sameerbagul",
        rating: 4.8,
        difficulty: "Intermediate",
        estimatedTime: "12 hours",
        tags: ["ES6+", "Async", "Engine"],
        chapters: [
            {
                id: "js-c1",
                slug: "js-engine-internals",
                title: "Introduction to JS Engine",
                content: `
                    <h1>The V8 Engine: Behind the Scenes</h1>
                    <p>The JavaScript engine is a program that executes JavaScript code. The most famous engine is <strong>Google's V8</strong>, which powers Chrome and Node.js. Understanding its internals is crucial for writing high-performance code.</p>
                    
                    <h2>1. The Compilation Pipeline</h2>
                    <p>Modern engines use a technique called <strong>Just-In-Time (JIT) compilation</strong>. Instead of just interpreting code line by line, they translate it into machine code during execution.</p>
                    <ul>
                        <li><strong>Parser:</strong> Converts code into an Abstract Syntax Tree (AST).</li>
                        <li><strong>Ignition:</strong> The interpreter that generates bytecode from the AST.</li>
                        <li><strong>TurboFan:</strong> The optimizing compiler that turns bytecode into highly efficient machine code.</li>
                    </ul>

                    <blockquote>
                        JavaScript is not just an interpreted language anymore; it's a JIT-compiled powerhouse.
                    </blockquote>

                    <h2>2. Memory Heap vs Call Stack</h2>
                    <p>Engines manage memory using two primary structures:</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Structure</th>
                                <th>Purpose</th>
                                <th>Storage Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Call Stack</td>
                                <td>Execution Contexts</td>
                                <td>Short-lived, LIFO</td>
                            </tr>
                            <tr>
                                <td>Memory Heap</td>
                                <td>Objects, Closures</td>
                                <td>Unstructured, Large</td>
                            </tr>
                        </tbody>
                    </table>

                    <pre><code>function multiply(a, b) {
    return a * b;
}

const result = multiply(10, 5); // Stack frame created</code></pre>

                    <h2>3. Garbage Collection</h2>
                    <p>V8 uses a <strong>Generational Collector</strong>. It splits objects into "Young" and "Old" generations. Most objects die young, so the engine optimizes for frequent, small collections in the nursery area.</p>
                `
            },
            {
                id: "js-c2",
                slug: "closures-and-scope",
                title: "Closures & Scope Chain",
                content: `
                    <h1>Deep Dive into Closures</h1>
                    <p>A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the <em>lexical environment</em>).</p>
                    
                    <h2>Lexical Scoping</h2>
                    <p>In JavaScript, the scope is determined by the position of variables and blocks within the source code. Nested functions have access to variables declared in their outer scope.</p>

                    <pre><code>function makeCounter() {
    let count = 0;
    return function() {
        return ++count;
    };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2</code></pre>

                    <p>In the example above, the inner function "remembers" the <code>count</code> variable even after <code>makeCounter</code> has finished executing.</p>
                `
            }
        ]
    },
    {
        id: "2",
        slug: "react",
        topic: "React",
        title: "React Deep Dive",
        description: "Master the reconciliation algorithm, hooks lifecycle, and server components.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        githubLink: "https://github.com/sameerbagul",
        rating: 4.9,
        difficulty: "Advanced",
        estimatedTime: "15 hours",
        tags: ["Hooks", "RSC", "Performance"],
        chapters: [
            {
                id: "r-c1",
                slug: "reconciliation-algorithm",
                title: "The Reconciliation Algorithm",
                content: `
                    <h1>React Reconciliation & Fiber</h1>
                    <p>Reconciliation is the process through which React updates the DOM. When a component's state changes, React creates a new tree of elements and compares it with the previous one.</p>

                    <h2>The Diffing Algorithm</h2>
                    <p>React uses a heuristic O(n) algorithm based on two assumptions:</p>
                    <ol>
                        <li>Two elements of different types will produce different trees.</li>
                        <li>The developer can hint at which child elements may be stable across different renders with a <code>key</code> prop.</li>
                    </ol>

                    <h2>React Fiber</h2>
                    <p>Fiber is the reconciliation engine in React 16. Its main goal is to enable <strong>incremental rendering</strong>: the ability to split rendering work into chunks and spread it out over multiple frames.</p>
                    
                    <pre><code>// Fiber Node Structure (simplified)
{
    type: 'div',
    key: null,
    child: FiberNode,
    sibling: FiberNode,
    return: FiberNode, // Parent
    pendingProps: {...},
    memoizedState: {...}
}</code></pre>
                `
            }
        ]
    },
    {
        id: "3",
        slug: "html-css",
        topic: "HTML+CSS",
        title: "Modern Layouts",
        description: "Learn CSS Grid, Flexbox, and complex animations for modern web design.",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        githubLink: "https://github.com/sameerbagul",
        rating: 4.7,
        difficulty: "Beginner",
        estimatedTime: "8 hours",
        tags: ["Flexbox", "Grid", "Animations"],
        chapters: [
            {
                id: "css-c1",
                slug: "mastering-css-grid",
                title: "Mastering CSS Grid",
                content: "# Grid Systems\nCreating complex 12-column layouts with ease."
            }
        ]
    },
    {
        id: "4",
        slug: "node",
        topic: "Node",
        title: "Backend Engineering",
        description: "Event-driven architecture, streams, and microservices with Node.js.",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        githubLink: "https://github.com/sameerbagul",
        rating: 4.8,
        difficulty: "Intermediate",
        estimatedTime: "20 hours",
        tags: ["Streams", "Even Loop", "Microservices"],
        chapters: [
            {
                id: "node-c1",
                slug: "event-driven-architecture",
                title: "Event Driven Architecture",
                content: "# Event Loop\nUnderstanding the phases of the Node.js event loop."
            }
        ]
    },
    {
        id: "5",
        slug: "python",
        topic: "Python",
        title: "Python for Engineers",
        description: "From automation scripts to data engineering with Python.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        githubLink: "https://github.com/sameerbagul",
        rating: 4.6,
        difficulty: "Beginner",
        estimatedTime: "10 hours",
        tags: ["Automation", "Data Science", "Scripting"],
        chapters: [
            {
                id: "py-c1",
                slug: "python-data-structures",
                title: "Python Data Structures",
                content: "# Lists & Dicts\nEfficient data manipulation with Python built-ins."
            }
        ]
    },
    {
        id: "6",
        slug: "ai",
        topic: "AI",
        title: "Agentic AI Systems",
        description: "Building autonomous agents with LLMs, RAG, and tool calling.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        githubLink: "https://github.com/sameerbagul",
        rating: 4.9,
        difficulty: "Advanced",
        estimatedTime: "25 hours",
        tags: ["LLMs", "RAG", "Agents"],
        chapters: [
            {
                id: "ai-c1",
                slug: "autonomous-agents",
                title: "Building Autonomous Agents",
                content: "# Agents\nImplementing tool-calling and memory in AI agents."
            }
        ]
    },
    {
        id: "7",
        slug: "ml",
        topic: "ML",
        title: "Machine Learning Core",
        description: "Foundational machine learning from regression to neural networks.",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1000&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        githubLink: "https://github.com/sameerbagul",
        rating: 4.7,
        difficulty: "Intermediate",
        estimatedTime: "30 hours",
        tags: ["Regression", "Neural Nets", "Pytorch"],
        chapters: [
            {
                id: "ml-c1",
                slug: "gradient-descent-optimization",
                title: "Gradient Descent",
                content: "# Optimization\nFine-tuning model parameters for accuracy."
            }
        ]
    },
    {
        id: "8",
        slug: "git",
        topic: "Git",
        title: "Version Control Mastery",
        description: "Master Git workflows, branching strategies, and internal architecture.",
        image: "https://images.unsplash.com/photo-1618401471353-b98aadebc25a?q=80&w=1000&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        githubLink: "https://github.com/sameerbagul",
        rating: 4.5,
        difficulty: "Beginner",
        estimatedTime: "5 hours",
        tags: ["Branching", "Rebase", "Workflow"],
        chapters: [
            {
                id: "git-c1",
                slug: "rebase-vs-merge",
                title: "Git Rebase vs Merge",
                content: "# Workflows\nKeeping a clean commit history."
            }
        ]
    },
    {
        id: "9",
        slug: "dsa",
        topic: "DSA",
        title: "Algorithms & Structures",
        description: "Mastering dynamic programming, graph algorithms, and data structures.",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1000&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        githubLink: "https://github.com/sameerbagul",
        rating: 4.9,
        difficulty: "Advanced",
        estimatedTime: "40 hours",
        tags: ["Graphs", "DP", "Trees"],
        chapters: [
            {
                id: "dsa-c1",
                slug: "dynamic-programming",
                title: "Dynamic Programming",
                content: "# DP\nSolving complex problems by breaking them into overlapping subproblems."
            }
        ]
    },
    {
        id: "10",
        slug: "aws",
        topic: "AWS",
        title: "Cloud Architecture",
        description: "Master AWS services from S3/EC2 to serverless Lambda architectures.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        githubLink: "https://github.com/sameerbagul",
        rating: 4.8,
        difficulty: "Intermediate",
        estimatedTime: "25 hours",
        tags: ["S3", "Lambda", "IAM"],
        chapters: [
            {
                id: "aws-c1",
                slug: "serverless-lambda",
                title: "Serverless with Lambda",
                content: "# Lambda\nBuilding scalable serverless event-driven functions."
            }
        ]
    },
    {
        id: "11",
        slug: "docker",
        topic: "Docker",
        title: "Containerization Mastery",
        description: "Learning containerization, Dockerfiles, and multi-container orchestration.",
        image: "https://images.unsplash.com/photo-1605745341112-85968b193ef5?q=80&w=1000&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        githubLink: "https://github.com/sameerbagul",
        rating: 4.8,
        difficulty: "Intermediate",
        estimatedTime: "15 hours",
        tags: ["Containers", "Images", "Compose"],
        chapters: [
            {
                id: "docker-c1",
                slug: "docker-containers",
                title: "Docker Fundamentals",
                content: "# Containers\nUnderstanding the difference between VMs and containers."
            }
        ]
    }
];
