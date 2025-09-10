import React, { useState } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from './ui/button';

interface VoiceInterfaceProps {
  onVoiceInput: (text: string) => void;
  isListening: boolean;
  onToggleListening: () => void;
}

export const VoiceInterface: React.FC<VoiceInterfaceProps> = ({
  onVoiceInput,
  isListening,
  onToggleListening
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const simulateVoiceResponse = () => {
    setIsPlaying(true);
    // Simulate ElevenLabs voice response
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-8">
      <div className="text-center space-y-2">
        <h2 className="text-xl">Talk to plan your perfect trip</h2>
        <p className="text-muted-foreground">
          Press and hold to speak, or tap to start voice conversation
        </p>
      </div>

      {/* Voice Visualizer */}
      <div className="relative">
        <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
          isListening 
            ? 'bg-primary/20 ring-4 ring-primary/30 ring-offset-4' 
            : 'bg-muted hover:bg-muted/80'
        }`}>
          <Button
            size="lg"
            variant={isListening ? "default" : "outline"}
            className="w-20 h-20 rounded-full cursor-pointer"
            onClick={onToggleListening}
          >
            {isListening ? (
              <MicOff className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </Button>
        </div>
        
        {/* Listening Animation */}
        {isListening && (
          <div className="absolute inset-0 rounded-full">
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping"></div>
            <div className="absolute inset-2 rounded-full bg-primary/5 animate-ping animation-delay-75"></div>
          </div>
        )}
      </div>

      {/* Status Messages */}
      <div className="text-center min-h-[2rem]">
        {isListening && (
          <p className="text-primary animate-pulse">Listening... Speak now</p>
        )}
        {isPlaying && (
          <div className="flex items-center justify-center space-x-2 text-success">
            <Volume2 className="w-4 h-4 animate-pulse" />
            <span>AI is responding...</span>
          </div>
        )}
      </div>

      {/* Mock ElevenLabs Integration Info */}
      <div className="text-xs text-muted-foreground text-center max-w-md">
        <p>🎙️ Powered by ElevenLabs Voice AI</p>
        <p className="mt-1">Natural conversation for effortless trip planning</p>
      </div>

      {/* Quick Voice Prompts */}
      <div className="flex flex-wrap gap-2 justify-center max-w-md">
        {[
          "Plan a weekend in Paris",
          "I want to visit Japan",
          "Beach vacation ideas",
          "Family trip suggestions"
        ].map((prompt) => (
          <Button
            key={prompt}
            variant="outline"
            size="sm"
            onClick={() => {
              onVoiceInput(prompt);
              simulateVoiceResponse();
            }}
            className="cursor-pointer text-xs"
          >
            "{prompt}"
          </Button>
        ))}
      </div>
    </div>
  );
};