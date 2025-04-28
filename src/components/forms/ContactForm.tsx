"use client";

import { contactUs } from "@/app/services";
import { ContactUsPayload } from "@/types/contact";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../input/Input";
import { ApiError } from "@/types/auth";

export const ContactForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const schema = Joi.object<ContactUsPayload>({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
        "any.required": "Email is required",
      }),

    name: Joi.string().required().messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),

    message: Joi.string().required().messages({
      "string.empty": "Message is required",
      "any.required": "Message is required",
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactUsPayload>({
    resolver: joiResolver(schema),
  });

  const onSubmit = async (formData: ContactUsPayload) => {
    setIsLoading(true);
    setApiError(null);
    setSuccessMessage(null);

    try {
      await contactUs.contactus(formData);
      setSuccessMessage("Your message has been sent successfully!");
      reset();
    } catch (error: unknown) {
      setApiError(
        (error as ApiError)?.message || "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  };

  return (
    <form
      method="POST"
      action="#"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <Input
        label=""
        type="text"
        placeholder="Enter your name"
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        label=""
        type="email"
        placeholder="Enter your email"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        label=""
        type="textarea"
        placeholder="Enter your message"
        rows={6}
        {...register("message")}
        error={errors.message?.message}
      />

      {apiError && <p className="text-red-600 text-sm">{apiError}</p>}
      {successMessage && (
        <p className="text-green-600 text-sm">{successMessage}</p>
      )}

      <button
        type="submit"
        className="bg-black text-white font-semibold rounded-xl px-8 py-3 mt-4 hover:bg-gray-800 transition"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Submit"}
      </button>
    </form>
  );
};
