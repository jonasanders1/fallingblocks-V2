import styled from "styled-components";

export const ButtonContainer = styled.button`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  padding: 0.8rem;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadows.medium};
`;
