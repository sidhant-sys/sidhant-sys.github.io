import { useRef } from 'react';

interface FixedElement {
  id: string;
  height: number;
  zIndex: number;
  isVisible: boolean;
}

export const useStackedFixed = () => {
  // Use only ref to avoid any state-based re-renders
  const elementsRef = useRef<FixedElement[]>([]);

  const registerFixedElement = (id: string, height: number, zIndex: number = 50) => {
    const elements = elementsRef.current;
    const existingIndex = elements.findIndex(el => el.id === id);
    
    if (existingIndex !== -1) {
      // Update existing element only if values changed
      const existing = elements[existingIndex];
      if (existing.height !== height || existing.zIndex !== zIndex || !existing.isVisible) {
        elements[existingIndex] = { id, height, zIndex, isVisible: true };
        // Re-sort by zIndex
        elementsRef.current = [...elements].sort((a, b) => b.zIndex - a.zIndex);
      }
    } else {
      // Add new element
      elements.push({ id, height, zIndex, isVisible: true });
      // Re-sort by zIndex
      elementsRef.current = [...elements].sort((a, b) => b.zIndex - a.zIndex);
    }
  };

  const unregisterFixedElement = (id: string) => {
    const elements = elementsRef.current;
    const existingIndex = elements.findIndex(el => el.id === id);
    
    if (existingIndex !== -1) {
      elements[existingIndex] = { ...elements[existingIndex], isVisible: false };
      elementsRef.current = [...elements];
    }
  };

  const getTopPosition = (id: string): number => {
    const elements = elementsRef.current;
    const element = elements.find(el => el.id === id);
    if (!element) return 0;

    // Calculate cumulative height of all visible elements with higher z-index
    const elementsAbove = elements
      .filter(el => el.isVisible && el.zIndex > element.zIndex)
      .sort((a, b) => b.zIndex - a.zIndex);
    
    return elementsAbove.reduce((sum, el) => sum + el.height, 0);
  };

  const getTotalFixedHeight = (): number => {
    return elementsRef.current
      .filter(el => el.isVisible)
      .reduce((sum, el) => sum + el.height, 0);
  };

  const getContentPadding = (): number => {
    return elementsRef.current
      .filter(el => el.isVisible)
      .reduce((sum, el) => sum + el.height, 0);
  };

  return {
    registerFixedElement,
    unregisterFixedElement,
    getTopPosition,
    getTotalFixedHeight,
    getContentPadding,
    fixedElements: elementsRef.current.filter(el => el.isVisible)
  };
};
