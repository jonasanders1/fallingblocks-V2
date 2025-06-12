import * as SwitchPrimitives from "@radix-ui/react-switch";
import { useTheme } from "../../../contexts/ThemeContext";
import styled from "styled-components";
import { MoonStar, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <SwitchRoot checked={theme === "dark"} onCheckedChange={toggleTheme}>
      <SwitchThumb>
        {theme === "dark" ? <MoonStar color="white" /> : <Sun />}
      </SwitchThumb>
    </SwitchRoot>
  );
};

const SwitchRoot = styled(SwitchPrimitives.Root)`
  display: inline-flex;
  height: 24px;
  width: 44px;
  flex-shrink: 0;
  cursor: pointer;
  align-items: center;
  border-radius: 9999px;
  border: 2px solid transparent;
  background-color: ${({ theme }) => theme.containers.secondary};
  transition: background-color 0.2s ease;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.containers.primary};
  }

  &[data-state="checked"] {
    background-color: ${({ theme }) => theme.containers.hover};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const SwitchThumb = styled(SwitchPrimitives.Thumb)`
  display: block;
  height: 20px;
  width: 20px;
  padding: 3px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.containers.primary};
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadows.medium};
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &[data-state="checked"] {
    transform: translateX(20px);
  }

  &[data-state="unchecked"] {
    transform: translateX(0);
  }
`;

export default ThemeToggle;
