import React from 'react';
import { useTypingAnimation } from '../hooks/useTypingAnimation';

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  showCursor?: boolean;
  cursorBlinkSpeed?: number;
}

export const TypingText: React.FC<TypingTextProps> = ({
  text,
  speed = 50,
  delay = 0,
  className = '',
  onComplete,
  showCursor = true,
  cursorBlinkSpeed = 500
}) => {
  const { displayedText, isTyping } = useTypingAnimation({
    text,
    speed,
    delay,
    onComplete
  });

  return (
    <span className={`${className} opacity-0 animate-in fade-in duration-500`}>
      {displayedText}
      {showCursor && (
        <span 
          className="text-blue-600 font-bold inline-block animate-pulse"
          style={{ 
            animationDuration: `${cursorBlinkSpeed}ms`,
            opacity: isTyping ? 1 : 0,
            marginLeft: '2px'
          }}
        >
          |
        </span>
      )}
    </span>
  );
};
