import React from 'react';
import { MainLayout } from '../components/MainLayout';
import StepRenderer from '../components/StepRenderer';
import { useAppState } from '../hooks/useAppState';
import { useAppLogic } from '../hooks/useAppLogic';
import { CurrencyProvider } from '../contexts/CurrencyContext';

export const Home: React.FC = () => {
  const appState = useAppState();
  const appLogic = useAppLogic({
    setMessages: appState.setMessages,
    setUserRequest: appState.setUserRequest,
    setSelectedTier: appState.setSelectedTier,
    setCurrentStep: appState.setCurrentStep,
    setLayoutMode: appState.setLayoutMode,
    setBookedItems: appState.setBookedItems,
    setItinerary: appState.setItinerary,
    setDestination: appState.setDestination,
    setDates: appState.setDates
  });

  return (
    <CurrencyProvider>
      <MainLayout
        currentStep={appState.currentStep}
        itineraryLength={appState.itinerary.length}
        layoutMode={appState.layoutMode}
      >
        <StepRenderer
          currentStep={appState.currentStep}
          layoutMode={appState.layoutMode}
          activeTab={appState.activeTab}
          isListening={appState.isListening}
          messages={appState.messages}
          itinerary={appState.itinerary}
          selectedTier={appState.selectedTier}
          totalEstimate={appState.totalEstimate}
          userRequest={appState.userRequest}
          bookedItems={appState.bookedItems}
          destination={appState.destination}
          dates={appState.dates}
          onVoiceInput={appLogic.handleVoiceInput}
          onToggleListening={appLogic.handleToggleListening}
          onChatInput={appLogic.handleChatInput}
          onTierSelect={appLogic.handleTierSelect}
          onBookItem={appLogic.handleBookItem}
          onBackToPlanning={appLogic.handleBackToPlanning}
          onEditItem={appLogic.handleEditItem}
          onDeleteItem={appLogic.handleDeleteItem}
          onActiveTabChange={appState.setActiveTab}
          getCurrentBudget={appState.getCurrentBudget}
          apiResponse={undefined}
        />
      </MainLayout>
    </CurrencyProvider>
  );
};
