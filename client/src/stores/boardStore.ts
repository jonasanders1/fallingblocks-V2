import { create } from "zustand";
import { BOARD_WIDTH, TOTAL_BOARD_HEIGHT } from "../services/utils/board";
import { rotateMatrix } from "../services/utils/rotateMatrix";
import { TETROMINOES } from "../services/utils/tetrominoes";
import { usePieceStore } from "./pieceStore";

interface BoardStore {
  board: (string | null)[][];
  clearLines: () => void;
  isValidMove: (
    position: { x: number; y: number },
    rotation?: number
  ) => boolean;
  lockPiece: () => void;
  findDropPosition: () => { x: number; y: number };
}

export const useBoardStore = create<BoardStore>((set, get) => ({
  board: Array.from({ length: TOTAL_BOARD_HEIGHT }, () =>
    Array(BOARD_WIDTH).fill(null)
  ),

  isValidMove: (
    position,
    rotation = usePieceStore.getState().currentPiece.rotation
  ) => {
    const piece = TETROMINOES[usePieceStore.getState().currentPiece.type];
    const rotatedShape = rotateMatrix(piece.shape, rotation);

    for (let y = 0; y < rotatedShape.length; y++) {
      for (let x = 0; x < rotatedShape[y].length; x++) {
        if (rotatedShape[y][x]) {
          const boardX = position.x + x;
          const boardY = position.y + y;

          if (
            boardX < 0 ||
            boardX >= BOARD_WIDTH ||
            boardY >= TOTAL_BOARD_HEIGHT ||
            (boardY >= 0 && get().board[boardY][boardX] !== null)
          ) {
            return false;
          }
        }
      }
    }
    return true;
  },

  findDropPosition: () => {
    const currentPiece = usePieceStore.getState().currentPiece;
    let dropY = currentPiece.position.y;

    while (get().isValidMove({ x: currentPiece.position.x, y: dropY + 1 })) {
      dropY++;
    }

    return { x: currentPiece.position.x, y: dropY };
  },

  clearLines: () => {
    const newBoard = [...get().board.map((row) => [...row])];
    let linesCleared = 0;

    for (let row = TOTAL_BOARD_HEIGHT - 1; row >= 0; row--) {
      if (newBoard[row].every((cell) => cell !== null)) {
        newBoard.splice(row, 1);
        newBoard.unshift(Array(BOARD_WIDTH).fill(null));
        linesCleared++;
        row++;
      }
    }

    if (linesCleared > 0) {
      set({ board: newBoard });
    }

    return linesCleared;
  },

  lockPiece: () => {
    const { currentPiece } = usePieceStore.getState();
    const piece = TETROMINOES[currentPiece.type];
    const rotatedShape = rotateMatrix(piece.shape, currentPiece.rotation);
    const newBoard = [...get().board.map((row) => [...row])];

    rotatedShape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          const boardY = currentPiece.position.y + y;
          const boardX = currentPiece.position.x + x;
          if (
            boardY >= 0 &&
            boardY < TOTAL_BOARD_HEIGHT &&
            boardX >= 0 &&
            boardX < BOARD_WIDTH
          ) {
            newBoard[boardY][boardX] = piece.color;
          }
        }
      });
    });

    set({ board: newBoard });
  },
}));
