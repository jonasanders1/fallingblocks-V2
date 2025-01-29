import { styled } from "styled-components";

export const StyledOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  min-height: 250px;
`;

export const StyledOptionGroup = styled.div`
  h3 {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.text.primary};
    font-size: clamp(1.1rem, 3vw, 1.3rem);
  }
`;

export const StyledButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  width: 100%;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const OptionButton = styled.button<{ $active: boolean }>`
  padding: 0.8rem 1rem;
  min-height: 45px;
  border-radius: 0.5rem;
  border: none;
  width: 100%;
  background: ${({ theme, $active }) =>
    $active ? theme.buttons.primary : theme.containers.secondary};
  color: ${({ theme, $active }) =>
    $active ? theme.background.primary : theme.text.primary};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: clamp(0.9rem, 2vw, 1rem);
  white-space: nowrap;

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.buttons.primaryHover : theme.containers.hover};
  }
`;
