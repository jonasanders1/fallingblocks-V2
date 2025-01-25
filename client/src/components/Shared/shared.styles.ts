import styled from "styled-components";

export const StyledSegment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
`;

export const StyledSegmentTitle = styled.h4`
  font-size: 1rem;
  font-weight: 500;
`;

export const GameSideBox = styled.div`
  background-color: ${({ theme }) => theme.containers.primary};
  border: 2px solid ${({ theme }) => theme.containers.hover};
  width: 50px;
  aspect-ratio: 1/1;
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
