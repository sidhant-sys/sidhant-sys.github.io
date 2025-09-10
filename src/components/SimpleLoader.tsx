import React, { useState, useEffect } from 'react';
import { Navigation, MapPin, Calendar, Users, CheckCircle2 } from 'lucide-react';

interface SimpleLoaderProps {
  isVisible: boolean;
  onComplete?: () => void;
  minDuration?: number; // Minimum duration in milliseconds
}

const LoadingStep: React.FC<{
  step: string;
  isActive: boolean;
  isCompleted: boolean;
}> = ({ step, isActive, isCompleted }) => (
  <div className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-300 ${
    isActive 
      ? 'border border-foreground/30' 
      : isCompleted 
        ? 'border border-foreground/20' 
        : 'border border-border'
  }`}>
    <div className={`flex-shrink-0 w-5 h-5 rounded-full border transition-all duration-300 flex items-center justify-center ${
      isCompleted 
        ? 'border-foreground bg-foreground' 
        : isActive 
          ? 'border-foreground animate-pulse' 
          : 'border-muted-foreground'
    }`}>
      {isCompleted ? (
        <CheckCircle2 className="w-3 h-3 text-background" strokeWidth={2} />
      ) : (
        <div className={`w-2 h-2 rounded-full ${
          isActive ? 'bg-foreground animate-ping' : 'bg-muted-foreground'
        }`} />
      )}
    </div>
    <span className={`text-sm font-medium transition-colors duration-300 ${
      isCompleted 
        ? 'text-foreground' 
        : isActive 
          ? 'text-foreground' 
          : 'text-muted-foreground'
    }`}>
      {step}
    </span>
  </div>
);

export const SimpleLoader: React.FC<SimpleLoaderProps> = ({ 
  isVisible, 
  onComplete,
  minDuration = 5000 
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  
  const steps = [
    "Analyzing your preferences",
    "Finding best destinations", 
    "Calculating optimal routes",
    "Comparing prices & deals",
    "Finalizing your itinerary"
  ];

  // Show/hide loader based on isVisible prop
  useEffect(() => {
    if (isVisible && !showLoader) {
      setShowLoader(true);
      setStartTime(Date.now());
      setProgress(0);
      setCurrentStep(0);
      setIsCompleting(false);
    } else if (!isVisible && showLoader && startTime) {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDuration - elapsed);
      
      setIsCompleting(true);
      
      // Complete progress to 100% during the remaining time
      setTimeout(() => {
        setProgress(100);
      }, Math.max(0, remaining - 500)); // Complete 500ms before hiding
      
      setTimeout(() => {
        setShowLoader(false);
        setStartTime(null);
        setIsCompleting(false);
        if (onComplete) {
          onComplete();
        }
      }, remaining);
    }
  }, [isVisible, showLoader, startTime, minDuration, onComplete]);

  // Progress animation
  useEffect(() => {
    if (!showLoader) return;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        // If we're completing, don't update progress here (let the completion logic handle it)
        if (isCompleting) return prev;
        
        // Cap at 99% until completion sequence starts
        if (prev >= 99) return 99;
        
        // Slower, more realistic progress increments
        const increment = Math.random() * 1 + 0.3; // 0.3 to 1.3% per interval
        return Math.min(prev + increment, 99);
      });
    }, 300); // Slower interval: 300ms instead of 150ms

    return () => clearInterval(progressInterval);
  }, [showLoader, isCompleting]);

  // Step progression
  useEffect(() => {
    if (!showLoader) return;

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) return steps.length - 1;
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(stepInterval);
  }, [showLoader, steps.length]);

  if (!showLoader) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-background"
      style={{ 
        zIndex: 2147483647
      }}
    >
      {/* Minimal Professional Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/5 via-transparent to-muted/10" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="max-w-md mx-auto text-center">
          
          {/* Professional Loading Animation */}
          <div className="relative mb-8">
            <div className="relative w-20 h-20 mx-auto">
              {/* Outer Ring - Outline Only */}
              <div className="absolute inset-0 rounded-full border-2 border-border" />
              <div 
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-foreground"
                style={{ animation: 'spin 2s linear infinite' }}
              />
              
              {/* Inner Ring - Outline Only */}
              <div className="absolute inset-4 rounded-full border border-muted-foreground/30" />
              <div 
                className="absolute inset-4 rounded-full border border-transparent border-b-foreground/60"
                style={{ animation: 'spin 1.5s linear infinite reverse' }}
              />
              
              {/* Center Icon - Professional Navigation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Navigation className="w-6 h-6 text-foreground" strokeWidth={1.5} />
              </div>
            </div>

            {/* Minimal Floating Icons */}
            {/* <div className="absolute inset-0 pointer-events-none">
              <MapPin className="absolute -top-2 -left-6 w-3 h-3 text-muted-foreground animate-bounce" strokeWidth={1.5} style={{ animationDelay: '0s', animationDuration: '2s' }} />
              <Calendar className="absolute -top-4 -right-4 w-3 h-3 text-muted-foreground animate-bounce" strokeWidth={1.5} style={{ animationDelay: '0.5s', animationDuration: '2s' }} />
              <Users className="absolute -bottom-2 -left-4 w-3 h-3 text-muted-foreground animate-bounce" strokeWidth={1.5} style={{ animationDelay: '1s', animationDuration: '2s' }} />
            </div> */}
          </div>

          {/* Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Crafting Your Journey
            </h1>
            <p className="text-muted-foreground">
              Creating the perfect itinerary for your travel preferences
            </p>
          </div>

          {/* Progress Steps */}
          <div className="space-y-3 mb-6">
            {steps.map((step, index) => (
              <LoadingStep
                key={index}
                step={step}
                isActive={index === currentStep}
                isCompleted={index < currentStep}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{isCompleting ? 'Finalizing' : 'Processing'}</span>
              <span className="font-medium">{Math.round(Math.min(progress, 100))}%</span>
            </div>
            <div className="w-full h-1.5 border border-border rounded-full overflow-hidden bg-background">
              <div 
                className={`h-full bg-foreground rounded-full transition-all ease-out ${
                  isCompleting ? 'duration-500' : 'duration-300'
                }`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          {/* Professional Loading Dots */}
          <div className="flex items-center justify-center space-x-1 mt-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 border border-muted-foreground rounded-full animate-pulse"
                style={{ 
                  animationDelay: `${i * 0.2}s`, 
                  animationDuration: '1s' 
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
