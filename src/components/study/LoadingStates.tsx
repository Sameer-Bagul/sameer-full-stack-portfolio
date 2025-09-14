import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export function FolderLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
        >
          <Card className="h-full bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm border border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-violet-100/60 to-purple-100/40 dark:from-violet-900/40 dark:to-purple-900/20">
                  <Skeleton className="w-7 h-7 rounded" />
                </div>
                <Skeleton className="w-5 h-5 rounded" />
              </div>
              <Skeleton className="h-6 w-3/4 mb-3 bg-gradient-to-r from-violet-200/50 to-purple-200/50 dark:from-violet-800/50 dark:to-purple-800/50" />
              <Skeleton className="h-4 w-full mb-4 bg-gradient-to-r from-gray-200/50 to-gray-300/50 dark:from-gray-700/50 dark:to-gray-600/50" />
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-7 w-14 rounded" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

export function MaterialLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
        >
          <Card className="h-full bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm border border-white/20">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-violet-100/60 to-purple-100/40 dark:from-violet-900/40 dark:to-purple-900/20 flex-shrink-0">
                  <Skeleton className="w-5 h-5 rounded" />
                </div>
                <Skeleton className="w-4 h-4 rounded" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="h-5 w-full bg-gradient-to-r from-violet-200/50 to-purple-200/50 dark:from-violet-800/50 dark:to-purple-800/50" />
                  <Skeleton className="w-3 h-3 rounded-full flex-shrink-0" />
                </div>
                <Skeleton className="h-4 w-4/5 mb-4 bg-gradient-to-r from-gray-200/50 to-gray-300/50 dark:from-gray-700/50 dark:to-gray-600/50" />
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <Skeleton className="h-5 w-12 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-10 rounded-full" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-16 rounded-md" />
                  <Skeleton className="h-7 w-14 rounded" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

export function NoteContentSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 px-4 md:px-0 pb-32"
    >
      <div className="notebook-paper enhanced-note-paper rounded-2xl shadow-2xl overflow-hidden border border-border/40">
        <article className="font-playfair">
          <div className="material-header px-8 pt-8 pb-2">
            <Skeleton className="h-12 w-3/4 mb-4 bg-gradient-to-r from-violet-200/50 to-purple-200/50 dark:from-violet-800/50 dark:to-purple-800/50" />
            <div className="flex flex-wrap gap-2 mb-4">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
            <div className="material-meta">
              <div className="meta-item">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="meta-item">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="meta-item">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
          <hr className="my-4 border-border/30" />
          <div className="px-8 md:px-12 pb-14">
            <div className="space-y-4">
              <Skeleton className="h-6 w-full bg-gradient-to-r from-gray-200/50 to-gray-300/50 dark:from-gray-700/50 dark:to-gray-600/50" />
              <Skeleton className="h-4 w-5/6 bg-gradient-to-r from-gray-200/50 to-gray-300/50 dark:from-gray-700/50 dark:to-gray-600/50" />
              <Skeleton className="h-4 w-4/5 bg-gradient-to-r from-gray-200/50 to-gray-300/50 dark:from-gray-700/50 dark:to-gray-600/50" />
              <Skeleton className="h-6 w-3/4 bg-gradient-to-r from-gray-200/50 to-gray-300/50 dark:from-gray-700/50 dark:to-gray-600/50" />
              <Skeleton className="h-4 w-full bg-gradient-to-r from-gray-200/50 to-gray-300/50 dark:from-gray-700/50 dark:to-gray-600/50" />
              <Skeleton className="h-4 w-2/3 bg-gradient-to-r from-gray-200/50 to-gray-300/50 dark:from-gray-700/50 dark:to-gray-600/50" />
              <div className="my-6">
                <Skeleton className="h-8 w-1/2 mb-3 bg-gradient-to-r from-violet-200/50 to-purple-200/50 dark:from-violet-800/50 dark:to-purple-800/50" />
                <Skeleton className="h-4 w-full bg-gradient-to-r from-gray-200/50 to-gray-300/50 dark:from-gray-700/50 dark:to-gray-600/50" />
                <Skeleton className="h-4 w-4/5 bg-gradient-to-r from-gray-200/50 to-gray-300/50 dark:from-gray-700/50 dark:to-gray-600/50" />
              </div>
              <Skeleton className="h-6 w-2/3 bg-gradient-to-r from-gray-200/50 to-gray-300/50 dark:from-gray-700/50 dark:to-gray-600/50" />
              <Skeleton className="h-4 w-full bg-gradient-to-r from-gray-200/50 to-gray-300/50 dark:from-gray-700/50 dark:to-gray-600/50" />
            </div>
          </div>
        </article>
      </div>
    </motion.div>
  );
}

export function StudyPageLoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="container px-4 mx-auto">
        {/* Enhanced Header skeleton */}
        <div className="relative mb-12">
          <div className="bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex-1">
                <Skeleton className="h-10 w-48 mb-3 bg-gradient-to-r from-violet-200/50 to-purple-200/50 dark:from-violet-800/50 dark:to-purple-800/50" />
                <Skeleton className="h-5 w-64 mb-4 bg-gradient-to-r from-gray-200/50 to-gray-300/50 dark:from-gray-700/50 dark:to-gray-600/50" />
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-2 h-2 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-2 h-2 rounded-full" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-auto">
                <Skeleton className="h-12 w-72 bg-gradient-to-r from-violet-200/50 to-purple-200/50 dark:from-violet-800/50 dark:to-purple-800/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced content section */}
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Skeleton className="w-1 h-12 rounded-full bg-gradient-to-b from-violet-200/50 to-purple-200/50 dark:from-violet-800/50 dark:to-purple-800/50" />
              <div>
                <Skeleton className="h-7 w-32 mb-1 bg-gradient-to-r from-violet-200/50 to-purple-200/50 dark:from-violet-800/50 dark:to-purple-800/50" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>

          <FolderLoadingSkeleton />

          {/* Background decorations */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-purple-500/10 to-violet-500/10 rounded-full blur-2xl pointer-events-none"></div>
        </div>
      </div>
    </motion.div>
  );
}