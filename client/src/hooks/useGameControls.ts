import { useEffect } from "react";
import { usePieceStore } from "@/stores/pieceStore";
import { useBoardStore } from "@/stores/boardStore";
import { useGravityStore } from "@/stores/gravityStore";
import { useMenuStore } from "@/stores/menuStore";

export const useGameControls = () => {
  const { movePiece, rotatePiece, holdCurrentPiece } = usePieceStore();
  const { isValidMove, dropPiece } = useBoardStore();
  const { isPlaying } = useGravityStore();
  const { isMenuOpen } = useMenuStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isPlaying || isMenuOpen) return;

      const currentPiece = usePieceStore.getState().currentPiece;

      switch (event.code) {
        case "ArrowLeft":
          if (
            isValidMove({
              x: currentPiece.position.x - 1,
              y: currentPiece.position.y,
            })
          ) {
            movePiece({ x: -1, y: 0 });
          }
          break;

        case "ArrowRight":
          if (
            isValidMove({
              x: currentPiece.position.x + 1,
              y: currentPiece.position.y,
            })
          ) {
            movePiece({ x: 1, y: 0 });
          }
          break;

        case "ArrowDown":
          if (
            isValidMove({
              x: currentPiece.position.x,
              y: currentPiece.position.y + 1,
            })
          ) {
            movePiece({ x: 0, y: 1 });
          }
          break;

        case "ArrowUp":
        case "KeyX": {
          const nextRotation = (currentPiece.rotation + 1) % 4;
          if (isValidMove(currentPiece.position, nextRotation)) {
            rotatePiece();
          }
          break;
        }

        case "KeyZ": {
          const prevRotation = (currentPiece.rotation + 3) % 4;
          if (isValidMove(currentPiece.position, prevRotation)) {
            rotatePiece();
          }
          break;
        }

        case "Space":
          event.preventDefault();
          dropPiece();
          break;

        case "ShiftLeft":
        case "ShiftRight":
          holdCurrentPiece();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, isMenuOpen]);
};
