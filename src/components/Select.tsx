import clsx from "clsx";
import { forwardRef } from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  name: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  error?: string;
  variant?: "underline" | "solid";
  disabled?: boolean;
  required?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      name,
      value,
      placeholder,
      onChange,
      options,
      error,
      variant = "underline",
      disabled = false,
      required = false,
      ...rest
    },
    ref
  ) => {
    const baseClasses = "w-full focus:outline-none py-2";
    const selectClasses = clsx(
      baseClasses,
      variant === "underline" &&
        "border-b bg-transparent placeholder:text-black",
      variant === "solid" && "bg-gray-100 border rounded-lg px-4",
      error
        ? variant === "underline"
          ? "border-red-500"
          : "border-red-500"
        : variant === "underline"
          ? "border-black"
          : "border-gray-300",
      disabled && "hover:cursor-not-allowed"
    );

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          ref={ref}
          disabled={disabled}
          required={required}
          className={selectClasses}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
