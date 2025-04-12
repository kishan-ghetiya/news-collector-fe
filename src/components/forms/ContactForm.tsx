"use client";

import { ChangeEvent, FC, useState } from "react";
import { ContactUsPayload } from "@/types/contact";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { contactUs } from "@/app/services";
import { Input } from "../input/Input";
// import { Input } from "../input/Input";

interface FormData extends ContactUsPayload {}

// Form Component with dynamic input
export const ContactForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const schema = Joi.object<FormData>({
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
  } = useForm<FormData>({
    resolver: joiResolver(schema),
  });

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setApiError(null);
    setSuccessMessage(null);

    try {
      const response = await contactUs.contactus(formData);
      setSuccessMessage("Your message has been sent successfully!");
      reset(); // clear the form after success
    } catch (error: any) {
      setApiError(error?.message || "An unexpected error occurred");
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
      {/* You can keep this city field if needed, but it’s not in the schema */}
      {/* <Input
        label=""
        type="text"
        name="city"
        placeholder="Enter your city"
      /> */}
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
