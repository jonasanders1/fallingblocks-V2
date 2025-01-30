import { Link, useLocation } from "react-router-dom";
import { Nav, Logo, NavLinks, StyledHeader } from "./Header.styles";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import Button from "../Shared/Button/Button";
import { useMenuStore } from "@/stores/menuStore";

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
        <Logo to="/">Tetris Battle</Logo>

        <NavLinks>
          {isGameRoute ? (
            <Button
              text="Menu (ESC)"
              size="small"
              borderRadius="small"
              onClick={() => handleMenuToggle()}
            />
          ) : (
            <>
              <Link to="/">Home</Link>
              <Link to="/game-options">Play</Link>
              <ThemeToggle />
            </>
          )}
        </NavLinks>
      </Nav>
    </StyledHeader>
  );
};

export default Header;
