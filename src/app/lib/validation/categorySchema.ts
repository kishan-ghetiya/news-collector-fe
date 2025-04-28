import Joi from "joi";

export const addCategorySchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "Name is required",
    }),
    slug: Joi.string().required().messages({
        "string.empty": "Slug is required",
    }),
    description: Joi.string().required().messages({
        "string.empty": "Description is required",
    }),
});

