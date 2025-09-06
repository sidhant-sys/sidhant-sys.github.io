import React from 'react';
import { Calendar, MapPin, Clock, Plane, Star, Edit, Trash2, DollarSign, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ItineraryItem {
  id: string;
  day: number;
  time: string;
  activity: string;
  location: string;
  description: string;
  type: 'activity' | 'dining' | 'transport' | 'accommodation';
  priority: 'high' | 'medium' | 'low';
  price?: number;
  bookingAvailable?: boolean;
}

interface ItineraryDisplayProps {
  itinerary: ItineraryItem[];
  destination: string;
  dates: string;
  onEditItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

export const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({
  itinerary,
  destination,
  dates,
  onEditItem,
  onDeleteItem
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'activity':
        return <Star className="w-4 h-4" />;
      case 'dining':
        return <MapPin className="w-4 h-4" />;
      case 'transport':
        return <Plane className="w-4 h-4" />;
      case 'accommodation':
        return <Calendar className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'activity':
        return 'bg-blue-100 text-blue-800';
      case 'dining':
        return 'bg-green-100 text-green-800';
      case 'transport':
        return 'bg-purple-100 text-purple-800';
      case 'accommodation':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const groupedByDay = itinerary.reduce((acc, item) => {
    if (!acc[item.day]) {
      acc[item.day] = [];
    }
    acc[item.day].push(item);
    return acc;
  }, {} as Record<number, ItineraryItem[]>);

  if (itinerary.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="mb-2">No itinerary yet</h3>
          <p className="text-muted-foreground mb-4">
            Use voice or chat to start planning your perfect trip
          </p>
          <div className="text-sm text-muted-foreground">
            Try saying: "I want to visit Paris for 3 days"
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>{destination || 'Your Trip'}</span>
          </CardTitle>
          {dates && (
            <p className="text-muted-foreground flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{dates}</span>
            </p>
          )}
        </CardHeader>
      </Card>

      {/* Daily Itinerary */}
      {Object.entries(groupedByDay)
        .sort(([a], [b]) => parseInt(a) - parseInt(b))
        .map(([day, items]) => (
          <Card key={day}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Day {day}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {getTypeIcon(item.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <Badge className={getTypeColor(item.type)}>
                                {item.type}
                              </Badge>
                              <span className="text-sm text-muted-foreground flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {item.time}
                              </span>
                            </div>
                            
                            <h4 className="font-medium">{item.activity}</h4>
                            <p className="text-sm text-muted-foreground flex items-center mt-1">
                              <MapPin className="w-3 h-3 mr-1" />
                              {item.location}
                            </p>
                            {item.description && (
                              <p className="text-sm text-muted-foreground mt-2">
                                {item.description}
                              </p>
                            )}
                            
                            {/* Price and Booking Info */}
                            {item.price && (
                              <div className="flex items-center justify-between mt-3 p-2 bg-muted/30 rounded">
                                <div className="flex items-center space-x-2 text-sm">
                                  <DollarSign className="w-4 h-4 text-green-600" />
                                  <span className="font-medium">${item.price}</span>
                                  <span className="text-muted-foreground">
                                    per {item.type === 'accommodation' ? 'night' : 'person'}
                                  </span>
                                </div>
                                {item.bookingAvailable && (
                                  <Badge className="bg-green-100 text-green-800">
                                    <ShoppingCart className="w-3 h-3 mr-1" />
                                    Bookable
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex space-x-1 ml-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onEditItem(item.id)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDeleteItem(item.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};