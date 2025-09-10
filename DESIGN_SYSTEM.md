# Hermes Travel Assistant - Professional Design System

## Overview

This document outlines the professional design system implemented for the Hermes Travel Assistant application. The design system ensures consistency, accessibility, and a premium user experience across all components.

## Color Palette

### Primary Colors
- **Primary**: `#2563eb` (Professional Blue)
- **Primary Hover**: `#1d4ed8`
- **Primary Light**: `#dbeafe`
- **Primary Foreground**: `#ffffff`

### Semantic Colors
- **Success**: `#059669` (Green)
- **Warning**: `#d97706` (Orange)  
- **Destructive**: `#dc2626` (Red)
- **Muted**: `#f1f5f9` (Light Gray)
- **Muted Foreground**: `#64748b` (Medium Gray)

### Background Colors
- **Background**: `#fafbfc` (Off-white)
- **Card**: `#ffffff` (Pure white)
- **Secondary**: `#f8fafc` (Very light gray)
- **Border**: `#e2e8f0` (Light border)

## Typography

### Font Hierarchy
- **H1**: 2.25rem (36px) - Bold weight - Hero sections
- **H2**: 1.875rem (30px) - Semibold weight - Section headers
- **H3**: 1.5rem (24px) - Semibold weight - Subsection headers
- **H4**: 1.25rem (20px) - Medium weight - Card titles
- **Body**: 1rem (16px) - Normal weight - Main content
- **Small**: 0.875rem (14px) - Labels and captions
- **Extra Small**: 0.75rem (12px) - Metadata and timestamps

### Font Weights
- **Light**: 300
- **Normal**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

## Spacing System

### Standard Spacing Scale
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)

### Component Spacing
- **Card Padding**: 1.5rem (24px)
- **Button Padding**: 1rem horizontal, 0.5rem vertical
- **Section Spacing**: 2rem (32px) between major sections

## Component Styles

### Buttons
- **Default**: Primary color with subtle shadow
- **Outline**: Border with transparent background
- **Secondary**: Light background with darker text
- **Success**: Green background for completed actions
- **Destructive**: Red background for delete actions
- **Ghost**: Transparent with hover effect

### Cards
- **Background**: Pure white
- **Border**: Light gray border
- **Shadow**: Professional shadow (subtle elevation)
- **Hover**: Enhanced shadow and slight scale
- **Radius**: 0.5rem (8px)

### Form Elements
- **Input Background**: White
- **Input Border**: Light gray
- **Focus State**: Primary color ring
- **Placeholder**: Medium gray text

## Animation & Transitions

### Timing
- **Fast**: 150ms - Hover effects
- **Normal**: 200ms - State changes
- **Slow**: 300ms - Layout changes
- **Complex**: 500ms - Multi-step animations

### Easing
- **Default**: ease-out
- **Bounce**: For playful elements
- **Linear**: For continuous animations

## Shadows

### Shadow Levels
- **sm**: Subtle shadow for cards
- **md**: Medium shadow for elevated elements
- **lg**: Large shadow for modals and overlays
- **xl**: Extra large shadow for floating elements

## Layout Principles

### Grid System
- **Max Width**: 1280px (7xl container)
- **Responsive Breakpoints**: sm, md, lg, xl
- **Grid Gaps**: 1.5rem (24px) default

### Spacing Consistency
- Use the spacing scale consistently
- Maintain visual rhythm with consistent line heights
- Align elements to an 8px baseline grid

## Accessibility

### Color Contrast
- All text meets WCAG AA standards
- Focus states are clearly visible
- Error states use both color and text

### Interactive Elements
- Minimum 44px touch targets
- Clear focus indicators
- Proper ARIA labels

## Component Guidelines

### Loading States
- Professional Figma-style animations
- Progress indicators with percentage
- Step-by-step loading feedback
- Subtle background patterns

### Empty States
- Helpful illustrations or icons
- Clear messaging
- Actionable next steps
- Consistent spacing

### Error States
- Clear error messages
- Suggested solutions
- Non-blocking error handling
- Consistent error styling

## Usage Examples

### Professional Card Component
```tsx
<Card className="shadow-professional hover:shadow-professional-lg transition-all duration-300">
  <CardHeader className="pb-4">
    <CardTitle className="text-xl font-semibold">Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### Professional Button
```tsx
<Button 
  variant="default" 
  size="lg" 
  className="shadow-professional hover:shadow-professional-lg"
>
  Action
</Button>
```

## Implementation Notes

1. **CSS Custom Properties**: All colors and measurements use CSS custom properties for easy theming
2. **Tailwind Integration**: Design tokens are integrated with Tailwind CSS utility classes
3. **Component Consistency**: All components follow the same design patterns
4. **Responsive Design**: All components are mobile-first and responsive
5. **Dark Mode Ready**: Color system supports dark mode variants

## Maintenance

- Update this document when making design system changes
- Test all components after making global changes
- Ensure new components follow established patterns
- Regular accessibility audits
- Performance monitoring for animations

---

This design system ensures a professional, consistent, and accessible user experience across the entire Hermes Travel Assistant application.
