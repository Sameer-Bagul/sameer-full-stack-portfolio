import { useState, useEffect } from 'react';
import { NotesAPI, APIFolder, APINote, FolderWithNotes } from '@/services/notesApi';

interface UseNotesAPIReturn {
  folders: APIFolder[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseFolderNotesReturn {
  folder: FolderWithNotes | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useNotesAPI(): UseNotesAPIReturn {
  const [folders, setFolders] = useState<APIFolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFolders = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedFolders = await NotesAPI.getAllFolders(true);
      setFolders(fetchedFolders);
      console.log('Processed folders:', fetchedFolders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch folders');
      console.error('Error fetching folders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return {
    folders,
    loading,
    error,
    refetch: fetchFolders
  };
}

export function useFolderNotes(
  slug: string | null,
  options?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }
): UseFolderNotesReturn {
  const [folder, setFolder] = useState<FolderWithNotes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFolder = async () => {
    if (!slug) {
      setFolder(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const fetchedFolder = await NotesAPI.getFolderBySlug(slug, options);
      setFolder(fetchedFolder);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch folder');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFolder();
  }, [slug, options?.page, options?.limit, options?.search, options?.sortBy, options?.order]);

  return {
    folder,
    loading,
    error,
    refetch: fetchFolder
  };
}