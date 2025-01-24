import styled from "styled-components";

export const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.containers.secondary};
  padding: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.text.secondary};
`;
