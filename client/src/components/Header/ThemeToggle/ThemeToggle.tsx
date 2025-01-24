import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../../../contexts/ThemeContext";
import { ButtonContainer } from "./ThemeToggle.styles";

const ThemeToggle = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <ButtonContainer onClick={toggleTheme}>
      <FontAwesomeIcon
        icon={theme === "dark" ? faSun : faMoon}
        size="lg"
        color={theme === "dark" ? "#FFD700" : "#000000"}
      />
    </ButtonContainer>
  );
};

export default ThemeToggle;
