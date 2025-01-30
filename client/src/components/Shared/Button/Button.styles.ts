import styled, { css } from "styled-components";

interface StyledButtonProps {
  $variant?:
    | "primary"
    | "secondary"
    | "navigation"
    | "danger"
    | "success"
    | "icon";
  size?: "small" | "medium" | "large";
  $fullWidth?: boolean;
  $borderRadius?: "small" | "medium" | "large";
  $active?: boolean;
  $isIconOnly?: boolean;
}

const sizeStyles = {
  small: css<StyledButtonProps>`
    padding: ${({ $isIconOnly }) => ($isIconOnly ? "0.5rem" : "0.5rem 1rem")};
    font-size: 0.875rem;
    min-width: ${({ $isIconOnly }) => ($isIconOnly ? "2rem" : "auto")};
    min-height: ${({ $isIconOnly }) => ($isIconOnly ? "2rem" : "auto")};
  `,
  medium: css<StyledButtonProps>`
    padding: ${({ $isIconOnly }) => ($isIconOnly ? "0.75rem" : "1rem 2rem")};
    font-size: 1rem;
    min-width: ${({ $isIconOnly }) => ($isIconOnly ? "2.5rem" : "auto")};
    min-height: ${({ $isIconOnly }) => ($isIconOnly ? "2.5rem" : "auto")};
  `,
  large: css<StyledButtonProps>`
    padding: ${({ $isIconOnly }) => ($isIconOnly ? "1rem" : "1.25rem 2.5rem")};
    font-size: 1.125rem;
    min-width: ${({ $isIconOnly }) => ($isIconOnly ? "3rem" : "auto")};
    min-height: ${({ $isIconOnly }) => ($isIconOnly ? "3rem" : "auto")};
  `,
};

const borderRadiusStyles = {
  small: css`
    border-radius: 5px;
  `,
  medium: css`
    border-radius: 10px;
  `,
  large: css`
    border-radius: 15px;
  `,
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  flex: ${({ $isIconOnly, $fullWidth }) =>
    $isIconOnly ? "0" : $fullWidth ? "1" : "0"};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: ${({ $fullWidth, $isIconOnly }) =>
    $isIconOnly ? "auto" : $fullWidth ? "100%" : "auto"};
  aspect-ratio: ${({ $isIconOnly }) => ($isIconOnly ? "1/1" : "auto")};
  white-space: nowrap;

  ${({ size = "medium" }) => sizeStyles[size]}
  ${({ $borderRadius = "medium" }) => borderRadiusStyles[$borderRadius]}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  ${({ $variant, theme, $active }) => {
    switch ($variant) {
      case "secondary":
        return css`
          background-color: ${$active
            ? theme.buttons.primary
            : theme.buttons.inactive};
          color: ${$active ? theme.background.primary : theme.text.secondary};

          &:hover:not(:disabled) {
            background-color: ${$active
              ? theme.buttons.primaryHover
              : theme.buttons.inactiveHover};
          }
        `;
      case "navigation":
        return css`
          background-color: transparent;
          color: ${theme.text.primary};
          opacity: 0.8;
          font-weight: 400;

          &:hover:not(:disabled) {
            opacity: 1;
          }
        `;
      case "danger":
        return css`
          background-color: ${theme.buttons.danger};
          color: ${theme.background.primary};

          &:hover:not(:disabled) {
            background-color: ${theme.buttons.dangerHover};
          }
        `;
      case "success":
        return css`
          background-color: ${theme.buttons.success};
          color: ${theme.background.primary};

          &:hover:not(:disabled) {
            background-color: ${theme.buttons.successHover};
          }
        `;
      default:
        return css`
          background-color: ${$active
            ? theme.buttons.primary
            : theme.buttons.inactive};
          color: ${$active ? theme.background.primary : theme.text.secondary};

          &:hover:not(:disabled) {
            background-color: ${$active
              ? theme.buttons.primaryHover
              : theme.buttons.inactiveHover};
          }
        `;
    }
  }}

  ${({ $active }) =>
    $active &&
    css`
      transform: scale(0.98);
    `}
`;
