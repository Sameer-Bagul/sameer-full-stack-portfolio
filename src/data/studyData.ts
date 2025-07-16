
import { File, FileText, BookOpen, BookCheck, Folder, NotebookPen, Lightbulb, Bookmark, Book, PencilRuler } from 'lucide-react';

export interface StudyMaterial {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  fileSize: string;
  icon: any;
  content?: string;
  author?: string;
  lastUpdated?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedReadTime?: string;
  prerequisites?: string[];
  relatedMaterials?: number[];
}

export const studyMaterials: StudyMaterial[] = [
  {
    id: 1,
    title: "Introduction to React Hooks",
    description: "Learn about the fundamental hooks in React and how to use them efficiently in your applications.",
    category: "notes",
    tags: ["react", "hooks", "frontend", "javascript"],
    date: "Apr 15, 2023",
    fileSize: "120 KB",
    icon: NotebookPen,
    author: "Sameer Bagul",
    lastUpdated: "May 2, 2023",
    difficulty: "Beginner",
    estimatedReadTime: "15 mins",
    content: `# Introduction to React Hooks

## What are React Hooks?

React Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8 as a way to use state and other React features without writing a class component.

## Common React Hooks

### useState

The useState hook lets you add React state to functional components.

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

### useEffect

The useEffect hook lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes.

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = \`You clicked \${count} times\`;
    
    // Optional cleanup function
    return () => {
      document.title = 'React App';
    };
  }, [count]); // Only re-run the effect if count changes

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

### useContext

The useContext hook accepts a context object (the value returned from React.createContext) and returns the current context value for that context.

\`\`\`jsx
import React, { useContext } from 'react';

const ThemeContext = React.createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>I am styled by theme context!</button>;
}
\`\`\`

### useReducer

The useReducer hook is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.

\`\`\`jsx
import React, { useReducer } from 'react';

const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
\`\`\`

## Custom Hooks

One of the best features of hooks is that you can create your own hooks to extract component logic into reusable functions.

\`\`\`jsx
import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return width;
}

function MyResponsiveComponent() {
  const width = useWindowWidth();
  return (
    <div>
      {width > 600 ? <WideScreen /> : <NarrowScreen />}
    </div>
  );
}
\`\`\`

## Rules of Hooks

1. Only call hooks at the top level. Don't call them inside loops, conditions, or nested functions.
2. Only call hooks from React function components or custom hooks.

## Conclusion

React Hooks provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle. They offer the ability to extract and reuse stateful logic without changing your component hierarchy.`
  },
  {
    id: 2,
    title: "Advanced TypeScript Features",
    description: "An in-depth guide to TypeScript's more advanced type features and how to leverage them for better code.",
    category: "cheatsheet",
    tags: ["typescript", "advanced", "types", "javascript"],
    date: "Mar 22, 2023",
    fileSize: "95 KB",
    icon: FileText,
    author: "Sarah Johnson",
    lastUpdated: "Apr 10, 2023",
    difficulty: "Advanced",
    estimatedReadTime: "25 mins",
    content: `# Advanced TypeScript Features

## Conditional Types

Conditional types allow you to create types that depend on conditions:

\`\`\`typescript
type Check<T> = T extends string ? 'string' : 'not string';

type A = Check<string>; // 'string'
type B = Check<number>; // 'not string'
\`\`\`

## Mapped Types

Mapped types allow you to transform each property in an old type into a new property:

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Person = {
  name: string;
  age: number;
};

type ReadonlyPerson = Readonly<Person>;
// Same as: { readonly name: string; readonly age: number; }
\`\`\`

## Template Literal Types

Template literal types provide a way to manipulate string types:

\`\`\`typescript
type World = 'world';
type Greeting = \`hello \${World}\`; // 'hello world'

type EmailLocaleIDs = 'welcome_email' | 'email_heading';
type FooterLocaleIDs = 'footer_title' | 'footer_sendoff';

type AllLocaleIDs = \`\${EmailLocaleIDs | FooterLocaleIDs}_id\`;
// "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
\`\`\`

## infer Keyword

The \`infer\` keyword allows you to extract type components within conditional types:

\`\`\`typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type Func = () => number;
type Return = ReturnType<Func>; // number
\`\`\`

## Utility Types

TypeScript provides several utility types to facilitate common type transformations:

\`\`\`typescript
// Pick selected properties
type Person = {
  name: string;
  age: number;
  address: string;
};

type NameAndAge = Pick<Person, 'name' | 'age'>;
// Same as: { name: string; age: number; }

// Omit specified properties
type WithoutAddress = Omit<Person, 'address'>;
// Same as: { name: string; age: number; }

// Make all properties optional
type PartialPerson = Partial<Person>;
// Same as: { name?: string; age?: number; address?: string; }

// Make all properties required
type RequiredPerson = Required<Partial<Person>>;
// Same as: { name: string; age: number; address: string; }

// Extract union types that are assignable to a type
type Numbers = Extract<string | number | boolean, number | string>;
// Same as: string | number

// Exclude union types that are assignable to a type
type OnlyString = Exclude<string | number | boolean, number | boolean>;
// Same as: string

// Construct a type with non-nullable types
type NonNullable<T> = T extends null | undefined ? never : T;
type NotNull = NonNullable<string | null | undefined>;
// Same as: string
\`\`\`

## Recursive Types

TypeScript allows you to create recursive type definitions:

\`\`\`typescript
type JSONValue = 
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

const data: JSONValue = {
  name: "John",
  age: 30,
  isActive: true,
  address: null,
  hobbies: ["reading", "coding"],
  metadata: {
    lastLogin: "2023-01-15",
    visits: 45
  }
};
\`\`\`

## Type Guards

Type guards are a way to narrow down the type of an object within a conditional block:

\`\`\`typescript
function isString(value: any): value is string {
  return typeof value === 'string';
}

function example(x: string | number) {
  if (isString(x)) {
    // Within this block, TypeScript knows that x is a string
    return x.toUpperCase();
  }
  
  // Outside the if block, TypeScript knows that x is a number
  return x.toFixed(2);
}
\`\`\`

## Conclusion

These advanced TypeScript features can significantly enhance your code's type safety and expressiveness. By mastering these concepts, you'll be able to create more robust and maintainable TypeScript applications.`
  },
  {
    id: 3,
    title: "Understanding Closures in JavaScript",
    description: "Deep dive into JavaScript closures, their benefits, and common pitfalls.",
    category: "notes",
    tags: ["javascript", "closures", "functions", "scope"],
    date: "Feb 18, 2023",
    fileSize: "78 KB",
    icon: NotebookPen,
    author: "Michael Brown",
    lastUpdated: "Mar 5, 2023",
    difficulty: "Intermediate",
    estimatedReadTime: "18 mins",
    content: `# Understanding Closures in JavaScript

## What is a Closure?

A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In JavaScript, closures are created every time a function is created, at function creation time.

## Basic Example

\`\`\`javascript
function createCounter() {
  let count = 0;
  
  return function() {
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
\`\`\`

In this example, the \`createCounter\` function creates a local variable called \`count\` and then returns a function that increments and returns this variable. The returned function maintains a reference to the \`count\` variable, creating a closure.

## Practical Uses of Closures

### 1. Data Privacy

Closures provide a way to create private variables and methods:

\`\`\`javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  
  return {
    deposit: function(amount) {
      balance += amount;
      return balance;
    },
    withdraw: function(amount) {
      if (amount > balance) {
        throw new Error('Insufficient funds');
      }
      balance -= amount;
      return balance;
    },
    getBalance: function() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
account.deposit(50); // 150
account.withdraw(30); // 120
account.getBalance(); // 120
\`\`\`

The \`balance\` variable is not directly accessible from outside the function, providing data privacy.

### 2. Function Factories

Closures can be used to create functions with specific behaviors:

\`\`\`javascript
function multiplyBy(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
\`\`\`

### 3. Event Handlers

Closures are commonly used in event handling:

\`\`\`javascript
function handleClick(message) {
  return function(event) {
    console.log(message, event);
  };
}

document.getElementById('button').addEventListener(
  'click', 
  handleClick('Button clicked!')
);
\`\`\`

## Common Closure Pitfalls

### Loop with Async Callbacks

A classic closure pitfall occurs when using closures inside a loop:

\`\`\`javascript
// Problematic code
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i); // Will log '5' five times
  }, 1000);
}
\`\`\`

The issue is that by the time the callbacks execute, the loop has completed and \`i\` is 5. Solutions include:

1. Using let instead of var:

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i); // Will log 0, 1, 2, 3, 4
  }, 1000);
}
\`\`\`

2. Creating a closure for each iteration:

\`\`\`javascript
for (var i = 0; i < 5; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // Will log 0, 1, 2, 3, 4
    }, 1000);
  })(i);
}
\`\`\`

### Memory Leaks

Closures can cause memory leaks if not used carefully, especially in browser environments:

\`\`\`javascript
function attachEvent() {
  const element = document.getElementById('button');
  let data = 'Large data structure';
  
  element.addEventListener('click', function() {
    console.log(data);
  });
  
  // The event listener holds a reference to data,
  // preventing it from being garbage collected
}
\`\`\`

To avoid this, it's important to clean up event listeners when they're no longer needed.

## Conclusion

Closures are a powerful feature in JavaScript that allow functions to maintain access to variables from their containing scope. They're used for data privacy, function factories, and event handling, among other applications. Understanding closures is essential for writing effective JavaScript code.`
  },
  {
    id: 4,
    title: "CSS Grid Layout: Complete Guide",
    description: "A comprehensive guide to CSS Grid Layout with examples and best practices.",
    category: "textbook",
    tags: ["css", "grid", "layout", "frontend"],
    date: "Jan 10, 2023",
    fileSize: "156 KB",
    icon: Book,
    author: "Lisa Chen",
    lastUpdated: "Feb 28, 2023",
    difficulty: "Intermediate",
    estimatedReadTime: "30 mins",
    content: `# CSS Grid Layout: Complete Guide

## Introduction to CSS Grid

CSS Grid Layout is a two-dimensional layout system designed specifically for the web. It allows you to organize content into rows and columns and has many features that make building complex layouts straightforward.

## Grid Container Basics

To create a grid container, you need to set the display property of an element to grid or inline-grid:

\`\`\`css
.container {
  display: grid;
}
\`\`\`

### Defining Columns and Rows

You can define the columns and rows of your grid using the grid-template-columns and grid-template-rows properties:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 100px 200px 100px;
  grid-template-rows: 50px 100px;
}
\`\`\`

This creates a grid with 3 columns and 2 rows of the specified sizes.

### Using fr unit

The fr unit represents a fraction of the available space:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
}
\`\`\`

This creates 3 columns where the middle one is twice as wide as the others.

### repeat() function

For large grids, you can use the repeat() function:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}
\`\`\`

This creates a 12-column grid with columns of equal width.

### minmax() function

The minmax() function sets a minimum and maximum size for a track:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: minmax(100px, 1fr) 2fr 1fr;
}
\`\`\`

### auto-fill and auto-fit

These values allow you to create a responsive grid without media queries:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
\`\`\`

## Grid Gaps

You can add gaps between grid items:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px; /* Shorthand for both row and column gaps */
  gap: 20px; /* Modern equivalent of grid-gap */
  /* Or specify separately: */
  row-gap: 20px;
  column-gap: 10px;
}
\`\`\`

## Grid Lines and Areas

### Placing Items Using Line Numbers

\`\`\`css
.item {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
}

/* Shorthand: */
.item {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}

/* Even shorter with span: */
.item {
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
}
\`\`\`

### Named Lines

You can name grid lines:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: [start] 1fr [middle] 2fr [end];
  grid-template-rows: [top] 100px [bottom];
}

.item {
  grid-column: start / end;
  grid-row: top / bottom;
}
\`\`\`

### Grid Areas

For complex layouts, you can define grid areas:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto auto;
  grid-template-areas: 
    "header header header header"
    "sidebar main main main"
    "footer footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
\`\`\`

## Alignment

### Aligning Grid Items

\`\`\`css
.item {
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
}
\`\`\`

### Aligning All Items

\`\`\`css
.container {
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
}
\`\`\`

### Aligning the Grid Within Its Container

\`\`\`css
.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;
}
\`\`\`

## Responsive Grid Layouts

For responsive designs, you can combine Grid with media queries:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 600px) {
  .container {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 900px) {
  .container {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
\`\`\`

## Auto Placement Algorithms

Grid has an auto-placement algorithm that places items that haven't been explicitly positioned:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(100px, auto);
  grid-auto-flow: row | column | dense;
}
\`\`\`

## Conclusion

CSS Grid Layout is a powerful tool for creating complex web layouts. It provides a level of control that was previously difficult to achieve with CSS. By mastering Grid, you can create responsive designs more efficiently and with cleaner code.`
  },
  {
    id: 5,
    title: "Algorithms: Binary Search Tree Implementation",
    description: "Learn how to implement and manipulate a binary search tree in JavaScript.",
    category: "lecture",
    tags: ["algorithms", "data structures", "binary tree", "javascript"],
    date: "Dec 5, 2022",
    fileSize: "112 KB",
    icon: BookOpen,
    author: "Robert Zhang",
    lastUpdated: "Jan 15, 2023",
    difficulty: "Advanced",
    estimatedReadTime: "22 mins",
    content: `# Binary Search Tree Implementation in JavaScript

## What is a Binary Search Tree?

A Binary Search Tree (BST) is a binary tree where each node has at most two children, referred to as the left child and the right child. For each node in the tree:
- All nodes in the left subtree have values less than the node's value.
- All nodes in the right subtree have values greater than the node's value.

This property makes BSTs efficient for search operations.

## Basic Node Structure

Let's start by defining the structure of a node in our BST:

\`\`\`javascript
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
\`\`\`

## Building the Binary Search Tree

Now, let's implement the Binary Search Tree class:

\`\`\`javascript
class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  
  // Insert a value into the tree
  insert(value) {
    const newNode = new Node(value);
    
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    
    let current = this.root;
    
    while (true) {
      // Handle duplicate values
      if (value === current.value) return undefined;
      
      // Go left
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } 
      // Go right
      else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }
  
  // Find a value in the tree
  find(value) {
    if (this.root === null) return false;
    
    let current = this.root;
    let found = false;
    
    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = true;
      }
    }
    
    if (!found) return false;
    return current;
  }
  
  // Check if a value exists in the tree
  contains(value) {
    if (this.root === null) return false;
    
    let current = this.root;
    
    while (current) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        return true;
      }
    }
    
    return false;
  }
}
\`\`\`

## Tree Traversal

There are several ways to traverse a binary tree. Let's implement the most common ones:

### Breadth First Search (BFS)

BFS explores all nodes at the present depth level before moving on to nodes at the next depth level.

\`\`\`javascript
// Add this method to the BinarySearchTree class
breadthFirstSearch() {
  const data = [];
  const queue = [];
  let node = this.root;
  
  queue.push(node);
  
  while (queue.length) {
    node = queue.shift();
    data.push(node.value);
    
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  
  return data;
}
\`\`\`

### Depth First Search (DFS)

DFS explores as far as possible along each branch before backtracking.

#### PreOrder Traversal

\`\`\`javascript
// Add this method to the BinarySearchTree class
depthFirstSearchPreOrder() {
  const data = [];
  
  function traverse(node) {
    data.push(node.value);
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
  }
  
  traverse(this.root);
  return data;
}
\`\`\`

#### PostOrder Traversal

\`\`\`javascript
// Add this method to the BinarySearchTree class
depthFirstSearchPostOrder() {
  const data = [];
  
  function traverse(node) {
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
    data.push(node.value);
  }
  
  traverse(this.root);
  return data;
}
\`\`\`

#### InOrder Traversal

\`\`\`javascript
// Add this method to the BinarySearchTree class
depthFirstSearchInOrder() {
  const data = [];
  
  function traverse(node) {
    if (node.left) traverse(node.left);
    data.push(node.value);
    if (node.right) traverse(node.right);
  }
  
  traverse(this.root);
  return data;
}
\`\`\`

## Using the Binary Search Tree

Now that we've built our BST, let's see it in action:

\`\`\`javascript
// Create a new BST
const bst = new BinarySearchTree();

// Insert values
bst.insert(10);
bst.insert(6);
bst.insert(15);
bst.insert(3);
bst.insert(8);
bst.insert(20);

/*
The tree now looks like:
        10
       /  \
      6    15
     / \     \
    3   8    20
*/

console.log(bst.contains(15)); // true
console.log(bst.contains(7));  // false

// Tree traversals
console.log(bst.breadthFirstSearch());         // [10, 6, 15, 3, 8, 20]
console.log(bst.depthFirstSearchPreOrder());   // [10, 6, 3, 8, 15, 20]
console.log(bst.depthFirstSearchPostOrder());  // [3, 8, 6, 20, 15, 10]
console.log(bst.depthFirstSearchInOrder());    // [3, 6, 8, 10, 15, 20]
\`\`\`

## Time and Space Complexity Analysis

### Time Complexity
- Insertion: O(log n) - average case, O(n) - worst case (when the tree is unbalanced)
- Searching: O(log n) - average case, O(n) - worst case (when the tree is unbalanced)
- Traversal: O(n) - we visit every node once

### Space Complexity
- O(n) to store the tree
- For recursive traversal methods, O(h) additional space for the call stack, where h is the height of the tree
  - Best case (balanced tree): O(log n)
  - Worst case (unbalanced tree): O(n)

## Conclusion

Binary Search Trees are efficient data structures for storing sorted data and performing operations like insertions, deletions, and lookups. However, they can become unbalanced, leading to worst-case O(n) time complexity. To address this issue, we can use balanced BSTs like AVL trees or Red-Black trees, which ensure that the tree remains balanced after operations.`
  },
  {
    id: 6,
    title: "Node.js: Build a RESTful API",
    description: "Step-by-step guide to building a RESTful API with Node.js, Express, and MongoDB.",
    category: "cheatsheet",
    tags: ["node.js", "express", "mongodb", "api", "rest"],
    date: "Nov 12, 2022",
    fileSize: "135 KB",
    icon: FileText,
    author: "David Wilson",
    lastUpdated: "Dec 20, 2022",
    difficulty: "Intermediate",
    estimatedReadTime: "35 mins",
    content: `# Building a RESTful API with Node.js, Express, and MongoDB

## Setup and Installation

1. Initialize a new Node.js project:

\`\`\`bash
mkdir node-api-project
cd node-api-project
npm init -y
\`\`\`

2. Install required packages:

\`\`\`bash
npm install express mongoose dotenv cors
npm install --save-dev nodemon
\`\`\`

3. Create basic project structure:

\`\`\`
node-api-project/
  ├── config/
  │   └── db.js
  ├── controllers/
  │   └── userController.js
  ├── models/
  │   └── User.js
  ├── routes/
  │   └── userRoutes.js
  ├── .env
  ├── .gitignore
  ├── package.json
  └── server.js
\`\`\`

4. Create a .env file for environment variables:

\`\`\`
PORT=5000
MONGODB_URI=mongodb://localhost:27017/myapp
\`\`\`

5. Add basic server setup in server.js:

\`\`\`javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', require('./routes/userRoutes'));

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## Database Connection

Create the database connection in config/db.js:

\`\`\`javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error(\`Error: \${error.message}\`);
    process.exit(1);
  }
};

module.exports = connectDB;
\`\`\`

## Model Definition

Create a User model in models/User.js:

\`\`\`javascript
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
\`\`\`

## Controllers

Create controller functions in controllers/userController.js:

\`\`\`javascript
const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new user
// @route   POST /api/users
// @access  Public
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create user
    const user = await User.create({
      name,
      email,
      password, // In a real app, hash this password
    });
    
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Public
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select('-password');
    
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Public
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await user.remove();
    res.status(200).json({ message: 'User removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
\`\`\`

## Routes

Define routes in routes/userRoutes.js:

\`\`\`javascript
const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
\`\`\`

## Testing the API

1. Start the server:

\`\`\`bash
npm run dev
\`\`\`

2. Use Postman or curl to test the endpoints:

   - GET /api/users - Get all users
   - GET /api/users/:id - Get user by ID
   - POST /api/users - Create a new user
   - PUT /api/users/:id - Update a user
   - DELETE /api/users/:id - Delete a user

## API Security Best Practices

1. **Password Hashing**: Hash passwords before storing them in the database using bcrypt.
2. **Authentication**: Implement JWT authentication for protected routes.
3. **Input Validation**: Validate all input data using a library like express-validator.
4. **Rate Limiting**: Implement rate limiting to prevent brute force attacks.
5. **CORS Configuration**: Configure CORS properly to restrict access to your API.
6. **Environment Variables**: Use environment variables for sensitive data.
7. **Error Handling**: Implement proper error handling to avoid leaking sensitive information.

## Further Improvements

1. Add authentication middleware for protected routes
2. Implement password hashing with bcrypt
3. Add pagination for list endpoints
4. Implement sorting and filtering options
5. Add validation middleware using express-validator
6. Implement file uploads with multer
7. Add comprehensive error handling
8. Implement request logging with morgan

By following this guide, you'll have a complete RESTful API with proper CRUD operations for a User resource.`
  },
  {
    id: 7,
    title: "Git and GitHub Workflow",
    description: "Essential Git commands and GitHub workflow for effective team collaboration.",
    category: "cheatsheet",
    tags: ["git", "github", "version control", "collaboration"],
    date: "Oct 8, 2022",
    fileSize: "82 KB",
    icon: FileText,
    author: "Emma Johnson",
    lastUpdated: "Nov 18, 2022",
    difficulty: "Beginner",
    estimatedReadTime: "20 mins",
    content: `# Git and GitHub Workflow

## Basic Git Commands

### Configuration

\`\`\`bash
# Set your username
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"

# Check config
git config --list
\`\`\`

### Creating Repositories

\`\`\`bash
# Initialize a new repository
git init

# Clone an existing repository
git clone https://github.com/username/repository.git
\`\`\`

### Basic Workflow

\`\`\`bash
# Check status
git status

# Add files to staging area
git add filename.ext        # Add specific file
git add .                  # Add all files

# Commit changes
git commit -m "Descriptive commit message"

# Commit all modified tracked files in one step
git commit -am "Commit message"

# Push changes to remote repository
git push origin branch-name
\`\`\`

### Working with Branches

\`\`\`bash
# List all branches
git branch

# Create a new branch
git branch branch-name

# Switch to a branch
git checkout branch-name

# Create and switch to a new branch in one command
git checkout -b branch-name

# Delete a branch
git branch -d branch-name    # Safe delete (checks if branch is merged)
git branch -D branch-name    # Force delete

# Merge a branch into current branch
git merge branch-name
\`\`\`

### Remote Repositories

\`\`\`bash
# List remote repositories
git remote -v

# Add a remote repository
git remote add origin https://github.com/username/repository.git

# Remove a remote repository
git remote remove origin

# Fetch updates from remote
git fetch origin

# Pull updates from remote (fetch + merge)
git pull origin branch-name

# Push to remote
git push origin branch-name
\`\`\`

## Effective GitHub Workflow

### Fork and Clone Workflow

1. **Fork the repository** on GitHub by clicking the "Fork" button
2. **Clone your fork**:
   \`\`\`bash
   git clone https://github.com/your-username/repository.git
   \`\`\`
3. **Set up upstream remote**:
   \`\`\`bash
   git remote add upstream https://github.com/original-owner/repository.git
   \`\`\`
4. **Create a feature branch**:
   \`\`\`bash
   git checkout -b feature-branch
   \`\`\`
5. **Make changes and commit**
6. **Push to your fork**:
   \`\`\`bash
   git push origin feature-branch
   \`\`\`
7. **Create a pull request** on GitHub

### Keeping Your Fork Updated

\`\`\`bash
# Fetch upstream changes
git fetch upstream

# Checkout your main branch
git checkout main

# Merge upstream changes
git merge upstream/main

# Push to your fork
git push origin main
\`\`\`

## Git Branching Strategies

### Gitflow Workflow

The Gitflow workflow defines a strict branching model designed around the project release:

- **main/master**: Production-ready code
- **develop**: Latest delivered development changes
- **feature/\***: New feature development
- **release/\***: Preparing for a release
- **hotfix/\***: Quick fixes for the live production

Example:

\`\`\`bash
# Start a new feature
git checkout -b feature/awesome-feature develop

# Finish a feature
git checkout develop
git merge --no-ff feature/awesome-feature
git branch -d feature/awesome-feature
git push origin develop

# Start a release
git checkout -b release/1.0.0 develop

# Finish a release
git checkout main
git merge --no-ff release/1.0.0
git tag -a 1.0.0
git checkout develop
git merge --no-ff release/1.0.0
git branch -d release/1.0.0

# Create a hotfix
git checkout -b hotfix/1.0.1 main

# Finish a hotfix
git checkout main
git merge --no-ff hotfix/1.0.1
git tag -a 1.0.1
git checkout develop
git merge --no-ff hotfix/1.0.1
git branch -d hotfix/1.0.1
\`\`\`

### GitHub Flow

A simpler alternative to Gitflow:

1. Create a branch from main
2. Make changes and commit
3. Open a pull request
4. Discuss and review
5. Deploy and test
6. Merge to main

## Advanced Git Commands

### Stashing Changes

\`\`\`bash
# Stash current changes
git stash

# List stashes
git stash list

# Apply a stash
git stash apply              # Latest stash
git stash apply stash@{n}    # Specific stash

# Apply and remove a stash
git stash pop

# Create a new branch from stash
git stash branch branch-name
\`\`\`

### Viewing History

\`\`\`bash
# View commit history
git log

# View commit history with graph
git log --graph --oneline --decorate

# View changes in a commit
git show commit-hash

# View changes between commits
git diff commit1..commit2
\`\`\`

### Undoing Changes

\`\`\`bash
# Discard changes in working directory
git checkout -- file.txt

# Undo staging
git reset HEAD file.txt

# Amend last commit
git commit --amend

# Reset to a specific commit (preserving changes as unstaged)
git reset commit-hash

# Reset to a specific commit (discarding changes)
git reset --hard commit-hash

# Revert a commit (creates a new commit that undoes changes)
git revert commit-hash
\`\`\`

### Rebasing

\`\`\`bash
# Rebase current branch onto another branch
git rebase branch-name

# Interactive rebase for editing commit history
git rebase -i HEAD~3    # Last 3 commits
\`\`\`

## Best Practices

1. **Write meaningful commit messages**
   - Follow the convention: "type: subject" (e.g., "feat: add login functionality")
   - Common types: feat, fix, docs, style, refactor, test, chore

2. **Commit frequently** with small, logical changes

3. **Never commit sensitive data** (use .gitignore)

4. **Branch and merge strategy**
   - Create branches for features, bug fixes, etc.
   - Keep branches short-lived
   - Delete branches after merging

5. **Pull before pushing** to avoid conflicts

6. **Use pull requests for code reviews**

7. **Tag important releases**
   \`\`\`bash
   git tag -a v1.0.0 -m "Version 1.0.0"
   git push origin v1.0.0
   \`\`\`

8. **Setup Git hooks** for consistent workflows

## Troubleshooting Common Issues

### Resolving Merge Conflicts

1. When a conflict occurs, Git will mark the files with conflict markers
2. Edit the files to resolve conflicts (remove markers and keep desired code)
3. Add the resolved files with \`git add\`
4. Complete the merge with \`git commit\`

### Recovering Lost Commits

\`\`\`bash
# Find lost commits
git reflog

# Recover a commit
git checkout -b recovery-branch commit-hash
\`\`\`

## Git Aliases

Add these to your \`.gitconfig\` file to save time:

\`\`\`
[alias]
  co = checkout
  br = branch
  ci = commit
  st = status
  unstage = reset HEAD --
  last = log -1 HEAD
  visual = !gitk
  lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
\`\`\`

## Conclusion

Mastering Git and GitHub workflows will significantly improve your productivity and collaboration in software development projects. Regular practice and consistent use of best practices will help you become proficient with these essential tools.`

  },{
    id: 8,
    title: "Rt Camp Interview Questions",
    description: "A collection of common interview questions and answers for rtCamp.",
    category: "cheatsheet",
    tags: ["rtCamp", "Interview Questions", "Placement", "Internship"],
    date: "May 19, 2025",
    fileSize: "",
    icon: FileText,
    author: "Sameer Bagul",
    lastUpdated: "May 19, 2025",
    difficulty: "Advanced",
    estimatedReadTime: "20 mins",
    content: `
    rt Camp Interview Questions
    [will be added soon]
    `
  }


];

export default studyMaterials;
