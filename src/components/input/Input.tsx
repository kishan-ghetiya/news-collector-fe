import { ChangeEvent, forwardRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import clsx from "clsx";

interface InputProps {
  label: string;
  type: string;
  name: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  rows?: number;
  error?: string;
  variant?: "underline" | "solid";
  disbaled?: boolean;
}

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      label,
      type,
      name,
      value,
      placeholder,
      onChange,
      rows,
      error,
      variant = "underline",
      disbaled = false,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const baseClasses = "w-full focus:outline-none py-2";
    const inputClasses = clsx(
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
      disbaled && "hover:cursor-not-allowed"
    );

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        {type === "textarea" ? (
          <textarea
            name={name}
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={rows || 4}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={inputClasses}
            disabled={disbaled}
            {...rest}
          />
        ) : type === "password" ? (
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name={name}
              id={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              ref={ref as React.Ref<HTMLInputElement>}
              className={clsx(inputClasses, "pr-10")}
              disabled={disbaled}
              {...rest}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              tabIndex={-1}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        ) : (
          <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            ref={ref as React.Ref<HTMLInputElement>}
            className={inputClasses}
            disabled={disbaled}
            {...rest}
          />
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
