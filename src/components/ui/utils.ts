import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Professional Color Palette Design System
export const professionalColors = {
  // App Blue (Primary Brand Color)
  appBlue: {
    500: 'rgb(59 130 246)', // blue-500 for checkboxes
    600: 'rgb(37 99 235)',  // blue-600 for hover states
  },
  
  // Text Colors
  text: {
    primary: 'text-slate-900',      // Main headings, important text
    secondary: 'text-slate-700',    // Body text, descriptions
    muted: 'text-slate-500',        // Supporting text, labels
    light: 'text-slate-400',        // Subtle text, placeholders
  },
  
  // Semantic Colors (Professional)
  success: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  
  warning: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
  
  // Flat Design Elements
  section: {
    bg: 'bg-white',              // Flat white backgrounds
    border: 'border-gray-200',   // Subtle borders
    shadow: 'shadow-sm',         // Minimal shadows
  },
  
  // Interactive States
  interactive: {
    hover: 'hover:bg-gray-50',
    selected: 'bg-blue-50 border-blue-200',
    border: 'border-gray-200',
    borderHover: 'hover:border-gray-300',
  }
};
