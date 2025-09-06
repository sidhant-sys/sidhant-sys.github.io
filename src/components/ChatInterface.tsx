import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatInterfaceProps {
  onChatInput: (text: string) => void;
  messages: Message[];
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onChatInput,
  messages
}) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (inputText.trim()) {
      onChatInput(inputText.trim());
      setInputText('');
      
      // Simulate AI typing
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full max-h-96 border rounded-lg">
      {/* Chat Header */}
      <div className="flex items-center space-x-2 p-3 border-b bg-muted/30">
        <MessageCircle className="w-4 h-4" />
        <span className="text-sm">Chat Assistant</span>
        <span className="text-xs text-muted-foreground">
          Alternative to voice input
        </span>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-3" ref={scrollAreaRef}>
        <div className="space-y-3">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground text-sm py-8">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Start typing to plan your itinerary</p>
              <p className="text-xs mt-1">Or use voice input above</p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 text-sm ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {message.text}
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3 text-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce animation-delay-150"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce animation-delay-300"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-3 border-t">
        <div className="flex space-x-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your travel plans here..."
            disabled={isTyping}
          />
          <Button
            onClick={handleSend}
            disabled={!inputText.trim() || isTyping}
            size="sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Press Enter to send, or use voice input above for better experience
        </p>
      </div>
    </div>
  );
};