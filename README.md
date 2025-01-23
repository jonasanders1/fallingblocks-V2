# Tetris Battle Project

## Overview
Welcome to my Tetris Battle Project! This project is a modern take on the classic Tetris game, featuring both Single Player and Multiplayer Battle Modes. Designed for scalability and maintainability, the project uses cutting-edge technologies such as React, TypeScript, styled-components, socket.io, and Zustand for state management.

---

## File Structure

```
src/
├── assets/
│   ├── images/
│   ├── sounds/
│   └── fonts/
├── components/
│   ├── Gameboard/
│   │   ├── Gameboard.tsx
│   │   ├── Gameboard.styles.ts
│   │   └── Gameboard.test.tsx
│   ├── Scoreboard/
│   │   ├── Scoreboard.tsx
│   │   ├── Scoreboard.styles.ts
│   │   └── Scoreboard.test.tsx
│   ├── Timer/
│   │   ├── Timer.tsx
│   │   ├── Timer.styles.ts
│   │   └── Timer.test.tsx
│   └── shared/
│       ├── Block.tsx
│       ├── Button.tsx
│       ├── Modal.tsx
│       └── shared.styles.ts
├── contexts/
│   ├── GameContext.tsx
│   ├── MultiplayerContext.tsx
│   └── ScoreContext.tsx
├── hooks/
│   ├── useGameLogic.ts
│   ├── useMultiplayer.ts
│   ├── useSocket.ts
│   └── useTimer.ts
├── modes/
│   ├── SinglePlayer/
│   │   ├── SinglePlayer.tsx
│   │   ├── SinglePlayerLogic.ts
│   │   └── SinglePlayer.styles.ts
│   ├── Multiplayer/
│   │   ├── Multiplayer.tsx
│   │   ├── MultiplayerLogic.ts
│   │   └── Multiplayer.styles.ts
│   └── shared/
│       ├── DifficultyManager.ts
│       └── LineClearHandler.ts
├── services/
│   ├── api/
│   │   └── socket.ts
│   ├── storage/
│   │   ├── localStorageHelper.ts
│   │   └── sessionManager.ts
│   └── utils/
│       ├── constants.ts
│       ├── helpers.ts
│       └── validators.ts
├── stores/
│   ├── gameStore.ts
│   ├── multiplayerStore.ts
│   └── scoreStore.ts
├── styles/
│   ├── GlobalStyles.ts
│   ├── Theme.ts
│   └── mixins/
│       └── responsive.ts
├── types/
│   ├── game.d.ts
│   ├── multiplayer.d.ts
│   └── shared.d.ts
├── App.tsx
├── index.tsx
├── react-app-env.d.ts
└── setupTests.ts
```

---

## Explanation of the Structure

### **1. `assets/`**
- **Purpose:** Stores static assets like images, sounds, and fonts.
- **Benefit:** Centralized management of game-specific resources.

### **2. `components/`**
- **Purpose:** Contains reusable UI components such as `Gameboard`, `Scoreboard`, and `Timer`.
- **Structure:**
  - Each component has its own folder with logic (`.tsx`), styling (`.styles.ts`), and tests (`.test.tsx`).
  - A `shared/` subfolder for small reusable components (e.g., `Button`, `Modal`).

### **3. `contexts/`**
- **Purpose:** Manages global state using React Context for shared logic (e.g., game state, multiplayer state).

### **4. `hooks/`**
- **Purpose:** Houses custom React hooks for specific logic, like `useGameLogic` for gameplay and `useSocket` for WebSocket communication.

### **5. `modes/`**
- **Purpose:** Organizes game modes into their own folders for Single Player, Multiplayer, and shared logic.
- **Structure:**
  - Each mode has its own entry point (`.tsx`), logic (`.Logic.ts`), and styles (`.styles.ts`).
  - Shared logic like difficulty scaling is in a `shared/` subfolder.

### **6. `services/`**
- **Purpose:** Contains utilities for communication, storage, and reusable helpers.
- **Structure:**
  - `api/` for `socket.io` configuration.
  - `storage/` for managing local storage (e.g., high scores).
  - `utils/` for constants and helper functions.

### **7. `stores/`**
- **Purpose:** Manages state using Zustand for modular and scalable state management.
- **Structure:**
  - `gameStore.ts`: Handles core gameplay state.
  - `multiplayerStore.ts`: Manages multiplayer-specific state.
  - `scoreStore.ts`: Tracks scoring and line-clearing logic.

### **8. `styles/`**
- **Purpose:** Centralizes styling for the project.
- **Structure:**
  - `GlobalStyles.ts`: Defines global CSS rules.
  - `Theme.ts`: Stores theme variables for consistent design.
  - `mixins/`: Reusable CSS mixins for responsiveness.

### **9. `types/`**
- **Purpose:** Centralized TypeScript type definitions for better type safety.
- **Structure:** Organized by feature (e.g., `game.d.ts`, `multiplayer.d.ts`).

---

## Benefits of the Proposed Structure

1. **Scalability:**
   - Adding new features or game modes is straightforward due to modular folder organization.

2. **Maintainability:**
   - Clear separation of concerns makes debugging and refactoring easier.

3. **Reusability:**
   - Shared logic and components (e.g., `Button`, `useSocket`) are centralized for reuse.

4. **Readability:**
   - Logical grouping of files improves developer onboarding and collaboration.

---

## Future-Proofing

1. **Adding New Game Modes:**
   - Simply create a new folder in `modes/` (e.g., `BattleRoyale/`) with its own entry point, logic, and styles.

2. **Expanding Multiplayer Features:**
   - Extend `stores/multiplayerStore.ts` and `hooks/useMultiplayer.ts` for additional multiplayer logic.

3. **Adding Themes or Skins:**
   - Update `styles/Theme.ts` and dynamically load styles based on user preferences.

---

## Technologies Used
- **React.js**: Frontend framework for building UI.
- **TypeScript**: Strongly typed programming language for improved developer experience.
- **Zustand**: Lightweight state management solution.
- **styled-components**: CSS-in-JS for styling components.
- **socket.io**: Real-time communication for multiplayer functionality.

---

## Contribution Guidelines
1. Fork the repository and create a feature branch.
2. Follow the file structure for consistency.
3. Write tests for new features.
4. Submit a pull request with a detailed description of changes.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
