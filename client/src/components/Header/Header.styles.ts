import styled from "styled-components";

import { Link } from "react-router-dom";

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.containers.secondary};
  padding: 0.5rem 1rem;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text.accent};
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const NavigationHeader = styled.div`
  display: flex;
  height: 50px;
  background-color: ${({ theme }) => theme.containers.secondary};
  align-items: center;
  gap: 2rem;
`;
