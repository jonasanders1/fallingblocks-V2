import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import Button from "../Shared/Button/Button";
import { useMenuStore } from "@/stores/menuStore";
import { Blocks } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const isGameRoute = location.pathname === "/game";
  const { setIsMenuOpen, isMenuOpen } = useMenuStore();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <StyledHeader>
      <Nav>
        <LogoContainer>
          <Logo to="/">
            <Blocks />
            <LogoText>Falling</LogoText>
            <LogoSubtext>Blocks</LogoSubtext>
          </Logo>
        </LogoContainer>

        <NavLinks>
          {isGameRoute ? (
            <MenuButton
              text="Menu (ESC)"
              size="small"
              borderRadius="small"
              onClick={handleMenuToggle}
            />
          ) : (
            <>
              <NavLink to="/" $isActive={location.pathname === "/"}>
                Home
              </NavLink>
              <NavLink
                to="/leaderboard"
                $isActive={location.pathname === "/leaderboard"}
              >
                Leaderboard
              </NavLink>
              <NavLink
                to="/game-options"
                $isActive={location.pathname === "/game-options"}
              >
                Play
              </NavLink>
              <ThemeToggle />
            </>
          )}
        </NavLinks>
      </Nav>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.containers.primary};
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px ${({ theme }) => theme.shadows.medium};
  position: relative;
  z-index: 100;
  border-bottom: 1px solid ${({ theme }) => theme.containers.secondary};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text.primary};
`;

const LogoSubtext = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text.primary};
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  text-decoration: none;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.text.accent : theme.text.secondary};
  font-weight: 600;
  font-size: 1.1rem;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.text.accent};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.containers.primary};
    transform: scaleX(${({ $isActive }) => ($isActive ? 1 : 0)});
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const MenuButton = styled(Button)`
  background-color: ${({ theme }) => theme.containers.hover};
  border: 2px solid ${({ theme }) => theme.containers.secondary};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.shadows.medium};
  }
`;

export default Header;
