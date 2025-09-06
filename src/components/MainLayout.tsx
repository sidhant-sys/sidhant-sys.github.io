import React from 'react';
import { HeroSection } from './HeroSection';
import { ProgressIndicator } from './ProgressIndicator';
import { Footer } from './Footer';
import { StepType, LayoutMode } from '../types';

interface MainLayoutProps {
  currentStep: StepType;
  itineraryLength: number;
  layoutMode: LayoutMode;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  currentStep,
  itineraryLength,
  layoutMode,
  children
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <HeroSection />
      
      <ProgressIndicator 
        currentStep={currentStep}
        itineraryLength={itineraryLength}
        layoutMode={layoutMode}
      />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};
