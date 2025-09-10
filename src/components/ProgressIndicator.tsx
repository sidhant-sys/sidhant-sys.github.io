import React from 'react';
import { StepType } from '../types';

interface ProgressIndicatorProps {
  currentStep: StepType;
  itineraryLength: number;
  layoutMode: 'split' | 'full-itinerary';
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  itineraryLength,
  layoutMode
}) => {
  if (currentStep === 'planning' && itineraryLength === 0) return null;
  if (layoutMode === 'full-itinerary') return null;

  const steps = [
    { id: 'planning', label: 'Planning', completed: itineraryLength > 0 },
    { id: 'tier-selection', label: 'Tier Selection', completed: currentStep === 'booking' },
    { id: 'booking', label: 'Booking', completed: false }
  ];

  return (
    <div className="border-b bg-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center space-x-6 py-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300 ${
                  step.completed 
                    ? 'bg-success text-success-foreground border-success shadow-sm' 
                    : currentStep === step.id 
                      ? 'bg-primary text-primary-foreground border-primary shadow-md scale-110' 
                      : 'bg-background text-muted-foreground border-border'
                }`}>
                  {step.completed ? '✓' : index + 1}
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm font-medium transition-colors duration-300 ${
                    step.completed || currentStep === step.id 
                      ? 'text-foreground' 
                      : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </span>
                  {currentStep === step.id && (
                    <span className="text-xs text-primary font-medium">In Progress</span>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-6 rounded-full transition-all duration-500 ${
                  step.completed ? 'bg-success' : 'bg-border'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
