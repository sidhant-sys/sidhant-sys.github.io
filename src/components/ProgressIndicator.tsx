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
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-center space-x-4 py-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step.completed 
                ? 'bg-green-500 text-white' 
                : currentStep === step.id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
            }`}>
              {step.completed ? '✓' : index + 1}
            </div>
            <span className={`ml-2 text-sm ${
              step.completed || currentStep === step.id 
                ? 'text-gray-900 font-medium' 
                : 'text-gray-500'
            }`}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-4 ${
                step.completed ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
