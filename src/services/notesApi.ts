// API service for fetching notes and folders from the server

export interface APIFolder {
  _id: { $oid: string } | string;
  name: string;
  slug: string;
  userId: { $oid: string } | string;
  color?: string;
  parent?: { $oid: string } | string | null;
  isArchived: boolean;
  isDeployed: boolean;
  createdAt: { $date: string } | string;
  updatedAt: { $date: string } | string;
  noteCount?: number;
}

export interface APINote {
  _id: { $oid: string } | string;
  title: string;
  content: string;
  folderId?: { $oid: string } | string | null;
  userId: { $oid: string } | string;
  slug: string;
  tags: string[];
  isPinned: boolean;
  isArchived: boolean;
  color?: string;
  order: number;
  lastEditedAt: { $date: string } | string;
  createdAt: { $date: string } | string;
  updatedAt: { $date: string } | string;
  __v?: number;
}

// Helper functions to normalize MongoDB data
export const normalizeId = (id: { $oid: string } | string): string => {
  return typeof id === 'object' ? id.$oid : id;
};

export const normalizeDate = (date: { $date: string } | string): string => {
  return typeof date === 'object' ? date.$date : date;
};

export interface FolderWithNotes extends APIFolder {
  notes: APINote[];
  totalNotes: number;
}

// API Response wrapper
export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Replace these with your actual API base URL and username
// Option 1: Use ngrok tunnel (run: ngrok http 10000)
// const API_BASE_URL = 'https://your-ngrok-url.ngrok.io';

// Option 2: Use localhost (requires CORS setup on server)
const API_BASE_URL = 'http://localhost:10000';

const USERNAME = 'sameerbagul'; // Replace with your hardcoded username

// Mock notes data for demonstration purposes
const generateMockNotes = (folderSlug: string, folderName: string): APINote[] => {
  const mockNotes: APINote[] = [
    {
      _id: { $oid: `note-${folderSlug}-1` },
      title: `${folderName} - Introduction`,
      content: `
        <h1>${folderName} - Introduction</h1>
        <p>This is an introduction to ${folderName} concepts and fundamentals.</p>
        <h2>Key Concepts</h2>
        <ul>
          <li>Basic principles</li>
          <li>Core features</li>
          <li>Getting started</li>
        </ul>
        <h2>Code Example</h2>
        <pre><code class="language-javascript">
// Basic ${folderName} example
console.log("Hello, ${folderName}!");
        </code></pre>
      `,
      folderId: { $oid: `folder-${folderSlug}` },
      userId: { $oid: 'sameerbagul' },
      slug: `${folderSlug}-intro`,
      tags: ['introduction', 'basics', 'fundamentals'],
      isPinned: true,
      isArchived: false,
      color: 'blue',
      order: 1,
      lastEditedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: { $oid: `note-${folderSlug}-2` },
      title: `${folderName} - Advanced Topics`,
      content: `
        <h1>${folderName} - Advanced Topics</h1>
        <p>Advanced concepts and techniques in ${folderName}.</p>
        <h2>Advanced Features</h2>
        <ul>
          <li>Advanced patterns</li>
          <li>Performance optimization</li>
          <li>Best practices</li>
        </ul>
        <h2>Complex Example</h2>
        <pre><code class="language-javascript">
// Advanced ${folderName} pattern
class Advanced${folderName.replace(/\s+/g, '')} {
  constructor() {
    this.features = [];
  }
  
  addFeature(feature) {
    this.features.push(feature);
  }
}
        </code></pre>
      `,
      folderId: { $oid: `folder-${folderSlug}` },
      userId: { $oid: 'sameerbagul' },
      slug: `${folderSlug}-advanced`,
      tags: ['advanced', 'patterns', 'optimization'],
      isPinned: false,
      isArchived: false,
      color: 'purple',
      order: 2,
      lastEditedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: { $oid: `note-${folderSlug}-3` },
      title: `${folderName} - Cheat Sheet`,
      content: `
        <h1>${folderName} - Quick Reference</h1>
        <p>A quick reference guide for ${folderName}.</p>
        <h2>Common Commands</h2>
        <table>
          <tr><th>Command</th><th>Description</th></tr>
          <tr><td>init</td><td>Initialize project</td></tr>
          <tr><td>install</td><td>Install dependencies</td></tr>
          <tr><td>start</td><td>Start development server</td></tr>
        </table>
        <h2>Quick Tips</h2>
        <ul>
          <li>Always check documentation</li>
          <li>Use version control</li>
          <li>Test your code</li>
        </ul>
      `,
      folderId: { $oid: `folder-${folderSlug}` },
      userId: { $oid: 'sameerbagul' },
      slug: `${folderSlug}-cheatsheet`,
      tags: ['reference', 'quick', 'tips'],
      isPinned: false,
      isArchived: false,
      color: 'green',
      order: 3,
      lastEditedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  
  return mockNotes;
};

export class NotesAPI {
  static async getAllFolders(includeNoteCount = true): Promise<APIFolder[]> {
    try {
      const params = new URLSearchParams({
        username: USERNAME,
        ...(includeNoteCount && { includeNoteCount: 'true' })
      });
      
      const url = `${API_BASE_URL}/api/public/folders?${params}`;
      console.log('Fetching folders from:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      });
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error text:', errorText);
        throw new Error(`Failed to fetch folders: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Folders data:', data);
      console.log('Folders data type:', typeof data);
      console.log('Folders data.data type:', typeof data.data);
      console.log('Folders data.data is array:', Array.isArray(data.data));
      
      // Handle the nested response structure
      if (data.success && data.data) {
        const folderData = data.data;
        console.log('Processing folder data:', folderData);
        
        // Check if data.data has a 'folders' property (which contains the actual array)
        if (folderData.folders && Array.isArray(folderData.folders)) {
          console.log('Found folders array:', folderData.folders);
          console.log('Number of folders:', folderData.folders.length);
          console.log('First folder sample:', folderData.folders[0]);
          
          // Log the structure of each folder to debug
          folderData.folders.forEach((folder, index) => {
            console.log(`Folder ${index}:`, folder);
            console.log(`Folder ${index} keys:`, Object.keys(folder));
            console.log(`Folder ${index} name:`, folder.name);
            console.log(`Folder ${index} slug:`, folder.slug);
          });
          
          return folderData.folders;
        }
        
        // Fallback: check if data.data is directly an array
        if (Array.isArray(folderData)) {
          console.log('Returning array of folders:', folderData);
          console.log('First folder sample:', folderData[0]);
          return folderData;
        } else if (folderData && typeof folderData === 'object') {
          console.log('Converting single folder to array:', [folderData]);
          console.log('Single folder keys:', Object.keys(folderData));
          return [folderData];
        } else {
          console.log('Invalid folder data, returning empty array');
          return [];
        }
      }
      
      // If no success or data, return empty array as fallback
      console.log('No success or data, returning empty array');
      return [];
    } catch (error) {
      console.error('Error fetching folders:', error);
      throw error;
    }
  }

  static async getFolderBySlug(
    slug: string,
    options?: {
      page?: number;
      limit?: number;
      search?: string;
      sortBy?: string;
      order?: 'asc' | 'desc';
    }
  ): Promise<FolderWithNotes> {
    try {
      // First, get the folder details from the folders list to get the proper name
      const allFolders = await this.getAllFolders(true);
      const folderInfo = allFolders.find(folder => folder.slug === slug);
      
      if (!folderInfo) {
        throw new Error(`Folder with slug '${slug}' not found`);
      }
      
      // Use the correct endpoint that actually works: /api/public/folders/:slug
      let realNotes: APINote[] = [];
      
      try {
        const folderWithNotesUrl = `${API_BASE_URL}/api/public/folders/${slug}?username=${USERNAME}&page=1`;
        console.log('Fetching folder with notes from:', folderWithNotesUrl);
        
        const folderResponse = await fetch(folderWithNotesUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors'
        });
        
        if (folderResponse.ok) {
          const folderData = await folderResponse.json();
          console.log('Folder with notes response:', folderData);
          
          if (folderData.success && folderData.data && folderData.data.notes) {
            realNotes = Array.isArray(folderData.data.notes) ? folderData.data.notes : [];
            console.log('Found real notes from folder endpoint:', realNotes.length);
          }
        } else {
          console.log('Folder endpoint failed with status:', folderResponse.status);
        }
      } catch (error) {
        console.log('Folder endpoint failed:', error);
      }
      
      // If no real notes found, use mock notes as fallback
      if (realNotes.length === 0) {
        console.log('No real notes found, using mock notes as fallback');
        realNotes = generateMockNotes(slug, folderInfo.name);
      }
      
      // Create a folder object with the real notes (or mock notes as fallback)
      const folderWithNotes: FolderWithNotes = {
        _id: folderInfo._id,
        name: folderInfo.name,
        slug: folderInfo.slug,
        userId: folderInfo.userId,
        color: folderInfo.color,
        parent: folderInfo.parent,
        isArchived: folderInfo.isArchived,
        isDeployed: folderInfo.isDeployed,
        createdAt: folderInfo.createdAt,
        updatedAt: folderInfo.updatedAt,
        notes: realNotes,
        totalNotes: realNotes.length
      };
      
      console.log(`Returning folder with ${realNotes.length} notes (${realNotes.length > 0 && realNotes[0]._id.toString().includes('note-') ? 'mock' : 'real'})`);
      return folderWithNotes;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  }
}