# Project Structure

## Next.js App Router Structure

```
app/
├── dashboard/             # Dashboard routes
│   ├── brand/            # Brand-specific dashboard
│   │   └── creators/     # Creator management for brands
│   └── creator/          # Creator-specific dashboard
├── creators/             # Creator discovery and profiles
│   └── [id]/             # Individual creator pages
├── login/                # Authentication pages
├── news/                 # News and updates
│   └── [id]/             # Individual news articles
├── globals.css           # Global styles
├── layout.tsx            # Root layout with navigation
└── page.tsx              # Landing page
```

## Component Organization

```
components/
├── analytics/            # Analytics and data visualization
├── campaign/             # Campaign creation and management
├── payment/              # Payment processing components
└── ui/                   # Reusable UI components
```

## Library and Utility Structure

```
lib/
├── stripe-mcp.ts         # Stripe payment integration via MCP
└── utils.ts              # Utility functions
```

## Naming Conventions

- **Pages**: Use `page.tsx` for route components
- **Layouts**: Use `layout.tsx` for layout components
- **Components**: Use PascalCase for component files and folders
- **Utilities**: Use camelCase for utility functions and files

## Component Structure

1. Import statements
2. Type definitions / interfaces
3. Component definition
4. Export statement

## File Organization Patterns

- Group related components in feature-specific folders
- Keep UI components separate from feature components
- Use dynamic routes with parameters in square brackets
- Keep utility functions in the lib directory

## State Management

- Use React's built-in state management (useState, useContext)
- No global state management library is currently used
- Component-level state for UI interactions
- Page-level state for form data and user inputs