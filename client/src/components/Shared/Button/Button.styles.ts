import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.buttons.primary};
  padding: 1rem 2rem;
  border-radius: 5px;
  color: ${({ theme }) => theme.background.primary};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.buttons.primaryHover};
  }
`;
