import styled from "styled-components";

export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.background.primary};
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;
