import { toast } from 'react-hot-toast';
import axios from 'axios';
import Joi from 'joi';

export const errorHandler = (error: unknown, fallbackMsg = 'Something went wrong') => {
    let message = fallbackMsg;

    if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || fallbackMsg;
    } else if (error instanceof Error) {
        message = error.message;
    }

    toast.error(message);
};


export const validateSchema = <T>(schema: Joi.ObjectSchema<T>, data: T) => {
    const { error, value } = schema.validate(data, { abortEarly: false });
    return { error, value };
};
