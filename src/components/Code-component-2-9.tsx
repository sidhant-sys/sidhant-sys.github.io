import React from 'react';
import { Check, Star, Plane, Utensils, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export type TierType = 'economy' | 'basic' | 'premium';

interface TierOption {
  id: TierType;
  name: string;
  price: string;
  description: string;
  color: string;
  popular?: boolean;
  features: string[];
  includes: {
    flights: string;
    accommodation: string;
    activities: string;
    dining: string;
    transport: string;
  };
}

interface TierSelectorProps {
  selectedTier: TierType | null;
  onTierSelect: (tier: TierType) => void;
  destination: string;
}

export const TierSelector: React.FC<TierSelectorProps> = ({
  selectedTier,
  onTierSelect,
  destination
}) => {
  const tiers: TierOption[] = [
    {
      id: 'economy',
      name: 'Economy',
      price: '$899',
      description: 'Budget-friendly essentials',
      color: 'border-green-200 bg-green-50',
      features: [
        'Economy flights',
        'Budget accommodations',
        'Essential activities',
        'Local dining suggestions',
        'Public transport options'
      ],
      includes: {
        flights: 'Economy class',
        accommodation: '2-3 star hotels',
        activities: '3-4 essential attractions',
        dining: 'Local recommendations',
        transport: 'Public transport'
      }
    },
    {
      id: 'basic',
      name: 'Basic',
      price: '$1,299',
      description: 'Perfect balance of comfort and value',
      color: 'border-blue-200 bg-blue-50',
      popular: true,
      features: [
        'Standard flights',
        'Mid-range hotels',
        'Popular activities',
        'Restaurant reservations',
        'Mixed transport options',
        'Basic travel insurance'
      ],
      includes: {
        flights: 'Economy+ or Premium Economy',
        accommodation: '3-4 star hotels',
        activities: '5-6 popular attractions',
        dining: 'Restaurant bookings',
        transport: 'Mix of options'
      }
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$2,199',
      description: 'Luxury experience with exclusive access',
      color: 'border-purple-200 bg-purple-50',
      features: [
        'Business class flights',
        'Luxury accommodations',
        'VIP experiences',
        'Fine dining reservations',
        'Private transport',
        'Comprehensive insurance',
        'Concierge service',
        'Priority booking'
      ],
      includes: {
        flights: 'Business class',
        accommodation: '4-5 star hotels',
        activities: '7-8 premium experiences',
        dining: 'Fine dining venues',
        transport: 'Private transfers'
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">Choose Your Travel Style</h3>
        <p className="text-muted-foreground">
          Select the perfect itinerary tier for your {destination} adventure
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <Card
            key={tier.id}
            className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTier === tier.id 
                ? `${tier.color} ring-2 ring-blue-500 ring-offset-2` 
                : 'hover:shadow-md'
            }`}
            onClick={() => onTierSelect(tier.id)}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-3 py-1">
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <Star className="w-5 h-5" />
                <span>{tier.name}</span>
              </CardTitle>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">{tier.price}</div>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Key Includes */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Includes:</h4>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div className="flex items-center space-x-1">
                    <Plane className="w-3 h-3 text-blue-500" />
                    <span>{tier.includes.flights}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-green-500" />
                    <span>{tier.includes.accommodation}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>{tier.includes.activities}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Utensils className="w-3 h-3 text-red-500" />
                    <span>{tier.includes.dining}</span>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-1">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className="w-full" 
                variant={selectedTier === tier.id ? "default" : "outline"}
                onClick={() => onTierSelect(tier.id)}
              >
                {selectedTier === tier.id ? 'Selected' : `Choose ${tier.name}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTier && (
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <Check className="w-4 h-4 inline mr-1 text-green-500" />
            {tiers.find(t => t.id === selectedTier)?.name} tier selected. 
            Your personalized itinerary is being generated...
          </p>
        </div>
      )}
    </div>
  );
};