import React from 'react';
import { ElevenLabsConvAI } from './ElevenLabsConvAI';
import { ChatInterface } from './ChatInterface';
import { ItineraryDisplay } from './ItineraryDisplay';
import { EnhancedItineraryView } from './EnhancedItineraryView';
import { TierSelector } from './TierSelector';
import { BookingInterface } from './BookingInterface';
// Removed TrackingEntriesDisplay import - using hook directly
import { SimpleLoader } from './SimpleLoader';
import { useSimpleLoader } from '../hooks/useSimpleLoader';
import { useTrackingPolling } from '../hooks/useTrackingPolling';
import { useBooking } from '../hooks/useBooking';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
// Removed Tabs imports - using custom implementation
import { Badge } from './ui/badge';
import { ArrowRight, CreditCard, CheckCircle, XCircle, Loader2 } from 'lucide-react';
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
  const [generatedItineraryData, setGeneratedItineraryData] = React.useState<any>(null);
  const [showTierSelection, setShowTierSelection] = React.useState(false);

  // Use the new simple loader
  const { isVisible: isLoaderVisible, showLoader, hideLoader } = useSimpleLoader({
    minDuration: 5000 // 5 seconds minimum
  });

  const handleItineraryGenerated = React.useCallback((data: any) => {
    setGeneratedItineraryData(data);
    // Hide loader when we get real data
    hideLoader();
  }, [hideLoader]);

  const handleItineraryGenerationStart = React.useCallback(() => {
    // Show loader immediately
    showLoader();
  }, [showLoader]);

  const handleProceedToTiers = React.useCallback(() => {
    setShowTierSelection(true);
  }, []);

  const handleTierSelect = React.useCallback((tier: TierType) => {
    onTierSelect(tier);
    setShowTierSelection(false);
  }, [onTierSelect]);

  const handleBackFromTiers = React.useCallback(() => {
    setShowTierSelection(false);
  }, []);

  // Use the tracking polling hook (but ignore its loader state)
  const { } = useTrackingPolling({
    enabled: true,
    onItineraryGenerated: handleItineraryGenerated,
    onItineraryGenerationStart: handleItineraryGenerationStart
  });


  // Booking functionality
  const { isBooking, bookingError, lastBooking, handleBooking, resetBookingState } = useBooking({
    onBookingSuccess: (booking) => {
      alert(`Booking successful! Reference: ${booking.bookingReference || booking.id}`);
    },
    onBookingError: (error) => {
      alert(`Booking failed: ${error}`);
    }
  });

  const onCompleteBooking = React.useCallback(async () => {
    if (!generatedItineraryData?.id || !selectedTier) {
      alert('Missing itinerary or tier information');
      return;
    }

    resetBookingState();
    await handleBooking(generatedItineraryData.id, selectedTier);
  }, [generatedItineraryData?.id, selectedTier, handleBooking, resetBookingState]);
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'planning':
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left side - Chat Interface */}
              <div className="space-y-6">
                {/* Custom Tab Implementation */}
                <div className="w-full">
                  <div className="flex border-b border-gray-200 mb-6">
                    <button
                      onClick={() => {
                        onActiveTabChange('voice');
                      }}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'voice'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Voice Assistant
                    </button>
                    <button
                      onClick={() => {
                        onActiveTabChange('chat');
                      }}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'chat'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Text Chat
                    </button>
                  </div>
                  
                  {/* Tab Content */}
                  {activeTab === 'voice' && (
                    <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-white">
                      <ElevenLabsConvAI
                        onVoiceInput={onVoiceInput}
                        isListening={isListening}
                        onToggleListening={onToggleListening}
                      />
                    </div>
                  )}
                  
                  {activeTab === 'chat' && (
                    <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-white">
                      <ChatInterface
                        onChatInput={onChatInput}
                        messages={messages}
                      />
                    </div>
                  )}
                  
                </div>
              </div>
              
              {/* Right side - Itinerary Display and Tracking */}
              <div>
                <div className=" bg-white">
                  <ItineraryDisplay
                    itinerary={itinerary}
                    destination={destination}
                    dates={dates}
                    onEditItem={onEditItem}
                    onDeleteItem={onDeleteItem}
                  />
                </div>
                
                {/* Background tracking handled by hook above */}
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
              
              {/* Booking error display */}
              {bookingError && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 text-destructive">
                    <XCircle className="w-5 h-5" />
                    <span className="font-medium">Booking Failed</span>
                  </div>
                  <p className="text-destructive mt-1">{bookingError}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetBookingState}
                    className="mt-2 text-destructive border-destructive/30 hover:bg-destructive/10"
                  >
                    Try Again
                  </Button>
                </div>
              )}

              {/* Success message */}
              {lastBooking && (
                <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 text-success">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Booking Successful!</span>
                  </div>
                  <p className="text-success mt-1">
                    Your booking has been confirmed. 
                    {lastBooking.bookingReference && (
                      <span className="font-medium"> Reference: {lastBooking.bookingReference}</span>
                    )}
                  </p>
                </div>
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
                  <Button 
                    onClick={onCompleteBooking}
                    disabled={isBooking || !generatedItineraryData?.id || !selectedTier}
                    className={lastBooking ? 'bg-success hover:bg-success/90' : ''}
                  >
                    {isBooking ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                        Booking...
                      </>
                    ) : lastBooking ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Booked!
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-1" />
                        Complete Booking
                      </>
                    )}
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

  // Show tier selection if requested
  if (showTierSelection && generatedItineraryData) {
    // Get budget estimates from the generated data (map 'budgeted' to 'economy')
    const budgetEstimate = generatedItineraryData.generatedItinerary ? {
      economy: generatedItineraryData.generatedItinerary.budgeted?.overview?.total_cost || 0,
      premium: generatedItineraryData.generatedItinerary.premium?.overview?.total_cost || 0,
      luxury: generatedItineraryData.generatedItinerary.luxury?.overview?.total_cost || 0,
    } : totalEstimate;

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" onClick={handleBackFromTiers}>
            ← Back to Itinerary
          </Button>
        </div>
        <TierSelector
          selectedTier={selectedTier}
          onTierSelect={handleTierSelect}
          totalEstimate={budgetEstimate}
        />
      </div>
    );
  }

  // Show expanded itinerary view if we have generated data
  if (generatedItineraryData) {
    return (
      <EnhancedItineraryView
        itinerary={generatedItineraryData.itinerary || itinerary}
        destination={generatedItineraryData.destination || destination}
        dates={generatedItineraryData.dates || dates}
        selectedTier={selectedTier || undefined}
        onBackToChat={() => {
          setGeneratedItineraryData(null);
          setShowTierSelection(false);
          onBackToChat();
        }}
        onEditItem={onEditItem}
        onDeleteItem={onDeleteItem}
        onProceedToTiers={handleProceedToTiers}
        apiResponse={generatedItineraryData}
      />
    );
  }

  if (layoutMode === 'full-itinerary') {
    return (
      <EnhancedItineraryView
        itinerary={itinerary}
        destination={destination}
        dates={dates}
        selectedTier={selectedTier || undefined}
        onBackToChat={onBackToChat}
        onEditItem={onEditItem}
        onDeleteItem={onDeleteItem}
        onProceedToTiers={() => {}}
        apiResponse={apiResponse}
      />
    );
  }

  return (
    <>
      {renderCurrentStep()}
      <SimpleLoader 
        isVisible={isLoaderVisible}
        minDuration={5000}
      />
    </>
  );
};

export default StepRenderer;
