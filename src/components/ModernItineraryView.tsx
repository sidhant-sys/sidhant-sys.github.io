import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Plane, 
  Building,
  Utensils,
  Car,
  Activity,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { DailyIntelligence } from './DailyIntelligence';
import { useCurrency } from '../contexts/CurrencyContext';
import { capitalize, professionalColors } from './ui/utils';

interface DayScheduleItem {
  type: 'flight' | 'hotel' | 'activity' | 'meal' | 'commute';
  name?: string;
  description?: string | null;
  airline?: string;
  flight_name?: string;
  flight_origin?: string;
  flight_destination?: string;
  flight_duration?: string;
  departure_time?: string;
  arrival_time?: string;
  class?: string;
  location?: string | {
    longitude: number;
    latitude: number;
  };
  start_time?: string;
  end_time?: string;
  bookingUrl?: string;
  check_in?: string;
  check_in_time?: string;
  amenities?: string[];
  from?: string;
  to?: string;
  mode?: string;
  price?: number | string;
  duration?: string;
  time?: string;
  generated_images?: string[];
}

interface DayData {
  day: number;
  schedule: DayScheduleItem[];
  upsell?: {
    type: string;
    name: string;
    upgrade_cost: number | string;
    benefits?: string[];
  }[];
  daily_intelligence?: {
    weather?: { conditions?: string; recommendations?: string[]; };
    daily_tips?: { best_times?: string[]; local_insights?: string[]; cultural_notes?: string[]; };
    highlights?: { must_see?: string[]; food_recommendations?: string[]; hidden_gems?: string[]; };
  };
}

interface ModernItineraryViewProps {
  dayWiseData: DayData[];
  onBack?: () => void;
  dates?: string;
  onModificationsChange?: (hasModifications: boolean) => void;
  globalUpsells?: {
    type: string;
    name: string;
    upgrade_cost: number | string;
    benefits?: string[];
  }[];
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'flight':
      return <Plane className="w-5 h-5" />;
    case 'hotel':
      return <Building className="w-5 h-5" />;
    case 'activity':
      return <Activity className="w-5 h-5" />;
    case 'meal':
      return <Utensils className="w-5 h-5" />;
    case 'commute':
      return <Car className="w-5 h-5" />;
    default:
      return <Activity className="w-5 h-5" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'flight':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'hotel':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'activity':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'meal':
      return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'commute':
      return 'bg-gray-50 text-gray-700 border-gray-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'flight':
      return 'Flight';
    case 'hotel':
      return 'Hotel';
    case 'activity':
      return 'Activity';
    case 'meal':
      return 'Dining';
    case 'commute':
      return 'Transport';
    default:
      return capitalize(type);
  }
};

// UpsellCard Component
interface UpsellCardProps {
  upsell: any;
  upsellId: string;
  isSelected: boolean;
  discountPercent: number;
  onToggleSelection: (upsellId: string) => void;
  formatPrice: (price: number) => string;
}

const UpsellCard: React.FC<UpsellCardProps> = ({
  upsell,
  upsellId,
  isSelected,
  discountPercent,
  onToggleSelection,
  formatPrice
}) => {
  const upgradePrice = typeof upsell.upgrade_cost === 'string' ? parseFloat(upsell.upgrade_cost) || 0 : upsell.upgrade_cost || 0;
  const originalPrice = Math.round(upgradePrice * (1 + discountPercent / 100));

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleSelection(upsellId);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Only handle card clicks if not clicking on checkbox area
    const target = e.target as HTMLElement;
    if (!target.closest('[data-checkbox-area]')) {
      onToggleSelection(upsellId);
    }
  };

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${professionalColors.interactive.border} ${professionalColors.interactive.borderHover} ${professionalColors.interactive.hover}`}
      onClick={handleCardClick}
    >
      {/* Checkbox Area */}
      <div 
        data-checkbox-area="true"
        className="flex-shrink-0 cursor-pointer"
        onClick={handleCheckboxClick}
      >
        <Checkbox
          checked={isSelected}
          className={`w-5 h-5 bg-white ${professionalColors.interactive.border} hover:border-slate-400 cursor-pointer pointer-events-none`}
          style={{
            '--tw-bg-opacity': isSelected ? '1' : undefined,
            backgroundColor: isSelected ? professionalColors.appBlue[500] : undefined,
            borderColor: isSelected ? professionalColors.appBlue[500] : undefined,
            color: isSelected ? 'white' : undefined,
          } as React.CSSProperties}
        />
      </div>

      {/* Icon */}
      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
        {upsell.type === 'hotel' && '🏨'}
        {upsell.type === 'flight' && '✈️'}
        {upsell.type === 'activity' && '🎯'}
        {upsell.type === 'dining' && '🍽️'}
        {upsell.type === 'transport' && '🚗'}
      </div>

      {/* Content Area */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h5 className={`font-semibold ${professionalColors.text.primary} text-sm truncate`}>{upsell.name}</h5>
            <p className={`text-xs ${professionalColors.text.muted}`}>{capitalize(upsell.type)} Upgrade</p>
            
            {/* Benefits - Non-clickable informational text */}
            <div className="mt-1">
              <ul className={`text-xs ${professionalColors.text.secondary} space-y-0.5`}>
                {upsell.benefits?.slice(0, 2).map((benefit: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-1 truncate">
                    <span className={`${professionalColors.success.text} flex-shrink-0`}>•</span>
                    <span className="truncate">{benefit}</span>
                  </li>
                ))}
                {upsell.benefits?.length > 2 && (
                  <li className={`${professionalColors.text.light} text-xs italic`}>
                    {upsell.benefits.length - 2} additional benefit{upsell.benefits.length - 2 !== 1 ? 's' : ''} included
                  </li>
                )}
              </ul>
            </div>
          </div>
          
          {/* Pricing & Badge */}
          <div className="text-right ml-3 flex-shrink-0">
            <div className={`${professionalColors.warning.bg} ${professionalColors.warning.text} px-2 py-1 rounded-full text-xs font-bold mb-1`}>
              {discountPercent}% OFF
            </div>
            <div className={`text-xs ${professionalColors.text.light} line-through`}>
              {formatPrice(originalPrice)}
            </div>
            <div className={`text-sm font-bold ${professionalColors.text.primary}`}>
              {formatPrice(upgradePrice)}
            </div>
            <div className={`text-xs ${professionalColors.success.text}`}>
              Save {formatPrice(originalPrice - upgradePrice)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModernItineraryView: React.FC<ModernItineraryViewProps> = ({
  dayWiseData,
  onBack: _onBack,
  dates: _dates,
  onModificationsChange,
  globalUpsells = []
}) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(1); // Default to day 1 expanded
  const [selectedActivitiesByDay, setSelectedActivitiesByDay] = useState<Map<number, Set<string>>>(new Map());
  const [initialSelections, setInitialSelections] = useState<Map<number, Set<string>>>(new Map());
  const [selectedGlobalUpsells, setSelectedGlobalUpsells] = useState<Set<string>>(new Set());
  const [isUpsellExpanded, setIsUpsellExpanded] = useState(false);
  const [isActivitiesExpanded, setIsActivitiesExpanded] = useState(true); // Default to expanded
  const { formatPrice: currencyFormatPrice } = useCurrency();

  // Initialize all activities as selected when component mounts or when new day data is available
  useEffect(() => {
    if (dayWiseData && dayWiseData.length > 0) {
      const initialMap = new Map<number, Set<string>>();
      
      dayWiseData.forEach(dayData => {
        const allActivityIds = new Set<string>();
        dayData.schedule.forEach((_, index) => {
          allActivityIds.add(`${dayData.day}-${index}`);
        });
        initialMap.set(dayData.day, new Set(allActivityIds));
      });
      
      setSelectedActivitiesByDay(initialMap);
      
      // Create a deep copy of initialMap for initialSelections
      const initialSelectionsCopy = new Map<number, Set<string>>();
      for (const [dayNumber, activities] of initialMap.entries()) {
        initialSelectionsCopy.set(dayNumber, new Set(activities));
      }
      setInitialSelections(initialSelectionsCopy);
    }
  }, [dayWiseData]);

  // Ensure day 1 is expanded when component mounts or data changes
  useEffect(() => {
    if (dayWiseData && dayWiseData.length > 0 && expandedDay === null) {
      setExpandedDay(1);
    }
  }, [dayWiseData, expandedDay]);

  // Detect modifications and notify parent
  useEffect(() => {
    if (!onModificationsChange || initialSelections.size === 0) return;
    
    // Compare current selections with initial selections
    let hasChanges = false;
    
    // Check if the maps have the same keys
    if (selectedActivitiesByDay.size !== initialSelections.size) {
      hasChanges = true;
    } else {
      // Check each day's selections
      for (const [dayNumber, currentSelections] of selectedActivitiesByDay.entries()) {
        const initialDaySelections = initialSelections.get(dayNumber);
        
        if (!initialDaySelections) {
          hasChanges = true;
          break;
        }
        
        // Check if sets are different
        if (currentSelections.size !== initialDaySelections.size) {
          hasChanges = true;
          break;
        }
        
        // Check if all items are the same
        for (const item of currentSelections) {
          if (!initialDaySelections.has(item)) {
            hasChanges = true;
            break;
          }
        }
        
        if (hasChanges) break;
      }
    }
    
    // Check global upsell selections (any upsell selection is considered a modification)
    if (!hasChanges && selectedGlobalUpsells.size > 0) {
      hasChanges = true;
    }
    
    onModificationsChange(hasChanges);
  }, [selectedActivitiesByDay, selectedGlobalUpsells, initialSelections, onModificationsChange]);


  // Auto-scroll to top when day changes
  useEffect(() => {
    if (expandedDay) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [expandedDay]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);


  const formatTime = (time: string) => {
    if (!time) return '';
    return time;
  };

  const formatPrice = (price: number | string) => {
    if (!price) return '';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (numPrice === 0) return '';
    return currencyFormatPrice(numPrice);
  };

  const toggleActivitySelection = (activityId: string) => {
    const dayNumber = parseInt(activityId.split('-')[0]);
    setSelectedActivitiesByDay(prevMap => {
      const newMap = new Map(prevMap);
      const daySelections = newMap.get(dayNumber) || new Set<string>();
      const newDaySelections = new Set(daySelections);
      
      if (newDaySelections.has(activityId)) {
        newDaySelections.delete(activityId);
      } else {
        newDaySelections.add(activityId);
      }
      
      newMap.set(dayNumber, newDaySelections);
      return newMap;
    });
  };

  const toggleGlobalUpsellSelection = (upsellId: string) => {
    setSelectedGlobalUpsells(prevSet => {
      const newSet = new Set(prevSet);
      
      if (newSet.has(upsellId)) {
        newSet.delete(upsellId);
      } else {
        newSet.add(upsellId);
      }
      
      return newSet;
    });
  };

  // Calculate total price of selected activities for a given day
  const getSelectedActivitiesTotal = (dayNumber: number, schedule: any[]) => {
    const daySelections = selectedActivitiesByDay.get(dayNumber) || new Set<string>();
    return schedule.reduce((sum, item, index) => {
      const activityId = `${dayNumber}-${index}`;
      if (daySelections.has(activityId)) {
        const price = typeof item.price === 'string' ? parseFloat(item.price) || 0 : item.price || 0;
        return sum + price;
      }
      return sum;
    }, 0);
  };

  // Calculate total price of selected global upsells
  const getSelectedGlobalUpsellsTotal = () => {
    return globalUpsells.reduce((sum, item, index) => {
      const upsellId = `global-upsell-${index}`;
      if (selectedGlobalUpsells.has(upsellId)) {
        const price = typeof item.upgrade_cost === 'string' ? parseFloat(item.upgrade_cost) || 0 : item.upgrade_cost || 0;
        return sum + price;
      }
      return sum;
    }, 0);
  };

  // Calculate total day cost including activities only (upsells are global)
  const getTotalDayCost = (dayNumber: number, schedule: any[]) => {
    return getSelectedActivitiesTotal(dayNumber, schedule);
  };

  // Get count of selected activities for a day
  const getSelectedActivitiesCount = (dayNumber: number) => {
    const daySelections = selectedActivitiesByDay.get(dayNumber) || new Set<string>();
    return daySelections.size;
  };

  // Calculate total trip cost across all days including global upsells
  const getTotalTripCost = () => {
    if (!dayWiseData) return 0;
    
    const dailyCosts = dayWiseData.reduce((total, dayData) => {
      return total + getTotalDayCost(dayData.day, dayData.schedule || []);
    }, 0);
    
    return dailyCosts + getSelectedGlobalUpsellsTotal();
  };

  const getItemTitle = (item: DayScheduleItem) => {
    if (item.name) return item.name;
    if (item.flight_name) return item.flight_name;
    if (item.airline) return `${item.airline} Flight`;
    if (item.from && item.to) return `${item.from} to ${item.to}`;
    return getTypeLabel(item.type);
  };

  const getItemSubtitle = (item: DayScheduleItem) => {
    if (item.airline && item.flight_name) return `${item.airline} ${item.flight_name}`;
    if (item.flight_origin && item.flight_destination) return `${item.flight_origin} → ${item.flight_destination}`;
    if (item.from && item.to) return `${item.from} → ${item.to}`;
    if (item.location && typeof item.location === 'string') return item.location;
    return '';
  };

  const getItemTime = (item: DayScheduleItem) => {
    return item.departure_time || item.start_time || item.check_in_time || item.time || '';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {/* Compact Trip Header */}
      {/* <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-2 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="text-md font-bold text-gray-900">Your Trip</div>
            <div className="text-sm text-gray-500 bg-gray-50 rounded-full">
              {dayWiseData?.length || 0} days
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-gray-600">
            {dates || 'A carefully crafted itinerary designed just for you'}
          </span>
        </div>
      </div> */}

      {/* Compact Day Navigation */}
      <div 
        data-day-navigation 
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-2 px-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Daily Itinerary</h2>
          
          <div className="flex space-x-2">
            {(dayWiseData || []).map((dayData) => (
              <button
                key={dayData.day}
                onClick={() => setExpandedDay(expandedDay === dayData.day ? null : dayData.day)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-200 cursor-pointer ${
                  expandedDay === dayData.day
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Day {dayData.day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Day Content */}
      {expandedDay && (() => {
        const dayData = dayWiseData?.find(d => d.day === expandedDay);
        if (!dayData) return null;
        
        const safeSchedule = dayData.schedule || [];
        const dayTotal = getTotalDayCost(dayData.day, safeSchedule);

        return (
          <div className="space-y-4">
            
            {/* Day Header - Normal (sticky behavior handled by combined header) */}
            <div 
              data-day-header
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-2 px-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Day {dayData.day}</h3>
                    <p className="text-sm text-gray-600">{safeSchedule.length} activities planned</p>
                  </div>
                </div>
                <div className="text-right">
                  {dayTotal > 0 ? (
                      <>
                        <div className="text-right space-y-2">
                          {/* Trip Total - Primary */}
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Total</span>
                            <div className="text-xl font-bold text-gray-900">{formatPrice(getTotalTripCost())}</div>
                          </div>
                          
                          {/* Day Cost - Secondary with subtle styling */}
                          <div className="flex items-center justify-end gap-2 px-3 py-1 bg-gray-50 rounded-lg">
                            <span className="text-xs text-gray-500">Today</span>
                            <div className="text-sm font-medium text-gray-700">{formatPrice(dayTotal)}</div>
                          </div>
                        </div>
                      </>
                  ) : (
                    <div className="text-right space-y-2">
                      {/* Trip Total - Primary */}
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Total</span>
                        <div className="text-xl font-bold text-gray-900">{formatPrice(getTotalTripCost())}</div>
                      </div>
                      
                      {/* No fees message */}
                      <div className="flex items-center justify-end">
                        <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-medium">
                          No fees today
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>


            {/* Daily Intelligence - Compact */}
            {dayData.daily_intelligence && (
              <div className="bg-white rounded-lg shadow-sm">
                <DailyIntelligence 
                  data={dayData.daily_intelligence}
                  day={dayData.day}
                  variant="compact"
                />
              </div>
            )}

            {/* Upgrade Options - Collapsible Section */}
            {globalUpsells.length > 0 && (
              <div className={`${professionalColors.section.bg} rounded-lg ${professionalColors.section.shadow} ${professionalColors.section.border} border overflow-hidden mb-4`}>
                {/* Header - Always Visible */}
                <div 
                  className={`p-2 cursor-pointer ${professionalColors.interactive.hover} transition-colors duration-200`}
                  onClick={() => setIsUpsellExpanded(!isUpsellExpanded)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-sm">✨</span>
                      </div>
                      <div>
                        <h4 className={`text-lg font-bold ${professionalColors.text.primary}`}>
                          Upgrade Your Experience
                          {selectedGlobalUpsells.size > 0 && (
                            <span className={`ml-2 text-sm font-medium ${professionalColors.text.secondary}`}>
                              (+{formatPrice(getSelectedGlobalUpsellsTotal())})
                            </span>
                          )}
                        </h4>
                        <p className={`text-sm ${professionalColors.text.muted}`}>
                          {selectedGlobalUpsells.size > 0 
                            ? `${selectedGlobalUpsells.size} upgrade${selectedGlobalUpsells.size !== 1 ? 's' : ''} selected • ${globalUpsells.length - selectedGlobalUpsells.size} more available`
                            : `${globalUpsells.length} premium upgrades available • Limited time offers`
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`${professionalColors.warning.bg} ${professionalColors.warning.text} px-2 py-1 rounded-full text-xs font-bold`}>
                        LIMITED
                      </div>
                      <ChevronDown className={`w-5 h-5 ${professionalColors.text.muted} transition-transform duration-200 ${isUpsellExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </div>

                {/* Expandable Content */}
                {isUpsellExpanded && (
                  <div className="px-4 pb-4">
                    <div className={`${professionalColors.warning.bg} ${professionalColors.warning.border} border rounded-lg p-3 mb-4`}>
                      <p className={`text-center ${professionalColors.warning.text} text-sm font-medium`}>
                        🔥 Special pricing ends in 24 hours! Save up to 25% on premium upgrades.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      {globalUpsells.map((upsell: any, upsellIndex: number) => {
                        const upsellId = `global-upsell-${upsellIndex}`;
                        const isSelected = selectedGlobalUpsells.has(upsellId);
                        const discountPercent = 15 + (upsellIndex * 3) % 11;
                        
                        return (
                          <UpsellCard
                            key={upsellId}
                            upsell={upsell}
                            upsellId={upsellId}
                            isSelected={isSelected}
                            discountPercent={discountPercent}
                            onToggleSelection={toggleGlobalUpsellSelection}
                            formatPrice={formatPrice}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Activities Section - Collapsible */}
            <div className={`${professionalColors.section.bg} rounded-lg ${professionalColors.section.shadow} ${professionalColors.section.border} border overflow-hidden`}>
              {/* Header - Always Visible */}
              <div 
                className={`p-2 cursor-pointer ${professionalColors.interactive.hover} transition-colors duration-200`}
                onClick={() => setIsActivitiesExpanded(!isActivitiesExpanded)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-sm">📋</span>
                    </div>
                    <div>
                      <h4 className={`text-lg font-bold ${professionalColors.text.primary}`}>
                        Activities
                        {getSelectedActivitiesCount(dayData.day) !== safeSchedule.length && (
                          <span className={`ml-2 text-sm font-medium ${professionalColors.text.secondary}`}>
                            ({getSelectedActivitiesCount(dayData.day)}/{safeSchedule.length} selected)
                          </span>
                        )}
                      </h4>
                      <p className={`text-sm ${professionalColors.text.muted}`}>
                        {isActivitiesExpanded 
                          ? `${safeSchedule.length} activities`
                          : `${getSelectedActivitiesCount(dayData.day)} of ${safeSchedule.length} activities selected`
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronDown className={`w-5 h-5 ${professionalColors.text.muted} transition-transform duration-200 ${isActivitiesExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </div>

              {/* Expandable Content */}
              {isActivitiesExpanded && (
                <div className="px-4 pb-4">
                  <div className="space-y-3">
                    {safeSchedule.map((item, itemIndex) => {
                      const activityId = `${dayData.day}-${itemIndex}`;
                      const daySelections = selectedActivitiesByDay.get(dayData.day) || new Set<string>();
                      const isSelected = daySelections.has(activityId);
                      const itemPrice = typeof item.price === 'string' ? parseFloat(item.price) || 0 : item.price || 0;
                      
                      return (
                        <div
                          key={activityId}
                          className={`flex items-center space-x-4 p-3 rounded-lg border transition-all duration-200 ${professionalColors.interactive.border} ${professionalColors.interactive.borderHover} ${professionalColors.interactive.hover}`}
                        >
                          {/* Checkbox */}
                          <div className="flex-shrink-0">
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => toggleActivitySelection(activityId)}
                              className="w-5 h-5 bg-white border-gray-300 hover:border-blue-400"
                              style={{
                                '--tw-bg-opacity': isSelected ? '1' : undefined,
                                backgroundColor: isSelected ? professionalColors.appBlue[500] : undefined,
                                borderColor: isSelected ? professionalColors.appBlue[500] : undefined,
                                color: isSelected ? 'white' : undefined,
                              } as React.CSSProperties}
                            />
                          </div>

                          {/* Activity Icon */}
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center">
                            <div className="text-gray-600">
                              {getTypeIcon(item.type)}
                            </div>
                          </div>

                          {/* Activity Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <Badge className={`${getTypeColor(item.type)} font-medium px-2 py-1 text-xs`}>
                                    {getTypeLabel(item.type)}
                                  </Badge>
                                  {getItemTime(item) && (
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                      {formatTime(getItemTime(item))}
                                    </span>
                                  )}
                                  {item.duration && (
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                      {item.duration}
                                    </span>
                                  )}
                                </div>
                                
                                <h5 className="font-semibold text-gray-900 text-sm mb-1">
                                  {getItemTitle(item)}
                                </h5>
                                
                                {getItemSubtitle(item) && (
                                  <p className="text-xs text-gray-600 mb-1">
                                    {getItemSubtitle(item)}
                                  </p>
                                )}

                                {item.location && typeof item.location === 'string' && 
                                 item.type !== 'flight' && 
                                 !item.flight_name && 
                                 !item.airline && 
                                 !item.flight_origin && 
                                 !item.flight_destination &&
                                 !(item.name && (item.name.toLowerCase().includes('departure') || item.name.toLowerCase().includes('arrival') || item.name.toLowerCase().includes('flight'))) &&
                                 getItemSubtitle(item) !== item.location && (
                                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                                    <MapPin className="w-3 h-3" />
                                    <span>{item.location}</span>
                                  </div>
                                )}
                              </div>

                              {/* Price or No Fees Tag */}
                              <div className="text-right">
                                {itemPrice > 0 ? (
                                  <div className="text-sm font-semibold text-gray-700">{formatPrice(itemPrice)}</div>
                                ) : (
                                  <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-medium">
                                    No fees involved
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>
        );
      })()}


      {/* Scroll to Top Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center cursor-pointer"
          title="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};