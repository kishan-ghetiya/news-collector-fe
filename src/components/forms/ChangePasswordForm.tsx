"use client";
import { authService } from "@/app/services";
import { ApiError } from "@/types/auth";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "../input/Input";
import Button from "../ui/Button";
import FormContainer from "../ui/FormContainer";

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const schema = Joi.object({
  currentPassword: Joi.string().required().messages({
    "string.empty": "Current password is required",
    "any.required": "Current password is required",
  }),
  newPassword: Joi.string().min(6).required().messages({
    "string.empty": "New password is required",
    "string.min": "Password must be at least 6 characters",
    "any.required": "New password is required",
  }),
  confirmPassword: Joi.string()
    .empty("")
    .required()
    .valid(Joi.ref("newPassword"))
    .messages({
      "string.empty": "Confirm password is required",
      "any.only": "Passwords do not match",
      "any.required": "Confirm password is required",
    }),
});

export default function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormData>({
    resolver: joiResolver(schema),
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
      setLoading(true);
      await authService.changePassword(data.currentPassword, data.newPassword);
      toast.success("Password changed successfully");
      reset();
    } catch (err: unknown) {
      toast.error((err as ApiError)?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer title="Change Password" variant="lg">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Current Password"
          type="password"
          placeholder="Enter current password"
          error={errors.currentPassword?.message}
          {...register("currentPassword")}
          variant="solid"
        />
        <Input
          label="New Password"
          type="password"
          placeholder="Enter new password"
          error={errors.newPassword?.message}
          {...register("newPassword")}
          variant="solid"
        />
        <Input
          label="Confirm New Password"
          type="password"
          placeholder="Confirm new password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
          variant="solid"
        />

        <div className="flex justify-end">
          <Button type="submit" variant="primary" loading={loading}>
            Update Password
          </Button>
        </div>
      </form>
    </FormContainer>
  );
}
