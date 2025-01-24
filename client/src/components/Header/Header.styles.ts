import styled from "styled-components";

import { Link } from "react-router-dom";

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.containers.secondary};
  padding: 1rem 1rem;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadows.light};
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
