import React from 'react';
import { useTrackingPolling } from '../hooks/useTrackingPolling';
import { TrackingEntry } from './TrackingEntry';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Play, Pause, RefreshCw, Trash2 } from 'lucide-react';

interface TrackingEntriesDisplayProps {
  enabled?: boolean;
  className?: string;
  showUI?: boolean;
  onItineraryGenerated?: (data: any) => void;
  onItineraryGenerationStart?: () => void;
}

export const TrackingEntriesDisplay: React.FC<TrackingEntriesDisplayProps> = ({ 
  enabled = true,
  className = '',
  showUI = true,
  onItineraryGenerated,
  onItineraryGenerationStart
}) => {
  const {
    currentEntry,
    previousTrackingId,
    newTrackingId,
    showSuccessMessage,
    loading,
    error,
    isPolling,
    isGeneratingItinerary,
    hasGeneratedItinerary,
    startPolling,
    stopPolling,
    clearEntry,
    dismissSuccessMessage,
    fetchEntries
  } = useTrackingPolling({ enabled, onItineraryGenerated, onItineraryGenerationStart });

  // If showUI is false, just return the hook logic without UI
  if (!showUI) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header with Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span>Tracking Entries</span>
            <div className="flex items-center gap-2">
              <Badge variant={isPolling ? "default" : "secondary"}>
                {isPolling ? "Polling" : "Stopped"}
              </Badge>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={isPolling ? stopPolling : startPolling}
                  disabled={loading}
                >
                  {isPolling ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchEntries}
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearEntry}
                  disabled={loading}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600">
            {currentEntry ? (
              <span>Current tracking ID: <span className="font-mono font-medium">{currentEntry.tracking_id}</span></span>
            ) : (
              <span>No tracking entry found. Polling for updates...</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Success Message */}
      {showSuccessMessage && newTrackingId && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">
            <div className="flex items-center justify-between">
              <div>
                <strong>🎉 New Tracking ID Generated!</strong>
                <p className="mt-1">Your new tracking ID is: <span className="font-mono font-bold">{newTrackingId}</span></p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={dismissSuccessMessage}
                className="text-green-600 hover:text-green-800"
              >
                ✕
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            <strong>Error:</strong> {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-4">
          <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
          <p className="text-sm text-gray-600">Loading tracking entries...</p>
        </div>
      )}

      {/* Current Entry Display */}
      {currentEntry && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Current Entry:</h3>
          <TrackingEntry entry={currentEntry} />
        </div>
      )}

      {/* Empty State */}
      {!loading && !currentEntry && !error && (
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-gray-500">
              <RefreshCw className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No tracking entry found</h3>
              <p className="text-sm">
                {isPolling 
                  ? "Waiting for tracking entry to be created..." 
                  : "Start polling to check for tracking entry"
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
