// src/components/ui/error-message.tsx
// Error message component

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { cn } from '@/lib/utils';
import type { ApiError } from '@/lib/api/types';

interface ErrorMessageProps {
  error: ApiError | Error | string | null;
  onRetry?: () => void;
  className?: string;
  showRetry?: boolean;
  retryText?: string;
}

export function ErrorMessage({
  error,
  onRetry,
  className,
  showRetry = true,
  retryText = 'Coba Lagi'
}: ErrorMessageProps) {
  if (!error) return null;

  const errorMessage = typeof error === 'string' 
    ? error 
    : error.message || 'Terjadi kesalahan yang tidak terduga';

  const errorDetails = typeof error === 'object' && 'details' in error 
    ? error.details 
    : null;

  return (
    <Card className={cn('border-red-200 bg-red-50', className)}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-red-800 font-medium">
              {errorMessage}
            </p>
            
            {errorDetails && (
              <div className="mt-2">
                {typeof errorDetails === 'object' ? (
                  <ul className="text-xs text-red-700 space-y-1">
                    {Object.entries(errorDetails).map(([field, messages]) => (
                      <li key={field}>
                        <span className="font-medium capitalize">{field}:</span>{' '}
                        {Array.isArray(messages) ? messages.join(', ') : messages}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-red-700">{errorDetails}</p>
                )}
              </div>
            )}
            
            {showRetry && onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="mt-3 text-red-700 border-red-300 hover:bg-red-100"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {retryText}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface InlineErrorProps {
  error: ApiError | Error | string | null;
  className?: string;
}

export function InlineError({ error, className }: InlineErrorProps) {
  if (!error) return null;

  const errorMessage = typeof error === 'string' 
    ? error 
    : error.message || 'Terjadi kesalahan';

  return (
    <p className={cn('text-sm text-red-600 flex items-center space-x-1', className)}>
      <AlertCircle className="w-4 h-4" />
      <span>{errorMessage}</span>
    </p>
  );
}
