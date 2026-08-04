import type { ButtonHTMLAttributes } from "react";
import "./button.css";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`ph-button ph-button--${variant} ${className}`.trim()}
      {...props}
    />
  );
}