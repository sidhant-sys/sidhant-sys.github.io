import { useCallback } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';

export const usePricing = () => {
  const { formatPrice, convertPrice, currentCurrency } = useCurrency();

  const formatPriceFromINR = useCallback((inrPrice: number, showCode?: boolean): string => {
    // Convert INR to USD first (assuming input prices are in INR)
    const usdPrice = inrPrice / 83.12; // INR to USD conversion rate
    return formatPrice(usdPrice, showCode);
  }, [formatPrice]);

  const formatPriceFromUSD = useCallback((usdPrice: number, showCode?: boolean): string => {
    return formatPrice(usdPrice, showCode);
  }, [formatPrice]);

  const convertPriceFromINR = useCallback((inrPrice: number): number => {
    // Convert INR to USD first, then to current currency
    const usdPrice = inrPrice / 83.12;
    return convertPrice(usdPrice);
  }, [convertPrice]);

  const convertPriceFromUSD = useCallback((usdPrice: number): number => {
    return convertPrice(usdPrice);
  }, [convertPrice]);

  return {
    formatPriceFromINR,
    formatPriceFromUSD,
    convertPriceFromINR,
    convertPriceFromUSD,
    currentCurrency,
  };
};
