import Joi from "joi";

export const editProfileSchema = Joi.object({
  fullName: Joi.string().min(3).max(100),
  newPassword: Joi.string().min(6).max(100),
});
