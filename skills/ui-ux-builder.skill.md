# UI/UX Builder Skill

## Overview
A production-grade Builder skill that extends Claude's capabilities for designing user interfaces and experiences. This skill enables users to create UI components, design systems, wireframes, mockups, and implement responsive layouts with professional quality standards.

## Skill Type
**Builder** - Creates new artifacts (UI components, design systems, wireframes, mockups, layouts)

## Purpose
Enable users to design and build professional UI/UX assets with consistent quality, accessibility standards, and modern design principles. This skill provides structured workflows for creating user interfaces that follow best practices and industry standards.

## Capabilities
- Design system creation and maintenance
- Component library development
- Wireframing and prototyping
- Responsive layout implementation
- Accessibility compliance checking
- Visual hierarchy optimization
- Interaction pattern design
- Mobile-first design approaches
- Cross-platform consistency
- Performance optimization for UI

## Target Users
- UI/UX designers seeking structured design workflows
- Frontend developers needing component libraries
- Product managers requiring wireframes/mockups
- Teams establishing design systems
- Anyone creating user interfaces with quality standards

## Prerequisites
- Understanding of basic design principles
- Awareness of target audience/users
- Access to brand guidelines (when applicable)
- Knowledge of target platforms/devices

## Workflow Patterns

### 1. Design System Creation
```
Brand Identity → Design Tokens → Component Specs → Documentation → Implementation
```

### 2. Component Development
```
Requirements → Wireframe → Visual Design → Implementation → Testing → Documentation
```

### 3. Layout Creation
```
Content Strategy → Information Architecture → Wireframe → Visual Design → Responsive Implementation
```

## Core Functions

### Function 1: Design Token Generation
Generate consistent design tokens for colors, typography, spacing, and other design properties.

**Input**: Brand guidelines, style preferences, accessibility requirements
**Output**: Design token JSON/YAML with WCAG compliance
**Validation**: Contrast ratios, scalability, maintainability

### Function 2: Component Specification
Create detailed component specifications with props, variants, and usage guidelines.

**Input**: Component requirements, design system tokens
**Output**: Component specification document with anatomy, states, and behaviors
**Validation**: Accessibility compliance, reusability, consistency

### Function 3: Wireframe Creation
Generate low-fidelity wireframes for user flows and screen layouts.

**Input**: User stories, content requirements, platform constraints
**Output**: Structured wireframes with information architecture
**Validation**: Usability heuristics, user flow optimization

### Function 4: Responsive Layout Implementation
Create responsive layouts that adapt to different screen sizes and devices.

**Input**: Design specifications, breakpoints, device targets
**Output**: Responsive CSS/HTML implementation
**Validation**: Cross-device compatibility, performance metrics

### Function 5: Accessibility Audit
Review designs and implementations for accessibility compliance.

**Input**: Design specifications, code samples, user requirements
**Output**: Accessibility report with recommendations
**Validation**: WCAG 2.1 AA compliance, usability testing results

## Quality Standards

### Visual Design Standards
- Consistent spacing using design tokens (multiples of 4px/8px)
- Typography hierarchy with proper contrast ratios (4.5:1 minimum)
- Color palette with sufficient contrast for accessibility
- Visual balance and alignment principles
- Appropriate white space utilization

### Technical Standards
- Semantic HTML structure
- ARIA attributes for accessibility
- Mobile-first responsive approach
- Progressive enhancement principles
- Performance optimization (critical CSS, lazy loading)

### Usability Standards
- Clear visual hierarchy
- Intuitive navigation patterns
- Consistent interaction behaviors
- Error prevention and recovery
- User feedback mechanisms

## Integration Points
- Design tools (Figma, Sketch, Adobe XD) export specifications
- Component libraries (React, Vue, Angular, Web Components)
- CSS frameworks (Tailwind, Bootstrap, custom)
- Prototyping tools for interactive mockups
- Testing frameworks for accessibility validation

## Output Formats
- Design specification documents
- Component code (React, Vue, HTML/CSS)
- Style guide documentation
- Accessibility audit reports
- Responsive breakpoint specifications
- Interaction design documentation

## Validation Criteria
- WCAG 2.1 AA compliance
- Cross-browser compatibility
- Performance benchmarks (<3s load time)
- Mobile responsiveness (all breakpoints)
- Component reusability score
- Design system consistency

## Common Pitfalls to Avoid
- Inconsistent spacing and typography
- Insufficient color contrast ratios
- Missing focus indicators for keyboard navigation
- Non-responsive layouts
- Overly complex interaction patterns
- Ignoring cultural considerations in design
- Neglecting performance implications

## Best Practices
- Start with mobile-first approach
- Use meaningful color names instead of generic ones
- Implement progressive disclosure for complex interfaces
- Follow platform conventions for native feel
- Design for edge cases and error states
- Consider internationalization from the start
- Document design decisions and rationale

## Troubleshooting
- **Accessibility Issues**: Run automated tools like axe-core, conduct manual testing
- **Responsive Problems**: Test on actual devices, use realistic content
- **Performance Bottlenecks**: Audit bundle size, optimize images, lazy load components
- **Cross-browser Issues**: Use feature detection, graceful degradation
- **Consistency Problems**: Establish clear design system, regular audits

## Success Metrics
- User satisfaction scores
- Task completion rates
- Accessibility compliance scores
- Performance metrics
- Developer adoption rates
- Design system usage analytics

## References
- WCAG 2.1 Guidelines
- Material Design Guidelines
- Apple Human Interface Guidelines
- Nielsen's Usability Heuristics
- Responsive Web Design Principles
- Atomic Design Methodology

## Version Control
- Track design system changes with version numbers
- Document breaking changes in components
- Maintain backward compatibility when possible
- Use semantic versioning for design systems

## Maintenance Guidelines
- Regular accessibility audits
- Performance monitoring
- User feedback integration
- Technology stack updates
- Design system evolution planning

## Advanced Features
- Automated design token generation from Figma
- Component documentation generation
- Visual regression testing setup
- Design system governance workflows
- Multi-brand design system support
- Internationalization patterns
- Dark/light mode implementations