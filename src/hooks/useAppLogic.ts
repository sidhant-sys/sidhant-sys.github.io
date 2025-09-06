import { useCallback } from 'react';
import { Message, ItineraryItem, TierType } from '../types';

interface UseAppLogicProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setUserRequest: (request: string) => void;
  setSelectedTier: (tier: TierType | null) => void;
  setCurrentStep: (step: 'planning' | 'tier-selection' | 'booking') => void;
  setLayoutMode: (mode: 'split' | 'full-itinerary') => void;
  setBookedItems: React.Dispatch<React.SetStateAction<string[]>>;
  setItinerary: React.Dispatch<React.SetStateAction<ItineraryItem[]>>;
  setDestination: (dest: string) => void;
  setDates: (dates: string) => void;
}

export const useAppLogic = ({
  setMessages,
  setUserRequest,
  setSelectedTier,
  setCurrentStep,
  setLayoutMode,
  setBookedItems,
  setItinerary,
  setDestination,
  setDates
}: UseAppLogicProps) => {
  const generateAIResponse = useCallback((input: string): string => {
    const responses = [
      "Great choice! I'm creating a personalized itinerary for you. Let me suggest some amazing experiences...",
      "I love that destination! I'm putting together the perfect plan with local highlights and hidden gems.",
      "Excellent! I'm crafting an itinerary that balances must-see attractions with authentic local experiences.",
      "Perfect timing! I'm designing a trip that will give you the best of both popular spots and local favorites."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }, []);

  const handleVoiceInput = useCallback((text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setUserRequest(text);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(text),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  }, [setMessages, setUserRequest, generateAIResponse]);

  const handleChatInput = useCallback((text: string) => {
    handleVoiceInput(text); // Same processing for both voice and chat
  }, [handleVoiceInput]);

  const handleToggleListening = useCallback(() => {
    // This will be handled by the ElevenLabs component
  }, []);

  const handleEditItem = useCallback((id: string) => {
    console.log('Edit item:', id);
    // Implementation for editing itinerary items
  }, []);

  const handleDeleteItem = useCallback((id: string) => {
    setItinerary(prev => prev.filter(item => item.id !== id));
  }, [setItinerary]);

  const handleTierSelect = useCallback((tier: TierType) => {
    setSelectedTier(tier);
    setCurrentStep('booking');
    // Expand to full-screen view only after tier is selected
    setLayoutMode('full-itinerary');
    
    // Budget estimates will be set when needed
    // Removed hardcoded budget updates
  }, [setSelectedTier, setCurrentStep, setLayoutMode]);

  const handleBookItem = useCallback((item: { id: string }) => {
    setBookedItems(prev => [...prev, item.id]);
  }, [setBookedItems]);

  const handleBackToPlanning = useCallback(() => {
    setCurrentStep('planning');
  }, [setCurrentStep]);

  const handleBackToChat = useCallback(() => {
    setLayoutMode('split');
    setCurrentStep('planning');
    setSelectedTier(null);
    setItinerary([]);
    setDestination('');
    setDates('');
    setUserRequest('');
    setMessages([]);
    setBookedItems([]);
  }, [
    setLayoutMode,
    setCurrentStep,
    setSelectedTier,
    setItinerary,
    setDestination,
    setDates,
    setUserRequest,
    setMessages,
    setBookedItems
  ]);

  return {
    handleVoiceInput,
    handleChatInput,
    handleToggleListening,
    handleEditItem,
    handleDeleteItem,
    handleTierSelect,
    handleBookItem,
    handleBackToPlanning,
    handleBackToChat,
    generateAIResponse
  };
};
