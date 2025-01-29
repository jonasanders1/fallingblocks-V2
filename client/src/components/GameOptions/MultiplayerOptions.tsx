import { useState } from "react";
import styled from "styled-components";
import { useGameStore } from "@/stores/gameStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faLink } from "@fortawesome/free-solid-svg-icons";
import {
  StyledOptionsContainer,
  StyledOptionGroup,
  StyledButtonGroup,
} from "./Options.styles";
import Button from "../Shared/Button/Button";

const MultiplayerOptions = () => {
  const [timeLimit, setTimeLimit] = useState(180);
  const [roomId, setRoomId] = useState("");
  const setTimeRemaining = useGameStore((state) => state.setTimeRemaining);

  const handleTimeChange = (seconds: number) => {
    setTimeLimit(seconds);
    setTimeRemaining(seconds);
  };

  const generateRoomId = () => {
    const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomId(newRoomId);
  };

  const copyToClipboard = () => {
    const url = `${window.location.origin}/join/${roomId}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <StyledOptionsContainer>
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

      <StyledOptionGroup>
        <h3>Room Settings</h3>
        <RoomContainer>
          {!roomId ? (
            <Button
              onClick={generateRoomId}
              text="Create Room"
              size="medium"
              $fullWidth={true}
              $active={true}
            />
          ) : (
            <RoomInfo>
              <RoomIdDisplay>
                Room ID: {roomId}
                <IconButton onClick={copyToClipboard}>
                  <FontAwesomeIcon icon={faCopy} />
                </IconButton>
              </RoomIdDisplay>
              <ShareLink>
                <span>{`${window.location.origin}/join/${roomId}`}</span>
                <IconButton onClick={copyToClipboard}>
                  <FontAwesomeIcon icon={faLink} />
                </IconButton>
              </ShareLink>
            </RoomInfo>
          )}
        </RoomContainer>
      </StyledOptionGroup>
    </StyledOptionsContainer>
  );
};

const RoomContainer = styled.div``;

const RoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: ${({ theme }) => theme.containers.secondary};
  padding: 1rem;
  border-radius: 0.5rem;
`;

const RoomIdDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

const ShareLink = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text.secondary};
  word-break: break-all;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text.secondary};
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.text.primary};
  }
`;

export default MultiplayerOptions;
