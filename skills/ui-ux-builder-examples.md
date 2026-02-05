# UI/UX Builder Skill - Practical Examples

## Example 1: Design System Creation for E-commerce Platform

### Scenario
Create a design system for a modern e-commerce platform targeting young professionals.

### Step-by-Step Process

#### 1. Brand Analysis
```
Input: "Create a design system for ModernShop, an e-commerce platform targeting 25-40 year olds who value sustainability and quality."
```

**Skill Response:**
- Analyze brand personality (sustainable, premium, modern)
- Identify target audience preferences (clean, intuitive, trustworthy)
- Define core values translation to visual design (natural colors, quality materials, simplicity)

#### 2. Color Palette Definition
```
Input: "Define a color palette that reflects sustainability and premium quality."
```

**Skill Response:**
```css
/* Primary Colors */
--color-primary-50: #f0f7ee;
--color-primary-100: #d5e7d1;
--color-primary-200: #b0d4ac;
--color-primary-300: #85bf82;
--color-primary-400: #5aa958;
--color-primary-500: #3a8f3a; /* Main brand green */
--color-primary-600: #2a7a2a;
--color-primary-700: #1f651f;
--color-primary-800: #175017;
--color-primary-900: #113d11;

/* Neutral Colors */
--color-neutral-50: #fafafa;
--color-neutral-100: #f5f5f5;
--color-neutral-200: #e5e5e5;
--color-neutral-300: #d4d4d4;
--color-neutral-400: #a3a3a3;
--color-neutral-500: #737373;
--color-neutral-600: #525252;
--color-neutral-700: #404040;
--color-neutral-800: #262626;
--color-neutral-900: #171717;

/* Status Colors */
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: #3b82f6;
```

#### 3. Typography Scale
```
Input: "Establish a typography scale for the e-commerce platform."
```

**Skill Response:**
```css
/* Typography Scale */
--font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
--font-size-5xl: 3rem;      /* 48px */
--font-size-6xl: 3.75rem;   /* 60px */

--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

#### 4. Spacing Scale
```
Input: "Create a spacing scale following 8-point grid system."
```

**Skill Response:**
```css
/* Spacing Scale (8pt Grid) */
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-7: 1.75rem;   /* 28px */
--spacing-8: 2rem;      /* 32px */
--spacing-9: 2.25rem;   /* 36px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
--spacing-24: 6rem;     /* 96px */
--spacing-32: 8rem;     /* 128px */
```

## Example 2: Component Development - Product Card

### Scenario
Create a responsive product card component with multiple states.

### Step-by-Step Process

#### 1. Component Specification
```
Input: "Create a product card component for an e-commerce platform with states for regular, on-sale, out-of-stock, and featured."
```

**Skill Response:**
```
Product Card Component Specification:

Anatomy:
- Image container (aspect ratio 1:1)
- Product title (heading level 3)
- Price information (current and original)
- Rating display (stars)
- Quick action buttons (add to cart, wishlist)

States:
- Default: Standard product display
- On Sale: Discount badge, strikethrough original price
- Out of Stock: Overlay, disabled CTAs
- Featured: Enhanced styling, priority placement

Props:
- imageUrl: string (required)
- title: string (required)
- price: number (required)
- originalPrice?: number (optional)
- rating?: number (optional, 0-5)
- isOnSale?: boolean (default: false)
- isOutOfStock?: boolean (default: false)
- isFeatured?: boolean (default: false)
- onAddToCart: function (required)
- onAddToWishlist: function (required)
```

#### 2. React Implementation
```
Input: "Provide React implementation with TypeScript."
```

**Skill Response:**
```jsx
import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

interface ProductCardProps {
  imageUrl: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  isOnSale?: boolean;
  isOutOfStock?: boolean;
  isFeatured?: boolean;
  onAddToCart: () => void;
  onAddToWishlist: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  price,
  originalPrice,
  rating = 0,
  isOnSale = false,
  isOutOfStock = false,
  isFeatured = false,
  onAddToCart,
  onAddToWishlist
}) => {
  const showOriginalPrice = isOnSale && originalPrice;
  
  return (
    <div className={`
      bg-white rounded-lg shadow-sm border overflow-hidden 
      transition-all duration-200 hover:shadow-md
      ${isFeatured ? 'ring-2 ring-green-500' : ''}
      ${isOutOfStock ? 'opacity-60' : ''}
    `}>
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        
        {/* Badges */}
        {isOnSale && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            SALE
          </span>
        )}
        {isFeatured && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
            FEATURED
          </span>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-white text-gray-800 px-3 py-1 rounded font-semibold">
              OUT OF STOCK
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{title}</h3>
        
        {/* Pricing */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-gray-900">${price.toFixed(2)}</span>
          {showOriginalPrice && (
            <span className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <StarIcon 
              key={i} 
              className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onAddToCart}
            disabled={isOutOfStock}
            className={`
              flex-1 py-2 px-3 rounded-md text-sm font-medium
              ${isOutOfStock 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'}
            `}
            aria-label={isOutOfStock ? "Out of stock" : "Add to cart"}
          >
            Add to Cart
          </button>
          <button
            onClick={onAddToWishlist}
            disabled={isOutOfStock}
            className={`
              p-2 rounded-md
              ${isOutOfStock 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-400 hover:text-red-500'}
            `}
            aria-label="Add to wishlist"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
```

## Example 3: Responsive Layout - Dashboard

### Scenario
Create a responsive dashboard layout for admin panel.

### Step-by-Step Process

#### 1. Information Architecture
```
Input: "Design a dashboard layout with sidebar navigation, header, and main content areas for an admin panel."
```

**Skill Response:**
```
Dashboard Layout Specification:

Structure:
- Header: Logo, user profile, notifications, search
- Sidebar: Navigation menu, collapsible
- Main Content: Multiple widgets, charts, tables
- Footer: Copyright, quick links (optional)

Responsive Behavior:
- Desktop: Full sidebar visible, content area to the right
- Tablet: Collapsible sidebar, content takes full width when collapsed
- Mobile: Header only, sidebar becomes overlay menu

Grid System:
- Desktop: 12-column grid with main content spanning 10 columns
- Tablet: Single column layout
- Mobile: Single column with stacked elements
```

#### 2. CSS Implementation
```
Input: "Provide CSS Grid implementation with responsive breakpoints."
```

**Skill Response:**
```css
/* Dashboard Layout Styles */
.dashboard-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  min-height: 100vh;
  gap: 0;
}

.dashboard-header {
  grid-area: header;
  background-color: var(--color-neutral-50);
  border-bottom: 1px solid var(--color-neutral-200);
  padding: 0 var(--spacing-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dashboard-sidebar {
  grid-area: sidebar;
  background-color: white;
  border-right: 1px solid var(--color-neutral-200);
  overflow-y: auto;
}

.dashboard-main {
  grid-area: main;
  padding: var(--spacing-6);
  overflow-y: auto;
  background-color: var(--color-neutral-100);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .dashboard-layout {
    grid-template-columns: 70px 1fr;
  }
  
  .sidebar-expanded .dashboard-layout {
    grid-template-columns: 250px 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-layout {
    grid-template-columns: 1fr;
    grid-template-rows: 60px 1fr;
    grid-template-areas:
      "header"
      "main";
  }
  
  .dashboard-sidebar {
    position: fixed;
    top: 60px;
    left: -250px;
    height: calc(100vh - 60px);
    z-index: 100;
    transition: left 0.3s ease;
  }
  
  .sidebar-open .dashboard-sidebar {
    left: 0;
  }
}

/* Collapsed sidebar styles */
.sidebar-collapsed .sidebar-menu-text,
.sidebar-collapsed .sidebar-logo-text {
  display: none;
}

.sidebar-collapsed .dashboard-layout {
  grid-template-columns: 70px 1fr;
}
```

## Example 4: Accessibility Audit

### Scenario
Audit a login form for accessibility compliance.

### Step-by-Step Process

#### 1. Form Analysis
```
Input: "Audit this login form for accessibility compliance and suggest improvements."
```

**Sample Form:**
```html
<form class="login-form">
  <input type="text" placeholder="Username">
  <input type="password" placeholder="Password">
  <button>Login</button>
</form>
```

**Skill Response:**
```
Accessibility Audit Results:

ISSUES IDENTIFIED:

1. Missing Labels:
   - Username and password fields lack associated labels
   - Screen readers cannot identify field purposes

2. Low Color Contrast:
   - Placeholder text may not meet 4.5:1 contrast ratio
   - Button may lack sufficient contrast

3. Missing ARIA Attributes:
   - No role or state information for dynamic content
   - No error messaging mechanism

4. Keyboard Navigation:
   - No skip link for screen reader users
   - Focus indicators may be insufficient

RECOMMENDED FIXES:

1. Add proper labels:
```html
<form class="login-form">
  <label for="username">Username</label>
  <input type="text" id="username" name="username" required>
  
  <label for="password">Password</label>
  <input type="password" id="password" name="password" required>
  
  <button type="submit">Login</button>
</form>
```

2. Enhance with ARIA attributes:
```html
<form class="login-form" novalidate>
  <div class="form-group">
    <label for="username">Username</label>
    <input 
      type="text" 
      id="username" 
      name="username" 
      required 
      aria-describedby="username-error"
    >
    <div id="username-error" class="error-message" role="alert" hidden></div>
  </div>
  
  <div class="form-group">
    <label for="password">Password</label>
    <input 
      type="password" 
      id="password" 
      name="password" 
      required 
      aria-describedby="password-error"
    >
    <div id="password-error" class="error-message" role="alert" hidden></div>
  </div>
  
  <button type="submit">Login</button>
</form>
```

3. Add focus management and error handling:
```javascript
// Example error handling
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorDiv = document.getElementById(`${fieldId}-error`);
  
  field.setAttribute('aria-invalid', 'true');
  errorDiv.textContent = message;
  errorDiv.hidden = false;
  
  // Focus on the field with error
  field.focus();
}
```

COMPLIANCE STATUS: 
- Before: WCAG Level A (basic compliance)
- After: WCAG Level AA (full compliance)
```

These examples demonstrate the practical application of the UI/UX Builder skill across different scenarios, showing how it guides users through comprehensive design and development processes while maintaining high quality standards.