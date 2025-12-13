# Flexgrid Spikes NG 15

An Angular 15 application demonstrating various Wijmo FlexGrid implementations and patterns, integrated with Saffron design system components.

## Overview

This project showcases different FlexGrid usage patterns and features, including:
- Accessible editing capabilities
- Custom cell components
- Inline validation
- Checkbox selection
- Field type management with dropdown dialogs

## Technologies

- **Angular**: 15.2.0
- **Wijmo FlexGrid**: 5.20252.42
- **Saffron Design System**: 
  - Core Components: 3.11.1
  - Core Styles: 3.6.0
- **TypeScript**: 4.9.4
- **RxJS**: 7.8.0

## Prerequisites

- Node.js (v14 or higher recommended)
- npm (v6 or higher)
- Angular CLI 15.x

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd flexgrid-spikes-ng15
```

2. Install dependencies:
```bash
npm install
```

3. Install VS Code extensions (recommended):
   - Prettier ESLint (`rvest.vs-code-prettier-eslint`)
   - Angular Language Service (`angular.ng-template`)

## Development

### Start Development Server

```bash
npm start
```

The application will be available at `http://localhost:4200/`

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test
```

### Watch Mode

```bash
npm run watch
```

## Project Structure

```
src/
├── app/
│   ├── accessible-editing/      # Accessible grid editing component
│   ├── checkbox-in-first-column/ # Checkbox selection example
│   ├── firm-flow/               # Field type management with dialogs
│   ├── inline-validation/       # Inline validation example
│   ├── multiple-components-in-cells/ # Multiple components in cells
│   ├── services/                # Shared services
│   ├── app.component.*          # Root component
│   ├── app.module.ts            # Root module
│   └── app-routing.module.ts    # Routing configuration
├── assets/                      # Static assets
├── styles.scss                  # Global styles
└── index.html                   # Main HTML file
```

## Available Routes

- `/` - Dashboard (home page)
- `/accessible-editing` - Accessible grid editing demonstration
- `/firm-flow` - Field type management with modal dialogs
- `/checkbox-in-first-column` - Checkbox selection in first column
- `/multiple-components-in-cells` - Multiple components within grid cells
- `/inline-validation` - Inline validation example

## Code Formatting

This project uses **Prettier** for code formatting with the following configuration:

- **Formatter**: Prettier ESLint extension (`rvest.vs-code-prettier-eslint`)
- **Format on Save**: Enabled for all file types
- **Configuration**: `.prettierrc` file in project root

### Prettier Configuration

- Single quotes for strings
- 2-space indentation
- Semicolons enabled
- Trailing commas (ES5)
- Print width: 80 characters

## Design System

The project uses **Saffron Design System** tokens for consistent styling:

- **Spacing**: `var(--saf-spacing-*)` tokens (0-24)
- **Colors**: `var(--saf-color-*)` tokens
- **Border Radius**: `var(--saf-border-radius-*)` tokens
- **Font Sizes**: `var(--saf-font-size-*)` tokens
- **Font Weights**: `var(--saf-font-weight-*)` tokens
- **Line Widths**: `var(--saf-line-width-*)` tokens

All CSS values should use Saffron design tokens instead of hardcoded values.

## Security

The project includes several security measures:

- **Input Validation**: All user inputs are validated against whitelists
- **XSS Prevention**: Uses `textContent` instead of `innerHTML` for dynamic content
- **Type Safety**: Proper TypeScript types throughout
- **Security Headers**: CSP, X-Frame-Options, and other security headers configured
- **Dependency Vulnerabilities**: Documented in `SECURITY.md`

For detailed security information, see [SECURITY.md](./SECURITY.md).

## Key Features

### Firm Flow Component

The Firm Flow component demonstrates:
- Wijmo FlexGrid with custom cell rendering
- Field type management with modal dialogs
- Conditional UI display based on selections
- Saffron design system integration
- Accessible keyboard navigation

### Accessible Editing

Demonstrates accessible grid editing with:
- Keyboard navigation support
- Screen reader compatibility
- Validation and error handling

### Multiple Components in Cells

Shows how to embed multiple components within grid cells for complex interactions.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the existing code style (Prettier formatted)
2. Use Saffron design tokens for all styling
3. Ensure all inputs are validated
4. Write tests for new features
5. Update documentation as needed

## License

Private project - All rights reserved.

## Support

For issues or questions, please contact the development team.
