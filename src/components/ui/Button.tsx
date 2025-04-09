import React, { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-purple text-white hover:bg-purple-800",
    outline: "border-2 border-purple text-purple hover:bg-purple-50",
    danger: "bg-danger text-white hover:bg-danger-600",
  };

  return (
    <button
      className={`px-6 py-2 rounded-lg font-medium transition-colors duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
