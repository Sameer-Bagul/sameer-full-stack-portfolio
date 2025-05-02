
import { Book, FileText } from 'lucide-react';

// Define the type for study materials 
// this just the type definition... ok bhai!
export type StudyMaterial = {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  fileSize: string;
  icon: typeof Book | typeof FileText;
  content?: string;
};

// Sample study materials data
export const studyMaterials: StudyMaterial[] = [
  
  {
    id: 1,
    title: 'Advanced JavaScript Concepts',
    description: 'A comprehensive guide to advanced JavaScript concepts including closures, prototypes, and async programming. This material covers functional programming approaches, design patterns, and modern ES6+ features that will help you build more maintainable applications.',
    category: 'notes',
    tags: ['JavaScript', 'Programming', 'ES6+', 'Advanced'],
    date: 'Nov 10, 2023',
    fileSize: '1.2 MB',
    icon: Book,
    content: `
# Advanced JavaScript Concepts

JavaScript is a versatile and powerful programming language that forms the backbone of modern web development. This notebook explores advanced JavaScript concepts that every developer should understand to write clean, efficient, and maintainable code.

## 1. Closures

Closures are functions that remember the environment in which they were created. This includes variables, parameters, and other functions declared in the outer scope.

\`\`\`javascript
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
counter(); // 1
counter(); // 2
\`\`\`

### Practical Applications of Closures

Closures are incredibly useful for:

1. **Data Privacy** - Creating private variables that can't be accessed directly
2. **Factory Functions** - Generating specialized functions with pre-set parameters
3. **Event Handlers** - Maintaining state between event triggers
4. **Memoization** - Caching function results for performance optimization

## 2. Prototypal Inheritance

JavaScript uses prototype-based inheritance. Objects can inherit properties and methods from other objects.

\`\`\`javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  return \`Hello, my name is \${this.name}\`;
};

const john = new Person('John');
john.greet(); // "Hello, my name is John"
\`\`\`

### The Prototype Chain

When you access a property on an object, JavaScript:
1. Checks if the property exists on the object itself
2. If not, checks the object's prototype
3. Continues up the prototype chain until it finds the property or reaches the end

## 3. Async Programming

JavaScript handles asynchronous operations through callbacks, promises, and async/await.

### Callbacks

\`\`\`javascript
function fetchData(callback) {
  setTimeout(() => {
    callback('Data received');
  }, 1000);
}

fetchData(data => {
  console.log(data); // 'Data received' after 1 second
});
\`\`\`

### Promises

\`\`\`javascript
// Using Promises
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
\`\`\`

### Async/Await

\`\`\`javascript
// Using async/await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

## 4. Functional Programming Concepts

JavaScript supports functional programming paradigms, allowing for more declarative and less error-prone code.

### Higher-Order Functions

Functions that take other functions as arguments or return functions.

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// Using map (a higher-order function)
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]
\`\`\`

### Pure Functions

Functions that:
1. Always return the same output for the same input
2. Have no side effects

\`\`\`javascript
// Pure function
function add(a, b) {
  return a + b;
}

// Impure function (has side effect)
let total = 0;
function addToTotal(value) {
  total += value; // Side effect: modifies external state
  return total;
}
\`\`\`

### Immutability

Avoiding changes to data after it's created.

\`\`\`javascript
// Mutable approach
const person = { name: 'Alice' };
person.name = 'Bob'; // Modifying the original object

// Immutable approach
const person = { name: 'Alice' };
const updatedPerson = { ...person, name: 'Bob' }; // Creating a new object
\`\`\`

## 5. Design Patterns

Common solutions to recurring problems in software design.

### Module Pattern

Encapsulates functionality and provides privacy.

\`\`\`javascript
const calculator = (function() {
  // Private variables
  let result = 0;
  
  // Public interface
  return {
    add: function(x) {
      result += x;
      return this;
    },
    subtract: function(x) {
      result -= x;
      return this;
    },
    getResult: function() {
      return result;
    }
  };
})();

calculator.add(5).subtract(2).getResult(); // 3
\`\`\`

### Observer Pattern

Allows objects to notify other objects about changes.

\`\`\`javascript
class Observable {
  constructor() {
    this.observers = [];
  }
  
  subscribe(observer) {
    this.observers.push(observer);
  }
  
  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  
  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

const subject = new Observable();
subject.subscribe(data => console.log('Observer 1:', data));
subject.subscribe(data => console.log('Observer 2:', data));
subject.notify('Hello observers!');
\`\`\`

## 6. Memory Management and Performance

Understanding how JavaScript manages memory is crucial for building performant applications.

### Memory Leaks

Common causes:
1. Global variables
2. Forgotten timers or callbacks
3. Out of DOM references
4. Closures

\`\`\`javascript
// Memory leak example
function createNodes() {
  let div;
  let i = 100;
  let frag = document.createDocumentFragment();
  
  for (i = 0; i < 100; i++) {
    div = document.createElement("div");
    div.appendChild(document.createTextNode(i + " - " + new Date().toTimeString()));
    frag.appendChild(div);
  }
  
  document.body.appendChild(frag);
}

setInterval(createNodes, 1000); // This will eventually crash the browser
\`\`\`

### Performance Optimization

1. **Debouncing and Throttling** - Control the rate at which functions are called
2. **Web Workers** - Run CPU-intensive tasks in background threads
3. **Virtualization** - Only render visible elements in long lists
4. **Memoization** - Cache function results for repeated calls

## Conclusion

Mastering these advanced JavaScript concepts will significantly improve your ability to write robust, efficient, and maintainable code. Practice these patterns in your projects and continue exploring the rich ecosystem of JavaScript development.
`
  },
  {
    id: 2,
    title: 'React Component Patterns',
    description: 'Notes on various React component patterns, including render props, compound components, and custom hooks. Learn how to structure your components for maximum reusability and maintainability across complex React applications.',
    category: 'notes',
    tags: ['React', 'Web Development', 'Frontend', 'Components'],
    date: 'Oct 15, 2023',
    fileSize: '850 KB',
    icon: Book,
    content: `
# React Component Patterns

This notebook covers advanced React component patterns that can help you build more maintainable, reusable, and composable UI components.

## Compound Components

Compound components provide an expressive and flexible API by allowing components to communicate implicitly using React's context API.

### Basic Example

\`\`\`jsx
// Menu.tsx
import React, { createContext, useState } from 'react';

const MenuContext = createContext(null);

export function Menu({ children }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const value = { activeIndex, setActiveIndex };
  
  return (
    <MenuContext.Provider value={value}>
      <div className="menu">{children}</div>
    </MenuContext.Provider>
  );
}

Menu.Item = function MenuItem({ children, index }) {
  const { activeIndex, setActiveIndex } = React.useContext(MenuContext);
  const isActive = activeIndex === index;
  
  return (
    <div 
      className={\`menu-item \${isActive ? 'active' : ''}\`}
      onClick={() => setActiveIndex(index)}
    >
      {children}
    </div>
  );
};
\`\`\`

### Usage

\`\`\`jsx
<Menu>
  <Menu.Item index={0}>Home</Menu.Item>
  <Menu.Item index={1}>About</Menu.Item>
  <Menu.Item index={2}>Contact</Menu.Item>
</Menu>
\`\`\`

## Render Props

The render prop pattern involves passing a function as a prop that returns a React element, giving the component control over what to render.

### Basic Example

\`\`\`jsx
// MouseTracker.tsx
import React, { useState, useEffect } from 'react';

function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    function handleMouseMove(event) {
      setPosition({ x: event.clientX, y: event.clientY });
    }
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return render(position);
}

// Usage
<MouseTracker
  render={({ x, y }) => (
    <div>
      Mouse position: {x}, {y}
    </div>
  )}
/>
\`\`\`

## Custom Hooks

Custom hooks allow you to extract component logic into reusable functions.

### Basic Example

\`\`\`jsx
// useLocalStorage.ts
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', 'Bob');
  
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </div>
  );
}
\`\`\`

## Higher Order Components (HOCs)

HOCs are functions that take a component and return a new component with enhanced functionality.

### Basic Example

\`\`\`jsx
// withAuth.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const isAuthenticated = !!localStorage.getItem('token');
    
    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, router]);
    
    if (!isAuthenticated) {
      return <div>Loading...</div>;
    }
    
    return <Component {...props} />;
  };
}

// Usage
const ProtectedPage = () => <div>This page requires authentication</div>;
export default withAuth(ProtectedPage);
\`\`\`

## Context + useReducer for State Management

For complex state management needs, combining context with useReducer can provide a Redux-like setup.

### Basic Example

\`\`\`jsx
// TodoContext.tsx
import React, { createContext, useReducer, useContext } from 'react';

// Define types
type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type State = {
  todos: Todo[];
};

type Action = 
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number };

// Create context
const TodoContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

// Reducer function
function todoReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos, 
          { 
            id: Date.now(), 
            text: action.payload, 
            completed: false 
          }
        ]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo => 
          todo.id === action.payload 
            ? { ...todo, completed: !todo.completed } 
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    default:
      return state;
  }
}

// Provider component
export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });
  
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

// Custom hook for using this context
export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}

// Usage in components
function TodoList() {
  const { state, dispatch } = useTodo();
  
  return (
    <div>
      {state.todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch({ 
              type: 'TOGGLE_TODO', 
              payload: todo.id 
            })}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <button onClick={() => dispatch({
            type: 'DELETE_TODO',
            payload: todo.id
          })}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
\`\`\`

## Controlled vs Uncontrolled Components

Understanding when to use each approach is essential for form handling in React.

### Controlled Component

\`\`\`jsx
function ControlledForm() {
  const [value, setValue] = useState('');
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with:', value);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

### Uncontrolled Component

\`\`\`jsx
function UncontrolledForm() {
  const inputRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with:', inputRef.current.value);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} defaultValue="" />
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

## Conclusion

These React component patterns offer different ways to structure your code for improved reusability, separation of concerns, and maintainability. The best pattern to use depends on your specific use case.

- **Compound Components** - For related components that need to share state
- **Render Props** - For sharing behavior between components
- **Custom Hooks** - For reusing stateful logic across components
- **HOCs** - For adding features to components
- **Context + useReducer** - For complex state management
- **Controlled vs Uncontrolled Components** - For form handling strategies

By mastering these patterns, you'll be able to build more flexible and maintainable React applications.
`
  },
  {
    id: 3,
    title: 'SQL Database Design Cheatsheet',
    description: 'A quick reference for database design principles, normalization, and SQL query optimization. This cheatsheet includes common commands, best practices, and performance tips for working with relational databases.',
    category: 'cheatsheet',
    tags: ['SQL', 'Database', 'Backend', 'Performance'],
    date: 'Sep 25, 2023',
    fileSize: '500 KB',
    icon: FileText,
    content: `
# SQL Database Design Cheatsheet

## Data Types

### Numeric Types
- **INTEGER**: Whole numbers (-2,147,483,648 to 2,147,483,647)
- **SMALLINT**: Small range whole numbers (-32,768 to 32,767)
- **BIGINT**: Large range whole numbers (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807)
- **DECIMAL(p,s)**: Exact numeric with precision p and scale s
- **NUMERIC(p,s)**: Same as DECIMAL
- **FLOAT(p)**: Approximate numeric with precision p
- **REAL**: Single precision floating-point (4 bytes)
- **DOUBLE PRECISION**: Double precision floating-point (8 bytes)

### String Types
- **CHAR(n)**: Fixed-length character string (1 to 255)
- **VARCHAR(n)**: Variable-length character string (1 to 65,535)
- **TEXT**: Variable-length character string (up to 65,535 characters)
- **MEDIUMTEXT**: Up to 16,777,215 characters
- **LONGTEXT**: Up to 4,294,967,295 characters

### Date/Time Types
- **DATE**: Date (YYYY-MM-DD)
- **TIME**: Time (HH:MM:SS)
- **DATETIME**: Date and time (YYYY-MM-DD HH:MM:SS)
- **TIMESTAMP**: Date and time with timezone conversion
- **YEAR**: Year (YYYY)

### Binary Types
- **BINARY(n)**: Fixed-length binary string
- **VARBINARY(n)**: Variable-length binary string
- **BLOB**: Binary Large Object (up to 65,535 bytes)
- **MEDIUMBLOB**: Up to 16,777,215 bytes
- **LONGBLOB**: Up to 4,294,967,295 bytes

### Other Types
- **BOOLEAN/BOOL**: TRUE or FALSE (stored as TINYINT)
- **ENUM**: One of a predefined list of values
- **SET**: Zero or more from a predefined list of values
- **JSON**: JSON document (MySQL 5.7.8+)
- **UUID**: Universal Unique Identifier (supported in some databases)

## Database Design Principles

### Normalization Forms

#### 1NF (First Normal Form)
- Each table cell should contain a single value
- Each record needs to be unique

\`\`\`sql
-- Bad (not 1NF):
CREATE TABLE student_courses (
  student_id INT,
  student_name VARCHAR(100),
  courses VARCHAR(255) -- Comma-separated list: "Math, Science, History"
);

-- Good (1NF):
CREATE TABLE students (
  student_id INT PRIMARY KEY,
  student_name VARCHAR(100)
);

CREATE TABLE student_courses (
  student_id INT,
  course_name VARCHAR(100),
  PRIMARY KEY (student_id, course_name),
  FOREIGN KEY (student_id) REFERENCES students(student_id)
);
\`\`\`

#### 2NF (Second Normal Form)
- Must be in 1NF
- All non-key attributes are fully dependent on the primary key

\`\`\`sql
-- Bad (not 2NF):
CREATE TABLE order_items (
  order_id INT,
  product_id INT,
  product_name VARCHAR(100), -- Depends only on product_id, not the full PK
  quantity INT,
  PRIMARY KEY (order_id, product_id)
);

-- Good (2NF):
CREATE TABLE products (
  product_id INT PRIMARY KEY,
  product_name VARCHAR(100)
);

CREATE TABLE order_items (
  order_id INT,
  product_id INT,
  quantity INT,
  PRIMARY KEY (order_id, product_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);
\`\`\`

#### 3NF (Third Normal Form)
- Must be in 2NF
- No transitive dependencies (non-key attributes dependent on other non-key attributes)

\`\`\`sql
-- Bad (not 3NF):
CREATE TABLE employees (
  employee_id INT PRIMARY KEY,
  department_id INT,
  department_name VARCHAR(100), -- Depends on department_id, not employee_id
  salary DECIMAL(10,2)
);

-- Good (3NF):
CREATE TABLE departments (
  department_id INT PRIMARY KEY,
  department_name VARCHAR(100)
);

CREATE TABLE employees (
  employee_id INT PRIMARY KEY,
  department_id INT,
  salary DECIMAL(10,2),
  FOREIGN KEY (department_id) REFERENCES departments(department_id)
);
\`\`\`

### Keys and Constraints

#### Primary Key
\`\`\`sql
CREATE TABLE users (
  user_id INT PRIMARY KEY,
  username VARCHAR(50) NOT NULL
);

-- Or using constraint syntax:
CREATE TABLE users (
  user_id INT,
  username VARCHAR(50) NOT NULL,
  CONSTRAINT pk_user PRIMARY KEY (user_id)
);
\`\`\`

#### Foreign Key
\`\`\`sql
CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  user_id INT,
  order_date DATE,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Or using constraint syntax:
CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  user_id INT,
  order_date DATE,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);
\`\`\`

#### Unique Constraint
\`\`\`sql
CREATE TABLE users (
  user_id INT PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  email VARCHAR(100) UNIQUE
);
\`\`\`

#### Check Constraint
\`\`\`sql
CREATE TABLE products (
  product_id INT PRIMARY KEY,
  product_name VARCHAR(100),
  price DECIMAL(10,2) CHECK (price > 0)
);
\`\`\`

#### Default Value
\`\`\`sql
CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  user_id INT,
  order_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(20) DEFAULT 'pending'
);
\`\`\`

#### Not Null Constraint
\`\`\`sql
CREATE TABLE users (
  user_id INT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);
\`\`\`

## Indexing

### Create Index
\`\`\`sql
-- Create a basic index
CREATE INDEX idx_username ON users(username);

-- Create a unique index
CREATE UNIQUE INDEX idx_email ON users(email);

-- Create a composite index
CREATE INDEX idx_name_email ON users(last_name, first_name, email);
\`\`\`

### When to Use Indexes
- Columns used frequently in WHERE clauses
- Columns used in JOIN conditions
- Columns used in ORDER BY or GROUP BY
- Unique constraints automatically create indexes

### When to Avoid Indexes
- Small tables
- Columns that are updated frequently
- Columns with low cardinality (few unique values)
- Tables that are primarily for inserting/updating

## Query Optimization

### Use Specific Column Names
\`\`\`sql
-- Bad
SELECT * FROM users;

-- Good
SELECT user_id, username, email FROM users;
\`\`\`

### Limit Results
\`\`\`sql
-- Return only 100 records
SELECT * FROM logs ORDER BY timestamp DESC LIMIT 100;
\`\`\`

### Use JOINs Appropriately
\`\`\`sql
-- INNER JOIN: only matching records
SELECT u.username, o.order_date
FROM users u
INNER JOIN orders o ON u.user_id = o.user_id;

-- LEFT JOIN: all records from left table
SELECT u.username, o.order_date
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id;
\`\`\`

### Use WHERE Before HAVING
\`\`\`sql
-- Less efficient
SELECT department_id, AVG(salary)
FROM employees
GROUP BY department_id
HAVING department_id IN (1, 2, 3);

-- More efficient
SELECT department_id, AVG(salary)
FROM employees
WHERE department_id IN (1, 2, 3)
GROUP BY department_id;
\`\`\`

### Use EXISTS for Subqueries
\`\`\`sql
-- Less efficient
SELECT * FROM users
WHERE user_id IN (SELECT user_id FROM orders);

-- More efficient
SELECT * FROM users u
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.user_id);
\`\`\`

### Avoid Functions in WHERE Clauses
\`\`\`sql
-- Bad (can't use index)
SELECT * FROM users WHERE UPPER(username) = 'JOHN';

-- Good
SELECT * FROM users WHERE username = 'john';
-- Or create a functional index
\`\`\`

## Common SQL Commands

### Create Database/Table
\`\`\`sql
-- Create database
CREATE DATABASE my_database;

-- Use database
USE my_database;

-- Create table
CREATE TABLE employees (
  employee_id INT PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  hire_date DATE,
  department_id INT,
  salary DECIMAL(10,2)
);
\`\`\`

### Insert Data
\`\`\`sql
-- Insert a single row
INSERT INTO employees (employee_id, first_name, last_name, hire_date, department_id, salary)
VALUES (1, 'John', 'Doe', '2022-01-15', 3, 75000.00);

-- Insert multiple rows
INSERT INTO employees (employee_id, first_name, last_name, hire_date, department_id, salary)
VALUES 
  (2, 'Jane', 'Smith', '2022-02-01', 2, 82000.00),
  (3, 'Michael', 'Johnson', '2022-02-15', 3, 67000.00);
\`\`\`

### Select Data
\`\`\`sql
-- Basic select
SELECT * FROM employees;

-- Select specific columns
SELECT employee_id, first_name, last_name FROM employees;

-- With WHERE clause
SELECT * FROM employees WHERE department_id = 3;

-- With ORDER BY
SELECT * FROM employees ORDER BY salary DESC;

-- With GROUP BY
SELECT department_id, AVG(salary) as avg_salary
FROM employees
GROUP BY department_id;

-- With HAVING
SELECT department_id, AVG(salary) as avg_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 70000;
\`\`\`

### Update Data
\`\`\`sql
-- Update all records in a column
UPDATE employees SET salary = salary * 1.05;

-- Update with condition
UPDATE employees 
SET salary = salary * 1.10
WHERE department_id = 3;
\`\`\`

### Delete Data
\`\`\`sql
-- Delete with condition
DELETE FROM employees WHERE employee_id = 3;

-- Delete all data
DELETE FROM employees;
-- or
TRUNCATE TABLE employees;
\`\`\`

### Alter Table
\`\`\`sql
-- Add column
ALTER TABLE employees ADD email VARCHAR(100);

-- Modify column
ALTER TABLE employees MODIFY email VARCHAR(150) NOT NULL;

-- Drop column
ALTER TABLE employees DROP COLUMN email;

-- Add constraint
ALTER TABLE employees 
ADD CONSTRAINT fk_department 
FOREIGN KEY (department_id) REFERENCES departments(department_id);
\`\`\`

## Performance Tips

1. **Use appropriate data types** - Don't use VARCHAR for numbers or dates
2. **Normalize but don't over-normalize** - Consider denormalizing for read-heavy workloads
3. **Use batching for bulk operations** - Insert/update multiple rows at once
4. **Be careful with table joins** - Joining many tables can slow down queries
5. **Consider partitioning large tables** - Split tables horizontally or vertically
6. **Create indexes strategically** - Index columns used in WHERE, JOIN, ORDER BY
7. **Use EXPLAIN to analyze queries** - Understand how the database executes your query
8. **Consider caching** - Use application-level caching for frequent queries
9. **Keep transactions short** - Long transactions can cause locking issues
10. **Regular maintenance** - Update statistics, rebuild indexes, etc.

## Common Database Management Tasks

### Backup and Restore
\`\`\`sql
-- MySQL backup
mysqldump -u username -p database_name > backup.sql

-- MySQL restore
mysql -u username -p database_name < backup.sql

-- PostgreSQL backup
pg_dump -U username database_name > backup.sql

-- PostgreSQL restore
psql -U username database_name < backup.sql
\`\`\`

### User Management
\`\`\`sql
-- Create user
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';

-- Grant privileges
GRANT SELECT, INSERT, UPDATE ON database.table TO 'username'@'localhost';

-- Revoke privileges
REVOKE INSERT ON database.table FROM 'username'@'localhost';

-- Delete user
DROP USER 'username'@'localhost';
\`\`\`

### Check Database Size
\`\`\`sql
-- MySQL
SELECT table_schema AS "Database",
ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS "Size (MB)"
FROM information_schema.TABLES
GROUP BY table_schema;

-- PostgreSQL
SELECT pg_size_pretty(pg_database_size('database_name')) AS size;
\`\`\`

## Common Design Patterns

### One-to-One Relationship
\`\`\`sql
CREATE TABLE users (
  user_id INT PRIMARY KEY,
  username VARCHAR(50)
);

CREATE TABLE user_profiles (
  user_id INT PRIMARY KEY,
  bio TEXT,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
\`\`\`

### One-to-Many Relationship
\`\`\`sql
CREATE TABLE departments (
  department_id INT PRIMARY KEY,
  department_name VARCHAR(100)
);

CREATE TABLE employees (
  employee_id INT PRIMARY KEY,
  department_id INT,
  employee_name VARCHAR(100),
  FOREIGN KEY (department_id) REFERENCES departments(department_id)
);
\`\`\`

### Many-to-Many Relationship
\`\`\`sql
CREATE TABLE students (
  student_id INT PRIMARY KEY,
  student_name VARCHAR(100)
);

CREATE TABLE courses (
  course_id INT PRIMARY KEY,
  course_name VARCHAR(100)
);

CREATE TABLE student_courses (
  student_id INT,
  course_id INT,
  enrollment_date DATE,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(student_id),
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
\`\`\`

### Tree Structure (Hierarchical Data)
\`\`\`sql
CREATE TABLE categories (
  category_id INT PRIMARY KEY,
  category_name VARCHAR(100),
  parent_id INT,
  FOREIGN KEY (parent_id) REFERENCES categories(category_id)
);
\`\`\`

### Soft Delete Pattern
\`\`\`sql
CREATE TABLE users (
  user_id INT PRIMARY KEY,
  username VARCHAR(50),
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMP NULL
);

-- Instead of DELETE FROM users WHERE user_id = 1;
UPDATE users SET is_deleted = TRUE, deleted_at = CURRENT_TIMESTAMP WHERE user_id = 1;

-- Queries should include is_deleted = FALSE
SELECT * FROM users WHERE is_deleted = FALSE;
\`\`\`
`
  },
  {
    id: 4,
    title: 'Responsive Web Design Guide',
    description: 'Comprehensive notes on responsive design principles, media queries, and mobile-first development. This guide covers flexible layouts, responsive images, and CSS frameworks to create websites that work across all device sizes.',
    category: 'notes',
    tags: ['CSS', 'Web Design', 'Responsive', 'Frontend'],
    date: 'Aug 30, 2023',
    fileSize: '1.5 MB',
    icon: Book,
    content: `
# Responsive Web Design Guide
Responsive web design (RWD) is an approach to web development that makes web pages render well on a variety of devices and window or screen sizes. This guide covers the principles, techniques, and tools for creating responsive websites.
## Principles of Responsive Web Design
1. **Fluid Grids**: Use relative units like percentages instead of fixed units like pixels for layout elements.
2. **Flexible Images**: Ensure images scale within their containing elements using CSS properties like max-width.
3. **Media Queries**: Apply different styles based on device characteristics such as width, height, and orientation.
4. **Mobile-First Approach**: Start with a mobile design and progressively enhance for larger screens.
5. **Viewport Meta Tag**: Use the viewport meta tag to control layout on mobile browsers.
## Media Queries
Media queries are a CSS technique that allows you to apply styles based on the device's characteristics. They can be used to create breakpoints for different screen sizes.
### Syntax
\`\`\`css
@media (condition) {
  /* CSS rules */
}
\`\`\`
### Common Conditions
`
  },
  {
    id: 5,
    title: 'Git Commands Cheatsheet',
    description: 'A collection of frequently used Git commands and workflows for version control. This reference includes branching strategies, conflict resolution, and advanced Git techniques for managing your code repositories effectively.',
    category: 'cheatsheet',
    tags: ['Git', 'DevOps', 'Version Control', 'Workflow'],
    date: 'Jul 18, 2023',
    fileSize: '320 KB',
    icon: FileText,
    content: `# Materail add nhi kiya bhai karne wala hu !!`
  },
  {
    id: 6,
    title: 'TypeScript Best Practices',
    description: 'Notes on TypeScript types, interfaces, generics, and effective type checking. Learn how to leverage TypeScript\'s powerful type system to build more robust applications with fewer runtime errors.',
    category: 'notes',
    tags: ['TypeScript', 'JavaScript', 'Programming', 'Type Safety'],
    date: 'Jun 22, 2023',
    fileSize: '980 KB',
    icon: Book,
    content: `# Materail add nhi kiya bhai karne wala hu !!`
  },
  {
    id: 7,
    title: 'CSS Grid and Flexbox Layout Systems',
    description: 'Detailed comparison and examples of CSS Grid and Flexbox for modern web layouts. This guide shows when and how to use each layout system for creating responsive, complex UI designs with clean, maintainable code.',
    category: 'notes',
    tags: ['CSS', 'Layout', 'Frontend', 'Web Design'],
    date: 'May 15, 2023',
    fileSize: '1.1 MB',
    icon: Book,
    content: `# Materail add nhi kiya bhai karne wala hu !!`
  },
  {
    id: 8,
    title: 'MERN Stack Development Guide',
    description: 'Comprehensive notes on building full-stack applications with MongoDB, Express, React, and Node.js. This guide covers everything from setting up your development environment to deploying production-ready applications.',
    category: 'notes',
    tags: ['MERN', 'Full-Stack', 'JavaScript', 'Web Development'],
    date: 'Apr 5, 2023',
    fileSize: '2.3 MB',
    icon: Book,
    content: `# Materail add nhi kiya bhai karne wala hu !!`
  },
  {
    id: 9,
    title: 'Docker Commands Cheatsheet',
    description: 'Essential Docker commands and patterns for containerization. This reference includes creating and managing containers, working with Docker Compose, and optimizing Docker images for production environments.',
    category: 'cheatsheet',
    tags: ['Docker', 'DevOps', 'Containers', 'Deployment'],
    date: 'Mar 12, 2023',
    fileSize: '450 KB',
    icon: FileText,
    content: `# Materail add nhi kiya bhai karne wala hu !!`
  },
  {
    id: 10,
    title: 'Algorithms and Data Structures',
    description: 'Notes on common algorithms and data structures with JavaScript implementations. This material covers time and space complexity analysis, searching, sorting, and advanced data structures for solving complex programming problems.',
    category: 'notes',
    tags: ['Algorithms', 'Data Structures', 'Computer Science', 'Interviews'],
    date: 'Feb 8, 2023',
    fileSize: '1.8 MB',
    icon: Book,
    content: `# Materail add nhi kiya bhai karne wala hu !!`
  },
  {
    id: 11,
    title: 'AWS Services Overview',
    description: 'A comprehensive guide to core Amazon Web Services offerings and their common use cases. Learn about compute, storage, database, networking, and serverless services in the AWS cloud ecosystem.',
    category: 'notes',
    tags: ['AWS', 'Cloud', 'DevOps', 'Infrastructure'],
    date: 'Jan 20, 2023',
    fileSize: '1.4 MB',
    icon: Book,
    content: `# Materail add nhi kiya bhai karne wala hu !!`
  },
  {
    id: 12,
    title: 'Regular Expressions Cheatsheet',
    description: 'A quick reference for common regex patterns and syntax across different programming languages. This cheatsheet includes examples for validating emails, parsing text, and other text manipulation tasks.',
    category: 'cheatsheet',
    tags: ['Regex', 'Programming', 'Text Processing', 'Validation'],
    date: 'Dec 5, 2022',
    fileSize: '280 KB',
    icon: FileText,
    content: `# Materail add nhi kiya bhai karne wala hu !!`
  }
];
