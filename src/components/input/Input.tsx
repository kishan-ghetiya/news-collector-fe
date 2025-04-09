import Image from "next/image";
import { FC, useState, ChangeEvent } from "react";
import Head from "next/head";

// Generic Input component
interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  rows?: number; // Optional for textarea
}

export const Input: FC<InputProps> = ({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  rows,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-gray-700">{label}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows || 4}
          className="w-full border-b border-black bg-transparent focus:outline-none py-2 placeholder:text-black"
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full border-b border-black bg-transparent focus:outline-none py-2 placeholder:text-black"
        />
      )}
    </div>
  );
};
