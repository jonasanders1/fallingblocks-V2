import styled, { css } from "styled-components";

interface StyledButtonProps {
  variant?: "primary" | "secondary" | "navigation" | "danger" | "success";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
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

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};

  ${({ size = "medium" }) => sizeStyles[size]}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  ${({ variant, theme }) => {
    switch (variant) {
      case "secondary":
        return css`
          background-color: ${theme.buttons.secondary};
          color: ${theme.text.primary};
          border: 2px solid ${theme.buttons.secondary};

          &:hover:not(:disabled) {
            background-color: transparent;
            color: ${theme.buttons.secondary};
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
          background-color: ${theme.buttons.primary};
          color: ${theme.background.primary};

          &:hover:not(:disabled) {
            background-color: ${theme.buttons.primaryHover};
          }
        `;
    }
  }}
`;
