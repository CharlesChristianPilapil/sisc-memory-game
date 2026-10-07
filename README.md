# SISC Memory Match

A responsive memory card-matching game built with React, TypeScript, Vite, and SCSS Modules.

The goal is to match all card pairs while tracking moves and time. The game includes multiple difficulty levels, configurable game modes, persistent rankings, game settings, and responsive layouts.

## Live Demo

**[SISC Memory Match](https://cc-sisc-memory-game.vercel.app/)**

## Features

- Memory matching game with multiple difficulty levels
- Classic, Limited Moves, and Beat the Clock modes
- Move counter and game timer
- Persistent leaderboard using `localStorage`
- Configurable number of saved leaderboard scores
- Result modal for successful and failed games
- Rankings with trophy assets for the first three places
- Game settings for player and board preferences
- Responsive desktop, tablet, and mobile layouts
- Keyboard-friendly interactive controls
- SCSS Modules with shared variables and mixins
- Custom 404 / Not Found page

## Tech Stack

- React
- TypeScript
- Vite
- SCSS Modules
- Lucide React for icons
- `localStorage` for persistent scores

## Folder Structure

```text
src/
├── assets/
│   ├── bronze-trophy.png
│   ├── gold-trophy.png
│   ├── hero.png
│   ├── not-found.png
│   └── silver-trophy.png
│
├── components/
│   ├── BoardPanel/
│   ├── ControlPanel/
│   ├── Header/
│   ├── MemoryCard/
│   ├── NotFound/
│   │   ├── index.tsx
│   │   └── NotFound.module.scss
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
├── App.module.scss
├── App.tsx
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
- **NotFound** — Displays the 404 page for unsupported paths

### Context and Hooks

The game state is shared through the Game context.

- `GameProvider` provides game state to the application.
- `useGame` exposes game state and actions to components.
- `useMemoryGame` contains the core memory game logic.
- `useSettings` handles game settings.

This keeps the game logic separate from presentation components.

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
├── _mixins.scss
├── _variables.scss
└── globals.scss
```

- `_variables.scss` contains shared values such as colors, breakpoints, and shadows.
- `_mixins.scss` contains reusable patterns such as the responsive container and breakpoints.
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

## Game Modes

### Classic

Find all pairs at your own pace with unlimited time and moves.

### Limited Moves

Find all pairs before reaching the configured move limit.

### Beat the Clock

Find all pairs before the configured timer expires.

## Game Settings

Players can customize the game through the Settings modal.

Available settings include:

- Player mode
- Classroom mode
- Numbered cards
- Sound
- Hide matched cards
- Hide timer
- Hide moves
- Game mode

Settings can be reset to their default values.

## Leaderboards

Successful game results are stored in browser `localStorage`.

The leaderboard uses:

```ts
const STORAGE_KEY = "memory-match:best-scores";
const MAX_BEST_SCORES = 5;
```

Scores are ranked by:

1. Fewest moves
2. Fastest time when moves are equal

The number of saved and displayed rankings is controlled by `MAX_BEST_SCORES`.

The result modal displays the configured number of rankings and highlights the player's result when it appears on the leaderboard.

The first three rankings use the provided gold, silver, and bronze trophy assets.

## Error Handling

The application includes a custom Not Found page for unsupported paths.

When the current path is not `/`, the application renders the `NotFound` component instead of the game.

The page includes:

- 404 status
- Not Found illustration
- Friendly error message
- Link back to the game

## Responsive Design

The interface follows a mobile-first approach and supports:

- Mobile
- Tablet
- Desktop

The layout is designed to work down to a minimum viewport width of 320px.

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

## Deployment

The application is deployed on Vercel.

**Live Demo:** https://cc-sisc-memory-game.vercel.app/

## Project Notes

The project focuses on clear component separation, reusable game logic, responsive design, accessible interactions, and scoped SCSS styling.

Game-specific styles are kept inside component SCSS Modules, while shared Sass variables and mixins are centralized to minimize duplication.
