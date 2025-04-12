import React, { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  loading = false,
  className = "",
  disabled,
  ...props
}) => {
  const variants = {
    primary: "bg-purple text-white hover:bg-purple-800",
    outline: "border-2 border-purple text-purple hover:bg-purple-50",
    danger: "bg-danger text-white hover:bg-danger-600",
  };

  return (
    <button
      className={`px-6 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-60 ${variants[variant]} ${className} ${disabled || loading ? "hover:cursor-not-allowed" : ""}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )}
      {children}
    </button>
  );
};

export default Button;
