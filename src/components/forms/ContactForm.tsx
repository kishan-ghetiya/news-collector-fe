"use client";

import { ChangeEvent, FC, useState } from "react";
import { Input } from "../input/Input";

// Form Component with dynamic input
export const ContactForm: FC = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    city: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formValues);
    // Add form submission logic (e.g., API call)
  };
  return (
    <form
      method="POST"
      action="#"
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <Input
        label=""
        type="text"
        name="name"
        placeholder="Enter your name"
        value={formValues.name}
        onChange={handleInputChange}
      />
      <Input
        label=""
        type="text"
        name="city"
        placeholder="Enter your city"
        value={formValues.city}
        onChange={handleInputChange}
      />
      <Input
        label=""
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formValues.email}
        onChange={handleInputChange}
      />
      <Input
        label=""
        type="textarea"
        name="message"
        placeholder="Enter your message"
        value={formValues.message}
        onChange={handleInputChange}
        rows={6}
      />
      <button
        type="submit"
        className="bg-black text-white font-semibold rounded-xl px-8 py-3 mt-4 hover:bg-gray-800 transition"
      >
        Submit
      </button>
    </form>
  );
};
