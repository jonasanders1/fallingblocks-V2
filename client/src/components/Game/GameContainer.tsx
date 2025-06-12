import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "@/stores/gameStore";
import { useModeStore } from "@/stores/modeStore";
import Gameboard from "./Gameboard/Gameboard";
import GameHeader from "./GameHeader/GameHeader";
import { usePieceStore } from "@/stores/pieceStore";
import { useMenuStore } from "@/stores/menuStore";
import Modal from "../Shared/Modal/Modal";
import { useGravityStore } from "@/stores/gravityStore";
import Button from "../Shared/Button/Button";
import { useGameCoordinator } from "@/stores/useGameCoordinator";
import SidePanel from "./SidePanel/SidePanel";

interface GameContainerProps {
  $isOpponent: boolean;
}

interface Score {
  score: number;
  date: string;
  mode: string;
  timeLimit?: number;
  linesCleared: number;
  playTime: number;
}

const GameContainer = ({ $isOpponent }: GameContainerProps) => {
  const { holdPiece } = usePieceStore();
  const pieceQueue = usePieceStore((state) => state.pieceQueue);
  const {
    score,
    isGameOver,
    elapsedTime,
    totalLinesCleared,
  } = useGameStore();
  const { timeLimit, gameType } = useModeStore();
  const navigate = useNavigate();
  const { initGame } = useGameCoordinator();
  const { isMenuOpen, setIsMenuOpen } = useMenuStore();
  const { stopTimer, startTimer } = useGameStore();
  const { stopGravity, startGravity } = useGravityStore();

  // Prevent default scroll behavior during gameplay
  useEffect(() => {
    const preventScroll = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", preventScroll, { passive: false });
    return () => window.removeEventListener("keydown", preventScroll);
  }, []);

  useEffect(() => {
    if (isGameOver) {
      // Save score to local storage
      const storedScores = localStorage.getItem("tetrisScores");
      const scores = storedScores ? JSON.parse(storedScores) : [];
      
      // Create new score entry
      const newScore = {
        score,
        date: new Date().toISOString(),
        mode: gameType,
        timeLimit: timeLimit,
        linesCleared: totalLinesCleared,
        playTime: elapsedTime
      };

      // Check if this exact score already exists
      const isDuplicate = scores.some((existingScore: Score) => 
        existingScore.score === newScore.score && 
        existingScore.mode === newScore.mode &&
        existingScore.timeLimit === newScore.timeLimit &&
        Math.abs(new Date(existingScore.date).getTime() - new Date(newScore.date).getTime()) < 1000 // Within 1 second
      );

      if (!isDuplicate) {
        scores.push(newScore);
        // Keep only top 50 scores
        const sortedScores = scores.sort((a: Score, b: Score) => b.score - a.score).slice(0, 50);
        localStorage.setItem("tetrisScores", JSON.stringify(sortedScores));
        
        // Redirect to leaderboard with new score state
        navigate("/leaderboard", { 
          state: { 
            newScore: true,
            score,
            rank: sortedScores.findIndex((s: Score) => s.score === score) + 1
          } 
        });
      } else {
        navigate("/leaderboard");
      }
    }
  }, [isGameOver, score, gameType, timeLimit, totalLinesCleared, elapsedTime, navigate]);

  useEffect(() => {
    if (isMenuOpen) {
      stopGravity();
      stopTimer();
    } else {
      startGravity();
      startTimer();
    }
  }, [isMenuOpen]);

  // Add ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(!isMenuOpen);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const handleResetGame = () => {
    initGame();
    setIsMenuOpen(false);
  };

  return (
    <>
      {isMenuOpen && (
        <Modal
          isOpen={isMenuOpen}
          title="Game Paused"
          onClose={() => setIsMenuOpen(false)}
        >
          <ButtonContainer>
            <Button
              onClick={() => setIsMenuOpen(false)}
              text="Resume"
              $active={true}
            />
            <Button
              onClick={() => handleResetGame()}
              text="Restart"
              $active={true}
            />
            <Button
              onClick={() => {
                navigate("/");
              }}
              text="Quit"
            />
          </ButtonContainer>
        </Modal>
      )}

      <StyledGameContainer $isOpponent={$isOpponent}>
        <GameHeader $isOpponent={$isOpponent} />
        <StyledGameboardContainer>
          <SidePanel
            $side="left"
            content={[{ left: { title: "Hold", piece: `${holdPiece}` } }]}
          />
          <Gameboard />
          <SidePanel
            $side="right"
            content={[
              { right: { nextPieces: { title: "Next", pieces: pieceQueue } } },
            ]}
          />
        </StyledGameboardContainer>
      </StyledGameContainer>
    </>
  );
};

const StyledGameContainer = styled.div<{ $isOpponent: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0 auto;
  
`;

const StyledGameboardContainer = styled.div`
  display: flex;
  border-radius: 1rem;
  width: fit-content;
  gap: 0.5rem;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;

  button {
    width: 100%;
  }
`;

export default GameContainer;
