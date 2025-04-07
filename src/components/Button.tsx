import React from "react";

interface ButtonProps {
  name: string;
  disabled?: boolean;
  onClick?: () => void;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  name,
  disabled = false,
  onClick,
  outline,
}) => {
  return (
    <button
      className={` 
    disabled:opacity-70
    disabled:cursor-not-allowed
    rounded-md
    hover:opacity-80
    transition
    w-full
    flex items-center justify-center gap-2
    text-md
    py-3 px-4
    font-semibold
    border-2
    ${
      outline
        ? " bg-white text-slate-700 border-slate-700"
        : " text-white bg-slate-700"
    }
    
  `}
      disabled={disabled}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
