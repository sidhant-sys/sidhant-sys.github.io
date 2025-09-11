import React, { useState } from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  Wind,
  Lightbulb, 
  Star,
  Clock,
  MapPin,
  Utensils,
  Eye,
  ChevronDown,
  ChevronUp,
  Thermometer,
  Droplets
} from 'lucide-react';

interface DailyIntelligenceData {
  weather?: {
    conditions?: string;
    recommendations?: string[];
  };
  daily_tips?: {
    best_times?: string[];
    local_insights?: string[];
    cultural_notes?: string[];
  };
  highlights?: {
    must_see?: string[];
    food_recommendations?: string[];
    hidden_gems?: string[];
  };
}

interface DailyIntelligenceProps {
  data?: DailyIntelligenceData;
  day: number;
  className?: string;
  variant?: 'compact' | 'expanded';
}

const WeatherIcon = ({ conditions }: { conditions?: string }) => {
  if (!conditions) return <Sun className="w-4 h-4 text-yellow-500" />;
  
  const lowerConditions = conditions.toLowerCase();
  if (lowerConditions.includes('sun') || lowerConditions.includes('clear')) {
    return <Sun className="w-4 h-4 text-yellow-500" />;
  } else if (lowerConditions.includes('cloud')) {
    return <Cloud className="w-4 h-4 text-gray-500" />;
  } else if (lowerConditions.includes('rain')) {
    return <CloudRain className="w-4 h-4 text-blue-500" />;
  } else if (lowerConditions.includes('snow')) {
    return <CloudSnow className="w-4 h-4 text-blue-300" />;
  } else {
    return <Sun className="w-4 h-4 text-yellow-500" />;
  }
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
  <div className={`bg-white rounded-lg p-3 border border-gray-100 ${className}`}>
    <div className="flex items-center gap-2 mb-2">
      <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center">
        {icon}
      </div>
      <h5 className="font-medium text-xs text-gray-900">{title}</h5>
    </div>
    {children}
  </div>
);

export const DailyIntelligence: React.FC<DailyIntelligenceProps> = ({
  data,
  day,
  className = "",
  variant = 'compact'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!data || (!data.weather && !data.daily_tips && !data.highlights)) {
    return null;
  }

  // Extract data in arrays for easier rendering
  const weatherRecommendations = data.weather?.recommendations || [];
  const bestTimes = data.daily_tips?.best_times || [];
  const localInsights = data.daily_tips?.local_insights || [];
  const culturalNotes = data.daily_tips?.cultural_notes || [];
  const mustSee = data.highlights?.must_see || [];
  const foodRecommendations = data.highlights?.food_recommendations || [];
  const hiddenGems = data.highlights?.hidden_gems || [];

  const allTips = [...bestTimes, ...localInsights, ...culturalNotes];
  const allHighlights = [...mustSee, ...foodRecommendations, ...hiddenGems];

  if (variant === 'compact') {
    return (
      <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100 ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">
              <Lightbulb className="w-3 h-3 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Day {day} Intelligence</span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-blue-100 rounded-md transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4 text-blue-600" />}
          </button>
        </div>

        {/* Quick preview - show only first item from each category */}
        <div className="space-y-2">
          {data.weather?.conditions && (
            <div className="flex items-center gap-2 text-xs text-gray-700">
              <WeatherIcon conditions={data.weather.conditions} />
              <span className="line-clamp-1">{data.weather.conditions}</span>
            </div>
          )}
          
          {allTips.length > 0 && (
            <div className="text-xs text-gray-600 line-clamp-1">
              💡 {allTips[0]}
            </div>
          )}
          
          {allHighlights.length > 0 && (
            <div className="text-xs text-gray-600 line-clamp-1">
              ⭐ {allHighlights[0]}
            </div>
          )}
        </div>

        {/* Expanded content - show all items */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-blue-200 space-y-3">
            {/* Weather - Full Details */}
            {data.weather && weatherRecommendations.length > 0 && (
              <IntelligenceCard title="Weather Details" icon={<Thermometer className="w-3 h-3 text-blue-600" />}>
                <div className="space-y-2">
                  <p className="text-xs text-gray-700">{data.weather.conditions}</p>
                  <div className="space-y-1">
                    {weatherRecommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              </IntelligenceCard>
            )}

            {/* Tips - Full Details */}
            {allTips.length > 0 && (
              <IntelligenceCard title="All Tips" icon={<Lightbulb className="w-3 h-3 text-amber-600" />}>
                <div className="space-y-2">
                  {bestTimes.length > 0 && (
                    <div>
                      <h6 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Best Times</h6>
                      <div className="space-y-1">
                        {bestTimes.map((tip, index) => (
                          <div key={index} className="flex items-start gap-2 text-xs text-gray-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                            {tip}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {localInsights.length > 0 && (
                    <div>
                      <h6 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Local Insights</h6>
                      <div className="space-y-1">
                        {localInsights.map((tip, index) => (
                          <div key={index} className="flex items-start gap-2 text-xs text-gray-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                            {tip}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {culturalNotes.length > 0 && (
                    <div>
                      <h6 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Cultural Notes</h6>
                      <div className="space-y-1">
                        {culturalNotes.map((tip, index) => (
                          <div key={index} className="flex items-start gap-2 text-xs text-gray-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                            {tip}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </IntelligenceCard>
            )}

            {/* Highlights - Full Details */}
            {allHighlights.length > 0 && (
              <IntelligenceCard title="All Highlights" icon={<Star className="w-3 h-3 text-purple-600" />}>
                <div className="space-y-2">
                  {mustSee.length > 0 && (
                    <div>
                      <h6 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Must See</h6>
                      <div className="space-y-1">
                        {mustSee.map((highlight, index) => (
                          <div key={index} className="flex items-start gap-2 text-xs text-gray-600">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 flex-shrink-0" />
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {foodRecommendations.length > 0 && (
                    <div>
                      <h6 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Food Recommendations</h6>
                      <div className="space-y-1">
                        {foodRecommendations.map((highlight, index) => (
                          <div key={index} className="flex items-start gap-2 text-xs text-gray-600">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 flex-shrink-0" />
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {hiddenGems.length > 0 && (
                    <div>
                      <h6 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Hidden Gems</h6>
                      <div className="space-y-1">
                        {hiddenGems.map((highlight, index) => (
                          <div key={index} className="flex items-start gap-2 text-xs text-gray-600">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 flex-shrink-0" />
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </IntelligenceCard>
            )}
          </div>
        )}
      </div>
    );
  }

  // Expanded variant for detailed view
  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Lightbulb className="w-4 h-4 text-white" />
        </div>
        <h4 className="font-semibold text-gray-900">Day {day} Intelligence</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Weather */}
        {data.weather && (
          <IntelligenceCard title="Weather" icon={<Thermometer className="w-4 h-4 text-blue-600" />}>
            <div className="space-y-2">
              <p className="text-sm text-gray-700">{data.weather.conditions}</p>
              {weatherRecommendations.length > 0 && (
                <div className="space-y-1">
                  {weatherRecommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                      {rec}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </IntelligenceCard>
        )}

        {/* Tips */}
        {allTips.length > 0 && (
          <IntelligenceCard title="Daily Tips" icon={<Lightbulb className="w-4 h-4 text-amber-600" />}>
            <div className="space-y-2">
              {bestTimes.length > 0 && (
                <div>
                  <h6 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Best Times</h6>
                  <div className="space-y-1">
                    {bestTimes.map((tip, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-gray-600">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0" />
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {localInsights.length > 0 && (
                <div>
                  <h6 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Local Insights</h6>
                  <div className="space-y-1">
                    {localInsights.map((tip, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-gray-600">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0" />
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {culturalNotes.length > 0 && (
                <div>
                  <h6 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Cultural Notes</h6>
                  <div className="space-y-1">
                    {culturalNotes.map((tip, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-gray-600">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0" />
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </IntelligenceCard>
        )}

        {/* Highlights */}
        {allHighlights.length > 0 && (
          <IntelligenceCard title="Highlights" icon={<Star className="w-4 h-4 text-purple-600" />}>
            <div className="space-y-2">
              {mustSee.length > 0 && (
                <div>
                  <h6 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Must See</h6>
                  <div className="space-y-1">
                    {mustSee.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 flex-shrink-0" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {foodRecommendations.length > 0 && (
                <div>
                  <h6 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Food Recommendations</h6>
                  <div className="space-y-1">
                    {foodRecommendations.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 flex-shrink-0" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {hiddenGems.length > 0 && (
                <div>
                  <h6 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Hidden Gems</h6>
                  <div className="space-y-1">
                    {hiddenGems.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 flex-shrink-0" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </IntelligenceCard>
        )}
      </div>
    </div>
  );
};
