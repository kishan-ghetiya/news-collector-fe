"use client";
import { authService } from "@/app/services";
import { LoginPayload, RegisterPayload } from "@/types/auth";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";

interface AuthFormProps {
  type: "login" | "register";
}

interface FormData extends LoginPayload, RegisterPayload {}

const AuthForm: React.FC<AuthFormProps> = ({ type = "login" }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const schema = Joi.object<FormData>({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
      }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters",
      "string.empty": "Password is required",
    }),
    ...(type === "register" && {
      fullName: Joi.string().required().messages({
        "string.empty": "Full name is required",
      }),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: joiResolver(schema),
  });

  const handleAuthSuccess = (data: any) => {
    if (type === "register") {
      router.push(
        `/verify-email?userId=${data.user.id}&verificationCode=${data.user.verificationCode}`
      );
    } else {
      router.push("/");
    }
  };

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      if (type === "login") {
        const { data } = await authService.login(formData);
        handleAuthSuccess(data);
      } else {
        const data = await authService.register(formData as RegisterPayload);
        console.log(data);
        handleAuthSuccess(data);
      }
    } catch (error: any) {
      setApiError(error?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {type === "register" && (
        <div>
          <label className="block text-sm font-medium text-accent mb-2">
            Full Name
          </label>
          <input
            {...register("fullName")}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
          />
          {errors.fullName && (
            <p className="text-danger text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-accent mb-2">
          Email
        </label>
        <input
          {...register("email")}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
        />
        {errors.email && (
          <p className="text-danger text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-accent mb-2">
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
        />
        {errors.password && (
          <p className="text-danger text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {apiError && (
        <p className="text-danger text-sm text-center">{apiError}</p>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading
          ? "Processing..."
          : type === "login"
            ? "Sign In"
            : "Register"}
      </Button>
    </form>
  );
};

export default AuthForm;
