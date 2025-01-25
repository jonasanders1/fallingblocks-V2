import { Link, useLocation } from "react-router-dom";
import {
  Nav,
  Logo,
  NavLinks,
  StyledHeader,
  NavigationHeader,
} from "./Header.styles";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import Button from "../Shared/Button/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/game") {
    return (
      <NavigationHeader>
        <Button
          variant="navigation"
          text="Return home"
          size="small"
          onClick={() => navigate("/")}
          icon={<FontAwesomeIcon icon={faArrowLeft} />}
          iconPosition="left"
        />
      </NavigationHeader>
    );
  }

  return (
    <StyledHeader>
      <Nav>
        <Logo to="/">Tetris Battle</Logo>
        <NavLinks>
          <Link to="/">Home</Link>
          <Link to="/game">Play</Link>
          <ThemeToggle />
        </NavLinks>
      </Nav>
    </StyledHeader>
  );
};

export default Header;
