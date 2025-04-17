# Calendar

A Calendar built with React, Vite, TypeScript, Effector, Storybook and TailwindCSS, following Feature-Sliced Design architecture. The project includes comprehensive testing setup with Vitest and React Testing Library.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

The project follows Feature-Sliced Design architecture:

- `app/` - Application initialization and configuration
- `pages/` - Compositional layer for pages
- `widgets/` - Independent page blocks
- `features/` - User interactions and business logic
- `entities/` - Business entities
- `shared/` - Reusable components and utilities

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ui` - Run tests in browser mode

## Testing

The project uses Vitest as the testing framework with React Testing Library for component testing. Tests are organized alongside the components they test in `__tests__` directories.

### Testing Libraries
- Vitest - Fast and modern testing framework
- React Testing Library - Component testing utilities
- Jest DOM - DOM testing utilities

### Running Tests
- `npm run test` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ui` - Run tests in browser mode

## Technologies

- React
- Vite
- TypeScript
- Effector
- Storybook
- TailwindCSS
- ESLint
- Prettier
- Husky
- Vitest
- React Testing Library
- Jest DOM
