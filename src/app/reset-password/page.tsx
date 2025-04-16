/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Input } from "@/components/input/Input";
import Button from "@/components/ui/Button";
import { authService } from "@/app/services";
import toast from "react-hot-toast";
import FormContainer from "@/components/ui/FormContainer";
import { useState } from "react";

interface ResetForm {
  password: string;
  confirmPassword: string;
}

const schema = Joi.object<ResetForm>({
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
  confirmPassword: Joi.string()
    .empty("")
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "string.empty": "Confirm Password is required",
      "any.only": "Passwords do not match",
      "any.required": "Confirm Password is required",
    }),
});

const ResetPasswordPage = () => {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetForm>({ resolver: joiResolver(schema) });

  const onSubmit = async (data: ResetForm) => {
    try {
      setIsLoading(true);
      await authService.resetPassword(token as string, data.password);
      toast.success("Password reset successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.message || "Failed to reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer title="Reset Password">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-10 space-y-4"
      >
        <Input
          variant="solid"
          label="New Password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          error={errors.password?.message}
        />

        <Input
          variant="solid"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          className="w-full"
        >
          Set New Password
        </Button>
      </form>
    </FormContainer>
  );
};

export default ResetPasswordPage;
