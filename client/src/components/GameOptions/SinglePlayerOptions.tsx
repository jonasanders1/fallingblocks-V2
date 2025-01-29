import { useState } from "react";
import { useGameStore } from "@/stores/gameStore";
import {
  StyledOptionsContainer,
  StyledOptionGroup,
  StyledButtonGroup,
} from "./Options.styles";
import Button from "../Shared/Button/Button";

const SinglePlayerOptions = () => {
  const [gameMode, setGameMode] = useState<"timed" | "endless">("timed");
  const [timeLimit, setTimeLimit] = useState(180); // 3 minutes default
  const setTimeRemaining = useGameStore((state) => state.setTimeRemaining);

  const handleModeChange = (mode: "timed" | "endless") => {
    setGameMode(mode);
    if (mode === "endless") {
      setTimeRemaining(Infinity);
    } else {
      setTimeRemaining(timeLimit);
    }
  };

  const handleTimeChange = (seconds: number) => {
    setTimeLimit(seconds);
    setTimeRemaining(seconds);
  };

  return (
    <StyledOptionsContainer>
      <StyledOptionGroup>
        <h3>Game Mode</h3>
        <StyledButtonGroup>
          <Button
            $active={gameMode === "timed"}
            onClick={() => handleModeChange("timed")}
            text="Timed Mode"
            size="medium"
          />
          <Button
            $active={gameMode === "endless"}
            onClick={() => handleModeChange("endless")}
            text="Endless Mode"
            size="medium"
          />
        </StyledButtonGroup>
      </StyledOptionGroup>

      {gameMode === "timed" && (
        <StyledOptionGroup>
          <h3>Time Limit</h3>
          <StyledButtonGroup>
            <Button
              size="medium"
              $active={timeLimit === 60}
              onClick={() => handleTimeChange(60)}
              text="1 Minute"
            />
            <Button
              size="medium"
              $active={timeLimit === 180}
              onClick={() => handleTimeChange(180)}
              text="3 Minutes"
            />
            <Button
              size="medium"
              $active={timeLimit === 300}
              onClick={() => handleTimeChange(300)}
              text="5 Minutes"
            />
          </StyledButtonGroup>
        </StyledOptionGroup>
      )}
    </StyledOptionsContainer>
  );
};

export default SinglePlayerOptions;
