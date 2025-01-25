import styled from "styled-components";

export const StyledSidePanel = styled.div<{ $side: "left" | "right" }>`
  display: flex;
  background-color: ${({ theme }) => theme.containers.primary};
  align-items: center;
  height: fit-content;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  ${({ $side }) =>
    $side === "left" && `border-radius: 0.5rem 0.2rem 0.2rem 0.5rem;`}
  ${({ $side }) =>
    $side === "right" && `border-radius: 0.2rem 0.5rem 0.5rem 0.2rem;`}
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
