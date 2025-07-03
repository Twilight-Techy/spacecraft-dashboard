# Spacecraft Dashboard

A modern, interactive spacecraft control dashboard built with Next.js, React, and Tailwind CSS. This project simulates a futuristic spacecraft interface, featuring real-time system status, navigation, communications, and emergency controls.

## Features

- **Main Dashboard**: Centralized view of all spacecraft systems.
- **Navigation, Defense, Science, Crew, Engineering, Communications**: Dedicated pages for each subsystem (see `/app` directory).
- **Live System Simulation**: Animated gauges, radar, and status indicators.
- **Emergency Controls**: Activate panic mode with visual feedback.
- **Responsive UI**: Optimized for desktop and mobile.
- **Custom Theming**: Uses `next-themes` and Tailwind CSS for dark/cyan sci-fi styling.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) components
- [Recharts](https://recharts.org/) for data visualization
- [Zod](https://zod.dev/) for schema validation

## Getting Started

### Prerequisites
- Node.js 18+
- [pnpm](https://pnpm.io/) (recommended) or npm/yarn

### Installation

```sh
pnpm install
```

### Development

```sh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Build

```sh
pnpm build
```

### Start (Production)

```sh
pnpm start
```

## Project Structure

- `/app` — Main application routes and pages
- `/components` — Reusable UI components
- `/hooks` — Custom React hooks
- `/lib` — Utility functions
- `/public` — Static assets
- `/styles` — Global and custom CSS

## Customization

- **Theming**: Modify `tailwind.config.ts` and `theme-provider.tsx` for color and theme changes.
- **Panels & UI**: Update or add components in `/components/ui/` for new dashboard widgets.

## License

This project is for educational and demonstration purposes.

---

*Inspired by sci-fi interfaces and modern web design best practices.*
