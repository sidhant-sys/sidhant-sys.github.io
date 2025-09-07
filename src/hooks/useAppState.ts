import { useState } from 'react';
import { Message, ItineraryItem, TierType, BudgetEstimate, StepType, LayoutMode } from '../types';

export const useAppState = () => {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [activeTab, setActiveTab] = useState('voice');
  const [selectedTier, setSelectedTier] = useState<TierType | null>('economy');
  const [currentStep, setCurrentStep] = useState<StepType>('planning');
  const [bookedItems, setBookedItems] = useState<string[]>([]);
  const [totalEstimate, setTotalEstimate] = useState<BudgetEstimate>({
    economy: 0,
    premium: 0,
    luxury: 0
  });
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('split');
  const [chatFinished, setChatFinished] = useState(false);
  const [userRequest, setUserRequest] = useState('');

  // Dynamic budget calculation based on selected tier
  const getCurrentBudget = () => {
    if (!selectedTier) return 0;
    return totalEstimate[selectedTier];
  };

  return {
    // State
    isListening,
    messages,
    itinerary,
    destination,
    dates,
    activeTab,
    selectedTier,
    currentStep,
    bookedItems,
    totalEstimate,
    layoutMode,
    chatFinished,
    userRequest,
    
    // Setters
    setIsListening,
    setMessages,
    setItinerary,
    setDestination,
    setDates,
    setActiveTab,
    setSelectedTier,
    setCurrentStep,
    setBookedItems,
    setTotalEstimate,
    setLayoutMode,
    setChatFinished,
    setUserRequest,
    
    // Computed
    getCurrentBudget
  };
};
