import Joi from "joi";

export const editBlogSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  tags: Joi.array().items(Joi.string().min(1)).required(),
});

export const bookmarkSchema = Joi.object({
  linkId: Joi.array().items(Joi.string().length(24)).required(),
  status: Joi.boolean().required(),
});

export const addBlogSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  link: Joi.string().uri().required().messages({
    "string.empty": "Link is required",
    "string.uri": "Link must be a valid URL",
  }),
  categoryId: Joi.string().required().messages({
    "string.empty": "Category is required",
  }),
  tags: Joi.string().required().messages({
    "string.empty": "Tags are required",
  }),
  summary: Joi.string().required().messages({
    "string.empty": "Summary is required",
  }),
});
