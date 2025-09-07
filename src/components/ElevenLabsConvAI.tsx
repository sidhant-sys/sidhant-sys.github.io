import React, { useState, useEffect } from 'react';
import { Mic } from 'lucide-react';
import { Button } from './ui/button';

interface ElevenLabsConvAIProps {
  onVoiceInput: (text: string) => void;
  isListening: boolean;
  onToggleListening: () => void;
}

export const ElevenLabsConvAI: React.FC<ElevenLabsConvAIProps> = ({
  onVoiceInput,
  isListening,
  onToggleListening
}) => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Load ElevenLabs ConvAI widget script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.head.appendChild(script);

    // Add global ElevenLabs widget to body
    const globalWidget = document.createElement('elevenlabs-convai');
    globalWidget.setAttribute('agent-id', 'agent_2901k4f0hzs4fg3t25wevecgpdgc');
    globalWidget.style.display = 'none';
    document.body.appendChild(globalWidget);

    // Add CSS to position ElevenLabs popup
    const style = document.createElement('style');
    style.textContent = `
      /* Position the ElevenLabs popup */
      elevenlabs-convai iframe {
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        width: 400px !important;
        height: 600px !important;
        z-index: 1001 !important;
        border: 1px solid #e5e7eb !important;
        border-radius: 12px !important;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingScript = document.querySelector('script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
      const existingStyle = document.querySelector('style');
      if (existingStyle && existingStyle.textContent?.includes('elevenlabs-convai')) {
        document.head.removeChild(existingStyle);
      }
      const existingWidget = document.querySelector('elevenlabs-convai');
      if (existingWidget) {
        document.body.removeChild(existingWidget);
      }
    };
  }, []);

  // Handle messages from the ConvAI widget
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'convai-message') {
        const message = event.data.message;
        if (message && typeof message === 'string') {
          onVoiceInput(message);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onVoiceInput]);

  // Function to close ElevenLabs widget
  const closeElevenLabsWidget = () => {
    const existingWidget = document.querySelector('elevenlabs-convai');
    if (existingWidget) {
      existingWidget.remove();
      setIsWidgetOpen(false);
      console.log('ElevenLabs widget closed');
    }
  };

  // Expose the close function globally so other components can use it
  useEffect(() => {
    (window as any).closeElevenLabsWidget = closeElevenLabsWidget;
    return () => {
      delete (window as any).closeElevenLabsWidget;
    };
  }, []);

  const handleToggleListening = () => {
    // Create and trigger ElevenLabs widget
    const createAndTriggerWidget = () => {
      // Remove any existing widget
      const existingWidget = document.querySelector('elevenlabs-convai');
      if (existingWidget) {
        existingWidget.remove();
      }

      // Create new widget
      const widget = document.createElement('elevenlabs-convai');
      widget.setAttribute('agent-id', 'agent_2901k4f0hzs4fg3t25wevecgpdgc');
      document.body.appendChild(widget);

      // Trigger the widget after a short delay
      setTimeout(() => {
        const clickEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        widget.dispatchEvent(clickEvent);
        setIsWidgetOpen(true);
      }, 100);
    };

    createAndTriggerWidget();
    onToggleListening();
  };

  const simulateVoiceResponse = () => {
    setIsPlaying(true);
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-8">
      <div className="text-center space-y-2">
        <h2 className="text-xl">Talk to plan your perfect trip</h2>
        <p className="text-muted-foreground">
          {isWidgetOpen ? "Chat popup is open! Look for the ElevenLabs chat window to start your conversation" : "Click the microphone to open the AI chat popup"}
        </p>
      </div>

      {/* Voice Visualizer */}
      <div className="relative">
        <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
          isWidgetOpen 
            ? "bg-green-100 border-2 border-green-400" 
            : "bg-muted hover:bg-muted/80"
        }`}>
          <Button
            size="lg"
            variant="outline"
            className={`w-20 h-20 rounded-full ${
              isWidgetOpen 
                ? "border-green-400 bg-green-50" 
                : ""
            }`}
            onClick={handleToggleListening}
          >
            <Mic className={`w-8 h-8 ${isWidgetOpen ? "text-green-600" : ""}`} />
          </Button>
        </div>
      </div>

      {/* ElevenLabs Integration Info */}
      <div className="text-xs text-muted-foreground text-center max-w-md">
        {isWidgetOpen ? (
          <>
            <p className="text-green-600 font-medium">✅ Chat popup is active</p>
            <p className="mt-1">Speak naturally to plan your perfect trip</p>
          </>
        ) : (
          <>
            <p>🎙️ Powered by ElevenLabs Voice AI</p>
            <p className="mt-1">Natural conversation for effortless trip planning</p>
          </>
        )}
      </div>

      {/* Quick Voice Prompts */}
      {/* <div className="flex flex-wrap gap-2 justify-center max-w-md">
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
            className="text-xs"
      >
            "{prompt}"
          </Button>
        ))}
      </div> */}
    </div>
  );
};
