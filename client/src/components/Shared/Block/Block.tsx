import styled, { useTheme } from "styled-components";
import { useBoardStore } from "@/stores/boardStore";

interface BlockProps {
  row: number;
  col: number;
}

const Block: React.FC<BlockProps> = ({ row, col }) => {
  const theme = useTheme();
  const getCellContent = useBoardStore((state) => state.getCellContent);
  const content = getCellContent(row, col);

  const getBlockStyles = () => {
    switch (content.type) {
      case "filled":
        return {
          backgroundColor: theme.blocks[content.pieceType!],
          border: "none",
        };
      case "ghost":
        return {
          backgroundColor:
            (row + col) % 2 === 0
              ? theme.gameboard.cellColorDark
              : theme.gameboard.cellColorLight,
          border: `2px dashed ${theme.blocks.ghostBorderColor}`,
          opacity: 0.5,
        };
      case "empty":
        return {
          backgroundColor:
            (row + col) % 2 === 0
              ? theme.gameboard.cellColorDark
              : theme.gameboard.cellColorLight,
          border: "none",
        };
    }
  };

  return <StyledBlock $styles={getBlockStyles()} />;
};

const StyledBlock = styled.div<{
  $styles: { backgroundColor: string; border: string; opacity?: number };
}>`
  width: 25px;
  aspect-ratio: 1/1;
  border-radius: 3px;
  background-color: ${({ $styles }) => $styles.backgroundColor};
  border: ${({ $styles }) => $styles.border};
  opacity: ${({ $styles }) => $styles.opacity ?? 1};
`;
export default Block;
