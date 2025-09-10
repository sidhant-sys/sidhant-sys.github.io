import React from 'react';
import { Calendar, Users, Star, Wallet } from 'lucide-react';

interface KeyMetricsProps {
  duration?: number;
  numberOfTravellers?: number;
  rating?: number;
  totalBudget?: number;
  className?: string;
}

export const KeyMetrics: React.FC<KeyMetricsProps> = ({
  duration,
  numberOfTravellers,
  rating,
  totalBudget,
  className = ''
}) => {
  const metrics = [
    {
      icon: Calendar,
      label: 'Duration',
      value: `${duration || 0} days`,
      color: 'text-primary'
    },
    {
      icon: Users,
      label: 'Travelers',
      value: `${numberOfTravellers || 1} ${(numberOfTravellers || 1) > 1 ? 'people' : 'person'}`,
      color: 'text-primary'
    },
    {
      icon: Star,
      label: 'Rating',
      value: `${rating || 4.5}/5`,
      color: 'text-primary'
    },
    {
      icon: Wallet,
      label: 'Total Budget',
      value: `$${totalBudget?.toLocaleString() || '0'}`,
      color: 'text-primary'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Title */}
      <div className="text-left">
        <h3 className="text-2xl font-bold text-foreground mb-2">Trip Overview</h3>
        <p className="text-muted-foreground">Key details about your travel experience</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {metrics.map(({ icon: Icon, label, value, color }, index) => (
          <div key={index} className="p-4 border border-border rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-10 h-10 mb-3">
                <Icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
