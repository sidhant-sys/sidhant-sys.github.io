import React, { useState } from 'react';
import { Car, Plane, Hotel, Star, Utensils, Wallet, Calendar, Users, BarChart3, TrendingUp, DollarSign } from 'lucide-react';
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
      <div className={`bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 flex flex-col justify-center items-center ${className}`}>
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <DollarSign className="w-8 h-8 text-gray-400" />
        </div>
        <div className="text-gray-600 text-lg font-medium">Budget information not available</div>
        <div className="text-gray-500 text-sm mt-2">Please check back later</div>
      </div>
    );
  }

  const categories = [
    { 
      key: 'flights', 
      label: 'Flights', 
      icon: Plane, 
      value: costBreakdown.flights,
      color: 'from-blue-50 to-blue-100',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      key: 'accommodation', 
      label: 'Hotels', 
      icon: Hotel, 
      value: costBreakdown.accommodation,
      color: 'from-purple-50 to-purple-100',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      key: 'activities', 
      label: 'Activities', 
      icon: Star, 
      value: costBreakdown.activities,
      color: 'from-green-50 to-green-100',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      key: 'dining', 
      label: 'Dining', 
      icon: Utensils, 
      value: costBreakdown.dining,
      color: 'from-orange-50 to-orange-100',
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    { 
      key: 'transport', 
      label: 'Transport', 
      icon: Car, 
      value: costBreakdown.transport,
      color: 'from-gray-50 to-gray-100',
      iconColor: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  ];

  const overviewMetrics = [
    {
      icon: Calendar,
      label: 'Duration',
      value: `${duration || 0} days`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100'
    },
    {
      icon: Users,
      label: 'Travelers',
      value: `${numberOfTravellers || 1} ${(numberOfTravellers || 1) > 1 ? 'people' : 'person'}`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100'
    },
    {
      icon: Wallet,
      label: 'Total Budget',
      value: formatPriceFromUSD(costBreakdown.total),
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100'
    }
  ];

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-full w-full ${className} rounded-xl`}>
      {/* Modern Tab Headers */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50  border-gray-100">
        <div className="flex items-center gap-1 bg-white rounded-xl p-1 shadow-sm">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveTab('overview');
            }}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <Calendar className="w-4 h-4" strokeWidth={2} />
            Overview
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveTab('budget');
            }}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === 'budget'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <BarChart3 className="w-4 h-4" strokeWidth={2} />
            Budget
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6 h-full overflow-y-auto">
        {activeTab === 'overview' ? (
          <div className="space-y-6">
            {/* Overview Header */}
            <div className="text-center">
              {/* <h3 className="text-md font-bold text-gray-900 mb-2">Trip Overview</h3> */}
              <p className="text-gray-600 text-sm">Key details about your travel experience</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {overviewMetrics.map(({ icon: Icon, label, value, color, bgColor, iconBg }, index) => (
                <div key={index} className={`${bgColor} rounded-xl p-2 border border-gray-100 hover:shadow-md transition-all duration-300 group`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 ${iconBg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-5 h-5 ${color}`} strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-bold ${color} mb-1`}>{value}</div>
                      <div className="text-xs text-gray-600 font-medium">{label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Budget Highlight */}
            {/* <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">Total Trip Cost</div>
                    <div className="text-xl font-bold text-blue-600">{formatPriceFromUSD(costBreakdown.total)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">For {numberOfTravellers || 1} traveler{(numberOfTravellers || 1) > 1 ? 's' : ''}</div>
                  <div className="text-sm font-semibold text-gray-700">
                    {formatPriceFromUSD(costBreakdown.total / (numberOfTravellers || 1))} per person
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Budget Header */}
            <div className="text-center">
              {/* <h3 className="text-xl font-bold text-gray-900 mb-2">Budget Breakdown</h3> */}
              <p className="text-gray-600 text-sm">Detailed cost analysis for your trip</p>
            </div>

            {/* Categories Grid */}
            <div className="space-y-4">
              {/* First row with 5 items */}
              <div className="flex gap-3">
                {categories.slice(0, 5).map(({ key, label, icon: Icon, value, color, iconColor, bgColor }) => (
                  <div key={key} className={`${bgColor} rounded-xl p-2 border border-gray-100 hover:shadow-md transition-all duration-300 group flex-1`} style={{ width: '20%' }}>
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className={`w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-4 h-4 ${iconColor}`} strokeWidth={2} />
                      </div>
                      <div className="w-full">
                        <div className="font-semibold text-gray-900 text-xs">{label}</div>
                        <div className="text-xs text-gray-600">
                          {((value / costBreakdown.total) * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="text-sm font-bold text-gray-900">{formatPriceFromUSD(value)} per person</div>
                        {/* <div className="text-xs text-gray-500">
                          {formatPriceFromUSD(value / (numberOfTravellers || 1))} pp
                        </div> */}
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full bg-gradient-to-r ${color}`}
                          style={{ width: `${(value / costBreakdown.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Second row with remaining item */}
              {categories.length > 5 && (
                <div className="flex gap-3">
                  {categories.slice(5).map(({ key, label, icon: Icon, value, color, iconColor, bgColor }) => (
                    <div key={key} className={`${bgColor} rounded-xl p-3 border border-gray-100 hover:shadow-md transition-all duration-300 group flex-1`} style={{ width: '20%' }}>
                      <div className="flex flex-col items-center text-center space-y-2">
                        <div className={`w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`w-4 h-4 ${iconColor}`} strokeWidth={2} />
                        </div>
                        <div className="w-full">
                          <div className="font-semibold text-gray-900 text-xs">{label}</div>
                          <div className="text-xs text-gray-600">
                            {((value / costBreakdown.total) * 100).toFixed(1)}%
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="text-sm font-bold text-gray-900">{formatPriceFromUSD(value)}</div>
                          <div className="text-xs text-gray-500">
                            {formatPriceFromUSD(value / (numberOfTravellers || 1))} pp
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full bg-gradient-to-r ${color}`}
                            style={{ width: `${(value / costBreakdown.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-2 border border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">Total Trip Cost</div>
                    <div className="text-xl font-bold text-blue-600">{formatPriceFromUSD(costBreakdown.total)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">For {numberOfTravellers || 1} traveler{(numberOfTravellers || 1) > 1 ? 's' : ''}</div>
                  <div className="text-sm font-semibold text-gray-700">
                    {formatPriceFromUSD(costBreakdown.total / (numberOfTravellers || 1))} per person
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
