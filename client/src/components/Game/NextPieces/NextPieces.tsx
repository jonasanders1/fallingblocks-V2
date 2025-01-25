import {
  GameSideBox,
  StyledSegmentTitle,
} from "@/components/Shared/shared.styles";
import { getBlockImages } from "@/services/utils/getBlockImages";
import { usePieceStore } from "@/stores/pieceStore";
import styled from "styled-components";

const NextPieces = () => {
  const pieceQueue = usePieceStore((state) => state.pieceQueue);

  return (
    <StyledNextPiecesContainer>
      <StyledSegmentTitle>Next</StyledSegmentTitle>
      {pieceQueue.map((piece, index) => (
        <GameSideBox key={index}>{getBlockImages(piece)}</GameSideBox>
      ))}
    </StyledNextPiecesContainer>
  );
};

const StyledNextPiecesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
`;

export default NextPieces;
