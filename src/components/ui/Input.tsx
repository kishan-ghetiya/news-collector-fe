import React, { ChangeEvent, FormEvent } from "react";

interface InputProps {
  type: string;
  name?: string;
  placeholder?: string;
  value?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  textHandleChange?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  className?: string;
  label?: string;
  required?: boolean;
  error?: string;
  errorStyle?: string;
  readOnly?: boolean;
  maxLength?: number;
  classNameInput?: string;
  handleKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  checked?: boolean;
  disabled?: boolean;
  isTextarea?: boolean;
  showError?: boolean;
}

export const Input = ({
  type,
  name,
  placeholder,
  value,
  handleChange,
  textHandleChange,
  className,
  label,
  required,
  error,
  errorStyle = "",
  readOnly,
  maxLength,
  classNameInput = "",
  handleKeyDown,
  isTextarea = false,
  checked,
  disabled,
  showError = true,
  ...otherProps
}: InputProps) => {
  const baseInputClass = "w-full px-4 py-2 mt-1 border rounded-md ";
  const errorClass = error
    ? "border-red-500 bg-red-100 placeholder:text-red-700"
    : "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {!isTextarea ? (
        <input
          type={type}
          name={name}
          id={name}
          maxLength={maxLength}
          readOnly={readOnly}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange?.(e)}
          onKeyDown={handleKeyDown}
          checked={checked}
          required={required}
          disabled={disabled}
          autoComplete="off"
          className={`${baseInputClass} ${errorClass} ${disabledClass} ${classNameInput}`}
          {...otherProps}
        />
      ) : (
        <textarea
          name={name}
          id={name}
          maxLength={maxLength}
          readOnly={readOnly}
          placeholder={placeholder}
          value={value}
          onChange={(e) => textHandleChange?.(e)}
          onKeyDown={handleKeyDown}
          required={required}
          disabled={disabled}
          autoComplete="off"
          draggable={false}
          className={`${baseInputClass} resize-none h-28 ${errorClass} ${disabledClass}`}
          {...otherProps}
        />
      )}

      {showError && error && (
        <p className={`mt-1 text-sm text-red-600 ${errorStyle}`}>
          {JSON.stringify(error).replace(/['"\\]/g, "")}
        </p>
      )}
    </div>
  );
};

export default Input;
