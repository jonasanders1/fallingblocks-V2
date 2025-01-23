import styled from "styled-components";

interface BlockProps {
  color?: string; // Background color for the block
  filled: boolean; // Whether the block is occupied
}

const StyledBlock = styled.div<BlockProps>`
  width: 30px;
  height: 30px;
  background-color: ${({ filled, color }) =>
    filled ? color || "gray" : "transparent"};
  border: ${({ filled }) =>
    filled ? "1px solid black" : "1px solid rgba(0, 0, 0, 0.1)"};
`;

const Block: React.FC<BlockProps> = ({ color, filled }) => {
  return <StyledBlock color={color} filled={filled} />;
};

export default Block;
