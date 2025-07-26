# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

- `yarn dev` - Start development server (default)
- `yarn dev:mock` - Start development server with MSW mock API

### Build & Deploy

- `yarn build` - Type check and build for production
- `yarn preview` - Preview production build locally

### Code Quality

- `yarn lint` - Run ESLint with TypeScript support

### Testing

- `yarn test:e2e` - Run end-to-end tests with Playwright
- `yarn test:e2e:ui` - Run tests with Playwright UI mode

## Architecture Overview

This is a Vite + React + TypeScript web application with mobile-first design using Stackflow for native-like page transitions.

### Key Technologies

- **Stackflow**: Manages page navigation with iOS/Android-style transitions. All pages must be registered in `src/lib/stackflow/index.ts`
- **React Query (TanStack Query)**: Handles all API calls and server state management
- **Linaria**: Zero-runtime CSS-in-JS for styling
- **MSW**: Mock Service Worker for API mocking during development
- **Seed Design**: Design token system for consistent styling
- **Zod**: Schema validation for forms and API responses
- **React Hook Form**: Form state management with validation
- **Playwright**: End-to-end testing framework

### Project Structure

- `src/api/` - API integration layer
  - `hooks/` - React Query hooks for API calls
  - `instance/` - Axios instance configuration
  - `msw/` - Mock API handlers
- `src/pages/` - Stackflow activities (pages)
- `src/components/` - Reusable components
- `src/lib/stackflow/` - Navigation configuration
- `src/styles/` - Global styles and utilities
- `src/schemas/` - Zod validation schemas
- `src/types/` - TypeScript type definitions
- `src/hooks/` - Custom React hooks
- `tests/` - Playwright end-to-end tests

### Adding New Pages

1. Create page component in `src/pages/[domain]/`
2. Register in `src/lib/stackflow/index.ts` activities object
3. Use `useFlow()` hook for navigation between pages

### API Development

- Create API hooks in `src/api/hooks/` using React Query patterns
- For mock development, add handlers in `src/api/msw/` and run with `yarn dev:mock`
- API instance configuration is in `src/api/instance/index.ts`

### Form Development
- Create Zod schemas in `src/schemas/` for validation
- Use React Hook Form with zodResolver for form management
- Example: JobCreatePage demonstrates complete form with validation

### Testing
- Add E2E tests in `tests/` directory using Playwright
- Run tests against mock API using `yarn dev:mock` server
- Include data-testid attributes for reliable element selection
