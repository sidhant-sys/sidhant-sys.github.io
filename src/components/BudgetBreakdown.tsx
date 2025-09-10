import React from 'react';
import { Car, Plane, Hotel, Star, Utensils, Wallet } from 'lucide-react';
import { usePricing } from '../hooks/usePricing';

interface BudgetBreakdownProps {
  costBreakdown?: {
    flights: number;
    accommodation: number;
    activities: number;
    dining: number;
    transport: number;
    total: number;
  };
  className?: string;
}

export const BudgetBreakdown: React.FC<BudgetBreakdownProps> = ({
  costBreakdown,
  className = ''
}) => {
  const { formatPriceFromINR } = usePricing();

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

  return (
    <div className={`bg-muted/30 rounded-2xl p-6 flex flex-col justify-between w-full h-full ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Budget Breakdown</h3>
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-foreground" strokeWidth={1.5} />
          <span className="text-sm text-muted-foreground">Total</span>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-3 flex-1">
        {categories.map(({ key, label, icon: Icon, value }) => (
          <div key={key} className="flex flex-col items-center p-3 bg-background/50 rounded-xl border border-border/50">
            <div className="flex items-center justify-center w-8 h-8 mb-2">
              <Icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">
                {formatPriceFromINR(value)}
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
            {formatPriceFromINR(costBreakdown.total)}
          </span>
        </div>
      </div>
    </div>
  );
};
