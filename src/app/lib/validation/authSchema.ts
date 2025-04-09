import Joi from "joi";


const customEmailValidator = (value: string, helpers: Joi.CustomHelpers) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        return helpers.error('string.email', { value });
    }
    return value;
};

export const registerSchema = Joi.object({
    fullName: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Full name is required',
        'string.min': 'Full name should be at least 3 characters',
    }),
    email: Joi.string()
        .custom(customEmailValidator, 'Custom email validation')
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Invalid email address',
        }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password should be at least 6 characters',
    }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Passwords do not match',
            'string.empty': 'Please confirm your password',
        }),
});



export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const emailOnlySchema = Joi.object({
    email: Joi.string().email().required(),
});

export const passwordSchema = Joi.object({
    password: Joi.string().min(6).required(),
});

export const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
});
