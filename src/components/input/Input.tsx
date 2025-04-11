import { FC, ChangeEvent, forwardRef } from "react";

interface InputProps {
  label: string;
  type: string;
  name: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  rows?: number;
  error?: string;
}

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(({ label, type, name, value, placeholder, onChange, rows, error, ...rest }, ref) => {
  return (
    <div className="space-y-2">
      {label && <label htmlFor={name} className="block text-gray-700">{label}</label>}

      {type === "textarea" ? (
        <textarea
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows || 4}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={`w-full border-b bg-transparent focus:outline-none py-2 placeholder:text-black ${
            error ? "border-red-500" : "border-black"
          }`}
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
          className={`w-full border-b bg-transparent focus:outline-none py-2 placeholder:text-black ${
            error ? "border-red-500" : "border-black"
          }`}
          {...rest}
        />
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
});

// Required for React DevTools and avoiding errors
Input.displayName = "Input";
