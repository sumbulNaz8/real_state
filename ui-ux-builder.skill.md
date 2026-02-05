---
name: ui-ux-builder
description: |
  Create production UI/UX designs with components, design systems, wireframes, and responsive layouts.
  This skill should be used when users ask to build UI components, create design systems,
  develop wireframes, implement responsive layouts, or design accessible interfaces.
---

# UI/UX Builder

Create production UI/UX designs with components, design systems, wireframes, and responsive layouts.

## What This Skill Does
- Generate design tokens and design systems with consistent color palettes, typography, and spacing
- Create reusable UI components with accessibility-first approach
- Develop wireframes and mockups for different screen sizes
- Implement responsive layouts using CSS Grid and Flexbox
- Ensure accessibility compliance (WCAG 2.1 AA standards)
- Create component specifications with states and variants

## What This Skill Does NOT Do
- Design custom illustrations or graphics
- Create animations beyond basic transitions
- Handle backend integration specifics
- Deploy UI to production environments

---

## Before Implementation

Gather context to ensure successful implementation:

| Source | Gather |
|--------|--------|
| **Codebase** | Existing structure, patterns, conventions to integrate with |
| **Conversation** | User's specific requirements, constraints, preferences |
| **Skill References** | Domain patterns from `references/` |
| **User Guidelines** | Project-specific conventions, team standards |

Ensure all required context is gathered before implementing.
Only ask user for THEIR specific requirements (domain expertise is in this skill).

---

## Required Clarifications

Ask about USER'S context (not domain knowledge):

1. **Design System**: "Do you have existing design tokens, colors, or brand guidelines to follow?"
2. **Component Type**: "What specific UI component or layout pattern do you need?"
3. **Framework**: "Are you using React, Vue, vanilla HTML/CSS, or another framework?"
4. **Accessibility**: "Are there specific accessibility requirements beyond WCAG 2.1 AA?"
5. **Responsive**: "What screen sizes or breakpoints need to be supported?"

---

## Functions

### 1. Design Token Generation
- Generate color palette with primary, secondary, neutral, and semantic colors
- Define typography scale with heading and body font sizes
- Create spacing scale with consistent units
- Establish border-radius and shadow scales

### 2. Component Specification
- Define component anatomy with parts and slots
- Specify states (default, hover, focus, active, disabled)
- Create variant patterns (size, color, orientation)
- Document accessibility attributes and keyboard navigation

### 3. Wireframe Creation
- Layout structure with header, navigation, content, and footer areas
- Grid system definition for different screen sizes
- Content hierarchy and visual weight distribution
- Responsive breakpoint planning

### 4. Responsive Layout Implementation
- Mobile-first approach with progressive enhancement
- CSS Grid and Flexbox implementation
- Media query strategy for different screen sizes
- Touch-friendly interaction patterns

### 5. Accessibility Implementation
- Semantic HTML structure
- ARIA attributes for dynamic content
- Keyboard navigation patterns
- Screen reader compatibility

---

## Output Specification

### Design Tokens Format
```json
{
  "colors": {
    "primary": {
      "50": "#eff6ff",
      "100": "#dbeafe",
      // ... up to 900
    },
    "neutral": {
      // ... similar structure
    }
  },
  "spacing": {
    "xs": "0.25rem",
    "sm": "0.5rem",
    // ... up to 2xl
  },
  "typography": {
    "sizes": {
      "heading": {
        "lg": "2.5rem",
        "md": "2rem",
        // ...
      }
    }
  }
}
```

### Component Structure
```
component/
├── ComponentName.tsx          # Main component implementation
├── ComponentName.module.css   # Component-specific styles
├── ComponentName.stories.tsx  # Storybook stories
├── ComponentName.types.ts     # TypeScript interfaces
└── __tests__/                 # Unit tests
    └── ComponentName.test.tsx
```

### Documentation Requirements
- Component README with usage examples
- Props documentation with TypeScript interfaces
- Accessibility compliance notes
- Responsive behavior documentation

---

## Domain Standards

### Must Follow
- [ ] WCAG 2.1 AA compliance for all components
- [ ] Semantic HTML structure
- [ ] Proper ARIA attributes for dynamic content
- [ ] Keyboard navigation support
- [ ] Mobile-first responsive design
- [ ] Cross-browser compatibility (last 2 versions)

### Must Avoid
- [ ] Inline styles (except for dynamic values)
- [ ] Fixed pixel values for spacing and sizing
- [ ] Non-accessible color contrast ratios
- [ ] Mouse-only interaction patterns
- [ ] Heavy JavaScript for simple interactions

---

## Workflow

1. **Gather Requirements** - Collect user's specific needs and constraints
2. **Analyze Design System** - Review existing design tokens and patterns
3. **Create Component Structure** - Define component anatomy and states
4. **Implement Responsiveness** - Apply responsive design patterns
5. **Add Accessibility** - Implement accessibility features
6. **Test Implementation** - Verify functionality and compliance
7. **Document Components** - Create usage documentation

---

## Quality Assurance

### Visual Consistency
- [ ] Consistent spacing using design tokens
- [ ] Consistent typography hierarchy
- [ ] Consistent color usage per design system
- [ ] Consistent interaction patterns

### Performance
- [ ] Minimal CSS bundle size
- [ ] Efficient selectors
- [ ] Optimized image loading
- [ ] Minimal re-renders in React components

### Accessibility
- [ ] Proper heading structure
- [ ] Sufficient color contrast (4.5:1 minimum)
- [ ] Focus indicators visible
- [ ] ARIA labels for non-text content

---

## Output Checklist

Before delivering, verify:
- [ ] Design tokens align with brand guidelines
- [ ] Component meets accessibility standards (WCAG 2.1 AA)
- [ ] Responsive behavior works across all required breakpoints
- [ ] Component has proper TypeScript interfaces
- [ ] Documentation includes usage examples
- [ ] Component has unit tests with >90% coverage
- [ ] Storybook stories cover all states and variants
- [ ] Cross-browser compatibility verified