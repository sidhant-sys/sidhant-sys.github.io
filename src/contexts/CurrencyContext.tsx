import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Exchange rate relative to USD
}

export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.0 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.85 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.73 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.12 },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', rate: 35.50 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 149.50 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.35 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.52 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rate: 1.34 },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', rate: 0.88 },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', rate: 7.24 }
];

interface CurrencyContextType {
  currentCurrency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (usdPrice: number) => number;
  formatPrice: (usdPrice: number, showCode?: boolean) => string;
  getSupportedCurrencies: () => Currency[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(SUPPORTED_CURRENCIES[0]); // Default to USD

  const setCurrency = useCallback((currency: Currency) => {
    setCurrentCurrency(currency);
    // Store in localStorage for persistence
    localStorage.setItem('selectedCurrency', JSON.stringify(currency));
  }, []);

  const convertPrice = useCallback((usdPrice: number): number => {
    return usdPrice * currentCurrency.rate;
  }, [currentCurrency.rate]);

  const formatPrice = useCallback((usdPrice: number, showCode: boolean = false): string => {
    const convertedPrice = convertPrice(usdPrice);
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currentCurrency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(convertedPrice);

    if (showCode && currentCurrency.code !== 'USD') {
      return `${formatted} ${currentCurrency.code}`;
    }
    return formatted;
  }, [currentCurrency, convertPrice]);

  const getSupportedCurrencies = useCallback(() => {
    return SUPPORTED_CURRENCIES;
  }, []);

  // Load saved currency from localStorage on mount
  React.useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      try {
        const currency = JSON.parse(savedCurrency);
        const validCurrency = SUPPORTED_CURRENCIES.find(c => c.code === currency.code);
        if (validCurrency) {
          setCurrentCurrency(validCurrency);
        }
      } catch (error) {
        // Silently fail and use default currency
      }
    }
  }, []);

  const value: CurrencyContextType = {
    currentCurrency,
    setCurrency,
    convertPrice,
    formatPrice,
    getSupportedCurrencies,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
