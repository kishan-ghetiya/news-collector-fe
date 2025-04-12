import { ChangeEvent, forwardRef } from "react";

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
    const baseClasses = "w-full focus:outline-none py-2";
    const commonClasses =
      variant === "underline"
        ? `border-b bg-transparent placeholder:text-black ${
            error ? "border-red-500" : "border-black"
          }`
        : `bg-gray-100 border rounded-lg px-4 ${
            error ? "border-red-500" : "border-gray-300"
          }`;

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
            className={`${baseClasses} ${commonClasses} ${disbaled ? "hover:cursor-not-allowed" : ""}`}
            disabled={disbaled}
            {...rest}
          />
        ) : (
          <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            ref={ref as React.Ref<HTMLInputElement>}
            className={`${baseClasses} ${commonClasses} ${disbaled ? "hover:cursor-not-allowed" : ""}`}
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
