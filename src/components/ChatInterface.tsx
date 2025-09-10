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
    <div className="flex flex-col h-full max-h-96 border rounded-lg shadow-professional bg-card">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/50">
        <div className="flex items-center space-x-3">
          <div className="p-1.5 bg-primary/10 rounded-full">
            <MessageCircle className="w-4 h-4 text-primary" />
          </div>
          <div>
            <span className="text-sm font-medium">Chat Assistant</span>
            <p className="text-xs text-muted-foreground">
              Alternative to voice input
            </p>
          </div>
        </div>
        <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
              <div className="p-3 bg-muted/30 rounded-full w-fit mx-auto mb-4">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="font-medium mb-2">Start a conversation</h3>
              <p className="text-sm">Type your travel plans here to get started</p>
              <p className="text-xs mt-2 opacity-75">Or use voice input above for better experience</p>
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
                className={`max-w-[85%] rounded-lg p-3 shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground ml-4'
                    : 'bg-muted text-muted-foreground mr-4'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <div className="text-xs opacity-70 mt-2 font-medium">
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
              <div className="bg-muted rounded-lg p-3 mr-4 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t bg-muted/20">
        <div className="flex space-x-3">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your travel plans here..."
            disabled={isTyping}
            className="flex-1 bg-background"
          />
          <Button
            onClick={handleSend}
            disabled={!inputText.trim() || isTyping}
            size="default"
            className="px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 flex items-center">
          <span>Press Enter to send</span>
          <span className="mx-2">•</span>
          <span>Voice input available above</span>
        </p>
      </div>
    </div>
  );
};