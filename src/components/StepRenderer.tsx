import React from 'react';
import { ElevenLabsConvAI } from './ElevenLabsConvAI';
import { ChatInterface } from './ChatInterface';
import { ItineraryDisplay } from './ItineraryDisplay';
import { EnhancedItineraryView } from './EnhancedItineraryView';
import { TierSelector } from './TierSelector';
import { BookingInterface } from './BookingInterface';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { ArrowRight, CreditCard } from 'lucide-react';
import { StepType, TierType, ItineraryItem, Message, BudgetEstimate } from '../types';
import { ItineraryApiResponse } from '../types/api';

interface StepRendererProps {
  currentStep: StepType;
  layoutMode: 'split' | 'full-itinerary';
  activeTab: string;
  isListening: boolean;
  messages: Message[];
  itinerary: ItineraryItem[];
  selectedTier: TierType | null;
  totalEstimate: BudgetEstimate;
  userRequest: string;
  bookedItems: string[];
  destination: string;
  dates: string;
  onVoiceInput: (text: string) => void;
  onToggleListening: () => void;
  onChatInput: (text: string) => void;
  onTierSelect: (tier: TierType) => void;
  onBookItem: (item: { id: string }) => void;
  onBackToPlanning: () => void;
  onBackToChat: () => void;
  onEditItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onActiveTabChange: (tab: string) => void;
  getCurrentBudget: () => number;
  apiResponse?: ItineraryApiResponse;
}

const StepRenderer: React.FC<StepRendererProps> = ({
  currentStep,
  layoutMode,
  activeTab,
  isListening,
  messages,
  itinerary,
  selectedTier,
  totalEstimate,
  userRequest,
  bookedItems,
  destination,
  dates,
  onVoiceInput,
  onToggleListening,
  onChatInput,
  onTierSelect,
  onBookItem,
  onBackToPlanning,
  onBackToChat,
  onEditItem,
  onDeleteItem,
  onActiveTabChange,
  getCurrentBudget,
  apiResponse
}) => {
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'planning':
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left side - Chat Interface */}
              <div className="space-y-6">
                <Tabs value={activeTab} onValueChange={onActiveTabChange} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="voice">Voice Assistant</TabsTrigger>
                    <TabsTrigger value="chat">Text Chat</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="voice" className="mt-6 border border-gray-200 rounded-lg p-4 bg-white">
                    <ElevenLabsConvAI
                      onVoiceInput={onVoiceInput}
                      isListening={isListening}
                      onToggleListening={onToggleListening}
                    />
                  </TabsContent>
                  
                  <TabsContent value="chat" className="mt-6 border border-gray-200 rounded-lg p-4 bg-white">
                    <ChatInterface
                      onChatInput={onChatInput}
                      messages={messages}
                    />
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Right side - Itinerary Display */}
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-white">
                  <ItineraryDisplay
                    itinerary={itinerary}
                    destination={destination}
                    dates={dates}
                    onEditItem={onEditItem}
                    onDeleteItem={onDeleteItem}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'tier-selection':
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Your Request</h2>
                    <p className="text-gray-600 mb-4">{userRequest}</p>
                    {selectedTier && (
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">Selected: {selectedTier}</Badge>
                        <span className="text-sm text-gray-500">
                          Budget: ${getCurrentBudget()}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Budget Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Economy:</span>
                        <span>${totalEstimate.economy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Premium:</span>
                        <span>${totalEstimate.premium}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Luxury:</span>
                        <span>${totalEstimate.luxury}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <TierSelector
                  selectedTier={selectedTier}
                  onTierSelect={onTierSelect}
                  totalEstimate={totalEstimate}
                />
                
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={onBackToPlanning}>
                    ← Back to Planning
                  </Button>
                  {selectedTier && (
                    <Button onClick={() => {}}>
                      View Bookings <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'booking':
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="space-y-6">
              {selectedTier && (
                <BookingInterface
                  selectedTier={selectedTier}
                  destination={destination}
                  onBookItem={onBookItem}
                  bookedItems={bookedItems}
                />
              )}
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => {}}>
                  ← Back to Tiers
                </Button>
                <div className="space-x-2">
                  <Button variant="outline">
                    <CreditCard className="w-4 h-4 mr-1" />
                    View Cart ({bookedItems.length})
                  </Button>
                  <Button onClick={() => alert('Booking functionality coming soon!')}>
                    Complete Booking
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (layoutMode === 'full-itinerary') {
    return (
      <EnhancedItineraryView
        itinerary={itinerary}
        destination={destination}
        dates={dates}
        selectedTier={selectedTier}
        userRequest={userRequest}
        totalEstimate={totalEstimate}
        onBackToChat={onBackToChat}
        onEditItem={onEditItem}
        onDeleteItem={onDeleteItem}
        getCurrentBudget={getCurrentBudget}
        apiResponse={apiResponse}
      />
    );
  }

  return renderCurrentStep();
};

export default StepRenderer;
