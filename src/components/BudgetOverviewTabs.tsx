import React, { useState } from 'react';
import { Car, Plane, Hotel, Star, Utensils, Wallet, Calendar, Users, BarChart3 } from 'lucide-react';
import { usePricing } from '../hooks/usePricing';

interface BudgetOverviewTabsProps {
  costBreakdown?: {
    flights: number;
    accommodation: number;
    activities: number;
    dining: number;
    transport: number;
    total: number;
  };
  duration?: number;
  numberOfTravellers?: number;
  rating?: number;
  className?: string;
}

export const BudgetOverviewTabs: React.FC<BudgetOverviewTabsProps> = ({
  costBreakdown,
  duration,
  numberOfTravellers,
  rating,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'budget' | 'overview'>('overview');
  const { formatPriceFromUSD } = usePricing();

  if (!costBreakdown) {
    return (
      <div className={`bg-muted/30 rounded-2xl p-6 flex flex-col justify-center items-center ${className}`}>
        <div className="text-muted-foreground text-sm">Budget information not available</div>
      </div>
    );
  }

  const categories = [
    { key: 'flights', label: 'Flights', icon: Plane, value: costBreakdown.flights },
    { key: 'accommodation', label: 'Hotels', icon: Hotel, value: costBreakdown.accommodation },
    { key: 'activities', label: 'Activities', icon: Star, value: costBreakdown.activities },
    { key: 'dining', label: 'Dining', icon: Utensils, value: costBreakdown.dining },
    { key: 'transport', label: 'Transport', icon: Car, value: costBreakdown.transport }
  ];

  const overviewMetrics = [
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
      value: formatPriceFromUSD(costBreakdown.total),
      color: 'text-primary'
    }
  ];

  return (
    <div className={`bg-muted/30 p-6 flex flex-col h-full w-full ${className} rounded-\[8px\]`} style={{ height: '24rem' }}>
      {/* Tab Headers */}
      <div className="flex items-center gap-1 mb-6 bg-background/50 rounded-lg p-1 relative z-10">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Overview tab clicked');
            setActiveTab('overview');
          }}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <Calendar className="w-4 h-4" strokeWidth={1.5} />
          Overview
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Budget tab clicked');
            setActiveTab('budget');
          }}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'budget'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <BarChart3 className="w-4 h-4" strokeWidth={1.5} />
          Budget
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1">
        {activeTab === 'overview' ? (
          <div className="flex flex-col h-full">
            {/* Overview Header */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Trip Overview</h3>
              <p className="text-sm text-muted-foreground">Key details about your travel experience</p>
            </div>

            {/* Metrics Grid */}
            <div className="flex flex-wrap gap-4 flex-1">
              {overviewMetrics.map(({ icon: Icon, label, value, color }, index) => (
                <div key={index} className="p-4 border border-border rounded-xl shadow-sm hover:shadow-md transition-all flex-1 min-w-0">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-10 h-10 mb-3">
                      <Icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                    </div>
                    <div className="text-lg font-bold text-foreground mb-1">{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Budget Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Budget Breakdown</h3>
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                <span className="text-sm text-muted-foreground">Total</span>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="flex flex-wrap gap-3 flex-1">
              {categories.map(({ key, label, icon: Icon, value }) => (
                <div key={key} className="flex flex-col items-center p-3 bg-background/50 rounded-xl border border-border/50 flex-1 min-w-0">
                  <div className="flex items-center justify-center w-8 h-8 mb-2">
                    <Icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-foreground">
                      {formatPriceFromUSD(value)}
                    </div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 pt-4 border-t border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Total Budget</span>
                <span className="text-xl font-bold text-primary">
                  {formatPriceFromUSD(costBreakdown.total)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
