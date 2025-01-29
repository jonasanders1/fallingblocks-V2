import { create } from "zustand";
import { TetrominoType } from "@/services/utils/tetrominoes";

interface MultiplayerStore {
  opponentBoard: (TetrominoType | null)[][];
  opponentScore: number;
  opponentName: string;
  opponentRating: number;
  opponentHoldPiece: TetrominoType | null;
  opponentPieceQueue: TetrominoType[];

  updateOpponentState: (state: Partial<MultiplayerStore>) => void;
}

export const useMultiplayerStore = create<MultiplayerStore>()((set) => ({
  opponentBoard: [],
  opponentScore: 0,
  opponentName: "",
  opponentRating: 0,
  opponentHoldPiece: null,
  opponentPieceQueue: [],
  updateOpponentState: (state) => set(state),
}));
