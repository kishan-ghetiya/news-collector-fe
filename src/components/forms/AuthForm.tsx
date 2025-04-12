"use client";
import { authService } from "@/app/services";
import { LoginPayload, RegisterPayload } from "@/types/auth";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { Input } from "../input/Input";
import toast from "react-hot-toast";

interface AuthFormProps {
  type: "login" | "register";
}

interface FormData extends LoginPayload, RegisterPayload {}

const AuthForm: React.FC<AuthFormProps> = ({ type = "login" }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<null | "register" | "sendEmail">(
    null
  );
  const [apiError, setApiError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);

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
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: joiResolver(schema),
  });

  const handleAuthSuccess = () => {
    if (type === "register") {
      router.push(`/verify-email?email=${watch("email")}`);
    } else {
      router.push("/");
    }
  };

  const onSubmit = async (formData: FormData) => {
    setIsLoading("register");
    setApiError(null);
    setIsRegistered(null);

    try {
      if (type === "login") {
        await authService.login(formData);
        handleAuthSuccess();
      } else {
        await authService.register(formData as RegisterPayload);
        handleAuthSuccess();
      }
    } catch (error: any) {
      const cause = error?.cause;

      if (cause?.isRegistered === false) {
        setIsRegistered(false);
      }

      setApiError(error?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(null);
    }
  };

  const handleResendVerification = async () => {
    const email = watch("email");

    if (!email) return;

    try {
      setIsLoading("sendEmail");
      await authService.sendVerificationEmail(email);
      toast.success("Verification email sent. Please check your inbox.");
      router.push(`/verify-email?email=${email}`);
    } catch (error: any) {
      setApiError(
        error?.message || "Failed to resend verification email. Try again."
      );
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {type === "register" && (
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          error={errors.fullName?.message}
          variant="solid"
          {...register("fullName")}
        />
      )}

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        variant="solid"
        {...register("email")}
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        variant="solid"
        {...register("password")}
      />

      {apiError && (
        <div className="text-danger text-sm text-center space-y-2">
          <p>{apiError}</p>

          {type === "register" && isRegistered === false && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleResendVerification}
              loading={isLoading === "sendEmail"}
            >
              Resend Verification Email
            </Button>
          )}
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        variant="primary"
        loading={isLoading === "register"}
      >
        {type === "login" ? "Sign In" : "Register"}
      </Button>
    </form>
  );
};

export default AuthForm;
