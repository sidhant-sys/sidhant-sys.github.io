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
    <div className="min-h-screen bg-background flex flex-col">
      <HeroSection />
      
      <ProgressIndicator 
        currentStep={currentStep}
        itineraryLength={itineraryLength}
        layoutMode={layoutMode}
      />
      
      <main className="flex-1 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};
