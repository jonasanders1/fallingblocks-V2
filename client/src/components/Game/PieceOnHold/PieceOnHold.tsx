import {
  GameSideBox,
  StyledSegment,
  StyledSegmentTitle,
} from "@/components/Shared/shared.styles";
import { usePieceStore } from "@/stores/pieceStore";
import { getBlockImages } from "@/services/utils/getBlockImages";

const PieceOnHold = () => {
  const holdPiece = usePieceStore((state) => state.holdPiece);

  return (
    <StyledSegment>
      <StyledSegmentTitle>Hold</StyledSegmentTitle>
      {holdPiece === null ? (
        <GameSideBox>None</GameSideBox>
      ) : (
        <GameSideBox>{getBlockImages(holdPiece!)}</GameSideBox>
      )}
    </StyledSegment>
  );
};

export default PieceOnHold;
