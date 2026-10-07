# SISC Memory Match

A responsive memory card-matching game built with React, TypeScript, Vite, and SCSS Modules.

The goal is to match all card pairs while tracking moves and time. The game also includes multiple difficulty levels, configurable game modes, persistent rankings, and responsive layouts.

## Features

- Memory matching game with multiple difficulty levels
- Classic, Limited Moves, and Beat the Clock modes
- Move counter and game timer
- Best-score and leaderboard tracking using localStorage
- Up to 5 saved scores per difficulty, configurable through `MAX_BEST_SCORES`
- Result modal for successful and failed games
- Top rankings with trophy assets for the first three places
- Settings for player preferences and game behavior
- Responsive desktop, tablet, and mobile layouts
- Keyboard-friendly interactive controls
- SCSS Modules with shared variables and mixins

## Tech Stack

- React
- TypeScript
- Vite
- SCSS Modules
- Lucide React
- Browser localStorage

## Folder Structure

```text
src/
├── assets/
│   ├── bronze-trophy.png
│   ├── gold-trophy.png
│   ├── hero.png
│   └── silver-trophy.png
│
├── components/
│   ├── BoardPanel/
│   ├── ControlPanel/
│   ├── Header/
│   ├── MemoryCard/
│   ├── ResultModal/
│   │   ├── RankingList.tsx
│   │   ├── ResultStats.tsx
│   │   └── index.tsx
│   └── SettingsModal/
│       ├── GameModeSection.tsx
│       ├── PreferenceList.tsx
│       ├── SettingsForm.tsx
│       └── index.tsx
│
├── constants/
│   ├── difficulties.ts
│   └── settings.ts
│
├── context/
│   └── Game/
│       ├── GameContext.ts
│       └── GameProvider.tsx
│
├── hooks/
│   ├── useGame.ts
│   ├── useMemoryGame.ts
│   └── useSettings.ts
│
├── styles/
│   ├── _mixins.scss
│   ├── _variables.scss
│   └── globals.scss
│
├── utils/
│   ├── deck.ts
│   ├── icon.ts
│   └── time.ts
│
├── App.tsx
├── App.module.scss
└── main.tsx
```

## Architecture

### Components

The `components` directory contains the main UI parts of the game.

- **Header** — Game branding and summary information
- **ControlPanel** — Game progress, difficulty selection, settings, and restart controls
- **BoardPanel** — Memory card board
- **MemoryCard** — Individual interactive memory cards
- **ResultModal** — Displays success/failure results and rankings
- **SettingsModal** — Game mode and board preference controls

### Context and Hooks

The game state is shared through the Game context.

- `GameProvider` provides game state to the application.
- `useGame` exposes the game state and actions to components.
- `useMemoryGame` contains the core memory game logic.
- `useSettings` handles game settings.

This keeps the game logic separate from the presentation components.

### Constants

The `constants` directory contains static game configuration.

- `difficulties.ts` — Difficulty levels and board configurations
- `settings.ts` — Game modes, preferences, and settings-related configuration

### Utilities

The `utils` directory contains reusable helper functions.

- `deck.ts` — Card creation and deck handling
- `icon.ts` — Card icon handling
- `time.ts` — Time formatting helpers

### SCSS

Styling uses SCSS Modules for component-scoped styles.

Shared Sass resources are kept in:

```text
src/styles/
├── _variables.scss
├── _mixins.scss
└── globals.scss
```

- `_variables.scss` contains shared design values such as colors, spacing, breakpoints, and shadows.
- `_mixins.scss` contains reusable patterns such as responsive breakpoints and the main container.
- `globals.scss` contains global/base styles.

Component-specific styles are colocated with their components using `.module.scss`.

## Game Flow

1. The player selects a difficulty.
2. A shuffled deck is generated.
3. The timer starts when the first card is flipped.
4. The player flips cards in pairs.
5. Matching cards remain revealed.
6. Incorrect pairs are hidden after a short delay.
7. Moves are counted per pair of flips.
8. The game ends when all pairs are matched or a mode-specific limit is reached.
9. Successful games can be saved to the leaderboard.
10. The result modal displays the final result and rankings.

## Leaderboards

Scores are stored in browser `localStorage`.

The leaderboard uses:

```ts
const STORAGE_KEY = "memory-match:best-scores";
const MAX_BEST_SCORES = 5;
```

Scores are ranked by:

1. Fewest moves
2. Fastest time when moves are equal

The number of stored and displayed rankings is controlled by `MAX_BEST_SCORES`.

## Running the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Notes

The project follows a mobile-first approach with responsive layouts for mobile, tablet, and desktop.

Game-specific styling is kept inside component SCSS Modules, while shared Sass variables and mixins are centralized to reduce duplication and keep the styling consistent.
