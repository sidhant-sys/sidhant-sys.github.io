import { useState, useEffect, useCallback } from 'react';

interface FixedElement {
  id: string;
  height: number;
  zIndex: number;
  isVisible: boolean;
}

export const useStackedFixed = () => {
  const [fixedElements, setFixedElements] = useState<FixedElement[]>([]);

  const registerFixedElement = useCallback((id: string, height: number, zIndex: number = 50) => {
    setFixedElements(prev => {
      const exists = prev.find(el => el.id === id);
      if (exists) {
        return prev.map(el => 
          el.id === id 
            ? { ...el, height, zIndex, isVisible: true }
            : el
        );
      }
      return [...prev, { id, height, zIndex, isVisible: true }].sort((a, b) => b.zIndex - a.zIndex);
    });
  }, []);

  const unregisterFixedElement = useCallback((id: string) => {
    setFixedElements(prev => 
      prev.map(el => 
        el.id === id 
          ? { ...el, isVisible: false }
          : el
      )
    );
  }, []);

  const getTopPosition = useCallback((id: string): number => {
    const element = fixedElements.find(el => el.id === id);
    if (!element) return 0;

    // Calculate cumulative height of all visible elements with higher z-index
    // Sort by z-index to ensure proper stacking order
    const elementsAbove = fixedElements
      .filter(el => el.isVisible && el.zIndex > element.zIndex)
      .sort((a, b) => b.zIndex - a.zIndex);
    
    return elementsAbove.reduce((sum, el) => sum + el.height, 0);
  }, [fixedElements]);

  const getTotalFixedHeight = useCallback((): number => {
    return fixedElements
      .filter(el => el.isVisible)
      .reduce((sum, el) => sum + el.height, 0);
  }, [fixedElements]);

  const getContentPadding = useCallback((): number => {
    return getTotalFixedHeight();
  }, [getTotalFixedHeight]);

  return {
    registerFixedElement,
    unregisterFixedElement,
    getTopPosition,
    getTotalFixedHeight,
    getContentPadding,
    fixedElements: fixedElements.filter(el => el.isVisible)
  };
};
