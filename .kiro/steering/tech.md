# Technology Stack

## Framework & Runtime
- **Next.js 14**: React framework with App Router
- **React 18**: UI library with TypeScript support
- **Node.js**: Runtime environment

## Styling & UI
- **Tailwind CSS 3.3**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Custom CSS Components**: Defined in `globals.css`

## Development Tools
- **TypeScript 5**: Type safety and developer experience
- **ESLint**: Code linting with Next.js config
- **PostCSS**: CSS processing with Autoprefixer

## Additional Libraries
- **react-countup**: Animated number counters for metrics
- **Stripe Integration**: Payment processing (via MCP server)

## Build System & Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Key Configuration Files
- `next.config.js`: Next.js configuration
- `tailwind.config.js`: Tailwind CSS customization
- `tsconfig.json`: TypeScript configuration with path aliases
- `package.json`: Dependencies and scripts

## Path Aliases
- `@/*`: Maps to project root for clean imports

## Styling Conventions
- Use Tailwind utility classes primarily
- Custom components defined in `@layer components` in globals.css
- Gaming-themed color palette defined in tailwind.config.js:
  - `primary`: Blue (#3b82f6)
  - `secondary`: Purple (#8b5cf6)
  - `accent`: Pink (#ec4899)
  - `gaming`: Deep purple (#6d28d9)
  - `success`: Green (#10b981)

## Component Patterns
- Use React functional components with TypeScript
- Prefer named exports for components
- Use React.forwardRef for components that need ref forwarding
- Use cn() utility for conditional class names

## MCP Integration
- Stripe payment processing via MCP server
- MCP server implemented in Python
- Client-side integration via lib/stripe-mcp.ts