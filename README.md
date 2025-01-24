[![Maintainability](https://api.codeclimate.com/v1/badges/35792fb5b2e30c99022c/maintainability)](https://codeclimate.com/github/RnDAO/tc-uiComm/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/35792fb5b2e30c99022c/test_coverage)](https://codeclimate.com/github/RnDAO/tc-uiComm/test_coverage)

## Overview

Welcome to the `Togethercrew` project! This repository contains a Next.js application with a rich set of features and dependencies geared towards building a robust and scalable web application.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18.11.9 or higher)
- npm (comes with Node.js)

### Installation

1.  Clone the repository to your local machine.
2.  Navigate to the project directory.
3.  Run `npm install` to install all the dependencies listed in `package.json`.

### Environment Variables

To set up environment variables:

1. **Copy the Example File**:  
   Run:

   ```bash
   cp .env.example .env.local
   ```

2. **Update Variables**:  
   Replace placeholders in `.env.local` with actual values.

> **Note**: Do not commit `.env.local` to version control; use `.env.example` to document new variables.

### Premium Guilds Configuration

The application includes a list of premium platforms, defined in the `PREMIUM_GUILDS` array. Premium platforms receive special treatment or features within the application.

#### **How to Add a New Premium Platform**
1. Locate the `PREMIUM_GUILDS` array in the configuration file:
   ```javascript
   export const PREMIUM_GUILDS = [
     '732892373507375164', // fuel
     '915914985140531240', // rndao
     '980858613587382322',
     '1007641784798691468',
   ];
   ```

2. Add the new platform's unique ID to the array. For example:
   ```javascript
   export const PREMIUM_GUILDS = [
     '732892373507375164', // fuel
     '915914985140531240', // rndao
     '980858613587382322',
     '1007641784798691468',
     '123456789012345678', // new platform
   ];
   ```

#### **Notes**
- The platform ID must be a unique identifier.

This setup allows for easy customization and management of premium platforms in the application.

### Available Scripts

In the project directory, you can run:

- `npm run dev`\
  Starts the development server.

- `npm run build`\
  Builds the app for production.

- `npm run start`\
  Runs the built app in production mode.

- `npm run lint`\
  Runs ESLint to catch linting errors.

- `npm run test`\
  Launches the test runner.

- `npm run coverage`\
  Generates test coverage.

- `npm run export`\
  Exports a static version of the app.

## Dependencies

The project uses a variety of dependencies for different purposes:

- **[React](https://reactjs.org/) and [Next.js](https://nextjs.org/)**: For building the user interface and server-side rendering.
- **[TypeScript](https://www.typescriptlang.org/)**: For adding type safety to the codebase.
- **[ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)**: For code formatting and linting.
- **[Jest](https://jestjs.io/)**: For running tests.
- **[Material-UI](https://mui.com/) and [Emotion](https://emotion.sh/)**: For UI components and styling.
- **[Highcharts](https://www.highcharts.com/)**: For data visualization.
- **[Axios](https://axios-http.com/)**: For making HTTP requests.
- **[Zustand](https://github.com/pmndrs/zustand)**: For state management.

And many others that enhance the functionality and performance of the application.

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the [MIT License](https://github.com/TogetherCrew/frontend?tab=MIT-1-ov-file).

---

For more details, refer to the project's documentation or contact the maintainers.
