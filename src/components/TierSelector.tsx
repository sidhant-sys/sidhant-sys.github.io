import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Check, Star, Plane, Crown, Zap } from 'lucide-react';

export type TierType = 'budgeted' | 'premium' | 'luxury';

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
    budgeted: number;
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
      id: 'budgeted',
      name: 'Budgeted',
      icon: <Plane className="w-5 h-5" />,
      tagline: 'Budget-friendly essentials',
      priceRange: '$$ - $$$$',
      color: 'text-primary',
      bgColor: 'bg-card border-border hover:border-primary/30',
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
      priceRange: '$$$ - $$$$$',
      popular: true,
      color: 'text-primary',
      bgColor: 'bg-card border-border hover:border-primary/30',
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
      priceRange: '$$$$$ - $$$$$$',
      color: 'text-primary',
      bgColor: 'bg-card border-border hover:border-primary/30',
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
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">
            Choose Your Travel Style
          </h2>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Select the experience level that matches your preferences and budget
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <Card
            key={tier.id}
            className={`relative cursor-pointer transition-all duration-300 shadow-professional hover:shadow-professional-lg transform hover:scale-[1.02] ${
              selectedTier === tier.id
                ? 'ring-2 ring-primary ring-offset-2 border-primary'
                : ''
            } ${tier.bgColor}`}
            onClick={() => onTierSelect(tier.id)}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-primary text-primary-foreground px-3 py-1 shadow-sm">
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className={`w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center ${tier.color} mb-3 transition-colors duration-300 ${
                selectedTier === tier.id ? 'bg-primary/20' : ''
              }`}>
                {tier.icon}
              </div>
              <CardTitle className="flex items-center justify-center space-x-2 text-xl">
                <span>{tier.name}</span>
                {selectedTier === tier.id && (
                  <Check className="w-5 h-5 text-success animate-in slide-in-from-right duration-200" />
                )}
              </CardTitle>
              <p className="text-muted-foreground">{tier.tagline}</p>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground font-medium">{tier.priceRange}</p>
                {totalEstimate && (
                  <p className="font-semibold text-primary text-lg">
                    {formatPrice(totalEstimate[tier.id])} estimated
                  </p>
                )}
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3 text-sm">
                    <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-card-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className="w-full"
                variant={selectedTier === tier.id ? 'default' : 'outline'}
                size="lg"
                onClick={(e) => {
                  e.stopPropagation();
                  onTierSelect(tier.id);
                }}
              >
                {selectedTier === tier.id ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Selected
                  </>
                ) : (
                  `Select ${tier.name}`
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTier && (
        <Card className="bg-success/5 border-success/20 shadow-professional">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 text-success">
              <div className="p-1 bg-success/20 rounded-full">
                <Check className="w-4 h-4" />
              </div>
              <span className="font-semibold text-lg">
                {tiers.find(t => t.id === selectedTier)?.name} tier selected!
              </span>
            </div>
            <p className="text-muted-foreground mt-2 text-balance">
              Your itinerary will be customized with {selectedTier} level accommodations, 
              activities, and experiences. Proceed to see detailed bookings.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};