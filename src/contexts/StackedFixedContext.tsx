import React, { createContext, useContext } from 'react';
import { useStackedFixed } from '../hooks/useStackedFixed';

interface StackedFixedContextType {
  registerFixedElement: (id: string, height: number, zIndex?: number) => void;
  unregisterFixedElement: (id: string) => void;
  getTopPosition: (id: string) => number;
  getTotalFixedHeight: () => number;
  getContentPadding: () => number;
}

const StackedFixedContext = createContext<StackedFixedContextType | undefined>(undefined);

export const StackedFixedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const stackedFixed = useStackedFixed();

  return (
    <StackedFixedContext.Provider value={stackedFixed}>
      {children}
    </StackedFixedContext.Provider>
  );
};

export const useStackedFixedContext = () => {
  const context = useContext(StackedFixedContext);
  if (context === undefined) {
    throw new Error('useStackedFixedContext must be used within a StackedFixedProvider');
  }
  return context;
};

// Safe version that returns null if context is not available
export const useStackedFixedContextSafe = () => {
  const context = useContext(StackedFixedContext);
  return context || null;
};
