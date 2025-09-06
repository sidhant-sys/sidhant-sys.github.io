import React, { useState } from 'react';
import { ExternalLink, CreditCard, Calendar, Users, MapPin, Star, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';

export interface BookableItem {
  id: string;
  name: string;
  type: 'flight' | 'hotel' | 'activity' | 'restaurant' | 'transport';
  price: number;
  originalPrice?: number;
  currency: string;
  duration?: string;
  rating?: number;
  reviewCount?: number;
  image?: string;
  provider: string;
  bookingUrl: string;
  description: string;
  features: string[];
  cancellationPolicy?: string;
  availability: 'available' | 'limited' | 'waitlist';
}

interface BookingInterfaceProps {
  item: BookableItem;
  onBook: (itemId: string) => void;
  onClose: () => void;
}

export const BookingInterface: React.FC<BookingInterfaceProps> = ({
  item,
  onBook,
  onClose
}) => {
  const [isBooking, setIsBooking] = useState(false);

  const handleBooking = () => {
    setIsBooking(true);
    setTimeout(() => {
      onBook(item.id);
      setIsBooking(false);
    }, 2000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return '✈️';
      case 'hotel':
        return '🏨';
      case 'activity':
        return '🎯';
      case 'restaurant':
        return '🍽️';
      case 'transport':
        return '🚗';
      default:
        return '📍';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'limited':
        return 'bg-yellow-100 text-yellow-800';
      case 'waitlist':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'Available';
      case 'limited':
        return 'Limited availability';
      case 'waitlist':
        return 'Join waitlist';
      default:
        return 'Check availability';
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">{getTypeIcon(item.type)}</span>
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">via {item.provider}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>

          {/* Rating & Reviews */}
          {item.rating && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{item.rating}</span>
              </div>
              {item.reviewCount && (
                <span className="text-sm text-muted-foreground">
                  ({item.reviewCount.toLocaleString()} reviews)
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">
                {item.currency}{item.price}
              </span>
              {item.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {item.currency}{item.originalPrice}
                </span>
              )}
            </div>
            <Badge className={getAvailabilityColor(item.availability)}>
              {getAvailabilityText(item.availability)}
            </Badge>
          </div>

          {/* Duration */}
          {item.duration && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{item.duration}</span>
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-muted-foreground">{item.description}</p>

          {/* Features */}
          {item.features.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Includes:</h4>
              <ul className="text-sm space-y-1">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Separator />

          {/* Cancellation Policy */}
          {item.cancellationPolicy && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Cancellation:</h4>
              <p className="text-xs text-muted-foreground">{item.cancellationPolicy}</p>
            </div>
          )}

          {/* Booking Actions */}
          <div className="space-y-2">
            <Button
              className="w-full"
              onClick={handleBooking}
              disabled={isBooking || item.availability === 'waitlist'}
            >
              {isBooking ? (
                'Processing...'
              ) : item.availability === 'waitlist' ? (
                'Join Waitlist'
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Book Now - {item.currency}{item.price}
                </>
              )}
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.open(item.bookingUrl, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on {item.provider}
            </Button>
          </div>

          {/* Provider Info */}
          <div className="text-xs text-muted-foreground text-center">
            Secure booking powered by {item.provider}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};