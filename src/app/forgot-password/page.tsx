/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { authService } from "@/app/services";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import { Input } from "@/components/input/Input";
import FormContainer from "@/components/ui/FormContainer";
import { useState } from "react";

interface ForgotForm {
  email: string;
}

const schema = Joi.object<ForgotForm>({
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.email": "Invalid email",
    "string.empty": "Email is required",
  }),
});

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>({ resolver: joiResolver(schema) });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: ForgotForm) => {
    try {
      setIsLoading(true);

      await authService.forgotPassword(data.email);
      toast.success("Password reset link sent! Check your inbox.");
    } catch (error: any) {
      toast.error(error?.message || "Failed to send reset email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer title="Forgot Password">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-10 space-y-4"
      >
        <Input
          variant="solid"
          label="Email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          error={errors.email?.message}
        />
        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          className="w-full"
        >
          Send Reset Link
        </Button>
      </form>
    </FormContainer>
  );
};

export default ForgotPasswordPage;
