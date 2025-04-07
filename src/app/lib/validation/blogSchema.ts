import Joi from 'joi';

export const editBlogSchema = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    tags: Joi.array().items(Joi.string().min(1)).required(),
});

export const bookmarkSchema = Joi.object({
    linkId: Joi.array().items(Joi.string().length(24)).required(),
    status: Joi.boolean().required(),
});
