import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Check, Star, Plane, Crown, Zap } from 'lucide-react';

export type TierType = 'economy' | 'premium' | 'luxury';

interface TierOption {
  id: TierType;
  name: string;
  icon: React.ReactNode;
  tagline: string;
  priceRange: string;
  features: string[];
  popular?: boolean;
  color: string;
  bgColor: string;
}

interface TierSelectorProps {
  selectedTier: TierType | null;
  onTierSelect: (tier: TierType) => void;
  totalEstimate?: {
    economy: number;
    premium: number;
    luxury: number;
  };
}

export const TierSelector: React.FC<TierSelectorProps> = ({
  selectedTier,
  onTierSelect,
  totalEstimate
}) => {
  const tiers: TierOption[] = [
    {
      id: 'economy',
      name: 'Economy',
      icon: <Plane className="w-5 h-5" />,
      tagline: 'Budget-friendly essentials',
      priceRange: '₹₹ - ₹₹₹₹',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
      features: [
        'Budget accommodations (3-star hotels)',
        'Economy flights & transport',
        'Popular restaurants & local eateries',
        'Main tourist attractions',
        'Group tours and activities',
        'Basic itinerary planning'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: <Star className="w-5 h-5" />,
      tagline: 'Enhanced comfort & experiences',
      priceRange: '₹₹₹ - ₹₹₹₹₹',
      popular: true,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-200',
      features: [
        'Premium accommodations (4-star hotels)',
        'Business class flights available',
        'Fine dining & curated restaurants',
        'Skip-the-line attraction passes',
        'Private tours & unique experiences',
        'Personalized concierge support'
      ]
    },
    {
      id: 'luxury',
      name: 'Luxury',
      icon: <Crown className="w-5 h-5" />,
      tagline: 'Ultimate premium experience',
      priceRange: '₹₹₹₹₹ - ₹₹₹₹₹₹',
      color: 'text-gold-600',
      bgColor: 'bg-amber-50 border-amber-200',
      features: [
        'Luxury accommodations (5-star hotels)',
        'First class flights & private jets',
        'Michelin-starred restaurants',
        'VIP attraction access',
        'Private guides & exclusive experiences',
        '24/7 luxury concierge service'
      ]
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold flex items-center justify-center space-x-2">
          <Zap className="w-6 h-6 text-orange-500" />
          <span>Choose Your Travel Style</span>
        </h2>
        <p className="text-muted-foreground">
          Select the experience level that matches your preferences and budget
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <Card
            key={tier.id}
            className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTier === tier.id
                ? `ring-2 ring-offset-2 ${tier.bgColor.replace('bg-', 'ring-').replace('-50', '-300')}`
                : 'hover:shadow-md'
            } ${tier.bgColor}`}
            onClick={() => onTierSelect(tier.id)}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-orange-500 text-white px-3 py-1">
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-3">
              <div className={`w-12 h-12 mx-auto rounded-full ${tier.bgColor.replace('-50', '-100')} flex items-center justify-center ${tier.color} mb-2`}>
                {tier.icon}
              </div>
              <CardTitle className="flex items-center justify-center space-x-2">
                <span>{tier.name}</span>
                {selectedTier === tier.id && (
                  <Check className="w-5 h-5 text-green-600" />
                )}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{tier.tagline}</p>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">{tier.priceRange}</p>
                {totalEstimate && (
                  <p className={`font-semibold ${tier.color}`}>
                    {formatPrice(totalEstimate[tier.id])} estimated
                  </p>
                )}
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <ul className="space-y-2">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className={`w-full mt-4 ${
                  selectedTier === tier.id
                    ? 'bg-green-600 hover:bg-green-700'
                    : ''
                }`}
                variant={selectedTier === tier.id ? 'default' : 'outline'}
                onClick={(e) => {
                  e.stopPropagation();
                  onTierSelect(tier.id);
                }}
              >
                {selectedTier === tier.id ? 'Selected' : 'Select ' + tier.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTier && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-green-800">
              <Check className="w-5 h-5" />
              <span className="font-medium">
                {tiers.find(t => t.id === selectedTier)?.name} tier selected!
              </span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              Your itinerary will be customized with {selectedTier} level accommodations, 
              activities, and experiences. Proceed to see detailed bookings.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};