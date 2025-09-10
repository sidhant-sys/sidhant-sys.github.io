import React, { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useCurrency, Currency } from '../contexts/CurrencyContext';

interface CurrencyDropdownProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showFullName?: boolean;
}

export const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  className = '',
  size = 'md',
  showIcon = true,
  showFullName = false
}) => {
  const { currentCurrency, setCurrency, getSupportedCurrencies } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const supportedCurrencies = getSupportedCurrencies();

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-3'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const handleCurrencySelect = (currency: Currency) => {
    setCurrency(currency);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          inline-flex items-center justify-between gap-2 
          ${sizeClasses[size]} 
          border border-border rounded-md 
          bg-background hover:bg-muted/50 
          text-foreground font-medium 
          transition-all duration-200 
          focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
          min-w-[80px]
        `}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-2">
          {showIcon && (
            <Globe className={`${iconSizes[size]} text-muted-foreground`} strokeWidth={1.5} />
          )}
          <span className="font-mono">
            {showFullName ? currentCurrency.name : currentCurrency.code}
          </span>
          <span className="text-muted-foreground">
            {currentCurrency.symbol}
          </span>
        </div>
        <ChevronDown 
          className={`${iconSizes[size]} text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
          strokeWidth={1.5} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-background border border-border rounded-md shadow-lg max-h-64 overflow-auto">
            <div className="py-1">
              {supportedCurrencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => handleCurrencySelect(currency)}
                  className={`
                    w-full px-3 py-2 text-left text-sm 
                    hover:bg-muted/50 transition-colors duration-150
                    flex items-center justify-between
                    ${currentCurrency.code === currency.code 
                      ? 'bg-muted text-foreground font-medium' 
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                  role="option"
                  aria-selected={currentCurrency.code === currency.code}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-medium min-w-[3rem]">
                      {currency.symbol}
                    </span>
                    <span className="text-xs">
                      {currency.name}
                    </span>
                  </div>
                  {/* <span className="font-mono text-sm">
                    {currency.symbol}
                  </span> */}
                </button>
              ))}
            </div>
            
            {/* Footer */}
            <div className="border-t border-border px-3 py-2">
              <p className="text-xs text-muted-foreground">
                Rates are approximate and for display purposes
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
