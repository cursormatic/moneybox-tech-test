# Moneybox Tech Test

## Requirements

### Prerequisites
- **Node.js**: v20.19+, 22.12+ required (compatible with the packages used)
- **npm**: Package manager (included with Node.js)

### System Requirements
- Modern web browser for development and testing
- Terminal/Command line access

## Technologies Used

### Core Technologies
- **TypeScript** (v5.8.3) - Type-safe JavaScript
- **React** (v19.1.1) - UI library
- **Vite** (v7.1.7) - Build tool and development server

### State Management
- **Redux Toolkit** (v2.9.0) - State management
- **React Redux** (v9.2.0) - React bindings for Redux

### Styling
- **Tailwind CSS** (v4.1.13) - Utility-first CSS framework
- **@tailwindcss/vite** (v4.1.13) - Vite integration for Tailwind

### UI Components & Libraries
- **React Hook Form** (v7.63.0) - Form handling
- **React Modal** (v3.16.3) - Modal dialogs
- **React Slick** (v0.31.0) - Carousel component
- **Slick Carousel** (v1.8.1) - Carousel functionality
- **React Feather** (v2.0.10) - Icon library
- **@uidotdev/usehooks** (v2.4.1) - Custom React hooks

### Development & Testing
- **Vitest** (v3.2.4) - Unit testing framework
- **Testing Library** - React testing utilities
- **Storybook** (v9.1.10) - Component development environment
- **ESLint** (v9.36.0) - Code linting
- **Prettier** (v3.6.2) - Code formatting

## Installation

```shell script
npm install
```


## Running the Project

### Development Server
```shell script
npm run dev
```

Starts the Vite development server (typically at `http://localhost:5173`)

### Linting
```shell script
npm run lint
```

Run ESLint to check code quality

## Testing

### Run Tests
```shell script
npm test
```

Executes the Vitest test suites

## Storybook Setup

### What is Storybook?
Storybook is an isolated component development environment that allows you to develop, test, and document UI components independently from the main application.

### Running Storybook

**Start Storybook Development Server:**
```shell script
npm run storybook
```

This will start Storybook on `http://localhost:6006`

### Storybook Configuration
- **Framework**: React with Vite integration (`@storybook/react-vite`)
- **Port**: 6006 (default)
- **Plugins**: Includes `eslint-plugin-storybook` for linting story files

## Third-Party Software & Access

### No External Services Required
This project is self-contained with no third-party API keys or external services required for basic development.

## Development Workflow

1. **Install dependencies**: `npm install`
2. **Start development**: `npm run dev`
3. **Develop components in isolation**: `npm run storybook`
4. **Run tests**: `npm test`
5. **Lint code**: `npm run lint`
6. **Build for production**: `npm run build`

## Notes
- The project uses modern React 19 and TypeScript 5.8
- All styling is handled through CSS and Tailwind CSS utility classes
- Components can be developed and tested in isolation using Storybook
- Tests are written using Vitest with React Testing Library
