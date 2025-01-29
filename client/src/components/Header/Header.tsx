import { Link } from "react-router-dom";
import { Nav, Logo, NavLinks, StyledHeader } from "./Header.styles";
import ThemeToggle from "./ThemeToggle/ThemeToggle";

const Header = () => {
  return (
    <StyledHeader>
      <Nav>
        <Logo to="/">Tetris Battle</Logo>
        <NavLinks>
          <Link to="/">Home</Link>
          <Link to="/game-options">Play</Link>
          <ThemeToggle />
        </NavLinks>
      </Nav>
    </StyledHeader>
  );
};

export default Header;
