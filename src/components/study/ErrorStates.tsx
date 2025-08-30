import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
  type?: 'network' | 'server' | 'general';
}

export function ErrorState({ error, onRetry, type = 'general' }: ErrorStateProps) {
  const getErrorIcon = () => {
    switch (type) {
      case 'network':
        return <WifiOff className="w-12 h-12 text-muted-foreground" />;
      case 'server':
        return <AlertTriangle className="w-12 h-12 text-destructive" />;
      default:
        return <AlertTriangle className="w-12 h-12 text-muted-foreground" />;
    }
  };

  const getErrorMessage = () => {
    switch (type) {
      case 'network':
        return 'No internet connection. Please check your network and try again.';
      case 'server':
        return 'Server is temporarily unavailable. We\'re working to fix this.';
      default:
        return error || 'Something went wrong. Please try again.';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16"
    >
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="mb-4">
            {getErrorIcon()}
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {type === 'network' ? 'Connection Error' : 'Something went wrong'}
          </h3>
          <p className="text-muted-foreground mb-6">
            {getErrorMessage()}
          </p>
          <Button onClick={onRetry} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function OfflineBanner({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-20 left-4 right-4 z-40"
    >
      <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950/50 dark:border-amber-800">
        <WifiOff className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800 dark:text-amber-200">
          You're viewing offline content. Some features may be limited.
        </AlertDescription>
      </Alert>
    </motion.div>
  );
}

export function EmptyState({ 
  title, 
  description, 
  action 
}: { 
  title: string; 
  description: string; 
  action?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16"
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
      {action}
    </motion.div>
  );
}