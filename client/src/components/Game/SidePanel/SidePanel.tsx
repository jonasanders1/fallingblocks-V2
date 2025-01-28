import { getBlockImages } from "@/services/utils/getBlockImages";
import { TetrominoType } from "@/services/utils/tetrominoes";
import styled from "styled-components";

interface LeftSidePanelContent {
  left: {
    title: string;
    piece: string;
  };
}

interface RightSidePanelContent {
  right: {
    nextPieces: {
      title: string;
      pieces: string[];
    };
  };
}

interface SidePanelProps {
  $side: "left" | "right";
  content: LeftSidePanelContent[] | RightSidePanelContent[];
}

const SidePanel = ({ $side, content }: SidePanelProps) => {
  console.log(content as LeftSidePanelContent[]);
  return (
    <StyledSidePanel $side={$side}>
      {$side === "left" && (
        <>
          {(content as LeftSidePanelContent[]).map((item) => (
            <StyledItem key={`${item.left.title}`}>
              <StyledItemTitle>{item.left.title}</StyledItemTitle>

              {item.left.piece !== "null" ? (
                <StyledPiece $type={item.left.piece as TetrominoType}>
                  {getBlockImages(item.left.piece as TetrominoType)}
                </StyledPiece>
              ) : (
                <StyledEmptyPiece>None</StyledEmptyPiece>
              )}
            </StyledItem>
          ))}
        </>
      )}
      {$side === "right" && (
        <>
          {(content as RightSidePanelContent[]).map((item) => (
            <StyledItem key={item.right.nextPieces.title}>
              <StyledItemTitle>{item.right.nextPieces.title}</StyledItemTitle>
              {item.right.nextPieces.pieces.map((piece, index) => (
                <StyledPiece
                  key={`${piece}-${index}`}
                  $isFirst={index === 0}
                  $type={piece as TetrominoType}
                >
                  {getBlockImages(piece as TetrominoType)}
                </StyledPiece>
              ))}
            </StyledItem>
          ))}
        </>
      )}
    </StyledSidePanel>
  );
};

const StyledSidePanel = styled.div<{ $side: "left" | "right" }>`
  display: flex;
  background-color: ${({ theme }) => theme.containers.primary};
  align-items: center;
  height: fit-content;
  flex-direction: column;
  padding: 0.5rem;
  gap: 1.5rem;
  ${({ $side }) =>
    $side === "left" && `border-radius: 0.5rem 0.2rem 0.2rem 0.5rem;`}
  ${({ $side }) =>
    $side === "right" && `border-radius: 0.2rem 0.5rem 0.5rem 0.2rem;`}
`;

const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledItemTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.secondary};
`;

const StyledEmptyPiece = styled.div`
  background-color: ${({ theme }) => theme.containers.primary};
  border-radius: 0.2rem;
  // box-shadow: inset 0px 0px 5px ${({ theme }) => theme.shadows.medium};
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text.secondary};
  border: 2px dashed ${({ theme }) => theme.containers.secondary};
`;

const StyledPiece = styled.div<{ $isFirst?: boolean; $type: TetrominoType }>`
  background-color: ${({ theme }) => theme.containers.primary};
  border-radius: 0.2rem;
  box-shadow: inset 0px 0px 5px ${({ theme }) => theme.shadows.medium};
  width: 100%;
  height: 50px;
  aspect-ratio: 1/1;
  position: relative;
  ${({ $type }) => `
    ${$type === "I" ? "padding: 0.5rem;" : ""}
  `}
  ${({ $isFirst, theme }) =>
    $isFirst &&
    `
    margin-bottom: 1.5rem;
    &:after {
      position: absolute;
      bottom: -17px;
      border-radius: 0.2rem;
      left: 0;
      right: 0;
      content: '';
      display: block;
      border-bottom: 3px solid ${theme.containers.secondary};
    }
  `}
  & img {
    width: 100%;
    height: 100%;
  }
`;

export default SidePanel;
