import Joi from 'joi';
import { ClassPayload, ClassUpdatePayload } from '../types/types';

const classSchema = Joi.object({
    courseCode: Joi.string().max(10).required().messages({
        'string.empty': 'Course Code cannot be empty',
        'string.max': 'Course Code must be at most 10',
        'any.required': 'User ID cannot be empty'
    }),
    day: Joi.string().max(10).required().messages({
        'string.empty': 'Day cannot be empty',
        'string.max': 'Day must be at most 10',
        'any.required': 'Day cannot be empty'
    }),
    time: Joi.string().required().messages({
        'string.empty': 'Time cannot be empty',
        'any.required': 'Time cannot be empty'
    }),
    room: Joi.string().required().messages({
        'string.empty': 'Room cannot be empty',
        'any.required': 'Room cannot be empty'
    })
});

const updateClassSchema = Joi.object({
    userId: Joi.number().integer().required().messages({
        'number.base': 'User ID must be a type of number',
        'number.empty': 'User ID cannot be empty',
        'any.required': 'User ID cannot be empty'
    }),
    courseCode: Joi.string().max(10).required().messages({
        'string.empty': 'Course Code cannot be empty',
        'string.max': 'Course Code must be at most 10',
        'any.required': 'User ID cannot be empty'
    }),
    day: Joi.string().max(10).required().messages({
        'string.empty': 'Day cannot be empty',
        'string.max': 'Day must be at most 10',
        'any.required': 'Day cannot be empty'
    }),
    time: Joi.string().required().messages({
        'string.empty': 'Time cannot be empty',
        'any.required': 'Time cannot be empty'
    }),
    room: Joi.string().required().messages({
        'string.empty': 'Room cannot be empty',
        'any.required': 'Room cannot be empty'
    })
});

const validateClass = (payload: ClassPayload) => {
    return classSchema.validate(payload, { abortEarly: false });
}

const validateClassUpdate = (payload: ClassUpdatePayload) => {
    return classSchema.validate(payload, { abortEarly: false });
}

export { validateClass, validateClassUpdate };