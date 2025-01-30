import { create } from "zustand";
import { BOARD_WIDTH, TOTAL_BOARD_HEIGHT } from "../services/utils/board";
import { rotateMatrix } from "../services/utils/rotateMatrix";
import { TETROMINOES, TetrominoType } from "../services/utils/tetrominoes";
import { usePieceStore } from "./pieceStore";
import { useGameStore } from "./gameStore";
import { useGravityStore } from "./gravityStore";
import { playSound } from "@/services/utils/playSound";
import dropSound from "@/assets/sounds/drop.mp3";


interface BoardStore {
  board: (TetrominoType | null)[][];
  clearLines: () => number;
  isValidMove: (
    position: { x: number; y: number },
    rotation?: number
  ) => boolean;
  lockPiece: () => void;
  findDropPosition: () => { x: number; y: number };
  getCellContent: (row: number, col: number) => CellContent;
  dropPiece: () => void;
  resetBoard: () => void;
}

type CellContent = {
  type: "empty" | "ghost" | "filled";
  pieceType?: TetrominoType;
};

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

          // Check horizontal bounds and bottom bound
          if (
            boardX < 0 ||
            boardX >= BOARD_WIDTH ||
            boardY >= TOTAL_BOARD_HEIGHT
          ) {
            return false;
          }

          // Only check board collision if the piece part is in the actual board
          if (boardY >= 0) {
            if (get().board[boardY][boardX] !== null) {
              return false;
            }
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
    const board = get().board;
    let linesCleared = 0;
    const newBoard = Array.from({ length: TOTAL_BOARD_HEIGHT }, () =>
      Array(BOARD_WIDTH).fill(null)
    );
    let newBoardIndex = TOTAL_BOARD_HEIGHT - 1;

    // Process the board from bottom to top
    for (let row = TOTAL_BOARD_HEIGHT - 1; row >= 0; row--) {
      const isLineFull = board[row].every((cell) => cell !== null);

      if (!isLineFull) {
        // Copy non-full line to new board
        for (let col = 0; col < BOARD_WIDTH; col++) {
          newBoard[newBoardIndex][col] = board[row][col];
        }
        newBoardIndex--;
      } else {
        linesCleared++;
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

    // Lock the piece
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
            newBoard[boardY][boardX] = currentPiece.type;
          }
        }
      });
    });

    // Update board state
    set({ board: newBoard });
    
    // Clear lines and update score
    const linesCleared = get().clearLines();
    if (linesCleared > 0) {
      useGameStore.getState().updateScore(linesCleared);
    }

    // Check for game over BEFORE generating new piece
    const gameStore = useGameStore.getState();
    if (gameStore.checkGameOver()) {
      gameStore.stopTimer();
      useGravityStore.getState().stopGravity();
      return; // Exit without generating new piece
    }

    // Only generate new piece if game isn't over
    usePieceStore.getState().generateNewPiece();
  },

  dropPiece: () => {
    const dropPosition = useBoardStore.getState().findDropPosition();
    usePieceStore.setState((state) => ({
      currentPiece: {
        ...state.currentPiece,
        position: dropPosition,
      },
    }));
    playSound(dropSound);
    useBoardStore.getState().lockPiece();
  },

  getCellContent: (row: number, col: number) => {
    const board = get().board;
    const currentPiece = usePieceStore.getState().currentPiece;

    // Check board state first
    if (board[row][col]) {
      return {
        type: "filled",
        pieceType: board[row][col] as TetrominoType,
      };
    }

    // Check current piece position first
    const piece = TETROMINOES[currentPiece.type];
    const rotatedShape = rotateMatrix(piece.shape, currentPiece.rotation);
    const pieceRow = row - currentPiece.position.y;
    const pieceCol = col - currentPiece.position.x;

    if (
      pieceRow >= 0 &&
      pieceRow < rotatedShape.length &&
      pieceCol >= 0 &&
      pieceCol < rotatedShape[0].length &&
      rotatedShape[pieceRow][pieceCol]
    ) {
      return {
        type: "filled",
        pieceType: currentPiece.type,
      };
    }

    // Only show ghost piece if not overlapping with current piece
    const dropPosition = get().findDropPosition();
    const ghostPieceRow = row - dropPosition.y;
    const ghostPieceCol = col - dropPosition.x;

    if (
      dropPosition.y !== currentPiece.position.y && // Only show ghost if it's in a different position
      ghostPieceRow >= 0 &&
      ghostPieceRow < rotatedShape.length &&
      ghostPieceCol >= 0 &&
      ghostPieceCol < rotatedShape[0].length &&
      rotatedShape[ghostPieceRow][ghostPieceCol]
    ) {
      return {
        type: "ghost",
        pieceType: currentPiece.type,
      };
    }

    return { type: "empty" };
  },

  resetBoard: () => {
    set({
      board: Array.from({ length: TOTAL_BOARD_HEIGHT }, () =>
        Array(BOARD_WIDTH).fill(null)
      ),
    });
  },
}));
