# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands

- **Run development server**: `yarn dev` - Starts Vite dev server with HMR
- **Build production**: `yarn build` - Runs TypeScript compiler and Vite build
- **Lint code**: `yarn lint` - Runs ESLint on all files
- **Preview production build**: `yarn preview` - Preview the production build locally

### Package Management

This project uses Yarn. Install dependencies with `yarn install`.

## Architecture Overview

This is a React + TypeScript + Vite application using Stackflow for navigation and Seed Design System components.

### Key Architectural Decisions

1. **Navigation System**: Uses Stackflow (`@stackflow/react`) for page transitions with a stack-based navigation pattern
   - Configuration in `src/lib/stackflow/index.ts`
   - Routes defined in `src/routes.tsx` with type-safe route parameters
   - Activities are dynamically loaded from routes using React.lazy()
   - History sync with browser navigation enabled

2. **Routing Structure**:
   - Routes are centralized in `src/routes.tsx` using lazy loading
   - Each route maps to a page component in `src/pages/`
   - Current routes: "/" (Main), "/form" (Form)
   - Route paths defined in `src/utils/path.ts` as constants

3. **UI Components & Styling**:
   - Tailwind CSS v4 integrated via Vite plugin
   - Seed Design System components (`@seed-design/react`) with custom components in `src/components/seed-design/`
   - Karrot icon libraries for mono/multicolor icons
   - Stackflow UI theme set to "cupertino"

4. **Path Aliases**:
   - `@/` maps to `./src/` directory (configured in tsconfig.json)
   - Vite uses `vite-tsconfig-paths` plugin to resolve these aliases

5. **TypeScript Configuration**:
   - Uses project references with separate configs for app and node
   - Strict type checking enabled via tsconfig files
   - ESLint configured with TypeScript support and React hooks rules

6. **Build Tools & Plugins**:
   - Vite with React plugin for fast HMR
   - Seed Design Vite plugin for design system integration
   - Tailwind CSS Vite plugin for styling

### Project Structure

- `/src/pages/` - Page components for each route
- `/src/lib/stackflow/` - Stackflow navigation setup
- `/src/components/` - Reusable components including global Text component
- `/src/components/seed-design/` - Custom Seed Design components
- `/src/routes.tsx` - Route definitions with type-safe parameters
- `/src/utils/` - Utility functions (history, path constants, design tokens)
- `/src/App.tsx` - Root component that renders the Stack

## Design System

### Sogang Brand Colors

The project includes custom Tailwind utilities for Sogang brand colors:

- Primary red scale: `sogang-50` to `sogang-950` (e.g., `text-sogang-700` for #b11f15)
- Additional colors: `sogang-blue`, `sogang-blue-light`, `sogang-gray`, `sogang-gray-light`

Usage in className:

```jsx
<div className="bg-sogang-700 text-white">서강대학교</div>
<Text className="text-sogang-500">브랜드 컬러 텍스트</Text>
```

Color values are defined in `src/styles/App.css` and typed in `src/utils/design-tokens.ts`.

## Form Implementation

### Product Registration Form

The `/form` route implements a comprehensive product registration form with:

**Form Validation:**

- Zod schema validation (`src/pages/Form/schemas/productSchema.ts`)
- Real-time error messages
- Required field indicators

**Form Components:**

- `FormInput`: Reusable input with validation
- `FormTextarea`: Multi-line input for descriptions
- `RadioGroup`: Custom radio button groups
- `CategoryDropdown`: Dropdown with predefined categories
- `ProductImageUpload`: Image upload placeholder

**API Integration:**

- React Query for mutation handling
- Mock API response for development
- Loading states and error handling

**Key Features:**

- Bottom-fixed submit button
- Character count indicators
- Conditional field display (trade location for direct trade)
- Custom styled checkboxes and radio buttons
