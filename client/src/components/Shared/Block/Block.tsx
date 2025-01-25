import styled, { useTheme } from "styled-components";

interface BlockProps {
  row: number;
  col: number;
}

interface StyledBlockProps {
  backgroundColor: string;
}

const Block: React.FC<BlockProps> = ({ row, col }) => {
  const theme = useTheme();

  const getCheckerboardColor = (rowIndex: number, colIndex: number) => {
    return (rowIndex + colIndex) % 2 === 0
      ? theme.gameboard.cellColorDark
      : theme.gameboard.cellColorLight;
  };

  return <StyledBlock backgroundColor={getCheckerboardColor(row, col)} />;
};

const StyledBlock = styled.div<StyledBlockProps>`
  width: 25px;
  border-radius: 3px;
  aspect-ratio: 1/1;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export default Block;
