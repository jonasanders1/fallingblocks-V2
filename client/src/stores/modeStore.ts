import { create } from "zustand";

export type GameMode = "" | "singleplayer" | "multiplayer" | "battle-royale";

interface ModeStore {
  currentMode: GameMode;
  gameType: "timed" | "endless";
  timeLimit: number;
  roomId: string | null;
  setMode: (mode: GameMode) => void;
  setGameType: (type: "timed" | "endless") => void;
  setTimeLimit: (seconds: number) => void;
  setRoomId: (id: string | null) => void;
  isMultiplayerMode: () => boolean;
}

export const useModeStore = create<ModeStore>((set, get) => ({
  currentMode: "",
  gameType: "timed",
  timeLimit: 180,
  roomId: null,

  setMode: (mode) => set({ currentMode: mode }),
  setGameType: (type) => set({ gameType: type }),
  setTimeLimit: (seconds) => set({ timeLimit: seconds }),
  setRoomId: (id) => set({ roomId: id }),

  isMultiplayerMode: () => {
    return ["multiplayer", "battle-royale"].includes(get().currentMode);
  },
}));
