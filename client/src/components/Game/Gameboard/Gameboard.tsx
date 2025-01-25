import { useBoardStore } from "@/stores/boardStore";
import styled from "styled-components";
import Block from "../../Shared/Block/Block";
import { VISIBLE_BOARD_HEIGHT } from "@/services/utils/board";

const Gameboard = () => {
  const board = useBoardStore((state) => state.board);

  return (
    <StyledGameboard>
      {board.slice(0, VISIBLE_BOARD_HEIGHT).map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((_, colIndex) => (
            <Block
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
            />
          ))}
        </Row>
      ))}
    </StyledGameboard>
  );
};

const StyledGameboard = styled.div`
  background-color: ${({ theme }) => theme.containers.primary};
  padding: 1rem;
  border-radius: 0.2rem 0.2rem 0.5rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: fit-content;
`;

const Row = styled.div`
  display: flex;
  gap: 2px;
`;

export default Gameboard;
