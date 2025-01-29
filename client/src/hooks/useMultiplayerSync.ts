// hooks/useMultiplayerSync.ts
import { useEffect } from "react";
import { useSocket } from "./useSocket";
import { useMultiplayerStore } from "@/stores/multiplayerStore";
import { useBoardStore } from "@/stores/boardStore";
import { useGameStore } from "@/stores/gameStore";
import { usePieceStore } from "@/stores/pieceStore";

export const useMultiplayerSync = (roomId: string) => {
  const socket = useSocket();
  const board = useBoardStore((state) => state.board);
  const { score } = useGameStore();
  const { holdPiece, pieceQueue } = usePieceStore();
  const updateOpponentState = useMultiplayerStore(
    (state) => state.updateOpponentState
  );

  useEffect(() => {
    if (!socket) return;

    // Join room when component mounts
    socket.emit("join_room", roomId);

    // Listen for opponent updates
    socket.on("opponent_state_update", (state) => {
      updateOpponentState({
        opponentBoard: state.board,
        opponentScore: state.score,
        opponentHoldPiece: state.holdPiece,
        opponentPieceQueue: state.pieceQueue,
      });
    });

    // Cleanup listeners when component unmounts
    return () => {
      socket.off("opponent_state_update");
      socket.emit("leave_room", roomId);
    };
  }, [socket, roomId]);

  const emitGameState = () => {
    if (!socket) return;

    socket.emit("game_state_update", {
      roomId,
      state: {
        board,
        score,
        holdPiece,
        pieceQueue,
      },
    });
  };

  return { emitGameState };
};
