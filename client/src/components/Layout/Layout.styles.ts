import styled from "styled-components";

export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 auto;
  background: ${({ theme }) => theme.background.primary};
`;
