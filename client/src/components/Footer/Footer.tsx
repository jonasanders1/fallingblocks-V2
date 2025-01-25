import { useLocation } from "react-router-dom";
import { StyledFooter } from "./Footer.styles";

const Footer = () => {
  const location = useLocation();

  if (location.pathname === "/game") {
    return null;
  }

  return (
    <StyledFooter>
      <p>© 2024 Tetris Battle. All rights reserved.</p>
    </StyledFooter>
  );
};

export default Footer;
