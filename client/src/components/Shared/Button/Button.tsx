import { StyledButton } from "./Button.styles";

interface ButtonProps {
  onClick?: () => void;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  text?: string;
  borderRadius?: "small" | "medium" | "large";
  $variant?:
    | "primary"
    | "secondary"
    | "navigation"
    | "danger"
    | "success"
    | "icon";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  isLoading?: boolean;
  $fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  $active?: boolean;
}

const Button = ({
  onClick,
  $variant = "primary",
  size = "medium",
  text,
  icon,
  iconPosition = "left",
  disabled = false,
  isLoading = false,
  $fullWidth = false,
  type = "button",
  ariaLabel,
  borderRadius = "medium",
  $active = false,
}: ButtonProps) => {
  const isIconOnly: boolean = Boolean($variant === "icon" && icon && !text);

  return (
    <StyledButton
      onClick={onClick}
      $variant={$variant}
      size={size}
      disabled={disabled || isLoading}
      $fullWidth={$fullWidth}
      type={type}
      aria-label={ariaLabel || text}
      aria-disabled={disabled || isLoading}
      $borderRadius={borderRadius}
      $active={$active}
      $isIconOnly={isIconOnly}
    >
      {isLoading ? (
        <>
          <span className="sr-only">Loading...</span>
        </>
      ) : (
        <>
          {isIconOnly ? (
            icon
          ) : (
            <>
              {iconPosition === "left" && icon}
              {text}
              {iconPosition === "right" && icon}
            </>
          )}
        </>
      )}
    </StyledButton>
  );
};

export default Button;
