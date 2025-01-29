import styled, { css } from "styled-components";

interface StyledButtonProps {
  $variant?: "primary" | "secondary" | "navigation" | "danger" | "success";
  size?: "small" | "medium" | "large";
  $fullWidth?: boolean;
  $borderRadius?: "small" | "medium" | "large";
  $active?: boolean;
}

const sizeStyles = {
  small: css`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  `,
  medium: css`
    padding: 1rem 2rem;
    font-size: 1rem;
  `,
  large: css`
    padding: 1.25rem 2.5rem;
    font-size: 1.125rem;
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
  flex: 1;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  ${({ size = "medium" }) => sizeStyles[size]}
  ${({ $borderRadius = "medium" }) =>
    borderRadiusStyles[$borderRadius]}

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
          color: ${$active
            ? theme.background.primary
            : theme.text.secondary};

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
