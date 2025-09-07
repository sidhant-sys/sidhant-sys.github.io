import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface TrackingEntryProps {
  entry: {
    id: string;
    tracking_id: string;
    created_at: string;
    updated_at: string;
    status?: string;
    [key: string]: any;
  };
}

export const TrackingEntry: React.FC<TrackingEntryProps> = ({ entry }) => {
  const getStatusIcon = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'error':
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span>Tracking Entry</span>
          {getStatusIcon(entry.status)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Tracking ID:</span>
            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
              {entry.tracking_id}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Status:</span>
            <Badge className={getStatusColor(entry.status)}>
              {entry.status || 'Unknown'}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Created:</span>
            <span className="text-sm text-gray-500">
              {new Date(entry.created_at).toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Updated:</span>
            <span className="text-sm text-gray-500">
              {new Date(entry.updated_at).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Additional Data Fields */}
        {Object.keys(entry).filter(key => 
          !['id', 'tracking_id', 'created_at', 'updated_at', 'status'].includes(key)
        ).length > 0 && (
          <div className="border-t pt-3">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Additional Data:</h4>
            <div className="space-y-1">
              {Object.entries(entry)
                .filter(([key]) => !['id', 'tracking_id', 'created_at', 'updated_at', 'status'].includes(key))
                .map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{key}:</span>
                    <span className="text-gray-800 font-mono">
                      {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
