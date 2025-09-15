import React, { useState } from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  Wind,
  Lightbulb, 
  Info, 
  Calendar,
  Globe,
  TrendingUp,
  ChevronRight,
  Thermometer,
  Droplets,
  Eye
} from 'lucide-react';

interface TravelIntelligenceData {
  weather?: {
    temperature?: number;
    condition?: string;
    humidity?: number;
    wind_speed?: number;
    description?: string;
    expected_conditions?: string;
    packing_tips?: string[];
  };
  travel_tips?: string[] | {
    local_customs?: string[];
    transportation?: string[];
    money_matters?: string[];
    safety?: string[];
  };
  cultural_facts?: string[] | {
    highlights?: string[];
    cuisine?: string[];
    fun_facts?: string[];
  };
  current_events?: string[] | {
    seasonal_highlights?: string[];
    travel_notes?: string[];
  };
}

interface TravelIntelligenceWidgetProps {
  data?: TravelIntelligenceData;
  destination?: string;
  className?: string;
}

const WeatherIcon = ({ condition }: { condition?: string }) => {
  const getWeatherIcon = (condition?: string) => {
    if (!condition) return <Sun className="w-5 h-5 text-yellow-500" />;
    
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) {
      return <Sun className="w-5 h-5 text-yellow-500" />;
    } else if (lowerCondition.includes('cloud')) {
      return <Cloud className="w-5 h-5 text-gray-500" />;
    } else if (lowerCondition.includes('rain')) {
      return <CloudRain className="w-5 h-5 text-blue-500" />;
    } else if (lowerCondition.includes('snow')) {
      return <CloudSnow className="w-5 h-5 text-blue-300" />;
    } else {
      return <Sun className="w-5 h-5 text-yellow-500" />;
    }
  };

  return getWeatherIcon(condition);
};

const IntelligenceCard = ({ 
  title, 
  icon, 
  children, 
  className = "" 
}: { 
  title: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 ${className}`}>
    <div className="flex items-center gap-2 mb-3">
      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <h4 className="font-semibold text-sm text-gray-900">{title}</h4>
    </div>
    {children}
  </div>
);

// Helper functions to extract data in the correct format
const extractTravelTips = (tips: TravelIntelligenceData['travel_tips']): string[] => {
  if (Array.isArray(tips)) return tips;
  if (typeof tips === 'object' && tips) {
    return [
      ...(tips.local_customs || []),
      ...(tips.transportation || []),
      ...(tips.money_matters || []),
      ...(tips.safety || [])
    ];
  }
  return [];
};

const extractCulturalFacts = (facts: TravelIntelligenceData['cultural_facts']): string[] => {
  if (Array.isArray(facts)) return facts;
  if (typeof facts === 'object' && facts) {
    return [
      ...(facts.highlights || []),
      ...(facts.cuisine || []),
      ...(facts.fun_facts || [])
    ];
  }
  return [];
};

const extractCurrentEvents = (events: TravelIntelligenceData['current_events']): string[] => {
  if (Array.isArray(events)) return events;
  if (typeof events === 'object' && events) {
    return [
      ...(events.seasonal_highlights || []),
      ...(events.travel_notes || [])
    ];
  }
  return [];
};

export const TravelIntelligenceWidget: React.FC<TravelIntelligenceWidgetProps> = ({
  data,
  destination,
  className = ""
}) => {
  const [activeTab, setActiveTab] = useState<'weather' | 'tips' | 'culture' | 'events'>('weather');

  if (!data || (!data.weather && !data.travel_tips && !data.cultural_facts && !data.current_events)) {
    return null;
  }

  // Extract data in the correct format
  const travelTips = extractTravelTips(data.travel_tips);
  const culturalFacts = extractCulturalFacts(data.cultural_facts);
  const currentEvents = extractCurrentEvents(data.current_events);

  const tabs = [
    { id: 'weather' as const, label: 'Weather', icon: <Thermometer className="w-4 h-4" />, available: !!data.weather },
    { id: 'tips' as const, label: 'Tips', icon: <Lightbulb className="w-4 h-4" />, available: travelTips.length > 0 },
    { id: 'culture' as const, label: 'Culture', icon: <Globe className="w-4 h-4" />, available: culturalFacts.length > 0 },
    { id: 'events' as const, label: 'Events', icon: <Calendar className="w-4 h-4" />, available: currentEvents.length > 0 }
  ].filter(tab => tab.available);

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Travel Intelligence</h3>
            <p className="text-sm text-gray-600">
              Smart insights for {destination || 'your destination'}
            </p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      {tabs.length > 1 && (
        <div className="px-6 py-3 border-b border-gray-100">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {activeTab === 'weather' && data.weather && (
          <div className="space-y-4">
            {/* Weather Conditions */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <div className="flex items-center gap-4">
                <WeatherIcon condition={data.weather.condition} />
                <div className="flex-1">
                  <div className="text-sm  text-gray-900">
                    {data.weather.expected_conditions || data.weather.description || 'Weather Information'}
                  </div>
                  {data.weather.temperature && (
                    <div className="text-sm  text-blue-600 mb-2">
                      {data.weather.temperature}°C
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {data.weather.humidity && (
                      <div className="flex items-center gap-1">
                        <Droplets className="w-4 h-4" />
                        {data.weather.humidity}% humidity
                      </div>
                    )}
                    {data.weather.wind_speed && (
                      <div className="flex items-center gap-1">
                        <Wind className="w-4 h-4" />
                        {data.weather.wind_speed} km/h
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Packing Tips */}
            {data.weather.packing_tips && data.weather.packing_tips.length > 0 && (
              <div>
                <h5 className="text-sm font-semibold text-gray-900 mb-3">Packing Tips</h5>
                <div className="space-y-2">
                  {data.weather.packing_tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'tips' && travelTips.length > 0 && (
          <div className="space-y-3">
            {travelTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'culture' && culturalFacts.length > 0 && (
          <div className="space-y-3">
            {culturalFacts.map((fact, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                <Globe className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{fact}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'events' && currentEvents.length > 0 && (
          <div className="space-y-3">
            {currentEvents.map((event, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                <Calendar className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{event}</p>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {((activeTab === 'weather' && !data.weather) ||
          (activeTab === 'tips' && travelTips.length === 0) ||
          (activeTab === 'culture' && culturalFacts.length === 0) ||
          (activeTab === 'events' && currentEvents.length === 0)) && (
          <div className="text-center py-8">
            <Eye className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No {activeTab} information available</p>
          </div>
        )}
      </div>
    </div>
  );
};
