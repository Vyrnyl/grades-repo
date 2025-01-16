import Joi from 'joi';
import { UserUpdatePayload } from '../types/types';

const userUpdateSchema = Joi.object({
    firstName: Joi.string().max(50).required().messages({
        'string.empty': 'First Name cannot be empty',
        'string.base': 'First Name should be a type of text',
        'string.max': 'First Name cannot exceed 50 characters'
    }),
    lastName: Joi.string().max(50).required().messages({
        'string.empty': 'Last Name cannot be empty',
        'string.base': 'Last Name should be a type of text',
        'string.max': 'Last Name cannot exceed 50 characters'
    }),
    email: Joi.string().email({ tlds: { allow: false }}).required().messages({
        'string.empty': 'Email cannot be empty',
        'string.email': 'Please enter a valid email'
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must be atleast 6 characters long',
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'string.empty': 'Confirm Password cannot be empty',
        'any.only': 'Password do not match'
    }),
    studentId: Joi.string().max(10).messages({
        'string.empty': 'Student ID cannot be empty',
        'string.max': 'Student ID must be at most 10'
    }),
    yearLevel: Joi.number().integer().max(5).messages({
        'number.base': 'Year level must be a type of number',
        'number.max': 'Year level must be at most 5',
        'number.empty': 'Year level cannot be empty',
        'any.required': 'Year level cannot be empty'
    })
});

const getUserIdSchema = Joi.object({
    userId: Joi.number().integer().messages({
        'number.base': 'User ID must be a type of number',
        'number.empty': 'User ID cannot be empty',
        'any.required': 'User ID cannot be empty'
    })
});

const validateUserUpdate = (payload: UserUpdatePayload) => {
    return userUpdateSchema.validate(payload, { abortEarly: false });
}

const validateUserId = (payload: { userId: number }) => {
    return getUserIdSchema.validate(payload, { abortEarly: false });
}

export { validateUserUpdate, validateUserId };