import { useState, useEffect } from 'react';

interface UseTypingAnimationOptions {
  text: string;
  speed?: number; // milliseconds per character
  delay?: number; // delay before starting
  onComplete?: () => void;
}

export const useTypingAnimation = ({
  text,
  speed = 50,
  delay = 0,
  onComplete
}: UseTypingAnimationOptions) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;

    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const startTyping = () => {
      setIsTyping(true);
      setIsComplete(false);
      setDisplayedText('');

      const typeNextCharacter = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeoutId = setTimeout(typeNextCharacter, speed);
        } else {
          setIsTyping(false);
          setIsComplete(true);
          onComplete?.();
        }
      };

      timeoutId = setTimeout(typeNextCharacter, speed);
    };

    const delayedStart = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(delayedStart);
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay, onComplete]);

  return {
    displayedText,
    isTyping,
    isComplete
  };
};
