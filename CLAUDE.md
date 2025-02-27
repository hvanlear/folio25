# CLAUDE.md - Development Guidelines

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Code Style
- **TypeScript**: Use strict typing with explicit interfaces
- **Components**: Functional components with React hooks
- **Imports**: Group imports (React, Next.js, third-party, local)
- **Naming**: PascalCase for components/types, camelCase for functions/variables
- **State Management**: Context API for global state
- **Styling**: Tailwind CSS with fluid typography
- **Error Handling**: Try/catch with early returns

## File Structure
- Component files should match component names
- Related functionality in dedicated hooks
- Types should be defined in dedicated type files
- Follow Next.js conventions for pages and routing

## Project Architecture
- NextJS 15.1 with React 19
- TypeScript with strict mode enabled
- Tailwind for styling
- Theme toggle with light/dark mode